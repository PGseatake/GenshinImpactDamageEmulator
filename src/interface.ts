import {
    CombatType,
    ElementType,
    BonusType,
    AnyBonusType,
    ExtraBonusType,
    BonusTarget,
    DamageScale,
    FlatBonusBase,
    FlatBonusDest,
    ReductBonusType,
} from "~/src/const";

export interface IBonus {
    readonly extra?: undefined;
    readonly items: ReadonlyArrayable<BonusType>;
    readonly value: ReadonlyArrayable<number>;
    readonly limit?: string;
    readonly times?: number;
    readonly stack?: number;
    readonly target?: BonusTarget;
}
export interface IBasicBonus extends IBonus {
    readonly value: number;
}
export interface IWeaponBonus extends IBonus {
    readonly value: ReadonlyArray<number>;
}

export interface IExtraBonus {
    readonly extra?: ExtraBonusType;
}

export interface IFlatBonusMax {
    readonly base: FlatBonusBase;
    readonly value: number;
}

export interface IFlatBonus extends IExtraBonus {
    readonly extra: "flat";
    readonly dest: FlatBonusDest;
    readonly base: FlatBonusBase;
    readonly value: ReadonlyArrayable<number>;
    readonly max?: IFlatBonusMax;
    readonly scale?: DamageScale;
    readonly limit?: string;
    readonly times?: number;
    readonly stack?: number;
    readonly target?: BonusTarget;
}
export interface IBasicFlatBonus extends IFlatBonus {
    readonly value: number;
}
export interface IWeaponFlatBonus extends IFlatBonus {
    readonly value: ReadonlyArray<number>;
}

export interface IReductBonus extends IExtraBonus {
    readonly extra: "reduct";
    readonly type: ReadonlyArrayable<ReductBonusType>;
    readonly value: number;
    readonly limit?: string;
    readonly times?: number;
}

export interface IEnchantBonus extends IExtraBonus {
    readonly extra: "enchant";
    readonly elem: ElementType;
    readonly dest: ReadonlyArray<CombatType>;
    readonly limit: string;
    readonly times?: number;
    readonly target?: BonusTarget;
}

export interface IArtifactSet {
    readonly set2?: IBasicBonus;
    readonly set4?: ReadonlyArrayable<IBasicBonus>;
}

export interface IWeapon {
    readonly star: number;
    readonly atk?: ReadonlyArray<number>;
    readonly second: AnyBonusType;
    readonly secval?: ReadonlyArray<number>;
    readonly passive?: ReadonlyArrayable<IWeaponBonus | IWeaponFlatBonus>;
}

export interface IValueData {
    value: number;
}

export interface IEquipData {
    id: string;
    name: string;
    comment: string;
    level: string;
}

export interface IBonusValueData extends IValueData {
    type: AnyBonusType;
}

export interface IWeaponData extends IEquipData {
    rank: number;
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
