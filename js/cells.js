"use strict";
function removeChildren(elem) {
    while (!!elem.lastChild) {
        elem.lastChild.remove();
    }
}
function removeWithoutFirstChild(elem) {
    while (elem.firstChild !== elem.lastChild) {
        elem.lastChild.remove();
    }
}
class Cell {
    constructor(listeners = null) {
        this.listeners = listeners;
    }
    static getSelectLabel(cell) {
        let select = cell.firstElementChild;
        return select.options[select.selectedIndex].label;
    }
    get initial() {
        return null;
    }
    value(cell) {
        return null;
    }
    save(cell) {
        return null;
    }
    load(cell, id, values) {
        return null;
    }
    update(cell, ...args) {
    }
    listen(cell, child) {
        if (!!this.listeners) {
            for (const type in this.listeners) {
                child.addEventListener(type, this.listeners[type]);
            }
        }
        cell.appendChild(child);
        return child;
    }
}
class IntCell extends Cell {
    static onChange(e) {
        let input = e.target;
        if (!!input.value) {
            input.truth = parseInt(input.value);
        }
        else {
            input.truth = 0;
        }
    }
    static onFocus(e) {
        let input = e.target;
        if (input.value === "0") {
            input.value = "";
        }
    }
    static onBlur(e) {
        let input = e.target;
        if (input.value === "") {
            input.value = "0";
            input.truth = 0;
        }
    }
    get initial() {
        return "0";
    }
    value(cell) {
        return cell.firstElementChild.truth;
    }
    save(cell) {
        return cell.firstElementChild.truth.toString();
    }
    load(cell, id, values) {
        let value = values[id];
        if (isNaN(parseInt(value))) {
            value = "0";
        }
        return this.build(cell, value);
    }
    build(cell, value) {
        let child = document.createElement("input");
        child.type = "number";
        child.step = "1";
        child.min = "0";
        if (typeof value === "number") {
            child.truth = value;
            child.value = Math.round(value).toFixed();
        }
        else {
            child.value = value;
            child.truth = parseInt(value);
        }
        child.pattern = "[0-9]*";
        child.className = "numeric";
        child.addEventListener("change", IntCell.onChange);
        child.addEventListener("focus", IntCell.onFocus);
        child.addEventListener("blur", IntCell.onBlur);
        return this.listen(cell, child);
    }
}
class RateCell extends Cell {
    static onChange(e) {
        let input = e.target;
        if (!!input.value) {
            input.truth = parseFloat(input.value);
        }
        else {
            input.truth = 0.0;
        }
    }
    static onFocus(e) {
        let input = e.target;
        if (input.value === "0.0") {
            input.value = "";
        }
    }
    static onBlur(e) {
        let input = e.target;
        if (input.value === "") {
            input.value = "0.0";
            input.truth = 0.0;
        }
        else {
            const value = parseFloat(input.value);
            if (isNaN(value)) {
                input.value = "0.0";
                input.truth = 0.0;
            }
            else if (value === Math.floor(value)) {
                input.value = value.toString() + ".0";
            }
        }
    }
    get initial() {
        return "0.0";
    }
    value(cell) {
        return cell.firstElementChild.truth;
    }
    save(cell) {
        return cell.firstElementChild.truth.toString();
    }
    load(cell, id, values) {
        let value = values[id];
        if (isNaN(parseFloat(value))) {
            value = "0.0";
        }
        return this.build(cell, value);
    }
    build(cell, value) {
        let child = document.createElement("input");
        child.type = "number";
        child.step = "0.1";
        child.min = "0";
        if (typeof value === "number") {
            child.truth = value;
            child.value = value.toFixed(1);
        }
        else {
            child.value = value;
            child.truth = parseFloat(value);
        }
        child.pattern = "[0-9\.]*";
        child.className = "numeric";
        child.addEventListener("change", RateCell.onChange);
        child.addEventListener("focus", RateCell.onFocus);
        child.addEventListener("blur", RateCell.onBlur);
        this.listen(cell, child);
        cell.appendChild(document.createTextNode("%"));
        return child;
    }
}
class EmptyCell extends Cell {
    build(cell, value) {
        let child = document.createElement("input");
        child.type = "text";
        child.value = "";
        child.truth = 0;
        child.className = "hide";
        cell.appendChild(child);
        return child;
    }
}
class IndexCell extends Cell {
    index(cell) {
        let row = cell.parentElement;
        return (row.rowIndex - 1).toString();
    }
    load(cell, id, values) {
        cell.appendChild(document.createTextNode(this.index(cell)));
        return null;
    }
    update(cell) {
        cell.childNodes[0].textContent = this.index(cell);
    }
}
class CharaStatusCell extends IntCell {
    update(cell, name, level) {
        const status = CHARACTER[name].status;
        if (!!status) {
            const param = status[cell.id];
            const bound = [ASCENSION_LV_MIN].concat(ASCENSION_LV_STEP, ASCENSION_LV_MAX);
            const step = AscensionLevelCell.step(level);
            const min = bound[step.index];
            const max = bound[step.index + 1];
            const lower = param[step.index * 2];
            const upper = param[step.index * 2 + 1];
            let value;
            if (step.level === min) {
                value = lower;
            }
            else if (step.level === max) {
                value = upper;
            }
            else {
                value = Math.ceil((upper - lower) / (max - min) * (step.level - min) + lower);
            }
            let input = cell.firstElementChild;
            input.value = value.toFixed();
            input.truth = value;
        }
    }
}
class AscensionLevelCell extends Cell {
    static step(level) {
        if (0 < level.indexOf("+")) {
            const lv = parseInt(level.replace("+", ""));
            return { level: lv, index: ASCENSION_LV_STEP.indexOf(lv) + 1 };
        }
        else {
            const lv = parseInt(level);
            for (let i = 0; i < ASCENSION_LV_STEP.length; ++i) {
                if (lv <= ASCENSION_LV_STEP[i]) {
                    return { level: lv, index: i };
                }
            }
            return { level: lv, index: ASCENSION_LV_STEP.length };
        }
    }
    get initial() {
        return "1";
    }
    value(cell) {
        let select = cell.firstElementChild;
        return select.value;
    }
    save(cell) {
        let select = cell.firstElementChild;
        return select.value;
    }
    load(cell, id, values) {
        let value = values[id];
        if (isNaN(parseInt(value.replace("+", "")))) {
            value = "1";
        }
        let child = document.createElement("select");
        for (let i = 1; i <= ASCENSION_LV_MAX; ++i) {
            let lv = i.toString();
            let opt = document.createElement("option");
            opt.value = lv;
            opt.label = lv;
            opt.selected = (value === lv);
            child.appendChild(opt);
            if (ASCENSION_LV_STEP.contains(i)) {
                lv += "+";
                opt = document.createElement("option");
                opt.value = lv;
                opt.label = lv;
                opt.selected = (value === lv);
                child.appendChild(opt);
            }
        }
        return this.listen(cell, child);
    }
}
class RangeCell extends Cell {
    constructor(min, max, listeners = null) {
        super(listeners);
        this.min = min;
        this.max = max;
    }
    get initial() {
        return this.min.toString();
    }
    value(cell) {
        let select = cell.firstElementChild;
        return parseInt(select.value);
    }
    save(cell) {
        let select = cell.firstElementChild;
        return select.value;
    }
    load(cell, id, values) {
        let value = parseInt(values[id]);
        if (isNaN(value)) {
            value = this.min;
        }
        else if (value < this.min) {
            value = this.min;
        }
        else if (this.max < value) {
            value = this.max;
        }
        return this.build(cell, value);
    }
    build(cell, value) {
        let child = document.createElement("select");
        for (let i = this.min; i <= this.max; ++i) {
            let opt = document.createElement("option");
            const str = i.toString();
            opt.value = str;
            opt.label = str;
            opt.selected = (value === i);
            child.appendChild(opt);
        }
        return this.listen(cell, child);
    }
}
class TalentCell extends RangeCell {
    load(cell, id, values) {
        let child = super.load(cell, id, values);
        cell.insertBefore(document.createTextNode("Lv."), child);
        return child;
    }
}
class ArtifactLevelCell extends RangeCell {
    constructor(listeners = null) {
        super(0, 0, listeners);
    }
    load(cell, id, values) {
        let star = parseInt(values.star);
        if (isNaN(star)) {
            star = 0;
        }
        this.max = ARTIFACT_LEVEL[star];
        return super.load(cell, id, values);
    }
    update(cell, star) {
        const value = cell.firstElementChild.selectedIndex;
        removeChildren(cell);
        this.max = ARTIFACT_LEVEL[star];
        this.build(cell, value);
    }
}
class ArtifactCell extends Cell {
    constructor(map, listeners = null) {
        super(listeners);
        this.map = map;
    }
    get initial() {
        return "other";
    }
    value(cell) {
        let select = cell.firstElementChild;
        return select.value;
    }
    save(cell) {
        let select = cell.firstElementChild;
        return select.value;
    }
    load(cell, id, values) {
        let value = values[id];
        if (!(value in this.map)) {
            value = "other";
        }
        let child = document.createElement("select");
        for (let key in this.map) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.label = this.map[key];
            opt.selected = (value === key);
            child.appendChild(opt);
        }
        return this.listen(cell, child);
    }
}
class NameCell extends Cell {
    constructor(dict, listeners = null) {
        super(listeners);
        this.dict = dict;
    }
    get initial() {
        return "other";
    }
    value(cell) {
        let select = cell.firstElementChild;
        return select.value;
    }
    save(cell) {
        let select = cell.firstElementChild;
        return select.value;
    }
    load(cell, id, values) {
        let value = values[id];
        if (!(value in this.dict)) {
            value = "other";
        }
        let child = document.createElement("select");
        for (let key in this.dict) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.label = this.dict[key].name;
            opt.selected = (value === key);
            child.appendChild(opt);
        }
        return this.listen(cell, child);
    }
}
class NumberBonus {
    constructor(type) {
        this.name = BONUS_LABEL[type].select;
    }
    get init() {
        return "0";
    }
    cell(listeners) {
        return new EmptyCell();
    }
}
class IntBonus extends NumberBonus {
    cell(listeners) {
        return new IntCell(listeners);
    }
}
class RateBonus extends NumberBonus {
    get init() {
        return "0.0";
    }
    cell(listeners) {
        return new RateCell(listeners);
    }
}
const BonusValueList = {
    other: new NumberBonus(StatusBonusType.Other),
    hp: new IntBonus(StatusBonusType.Hp),
    hp_buf: new RateBonus(StatusBonusType.HpBuf),
    atk: new IntBonus(StatusBonusType.Atk),
    atk_buf: new RateBonus(StatusBonusType.AtkBuf),
    def: new IntBonus(StatusBonusType.Def),
    def_buf: new RateBonus(StatusBonusType.DefBuf),
    elem: new IntBonus(StatusBonusType.Elem),
    en_rec: new RateBonus(StatusBonusType.EnRec),
    cri_rate: new RateBonus(CriticalBonusType.Rate),
    cri_dmg: new RateBonus(CriticalBonusType.Damage),
    pyro_dmg: new RateBonus(ElementBonusType.Pyro),
    hydro_dmg: new RateBonus(ElementBonusType.Hydro),
    elect_dmg: new RateBonus(ElementBonusType.Elect),
    anemo_dmg: new RateBonus(ElementBonusType.Anemo),
    cryo_dmg: new RateBonus(ElementBonusType.Cryo),
    geo_dmg: new RateBonus(ElementBonusType.Geo),
    phys_dmg: new RateBonus(ElementBonusType.Phys),
};
class BonusCell extends Cell {
    constructor(list, listeners = null) {
        super(listeners);
        this.list = list;
    }
    value(cell) {
        let child1 = cell.firstElementChild;
        let child2 = child1.nextElementSibling;
        return { type: child1.value, value: child2.truth };
    }
    select(value) {
        const count = this.list.length;
        let child = document.createElement("select");
        child.disabled = (count === 1);
        child.className = "bonus";
        const values = BonusValueList;
        for (let i = 0; i < count; ++i) {
            let opt = document.createElement("option");
            let item = this.list[i];
            opt.value = item;
            opt.label = values[item].name;
            opt.selected = (value === item);
            child.appendChild(opt);
        }
        return child;
    }
}
class CharaSpecialCell extends BonusCell {
    constructor() {
        super([]);
    }
    load(cell, id, values) {
        cell.className = "bonus";
        this.build(cell, values.name, values.level);
        return null;
    }
    update(cell, name, level) {
        removeChildren(cell);
        this.build(cell, name, level);
    }
    build(cell, name, level) {
        const chara = CHARACTER[name];
        const bonus = chara.special;
        this.list = [bonus];
        cell.appendChild(this.select(bonus));
        let value = 0;
        if (!!chara.spvalue) {
            value = chara.spvalue[AscensionLevelCell.step(level).index];
        }
        let builder = BonusValueList[bonus].cell(null);
        builder.build(cell, value).disabled = true;
    }
}
class BonusListCell extends BonusCell {
    update(cell, star, level) {
        removeWithoutFirstChild(cell);
        let select = cell.firstElementChild;
        let bonus = select.value;
        let builder = BonusValueList[bonus].cell(this.listeners);
        builder.build(cell, this.param(star, level, bonus)).disabled = true;
    }
    build(cell, astar, alevel, bonus) {
        let child = this.listen(cell, this.select(bonus));
        let star = parseInt(astar);
        if (isNaN(star)) {
            star = 0;
        }
        let level = parseInt(alevel);
        if (isNaN(level)) {
            level = 0;
        }
        let builder = BonusValueList[bonus].cell(this.listeners);
        builder.build(cell, this.param(star, level, bonus)).disabled = true;
        return child;
    }
    param(star, level, bonus) {
        let param = getArtifactParam(star, level, bonus);
        if (!!param) {
            return param.intercept + level * param.slope;
        }
        return 0.0;
    }
}
class SingleBonusCell extends BonusListCell {
    constructor(bonus, listeners = null) {
        super([bonus], listeners);
    }
    load(cell, id, values) {
        cell.className = "bonus";
        let child = this.build(cell, values.star, values.level, this.list[0]);
        child.disabled = true;
        return child;
    }
}
class MultiBonusCell extends BonusListCell {
    get initial() {
        return this.list[0];
    }
    save(cell) {
        let select = cell.firstElementChild;
        return select.value;
    }
    load(cell, id, values) {
        cell.className = "bonus";
        let value = values[id];
        if (!this.list.contains(value)) {
            value = this.list[0];
        }
        return this.build(cell, values.star, values.level, value);
    }
}
class BonusValueCell extends BonusCell {
    constructor(list, listeners = null) {
        super(list, listeners);
        this.onChange = {
            listeners: listeners,
            handleEvent(e) {
                let select = e.target;
                let cell = select.parentElement;
                removeWithoutFirstChild(cell);
                let bonus = BonusValueList[select.value];
                bonus.cell(this.listeners).build(cell, bonus.init);
            }
        };
    }
    get initial() {
        const type = this.list[0];
        return [type, BonusValueList[type].init];
    }
    save(cell) {
        let child1 = cell.firstElementChild;
        let chils2 = child1.nextElementSibling;
        return [child1.value, chils2.value];
    }
    load(cell, id, values) {
        cell.className = "bonus";
        let pair = values[id];
        if (!Array.isArray(pair) || !this.list.contains(pair[0])) {
            pair = this.initial;
        }
        return this.build(cell, pair[0], pair[1]);
    }
    build(cell, type, value) {
        let child = this.select(type);
        child.addEventListener("change", this.onChange);
        this.listen(cell, child);
        return BonusValueList[type].cell(this.listeners).build(cell, value);
    }
}
class SecondBonusCell extends BonusValueCell {
    constructor(items, listeners = null) {
        super([items.other.second], listeners);
        this.items = items;
    }
    load(cell, id, values) {
        let name = values.name;
        if (!(name in this.items)) {
            name = "other";
        }
        this.list = [this.items[name].second];
        return super.load(cell, id, values);
    }
    update(cell, name) {
        this.list = [this.items[name].second];
        const initial = this.initial;
        removeChildren(cell);
        this.build(cell, initial[0], initial[1]);
    }
}
class EquipmentCell extends Cell {
    constructor(type, listeners = null) {
        super(listeners);
        this.type = type;
        this.onChange = {
            type: type,
            handleEvent(e) {
                let select = e.target;
                let cell = select.parentElement;
                removeWithoutFirstChild(cell);
                if (this.type in EquipmentCell.DetailTable) {
                    let item = document.querySelector(`table#tbl_${this.type} tr#${select.value}`);
                    EquipmentCell.DetailTable[this.type](cell, item);
                }
            }
        };
    }
    static detailLine(cell, row, id, prefix) {
        let elem = row.querySelector("td#" + id);
        if (!!elem) {
            let child = elem.firstElementChild;
            cell.appendChild(document.createElement("br"));
            cell.appendChild(document.createTextNode(prefix + child.value));
        }
    }
    static detailBonus(cell, row, id) {
        let elem = row.querySelector("td#" + id);
        if (!!elem) {
            let child = elem.firstElementChild;
            let type = child.value;
            if ((type in BonusValueList) && (type !== StatusBonusType.Other)) {
                const bonus = BonusValueList[type];
                const label = bonus.name.replace("(%)", "");
                const value = child.nextElementSibling.value;
                const suffix = BONUS_LABEL[type].suffix;
                cell.appendChild(document.createElement("br"));
                cell.appendChild(document.createTextNode(`${label} +${value}${suffix}`));
            }
        }
    }
    static detailChara(cell, row) {
        EquipmentCell.detailLine(cell, row, "level", "Lv.");
        EquipmentCell.detailLine(cell, row, "hp", "HP:");
        EquipmentCell.detailLine(cell, row, "atk", LABEL_TEXT.atk + ":");
        EquipmentCell.detailLine(cell, row, "def", LABEL_TEXT.def + ":");
    }
    static detailWeapon(cell, row) {
        EquipmentCell.detailLine(cell, row, "level", "Lv.");
        EquipmentCell.detailLine(cell, row, "rank", LABEL_TEXT.rank + ":");
        EquipmentCell.detailLine(cell, row, "atk", LABEL_TEXT.atk + " +");
        EquipmentCell.detailBonus(cell, row, "second");
    }
    static detailArtifact(cell, row) {
        EquipmentCell.detailBonus(cell, row, "main");
        EquipmentCell.detailBonus(cell, row, "sub1");
        EquipmentCell.detailBonus(cell, row, "sub2");
        EquipmentCell.detailBonus(cell, row, "sub3");
        EquipmentCell.detailBonus(cell, row, "sub4");
    }
    get initial() {
        return "0";
    }
    get items() {
        return document.querySelectorAll(`table#tbl_${this.type} td#name`);
    }
    value(cell) {
        let select = cell.firstElementChild;
        return document.querySelector(`table#tbl_${this.type} tr#${select.value}`);
    }
    save(cell) {
        let select = cell.firstElementChild;
        return select.selectedIndex.toString();
    }
    load(cell, id, values) {
        cell.className = "equip";
        let value = parseInt(values[id]);
        if (isNaN(value)) {
            value = 0;
        }
        return this.build(cell, value, this.items);
    }
    update(cell, items) {
        let row = this.value(cell);
        const index = !!row ? (row.rowIndex - 2) : 0;
        removeChildren(cell);
        this.build(cell, index, items);
    }
    build(cell, index, items) {
        let child = document.createElement("select");
        for (let i = 0, len = items.length; i < len; ++i) {
            let item = items[i];
            let label = Cell.getSelectLabel(item);
            if (7 < label.length) {
                label = label.slice(0, 6) + "…";
            }
            let opt = document.createElement("option");
            opt.value = item.parentElement.id;
            opt.label = `${i + 1}.${label}`;
            opt.selected = (index === i);
            child.appendChild(opt);
        }
        this.listen(cell, child);
        child.addEventListener("change", this.onChange);
        if (this.type in EquipmentCell.DetailTable) {
            let row = this.value(cell);
            if (!!row) {
                EquipmentCell.DetailTable[this.type](cell, row);
            }
        }
        return child;
    }
}
EquipmentCell.DetailTable = {
    chara: EquipmentCell.detailChara,
    sword: EquipmentCell.detailWeapon,
    claymore: EquipmentCell.detailWeapon,
    polearm: EquipmentCell.detailWeapon,
    bow: EquipmentCell.detailWeapon,
    catalyst: EquipmentCell.detailWeapon,
    flower: EquipmentCell.detailArtifact,
    feather: EquipmentCell.detailArtifact,
    sands: EquipmentCell.detailArtifact,
    goblet: EquipmentCell.detailArtifact,
    circlet: EquipmentCell.detailArtifact
};
class EquipWeaponCell extends Cell {
    constructor(listeners = null) {
        super();
        this.builders = {
            sword: new EquipmentCell(WeaponType.Sword, listeners),
            claymore: new EquipmentCell(WeaponType.Claymore, listeners),
            polearm: new EquipmentCell(WeaponType.Polearm, listeners),
            bow: new EquipmentCell(WeaponType.Bow, listeners),
            catalyst: new EquipmentCell(WeaponType.Catalyst, listeners)
        };
    }
    get initial() {
        return "0";
    }
    save(cell) {
        let select = cell.firstElementChild;
        return select.selectedIndex.toString();
    }
    load(cell, id, values) {
        let index = parseInt(values.chara);
        if (isNaN(index)) {
            index = 0;
        }
        let rows = document.getElementById("tbl_chara").rows;
        let length = rows.length;
        if (length <= 2) {
            return null;
        }
        if (length < 2 + index) {
            index = 0;
        }
        let chara = rows[2 + index].cells[1];
        const name = chara.firstElementChild.value;
        const weapon = CHARACTER[name].weapon;
        return this.builders[weapon].load(cell, id, values);
    }
    builder(type) {
        return this.builders[type];
    }
}
class Param {
    constructor(type) {
        this.type = type;
    }
    set(cell, status) {
        if (!status) {
            cell.nextElementSibling.textContent = "0";
        }
        else {
            cell.nextElementSibling.textContent = status.param[this.type].toString();
        }
    }
}
class BaseParam extends Param {
    set(cell, status) {
        if (!status) {
            cell.textContent = "0";
            cell.nextElementSibling.textContent = "0";
        }
        else {
            const type = this.type;
            const base = status.base[type];
            cell.textContent = base.toString();
            const add = status.param[type];
            const buf = status.param[TypeToBonus.buffer(type)];
            cell.nextElementSibling.textContent = this.text(base, add, buf);
        }
    }
    text(base, add, buf) {
        return Math.floor((base * (buf * 10) / 1000) + add).toFixed();
    }
}
class RateParam extends Param {
    set(cell, status) {
        if (!status) {
            cell.nextElementSibling.textContent = "0.0%";
        }
        else {
            cell.nextElementSibling.textContent = this.text(status.param[this.type]);
        }
    }
    text(num) {
        return num.toFixed(1) + "%";
    }
}
class ElemBuffParam extends RateParam {
    set(cell, status) {
        if (!status) {
            cell.nextElementSibling.textContent = "0.0%";
        }
        else {
            cell.nextElementSibling.textContent = this.text(status.param.elem_dmg + status.param[this.type]);
        }
    }
}
class DamageParam extends RateParam {
    set(cell, status) {
        if (!status) {
            cell.nextElementSibling.textContent = "+0.0%";
        }
        else {
            cell.nextElementSibling.textContent = "+" + this.text(status.param[this.type]);
        }
    }
}
class ElemReactParam extends RateParam {
    constructor(param) {
        super(param);
        switch (param) {
            case ReactionBonusType.Melt:
            case ReactionBonusType.Vaporize:
                this.base = ReactionBaseType.Amplify;
                break;
            default:
                this.base = ReactionBaseType.Transform;
                break;
        }
    }
    set(cell, status) {
        if (!status) {
            cell.textContent = "+0.0%";
            cell.nextElementSibling.textContent = "+0.0%";
        }
        else {
            cell.textContent = "+" + this.text(status.reaction(this.base));
            cell.nextElementSibling.textContent = "+" + this.text(status.param[this.type]);
        }
    }
}
