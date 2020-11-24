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
    equip: "装備"
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
                        Table.List[id]._clear();
                    }

                    // 外部データをlocalStorageに保存
                    for (let id in Table.List) {
                        if (id in data) {
                            localStorage.setItem(id, JSON.stringify(data[id]));
                            Table.List[id]._load();
                        }
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
                    Table.List[id]._clear();
                }

                document.title = Table.Title;
                Table.Updated = false;
            }
        } else {
            let elem = document.querySelector("input[name='TAB']:checked");
            let tbl = Table.List[elem.id.replace("tab_", "")];
            let yes = confirm(`${tbl.text}タブの内容が破棄されます。よろしいですか？`);
            if (yes) {
                tbl._clear();
            }
        }
    }

    // 1行追加（htmlからの呼び出し版）
    static insertRow(id) {
        let tbl = Table.List[id];
        let html = tbl.html;
        tbl._insert(html, tbl._default(html));
        tbl._change(null);
    }

    // 削除確認
    // TODO: 多言語対応
    static removeConfirm(e) {
        let row = e.target.parentNode.parentNode;
        let yes = confirm(`No.${row.rowIndex - 1}を削除します。よろしいですか？`);
        if (yes) {
            let html = row.parentNode.parentNode;
            let tbl = Table.List[html.id.replace("tbl_", "")];
            tbl._remove(html, e.target.id);
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

    // 更新があるか
    updated(counter) {
        return this.counter != counter;
    }

    // データの削除
    _clear() {
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
                    if (value != null) {
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
        html.querySelector("tr#" + id).remove();

        // indexの再設定
        let index = this.builder.index;
        let rows = html.rows;
        for (let i = 2, len = rows.length; i < len; ++i) {
            index.update(rows[i].cells[0]);
        }

        // TODO: 削除したものを使用している他タブの要素をどうする？

        this._change(null);
    }

    // 値変更通知
    _change(e) {
        ++this.counter;

        if (!Table.Updated) {
            Table.Updated = true
            document.title = "* " + Table.Title;
        }
    }
};

// キャラクターテーブル
class CharaTable extends Table {
    constructor() {
        super("chara");
        let listeners = { change: e => super._change(e) };
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(CHARACTER, "name", { change: e => this._changeName(e) }),
            level: new AscensionLevelCell(listeners),
            hp: new IntCell(listeners),
            atk: new IntCell(listeners),
            def: new IntCell(listeners),
            special: new DictBonusCell("name", CHARACTER, "special", listeners),
            combat: new TalentCell(1, TALENT_LV_MAX, listeners),
            skill: new TalentCell(1, TALENT_LV_MAX, listeners),
            burst: new TalentCell(1, TALENT_LV_MAX, listeners),
        };
    }

    // 名前の変更
    _changeName(e) {
        // e.target == td#name.select
        let key = e.target.value;
        let tr = e.target.parentNode.parentNode;

        // 追加効果変更
        this.builder.special.update(tr.querySelector("td#special"), key);

        // 装備タブ更新
        Table.List.equip.updateChara(key, tr.id);

        super._change(e);
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
        this.builder.second.update(tr.querySelector("td#second"), key);

        // 装備タブ更新
        Table.List.equip.updateWeapon(this.id);

        super._change(e);
    }
}

// 片手剣テーブル
class SwordTable extends WeaponTable {
    constructor() {
        super("sword");
        let listeners = { change: e => super._change(e) };
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
        let listeners = { change: e => super._change(e) };
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
        let listeners = { change: e => super._change(e) };
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
        let listeners = { change: e => super._change(e) };
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
        let listeners = { change: e => super._change(e) };
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
    // 名前の変更
    _changeName(e) {
        Table.List.equip.updateArtifact(this.id);

        super._change(e);
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
        this.builder.main.update(tr.querySelector("td#main"), star, level);

        super._change(e);
    }

    // レベルの変更
    _changeLevel(e) {
        // e.target == td#level.select
        let level = parseInt(e.target.value);
        let tr = e.target.parentNode.parentNode;

        let star = this.builder.star.value(tr.querySelector("td#star"));

        // 聖遺物メイン効果の更新
        this.builder.main.update(tr.querySelector("td#main"), star, level);

        super._change(e);
    }

    // メイン効果の変更
    _changeMain(e) {
        // e.target == td#main.select
        let td = e.target.parentNode;
        let tr = td.parentNode;

        let star = this.builder.star.value(tr.querySelector("td#star"));
        let level = this.builder.level.value(tr.querySelector("td#level"));

        // 聖遺物メイン効果の更新
        this.builder.main.update(td, star, level);

        super._change(e);
    }
};

// 生の花テーブル
class FlowerTable extends ArtifactTable {
    constructor() {
        super("flower");
        let listeners = { change: e => super._change(e) };
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(FLOWER_LIST, { change: e => super._changeName(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super._changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super._changeLevel(e) }),
            main: new SingleBonusCell("hp", listeners),
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
        let listeners = { change: e => super._change(e) };
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(FEATHER_LIST, { change: e => super._changeName(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super._changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super._changeLevel(e) }),
            main: new SingleBonusCell("atk", listeners),
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
        let listeners = { change: e => super._change(e) };
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
        let listeners = { change: e => super._change(e) };
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
        let listeners = { change: e => super._change(e) };
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
    constructor() {
        super("equip");
        let listeners = { change: e => super._change(e) };
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
    }

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

        super._change(e);
    }

    updateChara(key, rid) {
        let charas = Array.from(document.querySelectorAll("table#tbl_equip td#chara"));

        // キャラクター更新
        (() => {
            let builder = this.builder.chara;
            let items = builder.items;
            for (let i = 0, len = charas.length; i < len; ++i) {
                builder.update(charas[i], items);
            }
        })();

        // 変更したキャラクターの武器を更新
        (() => {
            let weapon = CHARACTER[key].weapon;
            let builder = this.builder.weapon;
            let items = builder.items(weapon);
            let cells = Array.from(document.querySelectorAll("table#tbl_equip td#weapon"));
            for (let i = 0, len = cells.length; i < len; ++i) {
                // 変更したキャラクターを装備しているか
                if (charas[i].children[0].value === rid) {
                    builder.update(cells[i], items, weapon);
                }
            }
        })();
    }

    updateWeapon(type) {
        // 変更した武器種をすべて更新
        let builder = this.builder.weapon;
        let items = builder.items(type);
        let cells = Array.from(document.querySelectorAll("table#tbl_equip td#weapon"));
        for (let i = 0, len = cells.length; i < len; ++i) {
            let cell = cells[i];
            // 変更した武器種を装備しているか
            if (0 <= cell.children[0].value.indexOf(type)) {
                builder.update(cell, items, type);
            }
        }
    }

    updateArtifact(type) {
        let builder = this.builder[type];
        let items = builder.items;
        let cells = Array.from(document.querySelectorAll("table#tbl_equip td#" + type));
        for (let i = 0, len = cells.length; i < len; ++i) {
            builder.update(cells[i], items);
        }
    }
};

window.onload = () => {
    Table.Title = document.title;
    Table.List = {
        chara: new CharaTable(),
        sword: new SwordTable(),
        claymore: new ClaymoreTable(),
        polearm: new PolearmTable(),
        bow: new BowTable(),
        catalyst: new CatalystTable(),
        flower: new FlowerTable(),
        feather: new FeatherTable(),
        sands: new SandsTable(),
        goblet: new GobletTable(),
        circlet: new CircletTable(),
        equip: new EquipmentTable(),
    };
    Table.loadData();

    loadEnemyList();
};

let g_members = [null, null, null, null];
let g_bonuses = [];

// チームの更新
function updateTeam() {
    // 装備テーブルから{tr#id, キャラ名}のペアを生成
    let list = (() => {
        let equips = Array.from(document.querySelectorAll("table#tbl_equip td#eqchara"));
        let length = equips.length;
        let values = [];
        for (let i = 0; i < length; ++i) {
            let equip = equips[i];
            let select = equip.children[0];
            let option = select.options[select.selectedIndex];
            values[i] = { id: equip.parentNode.id, name: option.label.split(".")[1] };
        }
        return values;
    })();

    // メモリ解放しておく
    let members = g_members;
    for (let i = 0; i < 4; ++i) {
        members[i] = null;
    }
    g_bonuses = [];

    // チーム選択のselect更新
    let tbl = document.getElementById("tbl_team");
    let cells = tbl.rows[0].cells;
    for (let i = 0; i < 4; ++i) {
        let select = cells[(i + 1) * 2].children[0];
        let selected = select.value;

        // メンバーoptionの更新
        while (!!select.lastChild) {
            select.lastChild.remove();
        }
        for (let j = 0; j < list.length; ++j) {
            let item = list[j];
            let opt = document.createElement("option");
            opt.value = item.id;
            opt.label = `${j + 1}.${item.name}`;
            opt.selected = (selected === item.id);
            select.appendChild(opt);
        }

        if (0 <= select.selectedIndex) {
            members[i] = updateTeamMember(select.value);
        }
    }

    appendTeamBonus();
    updateTeamTable(tbl);
    updateDamageList();
}

// チームメンバーの更新
function updateTeamMember(id) {
    let builders = CellBuilder;
    let equips = document.querySelector("table#tbl_equip tr#" + id).cells;
    let status = new Status(getRid("team"));

    // キャラクターのステータスチェック
    let weapon = (equip => {
        let cells = builders.eqchara.value(equip).cells;
        let item = CHARACTER[cells[1].children[0].value];

        status.chara = item;
        status.lv = builders.chara_level.value(cells[2]);
        status.base_hp = builders.hp.value(cells[3]);
        status.base_atk = builders.atk.value(cells[4]);
        status.base_def = builders.def.value(cells[5]);
        let pair = builders.special.value(cells[6]);
        status[pair.key] = pair.value;
        status.talent.combat = builders.talent_combat.value(cells[7]);
        status.talent.skill = builders.talent_skill.value(cells[8]);
        status.talent.burst = builders.talent_burst.value(cells[9]);

        // TODO: 天賦によるボーナス追加
        // TODO: 星座によるボーナス追加

        return item.weapon;
    })(equips[1]);

    // 武器のステータスチェック
    (equip => {
        let cells = builders.eqweapon.value(equip, weapon).cells;
        let item = WEAPON_LIST[weapon][cells[1].children[0].value];

        // let level = builders.weapon_level.value(cells[2]);
        let rank = builders.weapon_rank.value(cells[3]) - 1;
        status.base_atk += builders.atk.value(cells[4]);
        let pair = builders[weapon + "_second"].value(cells[5]);
        status[pair.key] += pair.value;

        // 武器ボーナス追加
        let bonus = item.passive;
        if (Array.isArray(bonus)) {
            for (let i = 0; i < bonus.length; ++i) {
                appendBonus(status, bonus[i].detailRank("武器", rank), bonus[i].target);
            }
        } else if (bonus != null) {
            appendBonus(status, bonus.detailRank("武器", rank), bonus.target);
        }
    })(equips[2]);

    // 聖遺物のステータスチェック
    let getArtifact = (equip, type) => {
        let cells = builders["eq" + type].value(equip).cells;
        let item = cells[1].children[0].value;

        // メイン効果追加
        let pair = builders[type + "_main"].value(cells[4]);
        status[pair.key] += pair.value;

        // サブ効果追加
        for (let i = 1; i <= 4; ++i) {
            pair = builders["art_sub" + i].value(cells[4 + i]);
            if (pair.key !== "other") {
                status[pair.key] += pair.value;
            }
        }

        return item;
    };
    let items = [
        getArtifact(equips[3], "flower"),
        getArtifact(equips[4], "feather"),
        getArtifact(equips[5], "sands"),
        getArtifact(equips[6], "goblet"),
        getArtifact(equips[7], "circlet"),
    ];
    items.sort();

    // 聖遺物の組み合わせボーナス追加
    let first = 0;
    while (first < 5) {
        let item = items[first];
        let last = items.lastIndexOf(item) + 1;
        if (item in ARTIFACT_SET) {
            let same = last - first;
            let artifact = ARTIFACT_SET[item];
            if (2 <= same) {
                appendBonus(status, artifact.set2.detail("聖遺物"), artifact.set2.target);
            }
            if (4 <= same) {
                appendBonus(status, artifact.set4.detail("聖遺物"), artifact.set4.target);
            }
        }
        first = last;
    }

    return status;
}

const ParamBuilder = {
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

// チームテーブルの更新
function updateTeamTable(tbl) {
    let builders = ParamBuilder;
    let members = g_members;

    let rows = tbl.rows;
    for (let i = 2, len = rows.length; i < len; ++i) {
        let row = rows[i];
        let param = row.id;
        if (param in builders) {
            let cells = row.cells;
            let builder = builders[param];
            for (let no = 0; no < 4; ++no) {
                builder.set(cells[1 + no * 2], members[no]);
            }
        }
    }
}

// チームメンバーの変更
function changeTeamMember(no) {
    let tbl = document.getElementById("tbl_team");
    let cell = tbl.querySelector("td#chara" + (no + 1));
    let members = g_members;
    removeTeamBonus(members[no]);
    members[no] = null; // メモリ解放しておく
    members[no] = updateTeamMember(Cell.getSelectValue(cell));
    appendTeamBonus();
    updateTeamTable(tbl);
    updateDamageList();
}

function appendBonus(status, bonus, target) {
    let bonuses = g_bonuses;
    if (target == "all") {
        bonus.id = status.id;
        bonuses.push(bonus);
    } else {
        status.append(bonus);
    }
}

function appendTeamBonus() {
    // TODO: チームボーナス追加
}

function removeTeamBonus(status) {
    if (!status) return;

    // 削除したメンバーのボーナスを全削除
    let bonuses = g_bonuses.filter(bonus => bonus.id !== status.id);

    // TODO: チームボーナス削除
    g_bonuses = bonuses.filter(bonus => bonus.id !== "team");
}

// ボーナス一覧の更新
function updateBonusTable() {
    let rows = document.getElementById("tbl_bonus").rows;
    let members = g_members;

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

let g_enemy = null;

// ダメージ計算するチームメンバーを取得
function getMember(tbl) {
    let no = tbl.querySelector("select#member_list").selectedIndex;
    if (no !== -1) {
        return g_members[no];
    }
    return null;
}

// 敵リストの読み込み
function loadEnemyList() {
    let elem = document.querySelector("table#tbl_enemy select#enemy_list");
    for (let key in ENEMY_LIST) {
        let opt = document.createElement("option");
        opt.value = key;
        opt.label = ENEMY_LIST[key].name;
        elem.appendChild(opt);
    }

    changeEnemyList(elem);
}

// 敵リストの変更
function changeEnemyList(elem) {
    let enemy = new Enemy(elem.value);
    g_enemy = enemy;

    // 各元素の耐性更新
    let row = elem.parentNode.parentNode.nextElementSibling;
    while (!!row.id) {
        let type = row.id.replace("resist_", "");
        let cells = row.cells;
        let resist = enemy.resist[type];
        if (resist === Infinity) {
            cells[1].textContent = "無効";
        } else {
            cells[1].textContent = resist + "%";
        }
        cells[2].textContent = (enemy.resistance(type) * 100).toFixed(1) + "%";

        row = row.nextElementSibling;
    }

    changeEnemyLevel(document.querySelector("table#tbl_enemy input#enemy_level"));
}

// 敵レベルの変更
function changeEnemyLevel(elem) {
    g_enemy.level = parseInt(elem.value);
    let tbl = document.getElementById("tbl_damage");
    updateEnemyDefence(tbl);
    calculateDamage(tbl);
}

// 敵防御力の更新
function updateEnemyDefence(tbl) {
    let status = getMember(tbl);
    if (!!status) {
        let row = document.querySelector("table#tbl_enemy tbody").lastElementChild;
        row.cells[2].textContent = (g_enemy.defence(status) * 100).toFixed(1) + "%";
    }
}

// ダメージ計算するメンバーリストを更新
function updateDamageList() {
    let select = document.querySelector("table#tbl_damage select#member_list");
    let index = select.selectedIndex;
    while (!!select.firstChild) {
        select.firstChild.remove();
    }

    let members = g_members;
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

// ダメージ計算の更新
function updateDamageTable() {
    let tbl = document.getElementById("tbl_damage");
    updateEnemyDefence(tbl);

    // キャプション行以外を削除
    for (let len = tbl.rows.length; 2 < len; --len) {
        tbl.deleteRow(2);
    }

    // ダメージタイプ非表示
    let damageType = tbl.querySelector("select#damage_type");
    damageType.className = "hide";

    let status = getMember(tbl);
    if (!status) return;

    // キャラレベル設定
    let rows = tbl.rows;
    rows[0].cells[0].lastChild.data = "Lv." + status.level;

    // キャラ攻撃力設定
    let cells = rows[1].cells;
    let critical = status.critical();
    cells[2].textContent = status.attack.toFixed();
    cells[3].textContent = `${critical.damage.toFixed(1)}%(${critical.rate.toFixed(1)}%)`;

    let prefix = { combat: "通常攻撃・重撃", skill: "元素スキル", burst: "元素爆発" };
    let buildRow = (type) => {
        let level = status.talent[type];

        // キャプション行追加
        let row = tbl.insertRow();
        let cel = document.createElement("th");
        cel.colSpan = 4;
        cel.textContent = `${prefix[type]} : Lv.${level}`;
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

            row = tbl.insertRow();

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
        changeDamageType(damageType);
    } else {
        calculateDamage(tbl);
    }
}

// 攻撃属性の変更
function changeDamageType(elem) {
    let tbl = document.getElementById("tbl_damage");
    let status = getMember(tbl);
    if (!status) return;
    let chara = status.chara;

    // ダメージタイプ切替
    let className = elem.value;
    if (className === "elem") {
        className = chara.element;
    }

    let row = tbl.rows[2];
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

    calculateDamage(tbl);
}

// ダメージ計算
function calculateDamage(tbl) {
    let status = getMember(tbl);
    if (!status) return;

    let row = tbl.rows[2];
    let enemy = g_enemy;

    let attackPower = status.attack;
    let enemyDefence = enemy.defence(status);

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