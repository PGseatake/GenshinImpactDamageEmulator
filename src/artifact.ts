import * as konst from "~/src/const";
import { IArtifactSet, IBonusValueData, IIdentify, INameable, ICommentable } from "~/src/interface";

export const ArtifactMain: Record<konst.ArtifactType, ReadonlyArray<konst.AnyBonusType>> = {
    "flower": [konst.StatusBonusType.Hp],
    "feather": [konst.StatusBonusType.Atk],
    "sands": [
        konst.StatusBonusType.HpBuf,
        konst.StatusBonusType.AtkBuf,
        konst.StatusBonusType.DefBuf,
        konst.StatusBonusType.Elem,
        konst.StatusBonusType.EnRec,
    ],
    "goblet": [
        konst.StatusBonusType.HpBuf,
        konst.StatusBonusType.AtkBuf,
        konst.StatusBonusType.DefBuf,
        konst.StatusBonusType.Elem,
        konst.ElementBonusType.Pyro,
        konst.ElementBonusType.Hydro,
        konst.ElementBonusType.Elect,
        konst.ElementBonusType.Anemo,
        konst.ElementBonusType.Cryo,
        konst.ElementBonusType.Geo,
        konst.ElementBonusType.Phys,
    ],
    "circlet": [
        konst.StatusBonusType.HpBuf,
        konst.StatusBonusType.AtkBuf,
        konst.StatusBonusType.DefBuf,
        konst.StatusBonusType.Elem,
        konst.StatusBonusType.HealBuf,
        konst.CriticalBonusType.Rate,
        konst.CriticalBonusType.Damage,
    ]
} as const;

export const ArtifactSub: ReadonlyArray<konst.AnyBonusType> = [
    konst.BonusType.None,
    konst.StatusBonusType.Hp,
    konst.StatusBonusType.HpBuf,
    konst.StatusBonusType.Atk,
    konst.StatusBonusType.AtkBuf,
    konst.StatusBonusType.Def,
    konst.StatusBonusType.DefBuf,
    konst.StatusBonusType.Elem,
    konst.StatusBonusType.EnRec,
    konst.CriticalBonusType.Rate,
    konst.CriticalBonusType.Damage,
] as const;

export const ArtifactNames = [
    "Adventurer",
    "LuckyDog",
    "Doctor",
    "Instructor",
    "Berserker",
    "TheExile",
    "Sojourner",
    "Artist",
    "Defender",
    "Miracle",
    "BraveHeart",
    "Gambler",
    "Scholar",
    "Gladiator",
    "Maiden",
    "Noblesse",
    "Chivalry",
    "Troupe",
    "Venerer",
    "Fury",
    "Thundersoother",
    "CrimsonWitch",
    "Lavawalker",
    "Petra",
    "Bolide",
    "Icebreaker",
    "OceanConqueror",
] as const;
export type ArtifactName = typeof ArtifactNames[number];

// TODO: limitを多言語対応
export const ArtifactSet: Record<typeof ArtifactNames[number], IArtifactSet> = {
    Adventurer: {
        set2: { items: konst.StatusBonusType.Hp, value: 1000 }, // TODO: hp_buf が係るのか検証
        // set4: null,
    },
    LuckyDog: {
        set2: { items: konst.StatusBonusType.Def, value: 100 },
        // set4: null,
    },
    Doctor: {
    },
    Instructor: {
        set2: { items: konst.StatusBonusType.Elem, value: 80 },
        set4: { items: konst.StatusBonusType.Elem, value: 120, limit: "元素反応後", times: 8, target: konst.BonusTarget.All },
    },
    Berserker: {
        set2: { items: konst.CriticalBonusType.Rate, value: 12 },
        set4: { items: konst.CriticalBonusType.Rate, value: 24, limit: "HP70%以下の時" },
    },
    TheExile: {
        set2: { items: konst.StatusBonusType.EnRec, value: 20 },
        // set4: null,
    },
    Sojourner: {
        set2: { items: konst.StatusBonusType.AtkBuf, value: 18 },
        set4: { items: konst.CriticalBonusType.Heavy, value: 30 },
    },
    Artist: {
        set2: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: 15 },
        set4: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: 25, limit: "元素スキル発動後", times: 8 },
    },
    Defender: {
        set2: { items: konst.StatusBonusType.DefBuf, value: 30 },
        // set4: null,
    },
    Miracle: {
    },
    BraveHeart: {
        set2: { items: konst.StatusBonusType.AtkBuf, value: 18 },
        set4: { items: konst.AnyBonusType.Damage, value: 30, limit: "HP50%以上の敵" },
    },
    Gambler: {
        set2: { items: konst.CombatBonusType.Skill, value: 20 },
        // set4: null,
    },
    Scholar: {
        set2: { items: konst.StatusBonusType.EnRec, value: 20 },
        // set4: null,
    },
    Gladiator: {
        set2: { items: konst.StatusBonusType.AtkBuf, value: 18 },
        set4: { items: konst.CombatBonusType.Normal, value: 35, limit: "片手剣、両手剣、長柄武器キャラの時" },
    },
    Maiden: {
    },
    Noblesse: {
        set2: { items: konst.CombatBonusType.Burst, value: 20 },
        set4: { items: konst.StatusBonusType.AtkBuf, value: 20, limit: "元素爆発後", times: 12, target: konst.BonusTarget.All },
    },
    Chivalry: {
        set2: { items: konst.ElementBonusType.Phys, value: 25 },
        set4: { items: konst.CombatBonusType.Heavy, value: 50, limit: "敵を倒した後", times: 10 },
    },
    Troupe: {
        set2: { items: konst.StatusBonusType.Elem, value: 80 },
        set4: { items: konst.CombatBonusType.Heavy, value: 35, limit: "弓、法器キャラの時" },
    },
    Venerer: {
        set2: { items: konst.ElementBonusType.Anemo, value: 15 },
        set4: { items: konst.ReactionBonusType.Swirl, value: 60 }, // 耐性-40%付き
    },
    Fury: {
        set2: { items: konst.ElementBonusType.Elect, value: 15 },
        set4: { items: [konst.ReactionBonusType.Overload, konst.ReactionBonusType.Echarge, konst.ReactionBonusType.Conduct], value: 40 },
    },
    Thundersoother: {
        // set2: null,
        set4: { items: konst.AnyBonusType.Damage, value: 35, limit: "雷元素の影響を受けた敵" },
    },
    CrimsonWitch: {
        set2: { items: konst.ElementBonusType.Pyro, value: 15 },
        set4: [
            { items: konst.ReactionBonusType.Overload, value: 25 },
            { items: [konst.ReactionBonusType.Vaporize, konst.ReactionBonusType.Melt], value: 15 },
            { items: konst.ReactionBonusType.Overload, value: 12.5, limit: "元素スキル発動後", times: 10, stack: 3 },
            { items: [konst.ReactionBonusType.Vaporize, konst.ReactionBonusType.Melt], value: 7.5, limit: "元素スキル発動後", times: 10, stack: 3 },
        ],
    },
    Lavawalker: {
        // set2: null,
        set4: { items: konst.AnyBonusType.Damage, value: 35, limit: "炎元素の影響を受けた敵" },
    },
    Petra: {
        set2: { items: konst.ElementBonusType.Geo, value: 15 },
        set4: { items: konst.AnyBonusType.Element, value: 35, limit: "結晶反応した元素", times: 10, target: konst.BonusTarget.All },
    },
    Bolide: {
        // set2: null,
        set4: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: 40, limit: "シールド状態の時" },
    },
    Icebreaker: {
        set2: { items: konst.ElementBonusType.Cryo, value: 15 },
        set4: [
            { items: konst.CriticalBonusType.Rate, value: 20, limit: "氷元素の影響を受けた敵" },
            { items: konst.CriticalBonusType.Rate, value: 20, limit: "さらに凍結状態の敵" }
        ]
    },
    OceanConqueror: {
        set2: { items: konst.ElementBonusType.Hydro, value: 15 },
        set4: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: 30, limit: "元素スキルを発動後", times: 15 }
    },
} as const;

const ArtifactLevel = [12, 16, 20];

interface IArtifactParam {
    readonly intercept: number;
    readonly slope: number;
    readonly substep?: number;
}

type ArtifactParamType = "hp" | "atk" | "def" | "atk_buf" | "def_buf" | "en_rec" | "cri_rate" | "cri_dmg";
type ArtifactParamData = ReadonlyRecord<ArtifactParamType, IArtifactParam>;

// TODO: 値を見直す
const ArtifactParamList: Readonly<ArtifactParamData[]> = [
    // ☆☆☆
    {
        hp: { intercept: 430, slope: 121.8846154 }, // HP
        atk: { intercept: 28, slope: 7.89010989 }, // 攻撃力
        def: { intercept: 21, slope: 5.917582418 }, // 防御力,元素熟知
        atk_buf: { intercept: 5.2, slope: 1.488461538 }, // HP(%),攻撃力(%),元素ダメージ
        def_buf: { intercept: 6.6, slope: 1.854945055 }, // 防御力(%),物理ダメージ
        en_rec: { intercept: 5.8, slope: 1.65 }, // 元素チャージ効率
        cri_rate: { intercept: 3.5, slope: 0.989010989 }, // 会心率
        cri_dmg: { intercept: 7.0, slope: 1.980769231 }, // 会心ダメージ
    },
    // ☆☆☆☆
    {
        hp: { intercept: 645, slope: 182.8529412, substep: 23.9 },
        atk: { intercept: 42, slope: 11.8995098, substep: 1.6 },
        def: { intercept: 25, slope: 7.137254902, substep: 1.9 },
        atk_buf: { intercept: 6.3, slope: 1.782352941, substep: 0.47 },
        def_buf: { intercept: 7.9, slope: 2.22745098, substep: 0.58 },
        en_rec: { intercept: 7.0, slope: 1.980882353, substep: 0.52 },
        cri_rate: { intercept: 4.2, slope: 1.1875, substep: 0.31 },
        cri_dmg: { intercept: 8.4, slope: 2.377696078, substep: 0.62 },
    },
    // ☆☆☆☆☆
    {
        hp: { intercept: 717, slope: 203.1597403, substep: 29.9 },
        atk: { intercept: 47, slope: 13.22597403, substep: 1.9 },
        def: { intercept: 28, slope: 7.932467532, substep: 2.3 },
        atk_buf: { intercept: 7, slope: 1.980909091, substep: 0.58 },
        def_buf: { intercept: 8.7, slope: 2.477402597, substep: 0.73 },
        en_rec: { intercept: 7.8, slope: 2.2, substep: 0.65 },
        cri_rate: { intercept: 4.7, slope: 1.330779221, substep: 0.39 },
        cri_dmg: { intercept: 9.3, slope: 2.644805195, substep: 0.78 },
    }
] as const;

function getArtifactParam(type: konst.AnyBonusType, star: number, level: number): IArtifactParam | null {
    // ☆を正規化
    if (star < 3 || 5 < star) {
        return null;
    }
    star -= 3;
    // levelを正規化
    if (level < 0 || ArtifactLevel[star] < level) {
        return null;
    }

    const param = ArtifactParamList[star];
    switch (type) {
        case konst.StatusBonusType.Hp:
        case konst.StatusBonusType.Atk:
        case konst.StatusBonusType.Def:
        case konst.StatusBonusType.AtkBuf:
        case konst.StatusBonusType.DefBuf:
        case konst.StatusBonusType.EnRec:
        case konst.CriticalBonusType.Rate:
        case konst.CriticalBonusType.Damage:
            return param[type];

        case konst.StatusBonusType.Elem:
            return param.def;

        case konst.StatusBonusType.HpBuf:
        case konst.ElementBonusType.Anemo:
        case konst.ElementBonusType.Geo:
        case konst.ElementBonusType.Elect:
        case konst.ElementBonusType.Hydro:
        case konst.ElementBonusType.Pyro:
        case konst.ElementBonusType.Cryo:
            return param.atk_buf;

        case konst.ElementBonusType.Phys:
            return param.def_buf;
    }
    return null;
}

export function calcMain(type: konst.AnyBonusType, star: number, level: number): number {
    const param = getArtifactParam(type, star, level);
    if (param) {
        return param.intercept + level * param.slope;
    }
    return 0;
}

export function calcScore(type: konst.AnyBonusType, star: number, level: number, value: number): number {
    const param = getArtifactParam(type, star, level);
    if (param?.substep) {
        return Math.round(value / param.substep);
    }
    return 0;
}

export interface IArtifactData extends IIdentify, INameable, ICommentable {
    star: number;
    level: number;
    main: IBonusValueData;
    sub1: IBonusValueData;
    sub2: IBonusValueData;
    sub3: IBonusValueData;
    sub4: IBonusValueData;
}
export type GlobalArtifactData = Record<konst.ArtifactType, IArtifactData[]>;
