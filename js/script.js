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
    chara_name: new DictCell(CHARACTER, "name", { change: changeCharaCell }),
    chara_level: new AscensionLevelCell(),
    special: new DictBonusCell("chara_name", CHARACTER, "special"),
    talent_combat: new TalentCell(1, TALENT_LV_MAX),
    talent_skill: new TalentCell(1, TALENT_LV_MAX),
    talent_burst: new TalentCell(1, TALENT_LV_MAX),
    // 武器
    sword_name: new DictCell(SWORD_LIST, "name", { change: changeWeaponCell }),
    claymore_name: new DictCell(CLAYMORE_LIST, "name", { change: changeWeaponCell }),
    polearm_name: new DictCell(POLEARM_LIST, "name", { change: changeWeaponCell }),
    bow_name: new DictCell(BOW_LIST, "name", { change: changeWeaponCell }),
    catalyst_name: new DictCell(CATALYST_LIST, "name", { change: changeWeaponCell }),
    sword_second: new DictBonusCell("sword_name", SWORD_LIST, "second"),
    claymore_second: new DictBonusCell("claymore_name", CLAYMORE_LIST, "second"),
    polearm_second: new DictBonusCell("polearm_name", POLEARM_LIST, "second"),
    bow_second: new DictBonusCell("bow_name", BOW_LIST, "second"),
    catalyst_second: new DictBonusCell("catalyst_name", CATALYST_LIST, "second"),
    weapon_level: new AscensionLevelCell(),
    weapon_rank: new RangeCell(1, WEAPON_RANK_MAX),
    // 聖遺物
    flower_name: new MapCell(FLOWER_LIST, { change: changeArtifactCell }),
    feather_name: new MapCell(FEATHER_LIST, { change: changeArtifactCell }),
    sands_name: new MapCell(SANDS_LIST, { change: changeArtifactCell }),
    goblet_name: new MapCell(GOBLET_LIST, { change: changeArtifactCell }),
    circlet_name: new MapCell(CIRCLET_LIST, { change: changeArtifactCell }),
    art_star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: changeArtifactStarCell }),
    art_level: new ArtifactLevelCell({ change: changeArtifactLevelCell }),
    flower_main: new SingleBonusCell("hp"),
    feather_main: new SingleBonusCell("atk"),
    sands_main: new MultiBonusCell(ARTIFACT_SANDS, { change: changeArtifactMainCell }),
    goblet_main: new MultiBonusCell(ARTIFACT_GOBLET, { change: changeArtifactMainCell }),
    circlet_main: new MultiBonusCell(ARTIFACT_CIRCLET, { change: changeArtifactMainCell }),
    art_sub1: new BonusValueCell(ARTIFACT_SUB),
    art_sub2: new BonusValueCell(ARTIFACT_SUB),
    art_sub3: new BonusValueCell(ARTIFACT_SUB),
    art_sub4: new BonusValueCell(ARTIFACT_SUB),
    // 装備
    eqchara: new EquipmentCell("chara", { change: changeEquipCharaCell }),
    eqweapon: new EquipWeaponCell(),
    eqflower: new EquipmentCell("flower"),
    eqfeather: new EquipmentCell("feather"),
    eqsands: new EquipmentCell("sands"),
    eqgoblet: new EquipmentCell("goblet"),
    eqcirclet: new EquipmentCell("circlet")
}

let g_updated = false;
let g_def_title = "";
let g_identify = 0;

window.onload = () => {
    g_def_title = document.title;

    Cell.onChange = changeValue;

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
        let init = getDefault(tbl.rows[1]);
        for (let i = 0, len = data.length; i < len; ++i) {
            // データのない項目を初期値で設定
            let line = data[i];
            for (let key in init) {
                if (!(key in line)) {
                    line[key] = init[key];
                }
            }

            addRow(tbl, line);
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
    let rid = getRid(tbl.id.replace("tbl_", ""));
    let row = tbl.insertRow();
    row.id = rid;

    // 見出し行のidからセルを生成
    let cap = tbl.rows[1].cells;
    for (let i = 0, len = cap.length; i < len; ++i) {
        let cel = row.insertCell();
        let id = cap[i].id;
        cel.id = id;

        // セル追加
        if (id in builder) {
            builder[id].load(cel, id, values);
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
    // e.target == td#chara_name.select
    let key = e.target.value;
    let tr = e.target.parentNode.parentNode;

    // 追加効果変更
    CellBuilder.special.update(tr.querySelector("td#special"), key);

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
            if (charas[i].children[0].value === id) {
                builder.update(cells[i], items, weapon);
            }
        }
    })(tr.id);
}

// 武器セルの変更
function changeWeaponCell(e) {
    // e.target == td#*_name.select
    let key = e.target.value;
    let td = e.target.parentNode;
    let tr = td.parentNode;

    // 追加効果変更
    let second = td.id.replace("name", "second");
    CellBuilder[second].update(tr.querySelector("td#" + second), key);

    // 装備タブの武器更新（変更した武器種をすべて更新）
    let weapon = td.id.replace("_name", "");
    let builder = CellBuilder.eqweapon;
    let items = builder.items(weapon);
    let cells = Array.from(document.querySelectorAll("table#tbl_equip td#eqweapon"));
    for (let i = 0, len = cells.length; i < len; ++i) {
        let cell = cells[i];
        // 変更した武器種を装備しているか
        if (0 <= cell.children[0].value.indexOf(weapon)) {
            builder.update(cell, items, weapon);
        }
    }
}

// 聖遺物セルの変更
function changeArtifactCell(e) {
    // e.target == td#*_name.select
    let td = e.target.parentNode;
    let id = "eq" + td.id.replace("_name", "");

    // 装備タブの聖遺物更新
    let builder = CellBuilder[id];
    let items = builder.items;
    let cells = Array.from(document.querySelectorAll("table#tbl_equip td#" + id));
    for (let i = 0, len = cells.length; i < len; ++i) {
        builder.update(cells[i], items);
    }
}

// 聖遺物☆セルの変更
function changeArtifactStarCell(e) {
    // e.target == td#art_star.select
    let star = parseInt(e.target.value);
    let tr = e.target.parentNode.parentNode;

    // 聖遺物レベルの変更
    let cell = tr.querySelector("td#art_level");
    CellBuilder.art_level.update(cell, star);
    let level = CellBuilder.art_level.value(cell);

    // 聖遺物メイン効果の変更
    let main = tr.id.split("_")[0] + "_main";
    CellBuilder[main].update(tr.querySelector(`td#${main}`), star, level);
}

// 聖遺物レベルセルの変更
function changeArtifactLevelCell(e) {
    // e.target == td#art_level.select
    let level = parseInt(e.target.value);
    let tr = e.target.parentNode.parentNode;

    let star = CellBuilder.art_star.value(tr.querySelector("td#art_star"));

    // 聖遺物メイン効果の変更
    let main = tr.id.split("_")[0] + "_main";
    CellBuilder[main].update(tr.querySelector(`td#${main}`), star, level);
}

// 聖遺物メイン効果セルの変更
function changeArtifactMainCell(e) {
    // e.target == td#*_main.select
    let td = e.target.parentNode;
    let tr = td.parentNode;

    let star = CellBuilder.art_star.value(tr.querySelector("td#art_star"));
    let level = CellBuilder.art_level.value(tr.querySelector("td#art_level"));

    // 聖遺物メイン効果の更新
    CellBuilder[td.id].update(td, star, level);
}

// 装備キャラクターの更新
function changeEquipCharaCell(e) {
    // e.target == td#eqchara.select
    let value = e.target.value;

    // 装備タブの武器更新（変更したキャラクターの武器種を変更）
    let td = document.querySelector(`table#tbl_chara tr#${value} td#chara_name`);
    let weapon = CHARACTER[td.children[0].value].weapon;
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
    let builders = CellBuilder;
    let equips = document.querySelector("table#tbl_equip tr#" + id).cells;
    let status = new Status();

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
        status.talent[0] = builders.talent_combat.value(cells[7]);
        status.talent[1] = builders.talent_skill.value(cells[8]);
        status.talent[2] = builders.talent_burst.value(cells[9]);

        // TODO: 天賦によるボーナス追加

        return item.weapon;
    })(equips[1]);

    // 武器のステータスチェック
    (equip => {
        let cells = builders.eqweapon.value(equip, weapon).cells;
        let item = WEAPON_LIST[weapon][cells[1].children[0].value];

        let rank = builders.weapon_rank.value(cells[2]);
        status.base_atk += builders.atk.value(cells[3]);
        let pair = builders[weapon + "_second"].value(cells[4]);
        status[pair.key] += pair.value;

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

    // 聖遺物のステータスチェック
    let getArtifact = (equip, type) => {
        let cells = builders["eq" + type].value(equip).cells;
        let item = cells[1].children[0].value;

        // メイン効果追加
        let pair = builders[type + "_main"].value(cells[4]);
        status[pair.key] += pair.value;

        // サブ効果追加
        for (let i = 1; i <= 4; ++i) {
            let pair = builders["art_sub" + i].value(cells[4 + i]);
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
    elem_ampl: new DamageParam("elem_ampl"),
    elem_trans: new DamageParam("elem_trans"),
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