"use strict"

// TODO: 多言語対応
const LABEL_TEXT = {
    invalid: "無効",
    weapon: "武器",
    artifact: "聖遺物",
    combat: "通常攻撃・重撃",
    skill: "元素スキル",
    burst: "元素爆発",
    atk: "攻撃力",
    def: "防御力",
    rank: "錬成",
};

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

// TODO: 多言語対応
const TEAM_BONUS = {
    pyro: { items: "atk_buf", value: 25 },
    cryo: { items: "cri_rate", value: 15, limit: "氷元素付着または凍結状態の敵" },
    geo: { items: "any_dmg", value: 15, limit: "シールドが存在する時" }
};

// ステータスボーナス
class Bonus {
    constructor(items, value, others, source) {
        this.id = null;
        this.apply = false;
        this.items = Array.isArray(items) ? items : [items];
        this.value = value;
        this.limit = ("limit" in others) ? others.limit : null;
        this.times = ("times" in others) ? others.times : 0;
        this.stack = ("stack" in others) ? others.stack : 0;
        this.source = source;
    }

    // TODO:多言語対応
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

// キャラステータス
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

    // ボーナス追加
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

// 敵ステータス
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
    defence(level) {
        let charaLevel = level + 100;
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

const DAMAGE_SCALE = {
    phys: [100.0, 108.1, 115.9, 128.2, 136.0, 144.9, 158.3, 170.6, 183.7, 197.3, ],
    elem: [100.0, 107.5, 115.0, 125.0, 132.5, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, ]
};

// 天賦の各種倍率
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

const ASCENSION_LV_STEP = [20, 40, 50, 60, 70, 80];
const ASCENSION_LV_MAX = 90;
const TALENT_LV_MAX = 15;

const ARTIFACT_STAR_MAX = 5;
const ARTIFACT_LEVEL = [0, 0, 0, 12, 16, 20];

const ARTIFACT_PARAM = [
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
];

function getArtifactParam(star, level, bonus) {
    // ☆を正規化
    if (star < 3 || 5 < star) {
        return null;
    }
    // levelを正規化
    if (level < 0 || ARTIFACT_LEVEL[star] < level) {
        return null;
    }

    let param = ARTIFACT_PARAM[star - 3];
    if (bonus in param) {
        return param[bonus];
    }

    switch (bonus) {
        case "elem":
            return param.def;

        case "hp_buf":
        case "anemo_dmg":
        case "geo_dmg":
        case "elect_dmg":
        case "hydro_dmg":
        case "pyro_dmg":
        case "cryo_dmg":
            return param.atk_buf;

        case "phys_dmg":
            return param.def_buf;
    }
    return null;
}

const ARTIFACT_SUB = ["other", "hp", "hp_buf", "atk", "atk_buf", "def", "def_buf", "elem", "en_rec", "cri_rate", "cri_dmg"];
const ARTIFACT_SANDS = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "en_rec"];
const ARTIFACT_GOBLET = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "phys_dmg", "anemo_dmg", "geo_dmg", "elect_dmg", "hydro_dmg", "pyro_dmg", "cryo_dmg"];
const ARTIFACT_CIRCLET = ["other", "hp_buf", "atk_buf", "def_buf", "elem", "cri_rate", "cri_dmg"];

const WEAPON_RANK_MAX = 5;