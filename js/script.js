"use strict"

const VERSION = "0.01";

const TABLE_LIST = {
    tbl_chara: "キャラクター",
    tbl_sword: "片手剣",
    tbl_claymore: "両手剣",
    tbl_polearm: "長柄武器",
    tbl_bow: "弓",
    tbl_catalyst: "法器",
    tbl_flower: "生の花",
    tbl_feather: "死の羽",
    tbl_sands: "時の砂",
    tbl_goblet: "空の杯",
    tbl_circlet: "理の冠",
    tbl_equip: "装備"
};

// セル生成マップ
const CellBuilder = {
    // 汎用
    hp: new IntCell(),
    atk: new IntCell(),
    def: new IntCell(),
    elem: new IntCell(),
    index: new IndexCell(),
    // キャラクター
    cname: new DictCell(CHARACTER, "name", "TravelAnemo", { change: changeCharaCell }),
    clevel: new CharacterLevelCell(),
    sptype: new BonusCell("cname", CHARACTER, "special"),
    spval: new SecondBonusCell("cname", CHARACTER, "special"),
    talentc: new TalentCell(1, TALENT_LV_MAX),
    talents: new TalentCell(1, TALENT_LV_MAX),
    talente: new TalentCell(1, TALENT_LV_MAX),
    // 武器
    wsname: new DictCell(SWORD_LIST, "name", "other", { change: changeWeaponCell }),
    wmname: new DictCell(CLAYMORE_LIST, "name", "other", { change: changeWeaponCell }),
    wpname: new DictCell(POLEARM_LIST, "name", "other", { change: changeWeaponCell }),
    wbname: new DictCell(BOW_LIST, "name", "other", { change: changeWeaponCell }),
    wcname: new DictCell(CATALYST_LIST, "name", "other", { change: changeWeaponCell }),
    wssecond: new BonusCell("wsname", SWORD_LIST, "second"),
    wmsecond: new BonusCell("wmname", CLAYMORE_LIST, "second"),
    wpsecond: new BonusCell("wpname", POLEARM_LIST, "second"),
    wbsecond: new BonusCell("wbname", BOW_LIST, "second"),
    wcsecond: new BonusCell("wcname", CATALYST_LIST, "second"),
    wssecval: new SecondBonusCell("wsname", SWORD_LIST, "second"),
    wmsecval: new SecondBonusCell("wmname", CLAYMORE_LIST, "second"),
    wpsecval: new SecondBonusCell("wpname", POLEARM_LIST, "second"),
    wbsecval: new SecondBonusCell("wbname", BOW_LIST, "second"),
    wcsecval: new SecondBonusCell("wcname", CATALYST_LIST, "second"),
    wrank: new RangeCell(1, WEAPON_RANK_MAX),
    // 聖遺物
    awname: new MapCell(FLOWER_LIST, "other", { change: changeArtifactCell }),
    afname: new MapCell(FEATHER_LIST, "other", { change: changeArtifactCell }),
    asname: new MapCell(SANDS_LIST, "other", { change: changeArtifactCell }),
    agname: new MapCell(GOBLET_LIST, "other", { change: changeArtifactCell }),
    acname: new MapCell(CIRCLET_LIST, "other", { change: changeArtifactCell }),
    astar: new RangeCell(1, ARTIFACT_STAR_MAX, { change: changeArtifactStarCell }),
    alevel: new ArtifactLevelCell(),
    asmain: new BonusListCell(ARTIFACT_SANDS),
    agmain: new BonusListCell(ARTIFACT_GOBLET),
    acmain: new BonusListCell(ARTIFACT_CIRCLET),
    asub1: new BonusListCell(ARTIFACT_SUB, { change: changeArtifactSubCell }),
    asub2: new BonusListCell(ARTIFACT_SUB, { change: changeArtifactSubCell }),
    asub3: new BonusListCell(ARTIFACT_SUB, { change: changeArtifactSubCell }),
    asub4: new BonusListCell(ARTIFACT_SUB, { change: changeArtifactSubCell }),
    aval1: new ArtifactSubCell(),
    aval2: new ArtifactSubCell(),
    aval3: new ArtifactSubCell(),
    aval4: new ArtifactSubCell(),
    // 装備
    eqchara: new EquipmentCell("tbl_chara", "cname", { change: changeEquipCharaCell }),
    eqweapon: new EquipWeaponCell(),
    eqflower: new EquipmentCell("tbl_flower", "awname"),
    eqfeather: new EquipmentCell("tbl_feather", "afname"),
    eqsands: new EquipmentCell("tbl_sands", "asname"),
    eqgoblet: new EquipmentCell("tbl_goblet", "agname"),
    eqcirclet: new EquipmentCell("tbl_circlet", "acname")
}

let g_updated = false;
let g_def_title = "";
let g_identify = 0;

window.onload = () => {
    g_def_title = document.title;

    loadData();
};

// 全データの読み込み
function loadData() {
    for (let name in TABLE_LIST) {
        loadTableData(name);
    }
}

// テーブルデータの読み込み
function loadTableData(name) {
    let json = localStorage.getItem(name);
    if (!!json) {
        let data = JSON.parse(json);

        // htmlに展開
        let tbl = document.getElementById(name);
        for (let i = 0, len = data.length; i < len; ++i) {
            addRow(tbl, data[i]);
        }
    }
}

// 全データの保存
function saveData() {
    if (g_updated) {
        // タブ毎にデータをjsonで保存
        for (let name in TABLE_LIST) {
            saveTableData(name);
        }

        document.title = g_def_title;
        g_updated = false;
    }
}

// テーブルデータの保存
function saveTableData(name) {
    let builders = CellBuilder;
    let data = [];

    // htmlから解析
    let rows = document.getElementById(name).rows;
    for (let ridx = 2, rlen = rows.length; ridx < rlen; ++ridx) { // tbl.rows[0,1]は見出し行
        let map = {};
        let cells = rows[ridx].cells;
        for (let cidx = 0, clen = cells.length; cidx < clen; ++cidx) {
            let cell = cells[cidx];
            let id = cell.id;
            if (id in builders) {
                let value = builders[id].save(cell);
                if (value != null) {
                    map[id] = value;
                }
            }
        }
        data.push(map);
    }

    localStorage.setItem(name, JSON.stringify(data));
}

// データ削除前の確認
function clearConfirm(all) {
    if (all) {
        let yes = confirm("すべてのタブの内容が破棄されます。よろしいですか？");
        if (yes) {
            clearData();
        }
    } else {
        let elem = document.querySelector("input[name='TAB']:checked");
        let name = elem.id.replace("tab", "tbl");
        let yes = confirm(`${TABLE_LIST[name]}タブの内容が破棄されます。よろしいですか？`);
        if (yes) {
            clearTableData(name);
        }
    }
}

// 全データの削除
function clearData() {
    for (let name in TABLE_LIST) {
        clearTableData(name);
    }

    document.title = g_def_title;
    g_updated = false;
}

// テーブルデータの削除
function clearTableData(name) {
    let rows = document.getElementById(name).rows;
    // rows[0,1]（キャプション）以外を削除
    for (let cnt = rows.length - 2; 0 < cnt; --cnt) {
        rows[2].remove();
    }

    localStorage.removeItem(name);
}

// データのエクスポート
function exportData() {
    saveData();

    // バージョン情報を付加してひとまとめにする
    let data = { ver: VERSION };
    for (let name in TABLE_LIST) {
        let json = localStorage.getItem(name);
        if (!!json) {
            data[name] = JSON.parse(json);
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
function importConfirm() {
    let yes = confirm("すべてのタブの内容が上書きされます。よろしいですか？");
    if (yes) {
        document.getElementById("import").click();
    }
}

// データのインポート
function importData() {
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

                clearData();

                for (let name in TABLE_LIST) {
                    if (name in data) {
                        localStorage.setItem(name, JSON.stringify(data[name]));
                    }
                }

                loadData();
            }
            elem.value = ""; // 同じファイル名を続けてインポートできるように値をクリア
        };
    }
}

// ランダムIDの生成(簡易)
function getRid(name) {
    let id = ++g_identify;
    return `${name}_${id}`;
}

// 既定値の取得
function getDefault(cap) {
    let builder = CellBuilder;
    let ret = {};
    let cells = cap.cells;
    for (let i = 0, len = cells.length; i < len; ++i) {
        let id = cells[i].id;
        if (id in builder) {
            let val = builder[id].initial;
            if (val != null) {
                ret[id] = val;
            }
        }
    }
    return ret;
}

// テーブルへ1行追加
function addRow(tbl, values) {
    let builder = CellBuilder;
    let rid = getRid(tbl.id);
    let row = tbl.insertRow();
    row.id = rid;

    // 見出し行のidからセルを生成
    let cap = tbl.rows[1].cells;
    for (let i = 0, len = cap.length; i < len; ++i) {
        let cel = row.insertCell();
        let id = cap[i].id;
        cel.id = id;

        if (id in builder) {
            // セル追加
            let child = builder[id].load(cel, id, values);
            if (child != null) {
                child.addEventListener("change", changeValue);
            }
        } else {
            row.remove();
            break;
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
    btn.addEventListener("click", removeRow);
    btn.appendChild(document.createTextNode("-"));
    add.appendChild(btn);
}

// 1行追加（htmlからの呼び出し版）
function insertRow(name) {
    let tbl = document.getElementById(name);
    addRow(tbl, getDefault(tbl.rows[1])); // caption行は2行目
    changeValue();
}

// 1行削除
function removeRow(e) {
    let row = e.target.parentNode.parentNode;
    let yes = confirm(`No.${row.rowIndex - 1}を削除します。よろしいですか？`);
    if (yes) {
        // TODO: ブラウザによって<tbody>があったりなかったりする？
        let tbl = row.parentNode.parentNode;

        // e.target == button
        document.getElementById(e.target.id).remove();

        // indexの再設定
        let builder = CellBuilder.index;
        let rows = tbl.rows;
        for (let i = 2, len = rows.length; i < len; ++i) {
            builder.update(rows[i].cells[0]);
        }

        // TODO: 削除したものを使用している他タブの要素をどうする？

        changeValue();
    }
}

// 値変更
function changeValue() {
    if (!g_updated) {
        g_updated = true
        document.title = "* " + g_def_title;
    }
}

// キャラクターセルの変更
function changeCharaCell(e) {
    // e.target == select#cname
    let key = e.target.value;
    let tr = e.target.parentNode.parentNode;

    // 追加効果変更
    CellBuilder.sptype.update(tr.querySelector("td#sptype"), key);

    // 追加効果の値変更
    CellBuilder.spval.update(tr.querySelector("td#spval"), key);

    let charas = Array.from(document.querySelectorAll("table#tbl_equip td#eqchara"));

    // 装備タブのキャラクター更新
    (() => {
        let builder = CellBuilder.eqchara;
        let items = builder.items;
        for (let i = 0, len = charas.length; i < len; ++i) {
            builder.update(charas[i], items);
        }
    })();

    // 装備タブの武器更新（変更したキャラクターの武器を更新）
    (id => {
        let weapon = CHARACTER[key].weapon;
        let builder = CellBuilder.eqweapon;
        let items = builder.items(weapon);
        let cells = Array.from(document.querySelectorAll("table#tbl_equip td#eqweapon"));
        for (let i = 0, len = cells.length; i < len; ++i) {
            // 変更したキャラクターを装備しているか
            if (Cell.getSelectValue(charas[i]) === id) {
                builder.update(cells[i], items, weapon);
            }
        }
    })(tr.id);
}

// 武器セルの変更
function changeWeaponCell(e) {
    // e.target == select#w?name
    let key = e.target.value;
    let td = e.target.parentNode;
    let tr = td.parentNode;

    // 追加効果変更
    let second = td.id.replace("name", "second");
    CellBuilder[second].update(tr.querySelector("td#" + second), key);

    // 追加効果の値変更
    let secval = td.id.replace("name", "secval");
    CellBuilder[secval].update(tr.querySelector("td#" + secval), key);

    // 装備タブの武器更新（変更した武器種をすべて更新）
    let weapon = tr.parentNode.parentNode.id.slice(4);
    let builder = CellBuilder.eqweapon;
    let items = builder.items(weapon);
    let cells = Array.from(document.querySelectorAll("table#tbl_equip td#eqweapon"));
    for (let i = 0, len = cells.length; i < len; ++i) {
        let cell = cells[i];
        // 変更した武器種を装備しているか（tr[id]の一部に武器種が含まれているか）
        if (0 <= Cell.getSelectValue(cell).indexOf(weapon)) {
            builder.update(cell, items, weapon);
        }
    }
}

const ARTIFACT_TABLE = {
    awname: "eqflower",
    afname: "eqfeather",
    asname: "eqsands",
    agname: "eqgoblet",
    acname: "eqcirclet"
};

// 聖遺物セルの変更
function changeArtifactCell(e) {
    // 装備タブの聖遺物更新
    let id = ARTIFACT_TABLE[e.target.parentNode.id];
    let builder = CellBuilder[id];
    let items = builder.items;
    let cells = Array.from(document.querySelectorAll("table#tbl_equip td#" + id));
    for (let i = 0, len = cells.length; i < len; ++i) {
        builder.update(cells[i], items);
    }
}

// 聖遺物☆セルの変更
function changeArtifactStarCell(e) {
    // e.target == select#astar
    let key = e.target.value;
    let tr = e.target.parentNode.parentNode;

    // 聖遺物レベルの変更
    CellBuilder.alevel.update(tr.querySelector("td#alevel"), key);
}

// 聖遺物サブ効果の変更
function changeArtifactSubCell(e) {
    // e.target == select#asub?
    let value = e.target.value;
    let td = e.target.parentNode;
    let tr = td.parentNode;

    // サブ効果の値変更
    let avalx = td.id.replace("sub", "val");
    CellBuilder[avalx].update(tr.querySelector("td#" + avalx), value);
}

// 装備キャラクターの更新
function changeEquipCharaCell(e) {
    // e.target == select#eqchara
    let value = e.target.value;

    // 装備タブの武器更新（変更したキャラクターの武器種を変更）
    let tr = document.querySelector("table#tbl_chara tr#" + value);
    let weapon = CHARACTER[Cell.getSelectValue(tr.cells[1])].weapon;
    let builder = CellBuilder.eqweapon;
    let items = builder.items(weapon);
    let cell = e.target.parentNode.nextElementSibling;
    builder.update(cell, items, weapon);
}

let g_members = [null, null, null, null];

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

    updateTeamTable(tbl);
}

// チームメンバーの更新
function updateTeamMember(id) {
    let equips = document.querySelector("table#tbl_equip tr#" + id).cells;
    let status = new Status();

    // キャラクターのステータスチェック
    let weapon = (equip => {
        let value = Cell.getSelectValue(equip); // キャラクターのtr[id]
        let cells = document.querySelector("table#tbl_chara tr#" + value).cells;
        let item = CHARACTER[Cell.getSelectValue(cells[1])];

        status.chara = item;
        status.lv = Cell.getSelectValue(cells[2]);
        status.base_hp = parseFloat(Cell.getInputValue(cells[3]));
        status.base_atk = parseFloat(Cell.getInputValue(cells[4]));
        status.base_def = parseFloat(Cell.getInputValue(cells[5]));
        status[item.special] = parseFloat(Cell.getInputValue(cells[7]));
        status.talent[0] = parseFloat(Cell.getSelectValue(cells[8]));
        status.talent[1] = parseFloat(Cell.getSelectValue(cells[9]));
        status.talent[2] = parseFloat(Cell.getSelectValue(cells[10]));

        // TODO: 天賦によるボーナス追加

        return item.weapon;
    })(equips[1]);

    // 武器のステータスチェック
    (equip => {
        let value = Cell.getSelectValue(equip); // 武器のtr[id]
        let cells = document.querySelector(`table#tbl_${weapon} tr#${value}`).cells;
        let item = WEAPON_LIST[weapon][Cell.getSelectValue(cells[1])];

        let rank = parseInt(Cell.getSelectValue(cells[2]));
        status.base_atk += parseFloat(Cell.getInputValue(cells[3]));
        status[item.second] += parseFloat(Cell.getInputValue(cells[5]));

        // 武器ボーナス追加
        let bonus = item.passive;
        let append = b => {
            let clone = new Bonus(b.items, b.value[rank - 1], b.limit, b.times, b.stack);
            if (!clone.append(status)) {
                status.bonus.push(clone);
            }
        };
        if (Array.isArray(bonus)) {
            for (let i = 0; i < bonus.length; ++i) {
                append(bonus[i]);
            }
        } else if (bonus != null) {
            append(bonus);
        }
    })(equips[2]);

    // 聖遺物（花・羽）のステータスチェック
    let getArtifact2 = (equip, type, main) => {
        let value = Cell.getSelectValue(equip); // 聖遺物・花のtr[id]
        let cells = document.querySelector(`table#tbl_${type} tr#${value}`).cells;
        let item = Cell.getSelectValue(cells[1]);

        // メイン効果追加
        let star = parseInt(Cell.getSelectValue(cells[2]));
        let level = parseInt(Cell.getSelectValue(cells[3]));
        status[main] += getArtifactParam(star, level, main);

        // サブ効果追加
        for (let i = 0; i < 4; ++i) {
            let bonus = Cell.getSelectValue(cells[4 + i * 2]);
            if (bonus !== "other") {
                status[bonus] += parseFloat(Cell.getInputValue(cells[4 + i * 2 + 1]));
            }
        }

        return item;
    };

    // 聖遺物（砂・杯・冠）のステータスチェック
    let getArtifact3 = (equip, type) => {
        let value = Cell.getSelectValue(equip); // 聖遺物のtr[id]
        let cells = document.querySelector(`table#tbl_${type} tr#${value}`).cells;
        let item = Cell.getSelectValue(cells[1]);

        // メイン効果追加
        let star = parseInt(Cell.getSelectValue(cells[2]));
        let level = parseInt(Cell.getSelectValue(cells[3]));
        let main = Cell.getSelectValue(cells[4]);
        if (main !== "other") {
            status[main] += getArtifactParam(star, level, main);
        }

        // サブ効果追加
        for (let i = 0; i < 4; ++i) {
            let bonus = Cell.getSelectValue(cells[5 + i * 2]);
            if (bonus !== "other") {
                status[bonus] += parseFloat(Cell.getInputValue(cells[5 + i * 2 + 1]));
            }
        }

        return item;
    };

    let items = [
        getArtifact2(equips[3], "flower", "hp"),
        getArtifact2(equips[4], "feather", "atk_buf"),
        getArtifact3(equips[5], "sands"),
        getArtifact3(equips[6], "goblet"),
        getArtifact3(equips[7], "circlet"),
    ];
    // let circlet = items[4];
    items.sort();

    // 聖遺物の組み合わせボーナスチェック
    let first = 0;
    while (first < 5) {
        let item = items[first];
        let last = items.lastIndexOf(item) + 1;
        if (item in ARTIFACT_SET) {
            let same = last - first;
            let bonus = null;
            if (4 <= same) {
                bonus = ARTIFACT_SET[item].set4;
            } else if (2 <= same) {
                bonus = ARTIFACT_SET[item].set2;
            }
            if (bonus != null) {
                if (!bonus.append(status)) {
                    status.bonus.push(bonus);
                }
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
    any_dmg: new DamageParam("any_dmg")
};

// チームテーブルの更新
function updateTeamTable(tbl) {
    let builders = ParamBuilder;
    let members = g_members;

    // TODO: 元素共鳴のボーナス追加

    let rows = tbl.rows;
    for (let i = 2, len = rows.length; i < len; ++i) {
        let row = rows[i];
        let cells = row.cells;
        let builder = builders[row.id];
        for (let j = 0; j < 4; ++j) {
            let status = members[j];
            builder.set(cells[1 + j * 2], status);
        }
    }
}

// チームメンバーの変更
function changeTeamMember(no) {
    let tbl = document.getElementById("tbl_team");
    let cell = tbl.querySelector("td#player" + (no + 1));
    g_members[no] = null; // メモリ解放しておく
    g_members[no] = updateTeamMember(Cell.getSelectValue(cell));
    updateTeamTable(tbl);
}