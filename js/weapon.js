"use strict";
const SWORD_LIST = {
    other: {
        name: "-",
        star: 1,
        second: StatusBonusType.Other,
    },
    SkywardBlade: {
        name: "天空の刃",
        star: 5,
        second: StatusBonusType.EnRec,
        passive: { items: CriticalBonusType.Rate, value: [4, 5, 6, 7, 8] },
    },
    AquilaFavonia: {
        name: "風鷹剣",
        star: 5,
        second: ElementBonusType.Phys,
        passive: { items: StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40] },
    },
    SummitShaper: {
        name: "斬山の刃",
        star: 5,
        second: StatusBonusType.AtkBuf,
        passive: [
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    PrimordialJadeCutter: {
        name: "磐岩結緑",
        star: 5,
        second: CriticalBonusType.Rate,
        passive: [
            { items: StatusBonusType.HpBuf, value: [20, 25, 30, 35, 40] },
            { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Atk, base: FlatBonusBase.Hp, value: [1.2, 1.5, 1.8, 2.1, 2.4] },
        ]
    },
    FavoniusSword: {
        name: "西風剣",
        star: 4,
        second: StatusBonusType.EnRec,
    },
    TheFlute: {
        name: "笛の剣",
        star: 4,
        second: StatusBonusType.AtkBuf,
    },
    SacrificialSword: {
        name: "祭礼の剣",
        star: 4,
        second: StatusBonusType.EnRec,
    },
    LionsRoar: {
        name: "匣中龍吟",
        star: 4,
        second: StatusBonusType.AtkBuf,
        passive: { items: StatusBonusType.AnyDmg, value: [20, 24, 28, 32, 36], limit: "炎、雷元素の影響を受けた敵" },
    },
    RoyalLongsword: {
        name: "旧貴族長剣",
        star: 4,
        second: StatusBonusType.AtkBuf,
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 5 },
    },
    PrototypeRancour: {
        name: "斬岩・試作",
        star: 4,
        second: ElementBonusType.Phys,
        passive: { items: [StatusBonusType.AtkBuf, StatusBonusType.DefBuf], value: [4, 5, 6, 7, 8], limit: "通常攻撃または重撃が命中した時", times: 6, stack: 4 },
    },
    IronSting: {
        name: "鉄蜂の刺し",
        star: 4,
        second: StatusBonusType.Elem,
        passive: { items: StatusBonusType.AnyDmg, value: [6, 7.5, 9, 10.5, 12], limit: "元素ダメージを与えた後", times: 6, stack: 2 },
    },
    BlackcliffLongsword: {
        name: "黒岩の長剣",
        star: 4,
        second: CriticalBonusType.Damage,
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    BlackSword: {
        name: "黒剣",
        star: 4,
        second: CriticalBonusType.Rate,
        passive: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [20, 25, 30, 35, 40] },
    },
    SwordDescension: {
        name: "降臨の剣",
        star: 4,
        second: StatusBonusType.AtkBuf,
        passive: { items: StatusBonusType.Atk, value: [66, 66, 66, 66, 66], limit: "旅人が装備した時" },
    },
    FesteringDesire: {
        name: "腐植の剣",
        star: 4,
        second: StatusBonusType.EnRec,
        passive: [
            { items: CombatBonusType.Skill, value: [16, 20, 24, 28, 32] },
            { items: CriticalBonusType.Skill, value: [6, 7.5, 9, 10.5, 12] },
        ]
    },
    TravelersSword: {
        name: "旅道の剣",
        star: 3,
        second: StatusBonusType.DefBuf,
    },
    FilletBlade: {
        name: "チ虎魚の刀",
        star: 3,
        second: StatusBonusType.AtkBuf,
    },
    DarkIronSword: {
        name: "暗鉄剣",
        star: 3,
        second: StatusBonusType.Elem,
        passive: { items: StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40], limit: "過負荷、超電磁、感電または雷元素拡散が発生した時", times: 12 },
    },
    CoolSteel: {
        name: "冷刃",
        star: 3,
        second: StatusBonusType.AtkBuf,
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "水、氷元素の影響を受けた敵" },
    },
    HarbingerDawn: {
        name: "黎明の神剣",
        star: 3,
        second: CriticalBonusType.Damage,
        passive: { items: CriticalBonusType.Rate, value: [14, 17.5, 21, 24.5, 28], limit: "HP90%以上の時" },
    },
    SkyriderSword: {
        name: "飛天御剣",
        star: 3,
        second: StatusBonusType.EnRec,
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 25], limit: "元素爆発後", times: 15 },
    },
};
const CLAYMORE_LIST = {
    other: {
        name: "-",
        star: 1,
        second: StatusBonusType.Other,
    },
    WolfsGravestone: {
        name: "狼の末路",
        star: 5,
        second: StatusBonusType.AtkBuf,
        passive: [
            { items: StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40] },
            { items: StatusBonusType.AtkBuf, value: [40, 50, 60, 70, 80], limit: "HP30%以下の敵に命中した時", times: 12, target: BonusTarget.All },
        ],
    },
    TheUnforged: {
        name: "無工の剣",
        star: 5,
        second: StatusBonusType.AtkBuf,
        passive: [
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    SkywardPride: {
        name: "天空の傲",
        star: 5,
        second: StatusBonusType.EnRec,
        passive: { items: StatusBonusType.AnyDmg, value: [8, 10, 12, 14, 16] },
    },
    FavoniusGreatsword: {
        name: "西風大剣",
        star: 4,
        second: StatusBonusType.EnRec,
    },
    TheBell: {
        name: "鐘の剣",
        star: 4,
        second: StatusBonusType.HpBuf,
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "シールドが存在する時" },
    },
    SacrificialGreatsword: {
        name: "祭礼の大剣",
        star: 4,
        second: StatusBonusType.EnRec,
    },
    Rainslasher: {
        name: "雨裁",
        star: 4,
        second: StatusBonusType.Elem,
        passive: { items: StatusBonusType.AnyDmg, value: [20, 24, 28, 32, 36], limit: "水、雷元素の影響を受けた敵" },
    },
    RoyalGreatsword: {
        name: "旧貴族大剣",
        star: 4,
        second: StatusBonusType.AtkBuf,
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 5 },
    },
    PrototypeAminus: {
        name: "古華・試作",
        star: 4,
        second: StatusBonusType.AtkBuf,
    },
    Whiteblind: {
        name: "白影の剣",
        star: 4,
        second: StatusBonusType.DefBuf,
        passive: { items: [StatusBonusType.AtkBuf, StatusBonusType.DefBuf], value: [6, 7.5, 9, 10.5, 12], limit: "通常攻撃か重撃が命中した時", times: 6, stack: 4 },
    },
    BlackcliffSlasher: {
        name: "黒岩の斬刀",
        star: 4,
        second: CriticalBonusType.Damage,
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    SerpentSpine: {
        name: "螭龍の剣",
        star: 4,
        second: CriticalBonusType.Rate,
        passive: { items: StatusBonusType.AnyDmg, value: [6, 7, 8, 9, 10], limit: "フィールドにいる時4秒毎", stack: 5 },
    },
    SnowTombedStarsilver: {
        name: "雪葬の星銀",
        star: 4,
        second: ElementBonusType.Phys,
    },
    LithicBlade: {
        name: "千岩古剣",
        star: 4,
        second: StatusBonusType.AtkBuf,
        passive: [
            { items: StatusBonusType.AtkBuf, value: [7, 8, 9, 10, 11], limit: "チームに璃月出身のキャラクターが1人いる毎", stack: 4 },
            { items: CriticalBonusType.Rate, value: [3, 4, 5, 6, 7], limit: "チームに璃月出身のキャラクターが1人いる毎", stack: 4 },
        ]
    },
    SkyriderGreatsword: {
        name: "飛天大御剣",
        star: 3,
        second: ElementBonusType.Phys,
        passive: { items: StatusBonusType.AtkBuf, value: [6, 7, 8, 9, 10], limit: "通常攻撃か重撃が命中した時", times: 6, stack: 4 },
    },
    WhiteGreatsword: {
        name: "白鉄の大剣",
        star: 3,
        second: StatusBonusType.DefBuf,
    },
    FerrousShadow: {
        name: "鉄影段平",
        star: 3,
        second: StatusBonusType.HpBuf,
        passive: { items: CombatBonusType.Heavy, value: [30, 35, 40, 45, 50], limit: "HPが一定値以下の時" },
    },
    BloodtaintedGreatsword: {
        name: "鮮血を浴びた剣",
        star: 3,
        second: StatusBonusType.Elem,
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "炎、雷元素の影響を受けた敵" },
    },
    DebateClub: {
        name: "理屈責め",
        star: 3,
        second: StatusBonusType.AtkBuf,
    },
};
const POLEARM_LIST = {
    other: {
        name: "-",
        star: 1,
        second: StatusBonusType.Other,
    },
    PrimordialSpear: {
        name: "和璞鳶",
        star: 5,
        second: CriticalBonusType.Rate,
        passive: [
            { items: StatusBonusType.AtkBuf, value: [3.2, 3.9, 4.6, 5.3, 6.0], limit: "敵に命中した時", times: 6, stack: 7 },
            { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "さらに7重まで発動した時" },
        ],
    },
    SkywardSpine: {
        name: "天空の脊",
        star: 5,
        second: StatusBonusType.EnRec,
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16] },
    },
    VortexVanquisher: {
        name: "破天の槍",
        star: 5,
        second: StatusBonusType.AtkBuf,
        passive: [
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    StaffHoma: {
        name: "護摩の杖",
        star: 5,
        second: CriticalBonusType.Damage,
        passive: [
            { items: StatusBonusType.HpBuf, value: [20, 25, 30, 35, 40] },
            { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Atk, base: FlatBonusBase.Hp, value: [0.8, 1.0, 1.2, 1.4, 1.6] },
            { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Atk, base: FlatBonusBase.Hp, value: [1.0, 1.2, 1.4, 1.6, 1.8], limit: "HPが50未満の時" },
        ]
    },
    DragonsBane: {
        name: "匣中滅龍",
        star: 4,
        second: StatusBonusType.Elem,
        passive: { items: StatusBonusType.AnyDmg, value: [20, 24, 28, 32, 36], limit: "水、炎元素の影響を受けた敵" },
    },
    FavoniusLance: {
        name: "西風長槍",
        star: 4,
        second: StatusBonusType.EnRec,
    },
    PrototypeGrudge: {
        name: "星鎌・試作",
        star: 4,
        second: StatusBonusType.EnRec,
        passive: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [8, 10, 12, 14, 16], limit: "元素スキル発動後", times: 12, stack: 2 },
    },
    CrescentPike: {
        name: "流月の針",
        star: 4,
        second: ElementBonusType.Phys,
    },
    BlackcliffPole: {
        name: "黒岩の突槍",
        star: 4,
        second: CriticalBonusType.Damage,
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    Deathmatch: {
        name: "死闘の槍",
        star: 4,
        second: CriticalBonusType.Rate,
        passive: [
            { items: [StatusBonusType.AtkBuf, StatusBonusType.DefBuf], value: [16, 20, 24, 28, 32], limit: "近くに敵が2人以上いる時" },
            { items: StatusBonusType.AtkBuf, value: [24, 30, 36, 42, 48], limit: "近くに敵が2人未満の時" },
        ],
    },
    DragonspineSpear: {
        name: "ドラゴンスピア",
        star: 4,
        second: ElementBonusType.Phys,
    },
    Halberd: {
        name: "鉾槍",
        star: 3,
        second: StatusBonusType.AtkBuf,
    },
    WhiteTassel: {
        name: "白纓槍",
        star: 3,
        second: CriticalBonusType.Rate,
        passive: { items: CombatBonusType.Normal, value: [24, 30, 36, 42, 48] },
    },
    BlackTassel: {
        name: "黒纓槍",
        star: 3,
        second: StatusBonusType.HpBuf,
        passive: { items: StatusBonusType.AnyDmg, value: [40, 50, 60, 70, 80], limit: "スライムタイプの敵" },
    },
};
const BOW_LIST = {
    other: {
        name: "-",
        star: 1,
        second: StatusBonusType.Other,
    },
    SkywardHarp: {
        name: "天空の翼",
        star: 5,
        second: CriticalBonusType.Rate,
        passive: { items: CriticalBonusType.Damage, value: [20, 25, 30, 35, 40] },
    },
    AmosBow: {
        name: "アモスの弓",
        star: 5,
        second: StatusBonusType.AtkBuf,
        passive: [
            { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [12, 15, 18, 21, 24] },
            { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [8, 10, 12, 14, 16], limit: "矢を放った後0.1秒毎", stack: 5 },
        ]
    },
    FavoniusWarbow: {
        name: "西風猟弓",
        star: 4,
        second: StatusBonusType.EnRec,
    },
    Stringless: {
        name: "絶弦",
        star: 4,
        second: StatusBonusType.Elem,
        passive: { items: [CombatBonusType.Skill, CombatBonusType.Burst], value: [24, 30, 36, 42, 48] },
    },
    SacrificialBow: {
        name: "祭礼の弓",
        star: 4,
        second: StatusBonusType.EnRec,
    },
    Rust: {
        name: "弓蔵",
        star: 4,
        second: StatusBonusType.AtkBuf,
        passive: [
            { items: CombatBonusType.Normal, value: [40, 50, 60, 70, 80] },
            { items: CombatBonusType.Heavy, value: [-10, -10, -10, -10, -10] },
        ],
    },
    RoyalBow: {
        name: "旧貴族長弓",
        star: 4,
        second: StatusBonusType.AtkBuf,
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "敵にダメージを与えた時", stack: 5 },
    },
    PrototypeCrescent: {
        name: "澹月・試作",
        star: 4,
        second: StatusBonusType.AtkBuf,
        passive: { items: StatusBonusType.AtkBuf, value: [36, 45, 54, 63, 72], limit: "狙い撃ちが弱点に命中した時", times: 10 },
    },
    CompoundBow: {
        name: "リングボウ",
        star: 4,
        second: ElementBonusType.Phys,
        passive: { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "通常攻撃と狙い撃ちが命中した時", times: 6, stack: 4 },
    },
    BlackcliffWarbow: {
        name: "黒岩の戦弓",
        star: 4,
        second: CriticalBonusType.Damage,
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    ViridescentHunt: {
        name: "蒼翠の狩猟弓",
        star: 4,
        second: CriticalBonusType.Rate,
    },
    Messenger: {
        name: "文使い",
        star: 3,
        second: CriticalBonusType.Damage,
    },
    RecurveBow: {
        name: "リカーブボウ",
        star: 3,
        second: StatusBonusType.HpBuf,
    },
    RavenBow: {
        name: "鴉羽の弓",
        star: 3,
        second: StatusBonusType.Elem,
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "水、炎元素の影響を受けた敵" },
    },
    SharpshootersOath: {
        name: "シャープシューターの誓い",
        star: 3,
        second: CriticalBonusType.Damage,
        passive: { items: StatusBonusType.AnyDmg, value: [24, 30, 36, 42, 48], limit: "弱点" },
    },
    Slingshot: {
        name: "弾弓",
        star: 3,
        second: CriticalBonusType.Rate,
        passive: [
            { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [36, 42, 48, 54, 60], limit: "矢が発射後0.3秒以内に敵に命中した時" },
            { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [-10, -10, -10, -10, -10], limit: "矢が発射後0.3秒より長く敵に命中した時" }
        ]
    },
};
const CATALYST_LIST = {
    other: {
        name: "-",
        star: 1,
        second: StatusBonusType.Other,
    },
    SkywardAtlas: {
        name: "天空の巻",
        star: 5,
        second: StatusBonusType.AtkBuf,
        passive: { items: ElementBonusType.Any, value: [12, 15, 18, 21, 24] },
    },
    LostSacredWinds: {
        name: "四風原典",
        star: 5,
        second: CriticalBonusType.Rate,
        passive: { items: ElementBonusType.Any, value: [8, 10, 12, 14, 16], limit: "出場中は4秒毎", stack: 4 },
    },
    MemoryDust: {
        name: "浮世の錠",
        star: 5,
        second: StatusBonusType.AtkBuf,
        passive: [
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    FavoniusCodex: {
        name: "西風秘典",
        star: 4,
        second: StatusBonusType.EnRec,
    },
    TheWidsith: {
        name: "流浪楽章",
        star: 4,
        second: CriticalBonusType.Damage,
        passive: [
            { items: StatusBonusType.AtkBuf, value: [60, 75, 90, 105, 120], limit: "叙唱：キャラ登場時", times: 10 },
            { items: ElementBonusType.Any, value: [48, 60, 72, 84, 96], limit: "詠唱：キャラ登場時", times: 10 },
            { items: StatusBonusType.Elem, value: [240, 300, 360, 420, 480], limit: "間奏曲：キャラ登場時", times: 10 },
        ],
    },
    SacrificialFragments: {
        name: "祭礼の断片",
        star: 4,
        second: StatusBonusType.Elem,
    },
    EyePerception: {
        name: "昭心",
        star: 4,
        second: StatusBonusType.AtkBuf,
    },
    RoyalGrimoire: {
        name: "旧貴族秘法録",
        star: 4,
        second: StatusBonusType.AtkBuf,
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 6 },
    },
    SolarPearl: {
        name: "匣中日月",
        star: 4,
        second: CriticalBonusType.Rate,
        passive: [
            { items: [CombatBonusType.Skill, CombatBonusType.Burst], value: [20, 25, 30, 35, 40], limit: "通常攻撃が命中した時", times: 6 },
            { items: CombatBonusType.Normal, value: [20, 25, 30, 35, 40], limit: "元素スキルか元素爆発が命中した時", times: 6 },
        ],
    },
    PrototypeMalice: {
        name: "金珀・試作",
        star: 4,
        second: StatusBonusType.HpBuf,
    },
    MappaMare: {
        name: "万国諸海の図譜",
        star: 4,
        second: StatusBonusType.Elem,
        passive: { items: ElementBonusType.Any, value: [8, 10, 12, 14, 16], limit: "元素反応を起こした後", times: 10, stack: 2 },
    },
    BlackcliffAmulet: {
        name: "黒岩の緋玉",
        star: 4,
        second: CriticalBonusType.Damage,
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    Frostbearer: {
        name: "冬忍びの実",
        star: 4,
        second: StatusBonusType.AtkBuf,
    },
    TwinNephrite: {
        name: "特級の宝玉",
        star: 3,
        second: CriticalBonusType.Rate,
        passive: { items: StatusBonusType.AtkBuf, value: [12, 14, 16, 18, 20], limit: "敵を倒した後", times: 15 },
    },
    OtherworldlyStory: {
        name: "異世界旅行記",
        star: 3,
        second: StatusBonusType.EnRec,
    },
    MagicGuide: {
        name: "魔導緒論",
        star: 3,
        second: StatusBonusType.Elem,
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "水、雷元素の影響を受けた敵" },
    },
    TalesDragonSlayers: {
        name: "竜殺しの英傑譚",
        star: 3,
        second: StatusBonusType.HpBuf,
        passive: { items: StatusBonusType.AtkBuf, value: [24, 30, 36, 42, 48], limit: "次に登場するキャラ", times: 10, target: BonusTarget.Next },
    },
    AmberCatalyst: {
        name: "翡玉法珠",
        star: 3,
        second: StatusBonusType.Elem,
        passive: { items: StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40], limit: "蒸発、感電、凍結、または水元素拡散反応後", times: 12 },
    },
};
const WEAPON_LIST = {
    sword: SWORD_LIST,
    claymore: CLAYMORE_LIST,
    polearm: POLEARM_LIST,
    bow: BOW_LIST,
    catalyst: CATALYST_LIST
};
