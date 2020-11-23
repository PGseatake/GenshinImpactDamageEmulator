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
        this.talent = { combat: 0, skill: 0, burst: 0 };
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

    get level() {
        return parseInt(this.lv.replace("+", ""));
    }

    // https://www.reddit.com/r/Genshin_Impact/comments/j580by/elemental_mastery_damage_increase/
    // get elem_react() {
    //     return this.elem * Math.pow(Math.E, -0.000505 * this.elem);
    // }
    // get elem_ampl() {
    //     // 0.453633528 * EM * EXP(-0.000505 * EM)
    //     return 0.453633528 * this.elem_react;
    // }
    // get elem_trans() {
    //     // 0.189266831 * EM * EXP(-0.000505 * EM)
    //     return 0.189266831 * this.elem_react;
    // }

    get elem_react() {
        return (this.elem * 25) / (9 * (this.elem + 1400)) * 100;
    }

    // 元素反応・増幅（％）
    get elem_ampl() {
        return this.elem_react;
    }

    // 元素反応・転化（％）
    get elem_trans() {
        return 2.4 * this.elem_react;
    }

    // 攻撃力（実数）
    get attack() {
        return this.base_atk + (this.base_atk * this.atk_buf / 100) + this.atk;
    }

    // 防御力（実数）
    get defence() {
        return this.base_def + (this.base_def * this.def_buf / 100) + this.def;
    }

    // ダメージ値（％）
    damage(type) {
        return this[type + "_dmg"];
    }

    // 元素ダメージ値（％）
    elemental(type) {
        let rate = this[type + "_dmg"];
        if (type !== "phys") {
            rate += this.elem_dmg;
        }
        return rate;
    }

    // 会心値（％）
    critical(type = null) {
        let rate = 5 + this.cri_rate; // 基礎5%追加
        if (type === "heavy") {
            rate += this.heavy_cri;
        }
        return { rate: rate, damage: 150 + this.cri_dmg };
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

class Enemy {
    constructor(id) {
        let info = ENEMY_LIST[id];
        this.name = info.name;
        this.level = 0;
        // デバフ（％）
        this.debuff = 0;
        // 耐性（％）
        this.resist_org = info.resist;
        this.resist = {
            pyro: info.resist.pyro,
            hydro: info.resist.hydro,
            elect: info.resist.elect,
            anemo: info.resist.anemo,
            cryo: info.resist.cryo,
            geo: info.resist.geo,
            phys: info.resist.phys,
        };
        // 耐性減衰（％）
        this.reduct = {
            pyro: 0,
            hydro: 0,
            elect: 0,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0,
        };
    }

    // 防御力（小数）
    defence(chara) {
        let charaLevel = chara.level + 100;
        let enemyLevel = this.level + 100;
        let debuffRate = 1.0 - (this.debuff / 100);
        return charaLevel / (debuffRate * enemyLevel + charaLevel);
    }

    // 耐性（小数）
    resistance(elem) {
        let value = this.resist[elem] - this.reduct[elem];
        if (value < 0) {
            // 1 - (RES ÷ 2)
            return (100 - (value / 2)) / 100;
        } else if (75 <= value) {
            // 1 ÷ (4 × RES + 1)
            return 100 / (value * 4 + 100);
        } else {
            // 1 - RES
            return (100 - value) / 100
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
    other: {
        name: "-",
        star: 1,
        element: "",
        weapon: "sword",
        special: "other",
        combat: [],
        skill: [],
        burst: []
    },
    TravelAnemo: {
        name: "旅人(風)",
        star: 5,
        element: "anemo",
        weapon: "sword",
        special: "atk_buf",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 44.5 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 43.4 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 53.0 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 58.3 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 70.8 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 55.9, value2: 72.2 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "初期切裂ダメージ", type: "skill", elem: "anemo", scale: "elem", value: 12.0 },
            { name: "最大切裂ダメージ", type: "skill", elem: "anemo", scale: "elem", value: 16.8 },
            { name: "初期爆風ダメージ", type: "skill", elem: "anemo", scale: "elem", value: 176 },
            { name: "最大爆風ダメージ", type: "skill", elem: "anemo", scale: "elem", value: 192 },
        ],
        burst: [
            { name: "竜巻ダメージ", type: "burst", elem: "anemo", scale: "elem", value: 80.8 },
            { name: "付加元素ダメージ", type: "burst", elem: "addem", scale: "elem", value: 24.8 },
        ]
    },
    TravelGeo: {
        name: "旅人(岩)",
        star: 5,
        element: "geo",
        weapon: "sword",
        special: "atk_buf",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 44.5 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 43.4 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 53.0 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 58.3 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 70.8 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 55.9, value2: 72.2 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "スキルダメージ	", type: "skill", elem: "geo", scale: "elem", value: 248 },
        ],
        burst: [
            { name: "地震波1回のダメージ", type: "burst", elem: "geo", scale: "elem", value: 148 },
        ]
    },
    Amber: {
        name: "アンバー",
        star: 4,
        element: "pyro",
        weapon: "bow",
        special: "atk_buf",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 36.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 36.1 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 46.4 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 47.3 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 59.3 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "pyro", scale: "elem", value: 124 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "爆発ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 123 },
        ],
        burst: [
            { name: "矢の雨1回のダメージ", type: "burst", elem: "pyro", scale: "elem", value: 28.1 },
            { name: "矢の雨の合計ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 505 },
        ]
    },
    Barbara: {
        name: "バーバラ",
        star: 4,
        element: "hydro",
        weapon: "catalyst",
        special: "hp_buf",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 37.8 },
            { name: "2段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 35.5 },
            { name: "3段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 41.0 },
            { name: "4段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 55.2 },
            { name: "重撃ダメージ", type: "heavy", elem: "hydro", scale: "elem", value: 166 },
            { name: "落下期間のダメージ", type: "normal", elem: "hydro", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "hydro", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "hydro", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "水玉ダメージ", type: "skill", elem: "hydro", scale: "elem", value: 58.4 },
        ],
        burst: []
    },
    Beidou: {
        name: "北斗",
        star: 4,
        element: "elect",
        weapon: "claymore",
        special: "elect_dmg",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 71.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 70.9 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 88.3 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 86.5 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 112 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 56.2 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 102 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 74.6 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 149 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 186 },
        ],
        skill: [
            { name: "基礎ダメージ", type: "skill", elem: "elect", scale: "elem", value: 122 },
            { name: "被撃時ダメージ+1", type: "skill", elem: "elect", scale: "elem", value: 282 },
            { name: "被撃時ダメージ+2", type: "skill", elem: "elect", scale: "elem", value: 442 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "elect", scale: "elem", value: 122 },
            { name: "落雷ダメージ", type: "burst", elem: "elect", scale: "elem", value: 96 },
        ],
    },
    Bennett: {
        name: "ベネット",
        star: 4,
        element: "pyro",
        weapon: "sword",
        special: "en_rec",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 44.5 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 42.7 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 54.6 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 59.7 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 71.9 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 55.9, value2: 60.7 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "1回押しダメージ", type: "skill", elem: "pyro", scale: "elem", value: 138 },
            { name: "1段チャージダメージ", type: "skill", elem: "pyro", scale: "elem", value: 84.0, value2: 92.0 },
            { name: "2段チャージダメージ", type: "skill", elem: "pyro", scale: "elem", value: 88.0, value2: 96.0 },
            { name: "爆発ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 132 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "pyro", scale: "elem", value: 233 },
        ],
    },
    Chongyun: {
        name: "重雲",
        star: 4,
        element: "cryo",
        weapon: "claymore",
        special: "atk_buf",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 70.0 },
            { name: "2段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 63.1 },
            { name: "3段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 80.3 },
            { name: "4段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 101 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 56.3 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 102 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 74.6 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 149 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 186 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "cryo", scale: "elem", value: 172 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "cryo", scale: "elem", value: 142 },
        ],
    },
    Diluc: {
        name: "ディルック",
        star: 5,
        element: "pyro",
        weapon: "claymore",
        special: "cri_rate",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 89.7 },
            { name: "2段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 87.6 },
            { name: "3段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 98.8 },
            { name: "4段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 134 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 68.8 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 125 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 89.5 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 179 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 224 },
        ],
        skill: [
            { name: "1段ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 94.4 },
            { name: "2段ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 97.6 },
            { name: "3段ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 129 }
        ],
        burst: [
            { name: "斬撃ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 204 },
            { name: "継続ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 60.0 },
            { name: "爆発ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 204 }
        ],
    },
    Diona: {
        name: "ディオナ",
        star: 4,
        element: "cryo",
        weapon: "bow",
        special: "other",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 36.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 33.5 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 45.6 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 43.0 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 53.8 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "cryo", scale: "elem", value: 124 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "キャッツクローダメージ", type: "skill", elem: "cryo", scale: "elem", value: 41.9 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "cryo", scale: "elem", value: 80 },
            { name: "エリアの継続ダメージ", type: "burst", elem: "cryo", scale: "elem", value: 52.6 },
        ],
    },
    Fischl: {
        name: "フィッシュル",
        star: 4,
        element: "elect",
        weapon: "bow",
        special: "atk_buf",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 44.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 46.8 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 58.1 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 57.7 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 72.1 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "elect", scale: "elem", value: 124 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "オズの攻撃ダメージ", type: "skill", elem: "elect", scale: "elem", value: 88.8 },
            { name: "召喚ダメージ", type: "skill", elem: "elect", scale: "elem", value: 115 },
        ],
        burst: [
            { name: "落雷ダメージ", type: "burst", elem: "elect", scale: "elem", value: 208 }
        ],
    },
    Jean: {
        name: "ジン",
        star: 5,
        element: "anemo",
        weapon: "sword",
        special: "other",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 48.3 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 45.6 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 60.3 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 65.9 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 79.2 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 162 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "anemo", scale: "elem", value: 292 }
        ],
        burst: [
            { name: "爆発ダメージ", type: "burst", elem: "anemo", scale: "elem", value: 425 },
            { name: "エリア出入りダメージ", type: "burst", elem: "anemo", scale: "elem", value: 78.4 },
        ]
    },
    Kaeya: {
        name: "ガイア",
        star: 4,
        element: "cryo",
        weapon: "sword",
        special: "en_rec",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 53.8 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 51.7 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 65.3 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 70.9 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 88.2 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 55.0, value2: 73.1 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "cryo", scale: "elem", value: 191 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "cryo", scale: "elem", value: 77.6 },
        ]
    },
    Keqing: {
        name: "刻晴",
        star: 5,
        element: "elect",
        weapon: "sword",
        special: "cri_dmg",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 41.0 },
            { name: "2段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 41.0 },
            { name: "3段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 54.4 },
            { name: "4段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 31.5, value2: 34.4 },
            { name: "5段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 67.0 },
            { name: "重撃ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 76.8, value2: 86.0 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "雷楔ダメージ", type: "skill", elem: "elect", scale: "elem", value: 50.4 },
            { name: "斬撃ダメージ", type: "skill", elem: "elect", scale: "elem", value: 168 },
            { name: "雷連斬ダメージ", type: "skill", elem: "elect", scale: "elem", value: 84.0, multi: 2 },
        ],
        burst: [
            { name: "スキルダメージ	", type: "burst", elem: "elect", scale: "elem", value: 88.0 },
            { name: "連斬ダメージ", type: "burst", elem: "elect", scale: "elem", value: 24.0, multi: 8 },
            { name: "最後の一撃ダメージ	", type: "burst", elem: "elect", scale: "elem", value: 189 },
        ]
    },
    Klee: {
        name: "クレー",
        star: 5,
        element: "pyro",
        weapon: "catalyst",
        special: "pyro_dmg",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "pyro", scale: "elem", value: 72.2 },
            { name: "2段ダメージ", type: "normal", elem: "pyro", scale: "elem", value: 62.4 },
            { name: "3段ダメージ", type: "normal", elem: "pyro", scale: "elem", value: 89.9 },
            { name: "重撃ダメージ", type: "heavy", elem: "pyro", scale: "elem", value: 157 },
            { name: "落下期間のダメージ", type: "normal", elem: "pyro", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "pyro", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "pyro", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "ボンボン爆弾ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 95.2 },
            { name: "ブービートラップダメージ", type: "skill", elem: "pyro", scale: "elem", value: 32.8 },
        ],
        burst: [
            { name: "ドッカン花火ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 42.6 },
        ],
    },
    Lisa: {
        name: "リサ",
        star: 4,
        element: "elect",
        weapon: "catalyst",
        special: "elem",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "elect", scale: "elem", value: 39.6 },
            { name: "2段ダメージ", type: "normal", elem: "elect", scale: "elem", value: 35.9 },
            { name: "3段ダメージ", type: "normal", elem: "elect", scale: "elem", value: 42.8 },
            { name: "4段ダメージ", type: "normal", elem: "elect", scale: "elem", value: 55.0 },
            { name: "重撃ダメージ", type: "heavy", elem: "elect", scale: "elem", value: 177 },
            { name: "落下期間のダメージ", type: "normal", elem: "elect", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "elect", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "elect", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "1回押しダメージ", type: "skill", elem: "elect", scale: "elem", value: 80.0 },
            { name: "誘雷なしの長押しダメージ", type: "skill", elem: "elect", scale: "elem", value: 320 },
            { name: "誘雷1重の長押しダメージ", type: "skill", elem: "elect", scale: "elem", value: 368 },
            { name: "誘雷2重の長押しダメージ", type: "skill", elem: "elect", scale: "elem", value: 424 },
            { name: "誘雷3重の長押しダメージ", type: "skill", elem: "elect", scale: "elem", value: 487 },
        ],
        burst: [
            { name: "放電ダメージ", type: "burst", elem: "elect", scale: "elem", value: 36.6 }
        ],
    },
    Mona: {
        name: "モナ",
        star: 5,
        element: "hydro",
        weapon: "catalyst",
        special: "en_rec",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 37.6 },
            { name: "2段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 36.0 },
            { name: "3段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 44.8 },
            { name: "4段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 56.2 },
            { name: "重撃ダメージ", type: "heavy", elem: "hydro", scale: "elem", value: 150 },
            { name: "落下期間のダメージ", type: "normal", elem: "hydro", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "hydro", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "hydro", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "継続ダメージ", type: "skill", elem: "hydro", scale: "elem", value: 32.0 },
            { name: "爆裂ダメージ", type: "skill", elem: "hydro", scale: "elem", value: 133 },
        ],
        burst: [
            { name: "泡影破裂ダメージ", type: "burst", elem: "hydro", scale: "elem", value: 442 },
        ]
    },
    Ningguang: {
        name: "凝光",
        star: 4,
        element: "geo",
        weapon: "catalyst",
        special: "geo_dmg",
        combat: [
            { name: "通常攻撃ダメージ", type: "normal", elem: "geo", scale: "elem", value: 28.0 },
            { name: "重激ダメージ", type: "heavy", elem: "geo", scale: "elem", value: 174 },
            { name: "星璇ダメージ", type: "normal", elem: "geo", scale: "elem", value: 49.6 },
            { name: "落下期間のダメージ", type: "normal", elem: "geo", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "geo", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "geo", scale: "phys", value: 142 }
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "geo", scale: "elem", value: 230 },
        ],
        burst: [
            { name: "宝石ダメージ", type: "burst", elem: "geo", scale: "elem", value: 87.0 },
        ],
    },
    Noelle: {
        name: "ノエル",
        star: 4,
        element: "geo",
        weapon: "claymore",
        special: "def_buf",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 79.1 },
            { name: "2段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 73.4 },
            { name: "3段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 86.3 },
            { name: "4段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 113 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 50.7 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 90.5 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 74.6 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 149 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 186 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "geo", scale: "elem", value: 120, base: "def" },
        ],
        burst: [
            { name: "爆発ダメージ", type: "burst", elem: "geo", scale: "elem", value: 67.2 },
            { name: "スキルダメージ", type: "burst", elem: "geo", scale: "elem", value: 92.8 },
        ],
    },
    Qiqi: {
        name: "七七",
        star: 5,
        element: "cryo",
        weapon: "sword",
        special: "other",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 37.8 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 38.9 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 24.2, value2: 24.2 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 24.7, value2: 24.7 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.0 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 64.3, value2: 64.3 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "cryo", scale: "elem", value: 96.0 },
            { name: "寒病獄卒ダメージ", type: "skill", elem: "cryo", scale: "elem", value: 36.0 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "cryo", scale: "elem", value: 285 },

        ]
    },
    Razor: {
        name: "レザー",
        star: 4,
        element: "elect",
        weapon: "claymore",
        special: "phys_dmg",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 95.9 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 82.6 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 103 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 136 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 62.5 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 113 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 82.0 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 164 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 205 },
        ],
        skill: [
            { name: "1回押しスキルダメージ", type: "skill", elem: "elect", scale: "elem", value: 199 },
            { name: "長押しスキルダメージ", type: "skill", elem: "elect", scale: "elem", value: 295 },
        ],
        burst: [
            { name: "爆発ダメージ", type: "burst", elem: "elect", scale: "elem", value: 160 },
        ],
    },
    Sucrose: {
        name: "スクロース",
        star: 4,
        element: "anemo",
        weapon: "catalyst",
        special: "anemo_dmg",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "anemo", scale: "elem", value: 33.5 },
            { name: "2段ダメージ", type: "normal", elem: "anemo", scale: "elem", value: 30.6 },
            { name: "3段ダメージ", type: "normal", elem: "anemo", scale: "elem", value: 38.4 },
            { name: "4段ダメージ", type: "normal", elem: "anemo", scale: "elem", value: 47.9 },
            { name: "重撃ダメージ", type: "heavy", elem: "anemo", scale: "elem", value: 120 },
            { name: "落下期間のダメージ", type: "normal", elem: "anemo", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "anemo", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "anemo", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "anemo", scale: "elem", value: 211 },
        ],
        burst: [
            { name: "継続ダメージ", type: "burst", elem: "anemo", scale: "elem", value: 148 },
            { name: "付加元素ダメージ", type: "burst", elem: "addem", scale: "elem", value: 44 },
        ],
    },
    Tartaglia: {
        name: "タルタリヤ",
        star: 5,
        element: "hydro",
        weapon: "bow",
        special: "hydro_dmg",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 41.3 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 46.3 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 55.4 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 57.0 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 60.9 },
            { name: "6段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 72.8 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "hydro", scale: "elem", value: 124 },
            { name: "断流・閃 ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 12.4, multi: 3 },
            { name: "断流・破 ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 62.0 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "状態切替時に与えるダメージ", type: "skill", elem: "hydro", scale: "elem", value: 72.0 },
            { name: "1段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 38.9 },
            { name: "2段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 41.6 },
            { name: "3段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 56.3 },
            { name: "4段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 59.9 },
            { name: "5段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 55.3 },
            { name: "6段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 35.4, value2: 37.7 },
            { name: "重撃ダメージ", type: "heavy", elem: "hydro", scale: "elem", value: 60.2, value2: 72.0 },
            { name: "断流・斬 ダメージ", type: "skill", elem: "hydro", scale: "elem", value: 60.0 },
        ],
        burst: [
            { name: "スキルダメージ・近接", type: "burst", elem: "hydro", scale: "elem", value: 464 },
            { name: "スキルダメージ・遠隔", type: "burst", elem: "hydro", scale: "elem", value: 378 },
            { name: "断流・爆 ダメージ", type: "burst", elem: "hydro", scale: "elem", value: 120 },
        ]
    },
    Venti: {
        name: "ウェンティ",
        star: 5,
        element: "anemo",
        weapon: "bow",
        special: "en_rec",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 20.4, value2: 20.4 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 44.4 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 52.4 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 26.1, value2: 26.1 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 50.7 },
            { name: "6段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 71.0 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "anemo", scale: "elem", value: 124 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "1回押しダメージ", type: "skill", elem: "anemo", scale: "elem", value: 276 },
            { name: "長押しダメージ", type: "skill", elem: "anemo", scale: "elem", value: 380 },
        ],
        burst: [
            { name: "継続ダメージ", type: "burst", elem: "anemo", scale: "elem", value: 37.6 },
            { name: "付加元素ダメージ", type: "burst", elem: "addem", scale: "elem", value: 18.8 },
        ]
    },
    Xiangling: {
        name: "香菱",
        star: 4,
        element: "pyro",
        weapon: "polearm",
        special: "elem",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 42.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 42.1 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 26.1, value2: 26.1 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 14.1, multi: 4 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 71.0 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 122 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "噴火ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 111 },
        ],
        burst: [
            { name: "振り回しによる1段ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 72.0 },
            { name: "振り回しによる2段ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 88.0 },
            { name: "振り回しによる3段ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 110 },
            { name: "旋火輪ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 112 },
        ]
    },
    // Xiao: { name: "魈", star: 5, element: "anemo", weapon: "polearm", special: "other", },
    Xingqiu: {
        name: "行秋",
        star: 4,
        element: "hydro",
        weapon: "sword",
        special: "atk_buf",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 46.6 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 47.6 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 28.6, value2: 28.6 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.0 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 35.9 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 47.3, value2: 56.2 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "スキルダメージ	", type: "skill", elem: "hydro", scale: "elem", value: 168, value2: 191 },
        ],
        burst: [
            { name: "剣雨のダメージ", type: "burst", elem: "hydro", scale: "elem", value: 54.3 },
        ]
    },
    // Xinyan: { name: "辛炎", star: 4, element: "pyro", weapon: "claymore", special: "other", },
    // Zhongli: { name: "鍾離", star: 5, element: "geo", weapon: "polearm", special: "other", },
};

const DAMAGE_SCALE = {
    phys: [100.0, 108.1, 115.9, 128.2, 136.0, 144.9, 158.3, 170.6, 183.7, 197.3, ],
    elem: [100.0, 107.5, 115.0, 125.0, 132.5, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, ]
};

class Attribute {
    constructor(info, level) {
        let scale = DAMAGE_SCALE[info.scale];
        let index = (num => {
            if (0 < num) {
                if (scale.length <= num) {
                    return scale.length - 1;
                }
                return num;
            }
            return 0;
        })(level - 1);
        this.name = info.name;
        this.type = info.type;
        this.elem = info.elem;
        if (this.elem === "addem") {
            this.elem = "anemo"; // TODO: とりあえず風属性にしておく
        }
        this.value = [info.value * scale[index] / 100];
        if ("value2" in info) {
            this.value.push(info.value2 * scale[index] / 100);
        }
        this.multi = null;
        if ("multi" in info) {
            this.multi = info.multi;
        }
    }

    toString(func) {
        let str = this.value.map(func).join("+");
        if (!!this.multi) {
            return `${str}x${this.multi}`;
        }
        return str;
    }
};

// https://bbs.mihoyo.com/ys/article/2160993
const ENEMY_LIST = {
    SlimePyro: {
        name: "スライム・炎",
        resist: {
            pyro: Infinity,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SlimeHydro: {
        name: "スライム・水",
        resist: {
            pyro: 10,
            hydro: Infinity,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SlimeElect: {
        name: "スライム・雷",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: Infinity,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SlimeAnemo: {
        name: "スライム・風",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: Infinity,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SlimeCryo: {
        name: "スライム・氷",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: Infinity,
            geo: 10,
            phys: 10
        }
    },
    SlimeGeo: {
        name: "スライム・岩",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: Infinity,
            phys: 10
        }
    },
    SlimeDendro: {
        name: "スライム・草",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    Hilichurl: {
        name: "ヒルチャール",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    Mitachurl: {
        name: "ヒルチャール暴徒",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 30
        }
    },
    SamachurlHydro: {
        name: "ヒルチャールシャーマン・水",
        resist: {
            pyro: 10,
            hydro: 50,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SamachurlGeo: {
        name: "ヒルチャールシャーマン・岩",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 10
        }
    },
    SamachurlAnemo: {
        name: "ヒルチャールシャーマン・風",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 50,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SamachurlDendro: {
        name: "ヒルチャールシャーマン・草",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    Lawachurl: {
        name: "ヒルチャール・岩兜の王",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 70,
            phys: 50
        },
    },
    RuinGuard: {
        name: "遺跡守衛",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 70
        },
    },
    RuinHunter: {
        name: "遺跡狩人",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 70
        },
    },
    WhopperflowerPyro: {
        name: "トリックフラワー・炎",
        resist: {
            pyro: 75,
            hydro: 35,
            elect: 35,
            anemo: 35,
            cryo: 35,
            geo: 35,
            phys: 35
        },
    },
    WhopperflowerPyroDown: {
        name: "トリックフラワー・炎（めまい）",
        resist: {
            pyro: 50,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    WhopperflowerCryo: {
        name: "トリックフラワー・氷",
        resist: {
            pyro: 35,
            hydro: 35,
            elect: 35,
            anemo: 35,
            cryo: 75,
            geo: 35,
            phys: 35
        },
    },
    WhopperflowerCryoDown: {
        name: "トリックフラワー・氷（めまい）",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 50,
            geo: 10,
            phys: 10
        },
    },
    FatuiSkirmisher: {
        name: "ファデュイ先遣隊",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20
        },
    },
    FatuiSkirmisherShieled: {
        name: "ファデュイ先遣隊（シールド）",
        resist: {
            pyro: 110,
            hydro: 110,
            elect: 110,
            anemo: 110,
            cryo: 110,
            geo: 110,
            phys: 80
        },
    },
    FatuiPyroAgent: {
        name: "ファデュイ・デットエージェント・炎",
        resist: {
            pyro: 50,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20
        },
    },
    FatuiElectroCicinMage: {
        name: "ファデュイ・雷蛍術師",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 50,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20
        },
    },
    TreasureHoarder: {
        name: "盗賊団",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20
        },
    },
    GeovishapHatchling: {
        name: "ベビーヴィシャップ・岩",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30
        },
    },
    AbyssMage: {
        name: "アビスの魔術師",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    // EyeoftheStorm: {},
    ElectroHypostasis: {
        name: "無相の雷",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: Infinity,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    AnemoHypostasis: {
        name: "無相の風",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: Infinity,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    GeoHypostasis: {
        name: "無相の岩",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: Infinity,
            phys: 10
        },
    },
    Oceanid: {
        name: "純水精霊",
        resist: {
            pyro: 10,
            hydro: Infinity,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    CryoRegisvine: {
        name: "急凍樹",
        resist: {
            pyro: 110,
            hydro: 110,
            elect: 110,
            anemo: 110,
            cryo: 170,
            geo: 110,
            phys: 130
        },
    },
    CryoRegisvineDown: {
        name: "急凍樹（ダウン）",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 70,
            geo: 10,
            phys: 30
        },
    },
    PyroRegisvine: {
        name: "爆炎樹",
        resist: {
            pyro: 170,
            hydro: 110,
            elect: 110,
            anemo: 110,
            cryo: 110,
            geo: 110,
            phys: 130
        },
    },
    PyroRegisvineDown: {
        name: "爆炎樹（ダウン）",
        resist: {
            pyro: 70,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 30
        },
    },
    Dvalin: {
        name: "トワリン",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    Andrius: {
        name: "北風の狼",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: Infinity,
            cryo: Infinity,
            geo: 10,
            phys: 10
        },
    },
    TartagliaP1: {
        name: "タルタリヤ・第1段階",
        resist: {
            pyro: 0,
            hydro: 50,
            elect: 0,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0
        },
    },
    TartagliaP1Weak: {
        name: "タルタリヤ・第1段階（ダウン）",
        resist: {
            pyro: -30,
            hydro: 20,
            elect: -30,
            anemo: -30,
            cryo: -30,
            geo: -30,
            phys: -30
        },
    },
    TartagliaP2: {
        name: "タルタリヤ・第2段階",
        resist: {
            pyro: 0,
            hydro: 0,
            elect: 50,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0
        },
    },
    TartagliaP2Weak: {
        name: "タルタリヤ・第2段階（ダウン）",
        resist: {
            pyro: -50,
            hydro: -50,
            elect: 0,
            anemo: -50,
            cryo: -50,
            geo: -50,
            phys: -50
        },
    },
    TartagliaP3: {
        name: "タルタリヤ・第3段階",
        resist: {
            pyro: 70,
            hydro: 0,
            elect: 70,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0
        },
    },
};

const ARTIFACT_STAR_MAX = 5;
const ARTIFACT_LEVEL = [0, 0, 0, 12, 16, 20];

const ARTIFACT_PARAM = [
    // ☆☆☆
    {
        hp: { intercept: 430, slope: 121.8846154 }, // HP
        atk: { intercept: 28, slope: 7.89010989 }, // 攻撃力
        atk_buf: { intercept: 5.2, slope: 1.488461538 }, // HP(%),攻撃力(%),元素ダメージ
        def_buf: { intercept: 6.6, slope: 1.854945055 }, // 防御力(%),物理ダメージ
        elem: { intercept: 21, slope: 5.917582418 }, // 元素熟知
        en_rec: { intercept: 5.8, slope: 1.65 }, // 元素チャージ効率
        cri_rate: { intercept: 3.5, slope: 0.989010989 }, // 会心率
        cri_dmg: { intercept: 7.0, slope: 1.980769231 }, // 会心ダメージ
    },
    // ☆☆☆☆
    {
        hp: { intercept: 645, slope: 182.8529412 },
        atk: { intercept: 42, slope: 11.8995098 },
        atk_buf: { intercept: 6.3, slope: 1.782352941 },
        def_buf: { intercept: 7.9, slope: 2.22745098 },
        elem: { intercept: 25, slope: 7.137254902 },
        en_rec: { intercept: 7.0, slope: 1.980882353 },
        cri_rate: { intercept: 4.2, slope: 1.1875 },
        cri_dmg: { intercept: 8.4, slope: 2.377696078 },
    },
    // ☆☆☆☆☆
    {
        hp: { intercept: 717, slope: 203.1597403 },
        atk: { intercept: 47, slope: 13.22597403 },
        atk_buf: { intercept: 7, slope: 1.980909091 },
        def_buf: { intercept: 8.7, slope: 2.477402597 },
        elem: { intercept: 28, slope: 7.932467532 },
        en_rec: { intercept: 7.8, slope: 2.2 },
        cri_rate: { intercept: 4.7, slope: 1.330779221 },
        cri_dmg: { intercept: 9.3, slope: 2.644805195 },
    }
];

function getArtifactParam(star, level, bonus) {
    // ☆を正規化
    if (star < 3 || 5 < star) {
        return 0;
    }
    // levelを正規化
    if (level < 0 || ARTIFACT_LEVEL[star] < level) {
        return 0;
    }
    let linefn = null;
    // 一次関数取得
    let param = ARTIFACT_PARAM[star - 3];
    if (bonus in param) {
        linefn = param[bonus];
    } else {
        switch (bonus) {
            case "hp_buf":
            case "anemo_dmg":
            case "geo_dmg":
            case "elect_dmg":
            case "hydro_dmg":
            case "pyro_dmg":
            case "cryo_dmg":
                linefn = param.atk_buf;
                break;

            case "phys_dmg":
                linefn = param.def_buf;
                break;
        }
    }
    if (!!linefn) {
        return linefn.intercept + level * linefn.slope;
    }
    return 0;
};

const ARTIFACT_SUB = ["other", "hp", "hp_buf", "atk", "atk_buf", "def", "def_buf", "elem", "en_rec", "cri_rate", "cri_dmg"];
const ARTIFACT_SANDS = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "en_rec"];
const ARTIFACT_GOBLET = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "phys_dmg", "anemo_dmg", "geo_dmg", "elect_dmg", "hydro_dmg", "pyro_dmg", "cryo_dmg"];
const ARTIFACT_CIRCLET = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "cri_rate", "cri_dmg"];

const WEAPON_RANK_MAX = 5;