import * as konst from "~/src/const";

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

export type AnyBonus = IBasicBonus | IFlatBonus | ICombatBonus | IElementBonus | IReductBonus | IEnchantBonus;

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
