import {
    ArtifactType,
    BonusType,
    StatusBonusType,
    CriticalBonusType,
    CombatBonusType,
    ElementBonusType,
    ReactionBonusType,
    AnyBonusType,
    BonusTarget,
} from "~/src/const";
import { IArtifactSet } from "~/src/interface";

export const ArtifactMain: Record<ArtifactType, ReadonlyArray<AnyBonusType>> = {
    "flower": [StatusBonusType.Hp],
    "feather": [StatusBonusType.Atk],
    "sands": [
        BonusType.None,
        StatusBonusType.HpBuf,
        StatusBonusType.AtkBuf,
        StatusBonusType.DefBuf,
        StatusBonusType.Elem,
        StatusBonusType.EnRec,
    ],
    "goblet": [
        BonusType.None,
        StatusBonusType.HpBuf,
        StatusBonusType.AtkBuf,
        StatusBonusType.DefBuf,
        StatusBonusType.Elem,
        ElementBonusType.Pyro,
        ElementBonusType.Hydro,
        ElementBonusType.Elect,
        ElementBonusType.Anemo,
        ElementBonusType.Cryo,
        ElementBonusType.Geo,
        ElementBonusType.Phys,
    ],
    "circlet": [
        BonusType.None,
        StatusBonusType.HpBuf,
        StatusBonusType.AtkBuf,
        StatusBonusType.DefBuf,
        StatusBonusType.Elem,
        StatusBonusType.HealBuf,
        CriticalBonusType.Rate,
        CriticalBonusType.Damage,
    ]
} as const;

export const ArtifactSub: ReadonlyArray<AnyBonusType> = [
    BonusType.None,
    StatusBonusType.Hp,
    StatusBonusType.HpBuf,
    StatusBonusType.Atk,
    StatusBonusType.AtkBuf,
    StatusBonusType.Def,
    StatusBonusType.DefBuf,
    StatusBonusType.Elem,
    StatusBonusType.EnRec,
    CriticalBonusType.Rate,
    CriticalBonusType.Damage,
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

// TODO: limitを多言語対応
export const ArtifactSet: Record<typeof ArtifactNames[number], IArtifactSet> = {
    Adventurer: {
        set2: { items: StatusBonusType.Hp, value: 1000 }, // TODO: hp_buf が係るのか検証
        // set4: null,
    },
    LuckyDog: {
        set2: { items: StatusBonusType.Def, value: 100 },
        // set4: null,
    },
    Doctor: {
    },
    Instructor: {
        set2: { items: StatusBonusType.Elem, value: 80 },
        set4: { items: StatusBonusType.Elem, value: 120, limit: "元素反応後", times: 8, target: BonusTarget.All },
    },
    Berserker: {
        set2: { items: CriticalBonusType.Rate, value: 12 },
        set4: { items: CriticalBonusType.Rate, value: 24, limit: "HP70%以下の時" },
    },
    TheExile: {
        set2: { items: StatusBonusType.EnRec, value: 20 },
        // set4: null,
    },
    Sojourner: {
        set2: { items: StatusBonusType.AtkBuf, value: 18 },
        set4: { items: CriticalBonusType.Heavy, value: 30 },
    },
    Artist: {
        set2: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: 15 },
        set4: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: 25, limit: "元素スキル発動後", times: 8 },
    },
    Defender: {
        set2: { items: StatusBonusType.DefBuf, value: 30 },
        // set4: null,
    },
    Miracle: {
    },
    BraveHeart: {
        set2: { items: StatusBonusType.AtkBuf, value: 18 },
        set4: { items: AnyBonusType.Damage, value: 30, limit: "HP50%以上の敵" },
    },
    Gambler: {
        set2: { items: CombatBonusType.Skill, value: 20 },
        // set4: null,
    },
    Scholar: {
        set2: { items: StatusBonusType.EnRec, value: 20 },
        // set4: null,
    },
    Gladiator: {
        set2: { items: StatusBonusType.AtkBuf, value: 18 },
        set4: { items: CombatBonusType.Normal, value: 35, limit: "片手剣、両手剣、長柄武器キャラの時" },
    },
    Maiden: {
    },
    Noblesse: {
        set2: { items: CombatBonusType.Burst, value: 20 },
        set4: { items: StatusBonusType.AtkBuf, value: 20, limit: "元素爆発後", times: 12, target: BonusTarget.All },
    },
    Chivalry: {
        set2: { items: ElementBonusType.Phys, value: 25 },
        set4: { items: CombatBonusType.Heavy, value: 50, limit: "敵を倒した後", times: 10 },
    },
    Troupe: {
        set2: { items: StatusBonusType.Elem, value: 80 },
        set4: { items: CombatBonusType.Heavy, value: 35, limit: "弓、法器キャラの時" },
    },
    Venerer: {
        set2: { items: ElementBonusType.Anemo, value: 15 },
        set4: { items: ReactionBonusType.Swirl, value: 60 }, // 耐性-40%付き
    },
    Fury: {
        set2: { items: ElementBonusType.Elect, value: 15 },
        set4: { items: [ReactionBonusType.Overload, ReactionBonusType.Echarge, ReactionBonusType.Conduct], value: 40 },
    },
    Thundersoother: {
        // set2: null,
        set4: { items: AnyBonusType.Damage, value: 35, limit: "雷元素の影響を受けた敵" },
    },
    CrimsonWitch: {
        set2: { items: ElementBonusType.Pyro, value: 15 },
        set4: [
            { items: ReactionBonusType.Overload, value: 25 },
            { items: [ReactionBonusType.Vaporize, ReactionBonusType.Melt], value: 15 },
            { items: ReactionBonusType.Overload, value: 12.5, limit: "元素スキル発動後", times: 10, stack: 3 },
            { items: [ReactionBonusType.Vaporize, ReactionBonusType.Melt], value: 7.5, limit: "元素スキル発動後", times: 10, stack: 3 },
        ],
    },
    Lavawalker: {
        // set2: null,
        set4: { items: AnyBonusType.Damage, value: 35, limit: "炎元素の影響を受けた敵" },
    },
    Petra: {
        set2: { items: ElementBonusType.Geo, value: 15 },
        set4: { items: AnyBonusType.Element, value: 35, limit: "結晶反応した元素", times: 10, target: BonusTarget.All },
    },
    Bolide: {
        // set2: null,
        set4: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: 40, limit: "シールド状態の時" },
    },
    Icebreaker: {
        set2: { items: ElementBonusType.Cryo, value: 15 },
        set4: [
            { items: CriticalBonusType.Rate, value: 20, limit: "氷元素の影響を受けた敵" },
            { items: CriticalBonusType.Rate, value: 20, limit: "さらに凍結状態の敵" }
        ]
    },
    OceanConqueror: {
        set2: { items: ElementBonusType.Hydro, value: 15 },
        set4: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: 30, limit: "元素スキルを発動後", times: 15 }
    },
} as const;
