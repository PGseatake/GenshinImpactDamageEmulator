import * as konst from "~/src/const";

export interface IBonusOption {
    readonly extra?: konst.ExtraBonusType;
    readonly limit?: string;
    readonly times?: number;
    readonly stack?: number;
    readonly target?: konst.BonusTarget;
}

export interface IBonusBase extends IBonusOption {
    readonly extra?: undefined;
    readonly items: ReadonlyArrayable<konst.BonusType>;
    readonly value: ReadonlyArrayable<number>;
    // readonly limit?: string;
    // readonly times?: number;
    // readonly stack?: number;
    // readonly target?: konst.BonusTarget;
}
export interface IBasicBonus extends IBonusBase {
    readonly value: number;
}
export interface IWeaponBonus extends IBonusBase {
    readonly value: ReadonlyArray<number>;
}

export interface IFlatBonusBound {
    readonly base: konst.FlatBonusBase;
    readonly value: number;
}

export interface IFlatBonusBase extends IBonusOption {
    readonly extra: "flat";
    readonly dest: konst.FlatBonusDest;
    readonly base: konst.FlatBonusBase;
    readonly value: ReadonlyArrayable<number>;
    readonly bound?: IFlatBonusBound;
    readonly scale?: konst.DamageScale;
    // readonly limit?: string;
    // readonly times?: number;
    // readonly stack?: number;
}
export interface IFlatBonus extends IFlatBonusBase {
    readonly value: number;
}
export interface IWeaponFlatBonus extends IFlatBonusBase {
    readonly value: ReadonlyArray<number>;
}

export interface IReductBonus extends IBonusOption {
    readonly extra: "reduct";
    readonly type: ReadonlyArrayable<konst.ReductType>;
    readonly value: number;
    // readonly limit?: string;
    // readonly times?: number;
}

export interface IEnchantBonus extends IBonusOption {
    readonly extra: "enchant";
    readonly elem: konst.ElementType;
    readonly dest: ReadonlyArray<konst.CombatType>;
    readonly limit: string;
    // readonly times?: number;
}

export type AnyExtraBonus = IBasicBonus | IFlatBonus | IReductBonus | IEnchantBonus;

export const CombatElementType = {
    Contact: "contact"
} as const;
export type CombatElementType = konst.ElementType | typeof CombatElementType[keyof typeof CombatElementType];

export interface ICombat {
    readonly name: string;
    readonly type: konst.CombatType;
    readonly elem: CombatElementType;
    readonly scale: konst.DamageScale;
    readonly value: ReadonlyArrayable<number>;
    readonly multi?: number;
    readonly based?: konst.DamageBased;
}

export type CharaStatusType = "hp" | "atk" | "def";
export type CharaStatus = ReadonlyRecord<CharaStatusType, ReadonlyArray<number>>;
export type CharaTalent = ReadonlyRecord<konst.TalentType, ReadonlyArray<ICombat>>;

export const Passives = ["skill", "burst", "asc1st", "asc4th"] as const;
export interface IPassive extends
    Partial<ReadonlyRecord<typeof Passives[number], ReadonlyArrayable<AnyExtraBonus>>> {
}

export const Constes = ["lv1", "lv2", "lv4", "lv6"] as const;
export interface IConste extends
    Partial<ReadonlyRecord<typeof Constes[number], ReadonlyArrayable<AnyExtraBonus>>> {
}

export interface ICharacter {
    readonly star: number;
    readonly element: konst.ElementType;
    readonly weapon: konst.WeaponType;
    readonly status: CharaStatus;
    readonly special: konst.StatusBonusType | konst.ElementBonusType;
    readonly spvalue: ReadonlyArray<number>;
    readonly talent: CharaTalent;
    readonly passive: IPassive;
    readonly conste: IConste;
}

export interface IArtifactSet {
    readonly set2?: IBasicBonus;
    readonly set4?: ReadonlyArrayable<IBasicBonus>;
}

export interface IWeapon {
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

export interface IBonusValueData {
    type: konst.AnyBonusType;
    value: number;
}

export interface IEquipData extends IIdentify, ICommentable, Record<konst.ArtifactType, string> {
    chara: string;
    weapon: string;
}
export type GlobalEquipData = { equip: IEquipData[]; };

export const GlobalDataTypes = [
    "equip",
    "team",
    "bonus",
    "chara",
    ...konst.WeaponTypes,
    ...konst.ArtifactTypes,
] as const;
export type GlobalDataType = typeof GlobalDataTypes[number];

export type GlobalVersion = { version: "1.0"; };
