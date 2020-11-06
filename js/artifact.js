const ARTIFACT_LEVEL = [0, 0, 0, 12, 16, 20]

// https://genshin-impact.fandom.com/wiki/Artifacts/Main_Stat_Scaling
const ARTIFACT_PARAM = [
    // HP, 攻撃力, HP(%)|攻撃力(%)|元素ダメージ, 防御力(%)|物理ダメージ, 元素熟知, 元素チャージ効率, 会心率, 会心ダメージ
    [
        { hp: 430, atk: 28, atk_buf: 5.2, def_buf: 6.6, elem: 21, en_rec: 5.8, cri_rate: 3.5, cri_dmg: 7.0 },
        { hp: 552, atk: 36, atk_buf: 6.7, def_buf: 8.4, elem: 27, en_rec: 7.5, cri_rate: 4.5, cri_dmg: 9.0 },
        { hp: 674, atk: 44, atk_buf: 8.2, def_buf: 10.3, elem: 33, en_rec: 9.1, cri_rate: 5.5, cri_dmg: 11.0 },
        { hp: 796, atk: 52, atk_buf: 9.7, def_buf: 12.1, elem: 39, en_rec: 10.8, cri_rate: 6.5, cri_dmg: 12.9 },
        { hp: 918, atk: 60, atk_buf: 11.2, def_buf: 14.0, elem: 45, en_rec: 12.4, cri_rate: 7.5, cri_dmg: 14.9 },
        { hp: 1040, atk: 68, atk_buf: 12.7, def_buf: 15.8, elem: 51, en_rec: 14.1, cri_rate: 8.4, cri_dmg: 16.9 },
        { hp: 1162, atk: 76, atk_buf: 14.2, def_buf: 17.7, elem: 57, en_rec: 15.7, cri_rate: 9.4, cri_dmg: 18.9 },
        { hp: 1283, atk: 84, atk_buf: 15.6, def_buf: 19.6, elem: 63, en_rec: 17.4, cri_rate: 10.4, cri_dmg: 20.9 },
        { hp: 1405, atk: 91, atk_buf: 17.1, def_buf: 21.4, elem: 69, en_rec: 19.0, cri_rate: 11.4, cri_dmg: 22.8 },
        { hp: 1527, atk: 99, atk_buf: 18.6, def_buf: 23.3, elem: 75, en_rec: 20.7, cri_rate: 12.4, cri_dmg: 24.8 },
        { hp: 1649, atk: 107, atk_buf: 20.1, def_buf: 25.1, elem: 80, en_rec: 22.3, cri_rate: 13.4, cri_dmg: 26.8 },
        { hp: 1771, atk: 115, atk_buf: 21.6, def_buf: 27.0, elem: 86, en_rec: 24.0, cri_rate: 14.4, cri_dmg: 28.8 },
        { hp: 1893, atk: 123, atk_buf: 23.1, def_buf: 28.8, elem: 92, en_rec: 25.6, cri_rate: 15.4, cri_dmg: 30.8 }
    ],
    [
        { hp: 645, atk: 42, atk_buf: 6.3, def_buf: 7.9, elem: 25, en_rec: 7.0, cri_rate: 4.2, cri_dmg: 8.4 },
        { hp: 828, atk: 54, atk_buf: 8.1, def_buf: 10.1, elem: 32, en_rec: 9.0, cri_rate: 5.4, cri_dmg: 10.8 },
        { hp: 1011, atk: 66, atk_buf: 9.9, def_buf: 12.3, elem: 39, en_rec: 11.0, cri_rate: 6.6, cri_dmg: 13.1 },
        { hp: 1194, atk: 78, atk_buf: 11.6, def_buf: 14.6, elem: 47, en_rec: 12.9, cri_rate: 7.8, cri_dmg: 15.5 },
        { hp: 1377, atk: 90, atk_buf: 13.4, def_buf: 16.8, elem: 54, en_rec: 14.9, cri_rate: 9.0, cri_dmg: 17.9 },
        { hp: 1559, atk: 102, atk_buf: 15.2, def_buf: 19.0, elem: 61, en_rec: 16.9, cri_rate: 10.1, cri_dmg: 20.3 },
        { hp: 1742, atk: 113, atk_buf: 17.0, def_buf: 21.2, elem: 68, en_rec: 18.9, cri_rate: 11.3, cri_dmg: 22.7 },
        { hp: 1925, atk: 125, atk_buf: 18.8, def_buf: 23.5, elem: 75, en_rec: 20.9, cri_rate: 12.5, cri_dmg: 25.0 },
        { hp: 2108, atk: 137, atk_buf: 20.6, def_buf: 25.7, elem: 82, en_rec: 22.8, cri_rate: 13.7, cri_dmg: 27.4 },
        { hp: 2291, atk: 149, atk_buf: 22.3, def_buf: 27.9, elem: 89, en_rec: 24.8, cri_rate: 14.9, cri_dmg: 29.8 },
        { hp: 2474, atk: 161, atk_buf: 24.1, def_buf: 30.2, elem: 97, en_rec: 26.8, cri_rate: 16.1, cri_dmg: 32.2 },
        { hp: 2657, atk: 173, atk_buf: 25.9, def_buf: 32.4, elem: 104, en_rec: 28.8, cri_rate: 17.3, cri_dmg: 34.5 },
        { hp: 2839, atk: 185, atk_buf: 27.7, def_buf: 34.6, elem: 111, en_rec: 30.8, cri_rate: 18.5, cri_dmg: 36.9 },
        { hp: 3022, atk: 197, atk_buf: 29.5, def_buf: 36.8, elem: 118, en_rec: 32.8, cri_rate: 19.7, cri_dmg: 39.3 },
        { hp: 3205, atk: 209, atk_buf: 31.3, def_buf: 39.1, elem: 125, en_rec: 34.7, cri_rate: 20.8, cri_dmg: 41.7 },
        { hp: 3388, atk: 221, atk_buf: 33.0, def_buf: 41.3, elem: 132, en_rec: 36.7, cri_rate: 22.0, cri_dmg: 44.1 },
        { hp: 3571, atk: 232, atk_buf: 34.8, def_buf: 43.5, elem: 139, en_rec: 38.7, cri_rate: 23.2, cri_dmg: 46.4 }
    ],
    [
        { hp: 717, atk: 47, atk_buf: 7.0, def_buf: 8.7, elem: 28, en_rec: 7.8, cri_rate: 4.7, cri_dmg: 9.3 },
        { hp: 902, atk: 60, atk_buf: 9.0, def_buf: 11.2, elem: 36, en_rec: 10.0, cri_rate: 5.4, cri_dmg: 11.9 },
        { hp: 1123, atk: 73, atk_buf: 11.0, def_buf: 13.7, elem: 44, en_rec: 12.2, cri_rate: 6.0, cri_dmg: 14.6 },
        { hp: 1326, atk: 86, atk_buf: 12.9, def_buf: 16.2, elem: 52, en_rec: 14.4, cri_rate: 6.7, cri_dmg: 17.2 },
        { hp: 1530, atk: 100, atk_buf: 14.9, def_buf: 18.6, elem: 60, en_rec: 16.6, cri_rate: 7.4, cri_dmg: 19.9 },
        { hp: 1733, atk: 113, atk_buf: 16.9, def_buf: 21.1, elem: 68, en_rec: 18.8, cri_rate: 8.0, cri_dmg: 22.5 },
        { hp: 1936, atk: 126, atk_buf: 18.9, def_buf: 23.6, elem: 76, en_rec: 21.0, cri_rate: 8.7, cri_dmg: 25.5 },
        { hp: 2139, atk: 139, atk_buf: 20.9, def_buf: 26.1, elem: 84, en_rec: 23.3, cri_rate: 9.4, cri_dmg: 27.8 },
        { hp: 2342, atk: 152, atk_buf: 22.8, def_buf: 28.6, elem: 91, en_rec: 25.4, cri_rate: 10.0, cri_dmg: 30.5 },
        { hp: 2545, atk: 166, atk_buf: 24.8, def_buf: 31.0, elem: 99, en_rec: 27.6, cri_rate: 10.7, cri_dmg: 33.1 },
        { hp: 2749, atk: 179, atk_buf: 26.8, def_buf: 33.5, elem: 107, en_rec: 29.8, cri_rate: 11.4, cri_dmg: 35.8 },
        { hp: 2952, atk: 192, atk_buf: 28.8, def_buf: 36.0, elem: 115, en_rec: 32.0, cri_rate: 12.0, cri_dmg: 38.4 },
        { hp: 3155, atk: 205, atk_buf: 30.8, def_buf: 38.5, elem: 123, en_rec: 34.2, cri_rate: 12.7, cri_dmg: 41.1 },
        { hp: 3358, atk: 219, atk_buf: 32.8, def_buf: 40.9, elem: 131, en_rec: 36.4, cri_rate: 13.4, cri_dmg: 43.7 },
        { hp: 3561, atk: 232, atk_buf: 34.7, def_buf: 43.4, elem: 139, en_rec: 38.6, cri_rate: 14.0, cri_dmg: 46.3 },
        { hp: 3764, atk: 245, atk_buf: 36.7, def_buf: 45.9, elem: 147, en_rec: 40.8, cri_rate: 14.7, cri_dmg: 49.0 },
        { hp: 3967, atk: 258, atk_buf: 38.7, def_buf: 48.4, elem: 155, en_rec: 43.0, cri_rate: 15.4, cri_dmg: 51.6 },
        { hp: 4171, atk: 272, atk_buf: 40.7, def_buf: 50.8, elem: 163, en_rec: 45.2, cri_rate: 16.0, cri_dmg: 54.3 },
        { hp: 4374, atk: 285, atk_buf: 42.7, def_buf: 53.3, elem: 171, en_rec: 47.4, cri_rate: 16.7, cri_dmg: 56.9 },
        { hp: 4577, atk: 298, atk_buf: 44.6, def_buf: 55.8, elem: 179, en_rec: 49.6, cri_rate: 17.4, cri_dmg: 59.6 },
        { hp: 4780, atk: 311, atk_buf: 46.6, def_buf: 58.3, elem: 187, en_rec: 51.8, cri_rate: 18.0, cri_dmg: 62.2 }
    ]
];

function getArtifactParam(star, level, bonus) {
    if (star < 3 || 5 < star) {
        return 0;
    }
    if (level < 0 || ARTIFACT_LEVEL[star] < level) {
        return 0;
    }
    let params = ARTIFACT_PARAM[star - 3][level];
    if (bonus in params) {
        return params[bonus];
    }
    switch (bonus) {
        case "hp_buf":
        case "anemo_dmg":
        case "geo_dmg":
        case "elect_dmg":
        case "hydro_dmg":
        case "pyro_dmg":
        case "cryo_dmg":
            return params.atk_buf;

        case "phys_dmg":
            return params.def_buf;
    }
    return 0;
}

const ARTIFACT_SET = {
    other: {
        name: "-",
        set2: null,
        set4: null
    },
    Adventurer: {
        name: "冒険者",
        set2: new Bonus("hp", 1000), // TODO: hp_buf が係るのか検証
        set4: null
    },
    LuckyDog: {
        name: "幸運",
        set2: new Bonus("def", 100),
        set4: null
    },
    // Doctor: { name: "医者" },
    Instructor: {
        name: "教官",
        set2: new Bonus("elem", 80),
        set4: new Bonus("elem", 120, "元素反応後、チーム全員", 8)
    },
    Berserker: {
        name: "狂戦士",
        set2: new Bonus("cri_rate", 12),
        set4: new Bonus("cri_rate", 24, "HP70%以下")
    },
    TheExile: {
        name: "亡命者",
        set2: new Bonus("en_rec", 20),
        set4: null
    },
    Sojourner: {
        name: "旅人の心",
        set2: new Bonus("atk_buf", 18),
        set4: new Bonus("heavy_cri", 30)
    },
    Artist: {
        name: "武人",
        set2: new Bonus(["normal_dmg", "heavy_dmg"], 15),
        set4: new Bonus(["normal_dmg", "heavy_dmg"], 25, "元素スキル発動後", 8)
    },
    Defender: {
        name: "守護の心",
        set2: new Bonus("def_buf", 30),
        set4: null
    },
    // Miracle: { name: "奇跡" },
    BraveHeart: {
        name: "勇士の心",
        set2: new Bonus("atk_buf", 18),
        set4: new Bonus("any_dmg", 30, "HP50%以上の敵")
    },
    Gambler: {
        name: "博徒",
        set2: new Bonus("skill_dmg", 20),
        set4: null
    },
    Scholar: {
        name: "学者",
        set2: new Bonus("en_rec", 20),
        set4: null
    },
    Gladiator: {
        name: "剣闘士のフィナーレ",
        set2: new Bonus("atk_buf", 18),
        set4: new Bonus("normal_dmg", 35, "片手剣、両手剣、長柄武器キャラ")
    },
    // Maiden: { name: "愛される少女" },
    Noblesse: {
        name: "旧貴族のしつけ",
        set2: new Bonus("burst_dmg", 20),
        set4: new Bonus("atk_buf", 20, "元素爆発後、チーム全員", 12)
    },
    Chivalry: {
        name: "血染めの騎士道",
        set2: new Bonus("phys_dmg", 25),
        set4: new Bonus("heavy_dmg", 50, "敵を倒した後", 10)
    },
    Troupe: {
        name: "大地を流浪する楽団",
        set2: new Bonus("elem", 80),
        set4: new Bonus("heavy_dmg", 35, "弓、法器キャラ")
    },
    Venerer: {
        name: "翆緑の影",
        set2: new Bonus("anemo_dmg", 15),
        set4: new Bonus("react_dmg", 60, "拡散反応") // 特殊
    },
    Fury: {
        name: "雷のような怒り",
        set2: new Bonus("elect_dmg", 15),
        set4: new Bonus("react_dmg", 40, "過負荷、感電、超電導反応")
    },
    Thundersoother: {
        name: "雷を鎮める尊者",
        set2: null,
        set4: new Bonus("any_dmg", 35, "雷元素の影響を受けた敵")
    },
    CrimsonWitch: {
        name: "燃え盛る炎の魔女",
        set2: new Bonus("pyro_dmg", 15),
        set4: new Bonus("react_dmg", 25, "過負荷、燃焼反応") // 特殊
    },
    Lavawalker: {
        name: "烈火を渡る尊者",
        set2: null,
        set4: new Bonus("any_dmg", 35, "炎元素の影響を受けた敵")
    },
    Petra: {
        name: "悠久の磐岩",
        set2: new Bonus("geo_dmg", 15),
        set4: new Bonus("elem_dmg", 35, "結晶反応した元素、チーム全員", 10)
    },
    Bolide: {
        name: "逆飛びの流星",
        set2: null,
        set4: new Bonus(["normal_dmg", "heavy_dmg"], 40, "シールド状態")
    },
};

const FLOWER_LIST = {
    other: "その他",
    Adventurer: "冒険者の花",
    LuckyDog: "幸運のクローバー",
    Doctor: "医者のアネモネ",
    Instructor: "教官の花飾り",
    Berserker: "狂戦士の薔薇",
    TheExile: "亡命者の花",
    Sojourner: "故人の心",
    Artist: "武人の赤い花",
    Defender: "守護の花",
    Miracle: "奇跡の花",
    BraveHeart: "勇士の勲章",
    Gambler: "博徒の花飾り",
    Scholar: "学者のしおり",
    Gladiator: "剣闘士の未練",
    Maiden: "彼方にある少女の心",
    Noblesse: "旧貴族の花",
    Chivalry: "血染めの鉄の心",
    Troupe: "楽団の朝の光",
    Venerer: "野花の記憶の草原",
    Fury: "雷鳴の憐み",
    Thundersoother: "雷討ちの心",
    CrimsonWitch: "魔女の炎の花",
    Lavawalker: "火渡りの堅実",
    Petra: "盤石芽生の花",
    Bolide: "夏祭りの花",
};

const FEATHER_LIST = {
    other: "その他",
    Adventurer: "冒険者の羽根",
    LuckyDog: "幸運の鷹の羽根",
    Doctor: "医者の梟の羽根",
    Instructor: "教官の羽飾り",
    Berserker: "狂戦士の羽根",
    TheExile: "亡命者の羽根",
    Sojourner: "帰郷の羽",
    Artist: "武人の羽飾り",
    Defender: "守護の印",
    Miracle: "奇跡の羽根",
    BraveHeart: "勇士の期待",
    Gambler: "博徒の羽飾り",
    Scholar: "学者の羽根ペン",
    Gladiator: "剣闘士の帰着",
    Maiden: "少女の揺らぐ思い",
    Noblesse: "旧貴族の羽根",
    Chivalry: "血染めの黒羽",
    Troupe: "琴師の矢羽",
    Venerer: "狩人の青緑色の矢羽",
    Fury: "雷災の生存者",
    Thundersoother: "雷討ちの羽根",
    CrimsonWitch: "魔女の炎の羽根",
    Lavawalker: "火渡りの解放",
    Petra: "嵯峨連山の翼",
    Bolide: "夏祭りの終わり",
};

const SANDS_LIST = {
    other: "その他",
    Adventurer: "冒険者の懐中時計",
    LuckyDog: "幸運の砂時計",
    Doctor: "医者の懐中時計",
    Instructor: "教官の懐中時計",
    Berserker: "狂戦士の時計",
    TheExile: "亡命者の懐中時計",
    Sojourner: "逐光の石",
    Artist: "武人の水時計",
    Defender: "守護の置き時計",
    Miracle: "奇跡の砂",
    BraveHeart: "勇士の毅然",
    Gambler: "博徒の懐中時計",
    Scholar: "学者の時計",
    Gladiator: "剣闘士の希望",
    Maiden: "少女の短い華年",
    Noblesse: "旧貴族の時計",
    Chivalry: "騎士が血に染めた時",
    Troupe: "フィナーレの時計",
    Venerer: "緑の狩人の決心",
    Fury: "雷霆の時計",
    Thundersoother: "雷討ちの刻",
    CrimsonWitch: "魔女の破滅の時",
    Lavawalker: "火渡りの苦しみ",
    Petra: "星羅圭玉の日時計",
    Bolide: "夏祭りの刻",
};

const GOBLET_LIST = {
    other: "その他",
    Adventurer: "冒険者の金杯",
    LuckyDog: "幸運のコップ",
    Doctor: "医者の薬壺",
    Instructor: "教官のティーカップ",
    Berserker: "狂戦士のコップ",
    TheExile: "亡命者のコップ",
    Sojourner: "異国の杯",
    Artist: "武人の酒器",
    Defender: "守護の瓶",
    Miracle: "奇跡のコップ",
    BraveHeart: "勇士の壮行",
    Gambler: "博徒のツボ",
    Scholar: "学者のコップ",
    Gladiator: "剣闘士の酩酊",
    Maiden: "少女の暫く息抜き",
    Noblesse: "旧貴族の銀瓶",
    Chivalry: "血染めの騎士のコップ",
    Troupe: "吟遊者の水筒",
    Venerer: "緑の狩人の容器",
    Fury: "落雷の前兆",
    Thundersoother: "雷討ちの器",
    CrimsonWitch: "魔女の心の炎",
    Lavawalker: "火渡りの悟り",
    Petra: "危岩盤石の杯",
    Bolide: "夏祭りの水風船",
};

const CIRCLET_LIST = {
    other: "その他",
    Adventurer: "冒険者のバンダナ",
    LuckyDog: "幸運の冠",
    Doctor: "医者の方巾",
    Instructor: "教官の帽子",
    Berserker: "狂戦士の仮面",
    TheExile: "亡命者の冠",
    Sojourner: "別離の冠",
    Artist: "武人のバンダナ",
    Defender: "守護の帯",
    Miracle: "奇跡のピアス",
    BraveHeart: "勇士の冠",
    Gambler: "博徒のピアス",
    Scholar: "学者のレンズ",
    Gladiator: "剣闘士の凱旋",
    Maiden: "少女の儚き顔",
    Noblesse: "旧貴族の仮面",
    Chivalry: "血染めの鉄仮面",
    Troupe: "指揮者のハット",
    Venerer: "緑の狩人の冠",
    Fury: "雷を呼ぶ冠",
    Thundersoother: "雷討ちの冠",
    CrimsonWitch: "焦げた魔女の帽子",
    Lavawalker: "火渡りの知恵",
    Petra: "不動玄石の相",
    Bolide: "夏祭りの仮面",
};

const ARTIFACT_SUB = ["other", "hp", "hp_buf", "atk", "atk_buf", "def", "def_buf", "elem", "en_rec", "cri_rate", "cri_dmg"]
const ARTIFACT_SANDS = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "en_rec"];
const ARTIFACT_GOBLET = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "phys_dmg", "anemo_dmg", "geo_dmg", "elect_dmg", "hydro_dmg", "pyro_dmg", "cryo_dmg"];
const ARTIFACT_CIRCLET = ["other", "hp_buf", "atk_buf", "def_buf", "cri_rate", "cri_dmg"]