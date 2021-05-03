import {
    BonusType,
    BonusTarget,
    AnyBonusType,
} from "~/src/const";

export interface IMap<T> {
    [key: string]: T;
}

export interface IReadonlyMap<T> {
    readonly [key: string]: T;
}

export interface IBonus {
    readonly extra?: undefined;
    readonly items: BonusType | ReadonlyArray<BonusType>;
    readonly value: number | ReadonlyArray<number>;
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

export interface IArtifactSet {
    readonly set2?: IBasicBonus;
    readonly set4?: IBasicBonus | ReadonlyArray<IBasicBonus>;
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

export interface IArtifactData extends IEquipData {
    star: number;
    main: IBonusValueData;
    sub1: IBonusValueData;
    sub2: IBonusValueData;
    sub3: IBonusValueData;
    sub4: IBonusValueData;
}
