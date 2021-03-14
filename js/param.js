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
const ReactionDamageScale = {
    pyro: {
        "vaporize": 1.5,
        "overload": 1.0,
        "melt": 2.0,
    },
    hydro: {
        "vaporize": 2.0,
        "echarge": 1.0,
    },
    elect: {
        "overload": 1.0,
        "echarge": 1.0,
        "conduct": 1.0,
    },
    cryo: {
        "melt": 1.5,
        "conduct": 1.0,
    },
    anemo: {
        "swirl": 1.0,
    }
};
const ReactionDamageValue = {
    "conduct": {
        resist: ElementType.Cryo,
        values: [8, 9, 9, 10, 11, 12, 12, 13, 16, 17, 18, 20, 22, 23, 27, 29, 31, 34, 37, 40, 42, 46, 48, 51, 53, 56, 59, 61, 64, 68, 71, 74, 77, 80, 84, 88, 91, 96, 99, 103, 107, 111, 117, 121, 128, 133, 140, 147, 154, 161, 168, 174, 182, 189, 199, 208, 217, 226, 236, 244, 254, 266, 278, 290, 303, 314, 326, 337, 348, 360, 371, 382, 391, 401, 414, 427, 438, 450, 461, 472, 483, 494, 507, 518, 532, 544, 557, 570, 586, 601]
    },
    "swirl": {
        resist: ElementType.Anemo,
        values: [10, 11, 11, 12, 13, 14, 16, 17, 18, 20, 22, 23, 27, 29, 32, 34, 38, 41, 44, 48, 51, 54, 58, 61, 64, 68, 70, 73, 78, 81, 86, 89, 92, 97, 101, 106, 110, 114, 119, 123, 129, 134, 140, 146, 153, 161, 169, 177, 184, 193, 201, 210, 218, 227, 239, 249, 260, 271, 282, 293, 306, 319, 333, 348, 364, 378, 391, 404, 418, 431, 444, 459, 470, 481, 498, 512, 526, 540, 553, 568, 581, 594, 608, 621, 639, 653, 669, 684, 702, 721]
    },
    "echarge": {
        resist: ElementType.Elect,
        values: [20, 22, 23, 24, 27, 29, 31, 34, 37, 40, 44, 48, 53, 58, 64, 70, 77, 83, 90, 97, 103, 110, 117, 123, 130, 136, 141, 147, 156, 163, 171, 178, 186, 193, 202, 211, 220, 230, 239, 248, 258, 269, 280, 291, 307, 322, 338, 353, 370, 388, 403, 420, 437, 453, 478, 499, 521, 542, 566, 588, 611, 639, 667, 696, 729, 756, 783, 810, 837, 863, 890, 918, 941, 963, 997, 1024, 1052, 1080, 1108, 1136, 1162, 1189, 1216, 1243, 1279, 1308, 1338, 1369, 1406, 1443]
    },
    "shutter": {
        resist: ElementType.Phys,
        values: [26, 28, 29, 31, 33, 37, 39, 42, 47, 51, 56, 60, 67, 72, 80, 88, 96, 104, 112, 120, 129, 137, 146, 153, 162, 169, 177, 184, 194, 203, 213, 223, 232, 242, 253, 264, 276, 287, 299, 310, 322, 336, 350, 364, 383, 402, 422, 442, 463, 484, 504, 526, 547, 568, 598, 624, 651, 678, 707, 736, 763, 799, 834, 870, 911, 944, 979, 1012, 1046, 1080, 1113, 1148, 1176, 1204, 1246, 1281, 1316, 1350, 1386, 1419, 1452, 1486, 1520, 1553, 1599, 1634, 1672, 1712, 1758, 1803]
    },
    "overload": {
        resist: ElementType.Pyro,
        values: [33, 37, 39, 42, 44, 49, 52, 57, 62, 68, 73, 81, 89, 97, 107, 118, 128, 139, 150, 161, 172, 183, 194, 206, 217, 226, 236, 246, 259, 272, 284, 298, 310, 323, 338, 352, 368, 383, 399, 414, 430, 448, 467, 487, 511, 537, 562, 590, 618, 647, 673, 700, 729, 757, 797, 832, 868, 904, 942, 980, 1019, 1064, 1112, 1160, 1216, 1260, 1306, 1350, 1394, 1440, 1484, 1530, 1568, 1607, 1661, 1708, 1754, 1800, 1847, 1892, 1937, 1981, 2027, 2072, 2132, 2179, 2229, 2282, 2343, 2406]
    },
};
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
            plunge_dmg: 0.0,
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
        this.flat = {
            normal: 0.0,
            heavy: 0.0,
            plunge: 0.0,
            skill: 0.0,
            burst: 0.0
        };
    }
    get level() {
        return parseInt(this.lv.replace("+", ""));
    }
    get reactions() {
        const chara = this.chara;
        const elem = chara.element;
        const scales = ReactionDamageScale[elem];
        let types = [];
        if (!!scales) {
            for (const type in scales) {
                types.push(type);
            }
        }
        if (elem === ElementType.Geo) {
            types.push(ReactionType.Shutter);
        }
        else if (chara.weapon === WeaponType.Claymore) {
            types.push(ReactionType.Shutter);
        }
        return types;
    }
    get elem_react() {
        return this.param.elem / (1400 + this.param.elem) * 100;
    }
    get elem_ampl() {
        return this.elem_react * 25.0 / 9.0;
    }
    get elem_trans() {
        return this.elem_react * 60.0 / 9.0;
    }
    get hp() {
        return this.base.hp + (this.base.hp * this.param.hp_buf / 100) + this.param.hp;
    }
    get attack() {
        return this.base.atk + (this.base.atk * this.param.atk_buf / 100) + this.param.atk;
    }
    get defence() {
        return this.base.def + (this.base.def * this.param.def_buf / 100) + this.param.def;
    }
    combatBonus(type) {
        return this.param[TypeToBonus.combat(type)];
    }
    elementMaster(type) {
        let rate;
        switch (type) {
            case ReactionType.Melt:
            case ReactionType.Vaporize:
                rate = this.elem_ampl;
                break;
            default:
                rate = this.elem_trans;
                break;
        }
        return rate;
    }
    elementBonus(type, phys = ElementType.Phys) {
        let rate = this.param[TypeToBonus.element(type)];
        if (type !== phys) {
            rate += this.param.elem_dmg;
        }
        return rate;
    }
    reactionBonus(type) {
        return this.param[TypeToBonus.reaction(type)];
    }
    reactionScale(elem, reaction) {
        if (reaction === ReactionType.Shutter) {
            switch (elem) {
                case ElementType.Phys:
                case ElementType.Geo:
                    return 1.0;
            }
        }
        else {
            const scales = ReactionDamageScale[elem];
            if (!!scales) {
                const value = scales[reaction];
                if (!!value) {
                    return value;
                }
            }
        }
        return 0.0;
    }
    critical(type = CombatType.Normal) {
        let special = 0;
        switch (type) {
            case CombatType.Heavy:
                special = this.param.heavy_cri;
                break;
            case CombatType.Skill:
                special = this.param.skill_cri;
                break;
        }
        return {
            rate: 5 + this.param.cri_rate + special,
            damage: 50 + this.param.cri_dmg,
            special: special !== 0,
        };
    }
    append(bonus) {
        if (!bonus.limit) {
            bonus.valid = false;
            this.addValues(bonus.apply(this));
        }
        this.bonus.push(bonus);
    }
    addValue(bonus) {
        if (!!bonus.flat) {
            this.flat[bonus.type] += bonus.value;
        }
        else {
            if (bonus.type !== StatusBonusType.Other) {
                this.param[bonus.type] += bonus.value;
            }
        }
    }
    subValue(bonus) {
        if (!!bonus.flat) {
            this.flat[bonus.type] -= bonus.value;
        }
        else {
            if (bonus.type !== StatusBonusType.Other) {
                this.param[bonus.type] -= bonus.value;
            }
        }
    }
    addValues(values) {
        for (const value of values) {
            this.addValue(value);
        }
    }
    subValues(values) {
        for (const value of values) {
            this.subValue(value);
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
        status.flat = Object.assign({}, this.flat);
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
    phys: [100.0, 108.0, 116.0, 127.5, 135.0, 145.0, 157.5, 170.0, 182.5, 197.5, 211.5, 225.5, 239.5, 253.5, 267.5],
    elem: [100.0, 107.5, 115.0, 125.0, 132.5, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 212.5, 225.0, 237.5],
    etc1: [100.0, 110.5, 121.5, 135.0, 147.0, 159.5, 175.5, 192.0, 208.0, 224.0, 240.5, 256.5, 270.0, 283.5, 297.0],
    xiao: [100.0, 106.0, 112.0, 119.5, 125.5, 131.5, 139.5, 147.0, 155.0, 162.5, 170.5, 178.0, 186.0, 193.5, 201.0],
    hutao: [100.0, 106.75, 113.5, 122.75, 129.5, 137.5, 147.75, 158.0, 168.25, 178.5, 188.75, 199.0, 209.25, 219.5, 229.75],
};
class CombatAttribute {
    constructor(info, level) {
        var _a, _b;
        const scale = DAMAGE_SCALE[info.scale];
        const index = Math.min(Math.max(0, level - 1), scale.length - 1);
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
    toDamage(damage, flat) {
        let str = this.value.map(value => (damage * value / 100 + flat).toFixed()).join("+");
        if (1 < this.multi) {
            return `${str}x${this.multi}`;
        }
        return str;
    }
    damage(row, status, enemy, reaction) {
        let cell = row.cells[2];
        if (!!cell.className) {
            let elem = cell.className;
            reaction = this.reaction(elem, reaction);
            let attackPower;
            switch (this.based) {
                case DamageBased.Def:
                    attackPower = status.defence;
                    break;
                default:
                    attackPower = status.attack;
                    break;
            }
            const enemyDefence = enemy.defence(status.level);
            const enemyResist = enemy.resistance(elem);
            const combatBonus = status.combatBonus(this.type);
            const elementBonus = status.elementBonus(elem, elem);
            const elemAnyBonus = status.param.elem_dmg + status.param.any_dmg;
            const combatScale = toScale(combatBonus + elementBonus + elemAnyBonus);
            const critical = status.critical(this.type);
            const criticalScale = toScale(critical.damage);
            const flatDamage = status.flat[this.type];
            const setDamage = (damage) => {
                cell.textContent = this.toDamage(damage, flatDamage);
                cell = cell.nextElementSibling;
                let text = this.toDamage(damage * criticalScale, flatDamage);
                if (critical.special) {
                    text = `${text}(${floorRate(critical.rate)})`;
                }
                cell.textContent = text;
                cell = cell.nextElementSibling;
            };
            const totalDamage = attackPower * combatScale * enemyDefence * enemyResist;
            if (!!reaction) {
                const elementMaster = status.elementMaster(reaction);
                const reactionBonus = status.reactionBonus(reaction);
                if (IsAmplifyReaction(reaction)) {
                    cell.innerHTML = `<span class="strike">${this.toDamage(totalDamage, flatDamage)}</span>`;
                    cell = cell.nextElementSibling;
                    cell.innerHTML = `<span class="strike">${this.toDamage(totalDamage * criticalScale, flatDamage)}</span>`;
                    cell = cell.nextElementSibling;
                    const reactionScale = status.reactionScale(elem, reaction) * toScale(elementMaster + reactionBonus);
                    setDamage(totalDamage * reactionScale);
                }
                else {
                    setDamage(totalDamage);
                    const reactionScale = toScale(elementMaster + reactionBonus);
                    const reactionValue = ReactionDamageValue[reaction];
                    const reactionResist = enemy.resistance(reactionValue.resist);
                    const reactionDamage = reactionValue.values[status.level - 1] * reactionScale * reactionResist;
                    cell.textContent = reactionDamage.toFixed();
                    cell = cell.nextElementSibling;
                    cell.textContent = "-";
                    cell = cell.nextElementSibling;
                }
            }
            else {
                setDamage(totalDamage);
                for (let i = 0; i < 2; ++i) {
                    cell.textContent = "-";
                    cell = cell.nextElementSibling;
                }
            }
        }
        else {
            for (let i = 0; i < 4; ++i) {
                cell.textContent = "-";
                cell = cell.nextElementSibling;
            }
        }
    }
    reaction(elem, reaction) {
        if (this.elem !== CombatElementType.Contact) {
            if (reaction === ReactionType.Shutter) {
                switch (elem) {
                    case ElementType.Phys:
                    case ElementType.Geo:
                        return reaction;
                }
            }
            else if (elem !== ElementType.Phys) {
                return reaction;
            }
        }
        return undefined;
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
