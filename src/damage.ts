import {
    ElementType,
    CombatType,
    TalentType,
    CombatElementType,
    DamageBased,
    AnyReactionType,
    AnyContactType,
} from "~/src/const";
import { ICombat, IIdentify } from "~/src/interface";
import Reaction from "~/src/reaction";
import Enemy, { IEnemyData } from "~/src/enemy";
import Status, { StatusCritical } from "~/src/status";
import { roundRate } from "~/plugins/utils";
import { SettingCritical } from "~/src/setting";
import { BonusBase, CombatBonus, DamageScaleTable, ICombatStatusBonus } from "~/src/bonus";
import { Arrayable } from "~/src/utility";

export interface IDamageData extends IIdentify, IEnemyData {
    team: string;
    member: string;
    contact: AnyContactType;
    reaction: AnyReactionType;
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

class DamageCell {
    public readonly atk: number;
    public readonly def: number;
    public readonly flat: number;
    public readonly crit: StatusCritical;
    public readonly value: ReadonlyArray<number>;
    public readonly multi: number;
    public strike: boolean;

    constructor(atk: number, def: number, flat: number, value: ReadonlyArray<number>, multi: number, crit?: StatusCritical) {
        this.atk = atk;
        this.def = def;
        this.flat = flat;
        this.crit = crit ? { rate: clamp(crit.rate / 100, 0, 1), damage: toScale(crit.damage) } : { rate: 0, damage: 1 };
        this.value = value;
        this.multi = multi;
        this.strike = false;
    }

    make() {
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

export interface IAttribute extends ICombat {
    talent: TalentType;
}

// 天賦の各種倍率
export class Attribute implements ICombatStatusBonus {
    public readonly step: number;
    public readonly type: CombatType;
    public readonly name: string;
    public readonly elem: CombatElementType;
    public readonly value: ReadonlyArray<number>;
    public readonly multi: number;
    public readonly based: DamageBased;
    public readonly party: ReadonlyArray<Status>;
    public readonly target: Status;
    public readonly contact: AnyContactType;
    public readonly reaction: AnyReactionType;

    constructor(attr: IAttribute, data: IDamageData, target: Status, party: ReadonlyArray<Status>) {
        const level = target.talent[attr.talent];
        const scale = DamageScaleTable[attr.scale];
        const index = clamp(level, 1, scale.length) - 1;
        this.type = attr.type;
        this.name = attr.name;
        this.elem = attr.elem;
        if (Array.isArray(attr.value)) {
            this.value = attr.value.map((val) => (val * scale[index]) / 100);
        } else {
            this.value = [(attr.value * scale[index]) / 100];
        }
        this.multi = attr.multi ?? 1;
        this.based = attr.based ?? DamageBased.Atk;

        this.step = -1;
        this.party = party;
        this.target = target;
        this.contact = data.contact;
        this.reaction = data.reaction;
    }

    head() {
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

    private cell(atk: number, def: number, flat: number, crit?: StatusCritical) {
        return new DamageCell(atk, def, flat, this.value, this.multi, crit);
    }

    make(crit: SettingCritical, enemy: Enemy, bonus: ReadonlyArray<BonusBase>): string[] {
        let element = this.elem;
        let reaction = this.reaction;
        // 元素変化
        if (element === CombatElementType.Contact) {
            let contact = this.contact;
            if (!contact) return [];
            element = contact;
            reaction = "";
        }
        // 元素付与
        let combat = this.type;
        let status = this.target;
        if (element === ElementType.Phys) {
            element = status.elchant(combat);
        }
        // 元素反応の正規化
        reaction = Reaction.normalize(reaction, element);

        // 追加ボーナス
        let extra = {
            atk: 0,
            dmg: 0,
            crit: { damage: 0, rate: 0 },
            flat: 0,
        };
        for (const b of bonus) {
            if (b instanceof CombatBonus) {
                b.applyEx(extra, this);
            }
        }

        // 攻撃力
        let attackPower = status.total(this.based) + extra.atk;
        // 防御力
        const enemyDefence = enemy.defence(status.level) / 100;
        const enemyResist = enemy.resist(element);

        // 各種倍率
        const combatBonus = status.combatBonus(combat);
        const elementBonus = status.elementBonus(element);
        const damageBonus = status.param.any_dmg + extra.dmg;
        const combatScale = toScale(combatBonus + elementBonus + damageBonus);
        const critical = status.critical(extra.crit, combat);

        const atk = attackPower * combatScale;
        const def = enemyDefence * enemyResist;
        const flat = status.flat[combat] + extra.flat;
        const make = (rate: number) => {
            let cells = [this.cell(rate, def, flat)]; // 通常ダメージ
            if (crit !== SettingCritical.Expc) { // 会心ダメージ（直値）
                cells.push(this.cell(rate, def, flat, { rate: 100, damage: critical.damage }));
            }
            if (crit !== SettingCritical.Base) { // 会心ダメージ（期待値）
                cells.push(this.cell(rate, def, flat, critical));
            }
            return cells;
        };
        let cells = make(atk);

        if (reaction) {
            const elementMaster = status.elementMaster(reaction);
            const reactionBonus = status.reactionBonus(reaction);

            if (Reaction.isAmplify(reaction)) {
                // 蒸発と溶解は取り消し線で表示
                cells.forEach((val) => (val.strike = true));

                const reactionScale =
                    toScale(elementMaster + reactionBonus) *
                    status.reactionScale(reaction, element);

                // 元素反応ダメージ
                cells.push(...make(atk * reactionScale));
            } else {
                const reactionScale = toScale(elementMaster + reactionBonus);
                const reactionFactor = Reaction.Factor[reaction];
                const reactionResist = enemy.resist(reactionFactor.resist);
                const reactionDamage =
                    Arrayable.clamp(reactionFactor.values, status.level) *
                    reactionScale *
                    reactionResist;

                return [
                    ...cells.map((val) => val.make()),
                    `<td class="text-right">${reactionDamage.toFixed()}</td>`, // 元素反応ダメージ
                ];
            }
        }
        return cells.map((val) => val.make());
    }
}
