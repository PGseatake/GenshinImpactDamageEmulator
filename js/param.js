const ELEMENT = {
    none: "",
    anemo: "風",
    geo: "岩",
    electro: "雷",
    dendro: "草",
    hydro: "水",
    pyro: "火",
    cryo: "氷"
};

const CHARA_LV_STEP = [20, 40, 50, 60, 70, 80];
const TALENT_LV_MAX = 15;
const WEAPON_RANK_MAX = 5;
const ARTIFACT_STAR_MAX = 5;

const BONUS_UNIT = {
    none: { name: "なし", unit: "n" },
    other: { name: "その他", unit: "n" },
    hp: { name: "HP", unit: "i" },
    hp_buf: { name: "HP(%)", unit: "f" },
    atk: { name: "攻撃力", unit: "i" },
    atk_buf: { name: "攻撃力(%)", unit: "f" },
    atk_base: { name: "基礎攻撃力", unit: "f" },
    def: { name: "防御力", unit: "i" },
    def_buf: { name: "防御力(%)", unit: "f" },
    elem: { name: "元素熟知", unit: "i" },
    en_rec: { name: "元素ﾁｬｰｼﾞ率", unit: "f" },
    cri_rate: { name: "会心率", unit: "f" },
    cri_dmg: { name: "会心ダメ", unit: "f" },
    any_dmg: { name: "ダメージ", unit: "f" },
    elem_dmg: { name: "元素バフ", unit: "f" },
    pyro_dmg: { name: "炎元素バフ", unit: "f" },
    hydro_dmg: { name: "水元素バフ", unit: "f" },
    elect_dmg: { name: "雷元素バフ", unit: "f" },
    anemo_dmg: { name: "風元素バフ", unit: "f" },
    cryo_dmg: { name: "氷元素バフ", unit: "f" },
    geo_dmg: { name: "岩元素バフ", unit: "f" },
    phys_dmg: { name: "物理バフ", unit: "f" },
    normal_dmg: { name: "通常攻撃ダメ", unit: "f" },
    heavy_dmg: { name: "重撃ダメ", unit: "f" },
    heavy_cri: { name: "重撃会心率", unit: "f" },
    skill_dmg: { name: "スキルダメ", unit: "f" },
    burst_dmg: { name: "元素爆発ダメ", unit: "f" },
    react_dmg: { name: "元素反応ダメ", unit: "f" },
};

function getBonusUnit(id) {
    if (id in BONUS_UNIT) {
        return BONUS_UNIT[id];
    }
    return BONUS_UNIT.none;
};

class Status {
    constructor() {
        this.chara = null;
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
    }
};

class Bonus {
    constructor(items, value, limit = null, times = 0, stack = 0) {
        if (Array.isArray(items)) {
            this.items = items;
        } else {
            this.items = [items];
        }
        this.value = value;
        this.limit = limit;
        this.times = times;
        this.stack = stack;
    }

    append(status, limit = null) {
        if (this.limit == limit) {
            for (let i = 0; i < this.items.length; ++i) {
                status[this.items[i]] += this.value;
            }
            return true;
        }
        return false;
    }
};

const PARTY_BONUS = {
    pyro: new Bonus("atk_buf", 25),
    cryo: new Bonus("cri_rate", 15, "氷元素付着または凍結状態の敵"),
    geo: new Bonus("any_dmg", 15, "シールドが存在する時")
};

const CHARACTER = {
    other: { name: "旅人", element: "none", weapon: "none", special: "none" },
    trvanemo: { name: "旅人(風)", element: "anemo", weapon: "sword", special: "atk_buf" },
    trvgeo: { name: "旅人(岩)", element: "geo", weapon: "sword", special: "atk_buf" },
    fischl: { name: "フィッシュル", element: "electo", weapon: "bow", special: "atk_buf" },
    ningguang: { name: "凝光", element: "geo", weapon: "catalyst", special: "geo_dmg" },
};