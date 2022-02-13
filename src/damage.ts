import {
    ElementType,
    ReactionType,
    CombatType,
    CombatElementType,
    DamageBased,
    NoneReactionType,
    NoneContactType,
} from "~/src/const";
import { ICombat, IIdentify } from "~/src/interface";
import { DamageScaleTable } from "~/src/bonus";
import Reaction from "~/src/reaction";
import Enemy, { IEnemyData } from "~/src/enemy";
import Status, { Critical } from "~/src/status";
import { roundRate } from "~/plugins/utils";
import { SettingCritical } from "~/src/setting";

export interface IDamageData extends IIdentify, IEnemyData {
    team: string;
    member: string;
    contact: NoneContactType;
    reaction: NoneReactionType;
}
export type DBDamageTable = { damage: IDamageData[]; };

function clamp(val: number, min: number, max: number) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

function lerp(x0: number, x1: number, ratio: number) {
    return x0 * (1 - ratio) + x1 * ratio;
}

function toScale(rate: number) {
    return 1.0 + rate / 100.0;
}

class Attribute {
    public readonly atk: number;
    public readonly def: number;
    public readonly flat: number;
    public readonly crit: Critical;
    public readonly value: ReadonlyArray<number>;
    public readonly multi: number;
    public strike: boolean;

    constructor(atk: number, def: number, flat: number, value: ReadonlyArray<number>, multi: number, crit?: Critical) {
        this.atk = atk;
        this.def = def;
        this.flat = flat;
        this.crit = crit ? { rate: clamp(crit.rate / 100, 0, 1), damage: toScale(crit.damage) } : { rate: 0, damage: 1 };
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
        const crit = lerp(1.0, this.crit.damage, this.crit.rate);
        return (((val * this.atk * this.def * crit) / 100) + this.flat).toFixed();
    }
}

// 天賦の各種倍率
export class CombatAttribute {
    public readonly crit: SettingCritical;
    public readonly name: string;
    public readonly type: CombatType;
    public readonly elem: CombatElementType;
    public readonly value: ReadonlyArray<number>;
    public readonly multi: number;
    public readonly based: DamageBased;

    constructor(info: ICombat, level: number, crit: SettingCritical) {
        this.crit = crit;
        const scale = DamageScaleTable[info.scale];
        const index = clamp(level, 1, scale.length) - 1;
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

    toHtml() {
        if (this.multi > 1) {
            const val = this.value[0];
            return `<td class="text-right">${roundRate(val)} x${this.multi}</td>`;
        }
        return (
            `<td class="text-right">` +
            this.value.map((val) => roundRate(val)).join("<br>") +
            "</td>"
        );
    }

    damage(data: IDamageData, status: Status, enemy: Enemy): string[] {
        let elem = this.elem;
        let reaction = data.reaction;
        // 元素変化
        if (elem === CombatElementType.Contact) {
            let contact = data.contact;
            if (!contact) return [];
            elem = contact;
            reaction = "";
        }
        // 元素付与
        if (elem === ElementType.Phys) {
            elem = status.elchant(this.type);
        }
        // 元素反応の正規化
        reaction = Reaction.normalize(reaction, elem);

        // 攻撃力
        let attackPower = status.total(this.based);
        // 防御力
        const enemyDefence = enemy.defence(status.level) / 100;
        const enemyResist = enemy.resist(elem);

        // 各種倍率
        const combatBonus = status.combatBonus(this.type);
        const elementBonus = status.elementBonus(elem);
        const damageBonus = status.param.any_dmg;
        const combatScale = toScale(combatBonus + elementBonus + damageBonus);
        const critical = status.critical(this.type);

        const atk = attackPower * combatScale;
        const def = enemyDefence * enemyResist;
        const flat = status.flat[this.type];
        const make = (rate: number) => {
            let items = [this.attribute(rate, def, flat)]; // 通常ダメージ
            if (this.crit !== SettingCritical.Expc) { // 会心ダメージ（直値）
                items.push(this.attribute(rate, def, flat, { rate: 100, damage: critical.damage }));
            }
            if (this.crit !== SettingCritical.Base) { // 会心ダメージ（期待値）
                items.push(this.attribute(rate, def, flat, critical));
            }
            return items;
        };
        let attrs = make(atk);

        if (reaction) {
            const elementMaster = status.elementMaster(reaction);
            const reactionBonus = status.reactionBonus(reaction);

            if (Reaction.isAmplify(reaction)) {
                // 蒸発と溶解は取り消し線で表示
                attrs.forEach((val) => (val.strike = true));

                const reactionScale =
                    toScale(elementMaster + reactionBonus) *
                    status.reactionScale(reaction, elem);

                // 元素反応ダメージ
                attrs.push(...make(atk * reactionScale));
            } else {
                const reactionScale = toScale(elementMaster + reactionBonus);
                const reactionFactor = Reaction.Factor[reaction];
                const reactionResist = enemy.resist(reactionFactor.resist);
                const reactionDamage =
                    (reactionFactor.values[status.level - 1] || 0) *
                    reactionScale *
                    reactionResist;

                return [
                    ...attrs.map((val) => val.toHtml()),
                    `<td class="text-right">${reactionDamage.toFixed()}</td>`, // 元素反応ダメージ
                ];
            }
        }
        return attrs.map((val) => val.toHtml());
    }

    private attribute(atk: number, def: number, flat: number, crit?: Critical) {
        return new Attribute(atk, def, flat, this.value, this.multi, crit);
    }
}
