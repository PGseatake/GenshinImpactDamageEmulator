"use strict";
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
    resonance: "元素共鳴",
    second: "秒",
};
const BONUS_LABEL = {
    other: {
        table: null,
        select: "その他",
        detail: "",
        suffix: ""
    },
    hp: {
        table: "上限HP",
        select: "HP",
        detail: "HP",
        suffix: ""
    },
    hp_buf: {
        table: null,
        select: "HP(%)",
        detail: "HP",
        suffix: "%"
    },
    atk: {
        table: "攻撃力",
        select: "攻撃力",
        detail: "攻撃力",
        suffix: ""
    },
    atk_buf: {
        table: null,
        select: "攻撃力(%)",
        detail: "攻撃力",
        suffix: "%"
    },
    def: {
        table: "防御力",
        select: "防御力",
        detail: "防御力",
        suffix: ""
    },
    def_buf: {
        table: null,
        select: "防御力(%)",
        detail: "防御力",
        suffix: "%"
    },
    elem: {
        table: "元素熟知",
        select: "元素熟知",
        detail: "元素熟知",
        suffix: ""
    },
    en_rec: {
        table: "元素ﾁｬｰｼﾞ効率",
        select: "元素ﾁｬｰｼﾞ率",
        detail: "元素チャージ効率",
        suffix: "%"
    },
    cri_rate: {
        table: "会心率",
        select: "会心率",
        detail: "会心率",
        suffix: "%"
    },
    cri_dmg: {
        table: "会心ダメージ",
        select: "会心ダメ",
        detail: "会心ダメージ",
        suffix: "%"
    },
    any_dmg: {
        table: "与ダメージ",
        select: "",
        detail: "ダメージ",
        suffix: "%"
    },
    elem_dmg: {
        table: null,
        select: "",
        detail: "元素ダメージ",
        suffix: "%"
    },
    pyro_dmg: {
        table: "炎元素バフ",
        select: "炎元素バフ",
        detail: "炎元素ダメージバフ",
        suffix: "%"
    },
    hydro_dmg: {
        table: "水元素バフ",
        select: "水元素バフ",
        detail: "水元素ダメージバフ",
        suffix: "%"
    },
    elect_dmg: {
        table: "雷元素バフ",
        select: "雷元素バフ",
        detail: "雷元素ダメージバフ",
        suffix: "%"
    },
    anemo_dmg: {
        table: "風元素バフ",
        select: "風元素バフ",
        detail: "風元素ダメージバフ",
        suffix: "%"
    },
    cryo_dmg: {
        table: "氷元素バフ",
        select: "氷元素バフ",
        detail: "氷元素ダメージバフ",
        suffix: "%"
    },
    geo_dmg: {
        table: "岩元素バフ",
        select: "岩元素バフ",
        detail: "岩元素ダメージバフ",
        suffix: "%"
    },
    phys_dmg: {
        table: "物理バフ",
        select: "物理バフ",
        detail: "物理ダメージバフ",
        suffix: "%"
    },
    normal_dmg: {
        table: "通常攻撃ダメ",
        select: "",
        detail: "通常攻撃ダメージ",
        suffix: "%"
    },
    heavy_dmg: {
        table: "重撃ダメ",
        select: "",
        detail: "重撃ダメージ",
        suffix: "%"
    },
    heavy_cri: {
        table: "重撃会心率",
        select: "",
        detail: "重撃会心率",
        suffix: "%"
    },
    skill_dmg: {
        table: "元素スキルダメ",
        select: "",
        detail: "元素スキルダメージ",
        suffix: "%"
    },
    skill_cri: {
        table: "スキル会心率",
        select: "",
        detail: "元素スキル会心率",
        suffix: "%"
    },
    burst_dmg: {
        table: "元素爆発ダメ",
        select: "",
        detail: "元素爆発ダメージ",
        suffix: "%"
    },
    vaporize_dmg: {
        table: "蒸発ダメ",
        select: "",
        detail: "蒸発ダメージ",
        suffix: "%"
    },
    melt_dmg: {
        table: "融解ダメ",
        select: "",
        detail: "融解ダメージ",
        suffix: "%"
    },
    swirl_dmg: {
        table: "拡散ダメ",
        select: "",
        detail: "拡散ダメージ",
        suffix: "%"
    },
    echarge_dmg: {
        table: "感電ダメ",
        select: "",
        detail: "感電ダメージ",
        suffix: "%"
    },
    shutter_dmg: {
        table: "氷砕きダメ",
        select: "",
        detail: "氷砕きダメージ",
        suffix: "%"
    },
    conduct_dmg: {
        table: "超電導きダメ",
        select: "",
        detail: "超電導ダメージ",
        suffix: "%"
    },
    overload_dmg: {
        table: "過負荷ダメ",
        select: "",
        detail: "過負荷ダメージ",
        suffix: "%"
    },
};
const TEAM_BONUS = {
    pyro: { items: StatusBonusType.AtkBuf, value: 25 },
    cryo: { items: CriticalBonusType.Rate, value: 15, limit: "氷元素付着または凍結状態の敵" },
    geo: { items: StatusBonusType.AnyDmg, value: 15, limit: "シールドが存在する時" },
};
class Bonus {
    constructor(id, items, value, others, source) {
        var _a, _b, _c;
        this.id = id;
        this.apply = false;
        this.types = Array.isArray(items) ? items : [items];
        this.value = value;
        this.limit = (_a = others.limit) !== null && _a !== void 0 ? _a : "";
        this.times = (_b = others.times) !== null && _b !== void 0 ? _b : 0;
        this.stack = (_c = others.stack) !== null && _c !== void 0 ? _c : 0;
        this.source = source;
    }
    get effect() {
        const labels = BONUS_LABEL;
        const items = this.types;
        let str = labels[items[0]].detail;
        for (let i = 1; i < items.length; ++i) {
            str += "・" + labels[items[i]].detail;
        }
        const suffix = labels[items[0]].suffix;
        if (!!suffix) {
            return `${str}+${(Math.round(this.value * 10) / 10).toFixed(1)}${suffix}`;
        }
        return `${str}+${this.value}`;
    }
    toString() {
        let str = this.effect;
        if (!!this.limit) {
            str = `${this.limit}に${str}`;
        }
        if (0 < this.times) {
            str = `${str}、継続時間${this.times}秒`;
        }
        if (0 < this.stack) {
            str = `${str}、最大${this.stack}重`;
        }
        return `[${this.source}] ${str}`;
    }
}
class Status {
    constructor(id) {
        this.id = id;
        this.chara = CHARACTER.other;
        this.conste = 0;
        this.lv = "0";
        this.bonus = [];
        this.talent = { combat: 0, skill: 0, burst: 0 };
        this.base = { hp: 0, atk: 0, def: 0 };
        this.param = {
            hp: 0,
            hp_buf: 0.0,
            atk: 0,
            atk_buf: 0.0,
            def: 0,
            def_buf: 0.0,
            elem: 0,
            en_rec: 0.0,
            cri_rate: 0.0,
            cri_dmg: 0.0,
            any_dmg: 0.0,
            elem_dmg: 0.0,
            pyro_dmg: 0.0,
            hydro_dmg: 0.0,
            elect_dmg: 0.0,
            anemo_dmg: 0.0,
            cryo_dmg: 0.0,
            geo_dmg: 0.0,
            phys_dmg: 0.0,
            normal_dmg: 0.0,
            heavy_dmg: 0.0,
            heavy_cri: 0.0,
            skill_dmg: 0.0,
            skill_cri: 0.0,
            burst_dmg: 0.0,
            melt_dmg: 0.0,
            swirl_dmg: 0.0,
            echarge_dmg: 0.0,
            shutter_dmg: 0.0,
            conduct_dmg: 0.0,
            vaporize_dmg: 0.0,
            overload_dmg: 0.0
        };
    }
    get level() {
        return parseInt(this.lv.replace("+", ""));
    }
    get elem_react() {
        return (this.param.elem * 25) / (9 * (this.param.elem + 1400)) * 100;
    }
    get elem_ampl() {
        return this.elem_react;
    }
    get elem_trans() {
        return 2.4 * this.elem_react;
    }
    get attack() {
        return this.base.atk + (this.base.atk * this.param.atk_buf / 100) + this.param.atk;
    }
    get defence() {
        return this.base.def + (this.base.def * this.param.def_buf / 100) + this.param.def;
    }
    combat(type) {
        return this.param[TypeToBonus.combat(type)];
    }
    elemental(type) {
        let rate = this.param[TypeToBonus.element(type)];
        if (type !== ElementType.Phys) {
            rate += this.param.elem_dmg;
        }
        return rate;
    }
    reaction(type) {
        if (type === ReactionBaseType.Transform) {
            return this.elem_trans;
        }
        else {
            return this.elem_react;
        }
    }
    critical(type = CombatType.Normal) {
        let combat = 0;
        switch (type) {
            case CombatType.Heavy:
                combat = this.param.heavy_cri;
                break;
            case CombatType.Skill:
                combat = this.param.skill_cri;
                break;
        }
        return {
            rate: 5 + this.param.cri_rate + combat,
            damage: 50 + this.param.cri_dmg,
            special: combat !== 0,
        };
    }
    append(bonus) {
        if (!bonus.limit) {
            bonus.apply = true;
            this.apply(bonus);
        }
        this.bonus.push(bonus);
    }
    apply(bonus) {
        for (const item of bonus.types) {
            this.addValue({ type: item, value: bonus.value });
        }
    }
    remove(bonus) {
        for (const item of bonus.types) {
            this.subValue({ type: item, value: bonus.value });
        }
    }
    addValue(bonus) {
        if (bonus.type !== StatusBonusType.Other) {
            this.param[bonus.type] += bonus.value;
        }
    }
    subValue(bonus) {
        if (bonus.type !== StatusBonusType.Other) {
            this.param[bonus.type] -= bonus.value;
        }
    }
    clone() {
        let status = new Status(this.id);
        status.chara = this.chara;
        status.conste = this.conste;
        status.lv = this.lv;
        status.bonus = this.bonus;
        status.talent = Object.assign({}, this.talent);
        status.base = Object.assign({}, this.base);
        status.param = Object.assign({}, this.param);
        return status;
    }
}
class Enemy {
    constructor(id) {
        const info = ENEMY_LIST[id];
        this.name = info.name;
        this.level = 0;
        this.debuff = 0;
        this.resist = info.resist;
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
    defence(level) {
        const charaLevel = level + 100;
        const enemyLevel = this.level + 100;
        const debuffRate = 1.0 - (this.debuff / 100);
        return charaLevel / (debuffRate * enemyLevel + charaLevel);
    }
    resistance(type) {
        const value = this.resist[type] - this.reduct[type];
        if (value < 0) {
            return (100 - (value / 2)) / 100;
        }
        else if (75 <= value) {
            return 100 / (value * 4 + 100);
        }
        else {
            return (100 - value) / 100;
        }
    }
}
const DAMAGE_SCALE = {
    phys: [100.0, 108.0, 116.0, 127.5, 135.0, 145.0, 157.5, 170.0, 182.5, 197.5, 212.5,],
    elem: [100.0, 107.5, 115.0, 125.0, 132.5, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0,],
    etc1: [100.0, 110.5, 121.5, 135.0, 147.0, 159.5, 175.5, 192.0, 208.0, 224.0, 240.5, 256.5, 270.0, 283.5, 297.0],
};
class CombatAttribute {
    constructor(info, level) {
        var _a, _b;
        const scale = DAMAGE_SCALE[info.scale];
        const index = (num => {
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
        this.value = [info.value * scale[index] / 100];
        if (!!info.value2) {
            this.value.push(info.value2 * scale[index] / 100);
        }
        this.multi = (_a = info.multi) !== null && _a !== void 0 ? _a : 1;
        this.based = (_b = info.based) !== null && _b !== void 0 ? _b : DamageBased.Atk;
    }
    toString(func) {
        let str = this.value.map(func).join("+");
        if (1 < this.multi) {
            return `${str}x${this.multi}`;
        }
        return str;
    }
    damage(row, status, enemy) {
        let cell = row.cells[2];
        if (!!cell.className) {
            let elem = cell.className;
            let attackPower;
            switch (this.based) {
                case DamageBased.Def:
                    attackPower = status.defence;
                    break;
                default:
                    attackPower = status.attack;
                    break;
            }
            let enemyDefence = enemy.defence(status.level);
            let elementBonus = status.elemental(elem);
            let combatBonus = status.combat(this.type);
            let enemyResist = enemy.resistance(elem);
            let bonusDamage = (100 + elementBonus + combatBonus + status.param.any_dmg) / 100;
            let totalScale = attackPower * enemyDefence * enemyResist * bonusDamage;
            cell.textContent = this.toString(value => (totalScale * value / 100).toFixed());
            cell = cell.nextElementSibling;
            let critical = status.critical(this.type);
            totalScale *= (critical.damage + 100) / 100;
            let text = this.toString(value => (totalScale * value / 100).toFixed());
            if (critical.special) {
                text = `${text}(${toFloorRate(critical.rate)})`;
            }
            cell.textContent = text;
        }
        else {
            cell.textContent = "-";
            cell = cell.nextElementSibling;
            cell.textContent = "-";
        }
    }
}
const ASCENSION_LV_STEP = [20, 40, 50, 60, 70, 80];
const ASCENSION_LV_MIN = 1;
const ASCENSION_LV_MAX = 90;
const TALENT_LV_MAX = 15;
const ARTIFACT_STAR_MAX = 5;
const ARTIFACT_LEVEL = [0, 0, 0, 12, 16, 20];
const ARTIFACT_PARAM = [
    {
        hp: { intercept: 430, slope: 121.8846154 },
        atk: { intercept: 28, slope: 7.89010989 },
        def: { intercept: 21, slope: 5.917582418 },
        atk_buf: { intercept: 5.2, slope: 1.488461538 },
        def_buf: { intercept: 6.6, slope: 1.854945055 },
        en_rec: { intercept: 5.8, slope: 1.65 },
        cri_rate: { intercept: 3.5, slope: 0.989010989 },
        cri_dmg: { intercept: 7.0, slope: 1.980769231 },
    },
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
    if (star < 3 || 5 < star) {
        return null;
    }
    if (level < 0 || ARTIFACT_LEVEL[star] < level) {
        return null;
    }
    let param = ARTIFACT_PARAM[star - 3];
    switch (bonus) {
        case StatusBonusType.Hp:
        case StatusBonusType.Atk:
        case StatusBonusType.Def:
        case StatusBonusType.AtkBuf:
        case StatusBonusType.DefBuf:
        case StatusBonusType.EnRec:
        case CriticalBonusType.Rate:
        case CriticalBonusType.Damage:
            return param[bonus];
        case StatusBonusType.Elem:
            return param.def;
        case StatusBonusType.HpBuf:
        case ElementBonusType.Anemo:
        case ElementBonusType.Geo:
        case ElementBonusType.Elect:
        case ElementBonusType.Hydro:
        case ElementBonusType.Pyro:
        case ElementBonusType.Cryo:
            return param.atk_buf;
        case ElementBonusType.Phys:
            return param.def_buf;
    }
    return null;
}
const ARTIFACT_SUB = [
    StatusBonusType.Other,
    StatusBonusType.Hp,
    StatusBonusType.HpBuf,
    StatusBonusType.Atk,
    StatusBonusType.AtkBuf,
    StatusBonusType.Def,
    StatusBonusType.DefBuf,
    StatusBonusType.Elem,
    StatusBonusType.EnRec,
    CriticalBonusType.Rate,
    CriticalBonusType.Damage
];
const ARTIFACT_SANDS = [
    StatusBonusType.Other,
    StatusBonusType.HpBuf,
    StatusBonusType.AtkBuf,
    StatusBonusType.DefBuf,
    StatusBonusType.Elem,
    StatusBonusType.EnRec,
];
const ARTIFACT_GOBLET = [
    StatusBonusType.Other,
    StatusBonusType.HpBuf,
    StatusBonusType.AtkBuf,
    StatusBonusType.DefBuf,
    StatusBonusType.Elem,
    ElementBonusType.Phys,
    ElementBonusType.Anemo,
    ElementBonusType.Geo,
    ElementBonusType.Elect,
    ElementBonusType.Hydro,
    ElementBonusType.Pyro,
    ElementBonusType.Cryo
];
const ARTIFACT_CIRCLET = [
    StatusBonusType.Other,
    StatusBonusType.HpBuf,
    StatusBonusType.AtkBuf,
    StatusBonusType.DefBuf,
    StatusBonusType.Elem,
    CriticalBonusType.Rate,
    CriticalBonusType.Damage
];
const WEAPON_RANK_MAX = 5;
