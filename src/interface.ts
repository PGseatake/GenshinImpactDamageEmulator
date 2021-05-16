import {
    BonusType,
    BonusTarget,
    AnyBonusType,
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

export interface IArtifactSet {
    readonly set2?: IBasicBonus;
    readonly set4?: ReadonlyArrayable<IBasicBonus>;
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
