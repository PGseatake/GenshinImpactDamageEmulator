import * as konst from "~/src/const";

export interface IBonus {
    readonly extra?: undefined;
    readonly items: ReadonlyArrayable<konst.BonusType>;
    readonly value: ReadonlyArrayable<number>;
    readonly limit?: string;
    readonly times?: number;
    readonly stack?: number;
    readonly target?: konst.BonusTarget;
}
export interface IBasicBonus extends IBonus {
    readonly value: number;
}
export interface IWeaponBonus extends IBonus {
    readonly value: ReadonlyArray<number>;
}

export interface IExtraBonus {
    readonly extra?: konst.ExtraBonusType;
}

export interface IFlatBonusMax {
    readonly base: konst.FlatBonusBase;
    readonly value: number;
}

export interface IFlatBonus extends IExtraBonus {
    readonly extra: "flat";
    readonly dest: konst.FlatBonusDest;
    readonly base: konst.FlatBonusBase;
    readonly value: ReadonlyArrayable<number>;
    readonly max?: IFlatBonusMax;
    readonly scale?: konst.DamageScale;
    readonly limit?: string;
    readonly times?: number;
    readonly stack?: number;
    readonly target?: konst.BonusTarget;
}
export interface IBasicFlatBonus extends IFlatBonus {
    readonly value: number;
}
export interface IWeaponFlatBonus extends IFlatBonus {
    readonly value: ReadonlyArray<number>;
}

export interface IReductBonus extends IExtraBonus {
    readonly extra: "reduct";
    readonly type: ReadonlyArrayable<konst.ReductBonusType>;
    readonly value: number;
    readonly limit?: string;
    readonly times?: number;
}

export interface IEnchantBonus extends IExtraBonus {
    readonly extra: "enchant";
    readonly elem: konst.ElementType;
    readonly dest: ReadonlyArray<konst.CombatType>;
    readonly limit: string;
    readonly times?: number;
    readonly target?: konst.BonusTarget;
}

export type AnyExtraBonus = IBasicBonus | IBasicFlatBonus | IReductBonus | IEnchantBonus;

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

export interface IPassive {
    readonly skill?: ReadonlyArrayable<AnyExtraBonus>;
    readonly burst?: ReadonlyArrayable<AnyExtraBonus>;
    readonly lv4?: ReadonlyArrayable<AnyExtraBonus>;
    readonly lv5?: ReadonlyArrayable<AnyExtraBonus>;
}

export interface IConste {
    readonly lv1?: ReadonlyArrayable<AnyExtraBonus>;
    readonly lv2?: ReadonlyArrayable<AnyExtraBonus>;
    readonly lv4?: ReadonlyArrayable<AnyExtraBonus>;
    readonly lv6?: ReadonlyArrayable<AnyExtraBonus>;
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

export interface IEquipData extends IIdentify, ICommentable {
    chara: string;
    weapon: string;
    flower: string;
    feather: string;
    sands: string;
    goblet: string;
    circlet: string;
}
export type GlobalEquipData = { equip: IEquipData[]; };

export const Members = ["member1", "member2", "member3", "member4"] as const;
export type Members = typeof Members[number];

export interface ITeamData extends IIdentify, INameable, Record<Members, string> {
    resonance: konst.ElementType[];
}
export type GlobalTeamData = { team: ITeamData[]; };

export const GlobalDataTypes = [
    "equip",
    "team",
    "chara",
    ...konst.WeaponTypes,
    ...konst.ArtifactTypes,
] as const;
export type GlobalDataType = typeof GlobalDataTypes[number];

export type GlobalVersion = { version: "1.0"; };
