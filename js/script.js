"use strict"

const VERSION = "0.02";

// TODO: 多言語対応
const TABLE_TEXT = {
    chara: "キャラクター",
    sword: "片手剣",
    claymore: "両手剣",
    polearm: "長柄武器",
    bow: "弓",
    catalyst: "法器",
    flower: "生の花",
    feather: "死の羽",
    sands: "時の砂",
    goblet: "空の杯",
    circlet: "理の冠",
    equip: "装備",
    team: "チーム",
    bonus: "ボーナス",
    enemy: "敵",
    damage: "ダメージ",
};

// テーブル管理の基底クラス
class Table {
    static List = {};
    static Title = "";
    static Updated = false;

    // 全データの読み込み
    static loadData() {
        for (let id in Table.List) {
            Table.List[id]._load();
        }
    }

    // 全データの保存
    static saveData() {
        if (Table.Updated) {
            // タブ毎にデータをjsonで保存
            for (let id in Table.List) {
                Table.List[id]._save();
            }

            document.title = Table.Title;
            Table.Updated = false;
        }
    }

    // 全データのエクスポート
    static exportData() {
        Table.saveData();

        // バージョン情報を付加してひとまとめにする
        let data = { ver: VERSION };
        for (let id in Table.List) {
            let json = localStorage.getItem(id);
            if (!!json) {
                data[id] = JSON.parse(json);
            }
        }

        // downloadフォルダに保存
        let blob = new Blob([JSON.stringify(data)], { type: "application/json" });
        let link = document.createElement('a');
        document.body.appendChild(link);
        let url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'GenshinImpactDamage.json';
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    // インポート前の確認
    // TODO: 多言語対応
    static importConfirm() {
        let yes = confirm("すべてのタブの内容が上書きされます。よろしいですか？");
        if (yes) {
            document.getElementById("import").click();
        }
    }

    // 全データのインポート
    static importData() {
        let elem = document.getElementById("import");
        let file = elem.files[0];
        if (!!file) {
            // jsonファイル読み込み
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                let json = reader.result;
                if (!!json) {
                    let data = JSON.parse(json);
                    // TODO: ここでデータのチェックをする

                    // データの削除
                    for (let id in Table.List) {
                        Table.List[id].clear();
                    }

                    for (let id in Table.List) {
                        // 外部データをlocalStorageに保存
                        if (id in data) {
                            localStorage.setItem(id, JSON.stringify(data[id]));
                        }

                        Table.List[id]._load();
                    }
                }
                elem.value = ""; // 同じファイル名を続けてインポートできるように値をクリア
            };
        }
    }

    // データ削除前の確認
    // TODO: 多言語対応
    static clearConfirm(all) {
        if (all) {
            let yes = confirm("すべてのタブの内容が破棄されます。よろしいですか？");
            if (yes) {
                for (let id in Table.List) {
                    Table.List[id].clear();
                }

                document.title = Table.Title;
                Table.Updated = false;
            }
        } else {
            let elem = document.querySelector("input[name='TAB']:checked");
            let tbl = Table.List[elem.id.replace("tab_", "")];
            if (tbl.clearable) {
                let yes = confirm(`${tbl.text}タブの内容が破棄されます。よろしいですか？`);
                if (yes) {
                    tbl.clear();
                }
            }
        }
    }

    // 1行追加（htmlからの呼び出し版）
    static insertRow(id) {
        let tbl = Table.List[id];
        let html = tbl.html;
        tbl._insert(html, tbl._default(html));
        tbl.onChange();
    }

    // 削除確認
    // TODO: 多言語対応
    static removeConfirm(e) {
        let row = e.target.parentNode.parentNode;
        let html = row.parentNode.parentNode;
        let tbl = Table.List[html.id.replace("tbl_", "")];
        let id = e.target.id;
        let no = row.rowIndex - 1;
        if (tbl.removable(id)) {
            let yes = confirm(`No.${no}を削除します。よろしいですか？`);
            if (yes) {
                tbl._remove(html, id);
            }
        } else {
            window.alert(`No.${no}は装備中のため削除できません。`);
        }
    }

    // コンストラクタ
    constructor(id) {
        this.id = id;
        this.postfix = 0;
        this.builder = null;
        this.counter = 0;
    }

    // テーブル表示名取得
    get text() {
        return TABLE_TEXT[this.id];
    }

    // 識別子取得
    get rid() {
        ++this.postfix;
        return `${this.id}_${this.postfix}`;
    }

    // <table>取得
    get html() {
        return document.getElementById("tbl_" + this.id);
    }

    // データ消去可能かどうか
    get clearable() {
        return true;
    }

    // データ削除可能かどうか
    removable(id) {
        return !Table.List.equip.exists(id);
    }

    // データの再表示
    refresh() {
        return 0;
    }

    // データの削除
    clear() {
        let html = this.html;
        // rows[0,1]（キャプション）以外を削除
        for (let count = html.rows.length - 2; 0 < count; --count) {
            html.deleteRow(2);
        }

        localStorage.removeItem(this.id);
    }

    // データの保存
    _save() {
        let data = [];

        // htmlから解析
        let rows = this.html.rows;
        for (let ridx = 2, rlen = rows.length; ridx < rlen; ++ridx) { // tbl.rows[0,1]は見出し行
            let map = {};
            let cells = rows[ridx].cells;
            for (let cidx = 0, clen = cells.length; cidx < clen; ++cidx) {
                let cell = cells[cidx];
                let id = cell.id;
                if (id in this.builder) {
                    let value = this.builder[id].save(cell);
                    if (value !== null) {
                        map[id] = value;
                    }
                }
            }
            data.push(map);
        }

        localStorage.setItem(this.id, JSON.stringify(data));
    }

    // データの読込
    _load() {
        let json = localStorage.getItem(this.id);
        if (!!json) {
            let data = JSON.parse(json);

            // htmlに展開
            let html = this.html;
            let init = this._default(html);
            for (let i = 0, len = data.length; i < len; ++i) {
                // データのない項目を初期値で設定
                let line = data[i];
                for (let key in init) {
                    if (!(key in line)) {
                        line[key] = init[key];
                    }
                }

                this._insert(html, line);
            }
        }
    }

    // 既定値の取得
    _default(html) {
        let ret = {};
        let cells = html.rows[1].cells;
        for (let i = 0, len = cells.length; i < len; ++i) {
            let id = cells[i].id;
            if (id in this.builder) {
                let val = this.builder[id].initial;
                if (val != null) {
                    ret[id] = val;
                }
            }
        }
        return ret;
    }

    // 1行追加
    _insert(html, values) {
        let rid = this.rid;
        let row = html.insertRow();
        row.id = rid;

        // 見出し行のidからセルを生成
        let cap = html.rows[1].cells; // caption行は2行目
        for (let i = 0, len = cap.length; i < len; ++i) {
            let cel = row.insertCell();
            let id = cap[i].id;
            cel.id = id;

            // セル追加
            if (id in this.builder) {
                this.builder[id].load(cel, id, values);
            }
        }

        let add = row.insertCell();
        // 上移動ボタン追加
        // btn = document.createElement("button");
        // btn.id = rid;
        // btn.type = "button";
        // //btn.addEventListener("click", moveUp);
        // btn.appendChild(document.createTextNode("˄"));
        // add.appendChild(btn);

        // 下移動ボタン追加
        // btn = document.createElement("button");
        // btn.id = rid;
        // btn.type = "button";
        // //btn.addEventListener("click", moveDown);
        // btn.appendChild(document.createTextNode("˅"));
        // add.appendChild(btn);

        // 削除ボタン追加
        let btn = document.createElement("button");
        btn.id = rid;
        btn.type = "button";
        btn.addEventListener("click", Table.removeConfirm);
        btn.appendChild(document.createTextNode("-"));
        add.appendChild(btn);
    }

    // 1行削除
    _remove(html, id) {
        // データ削除
        html.querySelector("tr#" + id).remove();

        // indexの再設定
        let index = this.builder.index;
        let rows = html.rows;
        for (let i = 2, len = rows.length; i < len; ++i) {
            index.update(rows[i].cells[0]);
        }

        this.onChange();
    }

    // 値変更通知
    onChange(e = null) {
        ++this.counter;

        if (!Table.Updated) {
            Table.Updated = true
            document.title = "* " + Table.Title;
        }
    }

    // セルの更新
    _update(tr, id, ...args) {
        this.builder[id].update(tr.querySelector("td#" + id), ...args);
    }

    // セル値の取得
    _value(tr, id) {
        return this.builder[id].value(tr.querySelector("td#" + id));
    }
};

// キャラクターテーブル
class CharaTable extends Table {
    constructor() {
        super("chara");
        let listeners = { change: e => super.onChange(e) };
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(CHARACTER, "name", { change: e => this._changeName(e) }),
            conste: new RangeCell(0, 6, listeners),
            level: new AscensionLevelCell({ change: e => this._changeLevel(e) }),
            hp: new BaseParamCell(listeners),
            atk: new BaseParamCell(listeners),
            def: new BaseParamCell(listeners),
            special: new SpecialCell(),
            combat: new TalentCell(1, TALENT_LV_MAX, listeners),
            skill: new TalentCell(1, TALENT_LV_MAX, listeners),
            burst: new TalentCell(1, TALENT_LV_MAX, listeners),
        };
    }

    // 名前の変更
    _changeName(e) {
        // e.target == td#name.select
        let name = e.target.value;
        let tr = e.target.parentNode.parentNode;
        let level = super._value(tr, "level");

        // 基礎値の更新
        super._update(tr, "hp", name, level);
        super._update(tr, "atk", name, level);
        super._update(tr, "def", name, level);

        // 追加効果更新
        super._update(tr, "special", name, level);

        super.onChange(e);
    }

    // レベルの変更
    _changeLevel(e) {
        // e.target == td#level.select
        let level = e.target.value;
        let tr = e.target.parentNode.parentNode;
        let name = super._value(tr, "name");

        // 基礎値の更新
        super._update(tr, "hp", name, level);
        super._update(tr, "atk", name, level);
        super._update(tr, "def", name, level);

        // 追加効果更新
        super._update(tr, "special", name, level);

        super.onChange(e);
    }

    // ステータス適用
    status(tr, status) {
        let cells = Array.from(tr.cells);

        let name = this.builder.name.value(cells[1]);
        // status.conste = this.builder.conste.value(cells[2]);
        status.lv = this.builder.level.value(cells[3]);
        status.base_hp = this.builder.hp.value(cells[4]);
        status.base_atk = this.builder.atk.value(cells[5]);
        status.base_def = this.builder.def.value(cells[6]);
        let pair = this.builder.special.value(cells[7]);
        status[pair.key] = pair.value;
        status.talent.combat = this.builder.combat.value(cells[8]);
        status.talent.skill = this.builder.skill.value(cells[9]);
        status.talent.burst = this.builder.burst.value(cells[10]);

        return CHARACTER[name];
    }
};

// 武器テーブル基底
class WeaponTable extends Table {
    // 名前の変更
    _changeName(e) {
        // e.target == td#name.select
        let key = e.target.value;
        let tr = e.target.parentNode.parentNode;

        // 追加効果変更
        super._update(tr, "second", key);

        super.onChange(e);
    }

    // ステータス適用
    status(tr, status) {
        let cells = Array.from(tr.cells);

        let name = this.builder.name.value(cells[1]);
        let rank = this.builder.rank.value(cells[3]);
        status.base_atk += this.builder.atk.value(cells[4]);
        let pair = this.builder.second.value(cells[5]);
        if (pair.key !== "other") {
            status[pair.key] += pair.value;
        }

        return { item: WEAPON_LIST[this.id][name], rank: rank - 1 };
    }
};

// 片手剣テーブル
class SwordTable extends WeaponTable {
    constructor() {
        super("sword");
        let listeners = { change: e => super.onChange(e) };
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(SWORD_LIST, "name", { change: e => super._changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new DictBonusCell("name", SWORD_LIST, "second", listeners),
        };
    }
};

// 両手剣テーブル
class ClaymoreTable extends WeaponTable {
    constructor() {
        super("claymore");
        let listeners = { change: e => super.onChange(e) };
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(CLAYMORE_LIST, "name", { change: e => super._changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new DictBonusCell("name", CLAYMORE_LIST, "second", listeners),
        };
    }
};

// 長柄武器テーブル
class PolearmTable extends WeaponTable {
    constructor() {
        super("polearm");
        let listeners = { change: e => super.onChange(e) };
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(POLEARM_LIST, "name", { change: e => super._changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new DictBonusCell("name", POLEARM_LIST, "second", listeners),
        };
    }
};

// 弓テーブル
class BowTable extends WeaponTable {
    constructor() {
        super("bow");
        let listeners = { change: e => super.onChange(e) };
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(BOW_LIST, "name", { change: e => super._changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new DictBonusCell("name", BOW_LIST, "second", listeners),
        };
    }
};

// 法器テーブル
class CatalystTable extends WeaponTable {
    constructor() {
        super("catalyst");
        let listeners = { change: e => super.onChange(e) };
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(CATALYST_LIST, "name", { change: e => super._changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new DictBonusCell("name", CATALYST_LIST, "second", listeners),
        };
    }
};

// 聖遺物テーブル基底
class ArtifactTable extends Table {
    // データの読込
    _load() {
        super._load();

        // 読み込み時のスコア表示
        let tr = this.html.rows[1];
        while (true) {
            tr = tr.nextElementSibling;
            if (!tr) break;
            this._updateScore(tr, super._value(tr, "star"), super._value(tr, "level"));
        }
    }

    // ☆の変更
    _changeStar(e) {
        // e.target == td#star.select
        let star = parseInt(e.target.value);
        let tr = e.target.parentNode.parentNode;

        // 聖遺物レベルの変更
        let cell = tr.querySelector("td#level");
        this.builder.level.update(cell, star);
        let level = this.builder.level.value(cell);

        // 聖遺物メイン効果の更新
        super._update(tr, "main", star, level);

        // 聖遺物スコアの更新
        this._updateScore(tr, star, level);

        super.onChange(e);
    }

    // レベルの変更
    _changeLevel(e) {
        // e.target == td#level.select
        let level = parseInt(e.target.value);
        let tr = e.target.parentNode.parentNode;
        let star = super._value(tr, "star");

        // 聖遺物メイン効果の更新
        super._update(tr, "main", star, level);

        // 聖遺物スコアの更新
        this._updateScore(tr, star, level);

        super.onChange(e);
    }

    // メイン効果の変更
    _changeMain(e) {
        // e.target == td#main.select
        let td = e.target.parentNode;
        let tr = td.parentNode;

        // 聖遺物メイン効果の更新
        this.builder.main.update(td, super._value(tr, "star"), super._value(tr, "level"));

        super.onChange(e);
    }

    // サブ効果の変更
    _changeSub(e) {
        // e.target == td#main.[select|input]
        let tr = e.target.parentNode.parentNode;

        // 聖遺物スコアの更新
        this._updateScore(tr, super._value(tr, "star"), super._value(tr, "level"));

        super.onChange(e);
    }

    // スコアの更新
    _updateScore(tr, star, level) {
        let cell = tr.querySelector("td#name");
        cell.className = "score"; // TODO: とりあえずここで設定

        // select要素以外を削除
        while (cell.firstChild != cell.lastChild) {
            cell.lastChild.remove();
        }

        // ☆3以下はスコア表示しない
        if (star < 4) return;

        let sub = [
            super._value(tr, "sub1"),
            super._value(tr, "sub2"),
            super._value(tr, "sub3"),
            super._value(tr, "sub4"),
        ];
        let score = [0, 0, 0, 0];
        let total = 0;
        let limit = 10 + Math.floor(level / 4) * 10;

        for (let i = 0; i < 4; ++i) {
            let param = getArtifactParam(star, level, sub[i].key);
            if (!!param) {
                let value = Math.round(sub[i].value / param.substep);
                score[i] = value;
                total += value;
            }
        }
        limit += ((star === 4) ? 20 : 30);

        cell.appendChild(document.createElement("br"));
        cell.appendChild(document.createTextNode(`${total}/${limit} (${score.join(",")})`));
    }

    // ステータス適用
    status(tr, status) {
        let cells = Array.from(tr.cells);
        let name = this.builder.name.value(cells[1]);

        // メイン効果追加
        let pair = this.builder.main.value(cells[4]);
        status[pair.key] += pair.value;

        // サブ効果追加
        for (let i = 1; i <= 4; ++i) {
            pair = this.builder["sub" + i].value(cells[4 + i]);
            if (pair.key !== "other") {
                status[pair.key] += pair.value;
            }
        }

        return name;
    }
};

// 生の花テーブル
class FlowerTable extends ArtifactTable {
    constructor() {
        super("flower");
        let listeners = { change: e => super._changeSub(e) };
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(FLOWER_LIST, { change: e => super.onChange(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super._changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super._changeLevel(e) }),
            main: new SingleBonusCell("hp", { change: e => super.onChange(e) }),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        };
    }
};

// 死の羽テーブル
class FeatherTable extends ArtifactTable {
    constructor() {
        super("feather");
        let listeners = { change: e => super._changeSub(e) };
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(FEATHER_LIST, { change: e => super._changeName(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super._changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super._changeLevel(e) }),
            main: new SingleBonusCell("atk", { change: e => super.onChange(e) }),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        };
    }
};

// 時の砂テーブル
class SandsTable extends ArtifactTable {
    constructor() {
        super("sands");
        let listeners = { change: e => super._changeSub(e) };
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(SANDS_LIST, { change: e => super._changeName(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super._changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super._changeLevel(e) }),
            main: new MultiBonusCell(ARTIFACT_SANDS, { change: e => super._changeMain(e) }),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        };
    }
};

// 空の杯テーブル
class GobletTable extends ArtifactTable {
    constructor() {
        super("goblet");
        let listeners = { change: e => super._changeSub(e) };
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(GOBLET_LIST, { change: e => super._changeName(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super._changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super._changeLevel(e) }),
            main: new MultiBonusCell(ARTIFACT_GOBLET, { change: e => super._changeMain(e) }),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        };
    }
};

// 理の冠テーブル
class CircletTable extends ArtifactTable {
    constructor() {
        super("circlet");
        let listeners = { change: e => super._changeSub(e) };
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(CIRCLET_LIST, { change: e => super._changeName(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super._changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super._changeLevel(e) }),
            main: new MultiBonusCell(ARTIFACT_CIRCLET, { change: e => super._changeMain(e) }),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        };
    }
};

// 装備テーブル
class EquipmentTable extends Table {
    static Items = ["chara", "sword", "claymore", "polearm", "bow", "catalyst", "flower", "feather", "sands", "goblet", "circlet"];
    static Weapons = ["sword", "claymore", "polearm", "bow", "catalyst"];

    // TODO: 多言語対応
    static checkInsert() {
        let require = Table.List.equip._requireItem();
        if (0 < require.length) {
            window.alert("以下の装備を整えてください。\n・" + require.join("\n・"));
        } else {
            Table.insertRow("equip");
        }
    }

    static IsWeapon(item) {
        return 0 <= EquipmentTable.Weapons.indexOf(item);
    }

    constructor() {
        super("equip");
        let listeners = { change: e => super.onChange(e) };
        super.builder = {
            index: new IndexCell(),
            chara: new EquipmentCell("chara", { change: e => this._changeChara(e) }),
            weapon: new EquipWeaponCell(listeners),
            flower: new EquipmentCell("flower", listeners),
            feather: new EquipmentCell("feather", listeners),
            sands: new EquipmentCell("sands", listeners),
            goblet: new EquipmentCell("goblet", listeners),
            circlet: new EquipmentCell("circlet", listeners),
        };
        this.previous = {};
        for (let i = 0; i < EquipmentTable.Items.length; ++i) {
            this.previous[EquipmentTable.Items[i]] = 0;
        }
    }

    // データ削除可能かどうか
    removable(id) {
        return true;
    }

    // データの再表示
    refresh() {
        // 更新情報の取得
        let updated = false;
        let tables = {};
        for (let i = 0; i < EquipmentTable.Items.length; ++i) {
            let item = EquipmentTable.Items[i];
            let info = (Table.List[item].counter !== this.previous[item]);
            updated = (updated || info);
            tables[item] = { updated: info };
        }

        if (updated) {
            // アイテムリストを取得
            for (let item in tables) {
                let info = tables[item];
                if (info.updated) {
                    if (EquipmentTable.IsWeapon(item)) {
                        info["items"] = this.builder.weapon.items(item);
                    } else {
                        info["items"] = this.builder[item].items;
                    }
                }
            }

            // データ再表示
            let rows = Array.from(this.html.rows);
            for (let ridx = 2, rlen = rows.length; ridx < rlen; ++ridx) {
                let cells = Array.from(rows[ridx].cells);
                for (let cidx = 1, clen = cells.length; cidx < clen; ++cidx) {
                    let cell = cells[cidx];
                    let id = cell.id;
                    if (id === "weapon") {
                        let weapon = cell.children[0].value.split("_")[0];
                        if (tables[weapon].updated) {
                            this.builder.weapon.update(cell, tables[weapon].items, weapon);
                        }
                    } else if (!!id) {
                        if (tables[id].updated) {
                            this.builder[id].update(cell, tables[id].items);
                        }
                    }
                }
            }

            // 前回値の更新
            for (let item in tables) {
                this.previous[item] = tables[item].counter;
            }
            this.onChange();
        }

        return this.counter;
    }

    // データの削除
    clear() {
        super.clear();

        // カウンターのリセット
        for (let i = 0; i < EquipmentTable.Items.length; ++i) {
            let item = EquipmentTable.Items[i];
            this.previous[item] = Table.List[item].counter;
        }
    }

    // 指定したアイテムが使用されているかどうか
    exists(id) {
        let type = id.split("_")[0];
        let html = this.html;
        let items = null;
        if (EquipmentTable.IsWeapon(type)) {
            items = Array.from(html.querySelectorAll(`td#weapon select`));
        } else {
            items = Array.from(html.querySelectorAll(`td#${type} select`));
        }
        for (let i = 0; i < items.length; ++i) {
            if (items[i].value === id) {
                return true;
            }
        }
        return false;
    }

    // キャラクターの列挙
    enumerate() {
        // 装備テーブルから{equip rid, キャラ名}のペアを生成
        let equips = Array.from(document.querySelectorAll("table#tbl_equip td#chara"));
        let values = [];
        for (let i = 0, len = equips.length; i < len; ++i) {
            let equip = equips[i];
            let select = equip.children[0];
            let option = select.options[select.selectedIndex];
            values[i] = { id: equip.parentNode.id, name: option.label.split(".")[1] };
        }
        return values;
    }

    // 必要なアイテムの確認
    _requireItem() {
        const items = EquipmentTable.Items;
        let require = [];
        for (let i = 0; i < items.length; ++i) {
            if (!document.querySelector(`table#tbl_${items[i]} td#name`)) {
                require.push(TABLE_TEXT[items[i]]);
            }
        }
        return require;
    }

    // キャラの変更
    _changeChara(e) {
        // e.target == td#chara.select
        let value = e.target.value;

        // 変更したキャラクターの武器種を変更
        let td = document.querySelector(`table#tbl_chara tr#${value} td#name`);
        let weapon = CHARACTER[td.children[0].value].weapon;
        let builder = this.builder.weapon;
        let items = builder.items(weapon);
        let cell = e.target.parentNode.nextElementSibling;
        builder.update(cell, items, weapon);

        super.onChange(e);
    }
};

// テーブル更新の橋渡し
class TableBridge {
    constructor(parent) {
        this.counter = 0;
        this.parent = parent;
    }

    reset() {
        this.counter = this.parent.counter;
    }

    refresh(owner) {
        let counter = this.parent.refresh();
        if (this.counter !== counter) {
            this.counter = counter;
            owner.onRefresh();
            owner.onChange();
        }
        return owner.counter;
    }
};

// チームテーブル
class TeamTable extends Table {
    // メンバー変更
    static changeMember(no, elem) {
        Table.List.team._assign(no, elem);
    }

    // コンストラクタ
    constructor() {
        super("team");
        super.builder = {
            hp: new BaseParam("hp"),
            atk: new BaseParam("atk"),
            def: new BaseParam("def"),
            elem: new Param("elem"),
            cri_rate: new RateParam("cri_rate"),
            cri_dmg: new RateParam("cri_dmg"),
            en_rec: new RateParam("en_rec"),
            pyro_dmg: new ElemBuffParam("pyro_dmg"),
            hydro_dmg: new ElemBuffParam("hydro_dmg"),
            elect_dmg: new ElemBuffParam("elect_dmg"),
            anemo_dmg: new ElemBuffParam("anemo_dmg"),
            cryo_dmg: new ElemBuffParam("cryo_dmg"),
            geo_dmg: new ElemBuffParam("geo_dmg"),
            phys_dmg: new ElemBuffParam("phys_dmg"),
            normal_dmg: new DamageParam("normal_dmg"),
            heavy_dmg: new DamageParam("heavy_dmg"),
            heavy_cri: new DamageParam("heavy_cri"),
            skill_dmg: new DamageParam("skill_dmg"),
            burst_dmg: new DamageParam("burst_dmg"),
            any_dmg: new DamageParam("any_dmg"),
            melt_dmg: new ElemReactParam("melt_dmg"),
            swirl_dmg: new ElemReactParam("swirl_dmg"),
            echarge_dmg: new ElemReactParam("echarge_dmg"),
            shutter_dmg: new ElemReactParam("shutter_dmg"),
            conduct_dmg: new ElemReactParam("conduct_dmg"),
            vaporize_dmg: new ElemReactParam("vaporize_dmg"),
            ovreload_dmg: new ElemReactParam("ovreload_dmg"),
        };
        this.bridge = new TableBridge(Table.List.equip);
        this.members = [null, null, null, null];
    }

    // データ消去可能かどうか
    get clearable() {
        return false;
    }

    // データの保存
    _save() {
        // 何もしない
    }

    // データの読込
    _load() {
        this.onRefresh();
    }

    // データの削除
    clear() {
        this.bridge.reset();
        this.members = this.members.fill(null);

        let html = this.html;
        let cells = Array.from(html.rows[0].querySelectorAll("td"));
        for (let i = 0; i < 4; ++i) {
            removeChildren(cells[i].children[0]);
        }
        this._build(html);
    }

    // データの再表示
    refresh() {
        return this.bridge.refresh(this);
    }

    // データの再表示
    onRefresh() {
        Table.List.bonus.reset();

        // メモリ解放しておく
        this.members = this.members.fill(null);

        // 装備テーブルから{tr#id, キャラ名}のペアを生成
        let list = Table.List.equip.enumerate();

        // チーム選択のselect更新
        let html = this.html;
        let cells = Array.from(html.rows[0].querySelectorAll("td"));
        for (let no = 0; no < 4; ++no) {
            let select = cells[no].children[0];
            let selected = select.value;

            // メンバーoptionの更新
            removeChildren(select);
            for (let i = 0; i < list.length; ++i) {
                let item = list[i];
                let opt = document.createElement("option");
                opt.value = item.id;
                opt.label = `${i + 1}.${item.name}`;
                opt.selected = (selected === item.id);
                select.appendChild(opt);
            }

            if (0 <= select.selectedIndex) {
                this.members[no] = this._member(select.value);
            }
        }
        this._build(html);

        Table.List.bonus.attach(this.members);
        Table.List.damage.list();
    }

    // メンバーデータの設定
    _build(html) {
        let rows = html.rows;
        for (let i = 2, len = rows.length; i < len; ++i) {
            let row = rows[i];
            let param = row.id;
            if (param in this.builder) {
                let cells = row.cells;
                let builder = this.builder[param];
                for (let no = 0; no < 4; ++no) {
                    builder.set(cells[1 + no * 2], this.members[no]);
                }
            }
        }
    }

    // メンバー取得
    _member(cid) {
        let builder = Table.List.equip.builder;
        let equips = document.querySelector("table#tbl_equip tr#" + cid).cells;
        let status = new Status(this.rid);

        // キャラクターのステータスチェック
        let chara = Table.List.chara.status(builder.chara.value(equips[1]), status);
        status.chara = chara;

        let bonuses = Table.List.bonus;
        // TODO: 天賦によるボーナス追加
        // TODO: 星座によるボーナス追加

        // 武器のステータスチェック
        let weapon = Table.List[chara.weapon].status(builder.weapon.value(equips[2], chara.weapon), status);
        // 武器ボーナス追加
        if ("passive" in weapon.item) {
            bonuses.weapon(status, weapon.item.passive, weapon.rank);
        }

        // 聖遺物のステータスチェック
        let items = [
            Table.List.flower.status(builder.flower.value(equips[3]), status),
            Table.List.feather.status(builder.feather.value(equips[4]), status),
            Table.List.sands.status(builder.sands.value(equips[5]), status),
            Table.List.goblet.status(builder.goblet.value(equips[6]), status),
            Table.List.circlet.status(builder.circlet.value(equips[7]), status),
        ];
        // 聖遺物の組み合わせボーナス追加
        bonuses.artifact(status, items);

        return status;
    }

    // メンバー登録
    _assign(no, elem) {
        Table.List.bonus.detach(this.members[no]);

        this.members[no] = null; // メモリ解放しておく
        this.members[no] = this._member(elem.value);
        this._build(this.html);

        Table.List.bonus.attach(this.members);
        Table.List.damage.list();

        super.onChange();
    }
};

// ボーナステーブル
class BonusTable extends Table {
    // コンストラクタ
    constructor() {
        super("bonus");
        this.bridge = new TableBridge(Table.List.team);
        this.items = [];
    }

    // データ消去可能かどうか
    get clearable() {
        return false;
    }

    // データの保存
    _save() {
        // 何もしない
    }

    // データの読込
    _load() {
        this.onRefresh();
    }

    // データの削除
    clear() {
        this.bridge.reset();
        this.reset();
        this.onRefresh();
    }

    // データの再表示
    refresh() {
        return this.bridge.refresh(this);
    }

    // データの再表示
    onRefresh() {
        let rows = this.html.rows;
        let members = Table.List.team.members;

        for (let no = 0; no < 4; ++no) {
            let status = members[no];
            let cells = rows[1 + no].cells;
            if (!status) {
                cells[0].textContent = "-";
                cells[1].innerHTML = "";
            } else {
                // キャラクター名更新
                cells[0].textContent = status.chara.name;

                // ボーナス一覧更新
                let text = ""
                let bonuses = status.bonus;
                for (let i = 0, len = bonuses.length; i < len; ++i) {
                    let bonus = bonuses[i];
                    if (bonus.apply) {
                        text += `<span style="color:silver">${bonus.toString()}</span>`;
                    } else {
                        text += bonus.toString();
                    }
                    text += "<br>";
                }
                cells[1].innerHTML = text;
            }
        }
    }

    // ボーナスの全削除
    reset() {
        this.items = [];
    }

    // 武器ボーナス追加
    weapon(status, bonuses, rank) {
        if (Array.isArray(bonuses)) {
            for (let i = 0; i < bonuses.length; ++i) {
                let bonus = bonuses[i];
                this._append(status, bonus.value[rank], bonus, LABEL_TEXT.weapon);
            }
        } else {
            this._append(status, bonuses.value[rank], bonuses, LABEL_TEXT.weapon);
        }
    }

    // 聖遺物ボーナス追加
    artifact(status, items) {
        items.sort();

        let first = 0;
        while (first < 5) {
            let item = items[first];
            let last = items.lastIndexOf(item) + 1;
            if (item in ARTIFACT_SET) {
                let same = last - first;
                let artifact = ARTIFACT_SET[item];
                // 2セットの効果追加
                if ((2 <= same) && ("set2" in artifact)) {
                    let bonus = artifact.set2;
                    this._append(status, bonus.value, bonus, LABEL_TEXT.artifact);
                }
                // 4セットの効果追加
                if ((4 <= same) && ("set4" in artifact)) {
                    let bonuses = artifact.set4;
                    if (Array.isArray(bonuses)) {
                        for (let i = 0; i < bonuses.length; ++i) {
                            let bonus = bonuses[i];
                            this._append(status, bonus.value, bonus, LABEL_TEXT.artifact);
                        }
                    } else {
                        this._append(status, bonuses.value, bonuses, LABEL_TEXT.artifact);
                    }
                }
            }
            first = last;
        }
    }

    // ボーナス追加
    _append(status, value, others, source) {
        if (("target" in others) && (others.target !== "self")) {
            // TODO: target="next" の対応は保留
            let bonus = new Bonus(others.items, value, others, source);
            bonus.id = status.id;
            this.items.push(bonus);
        } else {
            status.append(new Bonus(others.items, value, others, source));
        }
    }

    // チームボーナス追加
    attach(members) {
        // TODO: チームボーナス追加
    }

    // チームボーナス削除
    detach(status) {
        if (!status) return;

        // 削除したメンバーのボーナスを全削除
        let bonuses = this.items.filter(bonus => bonus.id !== status.id);

        // TODO: チームボーナス削除
        this.items = bonuses.filter(bonus => bonus.id !== "team");
    }
};

// 敵テーブル
class EnemyTable extends Table {
    // 敵キャラ変更
    static changeList(elem) {
        let tbl = Table.List.enemy;
        let html = tbl.html;
        tbl._build(html, elem.value);
        tbl._level(html.querySelector("input#enemy_level"));

        Table.List.damage.calc();
    }

    // レベル変更
    static changeLevel(elem) {
        Table.List.enemy._level(elem);
        Table.List.damage.calc();
    }

    // コンストラクタ
    constructor() {
        super("enemy");
        this.target = null;
    }

    // データ消去可能かどうか
    get clearable() {
        return false;
    }

    // データの保存
    _save() {
        // 何もしない
    }

    // データの読込
    _load() {
        let html = this.html;
        let select = html.querySelector("select#enemy_list");
        for (let key in ENEMY_LIST) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.label = ENEMY_LIST[key].name;
            select.appendChild(opt);
        }

        this._build(html, select.value);
    }

    // データの削除
    clear() {
        this.defence(null);
    }

    // 敵データの設定
    _build(html, name) {
        this.target = new Enemy(name);

        // 各元素の耐性更新
        let row = html.rows[2];
        while (!!row.id) {
            let type = row.id.replace("resist_", "");
            let cells = row.cells;
            let resist = this.target.resist[type];
            if (resist === Infinity) {
                cells[1].textContent = LABEL_TEXT.invalid;
            } else {
                cells[1].textContent = resist + "%";
            }
            cells[2].textContent = (this.target.resistance(type) * 100).toFixed(1) + "%";

            row = row.nextElementSibling;
        }
    }

    // レベル設定
    _level(elem) {
        this.target.level = parseInt(elem.value);
        this.defence(Table.List.damage.member);
    }

    // 防御力設定
    defence(status) {
        let cell = this.html.querySelector("tbody").lastElementChild.cells[2];
        let level = !!status ? status.level : 0;
        cell.textContent = (this.target.defence(level) * 100).toFixed(1) + "%";
    }
};

// ダメージテーブル
class DamageTable extends Table {
    // ダメージタイプ変更
    static changeType(elem) {
        let tbl = Table.List.damage;
        tbl._type(tbl.html, elem, tbl.member);
    }

    // メンバー変更
    static changeMember() {
        Table.List.damage.onRefresh();
    }

    // コンストラクタ
    constructor() {
        super("damage");
        this.bridge = new TableBridge(Table.List.team);
    }

    // データ消去可能かどうか
    get clearable() {
        return false;
    }

    // ダメージキャラ取得
    get member() {
        let no = this.html.querySelector("select#member_list").selectedIndex;
        if (no !== -1) {
            return Table.List.team.members[no];
        }
        return null;
    }

    // データの保存
    _save() {
        // 何もしない
    }

    // データの読込
    _load() {
        this.onRefresh();
    }

    // データの削除
    clear() {
        this.bridge.reset();
        this.list();
        this.onRefresh();
    }

    // メンバーリストの変更
    list() {
        let html = this.html;
        let select = html.querySelector("select#member_list");
        let index = select.selectedIndex;
        removeChildren(select);

        let members = Table.List.team.members;
        for (let i = 0; i < 4; ++i) {
            if (!!members[i]) {
                let opt = document.createElement("option");
                opt.value = i;
                opt.label = members[i].chara.name;
                opt.selected = (index === i);
                select.appendChild(opt);
            }
        }
    }

    // データの再表示
    refresh() {
        return this.bridge.refresh(this);
    }

    // データの再表示
    onRefresh() {
        let status = this.member;
        Table.List.enemy.defence(status);

        // キャプション行以外を削除
        let html = this.html;
        for (let len = html.rows.length; 2 < len; --len) {
            html.deleteRow(2);
        }

        // ダメージタイプ非表示
        let damageType = html.querySelector("select#damage_type");
        damageType.className = "hide";

        if (!status) {
            // キャラレベルと攻撃力を0クリア
            let row = html.rows[0];
            row.cells[0].lastChild.data = "Lv.0";
            let cell = row.nextElementSibling.cells[2];
            cell.textContent = "0";
            cell.nextElementSibling.textContent = "0.0%";
            return;
        }

        // キャラレベル設定
        let rows = html.rows;
        rows[0].cells[0].lastChild.data = "Lv." + status.level;

        // キャラ攻撃力設定
        let cells = rows[1].cells;
        let critical = status.critical();
        cells[2].textContent = status.attack.toFixed();
        cells[3].textContent = `${critical.damage.toFixed(1)}%(${critical.rate.toFixed(1)}%)`;

        let buildRow = (type) => {
            let level = status.talent[type];

            // キャプション行追加
            let row = html.insertRow();
            let cel = document.createElement("th");
            cel.colSpan = 4;
            cel.textContent = `${LABEL_TEXT[type]} : Lv.${level}`;
            row.appendChild(cel);

            let combat = status.chara[type];
            for (let i = 0, len = combat.length; i < len; ++i) {
                let attr = new Attribute(combat[i], level);
                // ダメージタイプ
                let className = attr.elem;
                if (className === "switch") {
                    className = "phys";
                    damageType.className = ""; // ダメージタイプ表示
                }

                row = html.insertRow();

                // 名前セル
                cel = document.createElement("th");
                cel.textContent = attr.name;
                row.appendChild(cel);

                // 倍率セル
                cel = document.createElement("td");
                cel.className = className;
                cel.textContent = attr.toString(value => {
                    if (value < 100) {
                        return value.toFixed(1) + "%";
                    }
                    return value.toFixed() + "%";
                });
                row.appendChild(cel);

                // ダメージセル
                cel = document.createElement("td");
                cel.className = className;
                row.appendChild(cel);

                // 会心セル
                cel = document.createElement("td");
                cel.className = className;
                row.appendChild(cel);
            }
        };

        buildRow("combat");
        buildRow("skill");
        buildRow("burst");

        // 属性切替が必要
        if (!damageType.className) {
            this._type(html, damageType, status);
        } else {
            this._calc(html, status);
        }
    }

    // ダメージタイプ設定
    _type(html, elem, status) {
        if (!status) return;
        let chara = status.chara;

        // ダメージタイプ切替
        let className = elem.value;
        if (className === "elem") {
            className = chara.element;
        }

        let row = html.rows[2];
        let rebuildRow = (type) => {
            row = row.nextElementSibling; // キャプション行スキップ

            let combat = chara[type];
            for (let i = 0, len = combat.length; i < len; ++i) {
                // 元素付与されるものはセル色変更
                if (combat[i].elem === "switch") {
                    let cells = row.cells;
                    cells[1].className = className;
                    cells[2].className = className;
                    cells[3].className = className;
                }
                row = row.nextElementSibling;
            }
        };

        rebuildRow("combat");
        rebuildRow("skill");
        rebuildRow("burst");

        this._calc(html, status);
    }

    // ダメージ計算
    _calc(html, status) {
        if (!status) return;

        let row = html.rows[2];
        let enemy = Table.List.enemy.target;

        let attackPower = status.attack;
        let enemyDefence = enemy.defence(status.level);

        let calcDamage = (type) => {
            row = row.nextElementSibling; // キャプション行スキップ

            let level = status.talent[type];
            let combat = status.chara[type];
            for (let i = 0, len = combat.length; i < len; ++i) {
                let cell = row.cells[2];
                let elem = cell.className;
                let attr = new Attribute(combat[i], level);

                // 各種倍率
                let elementBonus = status.elemental(elem);
                let combatBonus = status.damage(attr.type);
                let enemyResist = enemy.resistance(elem);
                let bonusDamage = (100 + elementBonus + combatBonus + status.any_dmg) / 100;
                let totalScale = attackPower * enemyDefence * enemyResist * bonusDamage;

                // 最終ダメージ
                cell.textContent = attr.toString(value => (totalScale * value / 100).toFixed());
                cell = cell.nextElementSibling;

                // 会心ダメージ
                let critical = status.critical(attr.type);
                totalScale *= critical.damage / 100;
                let text = attr.toString(value => (totalScale * value / 100).toFixed());
                // 重撃会心率が異なる場合は特別表示
                if ((attr.type === "heavy") && (0 < status.heavy_cri)) {
                    text = `${text} (${critical.rate}%)`;
                }
                cell.textContent = text;

                row = row.nextElementSibling;
            }
        };

        calcDamage("combat");
        calcDamage("skill");
        calcDamage("burst");
    }

    // ダメージ計算（外部公開向け）
    calc() {
        this._calc(this.html, this.member);
    }
};

window.onload = () => {
    Table.Title = document.title;
    Table.List["chara"] = new CharaTable();
    Table.List["sword"] = new SwordTable();
    Table.List["claymore"] = new ClaymoreTable();
    Table.List["polearm"] = new PolearmTable();
    Table.List["bow"] = new BowTable();
    Table.List["catalyst"] = new CatalystTable();
    Table.List["flower"] = new FlowerTable();
    Table.List["feather"] = new FeatherTable();
    Table.List["sands"] = new SandsTable();
    Table.List["goblet"] = new GobletTable();
    Table.List["circlet"] = new CircletTable();
    Table.List["equip"] = new EquipmentTable();
    Table.List["team"] = new TeamTable();
    Table.List["bonus"] = new BonusTable();
    Table.List["enemy"] = new EnemyTable();
    Table.List["damage"] = new DamageTable();
    Table.loadData();
};

function refreshTable(name) {
    Table.List[name].refresh();
}