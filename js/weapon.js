"use strict";
// TODO: 多言語対応（ソース全体）
const SWORD_LIST = {
    other: {
        name: "-",
        star: 1,
        second: StatusBonus.Other,
    },
    SkywardBlade: {
        name: "天空の刃",
        star: 5,
        second: StatusBonus.EnRec,
        // 会心率+4~8%
        passive: { items: StatusBonus.CriRate, value: [4, 5, 6, 7, 8] },
    },
    AquilaFavonia: {
        name: "風鷹剣",
        star: 5,
        second: ElementBonus.Phys,
        // 攻撃力+20~40%
        passive: { items: StatusBonus.AtkBuf, value: [20, 25, 30, 35, 40] },
    },
    SummitShaper: {
        name: "斬山の刃",
        star: 5,
        second: StatusBonus.AtkBuf,
        passive: [
            // シールド強化20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: StatusBonus.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: StatusBonus.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    FavoniusSword: {
        name: "西風剣",
        star: 4,
        second: StatusBonus.EnRec,
    },
    TheFlute: {
        name: "笛の剣",
        star: 4,
        second: StatusBonus.AtkBuf,
    },
    SacrificialSword: {
        name: "祭礼の剣",
        star: 4,
        second: StatusBonus.EnRec,
    },
    LionsRoar: {
        name: "匣中龍吟",
        star: 4,
        second: StatusBonus.AtkBuf,
        // 炎元素又は雷元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: StatusBonus.AnyDmg, value: [20, 24, 28, 32, 36], limit: "炎、雷元素の影響を受けた敵" },
    },
    RoyalLongsword: {
        name: "旧貴族長剣",
        star: 4,
        second: StatusBonus.AtkBuf,
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: StatusBonus.CriRate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 5 },
    },
    PrototypeRancour: {
        name: "斬岩・試作",
        star: 4,
        second: ElementBonus.Phys,
        // 通常攻撃または重撃が命中すると、攻撃力と防御力+4~8%、継続時間6秒、最大4重まで。0.3秒ごとに1回発動可能。
        passive: { items: [StatusBonus.AtkBuf, StatusBonus.DefBuf], value: [4, 5, 6, 7, 8], limit: "通常攻撃または重撃が命中した時", times: 6, stack: 4 },
    },
    IronSting: {
        name: "鉄蜂の刺し",
        star: 4,
        second: StatusBonus.Elem,
        // 元素ダメージを与えた6秒間、キャラの与えるダメージ+6~12%、最大2重まで、1秒毎に1回のみ発動する。
        passive: { items: StatusBonus.AnyDmg, value: [6, 7.5, 9, 10.5, 12], limit: "元素ダメージを与えた後", times: 6, stack: 2 },
    },
    BlackcliffLongsword: {
        name: "黒岩の長剣",
        star: 4,
        second: StatusBonus.CriDmg,
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: StatusBonus.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    BlackSword: {
        name: "黒剣",
        star: 4,
        second: StatusBonus.CriRate,
        // 通常攻撃と重撃ダメージ+20~40%
        passive: { items: [CombatBonus.Normal, CombatBonus.Heavy], value: [20, 25, 30, 35, 40] },
    },
    SwordDescension: {
        name: "降臨の剣",
        star: 4,
        second: StatusBonus.AtkBuf,
        // 通常攻撃と重撃が命中時、50%の確率で攻撃力の200%の狭範囲ダメージを与える。10秒毎に1回のみ発動可能。
        // 旅人が降臨の剣を装備するとさらに攻撃力+66。
        passive: { items: StatusBonus.Atk, value: [66, 66, 66, 66, 66], limit: "旅人が装備した時" },
    },
    FesteringDesire: {
        name: "腐植の剣",
        star: 4,
        second: StatusBonus.EnRec,
        passive: [
            // 元素スキルのダメージ+16~32%
            { items: CombatBonus.Skill, value: [16, 20, 24, 28, 32] },
        ]
    },
    TravelersSword: {
        name: "旅道の剣",
        star: 3,
        second: StatusBonus.DefBuf,
    },
    FilletBlade: {
        name: "チ虎魚の刀",
        star: 3,
        second: StatusBonus.AtkBuf,
    },
    DarkIronSword: {
        name: "暗鉄剣",
        star: 3,
        second: StatusBonus.Elem,
        // 過負荷、超電導、感電、または雷元素拡散反応が発生した12秒間、基礎攻撃力+20~40%。
        passive: { items: StatusBonus.AtkBuf, value: [20, 25, 30, 35, 40], limit: "過負荷、超電磁、感電または雷元素拡散が発生した時", times: 12 },
    },
    CoolSteel: {
        name: "冷刃",
        star: 3,
        second: StatusBonus.AtkBuf,
        // 水元素又は氷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: StatusBonus.AnyDmg, value: [12, 15, 18, 21, 24], limit: "水、氷元素の影響を受けた敵" },
    },
    HarbingerDawn: {
        name: "黎明の神剣",
        star: 3,
        second: StatusBonus.CriDmg,
        // HPが90%以上の場合、会心率+14~28%。
        passive: { items: StatusBonus.CriRate, value: [14, 17.5, 21, 24.5, 28], limit: "HP90%以上の時" },
    },
    SkyriderSword: {
        name: "飛天御剣",
        star: 3,
        second: StatusBonus.EnRec,
        // 元素爆発を発動した後、攻撃力と移動速度+12~24%、継続時間15%。
        passive: { items: StatusBonus.AtkBuf, value: [12, 15, 18, 21, 25], limit: "元素爆発後", times: 15 },
    },
};
const CLAYMORE_LIST = {
    other: {
        name: "-",
        star: 1,
        second: StatusBonus.Other,
    },
    WolfsGravestone: {
        name: "狼の末路",
        star: 5,
        second: StatusBonus.AtkBuf,
        passive: [
            // 攻撃力+20~40%
            { items: StatusBonus.AtkBuf, value: [20, 25, 30, 35, 40] },
            // HPが30%以下の敵に命中すると、チーム全員の攻撃力+40~80%、継続時間12秒。30秒に1回のみ発動可能。
            { items: StatusBonus.AtkBuf, value: [40, 50, 60, 70, 80], limit: "HP30%以下の敵に命中した時", times: 12, target: BonusTarget.All },
        ],
    },
    TheUnforged: {
        name: "無工の剣",
        star: 5,
        second: StatusBonus.AtkBuf,
        passive: [
            // シールド強化20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: StatusBonus.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: StatusBonus.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    SkywardPride: {
        name: "天空の傲",
        star: 5,
        second: StatusBonus.EnRec,
        // 与えるダメージ+8~16%。
        passive: { items: StatusBonus.AnyDmg, value: [8, 10, 12, 14, 16] },
    },
    FavoniusGreatsword: {
        name: "西風大剣",
        star: 4,
        second: StatusBonus.EnRec,
    },
    TheBell: {
        name: "鐘の剣",
        star: 4,
        second: StatusBonus.HpBuf,
        // ダメージを受けた時、HP上限の20~32%に相当するダメージを吸収できるシールドを生成する。継続時間は最大10秒まで。45秒毎に1回のみ発動する。
        // シールドが存在する時、キャラクターの与えるダメージ+12~24%。
        passive: { items: StatusBonus.AnyDmg, value: [12, 15, 18, 21, 24], limit: "シールドが存在する時" },
    },
    SacrificialGreatsword: {
        name: "祭礼の大剣",
        star: 4,
        second: StatusBonus.EnRec,
    },
    Rainslasher: {
        name: "雨裁",
        star: 4,
        second: StatusBonus.Elem,
        // 水元素又は雷元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: StatusBonus.AnyDmg, value: [20, 24, 28, 32, 36], limit: "水、雷元素の影響を受けた敵" },
    },
    RoyalGreatsword: {
        name: "旧貴族大剣",
        star: 4,
        second: StatusBonus.AtkBuf,
        // 攻撃が敵にダメージを与えた時、会心率+8%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: StatusBonus.CriRate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 5 },
    },
    PrototypeAminus: {
        name: "古華・試作",
        star: 4,
        second: StatusBonus.AtkBuf,
    },
    Whiteblind: {
        name: "白影の剣",
        star: 4,
        second: StatusBonus.DefBuf,
        // 通常攻撃か重撃が命中すると、攻撃力と防御力+6~12%。継続時間6秒、最大4重まで。0.5秒毎に1回のみ発動可能。
        passive: { items: [StatusBonus.AtkBuf, StatusBonus.DefBuf], value: [6, 7.5, 9, 10.5, 12], limit: "通常攻撃か重撃が命中した時", times: 6, stack: 4 },
    },
    BlackcliffSlasher: {
        name: "黒岩の斬刀",
        star: 4,
        second: StatusBonus.CriDmg,
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる
        passive: { items: StatusBonus.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    SerpentSpine: {
        name: "螭龍の剣",
        star: 4,
        second: StatusBonus.CriRate,
        // フィールドにいる時、4秒毎に、与えるダメージ+6~10%、被ダメージ+3~1.8%。最大5重まで、退場後もリセットされず、攻撃を受けると効果数-1。
        passive: { items: StatusBonus.AnyDmg, value: [6, 7, 8, 9, 10], limit: "フィールドにいる時4秒毎", stack: 5 },
    },
    SnowTombedStarsilver: {
        name: "雪葬の星銀",
        star: 4,
        second: ElementBonus.Phys,
    },
    SkyriderGreatsword: {
        name: "飛天大御剣",
        star: 3,
        second: ElementBonus.Phys,
        // 通常攻撃と重撃が命中すると、攻撃力+6~10%、継続時間6秒、最大4重まで。0.5秒毎に1回のみ発動可能。
        passive: { items: StatusBonus.AtkBuf, value: [6, 7, 8, 9, 10], limit: "通常攻撃か重撃が命中した時", times: 6, stack: 4 },
    },
    WhiteGreatsword: {
        name: "白鉄の大剣",
        star: 3,
        second: StatusBonus.DefBuf,
    },
    FerrousShadow: {
        name: "鉄影段平",
        star: 3,
        second: StatusBonus.HpBuf,
        // HPが70~90%以下になると、重撃は中断されにくくなり、さらに重撃ダメージ+30~50%。
        passive: { items: CombatBonus.Heavy, value: [30, 35, 40, 45, 50], limit: "HPが一定値以下の時" },
    },
    BloodtaintedGreatsword: {
        name: "鮮血を浴びた剣",
        star: 3,
        second: StatusBonus.Elem,
        // 炎元素又は雷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: StatusBonus.AnyDmg, value: [12, 15, 18, 21, 24], limit: "炎、雷元素の影響を受けた敵" },
    },
    DebateClub: {
        name: "理屈責め",
        star: 3,
        second: StatusBonus.AtkBuf,
    },
};
const POLEARM_LIST = {
    other: {
        name: "-",
        star: 1,
        second: StatusBonus.Other,
    },
    PrimordialSpear: {
        name: "和璞鳶",
        star: 5,
        second: StatusBonus.CriRate,
        passive: [
            // 敵に命中した時、自身の攻撃力+3.2~6%、継続時間6秒、最大7重まで。0.3秒に最大1回発動でき、7重まで発動するとスキルダメージ+12~24%。
            { items: StatusBonus.AtkBuf, value: [3.2, 3.9, 4.6, 5.3, 6.0], limit: "敵に命中した時", times: 6, stack: 7 },
            { items: CombatBonus.Skill, value: [12, 15, 18, 21, 24], limit: "7重まで発動した時" },
        ],
    },
    SkywardSpine: {
        name: "天空の脊",
        star: 5,
        second: StatusBonus.EnRec,
        // 会心率+8~16%、通常攻撃速度+12%。
        passive: { items: StatusBonus.CriRate, value: [8, 10, 12, 14, 16] },
    },
    VortexVanquisher: {
        name: "破天の槍",
        star: 5,
        second: StatusBonus.AtkBuf,
        passive: [
            // シールド強化+20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: StatusBonus.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: StatusBonus.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    DragonsBane: {
        name: "匣中滅龍",
        star: 4,
        second: StatusBonus.Elem,
        // 水元素又は炎元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: StatusBonus.AnyDmg, value: [20, 24, 28, 32, 36], limit: "水、炎元素の影響を受けた敵" },
    },
    FavoniusLance: {
        name: "西風長槍",
        star: 4,
        second: StatusBonus.EnRec,
    },
    PrototypeGrudge: {
        name: "星鎌・試作",
        star: 4,
        second: StatusBonus.EnRec,
        // 元素スキルを発動した後、通常攻撃と重撃ダメージ+8~16%、継続時間12秒、最大2重まで。
        passive: { items: [CombatBonus.Normal, CombatBonus.Heavy], value: [8, 10, 12, 14, 16], limit: "元素スキル発動後", times: 12, stack: 2 },
    },
    CrescentPike: {
        name: "流月の針",
        star: 4,
        second: ElementBonus.Phys,
    },
    BlackcliffPole: {
        name: "黒岩の突槍",
        star: 4,
        second: StatusBonus.CriDmg,
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: StatusBonus.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    Deathmatch: {
        name: "死闘の槍",
        star: 4,
        second: StatusBonus.CriRate,
        passive: [
            // 近くに敵が2人以上いる時、攻撃力+16~32%、防御力+16~32%。
            { items: [StatusBonus.AtkBuf, StatusBonus.DefBuf], value: [16, 20, 24, 28, 32], limit: "近くに敵が2人以上いる時" },
            // 近くにいる敵が2人未満の時、攻撃力24~48%。
            { items: StatusBonus.AtkBuf, value: [24, 30, 36, 42, 48], limit: "近くに敵が2人未満の時" },
        ],
    },
    DragonspineSpear: {
        name: "ドラゴンスピア",
        star: 4,
        second: ElementBonus.Phys,
    },
    Halberd: {
        name: "鉾槍",
        star: 3,
        second: StatusBonus.AtkBuf,
    },
    WhiteTassel: {
        name: "白纓槍",
        star: 3,
        second: StatusBonus.CriRate,
        // 通常攻撃のダメージ+24~48%。
        passive: { items: CombatBonus.Normal, value: [24, 30, 36, 42, 48] },
    },
    BlackTassel: {
        name: "黒纓槍",
        star: 3,
        second: StatusBonus.HpBuf,
        // スライムタイプの敵に与えるダメージ+40~80%。
        passive: { items: StatusBonus.AnyDmg, value: [40, 50, 60, 70, 80], limit: "スライムタイプの敵" },
    },
};
const BOW_LIST = {
    other: {
        name: "-",
        star: 1,
        second: StatusBonus.Other,
    },
    SkywardHarp: {
        name: "天空の翼",
        star: 5,
        second: StatusBonus.CriRate,
        // 会心ダメージ+20~40%。
        passive: { items: StatusBonus.CriDmg, value: [20, 25, 30, 35, 40] },
    },
    AmosBow: {
        name: "アモスの弓",
        star: 5,
        second: StatusBonus.AtkBuf,
        passive: [
            // 通常攻撃と狙い撃ちのダメージ+12~24%。
            { items: [CombatBonus.Normal, CombatBonus.Heavy], value: [12, 15, 18, 21, 24] },
            // 矢を放った後、0.1秒毎にダメージ+8~16%、最大5回まで上昇する。
            { items: [CombatBonus.Normal, CombatBonus.Heavy], value: [8, 10, 12, 14, 16], limit: "矢を放った後0.1秒毎", stack: 5 },
        ]
    },
    FavoniusWarbow: {
        name: "西風猟弓",
        star: 4,
        second: StatusBonus.EnRec,
    },
    Stringless: {
        name: "絶弦",
        star: 4,
        second: StatusBonus.Elem,
        // 元素スキルと元素爆発のダメージ+24~48%。
        passive: { items: [CombatBonus.Skill, CombatBonus.Burst], value: [24, 30, 36, 42, 48] },
    },
    SacrificialBow: {
        name: "祭礼の弓",
        star: 4,
        second: StatusBonus.EnRec,
    },
    Rust: {
        name: "弓蔵",
        star: 4,
        second: StatusBonus.AtkBuf,
        // 通常攻撃のダメージ+40~80%、狙い撃ち射撃のダメージ-10%。
        passive: [
            { items: CombatBonus.Normal, value: [40, 50, 60, 70, 80] },
            { items: CombatBonus.Heavy, value: [-10, -10, -10, -10, -10] },
        ],
    },
    RoyalBow: {
        name: "旧貴族長弓",
        star: 4,
        second: StatusBonus.AtkBuf,
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで、攻撃会心発生時、効果をクリアにする。
        passive: { items: StatusBonus.CriRate, value: [8, 10, 12, 14, 16], limit: "敵にダメージを与えた時", stack: 5 },
    },
    PrototypeCrescent: {
        name: "澹月・試作",
        star: 4,
        second: StatusBonus.AtkBuf,
        // 狙い撃ちが弱点に命中すると、移動速度+10%、攻撃力+36~72%、継続時間10秒。
        passive: { items: StatusBonus.AtkBuf, value: [36, 45, 54, 63, 72], limit: "狙い撃ちが弱点に命中した時", times: 10 },
    },
    CompoundBow: {
        name: "リングボウ",
        star: 4,
        second: ElementBonus.Phys,
        // 通常攻撃と狙い撃ち射撃が命中すると、攻撃力+4~8％、通常攻撃速度1.2~2.4％、継続時間6秒、最大4重まで、0.3秒に1回のみ発動可能。
        passive: { items: StatusBonus.AtkBuf, value: [4, 5, 6, 7, 8], limit: "通常攻撃と狙い撃ちが命中した時", times: 6, stack: 4 },
    },
    BlackcliffWarbow: {
        name: "黒岩の戦弓",
        star: 4,
        second: StatusBonus.CriDmg,
        // 敵を倒した後、攻撃力+12~24％、継続時間30秒。最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: StatusBonus.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    ViridescentHunt: {
        name: "蒼翠の狩猟弓",
        star: 4,
        second: StatusBonus.CriRate,
    },
    Messenger: {
        name: "文使い",
        star: 3,
        second: StatusBonus.CriDmg,
    },
    RecurveBow: {
        name: "リカーブボウ",
        star: 3,
        second: StatusBonus.HpBuf,
    },
    RavenBow: {
        name: "鴉羽の弓",
        star: 3,
        second: StatusBonus.Elem,
        // 水元素又は炎元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: StatusBonus.AnyDmg, value: [12, 15, 18, 21, 24], limit: "水、炎元素の影響を受けた敵" },
    },
    SharpshootersOath: {
        name: "シャープシューターの誓い",
        star: 3,
        second: StatusBonus.CriDmg,
        // 弱点に対するダメージ+24~48%。
        passive: { items: StatusBonus.AnyDmg, value: [24, 30, 36, 42, 48], limit: "弱点" },
    },
    Slingshot: {
        name: "弾弓",
        star: 3,
        second: StatusBonus.CriRate,
        // 通常攻撃又は狙い撃ちの時、矢が発射後0.3秒内に敵に命中すると、ダメージ+36~60%。0.3秒より長い場合、ダメージ-10%。
        passive: [
            // 通常攻撃又は狙い撃ちの時、矢が発射後0.3秒内に敵に命中すると、ダメージ+36~60%。
            { items: [CombatBonus.Normal, CombatBonus.Heavy], value: [36, 42, 48, 54, 60], limit: "矢が発射後0.3秒以内に敵に命中した時" },
            // 0.3秒より長い場合、ダメージ-10%。
            { items: [CombatBonus.Normal, CombatBonus.Heavy], value: [-10, -10, -10, -10, -10], limit: "矢が発射後0.3秒より長く敵に命中した時" }
        ]
    },
};
const CATALYST_LIST = {
    other: {
        name: "-",
        star: 1,
        second: StatusBonus.Other,
    },
    SkywardAtlas: {
        name: "天空の巻",
        star: 5,
        second: StatusBonus.AtkBuf,
        // 元素ダメージ+12~24%。
        passive: { items: ElementBonus.Any, value: [12, 15, 18, 21, 24] },
    },
    LostSacredWinds: {
        name: "四風原典",
        star: 5,
        second: StatusBonus.CriRate,
        // 移動速度+10%。
        // 出場中は4秒毎に元素ダメージ+8~16%、最大4重まで。キャラが退場または戦闘不能まで有効する。
        passive: { items: ElementBonus.Any, value: [8, 10, 12, 14, 16], limit: "出場中は4秒毎", stack: 4 },
    },
    MemoryDust: {
        name: "浮世の錠",
        star: 5,
        second: StatusBonus.AtkBuf,
        passive: [
            // シールド強化+20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: StatusBonus.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: StatusBonus.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    FavoniusCodex: {
        name: "西風秘典",
        star: 4,
        second: StatusBonus.EnRec,
    },
    TheWidsith: {
        name: "流浪楽章",
        star: 4,
        second: StatusBonus.CriDmg,
        // キャラ登場時、ランダムにテーマ曲を1つ獲得する、継続時間10秒。30秒ごとに1回のみ発動する。
        passive: [
            // 叙唱:攻撃力+60~120%
            { items: StatusBonus.AtkBuf, value: [60, 75, 90, 105, 120], limit: "叙唱：キャラ登場時", times: 10 },
            // 詠唱:全元素ダメージ+48~96％
            { items: ElementBonus.Any, value: [48, 60, 72, 84, 96], limit: "詠唱：キャラ登場時", times: 10 },
            // 間奏曲:元素熟知+240~480％
            { items: StatusBonus.Elem, value: [240, 300, 360, 420, 480], limit: "間奏曲：キャラ登場時", times: 10 },
        ],
    },
    SacrificialFragments: {
        name: "祭礼の断片",
        star: 4,
        second: StatusBonus.Elem,
    },
    EyePerception: {
        name: "昭心",
        star: 4,
        second: StatusBonus.AtkBuf,
    },
    RoyalGrimoire: {
        name: "旧貴族秘法録",
        star: 4,
        second: StatusBonus.AtkBuf,
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: StatusBonus.CriRate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 6 },
    },
    SolarPearl: {
        name: "匣中日月",
        star: 4,
        second: StatusBonus.CriRate,
        passive: [
            // 通常攻撃が命中した後、6秒間元素スキルと元素爆発のダメージ+20~40%。
            { items: [CombatBonus.Skill, CombatBonus.Burst], value: [20, 25, 30, 35, 40], limit: "通常攻撃が命中した時", times: 6 },
            // 元素スキル又は元素爆発が命中した後、6秒間通常攻撃のダメージ+20~40%。
            { items: CombatBonus.Normal, value: [20, 25, 30, 35, 40], limit: "元素スキルか元素爆発が命中した時", times: 6 },
        ],
    },
    PrototypeMalice: {
        name: "金珀・試作",
        star: 4,
        second: StatusBonus.HpBuf,
    },
    MappaMare: {
        name: "万国諸海の図譜",
        star: 4,
        second: StatusBonus.Elem,
        // 元素反応を起こした後、元素ダメージ+8~16%、継続時間10秒、最大2重まで。
        passive: { items: ElementBonus.Any, value: [8, 10, 12, 14, 16], limit: "元素反応を起こした後", times: 10, stack: 2 },
    },
    BlackcliffAmulet: {
        name: "黒岩の緋玉",
        star: 4,
        second: StatusBonus.CriDmg,
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる
        passive: { items: StatusBonus.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    Frostbearer: {
        name: "冬忍びの実",
        star: 4,
        second: StatusBonus.AtkBuf,
    },
    TwinNephrite: {
        name: "特級の宝玉",
        star: 3,
        second: StatusBonus.CriRate,
        // 敵を倒した後15秒間、移動速度と攻撃力+12~20%。
        passive: { items: StatusBonus.AtkBuf, value: [12, 14, 16, 18, 20], limit: "敵を倒した後", times: 15 },
    },
    OtherworldlyStory: {
        name: "異世界旅行記",
        star: 3,
        second: StatusBonus.EnRec,
    },
    MagicGuide: {
        name: "魔導緒論",
        star: 3,
        second: StatusBonus.Elem,
        // 水元素又は雷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: StatusBonus.AnyDmg, value: [12, 15, 18, 21, 24], limit: "水、雷元素の影響を受けた敵" },
    },
    TalesDragonSlayers: {
        name: "竜殺しの英傑譚",
        star: 3,
        second: StatusBonus.HpBuf,
        // キャラを切り替えると、次に登場するキャラの攻撃力+24~48%、継続時間10秒。20秒に1回のみ発動可能。
        passive: { items: StatusBonus.AtkBuf, value: [24, 30, 36, 42, 48], limit: "キャラを切り替えると、次に登場するキャラ", times: 10, target: "next" },
    },
    AmberCatalyst: {
        name: "翡玉法珠",
        star: 3,
        second: StatusBonus.Elem,
        // 蒸発、感電、凍結または水元素拡散反応を起こした後12秒間、攻撃力+20~40%。
        passive: { items: StatusBonus.AtkBuf, value: [20, 25, 30, 35, 40], limit: "蒸発、感電、凍結、または水元素拡散反応後", times: 12 },
    },
};
const WEAPON_LIST = {
    sword: SWORD_LIST,
    claymore: CLAYMORE_LIST,
    polearm: POLEARM_LIST,
    bow: BOW_LIST,
    catalyst: CATALYST_LIST
};
