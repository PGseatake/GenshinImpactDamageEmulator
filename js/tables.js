"use strict";
const VERSION = "0.02";
class Table {
    constructor(type) {
        this.type = type;
        this.serial = 0;
        this.counter = 0;
    }
    static loadData() {
        for (const type of TableTypes) {
            Table.List[type].load();
        }
    }
    static saveData() {
        if (Table.Updated) {
            for (const type of TableTypes) {
                Table.List[type].save();
            }
            document.title = Table.Title;
            Table.Updated = false;
        }
    }
    static exportData() {
        Table.saveData();
        let data = { ver: VERSION };
        for (const type of TableTypes) {
            let json = localStorage.getItem(type);
            if (json) {
                data[type] = JSON.parse(json);
            }
        }
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
    static importConfirm() {
        if (confirm("すべてのタブの内容が上書きされます。よろしいですか？")) {
            document.getElementById("import").click();
        }
    }
    static importData() {
        let elem = document.getElementById("import");
        let file = elem.files.item(0);
        if (file) {
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                let json = reader.result;
                if (json) {
                    let data = JSON.parse(json);
                    for (const type of TableTypes) {
                        Table.List[type].clear();
                    }
                    for (const type of TableTypes) {
                        if (type in data) {
                            localStorage.setItem(type, JSON.stringify(data[type]));
                        }
                        Table.List[type].load();
                    }
                }
                elem.value = "";
            };
        }
    }
    static clearConfirm(all) {
        if (all) {
            if (confirm("すべてのタブの内容が破棄されます。よろしいですか？")) {
                for (const type of TableTypes) {
                    Table.List[type].clear();
                }
                document.title = Table.Title;
                Table.Updated = false;
            }
        }
        else {
            let elem = document.querySelector("input[name='TAB']:checked");
            let tbl = Table.List[elem.id.replace("tab_", "")];
            if (tbl.clearable) {
                if (confirm(`${tbl.text}タブの内容が破棄されます。よろしいですか？`)) {
                    tbl.clear();
                }
            }
        }
    }
    static updateCell(row, cells, prop, ...args) {
        cells[prop].update(row.querySelector("td#" + prop), ...args);
    }
    static cellValue(row, cells, prop) {
        return cells[prop].value(row.querySelector("td#" + prop));
    }
    get rid() {
        ++this.serial;
        return `${this.type}_${this.serial}`;
    }
    get text() {
        return TABLE_LABEL[this.type];
    }
    get html() {
        return document.getElementById("tbl_" + this.type);
    }
    get clearable() {
        return false;
    }
    refresh() {
        return 0;
    }
    clear() {
    }
    save() {
    }
    load() {
    }
    onChange(ev = null) {
        ++this.counter;
    }
}
Table.List = {};
Table.Title = "";
Table.Updated = false;
class ItemTable extends Table {
    constructor(type) {
        super(type);
        this.cells = {};
    }
    static insertRow(type) {
        let tbl = Table.List[type];
        let html = tbl.html;
        tbl.insert(html, tbl.initial(html));
        tbl.onChange();
    }
    static removeConfirm(ev) {
        let btn = ev.target;
        let row = btn.parentElement.parentElement;
        let html = row.parentElement.parentElement;
        let tbl = Table.List[html.id.replace("tbl_", "")];
        const id = btn.id;
        const no = row.rowIndex - 1;
        if (tbl.removable(id)) {
            if (confirm(`No.${no}を削除します。よろしいですか？`)) {
                tbl.remove(html, id);
            }
        }
        else {
            window.alert(`No.${no}は装備中のため削除できません。`);
        }
    }
    get clearable() {
        return true;
    }
    removable(id) {
        return !Table.List.equip.exists(id);
    }
    clear() {
        let html = this.html;
        for (let count = html.rows.length - 2; 0 < count; --count) {
            html.deleteRow(2);
        }
        localStorage.removeItem(this.type);
    }
    save() {
        let data = [];
        let rows = Array.from(this.html.rows);
        for (let i = 2, len = rows.length; i < len; ++i) {
            let map = {};
            let cells = rows[i].cells;
            for (let cell of cells) {
                const id = cell.id;
                if (id in this.cells) {
                    const value = this.cells[id].save(cell);
                    if (value !== null) {
                        map[id] = value;
                    }
                }
            }
            data.push(map);
        }
        localStorage.setItem(this.type, JSON.stringify(data));
    }
    load() {
        let json = localStorage.getItem(this.type);
        if (json) {
            let data = JSON.parse(json);
            let html = this.html;
            let init = this.initial(html);
            for (const line of data) {
                for (let key in init) {
                    if (!(key in line)) {
                        line[key] = init[key];
                    }
                }
                this.insert(html, line);
            }
        }
    }
    initial(html) {
        let ret = {};
        let caps = html.rows[1].cells;
        for (let cap of caps) {
            const id = cap.id;
            if (id in this.cells) {
                const val = this.cells[id].initial;
                if (val !== null) {
                    ret[id] = val;
                }
            }
        }
        return ret;
    }
    insert(html, values) {
        const rid = this.rid;
        let row = html.insertRow();
        row.id = rid;
        let caps = html.rows[1].cells;
        for (let cap of caps) {
            let cel = row.insertCell();
            const id = cap.id;
            cel.id = id;
            if (id in this.cells) {
                this.cells[id].load(cel, id, values);
            }
        }
        let add = row.insertCell();
        let btn = document.createElement("button");
        btn.id = rid;
        btn.type = "button";
        btn.addEventListener("click", ItemTable.removeConfirm);
        btn.appendChild(document.createTextNode("-"));
        add.appendChild(btn);
    }
    remove(html, id) {
        html.querySelector("tr#" + id).remove();
        let index = this.cells.index;
        let rows = Array.from(html.rows);
        for (let i = 2, len = rows.length; i < len; ++i) {
            index.update(rows[i].cells[0]);
        }
        this.onChange();
    }
    status(row, status) {
        return null;
    }
    onChange(ev = null) {
        super.onChange(ev);
        if (!Table.Updated) {
            Table.Updated = true;
            document.title = "* " + Table.Title;
        }
    }
}
class CharaTable extends ItemTable {
    constructor() {
        super(TableType.Chara);
        const listeners = { change: (ev) => this.onChange(ev) };
        const cells = {
            index: new IndexCell(),
            name: new NameCell(CHARACTER, { change: ev => this.changeName(ev) }),
            conste: new RangeCell(0, 6, listeners),
            level: new AscensionLevelCell({ change: ev => this.changeLevel(ev) }),
            hp: new CharaStatusCell(listeners),
            atk: new CharaStatusCell(listeners),
            def: new CharaStatusCell(listeners),
            special: new CharaSpecialCell(listeners),
            combat: new TalentCell(1, TALENT_LV_MAX, listeners),
            skill: new TalentCell(1, TALENT_LV_MAX, listeners),
            burst: new TalentCell(1, TALENT_LV_MAX, listeners),
        };
        this.cells = cells;
    }
    status(row, status) {
        const cells = this.cells;
        const name = Table.cellValue(row, cells, "name");
        status.conste = Table.cellValue(row, cells, "conste");
        status.lv = Table.cellValue(row, cells, "level");
        status.base.hp = Table.cellValue(row, cells, "hp");
        status.base.atk = Table.cellValue(row, cells, "atk");
        status.base.def = Table.cellValue(row, cells, "def");
        status.addValue(Table.cellValue(row, cells, "special"));
        status.talent.combat = Table.cellValue(row, cells, "combat");
        status.talent.skill = Table.cellValue(row, cells, "skill");
        status.talent.burst = Table.cellValue(row, cells, "burst");
        return CHARACTER[name];
    }
    changeName(ev) {
        let select = ev.target;
        const name = select.value;
        let row = select.parentElement.parentElement;
        const cells = this.cells;
        const level = Table.cellValue(row, cells, "level");
        Table.updateCell(row, cells, "hp", name, level);
        Table.updateCell(row, cells, "atk", name, level);
        Table.updateCell(row, cells, "def", name, level);
        Table.updateCell(row, cells, "special", name, level);
        this.onChange(ev);
    }
    changeLevel(ev) {
        let select = ev.target;
        const level = select.value;
        let row = select.parentElement.parentNode;
        const cells = this.cells;
        const name = Table.cellValue(row, cells, "name");
        Table.updateCell(row, cells, "hp", name, level);
        Table.updateCell(row, cells, "atk", name, level);
        Table.updateCell(row, cells, "def", name, level);
        Table.updateCell(row, cells, "special", name, level);
        this.onChange(ev);
    }
}
class WeaponTable extends ItemTable {
    constructor(type, list) {
        super(type);
        const listeners = { change: (ev) => this.onChange(ev) };
        const cells = {
            index: new IndexCell(),
            name: new NameCell(list, { change: ev => this.changeName(ev) }),
            level: new AscensionLevelCell({ change: ev => this.changeLevel(ev) }),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new WeaponAtkCell(list, listeners),
            second: new SecondBonusCell(list, listeners),
        };
        this.cells = cells;
    }
    status(row, status) {
        const cells = this.cells;
        const name = Table.cellValue(row, cells, "name");
        const rank = Table.cellValue(row, cells, "rank");
        status.base.atk += Table.cellValue(row, cells, "atk");
        status.addValue(Table.cellValue(row, cells, "second"));
        return { bonus: WEAPON_LIST[this.type][name].passive, rank: rank - 1 };
    }
    changeName(ev) {
        let select = ev.target;
        const name = select.value;
        let row = select.parentElement.parentElement;
        let cells = this.cells;
        Table.updateCell(row, cells, "atk", name, Table.cellValue(row, cells, "level"));
        Table.updateCell(row, cells, "second", name);
        this.onChange(ev);
    }
    changeLevel(ev) {
        let select = ev.target;
        const level = select.value;
        let row = select.parentElement.parentElement;
        let cells = this.cells;
        const name = Table.cellValue(row, cells, "name");
        Table.updateCell(row, cells, "atk", name, level);
        Table.updateCell(row, cells, "second", name);
        this.onChange(ev);
    }
}
class ArtifactTable extends ItemTable {
    constructor(type, list) {
        super(type);
        const listeners = { change: (ev) => this.changeSub(ev) };
        const cells = {
            index: new IndexCell(),
            name: new ArtifactCell(list, { change: ev => this.onChange(ev) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: ev => this.changeStar(ev) }),
            level: new ArtifactLevelCell({ change: ev => this.changeLevel(ev) }),
            main: new BonusListCell([]),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        };
        this.cells = cells;
    }
    load() {
        super.load();
        const builders = this.cells;
        let row = this.html.rows[2];
        while (row) {
            this.updateScore(row, builders, Table.cellValue(row, builders, "star"), Table.cellValue(row, builders, "level"));
            row = row.nextElementSibling;
        }
    }
    status(row, status) {
        const cells = this.cells;
        const name = Table.cellValue(row, cells, "name");
        status.addValue(Table.cellValue(row, cells, "main"));
        status.addValue(Table.cellValue(row, cells, "sub1"));
        status.addValue(Table.cellValue(row, cells, "sub2"));
        status.addValue(Table.cellValue(row, cells, "sub3"));
        status.addValue(Table.cellValue(row, cells, "sub4"));
        return name;
    }
    changeStar(ev) {
        let select = ev.target;
        const star = parseInt(select.value);
        let row = select.parentElement.parentElement;
        const cells = this.cells;
        let cel = row.querySelector("td#level");
        cells.level.update(cel, star);
        const level = cells.level.value(cel);
        Table.updateCell(row, cells, "main", star, level);
        this.updateScore(row, cells, star, level);
        this.onChange(ev);
    }
    changeLevel(ev) {
        let select = ev.target;
        const level = parseInt(select.value);
        let row = select.parentElement.parentElement;
        const cells = this.cells;
        const star = Table.cellValue(row, cells, "star");
        Table.updateCell(row, cells, "main", star, level);
        this.updateScore(row, cells, star, level);
        this.onChange(ev);
    }
    changeMain(ev) {
        let select = ev.target;
        let cel = select.parentElement;
        let row = cel.parentElement;
        const cells = this.cells;
        cells.main.update(cel, Table.cellValue(row, cells, "star"), Table.cellValue(row, cells, "level"));
        this.onChange(ev);
    }
    changeSub(ev) {
        let row = ev.target.parentNode.parentNode;
        const cells = this.cells;
        this.updateScore(row, cells, Table.cellValue(row, cells, "star"), Table.cellValue(row, cells, "level"));
        this.onChange(ev);
    }
    updateScore(row, cells, star, level) {
        let cel = row.querySelector("td#name");
        cel.className = "score";
        removeWithoutFirstChild(cel);
        if (star < 4)
            return;
        let sub = [
            Table.cellValue(row, cells, "sub1"),
            Table.cellValue(row, cells, "sub2"),
            Table.cellValue(row, cells, "sub3"),
            Table.cellValue(row, cells, "sub4"),
        ];
        let score = [0, 0, 0, 0];
        let total = 0;
        let limit = 10 + Math.floor(level / 4) * 10;
        for (let i = 0; i < 4; ++i) {
            let param = getArtifactParam(star, level, sub[i].type);
            if (param && param.substep) {
                let value = Math.round(sub[i].value / param.substep);
                score[i] = value;
                total += value;
            }
        }
        limit += ((star === 4) ? 20 : 30);
        cel.appendChild(document.createElement("br"));
        cel.appendChild(document.createTextNode(`${total}/${limit} (${score.join(",")})`));
    }
}
class FlowerTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Flower, FLOWER_LIST);
        this.cells.main = new SingleBonusCell(StatusBonusType.Hp, { change: ev => this.onChange(ev) });
    }
}
class FeatherTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Feather, FEATHER_LIST);
        this.cells.main = new SingleBonusCell(StatusBonusType.Atk, { change: ev => this.onChange(ev) });
    }
}
class SandsTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Sands, SANDS_LIST);
        this.cells.main = new MultiBonusCell(ARTIFACT_SANDS, { change: ev => this.changeMain(ev) });
    }
}
class GobletTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Goblet, GOBLET_LIST);
        this.cells.main = new MultiBonusCell(ARTIFACT_GOBLET, { change: ev => this.changeMain(ev) });
    }
}
class CircletTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Circlet, CIRCLET_LIST);
        this.cells.main = new MultiBonusCell(ARTIFACT_CIRCLET, { change: ev => this.changeMain(ev) });
    }
}
class EquipmentCellTable {
    constructor(type, cell) {
        this.table = Table.List[type];
        this.cell = cell;
        this.counter = 0;
        this.items = null;
    }
    get updated() {
        return this.table.counter !== this.counter;
    }
    prepare() {
        this.items = this.cell.items;
    }
    refresh(cell) {
        this.cell.update(cell, this.items);
    }
    cleanup() {
        this.counter = this.table.counter;
        this.items = null;
    }
    update(cell) {
        this.cell.update(cell, this.cell.items);
    }
    status(cell, status) {
        return this.table.status(this.cell.value(cell), status);
    }
}
class EquipmentTable extends ItemTable {
    constructor() {
        super(TableType.Equip);
        const listeners = { change: (ev) => this.onChange(ev) };
        let chara = new EquipmentCell(EquipmentType.Chara, { change: ev => this.changeChara(ev) });
        let weapon = new EquipWeaponCell(listeners);
        let flower = new EquipmentCell(ArtifactType.Flower, listeners);
        let feather = new EquipmentCell(ArtifactType.Feather, listeners);
        let sands = new EquipmentCell(ArtifactType.Sands, listeners);
        let goblet = new EquipmentCell(ArtifactType.Goblet, listeners);
        let circlet = new EquipmentCell(ArtifactType.Circlet, listeners);
        this.cells = {
            index: new IndexCell(),
            chara: chara,
            weapon: weapon,
            flower: flower,
            feather: feather,
            sands: sands,
            goblet: goblet,
            circlet: circlet,
        };
        this.tables = {
            chara: new EquipmentCellTable(EquipmentType.Chara, chara),
            sword: new EquipmentCellTable(WeaponType.Sword, weapon.builder(WeaponType.Sword)),
            claymore: new EquipmentCellTable(WeaponType.Claymore, weapon.builder(WeaponType.Claymore)),
            polearm: new EquipmentCellTable(WeaponType.Polearm, weapon.builder(WeaponType.Polearm)),
            bow: new EquipmentCellTable(WeaponType.Bow, weapon.builder(WeaponType.Bow)),
            catalyst: new EquipmentCellTable(WeaponType.Catalyst, weapon.builder(WeaponType.Catalyst)),
            flower: new EquipmentCellTable(ArtifactType.Flower, flower),
            feather: new EquipmentCellTable(ArtifactType.Feather, feather),
            sands: new EquipmentCellTable(ArtifactType.Sands, sands),
            goblet: new EquipmentCellTable(ArtifactType.Goblet, goblet),
            circlet: new EquipmentCellTable(ArtifactType.Circlet, circlet),
        };
    }
    static checkInsert() {
        let require = Table.List.equip.requireItem();
        if (0 < require.length) {
            window.alert("以下の装備を整えてください。\n・" + require.join("\n・"));
        }
        else {
            ItemTable.insertRow("equip");
        }
    }
    removable(_) {
        return true;
    }
    refresh() {
        let updated = false;
        let updates = {};
        for (const type of EquipmentTypes) {
            let table = this.tables[type];
            if (table.updated) {
                updates[type] = table;
                updated = true;
            }
        }
        if (updated) {
            for (const type in updates) {
                updates[type].prepare();
            }
            let rows = Array.from(this.html.rows);
            for (let i = 2, len = rows.length; i < len; ++i) {
                let cells = Array.from(rows[i].cells);
                for (let cell of cells) {
                    let type = cell.id;
                    if (type === "weapon") {
                        type = cell.firstElementChild.value.split("_")[0];
                    }
                    if (type in updates) {
                        updates[type].refresh(cell);
                    }
                }
            }
            for (const type in updates) {
                updates[type].cleanup();
            }
            this.onChange();
        }
        return this.counter;
    }
    clear() {
        super.clear();
        for (const type of EquipmentTypes) {
            this.tables[type].cleanup();
        }
    }
    exists(id) {
        let type = id.split("_")[0];
        let html = this.html;
        let items;
        if (WeaponTypes.weakContains(type)) {
            items = Array.from(html.querySelectorAll(`td#weapon select`));
        }
        else {
            items = Array.from(html.querySelectorAll(`td#${type} select`));
        }
        for (let item of items) {
            if (item.value === id) {
                return true;
            }
        }
        return false;
    }
    characters() {
        let cells = Array.from(document.querySelectorAll("table#tbl_equip td#chara"));
        let values = [];
        for (let cell of cells) {
            const label = Cell.getSelectLabel(cell);
            values.push({ key: cell.parentElement.id, value: label.split(".")[1] });
        }
        return values;
    }
    apply(row, type, status) {
        return this.tables[type].status(row.querySelector("td#" + type), status);
    }
    applyWeapon(row, type, status) {
        return this.tables[type].status(row.querySelector("td#weapon"), status);
    }
    requireItem() {
        let require = [];
        for (const type of EquipmentTypes) {
            if (!document.querySelector(`table#tbl_${type} td#name`)) {
                require.push(TABLE_LABEL[type]);
            }
        }
        return require;
    }
    changeChara(ev) {
        let select = ev.target;
        const value = select.value;
        let cell = document.querySelector(`table#tbl_chara tr#${value} td#name`);
        const weapon = CHARACTER[cell.firstElementChild.value].weapon;
        this.tables[weapon].update(select.parentElement.nextElementSibling);
        this.onChange(ev);
    }
}
class TableBridge {
    constructor(parent) {
        this.parent = parent;
        this.counter = 0;
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
}
class TeamTable extends Table {
    constructor() {
        super(TableType.Team);
        this.bridge = new TableBridge(Table.List.equip);
        this.members = [null, null, null, null];
        this.params = {
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
            plunge_dmg: new DamageParam("plunge_dmg"),
            heavy_dmg: new DamageParam("heavy_dmg"),
            heavy_cri: new DamageParam("heavy_cri"),
            skill_dmg: new DamageParam("skill_dmg"),
            skill_cri: new DamageParam("skill_cri"),
            burst_dmg: new DamageParam("burst_dmg"),
            any_dmg: new DamageParam("any_dmg"),
            melt_dmg: new ElemReactParam("melt_dmg"),
            swirl_dmg: new ElemReactParam("swirl_dmg"),
            echarge_dmg: new ElemReactParam("echarge_dmg"),
            shutter_dmg: new ElemReactParam("shutter_dmg"),
            conduct_dmg: new ElemReactParam("conduct_dmg"),
            vaporize_dmg: new ElemReactParam("vaporize_dmg"),
            overload_dmg: new ElemReactParam("overload_dmg"),
        };
    }
    static changeMember(no, elem) {
        Table.List.team.assign(no, elem);
    }
    load() {
        this.onRefresh();
    }
    clear() {
        this.bridge.reset();
        this.members = this.members.fill(null);
        let html = this.html;
        let cells = Array.from(html.rows[0].querySelectorAll("td"));
        for (let cell of cells) {
            removeChildren(cell.firstElementChild);
        }
        this.build(html);
    }
    refresh() {
        return this.bridge.refresh(this);
    }
    onRefresh() {
        let bonus = Table.List.bonus;
        bonus.reset();
        this.members = this.members.fill(null);
        let list = Table.List.equip.characters();
        let html = this.html;
        let cells = Array.from(html.rows[0].querySelectorAll("td"));
        for (let no = 0; no < 4; ++no) {
            let select = cells[no].firstElementChild;
            let selected = select.value;
            removeChildren(select);
            for (let i = 0; i < list.length; ++i) {
                let item = list[i];
                let opt = document.createElement("option");
                opt.value = item.key;
                opt.label = `${i + 1}.${item.value}`;
                opt.selected = (selected === item.key);
                select.appendChild(opt);
            }
            if (0 <= select.selectedIndex) {
                this.members[no] = this.member(select.value);
            }
        }
        bonus.attach(this.members);
        Table.List.damage.listup();
        this.build(html);
    }
    build(html) {
        let rows = Array.from(html.rows);
        for (let i = 2, len = rows.length; i < len; ++i) {
            let row = rows[i];
            let type = row.id;
            if (type in this.params) {
                let cells = row.cells;
                let param = this.params[type];
                for (let no = 0; no < 4; ++no) {
                    param.set(cells[1 + no * 2], this.members[no]);
                }
            }
        }
    }
    member(cid) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let equip = Table.List.equip;
        let row = document.querySelector("table#tbl_equip tr#" + cid);
        let status = new Status(this.rid);
        const chara = equip.apply(row, EquipmentType.Chara, status);
        status.chara = chara;
        let weapon = equip.applyWeapon(row, chara.weapon, status);
        const items = [
            equip.apply(row, ArtifactType.Flower, status),
            equip.apply(row, ArtifactType.Feather, status),
            equip.apply(row, ArtifactType.Sands, status),
            equip.apply(row, ArtifactType.Goblet, status),
            equip.apply(row, ArtifactType.Circlet, status),
        ];
        let bonus = Table.List.bonus;
        bonus.artifact(status, items);
        bonus.weapon(status, weapon.bonus, weapon.rank);
        const name = chara.name;
        bonus.appends(status, (_a = chara.passive) === null || _a === void 0 ? void 0 : _a.skill, name);
        bonus.appends(status, (_b = chara.passive) === null || _b === void 0 ? void 0 : _b.burst, name);
        if ((21 <= status.level) || (status.lv === "20+")) {
            bonus.appends(status, (_c = chara.passive) === null || _c === void 0 ? void 0 : _c.lv4, name);
        }
        if ((61 <= status.level) || (status.lv === "60+")) {
            bonus.appends(status, (_d = chara.passive) === null || _d === void 0 ? void 0 : _d.lv5, name);
        }
        if (1 <= status.conste) {
            bonus.appends(status, (_e = chara.conste) === null || _e === void 0 ? void 0 : _e.lv1, name);
        }
        if (2 <= status.conste) {
            bonus.appends(status, (_f = chara.conste) === null || _f === void 0 ? void 0 : _f.lv2, name);
        }
        if (4 <= status.conste) {
            bonus.appends(status, (_g = chara.conste) === null || _g === void 0 ? void 0 : _g.lv4, name);
        }
        if (6 <= status.conste) {
            bonus.appends(status, (_h = chara.conste) === null || _h === void 0 ? void 0 : _h.lv6, name);
        }
        return status;
    }
    assign(no, elem) {
        let bonus = Table.List.bonus;
        bonus.detach(this.members[no], this.members);
        this.members[no] = null;
        this.members[no] = this.member(elem.value);
        bonus.attach(this.members);
        Table.List.damage.listup();
        this.build(this.html);
        this.onChange();
    }
}
class BonusTable extends Table {
    constructor() {
        super(TableType.Bonus);
        this.bridge = new TableBridge(Table.List.team);
        this.applied = [];
        this.everyone = [];
    }
    load() {
        this.onRefresh();
    }
    clear() {
        this.bridge.reset();
        this.reset();
        this.onRefresh();
    }
    refresh() {
        return this.bridge.refresh(this);
    }
    onRefresh() {
        const innerHtml = (bonuses) => {
            let text = "";
            for (let bonus of bonuses) {
                if (bonus.valid) {
                    text += bonus.toString();
                }
                else {
                    text += `<span style="color:silver">${bonus.toString()}</span>`;
                }
                text += "<br>";
            }
            return text;
        };
        let members = Table.List.team.members;
        let row = this.html.rows[1];
        for (let status of members) {
            let cells = row.cells;
            if (status) {
                cells[0].textContent = status.chara.name;
                cells[1].innerHTML = innerHtml(status.bonus);
            }
            else {
                cells[0].textContent = "-";
                cells[1].innerHTML = "";
            }
            row = row.nextElementSibling;
        }
        let cell = row.cells[1];
        if (0 < this.everyone.length) {
            cell.innerHTML = innerHtml(this.everyone);
        }
        else {
            cell.innerHTML = "";
        }
    }
    reset() {
        this.applied = [];
        this.everyone = [];
    }
    weapon(status, bonuses, rank) {
        if (bonuses) {
            if (Array.isArray(bonuses)) {
                for (const bonus of bonuses) {
                    const data = Object.assign(Object.assign({}, bonus), { value: bonus.value[rank] });
                    this.append(status, data, LABEL_TEXT.weapon);
                }
            }
            else {
                const data = Object.assign(Object.assign({}, bonuses), { value: bonuses.value[rank] });
                this.append(status, data, LABEL_TEXT.weapon);
            }
        }
    }
    artifact(status, items) {
        items.sort();
        let first = 0;
        while (first < items.length) {
            let item = items[first];
            let last = items.lastIndexOf(item) + 1;
            if (item in ARTIFACT_SET) {
                let same = last - first;
                let artifact = ARTIFACT_SET[item];
                if (2 <= same) {
                    this.appends(status, artifact.set2, LABEL_TEXT.artifact);
                }
                if (4 <= same) {
                    this.appends(status, artifact.set4, LABEL_TEXT.artifact);
                }
            }
            first = last;
        }
    }
    appends(status, bonuses, source) {
        if (bonuses) {
            if (Array.isArray(bonuses)) {
                for (const bonus of bonuses) {
                    this.append(status, bonus, source);
                }
            }
            else {
                this.append(status, bonuses, source);
            }
        }
    }
    append(status, bonus, source) {
        switch (bonus.extra) {
            case undefined:
                if (!bonus.target || (bonus.target === BonusTarget.Self)) {
                    status.append(new BasicBonus(status.id, bonus, source));
                }
                else {
                    this.everyone.push(new BasicBonus(status.id, bonus, status.chara.name));
                }
                break;
            case ExtraBonusType.Flat:
                if (!bonus.target || (bonus.target === BonusTarget.Self)) {
                    status.append(new FlatBonus(status.id, bonus, source, status));
                }
                else {
                    this.everyone.push(new FlatBonus(status.id, bonus, status.chara.name, status));
                }
                break;
            case ExtraBonusType.Reduct:
                status.append(new ReductBonus(status.id, bonus, status.chara.name, _ => EnemyTable.update()));
                break;
            case ExtraBonusType.Enchant:
                if (!bonus.target || (bonus.target === BonusTarget.Self)) {
                    status.append(new EnchantBonus(status.id, bonus, source));
                }
                else {
                    this.everyone.push(new EnchantBonus(status.id, bonus, status.chara.name));
                }
                break;
        }
    }
    attach(members) {
        let types = [];
        for (let status of members) {
            if (status) {
                types.push(status.chara.element);
            }
        }
        types.sort();
        let first = 0;
        while (first < types.length) {
            let type = types[first];
            let last = types.lastIndexOf(type) + 1;
            if (2 <= (last - first)) {
                const data = TEAM_BONUS[type];
                if (data) {
                    let bonus = new BasicBonus("team", data, LABEL_TEXT.resonance);
                    if (!bonus.limit) {
                        bonus.valid = false;
                        for (let status of members) {
                            status === null || status === void 0 ? void 0 : status.addValues(bonus.apply(status));
                        }
                        this.applied.push(bonus);
                    }
                    this.everyone.push(bonus);
                }
            }
            first = last;
        }
    }
    detach(status, members) {
        if (status) {
            let bonuses = this.everyone.filter(bonus => bonus.id !== status.id);
            this.everyone = bonuses.filter(bonus => bonus.id !== "team");
            for (let bonus of this.applied) {
                for (let status of members) {
                    status === null || status === void 0 ? void 0 : status.subValues(bonus.apply(status));
                }
            }
            this.applied = [];
        }
    }
    enumerate(status) {
        let bonuses = [];
        for (let bonus of status.bonus) {
            if (bonus.valid) {
                bonuses.push(bonus);
            }
        }
        for (let bonus of this.everyone) {
            if (bonus.applicable(status)) {
                bonuses.push(bonus);
            }
        }
        const data = { extra: ExtraBonusType.Reduct, type: ElementType.Phys, value: 40, limit: "超電導が発生した時", times: 12 };
        bonuses.push(new ReductBonus("conduct", data, "元素反応", _ => EnemyTable.update()));
        return bonuses;
    }
}
class EnemyTable extends Table {
    constructor() {
        super(TableType.Enemy);
        this.target = null;
    }
    static update() {
        Table.List.enemy.rebuild(Table.List.damage.member);
    }
    static changeList(elem) {
        Table.List.enemy.rebuild(Table.List.damage.member, elem);
        Table.List.damage.calculate();
    }
    static changeLevel(elem) {
        Table.List.enemy.level(Table.List.damage.member, elem);
        Table.List.damage.calculate();
    }
    load() {
        let html = this.html;
        let select = html.querySelector("select#enemy_list");
        for (let key in ENEMY_LIST) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.label = ENEMY_LIST[key].name;
            select.appendChild(opt);
        }
        this.target = new Enemy(select.value);
        this.build(html, this.target);
    }
    clear() {
        this.defence(null);
    }
    rebuild(status, select) {
        let html = this.html;
        if (!select) {
            select = html.querySelector("select#enemy_list");
        }
        this.target = new Enemy(select.value);
        Table.List.apply.enemy(this.target);
        this.build(html, this.target);
        this.level(status, html.querySelector("input#enemy_level"));
    }
    build(html, target) {
        let row = html.rows[2];
        while (row.id) {
            const type = row.id;
            let cells = row.cells;
            let resist = target.resist[type];
            let reduct = target.reduct[type];
            if (resist === Infinity) {
                cells[1].textContent = LABEL_TEXT.immutable;
            }
            else {
                cells[1].textContent = (resist - reduct) + "%";
            }
            cells[2].textContent = floorRate(target.resistance(type) * 100);
            row = row.nextElementSibling;
        }
    }
    level(status, input) {
        this.target.level = parseInt(input.value);
        this.defence(status);
    }
    defence(status) {
        let cell = this.html.querySelector("tbody").lastElementChild.cells[2];
        let level = status ? status.level : 0;
        cell.textContent = floorRate(this.target.defence(level) * 100);
    }
}
class ApplyTable extends Table {
    constructor() {
        super(TableType.Apply);
        this.bonuses = [];
    }
    clear() {
        let html = this.html;
        let rows = html.rows;
        for (let len = rows.length; 1 < len; --len) {
            html.deleteRow(1);
        }
        this.bonuses = [];
    }
    rebuild(status) {
        this.clear();
        if (status) {
            let html = this.html;
            let rows = html.rows;
            let caption = rows[0];
            let bonuses = Table.List.bonus.enumerate(status);
            for (let bonus of bonuses) {
                let row = html.insertRow();
                bonus.build(caption, row, _ => Table.List.damage.calculate());
            }
            this.bonuses = bonuses;
        }
        Table.List.enemy.rebuild(status);
    }
    status(status) {
        let clone = status.clone();
        let row = this.html.rows[0];
        for (let bonus of this.bonuses) {
            row = row.nextElementSibling;
            clone.addValues(bonus.applyRow(status, row));
        }
        return clone;
    }
    enemy(enemy) {
        let row = this.html.rows[0];
        for (let bonus of this.bonuses) {
            row = row.nextElementSibling;
            if (bonus.extra === ExtraBonusType.Reduct) {
                bonus.applyEnemy(enemy, row);
            }
        }
    }
}
class DamageTable extends Table {
    constructor() {
        super(TableType.Damage);
        this.bridge = new TableBridge(Table.List.team);
    }
    static changeMember() {
        Table.List.damage.onRefresh();
    }
    get member() {
        let no = this.html.querySelector("select#member_list").selectedIndex;
        if (no !== -1) {
            return Table.List.team.members[no];
        }
        return null;
    }
    load() {
        this.onRefresh();
    }
    clear() {
        this.bridge.reset();
        this.listup();
        this.onRefresh();
    }
    listup() {
        let html = this.html;
        let select = html.querySelector("select#member_list");
        let index = select.selectedIndex;
        removeChildren(select);
        let members = Table.List.team.members;
        for (let i = 0; i < 4; ++i) {
            let member = members[i];
            if (member) {
                let opt = document.createElement("option");
                opt.value = i.toString();
                opt.label = member.chara.name;
                opt.selected = (index === i);
                select.appendChild(opt);
            }
        }
    }
    refresh() {
        return this.bridge.refresh(this);
    }
    onRefresh() {
        let status = this.member;
        Table.List.apply.rebuild(status);
        let html = this.html;
        for (let len = html.rows.length; 2 < len; --len) {
            html.deleteRow(2);
        }
        if (status) {
            this.rebuild(html, status);
        }
        else {
            let row = html.rows[0];
            let cell = row.cells[0];
            cell.lastChild.textContent = "Lv.0";
            cell = row.nextElementSibling.cells[2];
            cell.textContent = "0";
            cell.nextElementSibling.textContent = "0.0%";
        }
    }
    rebuild(html, status) {
        let rows = html.rows;
        rows[0].cells[0].lastChild.textContent = "Lv." + status.level;
        let buildRow = (type) => {
            let level = status.talent[type];
            {
                let row = html.insertRow();
                let cel = document.createElement("th");
                cel.colSpan = 6;
                cel.textContent = `${TALENT_LABEL[type]} : Lv.${level}`;
                row.appendChild(cel);
            }
            let combats = status.chara.talent[type];
            for (let combat of combats) {
                let attr = new CombatAttribute(combat, level);
                let elem = attr.elem;
                let className = elem;
                let row = html.insertRow();
                let cel = document.createElement("th");
                cel.appendChild(document.createTextNode(attr.name));
                if (elem === CombatElementType.Contact) {
                    className = "";
                    let select = document.createElement("select");
                    select.id = "contact_type";
                    for (let type of ContactReactionTypes) {
                        let opt = document.createElement("option");
                        opt.value = type;
                        opt.label = CONTACT_REACTION_LABEL[type];
                        select.appendChild(opt);
                    }
                    select.addEventListener("change", ev => this.contactType(ev.target));
                    cel.appendChild(select);
                }
                row.appendChild(cel);
                cel = document.createElement("td");
                cel.className = className;
                let text = attr.toString(value => floorRate(value));
                switch (attr.based) {
                    case DamageBased.Def:
                        text += "(防)";
                        break;
                }
                cel.textContent = text;
                row.appendChild(cel);
                for (let i = 0; i < 4; ++i) {
                    cel = document.createElement("td");
                    cel.className = className;
                    row.appendChild(cel);
                }
            }
        };
        buildRow(TalentType.Combat);
        buildRow(TalentType.Skill);
        buildRow(TalentType.Burst);
        this.calcDamage(html, status);
    }
    contactType(select) {
        let cell = select.parentElement.nextElementSibling;
        let row = cell.parentElement;
        const className = select.value;
        cell.className = className;
        cell = cell.nextElementSibling;
        cell.className = className;
        cell.textContent = "-";
        cell = cell.nextElementSibling;
        cell.className = className;
        cell.textContent = "-";
        let status = this.member;
        if (status && select.value) {
            const combats = status.chara.talent.burst;
            for (const combat of combats) {
                if (combat.elem === CombatElementType.Contact) {
                    let attr = new CombatAttribute(combat, status.talent.burst);
                    attr.damage(row, status, Table.List.enemy.target);
                    break;
                }
            }
        }
    }
    reactionType(cell) {
        let select = cell.firstElementChild;
        if (select) {
            return select.value;
        }
        return undefined;
    }
    listReaction(caption, status) {
        let cell = caption.cells[4];
        const prev = this.reactionType(cell);
        removeChildren(cell);
        const reactions = status.reactions;
        if (0 < reactions.length) {
            let select = document.createElement("select");
            select.id = "reaction_type";
            {
                let opt = document.createElement("option");
                opt.value = "";
                opt.label = "-";
                select.appendChild(opt);
            }
            for (const type of reactions) {
                let opt = document.createElement("option");
                opt.value = type;
                opt.label = REACTION_LABEL[type];
                opt.selected = (type === prev);
                select.appendChild(opt);
            }
            select.addEventListener("change", _ => this.calculate());
            cell.appendChild(select);
        }
        else {
            cell.appendChild(document.createTextNode("-"));
        }
    }
    applyEnchant(row, status) {
        const elementType = (combat, bonus) => {
            if (bonus && (combat.elem === ElementType.Phys)) {
                const type = combat.type;
                for (const dest of bonus.dest) {
                    if (type === dest) {
                        return bonus.type;
                    }
                }
            }
            return combat.elem;
        };
        const enchant = status.enchant;
        const talent = status.chara.talent;
        const rebuildRow = (type) => {
            row = row.nextElementSibling;
            for (const combat of talent[type]) {
                const elem = elementType(combat, enchant);
                let cells = Array.from(row.cells);
                for (let i = 1; i <= 5; ++i) {
                    cells[i].className = elem;
                }
                row = row.nextElementSibling;
            }
        };
        rebuildRow(TalentType.Combat);
    }
    calcDamage(html, status) {
        status = Table.List.apply.status(status);
        let row = html.rows[1];
        this.listReaction(row, status);
        let cells = Array.from(row.cells);
        const critical = status.critical();
        cells[2].textContent = status.attack.toFixed();
        cells[3].textContent = `+${floorRate(critical.damage)}(${floorRate(critical.rate)})`;
        const reaction = this.reactionType(cells[4]);
        row = row.nextElementSibling;
        this.applyEnchant(row, status);
        let enemy = Table.List.enemy.target;
        const damageRow = (type) => {
            row = row.nextElementSibling;
            let level = status.talent[type];
            let combats = status.chara.talent[type];
            for (let combat of combats) {
                let attr = new CombatAttribute(combat, level);
                attr.damage(row, status, enemy, reaction);
                row = row.nextElementSibling;
            }
        };
        damageRow(TalentType.Combat);
        damageRow(TalentType.Skill);
        damageRow(TalentType.Burst);
    }
    calculate() {
        let member = this.member;
        if (member) {
            this.calcDamage(this.html, member);
        }
    }
}
window.onload = () => {
    Table.Title = document.title;
    Table.List.chara = new CharaTable();
    Table.List.sword = new WeaponTable(WeaponType.Sword, SWORD_LIST);
    Table.List.claymore = new WeaponTable(WeaponType.Claymore, CLAYMORE_LIST);
    Table.List.polearm = new WeaponTable(WeaponType.Polearm, POLEARM_LIST);
    Table.List.bow = new WeaponTable(WeaponType.Bow, BOW_LIST);
    Table.List.catalyst = new WeaponTable(WeaponType.Catalyst, CATALYST_LIST);
    Table.List.flower = new FlowerTable();
    Table.List.feather = new FeatherTable();
    Table.List.sands = new SandsTable();
    Table.List.goblet = new GobletTable();
    Table.List.circlet = new CircletTable();
    Table.List.equip = new EquipmentTable();
    Table.List.team = new TeamTable();
    Table.List.bonus = new BonusTable();
    Table.List.enemy = new EnemyTable();
    Table.List.apply = new ApplyTable();
    Table.List.damage = new DamageTable();
    Table.loadData();
};
function refreshTable(type) {
    Table.List[type].refresh();
}
