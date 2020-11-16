// TODO: 多言語対応（ソース全体）

const SWORD_LIST = {
    other: {
        name: "-",
        star: 1,
        second: "other",
        passive: null,
    },
    SkywardBlade: {
        name: "天空の刃",
        star: 5,
        second: "en_rec",
        // 会心率+4~8%
        passive: new Bonus("cri_rate", [4, 5, 6, 7, 8]),
        // 元素爆発を使用すると衝天の勢いを獲得する:移動速度+10%、攻撃速度+10%、通常攻撃と重撃が命中する際に、攻撃力の20~40%の追加ダメージを与える、継続時間12秒。
    },
    AquilaFavonia: {
        name: "風鷹剣",
        star: 5,
        second: "phys_dmg",
        // 攻撃力+20~40%
        passive: new Bonus("atk_buf", [20, 25, 30, 35, 40]),
        // ダメージを受けると発動:抗争の旗を高く掲げる西風の鷹の魂が蘇り、攻撃力の100~160%分のHPを回復し、周りの敵に攻撃力の200~320%のダメージを与える。15秒ごとに1回発動可能。
    },
    FavoniusSword: {
        name: "西風剣",
        star: 4,
        second: "en_rec",
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        passive: null,
    },
    TheFlute: {
        name: "笛の剣",
        star: 4,
        second: "atk_buf",
        // 通常攻撃または重撃が命中すると、100%の確率で和音を1個獲得する。
        // 和音を5個集めると、音律の力を放ち、周囲の敵に攻撃力の100~200%のダメージを与える。和音は最大30秒存在し、0.5秒毎に最大1個獲得可能。
        passive: null,
    },
    SacrificialSword: {
        name: "祭礼の剣",
        star: 4,
        second: "en_rec",
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~16秒毎に1回のみ発動する。
        passive: null,
    },
    LionsRoar: {
        name: "匣中龍吟",
        star: 4,
        second: "atk_buf",
        // 炎元素又は雷元素の影響を受けた敵に対するダメージ+20~36%。
        passive: new Bonus("any_dmg", [20, 24, 28, 32, 36], "炎、雷元素の影響を受けた敵"),
    },
    RoyalLongsword: {
        name: "旧貴族長剣",
        star: 4,
        second: "atk_buf",
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: new Bonus("cri_rate", [8, 10, 12, 14, 16], "ダメージを与えた時", 0, 5),
    },
    PrototypeRancour: {
        name: "斬岩・試作",
        star: 4,
        second: "phys_dmg",
        // 通常攻撃または重撃が命中すると、攻撃力と防御力+4~8%、継続時間6秒、最大4重まで。0.3秒ごとに1回発動可能。
        passive: new Bonus(["atk_buf", "def_buf"], [4, 5, 6, 7, 8], "通常攻撃または重撃が命中した時", 6, 4),
    },
    IronSting: {
        name: "鉄蜂の刺し",
        star: 4,
        second: "elem",
        // 元素ダメージを与えた6秒間、キャラの与えるダメージ+6~12%、最大2重まで、1秒毎に1回のみ発動する。
        passive: new Bonus("any_dmg", [6, 7.5, 9, 10.5, 12], "元素ダメージを与えた後", 6, 2),
    },
    BlackcliffLongsword: {
        name: "黒岩の長剣",
        star: 4,
        second: "cri_dmg",
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 24], "敵を倒した後", 30, 3),
    },
    BlackSword: {
        name: "黒剣",
        star: 4,
        second: "cri_rate",
        // 通常攻撃と重撃ダメージ+20~40%
        passive: new Bonus(["normal_dmg", "heavy_dmg"], [20, 25, 30, 35, 40]),
        // さらに通常攻撃と重撃が会心時、攻撃力の60~100%分のHPを回復する。5秒に1回のみ発動可能。
    },
    SwordDescension: {
        name: "降臨の剣",
        star: 4,
        second: "atk_buf",
        // 通常攻撃と重撃が命中時、50%の確率で攻撃力の200%の狭範囲ダメージを与える。10秒毎に1回のみ発動可能。
        // 旅人が降臨の剣を装備するとさらに攻撃力+66。
        passive: new Bonus("atk", [66], "旅人が装備した時"),
    },
    TravelersSword: {
        name: "旅道の剣",
        star: 3,
        second: "def_buf",
        // 元素オーブまたは元素粒子を獲得した時、HPを1~2%回復する。
        passive: null,
    },
    FilletBlade: {
        name: "チ虎魚の刀",
        star: 3,
        second: "atk_buf",
        // 攻撃が命中すると、50%の確率で1体の敵に攻撃力の240~400%のダメージを与える。15~11秒毎に1回のみ発動する。
        passive: null,
    },
    DarkIronSword: {
        name: "暗鉄剣",
        star: 3,
        second: "elem",
        // 過負荷、超電導、感電、または雷元素拡散反応が発生した12秒間、基礎攻撃力+20~40%。
        passive: new Bonus("atk_rate", [20, 25, 30, 35, 40], "過負荷、超電磁、感電または雷元素拡散が発生した時", 12),
    },
    CoolSteel: {
        name: "冷刃",
        star: 3,
        second: "atk_buf",
        // 水元素又は氷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: new Bonus("any_dmg", [12, 15, 18, 21, 24], "水、氷元素の影響を受けた敵"),
    },
    HarbingerDawn: {
        name: "黎明の神剣",
        star: 3,
        second: "cri_dmg",
        // HPが90%以上の場合、会心率+14~28%。
        passive: new Bonus("cri_rate", [14, 17.5, 21, 24.5, 28], "HP90%以上の時"),
    },
    SkyriderSword: {
        name: "飛天御剣",
        star: 3,
        second: "en_rec",
        // 元素爆発を発動した後、攻撃力と移動速度+12~24%、継続時間15%。
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 25], "元素爆発後", 15),
    },
};

const CLAYMORE_LIST = {
    other: {
        name: "-",
        star: 1,
        second: "other",
        passive: null,
    },
    WolfsGravestone: {
        name: "狼の末路",
        star: 5,
        second: "atk_buf",
        passive: [
            // 攻撃力+20~40%
            new Bonus("atk_buf", [20, 25, 30, 35, 40]),
            // HPが30%以下の敵に命中すると、チーム全員の攻撃力+40~80%、継続時間12秒。30秒に1回のみ発動可能。
            new Bonus("atk_buf", [40, 50, 60, 70, 80], "HP30%以下の敵に命中した時", 12, 0, "all"),
        ],
    },
    SkywardPride: {
        name: "天空の傲",
        star: 5,
        second: "en_rec",
        // 与えるダメージ+8~16%。
        passive: new Bonus("any_dmg", [8, 10, 12, 14, 16]),
        // 元素爆発を発動した後、通常攻撃と重撃が命中すると真空の刃を放ち、経路上の敵に攻撃力の80~160%のダメージを与える、継続時間20秒または真空の刃を8回発動まで。
    },
    FavoniusGreatsword: {
        name: "西風大剣",
        star: 4,
        second: "en_rec",
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        passive: null,
    },
    TheBell: {
        name: "鐘の剣",
        star: 4,
        second: "hp_buf",
        // ダメージを受けた時、HP上限の20~32%に相当するダメージを吸収できるシールドを生成する。継続時間は最大10秒まで。45秒毎に1回のみ発動する。
        // シールドが存在する時、キャラクターの与えるダメージ+12~24%。
        passive: new Bonus("any_dmg", [12, 15, 18, 21, 24], "シールドが存在する時"),
    },
    SacrificialGreatsword: {
        name: "祭礼の大剣",
        star: 4,
        second: "en_rec",
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~16秒毎に1回のみ発動する。
        passive: null,
    },
    Rainslasher: {
        name: "雨裁",
        star: 4,
        second: "elem",
        // 水元素又は雷元素の影響を受けた敵に対するダメージ+20~36%。
        passive: new Bonus("any_dmg", [20, 24, 28, 32, 36], "水、雷元素の影響を受けた敵"),
    },
    RoyalGreatsword: {
        name: "旧貴族大剣",
        star: 4,
        second: "atk_buf",
        // 攻撃が敵にダメージを与えた時、会心率+8%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: new Bonus("cri_rate", [8, 10, 12, 14, 16], "ダメージを与えた時", 0, 5),
    },
    PrototypeAminus: {
        name: "古華・試作",
        star: 4,
        second: "atk_buf",
        // 通常攻撃と重撃が命中する度、50%の確率で狭範囲の敵に攻撃力の240~480%の追加ダメージを与える。15秒毎に1回のみ発動可能。
        passive: null,
    },
    Whiteblind: {
        name: "白影の剣",
        star: 4,
        second: "def_buf",
        // 通常攻撃か重撃が命中すると、攻撃力と防御力+6~12%。継続時間6秒、最大4重まで。0.5秒毎に1回のみ発動可能。
        passive: new Bonus(["atk_buf", "def_buf"], [6, 7.5, 9, 10.5, 12], "通常攻撃か重撃が命中した時", 6, 4),
    },
    BlackcliffSlasher: {
        name: "黒岩の斬刀",
        star: 4,
        second: "cri_dmg",
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 24], "敵を倒した後", 30, 3),
    },
    SerpentSpine: {
        name: "螭龍の剣",
        star: 4,
        second: "cri_rate",
        // フィールドにいる時、4秒毎に、与えるダメージ+6~10%、被ダメージ+3~1.8%。最大5重まで、退場後もリセットされず、攻撃を受けると効果数-1。
        passive: new Bonus("any_dmg", [6, 7, 8, 9, 10], "フィールドにいる時4秒毎", 0, 5),
    },
    SkyriderGreatsword: {
        name: "飛天大御剣",
        star: 3,
        second: "phys_dmg",
        // 通常攻撃と重撃が命中すると、攻撃力+6~10%、継続時間6秒、最大4重まで。0.5秒毎に1回のみ発動可能。
        passive: new Bonus("atk_buf", [6, 7, 8, 9, 10], "通常攻撃か重撃が命中した時", 6, 4),
    },
    WhiteGreatsword: {
        name: "白鉄の大剣",
        star: 3,
        second: "def_buf",
        // 敵を倒した時、HPを8~16%回復する。
        passive: null,
    },
    FerrousShadow: {
        name: "鉄影段平",
        star: 3,
        second: "hp_buf",
        // HPが70~90%以下になると、重撃は中断されにくくなり、さらに重撃ダメージ+30~50%。
        passive: new Bonus("heavy_dmg", [30, 35, 40, 45, 50], "HPが一定値以下の時"),
    },
    BloodtaintedGreatsword: {
        name: "鮮血を浴びた剣",
        star: 3,
        second: "elem",
        // 炎元素又は雷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: new Bonus("any_dmg", [12, 15, 18, 21, 24], "炎、雷元素の影響を受けた敵"),
    },
    DebateClub: {
        name: "理屈責め",
        star: 3,
        second: "atk_buf",
        // 元素スキルを発動した後、通常攻撃と重撃が命中する際に、狭範囲で攻撃力の60~120%のダメージを与える。
        passive: null,
    },
};

const POLEARM_LIST = {
    other: {
        name: "-",
        star: 1,
        second: "other",
        passive: null,
    },
    PrimordialSpear: {
        name: "和璞鳶",
        star: 5,
        second: "cri_rate",
        passive: [
            // 敵に命中した時、自身の攻撃力+3.2~6%、継続時間6秒、最大7重まで。0.3秒に最大1回発動でき、7重まで発動するとスキルダメージ+12~24%。
            new Bonus("atk_buf", [3.2, 3.9, 4.6, 5.3, 6.0], "敵に命中した時", 6, 7),
            new Bonus("skill_dmg", [12, 15, 18, 21, 24], "7重まで発動した時"),
        ],
    },
    SkywardSpine: {
        name: "天空の脊",
        star: 5,
        second: "en_rec",
        // 会心率+8~16%、通常攻撃速度+12%。
        passive: new Bonus("cri_rate", [8, 10, 12, 14, 16]),
        // 通常攻撃と重撃が命中時、50%の確率で真空刃を発動し、攻撃力の40~100%の狭範囲ダメージを与える。2秒毎に1回のみ発動可能。
    },
    DragonsBane: {
        name: "匣中滅龍",
        star: 4,
        second: "elem",
        // 水元素又は炎元素の影響を受けた敵に対するダメージ+20~36%。
        passive: new Bonus("any_dmg", [20, 24, 28, 32, 36], "水、炎元素の影響を受けた敵"),
    },
    FavoniusLance: {
        name: "西風長槍",
        star: 4,
        second: "en_rec",
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        passive: null,
    },
    PrototypeGrudge: {
        name: "星鎌・試作",
        star: 4,
        second: "en_rec",
        // 元素スキルを発動した後、通常攻撃と重撃ダメージ+8~16%、継続時間12秒、最大2重まで。
        passive: new Bonus(["normal_dmg", "heavy_dmg"], [8, 10, 12, 14, 16], "元素スキル発動後", 12, 2),
    },
    CrescentPike: {
        name: "流月の針",
        star: 4,
        second: "phys_dmg",
        // 元素粒子又は元素オーブを獲得した5秒間、通常攻撃と重撃で、攻撃力の20~40%の追加ダメージを与える。
        passive: null,
    },
    BlackcliffPole: {
        name: "黒岩の突槍",
        star: 4,
        second: "cri_dmg",
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 24], "敵を倒した後", 30, 3),
    },
    Deathmatch: {
        name: "死闘の槍",
        star: 4,
        second: "cri_rate",
        passive: [
            // 近くに敵が2人以上いる時、攻撃力+16~32%、防御力+16~32%。
            new Bonus(["atk_buf", "def_buf"], [16, 20, 24, 28, 32], "近くに敵が2人以上いる時"),
            // 近くにいる敵が2人未満の時、攻撃力24~48%。
            new Bonus("atk_buf", [24, 30, 36, 42, 48], "近くに敵が2人未満の時"),
        ],
    },
    Halberd: {
        name: "鉾槍",
        star: 3,
        second: "atk_buf",
        // 通常攻撃が命中した敵1体に攻撃力の160~320%の追加ダメージを与える。10秒毎に1回のみ発動する。
        passive: null,
    },
    WhiteTassel: {
        name: "白纓槍",
        star: 3,
        second: "cri_rate",
        // 通常攻撃のダメージ+24~48%。
        passive: new Bonus("normal_dmg", [24, 30, 36, 42, 48]),
    },
    BlackTassel: {
        name: "黒纓槍",
        star: 3,
        second: "hp_buf",
        // スライムタイプの敵に与えるダメージ+40~80%。
        passive: new Bonus("any_dmg", [40, 50, 60, 70, 80], "スライムタイプの敵"),
    },
};

const BOW_LIST = {
    other: {
        name: "-",
        star: 1,
        second: "other",
        passive: null,
    },
    SkywardHarp: {
        name: "天空の翼",
        star: 5,
        second: "cri_rate",
        // 会心ダメージ+20~40%。
        passive: new Bonus("cri_dmg", [20, 25, 30, 35, 40]),
        // 攻撃が命中した時、60~100%の確率で狭範囲内の敵に攻撃力の125%の物理ダメージを与える。4~2秒毎に1回のみ発動可能。
    },
    AmosBow: {
        name: "アモスの弓",
        star: 5,
        second: "atk_buf",
        passive: [
            // 通常攻撃と狙い撃ちのダメージ+12~24%。
            new Bonus(["normal_dmg", "heavy_dmg"], [12, 15, 18, 21, 24]),
            // 矢を放った後、0.1秒毎にダメージ+8~16%、最大5回まで上昇する。
            new Bonus(["normal_dmg", "heavy_dmg"], [8, 10, 12, 14, 16], "矢を放った後0.1秒毎", 0, 5)
        ]
    },
    FavoniusWarbow: {
        name: "西風猟弓",
        star: 4,
        second: "en_rec",
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        passive: null,
    },
    Stringless: {
        name: "絶弦",
        star: 4,
        second: "elem",
        // 元素スキルと元素爆発のダメージ+24~48%。
        passive: new Bonus(["skill_dmg", "burst_dmg"], [24, 30, 36, 42, 48]),
    },
    SacrificialBow: {
        name: "祭礼の弓",
        star: 4,
        second: "en_rec",
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~14秒毎に1回のみ発動する。
        passive: null,
    },
    Rust: {
        name: "弓蔵",
        star: 4,
        second: "atk_buf",
        // 通常攻撃のダメージ+40~80%、狙い撃ち射撃のダメージ-10%。
        passive: [
            new Bonus("normal_dmg", [40, 50, 60, 70, 80]),
            new Bonus("heavy_dmg", [-10, -10, -10, -10, -10]),
        ],
    },
    RoyalBow: {
        name: "旧貴族長弓",
        star: 4,
        second: "atk_buf",
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで、攻撃会心発生時、効果をクリアにする。
        passive: new Bonus("cri_rate", [8, 10, 12, 14, 16], "敵にダメージを与えた時", 0, 5),
    },
    PrototypeCrescent: {
        name: "澹月・試作",
        star: 4,
        second: "atk_buf",
        // 狙い撃ちが弱点に命中すると、移動速度+10%、攻撃力+36~72%、継続時間10秒。
        passive: new Bonus("atk_buf", [36, 45, 54, 63, 72], "狙い撃ちが弱点に命中した時", 10),
    },
    CompoundBow: {
        name: "リングボウ",
        star: 4,
        second: "phys_dmg",
        // 通常攻撃と狙い撃ち射撃が命中すると、攻撃力+4~8％、通常攻撃速度1.2~2.4％、継続時間6秒、最大4重まで、0.3秒に1回のみ発動可能。
        passive: new Bonus("phys_buf", [4, 5, 6, 7, 8], "通常攻撃と狙い撃ちが命中した時", 6, 4),
    },
    BlackcliffWarbow: {
        name: "黒岩の戦弓",
        star: 4,
        second: "cri_dmg",
        // 敵を倒した後、攻撃力+12~24％、継続時間30秒。最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 24], "敵を倒した後", 30, 3),
    },
    ViridescentHunt: {
        name: "蒼翠の狩猟弓",
        star: 4,
        second: "cri_rate",
        // 通常攻撃と重撃が命中時、50％の確率で風の目を生成し、近くの敵を吸い寄せる。
        // 0.5秒毎に攻撃力の40~80％のダメージを与える。継続時間4秒、14~10秒毎に1回のみ発動可能。
        passive: null,
    },
    Messenger: {
        name: "文使い",
        star: 3,
        second: "cri_dmg",
        // 狙い撃ち時、弱点に命中すると、追加で攻撃力の100~200%のダメージを与え、必ず会心ダメージになる。10秒毎に1回のみ発動可能。
        passive: null,
    },
    RecurveBow: {
        name: "リカーブボウ",
        star: 3,
        second: "hp_buf",
        // 敵を倒した時、HPを8~16%回復する。
        passive: null,
    },
    RavenBow: {
        name: "鴉羽の弓",
        star: 3,
        second: "elem",
        // 水元素又は炎元素の影響を受けた敵に対するダメージ+12~24%。
        passive: new Bonus("any_dmg", [12, 15, 18, 21, 24], "水、炎元素の影響を受けた敵"),
    },
    SharpshootersOath: {
        name: "シャープシューターの誓い",
        star: 3,
        second: "cri_dmg",
        // 弱点に対するダメージ+24~48%。
        passive: new Bonus("any_dmg", [24, 30, 36, 42, 48], "弱点"),
    },
    Slingshot: {
        name: "弾弓",
        star: 3,
        second: "cri_rate",
        // 通常攻撃又は狙い撃ちの時、矢が発射後0.3秒内に敵に命中すると、ダメージ+36~60%。0.3秒より長い場合、ダメージ-10%。
        passive: new Bonus(["normal_dmg", "heavy_dmg"], [36, 42, 48, 54, 60], "矢が発射後0.3秒以内に敵に命中した時"),
    },
};

const CATALYST_LIST = {
    other: {
        name: "-",
        star: 1,
        second: "other",
        passive: null,
    },
    SkywardAtlas: {
        name: "天空の巻",
        star: 5,
        second: "atk_buf",
        // 元素ダメージ+12~24%。
        passive: new Bonus("elem_dmg", [12, 15, 18, 21, 24]),
        // 通常攻撃が命中した時、50%の確率で高天流雲の好意を獲得し、15秒内に自ら周囲の敵を攻撃すると、攻撃力の160~320%相当のダメージを与える。30秒毎に1回のみ発動可能。
    },
    LostSacredWinds: {
        name: "四風原典",
        star: 5,
        second: "cri_rate",
        // 移動速度+10%。
        // 出場中は4秒毎に元素ダメージ+8~16%、最大4重まで。キャラが退場または戦闘不能まで有効する。
        passive: new Bonus("elem_dmg", [8, 10, 12, 14, 16], "出場中は4秒毎", 0, 4),
    },
    FavoniusCodex: {
        name: "西風秘典",
        star: 4,
        second: "en_rec",
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        passive: null,
    },
    TheWidsith: {
        name: "流浪楽章",
        star: 4,
        second: "cri_dmg",
        // キャラ登場時、ランダムにテーマ曲を1つ獲得する、継続時間10秒。30秒ごとに1回のみ発動する。
        passive: [
            // 叙唱:攻撃力+60~120%
            new Bonus("atk_buf", [60, 75, 90, 105, 120], "キャラ登場時ランダム（叙唱）", 10),
            // 詠唱:全元素ダメージ+48~96％
            new Bonus("elem_dmg", [48, 60, 72, 84, 96], "キャラ登場時ランダム（詠唱）", 10),
            // 間奏曲:元素熟知+240~480％
            new Bonus("elem", [240, 300, 360, 420, 480], "キャラ登場時ランダム（間奏曲）", 10),
        ],
    },
    SacrificialFragments: {
        name: "祭礼の断片",
        star: 4,
        second: "elem",
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~14秒毎に1回のみ発動する。
        passive: null,
    },
    EyePerception: {
        name: "昭心",
        star: 4,
        second: "atk_buf",
        // 通常攻撃と重撃が命中する時、50%の確率で昭心法珠を1つ発射し、敵に攻撃力の240~360%のダメージを与える。敵同士に最大4回跳ね返る。この効果は12~8秒毎に1回発動可能。
        passive: null,
    },
    RoyalGrimoire: {
        name: "旧貴族秘法録",
        star: 4,
        second: "atk_buf",
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: new Bonus("cri_rate", [8, 10, 12, 14, 16], "ダメージを与えた時", 0, 6),
    },
    SolarPearl: {
        name: "匣中日月",
        star: 4,
        second: "cri_rate",
        passive: [
            // 通常攻撃が命中した後、6秒間元素スキルと元素爆発のダメージ+20~40%。
            new Bonus(["skill_dmg", "burst_dmg"], [20, 25, 30, 35, 40], "通常攻撃が命中した時", 6),
            // 元素スキル又は元素爆発が命中した後、6秒間通常攻撃のダメージ+20~40%。
            new Bonus("normal_dmg", [20, 25, 30, 35, 40], "元素スキルか元素爆発が命中した時", 6),
        ],
    },
    PrototypeMalice: {
        name: "金珀・試作",
        star: 4,
        second: "hp_buf",
        // 元素爆発を発動した後6秒間、2秒毎に元素エネルギーを4~6回復:さらに2秒毎にチーム全員のHPの4~6%を回復
        passive: null,
    },
    MappaMare: {
        name: "万国諸海の図譜",
        star: 4,
        second: "elem",
        // 元素反応を起こした後、元素ダメージ+8~16%、継続時間10秒、最大2重まで。
        passive: new Bonus("elem_dmg", [8, 10, 12, 14, 16], "元素反応を起こした後", 10, 2),
    },
    BlackcliffAmulet: {
        name: "黒岩の緋玉",
        star: 4,
        second: "cri_dmg",
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる
        passive: new Bonus("atk_buf", [12, 15, 18, 21, 24], "敵を倒した後", 30, 3),
    },
    TwinNephrite: {
        name: "特級の宝玉",
        star: 3,
        second: "cri_rate",
        // 敵を倒した後15秒間、移動速度と攻撃力+12~20%。
        passive: new Bonus("atk_buf", [12, 14, 16, 18, 20], "敵を倒した後", 15),
    },
    OtherworldlyStory: {
        name: "異世界旅行記",
        star: 3,
        second: "en_rec",
        // 元素オーブまたは元素粒子を獲得した時、HPを1%回復する
        passive: null,
    },
    MagicGuide: {
        name: "魔導緒論",
        star: 3,
        second: "elem",
        // 水元素又は雷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: new Bonus("any_dmg", [12, 15, 18, 21, 24], "水、雷元素の影響を受けた敵"),
    },
    TalesDragonSlayers: {
        name: "竜殺しの英傑譚",
        star: 3,
        second: "hp_buf",
        // キャラを切り替えると、次に登場するキャラの攻撃力+24~48%、継続時間10秒。20秒に1回のみ発動可能。
        passive: new Bonus("atk_buf", [24, 30, 36, 42, 48], "キャラを切り替えると、次に登場するキャラ", 10, 0, "next"),
    },
    AmberCatalyst: {
        name: "翡玉法珠",
        star: 3,
        second: "elem",
        // 蒸発、感電、凍結または水元素拡散反応を起こした後12秒間、攻撃力+20~40%。
        passive: new Bonus("atk_buf", [20, 25, 30, 35, 40], "蒸発、感電、凍結、または水元素拡散反応後", 12),
    },
};

const WEAPON_LIST = {
    sword: SWORD_LIST,
    claymore: CLAYMORE_LIST,
    polearm: POLEARM_LIST,
    bow: BOW_LIST,
    catalyst: CATALYST_LIST
};