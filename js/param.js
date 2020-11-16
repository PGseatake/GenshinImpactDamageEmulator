// TODO: 多言語対応
const PARAM_LIST = {
    other: {
        table: null,
        select: "その他",
        detail: null,
        postfix: "",
    },
    hp: {
        table: "上限HP",
        select: "HP",
        detail: "HP",
        postfix: "",
    },
    hp_buf: {
        table: null,
        select: "HP(%)",
        detail: "HP",
        postfix: "%",
    },
    atk: {
        table: "攻撃力",
        select: "攻撃力",
        detail: "攻撃力",
        postfix: "",
    },
    atk_buf: {
        table: null,
        select: "攻撃力(%)",
        detail: "攻撃力",
        postfix: "%",
    },
    atk_base: {
        table: null,
        select: null,
        detail: "基礎攻撃力",
        postfix: "%",
    },
    def: {
        table: "防御力",
        select: "防御力",
        detail: "防御力",
        postfix: "",
    },
    def_buf: {
        table: null,
        select: "防御力(%)",
        detail: "防御力",
        postfix: "%",
    },
    elem: {
        table: "元素熟知",
        select: "元素熟知",
        detail: "元素熟知",
        postfix: "",
    },
    en_rec: {
        table: "元素ﾁｬｰｼﾞ効率",
        select: "元素ﾁｬｰｼﾞ率",
        detail: "元素チャージ効率",
        postfix: "%",
    },
    cri_rate: {
        table: "会心率",
        select: "会心率",
        detail: "会心率",
        postfix: "%",
    },
    cri_dmg: {
        table: "会心ダメージ",
        select: "会心ダメ",
        detail: "会心ダメージ",
        postfix: "%",
    },
    any_dmg: {
        table: "与ダメージ",
        select: null,
        detail: "ダメージ",
        postfix: "%",
    },
    elem_dmg: {
        table: null,
        select: null,
        detail: "元素ダメージ",
        postfix: "%",
    },
    pyro_dmg: {
        table: "炎元素バフ",
        select: "炎元素バフ",
        detail: "炎元素ダメージバフ",
        postfix: "%",
    },
    hydro_dmg: {
        table: "水元素バフ",
        select: "水元素バフ",
        detail: "水元素ダメージバフ",
        postfix: "%",
    },
    elect_dmg: {
        table: "雷元素バフ",
        select: "雷元素バフ",
        detail: "雷元素ダメージバフ",
        postfix: "%",
    },
    anemo_dmg: {
        table: "風元素バフ",
        select: "風元素バフ",
        detail: "風元素ダメージバフ",
        postfix: "%",
    },
    cryo_dmg: {
        table: "氷元素バフ",
        select: "氷元素バフ",
        detail: "氷元素ダメージバフ",
        postfix: "%",
    },
    geo_dmg: {
        table: "岩元素バフ",
        select: "岩元素バフ",
        detail: "岩元素ダメージバフ",
        postfix: "%",
    },
    phys_dmg: {
        table: "物理バフ",
        select: "物理バフ",
        detail: "物理ダメージバフ",
        postfix: "%",
    },
    normal_dmg: {
        table: "通常攻撃ダメ",
        select: null,
        detail: "通常攻撃ダメージ",
        postfix: "%",
    },
    heavy_dmg: {
        table: "重撃ダメ",
        select: null,
        detail: "重撃ダメージ",
        postfix: "%",
    },
    heavy_cri: {
        table: "重撃会心率",
        select: null,
        detail: "重撃会心率",
        postfix: "%",
    },
    skill_dmg: {
        table: "元素スキルダメ",
        select: null,
        detail: "元素スキルダメージ",
        postfix: "%",
    },
    burst_dmg: {
        table: "元素爆発ダメ",
        select: null,
        detail: "元素爆発ダメージ",
        postfix: "%",
    },
    // burning_dmg: {
    //     table: "燃焼ダメ",
    //     select: null,
    //     detail: "燃焼ダメージ",
    // postfix: "%",
    // },
    vaporize_dmg: {
        table: "蒸発ダメ",
        select: null,
        detail: "蒸発ダメージ",
        postfix: "%",
    },
    melt_dmg: {
        table: "融解ダメ",
        select: null,
        detail: "融解ダメージ",
        postfix: "%",
    },
    swirl_dmg: {
        table: "拡散ダメ",
        select: null,
        detail: "拡散ダメージ",
        postfix: "%",
    },
    echarge_dmg: {
        table: "感電ダメ",
        select: null,
        detail: "感電ダメージ",
        postfix: "%",
    },
    shutter_dmg: {
        table: "氷砕きダメ",
        select: null,
        detail: "氷砕きダメージ",
        postfix: "%",
    },
    conduct_dmg: {
        table: "超電導きダメ",
        select: null,
        detail: "超電導ダメージ",
        postfix: "%",
    },
    ovreload_dmg: {
        table: "過負荷ダメ",
        select: null,
        detail: "過負荷ダメージ",
        postfix: "%",
    },
};

class Bonus {
    constructor(items, value, limit = null, times = 0, stack = 0, target = "self") {
        this.items = items;
        this.value = value;
        this.limit = limit;
        this.times = times;
        this.stack = stack;
        this.target = target;
    }

    detail(chara) {
        return new BonusDetail(chara, this.items, this.value, this.limit, this.times, this.stack);
    }

    detailRank(chara, rank) {
        return new BonusDetail(chara, this.items, this.value[rank], this.limit, this.times, this.stack);
    }
};

class BonusDetail {
    constructor(source, items, value, limit, times, stack) {
        this.id = null;
        this.source = source;
        if (Array.isArray(items)) {
            this.items = items;
        } else {
            this.items = [items];
        }
        this.value = value;
        this.limit = limit;
        this.times = times;
        this.stack = stack;
        this.apply = false;
    }

    toString() {
        let str = PARAM_LIST[this.items[0]].detail;
        if (1 < this.items.length) {
            for (let i = 1, len = this.items.length; i < len; ++i) {
                str += "・" + PARAM_LIST[this.items[i]].detail;
            }
        }

        str += `+${this.value}${PARAM_LIST[this.items[0]].postfix}`;

        if (!!this.limit) {
            str = `${this.limit}に${str}`;
        }
        if (0 < this.times) {
            str = `${str}、継続時間${this.times}秒`;
        }
        if (0 < this.stack) {
            str = `${str}、最大${this.stack}重`
        }

        return `[${this.source}] ${str}`;
    }
};

class Status {
    constructor(id) {
        this.id = id;
        this.chara = null;
        this.grade = 0;
        this.lv = "0";
        this.bonus = [];
        this.talent = [0, 0, 0];
        this.base_hp = 0;
        this.hp = 0;
        this.hp_buf = 0.0;
        this.base_atk = 0;
        this.atk_rate = 0.0;
        this.atk = 0;
        this.atk_buf = 0.0;
        this.base_def = 0;
        this.def = 0;
        this.def_buf = 0.0;
        this.elem = 0;
        this.en_rec = 0.0;
        this.cri_rate = 0.0;
        this.cri_dmg = 0.0;
        this.any_dmg = 0.0;
        this.elem_dmg = 0.0;
        this.pyro_dmg = 0.0;
        this.hydro_dmg = 0.0;
        this.elect_dmg = 0.0;
        this.anemo_dmg = 0.0;
        this.cryo_dmg = 0.0;
        this.geo_dmg = 0.0;
        this.phys_dmg = 0.0;
        this.normal_dmg = 0.0;
        this.heavy_dmg = 0.0;
        this.heavy_cri = 0.0;
        this.skill_dmg = 0.0;
        this.burst_dmg = 0.0;
        this.melt_dmg = 0.0;
        this.swirl_dmg = 0.0;
        this.echarge_dmg = 0.0;
        this.shutter_dmg = 0.0;
        this.conduct_dmg = 0.0;
        this.vaporize_dmg = 0.0;
        this.ovreload_dmg = 0.0;
    }

    // https://www.reddit.com/r/Genshin_Impact/comments/j580by/elemental_mastery_damage_increase/
    get elem_react() {
        return this.elem * Math.pow(Math.E, -0.000505 * this.elem);
    }

    // 元素反応・増幅
    get elem_ampl() {
        // 0.453633528 * EM * EXP(-0.000505 * EM)
        return 0.453633528 * this.elem_react;
    }

    // 元素反応・転化
    get elem_trans() {
        // 0.189266831 * EM * EXP(-0.000505 * EM)
        return 0.189266831 * this.elem_react;
    }

    append(bonus) {
        bonus.id = this.id;
        this.bonus.push(bonus);
        if (!bonus.limit) {
            for (let i = 0, len = bonus.items.length; i < len; ++i) {
                this[bonus.items[i]] += bonus.value;
            }
            bonus.apply = true;
        }
    }
};

// const TEAM_BONUS = {
//     pyro: new Bonus("atk_buf", 25),
//     cryo: new Bonus("cri_rate", 15, "氷元素付着または凍結状態の敵"),
//     geo: new Bonus("any_dmg", 15, "シールドが存在する時")
// };

const ASCENSION_LV_STEP = [20, 40, 50, 60, 70, 80];
const ASCENSION_LV_MAX = 90;
const TALENT_LV_MAX = 15;

// TODO: 多言語対応
const CHARACTER = {
    other: { name: "-", star: 1, element: "", weapon: "sword", special: "other" },
    TravelAnemo: { name: "旅人(風)", star: 5, element: "anemo", weapon: "sword", special: "atk_buf" },
    TravelGeo: { name: "旅人(岩)", star: 5, element: "geo", weapon: "sword", special: "atk_buf" },
    Amber: { name: "アンバー", star: 4, element: "pyro", weapon: "bow", special: "atk_buf" },
    Barbara: { name: "バーバラ", star: 4, element: "hydro", weapon: "catalyst", special: "hp_buf" },
    Beidou: { name: "北斗", star: 4, element: "elect", weapon: "claymore", special: "elect_dmg" },
    Bennett: { name: "ベネット", star: 4, element: "pyro", weapon: "sword", special: "en_rec" },
    Chongyun: { name: "重雲", star: 4, element: "cryo", weapon: "claymore", special: "atk_buf" },
    Diluc: { name: "ディルック", star: 5, element: "pyro", weapon: "claymore", special: "cri_rate" },
    Diona: { name: "ディオナ", star: 4, element: "cryo", weapon: "bow", special: "other" },
    Fischl: { name: "フィッシュル", star: 4, element: "electo", weapon: "bow", special: "atk_buf" },
    Jean: { name: "ジン", star: 5, element: "anemo", weapon: "sword", special: "other" },
    Kaeya: { name: "ガイア", star: 4, element: "cryo", weapon: "sword", special: "en_rec" },
    Keqing: { name: "刻晴", star: 5, element: "elect", weapon: "sword", special: "cri_dmg" },
    Klee: { name: "クレー", star: 5, element: "pyro", weapon: "sword", special: "pyro_dmg" },
    Lisa: { name: "リサ", star: 4, element: "elect", weapon: "catalyst", special: "elem" },
    Mona: { name: "モナ", star: 5, element: "hydro", weapon: "catalyst", special: "en_rec" },
    Ningguang: { name: "凝光", star: 4, element: "geo", weapon: "catalyst", special: "geo_dmg" },
    Noelle: { name: "ノエル", star: 4, element: "geo", weapon: "claymore", special: "def_buf" },
    Qiqi: { name: "七七", star: 5, element: "cryo", weapon: "sword", special: "other" },
    Razor: { name: "レザー", star: 4, element: "elect", weapon: "claymore", special: "phys_dmg" },
    Sucrose: { name: "スクロース", star: 4, element: "anemo", weapon: "catalyst", special: "anemo_dmg" },
    Tartaglia: { name: "タルタリヤ", star: 5, element: "hydro", weapon: "bow", special: "other" },
    Venti: { name: "ウェンティ", star: 5, element: "anemo", weapon: "bow", special: "en_rec" },
    Xiangling: { name: "香菱", star: 4, element: "pyro", weapon: "polearm", special: "elem" },
    Xiao: { name: "魈", star: 5, element: "anemo", weapon: "polearm", special: "other" },
    Xingqiu: { name: "行秋", star: 4, element: "hydro", weapon: "sword", special: "atk_buf" },
    Xinyan: { name: "辛炎", star: 4, element: "pyro", weapon: "claymore", special: "other" },
    Zhongli: { name: "鍾離", star: 5, element: "geo", weapon: "polearm", special: "other" },
};

const ARTIFACT_STAR_MAX = 5;
const ARTIFACT_LEVEL = [0, 0, 0, 12, 16, 20];

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
};

const ARTIFACT_SUB = ["other", "hp", "hp_buf", "atk", "atk_buf", "def", "def_buf", "elem", "en_rec", "cri_rate", "cri_dmg"];
const ARTIFACT_SANDS = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "en_rec"];
const ARTIFACT_GOBLET = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "phys_dmg", "anemo_dmg", "geo_dmg", "elect_dmg", "hydro_dmg", "pyro_dmg", "cryo_dmg"];
const ARTIFACT_CIRCLET = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "cri_rate", "cri_dmg"];

const WEAPON_RANK_MAX = 5;