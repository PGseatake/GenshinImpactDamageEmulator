"use strict"

// テーブルについて
// 基本的に各要素の name は使用しない
// table.id = 各テーブルの名前
// tr.id = 各行を一意に識別する名前
// th.id = 各セルの用途別の名前。td 要素の id にコピーする
// td.id = 各セルの用途別の名前

// セルの基底クラス
// そのまま使用すると空セルになる
// 各関数の引数 cell は td 要素を指定する
class Cell {
    static getInputValue(cell) {
        return cell.children[0].value;
    }

    static getSelectValue(cell) {
        return cell.children[0].value;
    }

    static getSelectLabel(cell) {
        let select = cell.children[0];
        return select.options[select.selectedIndex].label;
    }

    constructor(listeners = null) {
        this.listeners = listeners;
    }

    get initial() {
        return null;
    }

    load(cell, id, values) {
        return null;
    }

    save(cell) {
        return null;
    }

    value(cell) {
        return null;
    }

    _listen(cell, child) {
        // childに外部リスナーを登録
        if (!!this.listeners) {
            for (let type in this.listeners) {
                child.addEventListener(type, this.listeners[type]);
            }
        }

        cell.appendChild(child);
        return child;
    }

    _clear(cell) {
        while (!!cell.lastChild) {
            cell.lastChild.remove();
        }
    }
};

// 整数セル
class IntCell extends Cell {
    get initial() {
        return "0";
    }

    load(cell, id, values) {
        // 正規化
        let value = values[id];
        if (Number.isNaN(parseInt(value))) {
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
        } else {
            child.value = value;
            child.truth = parseInt(value);
        }
        child.pattern = "[0-9]*";
        child.className = "numeric";

        child.addEventListener("change", IntCell.onChange);
        child.addEventListener("focus", IntCell.onFocus);
        child.addEventListener("blur", IntCell.onBlur);

        return super._listen(cell, child);
    }

    save(cell) {
        return cell.children[0].value;
    }

    value(cell) {
        return cell.children[0].truth;
    }

    static onChange(e) {
        if (!e.value) {
            e.truth = 0.0;
        } else {
            e.truth = parseFloat(e.value);
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
        }
    }
};

// 割合セル
class RateCell extends Cell {
    get initial() {
        return "0.0";
    }

    load(cell, id, values) {
        // 正規化
        let value = values[id];
        if (Number.isNaN(parseFloat(value))) {
            value = "0.0";
        }

        return this.build(cell, value);
    }

    build(cell, value) {
        let child = document.createElement("input");
        child.type = "number";
        child.step = "0.1";
        child.min = 0;
        if (typeof value === "number") {
            child.truth = value;
            child.value = value.toFixed(1);
        } else {
            child.value = value;
            child.truth = parseFloat(value);
        }
        child.pattern = "[0-9\.]*";
        child.className = "numeric";

        child.addEventListener("change", RateCell.onChange);
        child.addEventListener("focus", RateCell.onFocus);
        child.addEventListener("blur", RateCell.onBlur);

        super._listen(cell, child);
        cell.appendChild(document.createTextNode("%"));

        return child;
    }

    save(cell) {
        return cell.children[0].value;
    }

    value(cell) {
        return cell.children[0].truth;
    }

    static onChange(e) {
        if (!e.value) {
            e.truth = 0.0;
        } else {
            e.truth = parseFloat(e.value);
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
        }
    }
};

// 空のセル
class EmptyCell extends Cell {
    build(cell, value) {
        // 処理簡略化のため非表示で配置しておく
        let child = document.createElement("input");
        child.type = "text";
        child.value = "";
        child.className = "hide";

        cell.appendChild(child);
        return child;
    }

    value(cell) {
        return "";
    }
};

// 連番セル
class IndexCell extends Cell {
    index(cell) {
        return cell.parentNode.rowIndex - 1;
    }

    load(cell, id, values) {
        cell.appendChild(document.createTextNode(this.index(cell)));
        return null;
    }

    update(cell) {
        cell.childNodes[0].textContent = this.index(cell);
    }
};

// 整数範囲セル
class RangeCell extends Cell {
    constructor(min, max, listeners = null) {
        super(listeners);
        this.min = min;
        this.max = max;
    }

    get initial() {
        return String(this.min);
    }

    load(cell, id, values) {
        // 正規化
        let value = parseInt(values[id]);
        if (Number.isNaN(value)) {
            value = this.min;
        } else if (value < this.min) {
            value = this.min;
        } else if (this.max < value) {
            value = this.max;
        }

        return this._build(cell, value);
    }

    _build(cell, value) {
        let child = document.createElement("select");
        // 連番option追加
        for (let i = this.min; i <= this.max; ++i) {
            let opt = document.createElement("option");
            opt.value = i;
            opt.label = i;
            opt.selected = (value === i);
            child.appendChild(opt);
        }

        return super._listen(cell, child);
    }

    save(cell) {
        return cell.children[0].value;
    }

    value(cell) {
        return parseInt(cell.children[0].value);
    }
};

// 天賦セル
class TalentCell extends RangeCell {
    load(cell, id, values) {
        let child = super.load(cell, id, values);
        cell.insertBefore(document.createTextNode("Lv."), child);
        return child;
    }
};

// 聖遺物レベルセル
class ArtifactLevelCell extends RangeCell {
    constructor(listeners = null) {
        super(0, 0, listeners);
        // this.min = 0 固定
        // this.max = td#star の値に応じて変更
    }

    _preset(star) {
        this.max = ARTIFACT_LEVEL[star];
    }

    load(cell, id, values) {
        let star = parseInt(values.star);
        if (Number.isNaN(star)) {
            star = 0;
        }
        this._preset(star);

        return super.load(cell, id, values);
    }

    update(cell, star) {
        let value = cell.children[0].selectedIndex;
        this._preset(star);
        super._clear(cell);
        super._build(cell, value);
    }
};

// 突破レベルセル
class AscensionLevelCell extends Cell {
    get initial() {
        return "1";
    }

    load(cell, id, values) {
        // 正規化
        let value = values[id];
        if (Number.isNaN(parseInt(value.replace("+", "")))) {
            value = "1";
        }

        let child = document.createElement("select");
        // 連番option追加
        for (let i = 1; i <= ASCENSION_LV_MAX; ++i) {
            let lv = String(i);
            let opt = document.createElement("option");
            opt.value = lv;
            opt.label = lv;
            opt.selected = (value === lv);
            child.appendChild(opt);

            // 特定のレベルで突破分を追加
            if (0 <= ASCENSION_LV_STEP.indexOf(i)) {
                lv += "+";
                opt = document.createElement("option");
                opt.value = lv;
                opt.label = lv;
                opt.selected = (value === lv);
                child.appendChild(opt);
            }
        }

        return super._listen(cell, child);
    }

    save(cell) {
        return cell.children[0].value;
    }

    value(cell) {
        return cell.children[0].value;
    }
};

// マップセル
// key:value の配列を処理する
class MapCell extends Cell {
    constructor(map, listeners = null) {
        super(listeners);
        this.map = map;
    }

    get initial() {
        return "other";
    }

    load(cell, id, values) {
        // 正規化
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

        return super._listen(cell, child);
    }

    save(cell) {
        return cell.children[0].value;
    }

    value(cell) {
        return cell.children[0].value;
    }
};

// 辞書セル
// key:{prop:value} の配列を処理する
class DictCell extends Cell {
    constructor(dict, prop, listeners = null) {
        super(listeners);
        this.dict = dict;
        this.prop = prop;
    }

    get initial() {
        return "other";
    }

    load(cell, id, values) {
        // 正規化
        let value = values[id];
        if (!(value in this.dict)) {
            value = "other";
        }

        let child = document.createElement("select");
        for (let key in this.dict) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.label = this.dict[key][this.prop];
            opt.selected = (value === key);
            child.appendChild(opt);
        }

        return super._listen(cell, child);
    }

    save(cell) {
        return cell.children[0].value;
    }

    value(cell) {
        return cell.children[0].value;
    }
};

// 整数ボーナス
class IntBonus {
    constructor(name) {
        this.name = PARAM_LIST[name].select;
    }

    get init() {
        return "0";
    }

    cell(listeners) {
        return new IntCell(listeners);
    }
};

// 割合ボーナス
class RateBonus {
    constructor(name) {
        this.name = PARAM_LIST[name].select;
    }

    get init() {
        return "0.0";
    }

    cell(listeners) {
        return new RateCell(listeners);
    }
};

// 空のボーナス
class EmptyBonus {
    constructor(name) {
        this.name = PARAM_LIST[name].select;
    }

    get init() {
        return "";
    }

    cell(listeners) {
        return new EmptyCell();
    }
};

const BonusValue = {
    other: new EmptyBonus("other"),
    hp: new IntBonus("hp"),
    hp_buf: new RateBonus("hp_buf"),
    atk: new IntBonus("atk"),
    atk_buf: new RateBonus("atk_buf"),
    def: new IntBonus("def"),
    def_buf: new RateBonus("def_buf"),
    elem: new IntBonus("elem"),
    en_rec: new RateBonus("en_rec"),
    cri_rate: new RateBonus("cri_rate"),
    cri_dmg: new RateBonus("cri_dmg"),
    pyro_dmg: new RateBonus("pyro_dmg"),
    hydro_dmg: new RateBonus("hydro_dmg"),
    elect_dmg: new RateBonus("elect_dmg"),
    anemo_dmg: new RateBonus("anemo_dmg"),
    cryo_dmg: new RateBonus("cryo_dmg"),
    geo_dmg: new RateBonus("geo_dmg"),
    phys_dmg: new RateBonus("phys_dmg"),
};

// ボーナスセル
class BonusCell extends Cell {
    constructor(list, listeners) {
        super(listeners);
        this.list = list;
    }

    value(cell) {
        let children = cell.children;
        return { key: children[0].value, value: children[1].truth };
    }

    _exists(value) {
        return 0 <= this.list.indexOf(value);
    }

    _select(value) {
        let count = this.list.length;
        let child = document.createElement("select");
        child.disabled = (count === 1);
        child.className = "bonus";

        for (let i = 0; i < count; ++i) {
            let opt = document.createElement("option");
            let item = this.list[i];
            opt.value = item;
            opt.label = BonusValue[item].name;
            opt.selected = (value === item);
            child.appendChild(opt);
        }

        return child;
    }
};

// ボーナスリストセル
class BonusListCell extends BonusCell {
    _build(cell, astar, alevel, bonus) {
        let child = super._listen(cell, super._select(bonus));

        let star = parseInt(astar);
        if (Number.isNaN(star)) {
            star = 0;
        }
        let level = parseInt(alevel);
        if (Number.isNaN(level)) {
            level = 0;
        }

        let builder = BonusValue[bonus].cell(this.listeners);
        builder.build(cell, getArtifactParam(star, level, bonus)).disabled = true;

        return child;
    }

    update(cell, star, level) {
        // select要素以外を削除
        while (cell.firstChild != cell.lastChild) {
            cell.lastChild.remove();
        }

        let bonus = cell.children[0].value;
        let builder = BonusValue[bonus].cell(this.listeners);
        builder.build(cell, getArtifactParam(star, level, bonus)).disabled = true;
    }
};

// 単体ボーナスセル
class SingleBonusCell extends BonusListCell {
    constructor(bonus, listeners = null) {
        super([bonus], listeners);
    }

    load(cell, id, values) {
        cell.className = "bonus";

        let child = super._build(cell, values.star, values.level, this.list[0]);
        child.disabled = true;

        return child;
    }
};

// 複数ボーナスセル
class MultiBonusCell extends BonusListCell {
    get initial() {
        return this.list[0];
    }

    load(cell, id, values) {
        cell.className = "bonus";

        // 正規化
        let value = values[id];
        if (!super._exists(value)) {
            value = this.list[0];
        }

        return super._build(cell, values.star, values.level, value);
    }

    save(cell) {
        return cell.children[0].value;
    }
};

// ボーナス値セル
class BonusValueCell extends BonusCell {
    get initial() {
        let key = this.list[0];
        return [key, BonusValue[key].init];
    }

    load(cell, id, values) {
        cell.className = "bonus";

        // 正規化
        let pair = values[id];
        if (!Array.isArray(pair) || !super._exists(pair[0])) {
            pair = this.initial;
        }

        return this._build(cell, ...pair);
    }

    _build(cell, key, value) {
        let child = super._listen(cell, super._select(key));
        child.addEventListener("change", { listeners: this.listeners, handleEvent: BonusValueCell.onChange });

        return BonusValue[key].cell(this.listeners).build(cell, value);
    }

    save(cell) {
        let children = cell.children;
        return [children[0].value, children[1].value];
    }

    static onChange(e) {
        let select = e.target;
        let cell = select.parentNode;

        // select要素以外を削除
        while (cell.firstChild != cell.lastChild) {
            cell.lastChild.remove();
        }

        let bonus = BonusValue[select.value];
        bonus.cell(this.listeners).build(cell, bonus.init);
    }
};

// 辞書式ボーナスセル
class DictBonusCell extends BonusValueCell {
    constructor(id, dict, prop, listeners = null) {
        super([dict.other[prop]], listeners);
        this.id = id;
        this.dict = dict;
        this.prop = prop;
    }

    _preset(key) {
        this.list = [this.dict[key][this.prop]];
    }

    load(cell, id, values) {
        // 正規化
        let key = values[this.id];
        if (!(key in this.dict)) {
            key = "other";
        }

        this._preset(key);
        return super.load(cell, id, values);
    }

    update(cell, key) {
        this._preset(key);
        super._clear(cell);
        super._build(cell, ...super.initial);
    }
};

// 装備詳細
class EquipmentDetail {
    static outputLine(cell, row, idx, prefix) {
        let elem = row.cells[idx];
        if (!!elem) {
            cell.appendChild(document.createElement("br"));
            cell.appendChild(document.createTextNode(prefix + elem.children[0].value));
        }
    }

    static outputBonus(cell, item, idx) {
        let elem = item.cells[idx].firstElementChild;
        let key = elem.value;
        if ((key in BonusValue) && (key !== "other")) {
            let bonus = BonusValue[key];
            let label = bonus.name.replace("(%)", "");
            let value = elem.nextElementSibling.value;
            let suffix = (bonus instanceof RateBonus) ? "%" : "";

            cell.appendChild(document.createElement("br"));
            cell.appendChild(document.createTextNode(`${label} +${value}${suffix}`));
        }
    }

    // TODO: 多言語対応
    static outputChara(cell, item) {
        EquipmentDetail.outputLine(cell, item, 2, "Lv."); // level
        EquipmentDetail.outputLine(cell, item, 3, "HP:"); // hp
        EquipmentDetail.outputLine(cell, item, 4, "攻撃力:"); // atk
        EquipmentDetail.outputLine(cell, item, 5, "防御力:"); // def
    }

    // TODO: 多言語対応
    static outputWeapon(cell, item) {
        EquipmentDetail.outputLine(cell, item, 2, "Lv."); // level
        EquipmentDetail.outputLine(cell, item, 3, "錬成:"); // rank
        EquipmentDetail.outputLine(cell, item, 4, "攻撃力 +"); // atk
        EquipmentDetail.outputBonus(cell, item, 5); // second
    }

    static outputArtifact(cell, item) {
        EquipmentDetail.outputBonus(cell, item, 4); // main
        EquipmentDetail.outputBonus(cell, item, 5); // sub1
        EquipmentDetail.outputBonus(cell, item, 6); // sub2
        EquipmentDetail.outputBonus(cell, item, 7); // sub3
        EquipmentDetail.outputBonus(cell, item, 8); // sub4
    }

    static OutputTable = {
        chara: EquipmentDetail.outputChara,
        sword: EquipmentDetail.outputWeapon,
        claymore: EquipmentDetail.outputWeapon,
        polearm: EquipmentDetail.outputWeapon,
        bow: EquipmentDetail.outputWeapon,
        catalyst: EquipmentDetail.outputWeapon,
        flower: EquipmentDetail.outputArtifact,
        feather: EquipmentDetail.outputArtifact,
        sands: EquipmentDetail.outputArtifact,
        goblet: EquipmentDetail.outputArtifact,
        circlet: EquipmentDetail.outputArtifact
    };

    static output(cell, item, type) {
        if (type in EquipmentDetail.OutputTable) {
            EquipmentDetail.OutputTable[type](cell, item);
        }
    }
};

// 装備セル
class EquipmentCell extends Cell {
    constructor(type, listeners = null) {
        super(listeners);
        this.type = type;
    }

    get initial() {
        return "0";
    }

    get items() {
        // 装備対象をリストアップ
        return Array.from(document.querySelectorAll(`table#tbl_${this.type} td#name`));
    }

    load(cell, id, values) {
        cell.className = "equip";

        // 正規化
        let value = parseInt(values[id]);
        if (Number.isNaN(value)) {
            value = 0;
        }

        return this._build(cell, value, this.items);
    }

    _build(cell, index, items) {
        let child = document.createElement("select");
        for (let i = 0, len = items.length; i < len; ++i) {
            let item = items[i];

            // 文字が長い場合は短縮表示
            // TODO: 他言語は要調整
            let label = Cell.getSelectLabel(item);
            if (7 < label.length) {
                label = label.slice(0, 6) + "…";
            }

            let opt = document.createElement("option");
            opt.value = item.parentNode.id; // tr[id] を保持する
            opt.label = `${i + 1}.${label}`;
            opt.selected = (index === i);
            child.appendChild(opt);
        }
        super._listen(cell, child);

        // 詳細情報の更新処理を追加
        child.addEventListener("change", e => {
            let td = e.target.parentNode;
            while (td.firstChild != td.lastChild) {
                td.lastChild.remove();
            }
            EquipmentDetail.output(td, this.value(td), this.type);
        });
        // 初回の詳細情報を表示
        EquipmentDetail.output(cell, this.value(cell), this.type);

        return child;
    }

    save(cell) {
        // 保存するのは id ではなく index
        return String(cell.children[0].selectedIndex);
    }

    update(cell, items) {
        let row = this.value(cell);
        let index = !!row ? (row.rowIndex - 2) : 0;
        super._clear(cell);
        this._build(cell, index, items);
    }

    value(cell) {
        return document.querySelector(`table#tbl_${this.type} tr#${cell.children[0].value}`);
    }
};

// 装備武器セル
class EquipWeaponCell extends Cell {
    constructor(listeners = null) {
        super();

        this.builder = {
            sword: new EquipmentCell("sword", listeners),
            claymore: new EquipmentCell("claymore", listeners),
            polearm: new EquipmentCell("polearm", listeners),
            bow: new EquipmentCell("bow", listeners),
            catalyst: new EquipmentCell("catalyst", listeners)
        };
    }

    get initial() {
        return "0";
    }

    items(weapon) {
        return this.builder[weapon].items;
    }

    load(cell, id, values) {
        let index = parseInt(values.eqchara);
        if (Number.isNaN(index)) {
            index = 0;
        }

        let rows = document.getElementById("tbl_chara").rows;
        if (rows.length <= 2) {
            return null;
        }
        if (rows.length < 2 + index) {
            index = 0;
        }

        // 装備キャラクターから装備する武器種を取得
        let chara = rows[2 + index].cells[1];
        let weapon = CHARACTER[chara.children[0].value].weapon;

        return this.builder[weapon].load(cell, id, values);
    }

    save(cell) {
        // 保存するのは id ではなく index
        return String(cell.children[0].selectedIndex);
    }

    update(cell, items, weapon) {
        this.builder[weapon].update(cell, items);
    }

    value(cell, weapon) {
        return this.builder[weapon].value(cell);
    }
};

// チームパラメータ基底クラス
// 追加値をそのまま表示
class Param {
    constructor(param) {
        this.param = param;
    }

    set(cell, status) {
        if (!status) {
            cell.nextElementSibling.textContent = "0";
        } else {
            cell.nextElementSibling.textContent = String(status[this.param]);
        }
    }
};

// 基礎があるパラメータ向け
class BaseParam extends Param {
    set(cell, status) {
        if (!status) {
            cell.textContent = "0";
            cell.nextElementSibling.textContent = "0";
        } else {
            let base = status["base_" + this.param];
            cell.textContent = base;

            let add = status[this.param];
            let buf = status[this.param + "_buf"];
            cell.nextElementSibling.textContent = this._text(base, add, buf);
        }
    }

    _text(base, add, buf) {
        return Math.floor((base * (buf * 10) / 1000) + add).toFixed();
    }
};

// 割合表記のパラメータ向け
class RateParam extends Param {
    set(cell, status) {
        if (!status) {
            cell.nextElementSibling.textContent = "0.0%";
        } else {
            cell.nextElementSibling.textContent = this._text(status[this.param]);
        }
    }

    _text(num) {
        return num.toFixed(1) + "%";
    }
};

// 元素ダメージバフパラメータ向け
class ElemBuffParam extends RateParam {
    set(cell, status) {
        if (!status) {
            cell.nextElementSibling.textContent = "0.0%";
        } else {
            cell.nextElementSibling.textContent = super._text(status.elem_dmg + status[this.param]);
        }
    }
};

// ダメージパラメータ向け
class DamageParam extends RateParam {
    set(cell, status) {
        if (!status) {
            cell.nextElementSibling.textContent = "+0.0%";
        } else {
            cell.nextElementSibling.textContent = "+" + super._text(status[this.param]);
        }
    }
};

// 元素反応パラメータ向け
class ElemReactParam extends RateParam {
    constructor(param) {
        super(param);

        switch (param) {
            case "melt_dmg":
            case "vaporize_dmg":
                this.base = "elem_ampl";
                break;
            default:
                this.base = "elem_trans";
                break;
        }
    }

    set(cell, status) {
        if (!status) {
            cell.textContent = "+0.0%";
            cell.nextElementSibling.textContent = "+0.0%";
        } else {
            cell.textContent = "+" + super._text(status[this.base]);
            cell.nextElementSibling.textContent = "+" + super._text(status[this.param]);
        }
    }
};