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
        // childに外部リスナーを登録
        if (!!this.listeners) {
            for (const type in this.listeners) {
                child.addEventListener(type, this.listeners[type]);
            }
        }
        cell.appendChild(child);
        return child;
    }
}
// 整数セル
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
        // 正規化
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
// 割合セル
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
                // 整数に小数点を追加
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
        // 正規化
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
// 空のセル
class EmptyCell extends Cell {
    build(cell, value) {
        // 処理簡略化のため非表示で配置しておく
        let child = document.createElement("input");
        child.type = "text";
        child.value = "";
        child.truth = 0;
        child.className = "hide";
        cell.appendChild(child);
        return child;
    }
}
// 連番セル
class IndexCell extends Cell {
    index(cell) {
        let row = cell.parentElement;
        return (row.rowIndex - 1).toString(); // 0,1はキャプション行
    }
    load(cell, id, values) {
        cell.appendChild(document.createTextNode(this.index(cell)));
        return null;
    }
    update(cell) {
        cell.childNodes[0].textContent = this.index(cell);
    }
}
// キャラクター基礎ステータスセル
class BaseParamCell extends IntCell {
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
            input.value = value.toFixed(); // TODO: 切り捨て・四捨五入など要検証
            input.truth = value;
        }
    }
}
// 整数範囲セル
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
        // 正規化
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
        // 連番option追加
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
// 天賦セル
class TalentCell extends RangeCell {
    load(cell, id, values) {
        let child = super.load(cell, id, values);
        cell.insertBefore(document.createTextNode("Lv."), child);
        return child;
    }
}
// 聖遺物レベルセル
class ArtifactLevelCell extends RangeCell {
    constructor(listeners = null) {
        super(0, 0, listeners);
        // this.min = 0 固定
        // this.max = td#star の値に応じて変更
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
// 突破レベルセル
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
        // 正規化
        let value = values[id];
        if (isNaN(parseInt(value.replace("+", "")))) {
            value = "1";
        }
        let child = document.createElement("select");
        // 連番option追加
        for (let i = 1; i <= ASCENSION_LV_MAX; ++i) {
            let lv = i.toString();
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
        return this.listen(cell, child);
    }
}
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
    value(cell) {
        let select = cell.firstElementChild;
        return select.value;
    }
    save(cell) {
        let select = cell.firstElementChild;
        return select.value;
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
        return this.listen(cell, child);
    }
}
// 辞書セル
// key:{"name":value} の配列を処理する
class DictCell extends Cell {
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
        // 正規化
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
// 整数ボーナス
class IntBonus {
    constructor(type) {
        this.name = BONUS_LABEL[type].select;
    }
    get init() {
        return "0";
    }
    cell(listeners) {
        return new IntCell(listeners);
    }
}
// 割合ボーナス
class RateBonus {
    constructor(type) {
        this.name = BONUS_LABEL[type].select;
    }
    get init() {
        return "0.0";
    }
    cell(listeners) {
        return new RateCell(listeners);
    }
}
// 空のボーナス
class EmptyBonus {
    constructor(type) {
        this.name = BONUS_LABEL[type].select;
    }
    get init() {
        return "0.0";
    }
    cell(listeners) {
        return new EmptyCell();
    }
}
const BonusValueList = {
    other: new EmptyBonus(StatusBonus.Other),
    hp: new IntBonus(StatusBonus.Hp),
    hp_buf: new RateBonus(StatusBonus.HpBuf),
    atk: new IntBonus(StatusBonus.Atk),
    atk_buf: new RateBonus(StatusBonus.AtkBuf),
    def: new IntBonus(StatusBonus.Def),
    def_buf: new RateBonus(StatusBonus.DefBuf),
    elem: new IntBonus(StatusBonus.Elem),
    en_rec: new RateBonus(StatusBonus.EnRec),
    cri_rate: new RateBonus(StatusBonus.CriRate),
    cri_dmg: new RateBonus(StatusBonus.CriDmg),
    pyro_dmg: new RateBonus(ElementBonus.Pyro),
    hydro_dmg: new RateBonus(ElementBonus.Hydro),
    elect_dmg: new RateBonus(ElementBonus.Elect),
    anemo_dmg: new RateBonus(ElementBonus.Anemo),
    cryo_dmg: new RateBonus(ElementBonus.Cryo),
    geo_dmg: new RateBonus(ElementBonus.Geo),
    phys_dmg: new RateBonus(ElementBonus.Phys),
};
// ボーナスセル
class BonusCell extends Cell {
    constructor(list, listeners = null) {
        super(listeners);
        this.list = list;
    }
    value(cell) {
        let child1 = cell.firstElementChild;
        let child2 = child1.nextElementSibling;
        return { bonus: child1.value, value: child2.truth };
    }
    exists(value) {
        return 0 <= this.list.indexOf(value);
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
// キャラクター追加効果セル
class SpecialCell extends BonusCell {
    constructor() {
        super([]);
    }
    load(cell, id, values) {
        cell.className = "bonus";
        this.build(cell, values.name, values.level);
        return null;
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
    update(cell, name, level) {
        removeChildren(cell);
        this.build(cell, name, level);
    }
}
// ボーナスリストセル
class BonusListCell extends BonusCell {
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
    update(cell, star, level) {
        removeWithoutFirstChild(cell);
        let select = cell.firstElementChild;
        let bonus = select.value;
        let builder = BonusValueList[bonus].cell(this.listeners);
        builder.build(cell, this.param(star, level, bonus)).disabled = true;
    }
    param(star, level, bonus) {
        let param = getArtifactParam(star, level, bonus);
        if (!!param) {
            return param.intercept + level * param.slope;
        }
        return 0.0;
    }
}
// 聖遺物単体ボーナスセル
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
// 聖遺物複数ボーナスセル
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
        // 正規化
        let value = values[id];
        if (!this.exists(value)) {
            value = this.list[0];
        }
        return this.build(cell, values.star, values.level, value);
    }
}
// ボーナス値セル
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
        // 正規化
        let pair = values[id];
        if (!Array.isArray(pair) || !this.exists(pair[0])) {
            pair = this.initial;
        }
        return this.build(cell, pair[0], pair[1]);
    }
    build(cell, type, value) {
        let child = this.select(type);
        // onChangeを先に実行させる
        child.addEventListener("change", this.onChange);
        this.listen(cell, child);
        return BonusValueList[type].cell(this.listeners).build(cell, value);
    }
}
// 武器追加ボーナスセル
class SecondBonusCell extends BonusValueCell {
    constructor(items, listeners = null) {
        super([items.other.second], listeners);
        this.items = items;
    }
    load(cell, id, values) {
        // 正規化
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
// 装備セル
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
            if ((type in BonusValueList) && (type !== StatusBonus.Other)) {
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
        // 装備対象をリストアップ
        return document.querySelectorAll(`table#tbl_${this.type} td#name`);
    }
    value(cell) {
        let select = cell.firstElementChild;
        return document.querySelector(`table#tbl_${this.type} tr#${select.value}`);
    }
    save(cell) {
        // 保存するのは id ではなく index
        let select = cell.firstElementChild;
        return select.selectedIndex.toString();
    }
    load(cell, id, values) {
        cell.className = "equip";
        // 正規化
        let value = parseInt(values[id]);
        if (isNaN(value)) {
            value = 0;
        }
        return this.build(cell, value, this.items);
    }
    build(cell, index, items) {
        let child = document.createElement("select");
        for (let i = 0, len = items.length; i < len; ++i) {
            let item = items[i];
            // 文字が長い場合は短縮表示
            let label = Cell.getSelectLabel(item);
            if (7 < label.length) { // TODO: 他言語は要調整
                label = label.slice(0, 6) + "…";
            }
            let opt = document.createElement("option");
            opt.value = item.parentElement.id; // tr[id] を保持する
            opt.label = `${i + 1}.${label}`;
            opt.selected = (index === i);
            child.appendChild(opt);
        }
        this.listen(cell, child);
        // 詳細情報の更新処理を追加
        child.addEventListener("change", this.onChange);
        // 初回の詳細情報を表示
        if (this.type in EquipmentCell.DetailTable) {
            let row = this.value(cell);
            if (!!row) {
                EquipmentCell.DetailTable[this.type](cell, row);
            }
        }
        return child;
    }
    update(cell, items) {
        let row = this.value(cell);
        const index = !!row ? (row.rowIndex - 2) : 0;
        removeChildren(cell);
        this.build(cell, index, items);
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
// 装備武器セル
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
        // 保存するのは id ではなく index
        return select.selectedIndex.toString();
    }
    load(cell, id, values) {
        let index = parseInt(values.chara);
        if (isNaN(index)) {
            index = 0;
        }
        let rows = document.getElementById("tbl_chara").rows;
        let length = rows.length;
        if (length <= 2) { // キャプション以外はない
            return null;
        }
        if (length < 2 + index) { // アイテム範囲外
            index = 0;
        }
        // 装備キャラクターから装備する武器種を取得
        let chara = rows[2 + index].cells[1];
        const name = chara.firstElementChild.value;
        const weapon = CHARACTER[name].weapon;
        return this.builders[weapon].load(cell, id, values);
    }
    builder(type) {
        return this.builders[type];
    }
}
// チームパラメータ基底クラス
// 追加値をそのまま表示
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
// 基礎があるパラメータ向け
class BaseParam extends Param {
    set(cell, status) {
        if (!status) {
            cell.textContent = "0";
            cell.nextElementSibling.textContent = "0";
        }
        else {
            const base = status.base[this.type];
            cell.textContent = base.toString();
            const add = status.param[this.type];
            const buf = status.param[this.type + "_buf"];
            cell.nextElementSibling.textContent = this.text(base, add, buf);
        }
    }
    text(base, add, buf) {
        return Math.floor((base * (buf * 10) / 1000) + add).toFixed();
    }
}
// 割合表記のパラメータ向け
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
// 元素ダメージバフパラメータ向け
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
// ダメージパラメータ向け
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
// 元素反応パラメータ向け
class ElemReactParam extends RateParam {
    constructor(param) {
        super(param);
        switch (param) {
            case ReactionBonus.Melt:
            case ReactionBonus.Vaporize:
                this.base = ReactionType.Amplify;
                break;
            default:
                this.base = ReactionType.Transform;
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
