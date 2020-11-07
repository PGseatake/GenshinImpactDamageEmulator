"use strict"

// テーブルについて
// 基本的に各要素の name は使用しない
// table.id = 各テーブルの名前。種別の要素も含む
// tr.id = 各行を一意に識別する名前。各テーブルの先頭２行はキャプションとして id 未設定
// th.id = 各セルの用途別の名前。td 要素の id にコピーする
// td.id = 各セルの用途別の名前

// セルの基底クラス
// そのまま使用すると空セルになる
// 各関数の引数 cell は td 要素を指定する
class Cell {
    constructor(listeners = null) {
        this.listeners = listeners;
    }

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

    get initial() {
        return null;
    }

    load(cell, id, values) {
        cell.appendChild(document.createTextNode("-"));
        return null;
    }

    save(cell) {
        return "";
    }

    addListeners(elem) {
        if (!!this.listeners) {
            for (let type in this.listeners) {
                elem.addEventListener(type, this.listeners[type]);
            }
        }
    }

    clearChildren(elem) {
        while (!!elem.lastChild) {
            elem.lastChild.remove();
        }
    }
}

// 整数セル
class IntCell extends Cell {
    constructor(listeners = null) {
        super(listeners);
    }

    get initial() {
        return "0";
    }

    load(cell, id, values) {
        // 正規化
        let str = "0";
        if (id in values) {
            str = values[id];
            if (Number.isNaN(parseInt(str))) {
                str = "0";
            }
        }

        let child = document.createElement("input");
        child.type = "number";
        child.step = "1";
        child.min = "0";
        child.value = str;
        child.pattern = "[0-9]*";
        child.className = "numeric";

        cell.appendChild(child);
        super.addListeners(child);
        return child;
    }

    save(cell) {
        return Cell.getInputValue(cell);
    }
}

// 割合セル
class RateCell extends Cell {
    constructor(listeners = null) {
        super(listeners);
    }

    get initial() {
        return "0.0";
    }

    load(cell, id, values) {
        // 正規化
        let str = "0.0";
        if (id in values) {
            str = values[id];
            if (Number.isNaN(parseFloat(str))) {
                str = "0.0";
            }
        }

        let child = document.createElement("input");
        child.type = "number";
        child.step = "0.1";
        child.min = 0;
        child.value = str;
        child.pattern = "[0-9\.]*";
        child.className = "numeric";

        cell.appendChild(child);
        cell.appendChild(document.createTextNode("%"));
        super.addListeners(child);
        return child;
    }

    save(cell) {
        return Cell.getInputValue(cell);
    }
}

// 連番セル
class IndexCell extends Cell {
    constructor() {
        super();
    }

    load(cell, id, values) {
        cell.appendChild(document.createTextNode(cell.parentNode.rowIndex - 1));
        return null;
    }

    save(cell) {
        return null; // 値は保存しない
    }

    update(cell) {
        cell.childNodes[0].textContent = cell.parentNode.rowIndex - 1;
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
        return String(this.min);
    }

    load(cell, id, values) {
        // 正規化
        let value = this.min;
        if (id in values) {
            value = parseInt(values[id]);
            if (Number.isNaN(value)) {
                value = this.min;
            } else if (value < this.min) {
                value = this.min;
            } else if (this.max < value) {
                value = this.max;
            }
        }

        let child = document.createElement("select");
        this.appendOptions(child, value);
        cell.appendChild(child);
        super.addListeners(child);
        return child;
    }

    appendOptions(root, value) {
        // 連番option追加
        for (let i = this.min; i <= this.max; ++i) {
            let opt = document.createElement("option");
            opt.value = i;
            opt.label = i;
            opt.selected = (value === i);
            root.appendChild(opt);
        }
    }

    save(cell) {
        return Cell.getSelectValue(cell);
    }
}

// 天賦セル
class TalentCell extends RangeCell {
    constructor(min, max) {
        super();
        this.min = min;
        this.max = max;
    }

    load(cell, id, values) {
        let child = super.load(cell, id, values);
        cell.insertBefore(document.createTextNode("Lv."), child);
        return child;
    }
}

// 聖遺物レベルセル
class ArtifactLevelCell extends RangeCell {
    constructor() {
        super(0, 0);
        // this.min = 0 固定
        // this.max = td#astar の値に応じて変更
    }

    load(cell, id, values) {
        this.max = ARTIFACT_LEVEL[values.astar];
        return super.load(cell, id, values);
    }

    update(cell, key) {
        let child = cell.firstChild;
        let level = child.selectedIndex;
        this.max = ARTIFACT_LEVEL[key];
        super.clearChildren(child);
        super.appendOptions(child, level);
    }
}

// キャラクターレベルセル
class CharacterLevelCell extends Cell {
    constructor(listeners = null) {
        super(listeners);
    }

    get initial() {
        return "1";
    }

    load(cell, id, values) {
        // 正規化
        let value = "1";
        if (id in values) {
            value = values[id];
            if (Number.isNaN(parseInt(value.replace("+", "")))) {
                value = "1";
            }
        }

        let child = document.createElement("select");
        // 連番option追加
        for (let i = 1; i <= 90; ++i) {
            let lv = String(i);
            let opt = document.createElement("option");
            opt.value = lv;
            opt.label = lv;
            opt.selected = (value === lv);
            child.appendChild(opt);

            if (0 <= CHARA_LV_STEP.indexOf(i)) {
                lv = i + "+";
                opt = document.createElement("option");
                opt.value = lv;
                opt.label = lv;
                opt.selected = (value === lv);
                child.appendChild(opt);
            }
        }

        cell.appendChild(child);
        super.addListeners(child);
        return child;
    }

    save(cell) {
        return Cell.getSelectValue(cell);
    }
}

// マップセル
// key:value の配列を処理する
class MapCell extends Cell {
    constructor(map, init, listeners = null) {
        super(listeners);
        this.map = map;
        this.init = init;
    }

    get initial() {
        return this.init;
    }

    load(cell, id, values) {
        // 正規化
        let target = this.init;
        if (id in values) {
            target = values[id];
            if (!(target in this.map)) {
                target = this.init;
            }
        }

        let child = document.createElement("select");
        for (let key in this.map) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.label = this.map[key];
            opt.selected = (target === key);
            child.appendChild(opt);
        }

        cell.appendChild(child);
        super.addListeners(child);
        return child;
    }

    save(cell) {
        return Cell.getSelectValue(cell);
    }
}

// 辞書セル
// key:{map} の配列を処理する
class DictCell extends Cell {
    constructor(dict, prop, init, listeners = null) {
        super(listeners);
        this.dict = dict;
        this.prop = prop;
        this.init = init;
    }

    get initial() {
        return this.init;
    }

    load(cell, id, values) {
        // 正規化
        let target = this.init;
        if (id in values) {
            target = values[id];
            if (!(target in this.dict)) {
                target = this.init;
            }
        }

        let child = document.createElement("select");
        for (let key in this.dict) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.label = this.dict[key][this.prop];
            opt.selected = (target === key);
            child.appendChild(opt);
        }

        cell.appendChild(child);
        super.addListeners(child);
        return child;
    }

    save(cell) {
        return Cell.getSelectValue(cell);
    }
}

// 固定ボーナスセル
// 値の引き方は辞書式
class BonusCell extends Cell {
    constructor(id, dict, prop, listeners = null) {
        super(listeners);
        this.id = id;
        this.dict = dict;
        this.prop = prop;
    }

    get initial() {
        return "other";
    }

    load(cell, id, values) {
        // 正規化
        let key = values[this.id];
        if (!(key in this.dict)) {
            key = "other";
        }

        let child = document.createElement("input");
        child.type = "text";
        child.value = getBonusUnit(this.dict[key][this.prop]).name;
        child.disabled = true;
        child.className = "bonus";

        cell.appendChild(child);
        super.addListeners(child);
        return child;
    }

    save(cell) {
        return null;
    }

    update(cell, key) {
        cell.firstChild.value = getBonusUnit(this.dict[key][this.prop]).name;
    }
}

// 配列ボーナスセル
class BonusListCell extends Cell {
    constructor(list, listeners = null) {
        super(listeners);
        this.list = list;
    }

    get initial() {
        return this.list[0];
    }

    load(cell, id, values) {
        // 正規化
        let value = this.list[0];
        if (id in values) {
            value = values[id];
            if (this.list.indexOf(value) < 0) {
                value = this.list[0];
            }
        }

        let child = document.createElement("select");
        this.appendOptions(child, value);
        cell.appendChild(child);
        super.addListeners(child);
        return child;
    }

    appendOptions(root, target) {
        for (let i = 0, len = this.list.length; i < len; ++i) {
            let key = this.list[i];
            if (key in BONUS_UNIT) {
                let opt = document.createElement("option");
                opt.value = key;
                opt.label = BONUS_UNIT[key].name;
                opt.selected = (target === key);
                root.appendChild(opt);
            }
        }
    }

    save(cell) {
        return Cell.getSelectValue(cell);
    }
}

// ボーナス値セル
class BonusValueCell extends Cell {
    constructor(listeners = null) {
        super();

        this.builder = {
            n: new Cell(),
            i: new IntCell(listeners),
            f: new RateCell(listeners)
        };
    }

    get initial() {
        return "";
    }

    save(cell) {
        if (0 < cell.children.length) {
            return cell.children[0].value;
        }
        return "";
    }

    loadImpl(cell, id, values, bonus) {
        let unit = getBonusUnit(bonus).unit;
        return this.builder[unit].load(cell, id, values);
    }
}

// 固有ステータスセル
class SecondBonusCell extends BonusValueCell {
    constructor(id, dict, prop, listeners = null) {
        super(listeners);
        this.id = id;
        this.dict = dict;
        this.prop = prop;
    }

    load(cell, id, values) {
        // 正規化
        let key = values[this.id];
        if (!(key in this.dict)) {
            key = "other";
        }
        return super.loadImpl(cell, id, values, this.dict[key][this.prop]);
    }

    update(cell, key) {
        super.clearChildren(cell);
        super.loadImpl(cell, "", {}, this.dict[key][this.prop]);
    }
}

// 聖遺物追加効果セル
class ArtifactSubCell extends BonusValueCell {
    constructor(listeners = null) {
        super(listeners);
    }

    load(cell, id, values) {
        return super.loadImpl(cell, id, values, values[id.replace("val", "sub")]);
    }

    update(cell, value) {
        super.clearChildren(cell);
        super.loadImpl(cell, "", {}, value);
    }
}

// 装備セル
class EquipmentCell extends Cell {
    constructor(table, td, listeners = null) {
        super(listeners);
        this.table = table;
        this.td = td;
    }

    get initial() {
        return "0";
    }

    get items() {
        // 装備対象をリストアップ
        return Array.from(document.querySelectorAll(`table#${this.table} td#${this.td}`));
    }

    load(cell, id, values) {
        // 正規化
        let index = 0;
        if (id in values) {
            index = parseInt(values[id]);
            if (Number.isNaN(index)) {
                index = 0;
            }
        }

        let child = document.createElement("select");
        this.appendOptions(child, index, this.items);
        cell.appendChild(child);
        super.addListeners(child);
        return child;
    }

    appendOptions(root, index, items) {
        for (let i = 0, len = items.length; i < len; ++i) {
            let item = items[i];
            let opt = document.createElement("option");
            opt.value = item.parentNode.id; // tr[id] を保持する
            opt.label = `${i + 1}.${Cell.getSelectLabel(item)}`;
            opt.selected = (index === i);
            root.appendChild(opt);
        }
    }

    save(cell) {
        // 保存するのは id ではなく index
        return String(cell.children[0].selectedIndex);
    }

    update(cell, items) {
        let row = document.querySelector(`table#${this.table} tr#${Cell.getSelectValue(cell)}`);
        let index = 0;
        if (!!row) {
            index = row.rowIndex - 2;
        }
        let child = cell.children[0];
        super.clearChildren(child);
        this.appendOptions(child, index, items);
    }
}

// 装備武器セル
class EquipWeaponCell extends Cell {
    constructor(listeners = null) {
        super();

        this.builder = {
            sword: new EquipmentCell("tbl_sword", "wsname", listeners),
            claymore: new EquipmentCell("tbl_claymore", "wmname", listeners),
            polearm: new EquipmentCell("tbl_polearm", "wpname", listeners),
            bow: new EquipmentCell("tbl_bow", "wbname", listeners),
            catalyst: new EquipmentCell("tbl_catalyst", "wcname", listeners)
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
        // 同じ組み合わせのキャラクターから装備する武器種を取得
        let tbl = document.getElementById("tbl_chara");
        let chara = tbl.rows[2 + index].cells[1];
        let weapon = CHARACTER[Cell.getSelectValue(chara)].weapon;
        return this.builder[weapon].load(cell, id, values);
    }

    save(cell) {
        // 保存するのは id ではなく index
        return String(cell.children[0].selectedIndex);
    }

    update(cell, items, weapon) {
        this.builder[weapon].update(cell, items);
    }
}

// チームパラメータ基底クラス
// 追加値をそのまま表示
class Param {
    constructor(param) {
        this.param = param;
    }

    set(cell, status) {
        cell.nextElementSibling.textContent = String(status[this.param]);
    }
}

// 基礎があるパラメータ向け
class BaseParam extends Param {
    constructor(param) {
        super(param);
    }

    set(cell, status) {
        let base = status["base_" + this.param];
        cell.textContent = base;

        let add = status[this.param];
        let buf = status[this.param + "_buf"];
        cell.nextElementSibling.textContent = this.toString(base, add, buf);
    }

    toString(base, add, buf) {
        return Math.floor((base * (buf * 10) / 1000) + add).toFixed();
    }
}

// 割合表記のパラメータ向け
class RateParam extends Param {
    constructor(param) {
        super(param);
    }

    set(cell, status) {
        cell.nextElementSibling.textContent = this.toString(status[this.param]);
    }

    toString(num) {
        return num.toFixed(1) + "%";
    }
}

// 元素ダメージバフパラメータ向け
class ElemBuffParam extends RateParam {
    constructor(param) {
        super(param);
    }

    set(cell, status) {
        cell.nextElementSibling.textContent = super.toString(status.elem_dmg + status[this.param]);
    }
}

// ダメージパラメータ向け
class DamageParam extends RateParam {
    constructor(param) {
        super(param);
    }

    set(cell, status) {
        cell.nextElementSibling.textContent = "+" + super.toString(status[this.param]);
    }
}