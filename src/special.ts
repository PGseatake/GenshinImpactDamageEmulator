import { IVueI18n } from "vue-i18n/types";
import * as konst from "~/src/const";
import { ExtraBonus, ICombatStatusBonus, ISpecialBonus, IStatus, IStatusBonus } from "~/src/interface";
import { Arrayable, Maths } from "~/src/utility";

const DamageScaleTable: ReadonlyRecord<konst.DamageScale, ReadonlyArray<number>> = {
    //    [    1,     2,     3,     4,     5,     6,     7,     8,     9,    10,    11,    12,    13,    14,    15]
    phys: [100.0, 108.0, 116.0, 127.5, 135.0, 145.0, 157.5, 170.0, 182.5, 197.5, 211.5, 225.5, 239.5, 253.5, 267.5],
    elem: [100.0, 107.5, 115.0, 125.0, 132.5, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 212.5, 225.0, 237.5], // 確定
    xiao: [100.0, 106.0, 112.0, 119.5, 125.5, 131.5, 139.5, 147.0, 155.0, 162.5, 170.5, 178.0, 186.0, 193.5, 201.0],
    //     [    1,      2,     3,      4,     5,     6,      7,     8,      9,    10,     11,    12,     13,    14,     15]
    hutao: [100.0, 106.75, 113.5, 122.75, 129.5, 137.5, 147.75, 158.0, 168.25, 178.5, 188.75, 199.0, 209.25, 219.5, 229.75],
    //       [    1,     2,     3,     4,     5,     6,     7,     8,     9,    10,    11,    12,    13,    14,    15]
    zhongli: [100.0, 110.5, 121.5, 135.0, 147.0, 159.5, 175.5, 192.0, 208.0, 224.0, 240.5, 256.5, 270.0, 283.5, 297.0],
} as const;

export const Damage = {
    scale: (type: konst.DamageScale, talent: number) => {
        const scale = DamageScaleTable[type];
        const index = Maths.clamp(talent, 1, scale.length) - 1;
        return scale[index] / 100;
    },
} as const;

export const DirectBonus: ReadonlyArray<string> = [
    konst.BonusType.None,
    konst.StatusBonusType.Hp,
    konst.StatusBonusType.Atk,
    konst.StatusBonusType.Def,
    konst.StatusBonusType.Elem,
] as const;

export const RateBonus = {
    check(type: konst.AnyBonusType) {
        return !DirectBonus.includes(type);
    },
    suffix(type: konst.AnyBonusType) {
        return DirectBonus.includes(type) ? "" : "%";
    },
    round(value: number, type?: konst.AnyBonusType) {
        if (!DirectBonus.includes(type!)) {
            return Maths.rate(value); // undefined 含む
        }
        return Math.round(value).toFixed();
    },
    xround(value: number, type?: konst.AnyBonusType) {
        return value < 0 ? "-" : "+" + RateBonus.round(value, type);
    },
} as const;

export const BonusStep = {
    Extra: -1,
    Direct: 0,
    Relate: 1,
    Defer: 2,
    Special: 3,
} as const;

// 雷電将軍のボーナス
export interface IRaidenEnrecBonus extends ISpecialBonus {
    readonly dest: konst.ElementBonusType;
    readonly value: number;
}
export const RaidenEnrecBonus = {
    step: function (_: ISpecialBonus) {
        return BonusStep.Special;
    },
    effect: function (self: ISpecialBonus, _: Readonly<IStatus>, i18n: IVueI18n) {
        return i18n.t("combat.raiden.enrec", {
            elem: i18n.t("bonus." + self.dest),
            value: RateBonus.round(self.value),
        });
    },
    apply: function (self: ISpecialBonus, arg: IStatusBonus) {
        const { dest, value } = self as IRaidenEnrecBonus;
        let target = arg.target;
        const enrec = Math.floor(target.param.en_rec - 100);
        target.param[dest] += enrec * value;
    },
} as const;

// 早柚のボーナス
export interface ISayuBurstBonus extends ISpecialBonus {
    readonly value: number;
    readonly bind: string;
}
export const SayuBurstBonus = {
    step: function (_: ISpecialBonus) {
        return BonusStep.Extra;
    },
    effect: function (self: ISpecialBonus, _: Readonly<IStatus>, i18n: IVueI18n) {
        return i18n.t("combat.sayu.elem", {
            dest: i18n.t("bonus.atk"),
            base: i18n.t("bonus.elem"),
            value: RateBonus.round(self.value),
        });
    },
    applyEx: function (self: ISpecialBonus, dst: ExtraBonus, arg: ICombatStatusBonus) {
        if (self.bind === arg.name) {
            const target = arg.target;
            // 攻撃力
            const x = target.param.atk_buf;
            const b = target.base.atk;
            const atk = b + (x * b) / 100 + target.param.atk;
            // 加算分
            let add = target.param.elem * self.value;
            if (add > atk * 4) {
                add = atk * 4;
            }
            dst.atk += add;
        }
    },
} as const;

// モナのボーナス
export interface IMonaBurstBonus extends ISpecialBonus {
    readonly value: ReadonlyArray<number>;
}
export const MonaBurstBonus = {
    step: function (_: ISpecialBonus) {
        return 0;
    },
    effect: function (self: ISpecialBonus, owner: Readonly<IStatus>, i18n: IVueI18n) {
        const { value } = self as IMonaBurstBonus;
        const val = Arrayable.clamp(value, owner.talent.burst);
        return i18n.t("format.basic", {
            type: i18n.t("bonus.any_dmg"),
            value: RateBonus.xround(val),
        });
    },
    apply: function (self: ISpecialBonus, arg: IStatusBonus) {
        const target = arg.target;
        const { value } = self as IMonaBurstBonus;
        target.param.any_dmg += Arrayable.clamp(value, target.talent.burst);
    },
} as const;
