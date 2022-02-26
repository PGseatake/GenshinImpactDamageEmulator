import VueI18n, { IVueI18n } from "vue-i18n/types";
import * as konst from "~/src/const";

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
export type StatusCritical = {
    rate: number;
    damage: number;
};

export const StatusBase = {
    "en_rec": 100,
    "cri_dmg": 50,
    "cri_rate": 5,
    check(type: konst.BonusType): type is konst.StatusType {
        switch (type) {
            case konst.StatusBonusType.Hp:
            case konst.StatusBonusType.Atk:
            case konst.StatusBonusType.Def:
                return true;
        }
        return false;
    },
    value(type: konst.BonusType): number {
        return StatusBase[type as ("en_rec" | "cri_dmg" | "cri_rate")] || 0;
    },
} as const;

export interface IStatus {
    talent: StatusTalent;
    base: StatusBase;
    param: StatusParam;
    flat: StatusFlat;
    reduct: StatusReduct;
    enchant: StatusEnchant;
};

export type BonusValue = {
    type: konst.AnyBonusType;
    value: number;
};

export interface IBonusOption {
    readonly extra?: konst.ExtraBonusType;
    readonly limit?: string;
    readonly stack?: number;
    readonly times?: number;
    readonly target?: konst.BonusTarget;
}

export interface IBasicBonus extends IBonusOption {
    readonly extra?: undefined;
    readonly items: ReadonlyArrayable<konst.BonusType>;
    readonly value: ReadonlyArrayable<number>;
    // readonly limit?: string;
    // readonly times?: number;
    // readonly stack?: number;
    // readonly target?: konst.BonusTarget;
}
export interface IWeaponBonus extends IBasicBonus {
    readonly value: ReadonlyArray<number>;
}

export interface IFlatBonusBound {
    readonly base?: konst.FlatBonusBase;
    readonly value: number;
}
export interface IFlatBonusScale {
    type: konst.DamageScale;
    talent: konst.TalentType;
};

export interface IFlatBonus extends IBonusOption {
    readonly extra: "flat";
    readonly dest: ReadonlyArrayable<konst.FlatBonusDest>;
    readonly base?: konst.FlatBonusBase; // undefined = 整数直値
    readonly value: ReadonlyArrayable<number>;
    readonly bound?: IFlatBonusBound;
    readonly scale?: IFlatBonusScale;
    // readonly limit?: string;
    // readonly times?: number;
    // readonly stack?: number;
    // readonly target?: konst.BonusTarget;
}
export interface IWeaponFlatBonus extends IFlatBonus {
    readonly value: ReadonlyArray<number>;
}

export interface ICombatBonus extends IBonusOption {
    readonly extra: "combat";
    readonly bind: ReadonlyArrayable<string>;
    readonly dest?: konst.CombatBonusDest; // undefined = ダメージ実数
    readonly base?: konst.StatusBonusType; // undefined = 割合直値
    readonly value: number;
    readonly format: string;
    // readonly limit?: string;
    // readonly times?: number;
    // readonly target?: konst.BonusTarget;
}

export interface IElementBonus extends IBonusOption {
    readonly extra: "element";
    readonly dest?: konst.StatusBonusType;
    readonly base?: konst.StatusBonusType;
    readonly value: ReadonlyArrayable<number>;
    readonly scale?: IFlatBonusScale;
    readonly format: string;
    // readonly limit?: string;
    // readonly times?: number;
    // readonly target?: konst.BonusTarget;
}

export interface IReductBonus extends IBonusOption {
    readonly extra: "reduct";
    readonly type?: ReadonlyArrayable<konst.AnyReductType>;
    readonly value: ReadonlyArrayable<number>;
    readonly bind?: string;
    // readonly limit?: string;
    // readonly times?: number;
    // readonly target?: konst.BonusTarget;
}

export interface IEnchantBonus extends IBonusOption {
    readonly extra: "enchant";
    readonly elem: konst.EnchantType;
    readonly dest: ReadonlyArray<konst.CombatType>;
    readonly limit: string;
    // readonly times?: number;
}

export interface IStatusBonus {
    step: number;
    target: IStatus;
    party: ReadonlyArray<IStatus>;
    contact?: konst.AnyContactType;
    reaction?: konst.AnyReactionType;
}
export interface ICombatStatusBonus extends IStatusBonus {
    type: konst.CombatType;
    name: string;
    element: konst.AnyElementType;
}

// 追加ボーナス
export type ExtraBonus = {
    atk: number;
    dmg: number;
    flat: number;
    crit: StatusCritical;
    reduct: StatusReduct;
};

export interface ISpecialBonus extends IBonusOption {
    readonly extra: "special";
    readonly [key: string]: any;
    readonly step: (self: ISpecialBonus) => number;
    readonly effect: (self: ISpecialBonus, owner: Readonly<IStatus>, i18n: IVueI18n) => VueI18n.TranslateResult;
    readonly apply?: (self: ISpecialBonus, arg: IStatusBonus) => void;
    readonly applyEx?: (self: ISpecialBonus, dst: ExtraBonus, arg: ICombatStatusBonus) => void;
}

export type AnyBonus = IBasicBonus | IFlatBonus | ICombatBonus | IElementBonus | IReductBonus | IEnchantBonus | ISpecialBonus;

export interface ICombat {
    readonly name: string;
    readonly type: konst.CombatType;
    readonly elem: konst.CombatElementType;
    readonly scale: konst.DamageScale;
    readonly value: ReadonlyArrayable<number>;
    readonly multi?: number;
    readonly based?: konst.DamageBased;
}

export const Passive = {
    Ascension1: "asc1st",
    Ascension4: "asc4th",
} as const;
export const Passives = ["dash", "skill", "burst", "asc1st", "asc4th"] as const;
export interface IPassive extends
    Partial<ReadonlyRecord<typeof Passives[number], ReadonlyArrayable<AnyBonus>>> {
}

export const Constes = ["lv1", "lv2", "lv4", "lv6"] as const;
export interface IConste extends
    Partial<ReadonlyRecord<typeof Constes[number], ReadonlyArrayable<AnyBonus>>> {
}

export interface ICharaInfo {
    readonly star: number;
    readonly element: konst.ElementType;
    readonly energy: number;
    readonly weapon: konst.WeaponType;
    readonly status: ReadonlyRecord<konst.StatusType, ReadonlyArray<number>>;
    readonly special: konst.StatusBonusType | konst.ElementBonusType;
    readonly spvalue: ReadonlyArray<number>;
    readonly talent: ReadonlyRecord<konst.TalentType, ReadonlyArray<ICombat>>;
    readonly passive: IPassive;
    readonly conste: IConste;
}

export interface IArtifactInfo {
    readonly set2?: IBasicBonus;
    readonly set4?: ReadonlyArrayable<IBasicBonus | IFlatBonus | IReductBonus>;
}

export interface IWeaponInfo {
    readonly star: number;
    readonly atk: ReadonlyArray<number>;
    readonly second: konst.AnyBonusType;
    readonly secval: ReadonlyArray<number>;
    readonly passive?: ReadonlyArrayable<IWeaponBonus | IWeaponFlatBonus>;
}

export interface IIdentify {
    id: string;
}
export interface INameable {
    name: string;
}
export interface ICommentable {
    comment: string;
}
