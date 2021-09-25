import {
    ElementType,
    ReactionType,
    CombatType,
    CombatElementType,
    DamageBased,
    isAmplifyReaction,
} from "~/src/const";
import { ICombat } from "~/src/interface";
import {
    Status,
    StatusReduct,
    DamageScaleTable,
    ReactionFactorTable,
} from "~/src/bonus";
import { EnemyList, IEnemyInfo, IEnemyData } from "~/src/enemy";

export class Enemy {
    public info: IEnemyInfo;
    public data: IEnemyData;
    public reduct: StatusReduct;

    constructor(data: IEnemyData, reduct: StatusReduct) {
        this.data = data;
        this.info = EnemyList[data.name];
        this.reduct = reduct;
    }

    value(type: ElementType) {
        return (
            this.info.resist[type] +
            this.data.fixed +
            ((type === this.data.elem && this.info.value) || 0)
        );
    }

    resist(type: ElementType) {
        let rate = this.value(type) - this.reduct[type];
        if (rate < 0) {
            return (100 - rate / 2) / 100;
        } else if (75 <= rate) {
            return 100 / (rate * 4 + 100);
        } else {
            return (100 - rate) / 100;
        }
    }

    defence(charaLevel: number) {
        const enemy = this.data.level + 100;
        const chara = charaLevel + 100;
        let def = (chara / (enemy + chara)) * 100 + this.reduct.defence;
        return def < 100 ? def : 100;
    }
}

class Damage {
    public atk: number;
    public def: number;
    public flat: number;
    public value: ReadonlyArray<number>;
    public multi: number;
    public strike: boolean;

    constructor(atk: number, def: number, flat: number, value: ReadonlyArray<number>, multi: number) {
        this.atk = atk;
        this.def = def;
        this.flat = flat;
        this.value = value;
        this.multi = multi;
        this.strike = false;
    }

    toHtml() {
        if (this.multi > 1) {
            const val = this.value[0];
            return `<td class="text-right">${this.calc(val)} x${this.multi}</td>`;
        }
        const through = this.strike
            ? " text-decoration-line-through text--disabled"
            : "";
        return (
            `<td class="text-right${through}">` +
            this.value.map((val) => this.calc(val)).join("<br>") +
            "</td>"
        );
    }

    private calc(val: number) {
        return (((val * this.atk + this.flat) * this.def) / 100).toFixed();
    }
}

function toScale(rate: number) {
    return 1.0 + rate / 100.0;
}

// 天賦の各種倍率
export class CombatAttribute {
    public name: string;
    public type: CombatType;
    public elem: CombatElementType;
    public value: ReadonlyArray<number>;
    public multi: number;
    public based: DamageBased;

    constructor(info: ICombat, level: number) {
        const scale = DamageScaleTable[info.scale];
        const index = Math.min(Math.max(1, level), scale.length) - 1; // Math.clamp(level, 1, length) - 1
        this.name = info.name;
        this.type = info.type;
        this.elem = info.elem;
        if (Array.isArray(info.value)) {
            this.value = info.value.map((val) => (val * scale[index]) / 100);
        } else {
            this.value = [(info.value * scale[index]) / 100];
        }
        this.multi = info.multi ?? 1;
        this.based = info.based ?? DamageBased.Atk;
    }

    toHtml(vm: Vue) {
        if (this.multi > 1) {
            const val = this.value[0];
            return `<td class="text-right">${vm.$roundRate(val)} x${this.multi}</td>`;
        }
        return (
            `<td class="text-right">` +
            this.value.map((val) => vm.$roundRate(val)).join("<br>") +
            "</td>"
        );
    }

    damage(status: Status, enemy: Enemy, reaction?: ReactionType, contact?: ElementType): string[] {
        let elem = this.elem;
        // 元素変化
        if (elem === CombatElementType.Contact) {
            if (!contact) return [];
            elem = contact;
            reaction = undefined;
        }
        // 元素付与
        if (elem === ElementType.Phys && status.enchant.type) {
            elem = status.enchant.type;
        }

        // 元素反応の正規化
        reaction = this.reaction(elem, reaction);

        // 攻撃力
        let attackPower: number;
        switch (this.based) {
            case DamageBased.Def:
                attackPower = status.def;
                break;
            default:
                attackPower = status.atk;
                break;
        }

        // 防御力
        const enemyDefence = enemy.defence(status.level) / 100;
        const enemyResist = enemy.resist(elem);

        // 各種倍率
        const combatBonus = status.combatBonus(this.type);
        const elementBonus = status.elementBonus(elem);
        const damageBonus = status.param.any_dmg;
        const combatScale = toScale(combatBonus + elementBonus + damageBonus);
        const critical = status.critical(this.type);
        const criticalScale = toScale(critical.damage);

        const atk = attackPower * combatScale;
        const def = enemyDefence * enemyResist;
        const flat = status.flat[this.type];
        const pair = (rate: number) => {
            return [
                this.toDamage(rate, def, flat), // 通常ダメージ
                this.toDamage(rate * criticalScale, def, flat), // 会心ダメージ
            ];
        };
        let damages = pair(atk);

        if (reaction) {
            const elementMaster = status.elementMaster(reaction);
            const reactionBonus = status.reactionBonus(reaction);

            if (isAmplifyReaction(reaction)) {
                // 蒸発と溶解は取り消し線で表示
                damages.forEach((d) => (d.strike = true));

                const reactionScale =
                    toScale(elementMaster + reactionBonus) *
                    status.reactionScale(reaction, elem);

                // 元素反応ダメージ
                damages.push(...pair(atk * reactionScale));
            } else {
                const reactionScale = toScale(elementMaster + reactionBonus);
                const reactionFactor = ReactionFactorTable[reaction];
                const reactionResist = enemy.resist(reactionFactor.resist);
                const reactionDamage =
                    (reactionFactor.values[status.level - 1] ?? 0) *
                    reactionScale *
                    reactionResist;

                return [
                    ...damages.map((val) => val.toHtml()),
                    `<td class="text-right">${reactionDamage.toFixed()}</td>`, // 元素反応ダメージ
                ];
            }
        }
        return damages.map((val) => val.toHtml());
    }

    private toDamage(atk: number, def: number, flat: number) {
        return new Damage(atk, def, flat, this.value, this.multi);
    }

    private reaction(elem: ElementType, reaction?: ReactionType) {
        if (reaction === ReactionType.Shutter) {
            switch (elem) {
                case ElementType.Phys:
                case ElementType.Geo:
                    return reaction;
            }
        } else if (elem !== ElementType.Phys) {
            return reaction;
        }
        return undefined;
    }
}
