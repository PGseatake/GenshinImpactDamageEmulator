import * as konst from "~/src/const";
import { IArtifactSet } from "~/src/interface";

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
