import * as konst from "~/src/const";
import {
    IBasicBonus, IFlatBonus, IFlatBonusBound, IEnchantBonus, IReductBonus,
    IBonusOption, AnyBonus, Constes, Passives, DBEquipTable, ICharaInfo
} from "~/src/interface";
import { CharaList, ICharaData, DBCharaTable } from "~/src/character";
import { WeaponList, IWeaponData, DBWeaponTable } from "~/src/weapon";
import { ArtifactName, ArtifactList, SubBonus, DBArtifactTable } from "~/src/artifact";
import { Member, Members, ITeamData, getArtifacts, getMember, getWeapon } from "~/src/team";

export const DamageScaleTable: ReadonlyRecord<konst.DamageScale, ReadonlyArray<number>> = {
    //    [    1,     2,     3,     4,     5,     6,     7,     8,     9,    10,    11,    12,    13,    14,    15]
    phys: [100.0, 108.0, 116.0, 127.5, 135.0, 145.0, 157.5, 170.0, 182.5, 197.5, 211.5, 225.5, 239.5, 253.5, 267.5],
    elem: [100.0, 107.5, 115.0, 125.0, 132.5, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 212.5, 225.0, 237.5],
    xiao: [100.0, 106.0, 112.0, 119.5, 125.5, 131.5, 139.5, 147.0, 155.0, 162.5, 170.5, 178.0, 186.0, 193.5, 201.0],
    //     [    1,      2,     3,      4,     5,     6,      7,     8,      9,    10,     11,    12,     13,    14,     15]
    hutao: [100.0, 106.75, 113.5, 122.75, 129.5, 137.5, 147.75, 158.0, 168.25, 178.5, 188.75, 199.0, 209.25, 219.5, 229.75],
    //       [    1,     2,     3,     4,     5,     6,     7,     8,     9,    10,    11,    12,    13,    14,    15]
    zhongli: [100.0, 110.5, 121.5, 135.0, 147.0, 159.5, 175.5, 192.0, 208.0, 224.0, 240.5, 256.5, 270.0, 283.5, 297.0],
} as const;

export type ReactionFactor = {
    readonly resist: konst.ElementType;
    readonly values: ReadonlyArray<number>;
};
export const ReactionFactorTable: ReadonlyRecord<konst.TransformReactionType, ReactionFactor> = {
    "burning": {
        resist: konst.ElementType.Pyro,
        values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    },
    "swirl": {
        resist: konst.ElementType.Anemo,
        values: [10, 11, 11, 12, 13, 14, 16, 17, 18, 20, 22, 23, 27, 29, 32, 34, 38, 41, 44, 48, 51, 54, 58, 61, 64, 68, 70, 73, 78, 81, 86, 89, 92, 97, 101, 106, 110, 114, 119, 123, 129, 134, 140, 146, 153, 161, 169, 177, 184, 193, 201, 210, 218, 227, 239, 249, 260, 271, 282, 293, 306, 319, 333, 348, 364, 378, 391, 404, 418, 431, 444, 459, 470, 481, 498, 512, 526, 540, 553, 568, 581, 594, 608, 621, 639, 653, 669, 684, 702, 721]
    },
    "echarge": {
        resist: konst.ElementType.Elect,
        values: [20, 22, 23, 24, 27, 29, 31, 34, 37, 40, 44, 48, 53, 58, 64, 70, 77, 83, 90, 97, 103, 110, 117, 123, 130, 136, 141, 147, 156, 163, 171, 178, 186, 193, 202, 211, 220, 230, 239, 248, 258, 269, 280, 291, 307, 322, 338, 353, 370, 388, 403, 420, 437, 453, 478, 499, 521, 542, 566, 588, 611, 639, 667, 696, 729, 756, 783, 810, 837, 863, 890, 918, 941, 963, 997, 1024, 1052, 1080, 1108, 1136, 1162, 1189, 1216, 1243, 1279, 1308, 1338, 1369, 1406, 1443]
    },
    "shutter": {
        resist: konst.ElementType.Phys,
        values: [26, 28, 29, 31, 33, 37, 39, 42, 47, 51, 56, 60, 67, 72, 80, 88, 96, 104, 112, 120, 129, 137, 146, 153, 162, 169, 177, 184, 194, 203, 213, 223, 232, 242, 253, 264, 276, 287, 299, 310, 322, 336, 350, 364, 383, 402, 422, 442, 463, 484, 504, 526, 547, 568, 598, 624, 651, 678, 707, 736, 763, 799, 834, 870, 911, 944, 979, 1012, 1046, 1080, 1113, 1148, 1176, 1204, 1246, 1281, 1316, 1350, 1386, 1419, 1452, 1486, 1520, 1553, 1599, 1634, 1672, 1712, 1758, 1803]
    },
    "conduct": {
        resist: konst.ElementType.Cryo,
        values: [8, 9, 9, 10, 11, 12, 12, 13, 16, 17, 18, 20, 22, 23, 27, 29, 31, 34, 37, 40, 42, 46, 48, 51, 53, 56, 59, 61, 64, 68, 71, 74, 77, 80, 84, 88, 91, 96, 99, 103, 107, 111, 117, 121, 128, 133, 140, 147, 154, 161, 168, 174, 182, 189, 199, 208, 217, 226, 236, 244, 254, 266, 278, 290, 303, 314, 326, 337, 348, 360, 371, 382, 391, 401, 414, 427, 438, 450, 461, 472, 483, 494, 507, 518, 532, 544, 557, 570, 586, 601]
    },
    "overload": {
        resist: konst.ElementType.Pyro,
        values: [33, 37, 39, 42, 44, 49, 52, 57, 62, 68, 73, 81, 89, 97, 107, 118, 128, 139, 150, 161, 172, 183, 194, 206, 217, 226, 236, 246, 259, 272, 284, 298, 310, 323, 338, 352, 368, 383, 399, 414, 430, 448, 467, 487, 511, 537, 562, 590, 618, 647, 673, 700, 729, 757, 797, 832, 868, 904, 942, 980, 1019, 1064, 1112, 1160, 1216, 1260, 1306, 1350, 1394, 1440, 1484, 1530, 1568, 1607, 1661, 1708, 1754, 1800, 1847, 1892, 1937, 1981, 2027, 2072, 2132, 2179, 2229, 2282, 2343, 2406]
    },
} as const;

export const ReactionScaleTable: ReadonlyPartial<Record<konst.ElementType, ReadonlyPartial<Record<konst.ReactionType, number>>>> = {
    pyro: {
        "vaporize": 1.5,
        "overload": 1.0,
        "melt": 2.0,
    },
    hydro: {
        "vaporize": 2.0,
        "echarge": 1.0,
    },
    elect: {
        "overload": 1.0,
        "echarge": 1.0,
        "conduct": 1.0,
    },
    cryo: {
        "melt": 1.5,
        "conduct": 1.0,
    },
    anemo: {
        "swirl": 1.0,
    }
} as const;

export function enumerateReaction(chara: ICharaInfo | null, enchant: konst.EnchantType) {
    let types: konst.ReactionType[] = [];
    if (chara) {
        let elems = [chara.element];
        if (enchant && (enchant !== chara.element)) {
            elems.push(enchant);
        }

        for (const elem of elems) {
            const scales = ReactionScaleTable[elem];
            if (scales) {
                // 元素反応を追加
                for (const type in scales) {
                    types.push(type as konst.ReactionType);
                }
            }

            // 氷砕きを追加
            if (elem === konst.ElementType.Geo) {
                types.push(konst.ReactionType.Shutter);
            } else if (chara.weapon === konst.WeaponType.Claymore) {
                types.push(konst.ReactionType.Shutter);
            }
        }
    }
    return types;
}

export type StatusTalent = Record<konst.TalentType, number>;
export type StatusBase = Record<konst.StatusType, number>;
export type StatusParam = Record<konst.BonusType, number>;
export type StatusFlat = Record<konst.CombatType, number>;
export type StatusReduct = Record<konst.ReductType, number>;
export type StatusEnchant = {
    type: konst.EnchantType;
    dest: konst.CombatType[];
    self: boolean;
};

export interface IStatus {
    talent: StatusTalent;
    base: StatusBase;
    param: StatusParam;
    flat: StatusFlat;
    reduct: StatusReduct;
    enchant: StatusEnchant;
};

export class Status {
    public chara: ICharaData | null;
    public talent: StatusTalent;
    public base: StatusBase;
    public param: StatusParam;
    public flat: StatusFlat;
    public reduct: StatusReduct;
    public enchant: StatusEnchant;

    constructor(data: IStatus) {
        this.chara = null;
        this.talent = data.talent;
        this.base = data.base;
        this.param = data.param;
        this.flat = data.flat;
        this.reduct = data.reduct;
        this.enchant = data.enchant;
    }

    equip({ info, chara, equip }: Member, globals: DBWeaponTable & DBArtifactTable) {
        this.chara = chara;

        for (const type of konst.BonusTypes) {
            this.param[type] = 0;
        }
        for (const type of konst.CombatTypes) {
            this.flat[type] = 0;
        }
        for (const type of konst.ReductTypes) {
            this.reduct[type] = 0;
        }
        this.enchant.type = "";
        this.enchant.dest.splice(0);
        this.enchant.self = false;

        // 基礎値
        this.param[konst.CriticalBonusType.Damage] = 50;
        this.param[konst.CriticalBonusType.Rate] = 5;

        if (info && chara && equip) {
            this.talent.combat = chara.combat;
            this.talent.skill = chara.skill;
            this.talent.burst = chara.burst;
            this.base.hp = chara.hp;
            this.base.atk = chara.atk;
            this.base.def = chara.def;

            // キャラクタ
            this.apply(chara.special);
            // 武器
            const { data } = getWeapon(info, equip, globals);
            if (data) {
                this.base.atk += data.atk;
                this.apply(data.second);
            }
            // 聖遺物
            const list = getArtifacts(equip, globals);
            for (const data of list) {
                this.apply(data.main);
                for (const prop of SubBonus) {
                    this.apply(data[prop]);
                }
            }
        } else {
            this.talent.combat = 0;
            this.talent.skill = 0;
            this.talent.burst = 0;
            this.base.hp = 0;
            this.base.atk = 0;
            this.base.def = 0;
        }
    }

    get level() {
        return parseInt(this.chara?.level?.replace("+", "") || "1");
    }

    get hp() {
        const a = this.param.hp;
        const x = this.param.hp_buf;
        const b = this.base.hp;
        return a + b + (x * b) / 100;
    }

    get atk() {
        const a = this.param.atk;
        const x = this.param.atk_buf;
        const b = this.base.atk;
        return a + b + (x * b) / 100;
    }

    get def() {
        const a = this.param.def;
        const x = this.param.def_buf;
        const b = this.base.def;
        return a + b + (x * b) / 100;
    }

    private apply({ type, value }: { type: konst.AnyBonusType, value: number; }) {
        if (type !== konst.BonusType.None) {
            this.param[type] += value;
        }
    }

    renchant(type: konst.EnchantType, dest: ReadonlyArray<konst.CombatType>, self: boolean) {
        if (!self && this.enchant.type) {
            switch (this.enchant.type) {
                case konst.ElementType.Elect:
                    if (type === konst.ElementType.Elect) {
                        return;
                    }
                    // 雷->氷・炎
                    break;
                case konst.ElementType.Cryo:
                    if (type !== konst.ElementType.Pyro) {
                        return;
                    }
                    // 氷->炎
                    break;
                default:
                    return;
            }
        }

        this.enchant.type = type;
        this.enchant.dest.splice(0);
        this.enchant.dest.push(...dest);
        this.enchant.self = self;
    }

    // 攻撃ダメージ値（％）
    combatBonus(type: konst.CombatType) {
        return this.param[TypeToBonus.combat(type)];
    }

    // 元素ダメージ値（％）
    elementBonus(type: konst.ElementType) {
        let rate = this.param[TypeToBonus.element(type)];
        if (type !== konst.ElementType.Phys) {
            rate += this.param.elem_dmg;
        }
        return rate;
    }

    // 元素熟知ダメージ値（％）
    elementMaster(type: konst.ReactionType) {
        switch (type) {
            case konst.ReactionType.Melt:
            case konst.ReactionType.Vaporize:
                return 100 * this.param.elem / (1400 + this.param.elem) * 25 / 9;
        }
        return 100 * this.param.elem / (1400 + this.param.elem) * 60 / 9;
    }

    // 元素反応ダメージ値（％）
    reactionBonus(type: konst.ReactionType) {
        return this.param[TypeToBonus.reaction(type)];
    }

    // 元素反応のダメージ倍率
    reactionScale(type: konst.ReactionType, act: konst.ElementType) {
        if (type === konst.ReactionType.Shutter) {
            switch (act) {
                case konst.ElementType.Phys:
                case konst.ElementType.Geo:
                    return 1.0;
            }
        } else {
            const scales = ReactionScaleTable[act];
            if (scales) {
                const value = scales[type];
                if (value) {
                    return value;
                }
            }
        }
        return 0.0;
    }

    // 会心値（％）
    critical(type: konst.CombatType = konst.CombatType.Normal): {
        rate: number;
        damage: number;
    } {
        let rate = this.param.cri_rate;
        switch (type) {
            case konst.CombatType.Normal:
                rate += this.param.normal_cri;
                break;
            case konst.CombatType.Heavy:
                rate += this.param.heavy_cri;
                break;
            case konst.CombatType.Skill:
                rate += this.param.skill_cri;
                break;
        }
        return { rate, damage: this.param.cri_dmg };
    }
}

export const TypeToBonus = {
    element(type: konst.ElementType) {
        return type + "_dmg" as konst.ElementBonusType;
    },
    combat(type: konst.CombatType) {
        return type + "_dmg" as konst.CombatBonusType;
    },
    reaction(type: konst.ReactionType) {
        return type + "_dmg" as konst.ReactionBonusType;
    },
    buffer(type: konst.StatusBonusType) {
        return type + "_buf" as konst.StatusBonusType;
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
    }
} as const;

// TODO: 多言語対応
export const TeamBonus: Partial<ReadonlyRecord<konst.ElementType, IBasicBonus>> = {
    pyro: { items: konst.StatusBonusType.AtkBuf, value: 25 },
    cryo: { items: konst.CriticalBonusType.Rate, value: 15, limit: "氷元素付着または凍結状態の敵" },
    geo: { items: konst.AnyBonusType.Damage, value: 15, limit: "シールドが存在する時" },
} as const;

export class BonusBase {
    public readonly vm: Vue;
    public readonly ref: string; // キャラID
    public readonly index: number;
    public readonly group: string; // table-dataのグループ
    public readonly extra: konst.ExtraBonusType | undefined;
    public readonly limit: string;
    public readonly times: number;
    public readonly stack: number;
    public readonly target: konst.BonusTarget;
    public readonly source: string;
    public data: IBonusData;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string,
        { extra, limit, times, stack, target }: IBonusOption) {
        this.vm = vm;
        this.ref = ref;
        this.index = index;
        this.group = group;
        this.extra = extra;
        this.limit = limit ?? "";
        this.times = times ?? 0;
        this.stack = stack ?? 0;
        this.target = target ?? konst.BonusTarget.Self;
        this.source = source;
        this.data = { index: index, apply: this.always, stack: stack ?? 1 };
    }

    public get always() {
        return !this.limit;
    }

    public get checked() {
        return this.data.apply;
    }
    public set checked(value: boolean) {
        this.data.apply = value;
    }

    public get effect() {
        return "";
    }

    public get condition() {
        if (this.limit) {
            return `${this.limit}に${this.effect}`;
        }
        return this.effect;
    }

    public get stacks() {
        return this.data.stack;
    }
    public set stacks(value: number) {
        this.data.stack = value;
    }

    public reset(data: IBonusData) {
        this.data = data;
        this.data.apply = this.always || data.apply;
        this.data.stack = data.stack || 1;
    }

    public isMine(chara: ICharaData) {
        return this.group === "general.everyone" || this.group.includes(chara.name);
    }

    public getLabel(type: konst.AnyBonusType) {
        return String(this.vm.$t("bonus." + type)).replace("(%)", "");
    }

    public apply(status: Status) { }
}

// 通常ボーナス
export class BasicBonus extends BonusBase {
    private readonly types: ReadonlyArray<konst.BonusType>;
    private readonly value: number;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string, data: IBasicBonus) {
        super(vm, ref, index, group, source, data);
        const types = data.items;
        this.types = Array.isArray(types) ? types : [types];
        this.value = data.value;
    }

    public get effect() {
        const items = this.types;
        let str = this.types.map(type => this.getLabel(type)).join("・");
        if (RateBonus.check(items[0])) {
            return `${str} +${this.vm.$roundFloat(this.value)}%`;
        }
        return `${str} +${this.value}`;
    }

    public apply(status: Status) {
        if (this.data.apply) {
            const value = this.value;
            for (const type of this.types) {
                status.param[type] += value * this.data.stack;
            }
        }
    }
}

// 固定割合ボーナス
export class FlatBonus extends BonusBase {
    private readonly dest: konst.FlatBonusDest;
    private readonly base: konst.FlatBonusBase;
    private readonly value: number;
    private readonly scale: konst.DamageScale | "";
    private readonly bound: IFlatBonusBound | null;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string, data: IFlatBonus) {
        super(vm, ref, index, group, source, data);
        const dest = data.dest;
        this.dest = dest;
        this.base = data.base;
        this.value = data.value;
        this.scale = data.scale ?? "";
        this.bound = data.bound ?? null;
    }

    // TODO: 多言語対応
    public get effect() {
        let str: string;
        switch (this.dest) {
            case konst.FlatBonusDest.Combat:
            case konst.FlatBonusDest.CombatDmg:
                str = this.vm.$t("bonus.combat_dmg") as string;
                break;
            case konst.FlatBonusDest.Skill:
            case konst.FlatBonusDest.Burst:
                str = this.getLabel(TypeToBonus.combat(this.dest));
                break;
            default:
                str = this.getLabel(this.dest);
                break;
        }
        const value = this.vm.$roundFloat(this.value);
        switch (this.base) {
            case konst.FlatBonusBase.None:
                return `${str} +${value}%`;
            case konst.FlatBonusBase.Atk:
                return `${str} +${this.vm.$t("bonus.atk_base")}の${value}%分`;
            default:
                return `${str} +${this.getLabel(this.base)}の${value}%分`;
        }
    }

    public apply(status: Status) {
        if (this.data.apply) {
            let value = this.value;
            switch (this.base) {
                case konst.FlatBonusBase.None:
                    break;
                case konst.FlatBonusBase.Hp:
                    value = status.hp * value / 100;
                    break;
                case konst.FlatBonusBase.Atk:
                    value = status.base.atk * value / 100;
                    break;
                case konst.FlatBonusBase.Def:
                    value = status.def * value / 100;
                    break;
                default:
                    value = status.param[this.base] * value / 100;
                    break;
            }
            value *= this.data.stack;

            // ダメージ倍率適用
            if (this.scale) {
                const burst = status.talent.burst || 1; // TODO: 元素爆発固定
                value *= DamageScaleTable[this.scale][burst - 1] / 100;
            }

            // 最大値チェック
            const bound = this.bound;
            if (bound) {
                switch (bound.base) {
                    // 直値
                    case konst.FlatBonusBase.None:
                        if (bound.value < value) {
                            value = bound.value;
                        }
                        break;
                    // 基礎攻撃力の倍率
                    case konst.FlatBonusBase.Atk:
                        const atk = status.base.atk * bound.value / 100;
                        if (atk < value) {
                            value = atk;
                        }
                        break;
                    // 最終値の倍率
                    default:
                        const limit = status.param[bound.base] * bound.value / 100;
                        if (limit < value) {
                            value = limit;
                        }
                        break;
                }
            }

            switch (this.dest) {
                case konst.FlatBonusDest.Combat:
                    status.flat[konst.CombatType.Normal] += value;
                    status.flat[konst.CombatType.Heavy] += value;
                    status.flat[konst.CombatType.Plunge] += value;
                    break;
                case konst.FlatBonusDest.Skill:
                case konst.FlatBonusDest.Burst:
                    status.flat[this.dest] += value;
                    break;
                case konst.FlatBonusDest.CombatDmg:
                    status.param[konst.CombatBonusType.Normal] += value;
                    status.param[konst.CombatBonusType.Heavy] += value;
                    status.param[konst.CombatBonusType.Plunge] += value;
                    break;
                default:
                    status.param[this.dest] += value;
                    break;
            }
        }
    }
}

// 耐性減衰ボーナス
export class ReductBonus extends BonusBase {
    private readonly types: Readonly<konst.ReductType[]>;
    private readonly value: number;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string, data: IReductBonus) {
        super(vm, ref, index, group, source, { ...data, target: konst.BonusTarget.Enemy });
        const types = data.type;
        this.types = Array.isArray(types) ? types : [types];
        this.value = data.value;
    }

    // TODO: 多言語対応
    public get effect() {
        const types = this.types.map(type => this.vm.$t("reduct." + type)).join("・");
        return `${types} -${this.vm.$roundRate(this.value)}`;
    }

    public apply(status: Status) {
        if (this.data.apply) {
            for (const type of this.types) {
                status.reduct[type] += this.value;
            }
        }
    }
}

// 元素付与ボーナス
export class EnchantBonus extends BonusBase {
    private readonly type: konst.EnchantType;
    private readonly dest: ReadonlyArray<konst.CombatType>;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string, data: IEnchantBonus) {
        super(vm, ref, index, group, source, data);
        this.type = data.elem;
        this.dest = data.dest;
    }

    public get effect() {
        const dest = this.dest.map(dest => this.vm.$t("combat." + dest)).join("・");
        return `${dest}に${this.vm.$t("element." + this.type)}元素付与`;
    }

    public apply(status: Status) {
        if (this.data.apply) {
            status.renchant(this.type, this.dest, this.target === konst.BonusTarget.Self);
        }
    }
}

export interface IBonusData {
    index: number;
    apply: boolean;
    stack: number;
}
export type DBBonusTable = { bonus: IDict<IBonusData>; };

type Database =
    DBEquipTable &
    DBBonusTable &
    DBCharaTable &
    DBWeaponTable &
    DBArtifactTable;

export class BonusBuilder {
    private vm: Vue;
    public team: string;
    public equip: string;
    public group: string;
    private bonus: IDict<IBonusData>;
    public output: IDict<IBonusData>;

    constructor(vm: Vue, bonus: IDict<IBonusData>) {
        this.vm = vm;
        this.team = "";
        this.equip = "";
        this.group = "";
        this.bonus = bonus;
        this.output = {};
    }

    private convert(data: AnyBonus, ref: string, index: number, origin: string, source: string): BonusBase {
        let group: string;
        if (data.target && data.target !== konst.BonusTarget.Self) {
            group = "general.everyone";
            index += 1000;
        } else {
            group = this.group;
            source = "origin." + origin;
        }

        let bonus: BonusBase;
        switch (data.extra) {
            case konst.ExtraBonusType.Flat:
                bonus = new FlatBonus(this.vm, ref, index, group, source, data);
                break;
            case konst.ExtraBonusType.Reduct:
                bonus = new ReductBonus(this.vm, ref, index, group, source, data);
                break;
            case konst.ExtraBonusType.Enchant:
                bonus = new EnchantBonus(this.vm, ref, index, group, source, data);
                break;
            default:
                bonus = new BasicBonus(this.vm, ref, index, group, source, data);
                break;
        }

        const key = `${this.team}.${this.equip}.${index}`;
        if (key in this.bonus) {
            bonus.reset(this.bonus[key]);
        }
        this.output[key] = bonus.data;
        return bonus;
    }

    private append(data: ReadonlyArrayable<AnyBonus>, ref: string, index: number, origin: string, source: string): BonusBase[] {
        if (Array.isArray(data)) {
            return data.map((value, i) => this.convert(value, ref, index + i, origin, source));
        }
        return [this.convert(data, ref, index, origin, source)];
    }

    public charaBonus(data: ICharaData): BonusBase[] {
        const source = "chara." + data.name;
        const chara = CharaList[data.name];
        const level = parseInt(data.level.replace("+", "") || "1");
        let bonus: BonusBase[] = [];
        for (const [idx, origin] of Passives.entries()) {
            const passive = chara.passive[origin];
            if (passive) {
                switch (origin) {
                    case Passives[2]:
                        if ((21 <= level) || (data.level === "20+")) {
                            bonus.push(...this.append(passive, data.id, 100 + (idx * 10), origin, source));
                        }
                        break;
                    case Passives[3]:
                        if ((61 <= level) || (data.level === "60+")) {
                            bonus.push(...this.append(passive, data.id, 100 + (idx * 10), origin, source));
                        }
                        break;
                    default:
                        bonus.push(...this.append(passive, data.id, 100 + (idx * 10), origin, source));
                }
            }
        }
        for (const [idx, origin] of Constes.entries()) {
            const conste = chara.conste[origin];
            const count = parseInt(origin.replace("lv", ""));
            if (conste) {
                if (count <= data.conste) {
                    bonus.push(...this.append(conste, data.id, 150 + idx * 10, origin, source));
                }
            }
        }
        return bonus;
    }

    public weaponBonus(type: konst.WeaponType, data: IWeaponData | undefined): BonusBase[] {
        if (data) {
            const source = `weapon.${type}.${data.name}`;
            const weapon = WeaponList[type][data.name];
            const bonus = weapon.passive;
            if (bonus) {
                if (Array.isArray(bonus)) {
                    return bonus.map((value, i) => this.convert(
                        { ...value, value: value.value[data.rank - 1] }, data.id, 200 + i, "weapon", source));
                } else {
                    return [this.convert(
                        { ...bonus, value: bonus.value[data.rank - 1] }, data.id, 200, "weapon", source)];
                }
            }
        }
        return [];
    }

    public artifactBonus(names: ArtifactName[]): BonusBase[] {
        let bonus: BonusBase[] = [];
        let first = 0;
        while (first < names.length) {
            let name = names[first];
            let last = names.lastIndexOf(name) + 1;
            if (name in ArtifactList) {
                let same = last - first;
                const source = "artifact.name." + name;
                const artifact = ArtifactList[name];
                // 2セットの効果追加
                if (2 <= same) {
                    if (artifact.set2) {
                        bonus.push(...this.append(artifact.set2, name, 300, "artifact", source));
                    }
                }
                // 4セットの効果追加
                if (4 <= same) {
                    if (artifact.set4) {
                        bonus.push(...this.append(artifact.set4, name, 310, "artifact", source));
                    }
                }
            }
            first = last;
        }
        return bonus;
    }

    public resonanceBonus(elems: konst.ElementType[]): BonusBase[] {
        let bonus: BonusBase[] = [];
        for (const [idx, elem] of elems.entries()) {
            const base = TeamBonus[elem];
            if (base) {
                const data = { ...base, target: konst.BonusTarget.All };
                bonus.push(...this.append(data, "", 400 + idx, "resonance", "general.resonance"));
            }
        }
        return bonus;
    }

    public build(team: ITeamData, db: Database) {
        let data: BonusBase[] = [];
        this.team = team.id;
        for (const key of Members) {
            const { info, chara, equip } = getMember(team[key], db);
            if (info && chara && equip) {
                this.equip = equip.id;
                this.group = "chara." + chara.name;

                // キャラボーナス追加
                data.push(...this.charaBonus(chara));
                // 武器ボーナス追加
                const weapon = getWeapon(info, equip, db);
                data.push(...this.weaponBonus(weapon.type, weapon.data));
                // 聖遺物ボーナス追加
                const artifacts = getArtifacts(equip, db).map((val) => val.name);
                data.push(...this.artifactBonus(artifacts));
            }
        }
        // 超電導を追加 TODO: 多言語対応
        {
            const bonus = {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Phys,
                value: 40,
                limit: "超電導が発生した時",
                times: 12,
                target: konst.BonusTarget.All
            };
            data.push(...this.append(bonus, "", 250, "conduct", "reaction.conduct"));
        }
        // 元素共鳴ボーナス追加
        data.push(...this.resonanceBonus(team.resonance));
        data.sort(
            (a, b) =>
                a.group.localeCompare(b.group) ||
                a.index - b.index ||
                a.source.localeCompare(b.source)
        );
        return data;
    }
}
