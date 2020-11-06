const SWORD_LIST = {
    other: {
        name: "-",
        star: 1,
        second: "none",
        passive: null
    },
    AquilaFavonia: {
        name: "風鷹剣",
        star: 5,
        second: "phys_dmg",
        passive: new Bonus("atk_buf", [20, 25, 30, 35, 40])
    },
    SkywardBlade: {
        name: "天空の刃",
        star: 5,
        second: "en_rec",
        passive: new Bonus("cri_rate", [4, 5, 6, 7, 8])
    },
    FavoniusSword: {
        name: "西風剣",
        star: 4,
        second: "en_rec",
        passive: null
    },
    SacrificialSword: {
        name: "祭礼の剣",
        star: 4,
        second: "en_rec",
        passive: null
    },
    LionsRoar: {
        name: "匣中龍吟",
        star: 4,
        second: "atk_buf",
        passive: new Bonus("any_dmg", [20, 24, 28, 32, 36], "炎、雷元素の影響を受けた敵")
    },
    TheFlute: {
        name: "笛の剣",
        star: 4,
        second: "atk_buf",
        passive: null
    },
    RoyalLongsword: {
        name: "旧貴族長剣",
        star: 4,
        second: "atk_buf",
        passive: new Bonus("cri_rate", [8, 10, 12, 14, 16], "ダメージを与えた時", 0, 5)
    },
    BlackcliffLongsword: {
        name: "黒岩の長剣",
        star: 4,
        second: "cri_dmg",
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 24], "敵を倒した後", 30, 3)
    },
    PrototypeRancour: {
        name: "斬岩・試作",
        star: 4,
        second: "phys_dmg",
        passive: new Bonus(["atk_buf", "def_buf"], [4, 5, 6, 7, 8], "通常攻撃または重撃が命中", 6, 4)
    },
    IronSting: {
        name: "鉄蜂の刺し",
        star: 4,
        second: "elem",
        passive: new Bonus("any_dmg", [6, 7.5, 9, 10.5, 12], "元素ダメージを与えた後", 6, 2)
    },
    SwordDescension: {
        name: "降臨の剣",
        star: 4,
        second: "atk_buf",
        passive: new Bonus("atk", [66], "旅人が装備")
    },
    BlackSword: {
        name: "黒剣",
        star: 4,
        second: "cri_rate",
        passive: new Bonus(["normal_dmg", "heavy_dmg"], [20, 25, 30, 35, 40])
    },
    SkyriderSword: {
        name: "飛天御剣",
        star: 3,
        second: "en_rec",
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 25], "元素爆発後", 15)
    },
    FilletBlade: {
        name: "チ虎魚の刀",
        star: 3,
        second: "atk_buf",
        passive: null
    },
    TravelersSword: {
        name: "旅道の剣",
        star: 3,
        second: "def_buf",
        passive: null
    },
    HarbingerDawn: {
        name: "黎明の神剣",
        star: 3,
        second: "cri_dmg",
        passive: new Bonus("cri_rate", [14, 17.5, 21, 24.5, 28], "HP90%以上")
    },
    CoolSteel: {
        name: "冷刃",
        star: 3,
        second: "atk_buf",
        passive: new Bonus("any_dmg", [12, 15, 18, 21, 24], "水、氷元素の影響を受けた敵")
    },
    DarkIronSword: {
        name: "暗鉄剣",
        star: 3,
        second: "elem",
        passive: new Bonus("atk_rate", [20, 25, 30, 35, 40], "過負荷、超電磁、感電または雷元素拡散が発生", 12)
    },
};

const CLAYMORE_LIST = {
    other: {
        name: "-",
        star: 1,
        second: "none",
        passive: null
    },
    WolfsGravestone: {
        name: "狼の末路",
        star: 5,
        second: "atk_buf",
        passive: [
            new Bonus("atk_buf", [20, 25, 30, 35, 40]),
            new Bonus("atk_buf", [40, 50, 60, 70, 80], "HP30%以下の敵に命中、チーム全員", 12)
        ]
    },
    SkywardPride: {
        name: "天空の傲",
        star: 5,
        second: "en_rec",
        passive: new Bonus("any_dmg", [8, 10, 12, 14, 16])
    },
    FavoniusGreatsword: {
        name: "西風大剣",
        star: 4,
        second: "en_rec",
        passive: null
    },
    SacrificialGreatsword: {
        name: "祭礼の大剣",
        star: 4,
        second: "en_rec",
        passive: null
    },
    Rainslasher: {
        name: "雨裁",
        star: 4,
        second: "elem",
        passive: new Bonus("any_dmg", [20, 24, 28, 32, 36], "水、雷元素の影響を受けた敵")
    },
    TheBell: {
        name: "鐘の剣",
        star: 4,
        second: "hp_buf",
        passive: new Bonus("any_dmg", [12, 15, 18, 21, 24], "シールドが存在する時")
    },
    RoyalGreatsword: {
        name: "旧貴族大剣",
        star: 4,
        second: "atk_buf",
        passive: new Bonus("cri_rate", [8, 10, 12, 14, 16], "ダメージを与えた時", 0, 5)
    },
    BlackcliffSlasher: {
        name: "黒岩の斬刀",
        star: 4,
        second: "cri_dmg",
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 24], "敵を倒した後", 30, 3)
    },
    PrototypeAminus: {
        name: "古華・試作",
        star: 4,
        second: "atk_buf",
        passive: null
    },
    Whiteblind: {
        name: "白影の剣",
        star: 4,
        second: "def_buf",
        passive: new Bonus(["atk_buf", "def_buf"], [6, 7.5, 9, 10.5, 12], "通常攻撃か重撃が命中", 6, 4)
    },
    SerpentSpine: {
        name: "螭龍の剣",
        star: 4,
        second: "cri_rate",
        passive: new Bonus("any_dmg", [6, 7, 8, 9, 10], "フィールドにいる時、4秒毎", 0, 5)
    },
    SkyriderGreatsword: {
        name: "飛天大御剣",
        star: 3,
        second: "phys_dmg",
        passive: new Bonus("atk_buf", [6, 7, 8, 9, 10], "通常攻撃か重撃が命中", 6, 4)
    },
    DebateClub: {
        name: "理屈責め",
        star: 3,
        second: "atk_buf",
        passive: null
    },
    WhiteGreatsword: {
        name: "白鉄の大剣",
        star: 3,
        second: "def_buf",
        passive: null
    },
    BloodtaintedGreatsword: {
        name: "鮮血を浴びた剣",
        star: 3,
        second: "elem",
        passive: new Bonus("any_dmg", [12, 15, 18, 21, 24], "炎、雷元素の影響を受けた敵")
    },
    FerrousShadow: {
        name: "鉄影段平",
        star: 3,
        second: "hp_buf",
        passive: new Bonus("heavy_dmg", [30, 35, 40, 45, 50], "HPが一定値以下")
    },
};

const POLEARM_LIST = {
    other: {
        name: "-",
        star: 1,
        second: "none",
        passive: null
    },
    PrimordialSpear: {
        name: "和璞鳶",
        star: 5,
        second: "cri_rate",
        passive: [
            new Bonus("atk_buf", [3.2, 3.9, 4.6, 5.3, 6.0], "敵に命中", 6, 7),
            new Bonus("skill_dmg", [12, 14, 16, 18, 20], "7重まで発動")
        ]
    },
    SkywardSpine: {
        name: "天空の脊",
        star: 5,
        second: "en_rec",
        passive: new Bonus("cri_rate", [8, 10, 12, 14, 16])
    },
    FavoniusLance: {
        name: "西風長槍",
        star: 4,
        second: "en_rec",
        passive: null
    },
    DragonsBane: {
        name: "匣中滅龍",
        star: 4,
        second: "elem",
        passive: new Bonus("any_dmg", [20, 24, 28, 32, 36], "炎、水元素の影響を受けた敵")
    },
    BlackcliffPole: {
        name: "黒岩の突槍",
        star: 4,
        second: "cri_dmg",
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 24], "敵を倒した後", 30, 3)
    },
    PrototypeGrudge: {
        name: "星鎌・試作",
        star: 4,
        second: "en_rec",
        passive: new Bonus(["normal_dmg", "heavy_dmg"], [8, 10, 12, 14, 16], "元素スキル発動後", 12, 2)
    },
    CrescentPike: {
        name: "流月の針",
        star: 4,
        second: "phys_dmg",
        passive: null
    },
    Deathmatch: {
        name: "死闘の槍",
        star: 4,
        second: "cri_rate",
        passive: [
            new Bonus(["atk_buf", "def_buf"], [16, 20, 24, 28, 32], "近くに敵が2人以上いる時"),
            new Bonus("atk_buf", [24, 30, 36, 42, 48], "近くに敵が2人未満の時", )
        ]
    },
    BlackTassel: {
        name: "黒纓槍",
        star: 3,
        second: "hp_buf",
        passive: new Bonus("any_dmg", [40, 50, 60, 70, 80], "スライムタイプの敵")
    },
    Halberd: {
        name: "鉾槍",
        star: 3,
        second: "atk_buf",
        passive: null
    },
    WhiteTassel: {
        name: "白纓槍",
        star: 3,
        second: "cri_rate",
        passive: new Bonus("normal_dmg", [24, 30, 36, 42, 48])
    },
};

const BOW_LIST = {
    other: {
        name: "-",
        star: 1,
        second: "none",
        passive: null
    },
    AmosBow: {
        name: "アモスの弓",
        star: 5,
        second: "atk_buf",
        passive: [
            new Bonus(["normal_dmg", "heavy_dmg"], [12, 15, 18, 21, 24]),
            new Bonus(["normal_dmg", "heavy_dmg"], [8, 10, 12, 14, 16], "矢を放った後、0.1秒毎", 0, 5)
        ]
    },
    SkywardHarp: {
        name: "天空の翼",
        star: 5,
        second: "cri_rate",
        passive: new Bonus("cri_dmg", [20, 25, 30, 35, 40])
    },
    FavoniusWarbow: {
        name: "西風猟弓",
        star: 4,
        second: "en_rec",
        passive: null
    },
    SacrificialBow: {
        name: "祭礼の弓",
        star: 4,
        second: "en_rec",
        passive: null
    },
    Rust: {
        name: "弓蔵",
        star: 4,
        second: "atk_buf",
        passive: new Bonus("normal_dmg", [40, 50, 60, 70, 80])
    },
    Stringless: {
        name: "絶弦",
        star: 4,
        second: "elem",
        passive: new Bonus(["skill_dmg", "burst_dmg"], [24, 30, 36, 42, 48])
    },
    BlackcliffWarbow: {
        name: "黒岩の戦弓",
        star: 4,
        second: "cri_dmg",
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 24], "敵を倒した後", 30, 3)
    },
    PrototypeCrescent: {
        name: "澹月・試作",
        star: 4,
        second: "atk_buf",
        passive: new Bonus("atk_buf", [36, 45, 54, 63, 72], "狙い撃ちが弱点に命中", 10)
    },
    CompoundBow: {
        name: "リングボウ",
        star: 4,
        second: "phys_dmg",
        passive: new Bonus("phys_buf", [4, 5, 6, 7, 8], "通常攻撃と狙い撃ちが命中", 6, 4)
    },
    ViridescentHunt: {
        name: "蒼翠の狩猟弓",
        star: 4,
        second: "cri_rate",
        passive: null
    },
    SharpshootersOath: {
        name: "シャープシューターの誓い",
        star: 3,
        second: "cri_dmg",
        passive: new Bonus("any_dmg", [24, 30, 36, 42, 48], "狙い撃ち")
    },
    RavenBow: {
        name: "鴉羽の弓",
        star: 3,
        second: "elem",
        passive: new Bonus("any_dmg", [12, 15, 18, 21, 24], "水、炎元素の影響を受けた敵")
    },
    Slingshot: {
        name: "弾弓",
        star: 3,
        second: "cri_rate",
        passive: new Bonus("normal_dmg, heavy_dmg", [36, 42, 48, 54, 60], "矢が発射後0.3秒以内に敵に命中")
    },
    Messenger: {
        name: "文使い",
        star: 3,
        second: "cri_dmg",
        passive: null
    },
    RecurveBow: {
        name: "リカーブボウ",
        star: 3,
        second: "hp_buf",
        passive: null
    },
};

const CATALYST_LIST = {
    other: {
        name: "-",
        star: 1,
        second: "none",
        passive: null
    },
    SkywardAtlas: {
        name: "天空の巻",
        star: 5,
        second: "atk_buf",
        passive: new Bonus("elem_dmg", [12, 15, 18, 21, 24])
    },
    LostSacredWinds: {
        name: "四風原典",
        star: 5,
        second: "cri_rate",
        passive: new Bonus("elem_dmg", [8, 10, 12, 14, 16], "出場中に4秒毎", 0, 4)
    },
    SolarPearl: {
        name: "匣中日月",
        star: 4,
        second: "cri_rate",
        passive: [
            new Bonus(["skill_dmg", "burst_dmg"], [20, 25, 30, 35, 40], "通常攻撃が命中", 6),
            new Bonus("normal_dmg", [20, 25, 30, 35, 40], "元素スキルか元素爆発が命中", 6)
        ]
    },
    SacrificialFragments: {
        name: "祭礼の断片",
        star: 4,
        second: "elem",
        passive: null
    },
    EyePerception: {
        name: "昭心",
        star: 4,
        second: "atk_buf",
        passive: null
    },
    BlackcliffAmulet: {
        name: "黒岩の緋玉",
        star: 4,
        second: "cri_dmg",
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 24], "敵を倒した後", 30, 3)
    },
    PrototypeMalice: {
        name: "金珀・試作",
        star: 4,
        second: "hp_buf",
        passive: null
    },
    MappaMare: {
        name: "万国諸海の図譜",
        star: 4,
        second: "elem",
        passive: new Bonus("elem_dmg", [8, 10, 12, 14, 16], "元素反応を起こした後", 10, 2)
    },
    TheWidsith: {
        name: "流浪楽章",
        star: 4,
        second: "cri_dmg",
        passive: [
            new Bonus("atk_buf", [60, 75, 90, 105, 120], "キャラ登場時、ランダム（叙唱）", 10),
            new Bonus("elem_dmg", [48, 60, 72, 84, 96], "キャラ登場時、ランダム（詠唱）", 10),
            new Bonus("elem", [240, 300, 360, 420, 480], "キャラ登場時、ランダム（間奏曲）", 10)
        ]
    },
    FavoniusCodex: {
        name: "西風秘典",
        star: 4,
        second: "en_rec",
        passive: null
    },
    AmberCatalyst: {
        name: "翡玉法珠",
        star: 3,
        second: "elem",
        passive: new Bonus("atk_buf", [20, 25, 30, 35, 40], "蒸発、感電、凍結、または水元素拡散反応後", 12)
    },
    MagicGuide: {
        name: "魔導緒論",
        star: 3,
        second: "elem",
        passive: new Bonus("any_dmg", [12, 15, 18, 21, 24], "水、雷元素の影響を受けた敵")
    },
    TalesDragonSlayers: {
        name: "竜殺しの英傑譚",
        star: 3,
        second: "hp_buf",
        passive: new Bonus("atk_buf", [24, 30, 36, 42, 48], "キャラを切り替えると、次に登場するキャラ", 10)
    },
    OtherworldlyStory: {
        name: "異世界旅行記",
        star: 3,
        second: "en_rec",
        passive: null
    },
    TwinNephrite: {
        name: "特級の宝玉",
        star: 3,
        second: "cri_rate",
        passive: new Bonus("atk_buf", [12, 14, 16, 18, 20], "敵を倒した後", 15)
    },
};

const WEAPON_LIST = {
    sword: SWORD_LIST,
    claymore: CLAYMORE_LIST,
    polearm: POLEARM_LIST,
    bow: BOW_LIST,
    catalyst: CATALYST_LIST
};