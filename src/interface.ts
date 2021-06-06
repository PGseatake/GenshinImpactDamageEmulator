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

export interface IValueData {
    value: number;
}

export interface IEquipData extends IIdentify {
    name: string;
    comment: string;
    level: string;
}

export interface IBonusValueData extends IValueData {
    type: konst.AnyBonusType;
}

export interface ICharaData extends IEquipData {
    conste: number;
    hp: number;
    atk: number;
    def: number;
    special: IBonusValueData;
    combat: number;
    skill: number;
    burst: number;
}

export interface IWeaponData extends IEquipData {
    rank: number;
    atk: number;
    second: IBonusValueData;
}

export interface IArtifactData extends IEquipData {
    star: number;
    main: IBonusValueData;
    sub1: IBonusValueData;
    sub2: IBonusValueData;
    sub3: IBonusValueData;
    sub4: IBonusValueData;
}

export type GlobalCharaData = { chara: ICharaData[]; };
export type GlobalWeaponData = Record<konst.WeaponType, IWeaponData[]>;
export type GlobalArtifactData = Record<konst.ArtifactType, IArtifactData[]>;

export type GlobalData =
    GlobalCharaData & GlobalWeaponData & GlobalArtifactData;

export const GlobalDataTypes: string[] = ["chara", ...konst.WeaponTypes, ...konst.ArtifactTypes];
