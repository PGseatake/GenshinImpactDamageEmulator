const VERSION = "0.02";

const TableTypes = [
    "chara",
    "sword",
    "claymore",
    "polearm",
    "bow",
    "catalyst",
    "flower",
    "feather",
    "sands",
    "goblet",
    "circlet",
    "equip",
    "team",
    "bonus",
    "enemy",
    "apply",
    "damage"
] as const;

type TableType = typeof TableTypes[number];
const TableType = {
    Chara: "chara",
    Equip: "equip",
    Team: "team",
    Bonus: "bonus",
    Enemy: "enemy",
    Apply: "apply",
    Damage: "damage",
} as const;

type ItemTableType = "chara" | "equip" | WeaponType | ArtifactType;

// TODO: 多言語対応
const TABLE_LABEL: Record<TableType, string> = {
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
    apply: "ボーナス",
    damage: "ダメージ",
} as const;

interface ITableList extends Partial<Record<TableType, Table>> {
    chara?: CharaTable;
    sword?: WeaponTable;
    claymore?: WeaponTable;
    polearm?: WeaponTable;
    bow?: WeaponTable;
    catalyst?: WeaponTable;
    flower?: ArtifactTable;
    feather?: ArtifactTable;
    sands?: ArtifactTable;
    goblet?: ArtifactTable;
    circlet?: ArtifactTable;
    equip?: EquipmentTable;
    team?: TeamTable;
    bonus?: BonusTable;
    enemy?: EnemyTable;
    apply?: ApplyTable;
    damage?: DamageTable;
}

interface ITableCellList {
    [key: string]: Cell;
}

// テーブル管理の基底クラス
class Table {
    static List: ITableList = {};
    static Title = "";
    static Updated = false;

    // 全データの読み込み
    static loadData() {
        for (const type of TableTypes) {
            Table.List[type]!.load();
        }
    }

    // 全データの保存
    static saveData() {
        if (Table.Updated) {
            // タブ毎にデータをjsonで保存
            for (const type of TableTypes) {
                Table.List[type]!.save();
            }

            document.title = Table.Title;
            Table.Updated = false;
        }
    }

    // 全データのエクスポート
    static exportData() {
        Table.saveData();

        // バージョン情報を付加してひとまとめにする
        let data: IMap<any> = { ver: VERSION };
        for (const type of TableTypes) {
            let json = localStorage.getItem(type);
            if (!!json) {
                data[type] = JSON.parse(json);
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
        if (confirm("すべてのタブの内容が上書きされます。よろしいですか？")) {
            (document.getElementById("import") as HTMLInputElement).click();
        }
    }

    // 全データのインポート
    static importData() {
        let elem = document.getElementById("import") as HTMLInputElement;
        let file = elem.files!.item(0);
        if (!!file) {
            // jsonファイル読み込み
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                let json = reader.result as string;
                if (!!json) {
                    let data = JSON.parse(json);
                    // TODO: ここでデータのチェックをする

                    // データの削除
                    for (const type of TableTypes) {
                        Table.List[type]!.clear();
                    }

                    for (const type of TableTypes) {
                        // 外部データをlocalStorageに保存
                        if (type in data) {
                            localStorage.setItem(type, JSON.stringify(data[type]));
                        }

                        Table.List[type]!.load();
                    }
                }
                elem.value = ""; // 同じファイル名を続けてインポートできるように値をクリア
            };
        }
    }

    // データ削除前の確認
    // TODO: 多言語対応
    static clearConfirm(all: boolean) {
        if (all) {
            if (confirm("すべてのタブの内容が破棄されます。よろしいですか？")) {
                for (const type of TableTypes) {
                    Table.List[type]!.clear();
                }

                document.title = Table.Title;
                Table.Updated = false;
            }
        } else {
            let elem = document.querySelector("input[name='TAB']:checked") as HTMLInputElement;
            let tbl = Table.List[elem.id.replace("tab_", "") as TableType]!;
            if (tbl.clearable) {
                if (confirm(`${tbl.text}タブの内容が破棄されます。よろしいですか？`)) {
                    tbl.clear();
                }
            }
        }
    }

    // セルの更新
    protected static updateCell<
        TList extends ITableCellList,
        TProp extends keyof TList,
        TArgs extends unknown[]
    >(row: HTMLRowElement, cells: TList, prop: TProp, ...args: [...TArgs]) {
        cells[prop].update(row.querySelector("td#" + prop) as HTMLCellElement, ...args);
    }

    // セル値の取得
    protected static cellValue<
        TList extends ITableCellList,
        TProp extends keyof TList,
        TReturn = ReturnType<TList[TProp]["value"]>
    >(row: HTMLRowElement, cells: TList, prop: TProp): TReturn {
        return cells[prop].value(row.querySelector("td#" + prop) as HTMLCellElement) as TReturn;
    }

    protected type: TableType;
    private serial: Integer;
    public counter: Integer;

    // コンストラクタ
    constructor(type: TableType) {
        this.type = type;
        this.serial = 0;
        this.counter = 0;
    }

    // 識別子取得
    protected get rid(): string {
        ++this.serial;
        return `${this.type}_${this.serial}`;
    }

    // テーブル表示名取得
    get text(): string {
        return TABLE_LABEL[this.type];
    }

    // <table>取得
    get html(): HTMLTableElement {
        return document.getElementById("tbl_" + this.type) as HTMLTableElement;
    }

    // データ消去可能かどうか
    get clearable(): boolean {
        return false;
    }

    // データの再表示
    refresh(): Integer {
        return 0;
    }

    // データの削除
    clear() {
    }

    // データの保存
    save() {
    }

    // データの読込
    load() {
    }

    // 値変更通知
    onChange(e: Nullable<Event> = null) {
        ++this.counter;
    }
}

// 装備品の基底クラス
class ItemTable extends Table {
    // 1行追加（htmlからの呼び出し版）
    static insertRow(type: ItemTableType) {
        let tbl = Table.List[type]!;
        let html = tbl.html;
        tbl.insert(html, tbl.initial(html));
        tbl.onChange();
    }

    // 削除確認
    // TODO: 多言語対応
    static removeConfirm(e: Event) {
        let btn = e.target as HTMLButtonElement;
        let row = btn.parentElement!.parentElement as HTMLRowElement;
        let html = row.parentElement!.parentElement as HTMLTableElement;
        let tbl = Table.List[html.id.replace("tbl_", "") as ItemTableType]!;
        const id = btn.id;
        const no = row.rowIndex - 1;
        if (tbl.removable(id)) {
            if (confirm(`No.${no}を削除します。よろしいですか？`)) {
                tbl.remove(html, id);
            }
        } else {
            window.alert(`No.${no}は装備中のため削除できません。`);
        }
    }

    protected cells: ITableCellList;

    // コンストラクタ
    constructor(type: TableType) {
        super(type);
        this.cells = {};
    }

    // データ消去可能かどうか
    get clearable(): boolean {
        return true;
    }

    // データ削除可能かどうか
    removable(id: string): boolean {
        return !Table.List.equip!.exists(id);
    }

    // データの削除
    clear() {
        let html = this.html;
        // rows[0,1]（キャプション）以外を削除
        for (let count = html.rows.length - 2; 0 < count; --count) {
            html.deleteRow(2);
        }

        localStorage.removeItem(this.type);
    }

    // データの保存
    save() {
        let data: IMap<CellData>[] = [];

        // htmlから解析
        let rows = Array.from(this.html.rows);
        for (let i = 2, len = rows.length; i < len; ++i) { // tbl.rows[0,1]は見出し行
            let map: IMap<CellData> = {};
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

    // データの読込
    load() {
        let json = localStorage.getItem(this.type);
        if (!!json) {
            let data: IMap<CellData>[] = JSON.parse(json);

            // htmlに展開
            let html = this.html;
            let init = this.initial(html);
            for (const line of data) {
                // データのない項目を初期値で設定
                for (let key in init) {
                    if (!(key in line)) {
                        line[key] = init[key];
                    }
                }

                this.insert(html, line);
            }
        }
    }

    // 既定値の取得
    initial(html: HTMLTableElement): IMap<CellData> {
        let ret: IMap<CellData> = {};
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

    // 1行追加
    insert(html: HTMLTableElement, values: IMap<CellData>) {
        const rid = this.rid;
        let row = html.insertRow();
        row.id = rid;

        // 見出し行のidからセルを生成
        let caps = html.rows[1].cells; // caption行は2行目
        for (let cap of caps) {
            let cel = row.insertCell();
            const id = cap.id;
            cel.id = id;

            // セル追加
            if (id in this.cells) {
                this.cells[id].load(cel, id, values);
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
        btn.addEventListener("click", ItemTable.removeConfirm);
        btn.appendChild(document.createTextNode("-"));
        add.appendChild(btn);
    }

    // 1行削除
    remove(html: HTMLTableElement, id: string) {
        // データ削除
        html.querySelector("tr#" + id)!.remove();

        // indexの再設定
        let index = this.cells.index;
        let rows = Array.from(html.rows);
        for (let i = 2, len = rows.length; i < len; ++i) {
            index.update(rows[i].cells[0]);
        }

        this.onChange();
    }

    // ステータス設定
    status(row: HTMLRowElement, status: Status): unknown {
        return null;
    }

    // 値変更通知
    onChange(e: Nullable<Event> = null) {
        super.onChange(e);

        if (!Table.Updated) {
            Table.Updated = true;
            document.title = "* " + Table.Title;
        }
    }
}

interface ICharaCellList extends ITableCellList {
    index: IndexCell;
    name: NameCell;
    conste: RangeCell;
    level: AscensionLevelCell;
    hp: CharaStatusCell;
    atk: CharaStatusCell;
    def: CharaStatusCell;
    special: CharaSpecialCell;
    combat: TalentCell;
    skill: TalentCell;
    burst: TalentCell;
}

// キャラクターテーブル
class CharaTable extends ItemTable {
    constructor() {
        super(TableType.Chara);
        const listeners = { change: (e: Event) => this.onChange(e) };
        const cells: ICharaCellList = {
            index: new IndexCell(),
            name: new NameCell(CHARACTER, { change: e => this.changeName(e) }),
            conste: new RangeCell(0, 6, listeners),
            level: new AscensionLevelCell({ change: e => this.changeLevel(e) }),
            hp: new CharaStatusCell(listeners),
            atk: new CharaStatusCell(listeners),
            def: new CharaStatusCell(listeners),
            special: new CharaSpecialCell(),
            combat: new TalentCell(1, TALENT_LV_MAX, listeners),
            skill: new TalentCell(1, TALENT_LV_MAX, listeners),
            burst: new TalentCell(1, TALENT_LV_MAX, listeners),
        };
        this.cells = cells;
    }

    // ステータス適用
    status(row: HTMLRowElement, status: Status): DeepReadonly<ICharacter> {
        const cells = this.cells as ICharaCellList;
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

    // 名前の変更
    private changeName(e: Event) {
        let select = e.target as HTMLSelectElement;
        const name = select.value;
        let row = select.parentElement!.parentElement as HTMLRowElement;

        const cells = this.cells as ICharaCellList;
        const level = Table.cellValue(row, cells, "level");

        // 基礎値の更新
        Table.updateCell(row, cells, "hp", name, level);
        Table.updateCell(row, cells, "atk", name, level);
        Table.updateCell(row, cells, "def", name, level);

        // 追加効果更新
        Table.updateCell(row, cells, "special", name, level);

        this.onChange(e);
    }

    // レベルの変更
    private changeLevel(e: Event) {
        let select = e.target as HTMLSelectElement;
        const level = select.value;
        let row = select.parentElement!.parentNode as HTMLRowElement;

        const cells = this.cells as ICharaCellList;
        const name = Table.cellValue(row, cells, "name");

        // 基礎値の更新
        Table.updateCell(row, cells, "hp", name, level);
        Table.updateCell(row, cells, "atk", name, level);
        Table.updateCell(row, cells, "def", name, level);

        // 追加効果更新
        Table.updateCell(row, cells, "special", name, level);

        this.onChange(e);
    }
}

interface IWeaponCellList extends ITableCellList {
    index: IndexCell;
    name: NameCell;
    level: AscensionLevelCell;
    rank: RangeCell;
    atk: IntCell;
    second: SecondBonusCell;
}

// 武器テーブル
class WeaponTable extends ItemTable {
    constructor(type: WeaponType, list: DeepReadonly<IMap<IWeapon>>) {
        super(type);
        const listeners = { change: (e: Event) => this.onChange(e) };
        const cells: IWeaponCellList = {
            index: new IndexCell(),
            name: new NameCell(list, { change: e => this.changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new SecondBonusCell(list, listeners),
        };
        this.cells = cells;
    }

    // ステータス適用
    status(row: HTMLRowElement, status: Status): DeepReadonly<IRankedWeaponBonus> {
        const cells = this.cells as IWeaponCellList;
        const name = Table.cellValue(row, cells, "name");
        const rank = Table.cellValue(row, cells, "rank");
        status.base.atk += Table.cellValue(row, cells, "atk");
        status.addValue(Table.cellValue(row, cells, "second"));

        return { bonus: WEAPON_LIST[this.type as WeaponType][name].passive, rank: rank - 1 };
    }

    // 名前の変更
    private changeName(e: Event) {
        let select = e.target as HTMLSelectElement;
        const bonus = select.value;
        let row = select.parentElement!.parentElement as HTMLRowElement;

        // 追加効果変更
        Table.updateCell(row, this.cells, "second", bonus);

        this.onChange(e);
    }
}

interface IArtifactCellList extends ITableCellList {
    index: IndexCell;
    name: ArtifactCell;
    star: RangeCell;
    level: ArtifactLevelCell;
    main: BonusListCell;
    sub1: BonusValueCell;
    sub2: BonusValueCell;
    sub3: BonusValueCell;
    sub4: BonusValueCell;
}

// 聖遺物テーブル基底
class ArtifactTable extends ItemTable {
    constructor(type: ArtifactType, list: DeepReadonly<IMap<string>>) {
        super(type);
        const listeners = { change: (e: Event) => this.changeSub(e) };
        const cells: IArtifactCellList = {
            index: new IndexCell(),
            name: new ArtifactCell(list, { change: e => this.onChange(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => this.changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => this.changeLevel(e) }),
            main: new BonusListCell([]), // 継承先で上書き
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        };
        this.cells = cells;
    }

    // データの読込
    load() {
        super.load();

        // 読み込み時のスコア表示
        const builders = this.cells as IArtifactCellList;
        let row = this.html.rows[2];
        while (!!row) {
            this.updateScore(row, builders, Table.cellValue(row, builders, "star"), Table.cellValue(row, builders, "level"));
            row = row.nextElementSibling as HTMLRowElement;
        }
    }

    // ステータス適用
    status(row: HTMLRowElement, status: Status): string {
        const cells = this.cells as IArtifactCellList;
        const name = Table.cellValue(row, cells, "name");
        status.addValue(Table.cellValue(row, cells, "main"));
        status.addValue(Table.cellValue(row, cells, "sub1"));
        status.addValue(Table.cellValue(row, cells, "sub2"));
        status.addValue(Table.cellValue(row, cells, "sub3"));
        status.addValue(Table.cellValue(row, cells, "sub4"));

        return name;
    }

    // ☆の変更
    private changeStar(e: Event) {
        let select = e.target as HTMLSelectElement;
        const star = parseInt(select.value);
        let row = select.parentElement!.parentElement as HTMLRowElement;

        // 聖遺物レベルの変更
        const cells = this.cells as IArtifactCellList;
        let cel = row.querySelector("td#level") as HTMLCellElement;
        cells.level.update(cel, star);
        const level = cells.level.value(cel);

        // 聖遺物メイン効果の更新
        Table.updateCell(row, cells, "main", star, level);

        // 聖遺物スコアの更新
        this.updateScore(row, cells, star, level);

        this.onChange(e);
    }

    // レベルの変更
    private changeLevel(e: Event) {
        let select = e.target as HTMLSelectElement;
        const level = parseInt(select.value);
        let row = select.parentElement!.parentElement as HTMLRowElement;

        const cells = this.cells as IArtifactCellList;
        const star = Table.cellValue(row, cells, "star");

        // 聖遺物メイン効果の更新
        Table.updateCell(row, cells, "main", star, level);

        // 聖遺物スコアの更新
        this.updateScore(row, cells, star, level);

        this.onChange(e);
    }

    // メイン効果の変更
    protected changeMain(e: Event) {
        let select = e.target as HTMLSelectElement;
        let cel = select.parentElement as HTMLCellElement;
        let row = cel.parentElement as HTMLRowElement;

        // 聖遺物メイン効果の更新
        const cells = this.cells as IArtifactCellList;
        cells.main.update(cel, Table.cellValue(row, cells, "star"), Table.cellValue(row, cells, "level"));

        this.onChange(e);
    }

    // サブ効果の変更
    private changeSub(e: Event) {
        let row = (e.target as HTMLElement).parentNode!.parentNode as HTMLRowElement;

        // 聖遺物スコアの更新
        const cells = this.cells as IArtifactCellList;
        this.updateScore(row, cells, Table.cellValue(row, cells, "star"), Table.cellValue(row, cells, "level"));

        this.onChange(e);
    }

    // スコアの更新
    private updateScore(row: HTMLRowElement, cells: IArtifactCellList, star: Integer, level: Integer) {
        let cel = row.querySelector("td#name") as HTMLCellElement;
        cel.className = "score"; // TODO: とりあえずここで設定
        removeWithoutFirstChild(cel);

        // ☆3以下はスコア表示しない
        if (star < 4) return;

        let sub: IBonusValue[] = [
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
            if (!!param && !!param.substep) {
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

// 生の花テーブル
class FlowerTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Flower, FLOWER_LIST);
        this.cells.main = new SingleBonusCell(StatusBonusType.Hp, { change: e => this.onChange(e) });
    }
}

// 死の羽テーブル
class FeatherTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Feather, FEATHER_LIST);
        this.cells.main = new SingleBonusCell(StatusBonusType.Atk, { change: e => this.onChange(e) });
    }
}

// 時の砂テーブル
class SandsTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Sands, SANDS_LIST);
        this.cells.main = new MultiBonusCell(ARTIFACT_SANDS, { change: e => this.changeMain(e) });
    }
}

// 空の杯テーブル
class GobletTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Goblet, GOBLET_LIST);
        this.cells.main = new MultiBonusCell(ARTIFACT_GOBLET, { change: e => this.changeMain(e) });
    }
}

// 理の冠テーブル
class CircletTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Circlet, CIRCLET_LIST);
        this.cells.main = new MultiBonusCell(ARTIFACT_CIRCLET, { change: e => this.changeMain(e) });
    }
}

// EquipmentCellをEquipmentTableとして扱うクラス
class EquipmentCellTable {
    private table: ItemTable;
    private cell: EquipmentCell;
    private counter: Integer;
    private items: Nullable<HTMLElementList>;

    constructor(type: EquipmentType, cell: EquipmentCell) {
        this.table = Table.List[type]!;
        this.cell = cell;
        this.counter = 0;
        this.items = null;
    }

    get updated(): boolean {
        return this.table.counter !== this.counter;
    }

    prepare() {
        this.items = this.cell.items;
    }

    refresh(cell: HTMLCellElement) {
        this.cell.update(cell, this.items!);
    }

    cleanup() {
        this.counter = this.table.counter;
        this.items = null;
    }

    update(cell: HTMLCellElement) {
        this.cell.update(cell, this.cell.items);
    }

    status<T extends ItemTable>(cell: HTMLCellElement, status: Status) {
        return this.table.status(this.cell.value(cell)!, status) as ReturnType<T["status"]>;
    }
}

// 装備テーブル
class EquipmentTable extends ItemTable {
    // TODO: 多言語対応
    static checkInsert() {
        let require = Table.List.equip!.requireItem();
        if (0 < require.length) {
            window.alert("以下の装備を整えてください。\n・" + require.join("\n・"));
        } else {
            ItemTable.insertRow("equip");
        }
    }

    private tables: Record<EquipmentType, EquipmentCellTable>;

    constructor() {
        super(TableType.Equip);
        const listeners = { change: (e: Event) => this.onChange(e) };
        let chara = new EquipmentCell(EquipmentType.Chara, { change: e => this.changeChara(e) });
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

    // データ削除可能かどうか
    removable(id: string): boolean {
        return true;
    }

    // データの再表示
    refresh(): Integer {
        // 更新情報の取得
        let updated = false;
        let updates: IMap<EquipmentCellTable> = {};
        for (const type of EquipmentTypes) {
            let table = this.tables[type];
            if (table.updated) {
                updates[type] = table;
                updated = true;
            }
        }

        if (updated) {
            // アイテムリストを取得
            for (const type in updates) {
                updates[type].prepare();
            }

            // データ再表示
            let rows = Array.from(this.html.rows);
            for (let i = 2, len = rows.length; i < len; ++i) {
                let cells = Array.from(rows[i].cells);
                for (let cell of cells) {
                    let type = cell.id;
                    if (type === "weapon") {
                        type = (cell.firstElementChild as HTMLSelectElement).value.split("_")[0];
                    }
                    if (type in updates) {
                        updates[type].refresh(cell);
                    }
                }
            }

            // 前回値の更新
            for (const type in updates) {
                updates[type].cleanup();
            }

            this.onChange();
        }

        return this.counter;
    }

    // データの削除
    clear() {
        super.clear();

        // カウンターのリセット
        for (const type of EquipmentTypes) {
            this.tables[type].cleanup();
        }
    }

    // 指定したアイテムが使用されているかどうか
    exists(id: string): boolean {
        let type = id.split("_")[0];
        let html = this.html;
        let items: Element[];
        if (WeaponTypes.weakContains(type)) {
            items = Array.from(html.querySelectorAll(`td#weapon select`));
        } else {
            items = Array.from(html.querySelectorAll(`td#${type} select`));
        }
        for (let item of items) {
            if ((item as HTMLSelectElement).value === id) {
                return true;
            }
        }
        return false;
    }

    // キャラクターの列挙
    characters() {
        // 装備テーブルから{equip rid, キャラ名}のペアを生成
        let cells = Array.from(document.querySelectorAll("table#tbl_equip td#chara"));
        let values: IPair<string, string>[] = [];
        for (let cell of cells) {
            const label = Cell.getSelectLabel(cell as HTMLCellElement);
            values.push({ key: cell.parentElement!.id, value: label.split(".")[1] });
        }
        return values;
    }

    // ステータスに適用
    apply<
        TType extends EquipmentType,
        TTable extends ItemTable = TType extends ArtifactType ? ArtifactTable : CharaTable
    >(row: HTMLRowElement, type: TType, status: Status) {
        return this.tables[type].status<TTable>(row.querySelector("td#" + type) as HTMLCellElement, status);
    }

    // TODO: 出来れば↑と統合したい
    applyWeapon(row: HTMLRowElement, type: WeaponType, status: Status) {
        return this.tables[type].status<WeaponTable>(row.querySelector("td#weapon") as HTMLCellElement, status);
    }

    // 必要なアイテムの確認
    private requireItem() {
        let require: string[] = [];
        for (const type of EquipmentTypes) {
            if (!document.querySelector(`table#tbl_${type} td#name`)) {
                require.push(TABLE_LABEL[type]);
            }
        }
        return require;
    }

    // キャラの変更
    private changeChara(e: Event) {
        let select = e.target as HTMLSelectElement;
        const value = select.value;

        // 変更したキャラクターの武器種を変更
        let cell = document.querySelector(`table#tbl_chara tr#${value} td#name`) as HTMLCellElement;
        const weapon = CHARACTER[(cell.firstElementChild as HTMLSelectElement).value].weapon;
        this.tables[weapon].update(select.parentElement!.nextElementSibling as HTMLCellElement);

        this.onChange(e);
    }
}

interface IRefreshTable extends Table {
    onRefresh(): void;
}

// テーブル更新の橋渡し
class TableBridge {
    private parent: Table;
    private counter: Integer;

    constructor(parent: Table) {
        this.parent = parent;
        this.counter = 0;
    }

    reset() {
        this.counter = this.parent.counter;
    }

    refresh(owner: IRefreshTable): Integer {
        let counter = this.parent.refresh();
        if (this.counter !== counter) {
            this.counter = counter;
            owner.onRefresh();
            owner.onChange();
        }
        return owner.counter;
    }
}

type TeamParamType = Exclude<BonusType, "hp_buf" | "atk_buf" | "def_buf" | "elem_dmg">;

// チームテーブル
class TeamTable extends Table implements IRefreshTable {
    // メンバー変更
    static changeMember(no: Integer, elem: HTMLSelectElement) {
        Table.List.team!.assign(no, elem);
    }

    private bridge: TableBridge;
    private params: Record<TeamParamType, Param>;
    public members: Nullable<Status>[];

    // コンストラクタ
    constructor() {
        super(TableType.Team);
        this.bridge = new TableBridge(Table.List.equip!);
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

    // データの読込
    load() {
        this.onRefresh();
    }

    // データの削除
    clear() {
        this.bridge.reset();
        this.members = this.members.fill(null);

        let html = this.html;
        let cells = Array.from(html.rows[0].querySelectorAll("td"));
        for (let cell of cells) {
            removeChildren(cell.firstElementChild as HTMLElement);
        }

        this.build(html);
    }

    // データの再表示
    refresh(): Integer {
        return this.bridge.refresh(this);
    }

    // データの再表示
    onRefresh() {
        let bonus = Table.List.bonus!;
        bonus.reset();

        // メモリ解放しておく
        this.members = this.members.fill(null);

        // 装備テーブルから{tr#id, キャラ名}のペアを生成
        let list = Table.List.equip!.characters();

        // チーム選択のselect更新
        let html = this.html;
        let cells = Array.from(html.rows[0].querySelectorAll("td"));
        for (let no = 0; no < 4; ++no) {
            let select = cells[no].firstElementChild as HTMLSelectElement;
            let selected = select.value;

            // メンバーoptionの更新
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
        Table.List.damage!.listup();

        this.build(html);
    }

    // メンバーデータの設定
    private build(html: HTMLTableElement) {
        let rows = Array.from(html.rows);
        for (let i = 2, len = rows.length; i < len; ++i) {
            let row = rows[i];
            let type = row.id as TeamParamType;
            if (type in this.params) {
                let cells = row.cells;
                let param = this.params[type];
                for (let no = 0; no < 4; ++no) {
                    param.set(cells[1 + no * 2], this.members[no]!);
                }
            }
        }
    }

    // メンバー取得
    private member(cid: string) {
        let equip = Table.List.equip!;
        let row = document.querySelector("table#tbl_equip tr#" + cid) as HTMLRowElement;
        let status = new Status(this.rid);

        // キャラクターのステータスチェック
        let chara = equip.apply(row, EquipmentType.Chara, status);
        status.chara = chara;

        let bonus = Table.List.bonus!;
        // TODO: 天賦によるボーナス追加
        // TODO: 星座によるボーナス追加

        // 武器のステータスチェック
        let weapon = equip.applyWeapon(row, chara.weapon, status);
        // 武器ボーナス追加
        if (!!weapon.bonus) {
            bonus.weapon(status, weapon.bonus, weapon.rank);
        }

        // 聖遺物のステータスチェック
        let items: string[] = [
            equip.apply(row, ArtifactType.Flower, status),
            equip.apply(row, ArtifactType.Feather, status),
            equip.apply(row, ArtifactType.Sands, status),
            equip.apply(row, ArtifactType.Goblet, status),
            equip.apply(row, ArtifactType.Circlet, status),
        ];
        // 聖遺物の組み合わせボーナス追加
        bonus.artifact(status, items);

        return status;
    }

    // メンバー登録
    private assign(no: Integer, elem: HTMLSelectElement) {
        let bonus = Table.List.bonus!;
        bonus.detach(this.members[no], this.members);

        this.members[no] = null; // メモリ解放しておく
        this.members[no] = this.member(elem.value);

        bonus.attach(this.members);
        Table.List.damage!.listup();

        this.build(this.html);
        this.onChange();
    }
}

// ボーナステーブル
class BonusTable extends Table implements IRefreshTable {
    private bridge: TableBridge;
    private items: Bonus[];
    private teams: Bonus[];

    // コンストラクタ
    constructor() {
        super(TableType.Bonus);
        this.bridge = new TableBridge(Table.List.team!);
        this.items = [];
        this.teams = [];
    }

    // データの読込
    load() {
        this.onRefresh();
    }

    // データの削除
    clear() {
        this.bridge.reset();
        this.reset();
        this.onRefresh();
    }

    // データの再表示
    refresh(): Integer {
        return this.bridge.refresh(this);
    }

    // データの再表示
    onRefresh() {
        const innerHtml = (bonuses: Bonus[]) => {
            let text = "";
            for (let bonus of bonuses) {
                if (bonus.apply) {
                    text += `<span style="color:silver">${bonus.toString()}</span>`;
                } else {
                    text += bonus.toString();
                }
                text += "<br>";
            }
            return text;
        };

        let members = Table.List.team!.members;
        let row = this.html.rows[1];

        for (let status of members) {
            let cells = row.cells;
            if (!!status) {
                // キャラクター名更新
                cells[0].textContent = status.chara.name;
                // ボーナス一覧更新
                cells[1].innerHTML = innerHtml(status.bonus);
            } else {
                cells[0].textContent = "-";
                cells[1].innerHTML = "";
            }
            row = row.nextElementSibling as HTMLRowElement;
        }

        let cell = row.cells[1];
        // 全員向けのボーナス表示
        if (0 < this.items.length) {
            cell.innerHTML = innerHtml(this.items);
        } else {
            cell.innerHTML = "";
        }
    }

    // ボーナスの全削除
    reset() {
        this.items = [];
        this.teams = [];
    }

    // 武器ボーナス追加
    weapon(status: Status, bonuses: DeepReadonly<Arrayable<IWeaponBonus>>, rank: Integer) {
        if (Array.isArray(bonuses)) {
            for (let bonus of bonuses) {
                this.append(status, bonus.value[rank], bonus, LABEL_TEXT.weapon);
            }
        } else {
            this.append(status, bonuses.value[rank], bonuses, LABEL_TEXT.weapon);
        }
    }

    // 聖遺物ボーナス追加
    artifact(status: Status, items: string[]) {
        items.sort();

        let first = 0;
        while (first < items.length) {
            let item = items[first];
            let last = items.lastIndexOf(item) + 1;
            if (item in ARTIFACT_SET) {
                let same = last - first;
                let artifact = ARTIFACT_SET[item];
                // 2セットの効果追加
                if ((2 <= same) && !!artifact.set2) {
                    let bonus = artifact.set2;
                    this.append(status, bonus.value, bonus, LABEL_TEXT.artifact);
                }
                // 4セットの効果追加
                if ((4 <= same) && !!artifact.set4) {
                    let bonuses = artifact.set4;
                    if (Array.isArray(bonuses)) {
                        for (let bonus of bonuses) {
                            this.append(status, bonus.value, bonus, LABEL_TEXT.artifact);
                        }
                    } else {
                        this.append(status, bonuses.value, bonuses, LABEL_TEXT.artifact);
                    }
                }
            }
            first = last;
        }
    }

    // ボーナス追加
    private append(status: Status, value: Integer, others: DeepReadonly<IBonus>, source: string) {
        if (!!others.target && (others.target !== BonusTarget.Self)) {
            this.items.push(new Bonus(status.id, others.items, value, others, status.chara.name));
        } else {
            status.append(new Bonus(status.id, others.items, value, others, source));
        }
    }

    // チームボーナス追加
    attach(members: Nullable<Status>[]) {
        let types: ElementType[] = [];
        for (let status of members) {
            if (!!status) {
                types.push(status.chara.element);
            }
        }
        types.sort();

        let first = 0;
        while (first < types.length) {
            let type = types[first];
            let last = types.lastIndexOf(type) + 1;
            // チームボーナス追加
            if (2 <= (last - first)) {
                const data = TEAM_BONUS[type];
                if (!!data) {
                    let bonus = new Bonus("team", data.items, data.value, data, LABEL_TEXT.resonance);
                    // ステータスに即適用
                    if (!bonus.limit) {
                        bonus.apply = true;
                        for (let status of members) {
                            status?.apply(bonus);
                        }
                        this.teams.push(bonus);
                    }
                    this.items.push(bonus);
                }
            }
            first = last;
        }
    }

    // チームボーナス削除
    detach(status: Nullable<Status>, members: Nullable<Status>[]) {
        if (!!status) {
            // 削除したメンバーのボーナスを全削除
            let bonuses = this.items.filter(bonus => bonus.id !== status.id);
            // チームボーナス削除
            this.items = bonuses.filter(bonus => bonus.id !== "team");

            // 適用したチームボーナスを除去
            for (let bonus of this.teams) {
                for (let status of members) {
                    status?.remove(bonus);
                }
            }
            this.teams = [];
        }
    }

    // 全ボーナス列挙
    enumerate(status: Status): Bonus[] {
        let bonuses: Bonus[] = [];
        for (let bonus of status.bonus) {
            if (!bonus.apply) {
                bonuses.push(bonus);
            }
        }
        for (let bonus of this.items) {
            if (!bonus.apply) {
                bonuses.push(bonus);
            }
        }
        return bonuses;
    }
}

// 敵テーブル
class EnemyTable extends Table {
    // 敵キャラ変更
    static changeList(elem: HTMLSelectElement) {
        let tbl = Table.List.enemy!;
        let html = tbl.html;
        tbl.rebuild(html, elem.value);
        tbl.level(html.querySelector("input#enemy_level") as HTMLInputElement);

        Table.List.damage!.calculate();
    }

    // レベル変更
    static changeLevel(elem: HTMLInputElement) {
        Table.List.enemy!.level(elem);
        Table.List.damage!.calculate();
    }

    public target: Nullable<Enemy>;

    // コンストラクタ
    constructor() {
        super(TableType.Enemy);
        this.target = null;
    }

    // データの読込
    load() {
        let html = this.html;
        let select = html.querySelector("select#enemy_list") as HTMLSelectElement;
        for (let key in ENEMY_LIST) {
            let opt = document.createElement("option");
            opt.value = key;
            opt.label = ENEMY_LIST[key].name;
            select.appendChild(opt);
        }

        this.rebuild(html, select.value);
    }

    // データの削除
    clear() {
        this.defence(null);
    }

    // テーブル再構築
    private rebuild(html: HTMLTableElement, name: string) {
        this.target = new Enemy(name);

        // 各元素の耐性更新
        let row = html.rows[2];
        while (!!row.id) {
            const type = row.id as ElementType;
            let cells = row.cells;
            let resist = this.target.resist[type];
            if (resist === Infinity) {
                cells[1].textContent = LABEL_TEXT.invalid;
            } else {
                cells[1].textContent = resist + "%";
            }
            cells[2].textContent = (this.target.resistance(type) * 100).toFixed(1) + "%";

            row = row.nextElementSibling as HTMLRowElement;
        }
    }

    // レベル設定
    private level(elem: HTMLInputElement) {
        this.target!.level = parseInt(elem.value);
        this.defence(Table.List.damage!.member);
    }

    // 防御力設定
    defence(status: Nullable<Status>) {
        let cell = (this.html.querySelector("tbody")!.lastElementChild as HTMLRowElement).cells[2];
        let level = !!status ? status.level : 0;
        cell.textContent = (this.target!.defence(level) * 100).toFixed(1) + "%";
    }
}

interface IApplyBonusValue {
    readonly types: ReadonlyArray<BonusType>;
    readonly value: Integer | Rate;
}

// ボーナス適用テーブル
class ApplyTable extends Table {
    static BuildCells: IMap<(cell: HTMLCellElement, bonus: Bonus) => void> = {
        check: (cell: HTMLCellElement, bonus: Bonus) => {
            let input = document.createElement("input");
            input.type = "checkbox";
            input.addEventListener("change", ev => Table.List.damage!.calculate());
            cell.appendChild(input);
        },
        source: (cell: HTMLCellElement, bonus: Bonus) => {
            cell.className = "left";
            cell.appendChild(document.createTextNode(bonus.source));
        },
        value: (cell: HTMLCellElement, bonus: Bonus) => {
            cell.className = "left";
            if (!!bonus.limit) {
                cell.appendChild(document.createTextNode(bonus.limit));
                cell.appendChild(document.createElement("br"));
            }
            cell.appendChild(document.createTextNode(bonus.effect));
        },
        stack: (cell: HTMLCellElement, bonus: Bonus) => {
            if (1 < bonus.stack) {
                let input = document.createElement("input");
                input.className = "short";
                input.type = "number";
                input.min = "1";
                input.max = bonus.stack.toString();
                input.step = "1";
                input.value = "1";
                input.pattern = "[0-9]*";
                input.addEventListener("change", ev => Table.List.damage!.calculate());
                cell.appendChild(input);
            } else {
                cell.appendChild(document.createTextNode("-"));
            }
        },
        times: (cell: HTMLCellElement, bonus: Bonus) => {
            if (1 < bonus.times) {
                cell.appendChild(document.createTextNode(bonus.times.toString() + LABEL_TEXT.second));
            } else {
                cell.appendChild(document.createTextNode("-"));
            }
        },
    } as const;

    private bonuses: Bonus[];

    // コンストラクタ
    constructor() {
        super(TableType.Apply);
        this.bonuses = [];
    }

    // 適用リストを取得
    get list(): IApplyBonusValue[] {
        let bonuses: IApplyBonusValue[] = [];
        let rows = Array.from(this.html.rows);
        for (let i = 1, len = rows.length; i < len; ++i) {
            let cells = Array.from(rows[i].cells);
            if ((cells[0].firstElementChild as HTMLInputElement).checked) {
                const bonus = this.bonuses[i - 1];
                let stack = 1;
                let input = cells[3].firstElementChild as HTMLInputElement;
                if (!!input) {
                    stack = parseInt(input.value);
                }
                bonuses.push({ types: bonus.types, value: bonus.value * stack });
            }
        }
        return bonuses;
    }

    // データの読込
    clear() {
        let html = this.html;
        let rows = html.rows;
        for (let len = rows.length; 1 < len; --len) {
            html.deleteRow(1);
        }
        this.bonuses = [];
    }

    // テーブル再構築
    rebuild(status: Nullable<Status>) {
        this.clear();

        if (!!status) {
            let html = this.html;
            let rows = html.rows;

            let caption = rows[0];
            let bonuses = Table.List.bonus!.enumerate(status);
            for (let bonus of bonuses) {
                let row = html.insertRow();
                for (let cap of caption.cells) {
                    const id = cap.id;
                    let cell = row.insertCell();
                    cell.id = id;
                    ApplyTable.BuildCells[id](cell, bonus);
                }
            }
            this.bonuses = bonuses;
        }
    }

    // ステータスに適用
    status(status: Status): Status {
        let clone = status.clone();
        const bonuses = this.list;
        for (const bonus of bonuses) {
            for (const type of bonus.types) {
                clone.param[type] += bonus.value;
            }
        }
        return clone;
    }
}

const ReactionSquareLabel: Record<ReactionSquareType, string> = {
    "": "-",
    pyro: "火",
    hydro: "水",
    elect: "雷",
    cryo: "氷"
} as const;

const ReactionLabel: Record<ReactionType, string> = {
    // burning: "燃焼",
    vaporize: "蒸発",
    melt: "融解",
    swirl: "拡散",
    echarge: "感電",
    shutter: "氷砕き",
    conduct: "超電導",
    overload: "過負荷"
} as const;

// ダメージテーブル
class DamageTable extends Table implements IRefreshTable {
    // ダメージタイプ変更
    static changeType(elem: HTMLSelectElement) {
        let tbl = Table.List.damage!;
        let member = tbl.member;
        if (!!member) {
            tbl.damageType(tbl.html, elem, member);
        }
    }

    // メンバー変更
    static changeMember() {
        Table.List.damage!.onRefresh();
    }

    private bridge: TableBridge;

    // コンストラクタ
    constructor() {
        super(TableType.Damage);
        this.bridge = new TableBridge(Table.List.team!);
    }

    // ダメージキャラ取得
    get member(): Nullable<Status> {
        let no = (this.html.querySelector("select#member_list") as HTMLSelectElement).selectedIndex;
        if (no !== -1) {
            return Table.List.team!.members[no];
        }
        return null;
    }

    // データの読込
    load() {
        this.onRefresh();
    }

    // データの削除
    clear() {
        this.bridge.reset();
        this.listup();
        this.onRefresh();
    }

    // メンバーリストの変更
    listup() {
        let html = this.html;
        let select = html.querySelector("select#member_list") as HTMLSelectElement;
        let index = select.selectedIndex;
        removeChildren(select);

        let members = Table.List.team!.members;
        for (let i = 0; i < 4; ++i) {
            let member = members[i];
            if (!!member) {
                let opt = document.createElement("option");
                opt.value = i.toString();
                opt.label = member.chara.name;
                opt.selected = (index === i);
                select.appendChild(opt);
            }
        }
    }

    // データの再表示
    refresh(): Integer {
        return this.bridge.refresh(this);
    }

    // データの再表示
    onRefresh() {
        let status = this.member;
        Table.List.enemy!.defence(status);
        Table.List.apply!.rebuild(status);

        // キャプション行以外を削除
        let html = this.html;
        for (let len = html.rows.length; 2 < len; --len) {
            html.deleteRow(2);
        }

        if (!!status) {
            this.rebuild(html, status);
        } else {
            // キャラレベルと攻撃力を0クリア
            let row = html.rows[0];
            let cell = row.cells[0];
            cell.lastChild!.textContent = "Lv.0"; // キャラレベルリセット
            cell = (row.nextElementSibling as HTMLRowElement).cells[2];
            cell.textContent = "0"; // ダメージ値リセット
            cell.nextElementSibling!.textContent = "0.0%"; // 会心率リセット
        }
    }

    // テーブル再構築
    private rebuild(html: HTMLTableElement, status: Status) {
        // ダメージタイプ非表示
        let damageType = html.querySelector("select#damage_type") as HTMLSelectElement;
        damageType.className = "hide";

        // キャラレベル設定
        let rows = html.rows;
        rows[0].cells[0].lastChild!.textContent = "Lv." + status.level;

        // 元素反応設定
        {
            let cell = rows[1].cells[4];
            removeChildren(cell);

            const reactions = status.reactions;
            if (0 < reactions.length) {
                let select = document.createElement("select");
                select.id = "reaction_type";
                // 反応なしを追加
                {
                    let opt = document.createElement("option");
                    opt.value = "";
                    opt.label = "-";
                    select.appendChild(opt);
                }
                // 元素反応を追加
                for (const type of reactions) {
                    let opt = document.createElement("option");
                    opt.value = type;
                    opt.label = ReactionLabel[type];
                    select.appendChild(opt);
                }
                select.addEventListener("change", ev => this.calculate());

                cell.appendChild(select);
            } else {
                cell.appendChild(document.createTextNode("-"));
            }
        }

        let buildRow = (type: TalentType) => {
            let level = status.talent[type];

            // キャプション行追加
            let row = html.insertRow();
            let cel = document.createElement("th");
            cel.colSpan = 6;
            cel.textContent = `${LABEL_TEXT[type]} : Lv.${level}`;
            row.appendChild(cel);

            let combats = status.chara.talent![type];
            for (let combat of combats) {
                let attr = new CombatAttribute(combat, level);
                let elem = attr.elem;

                // ダメージタイプ
                let className = "";
                switch (elem) {
                    case CombatElementType.Switch:
                        damageType.className = ""; // ダメージタイプ表示
                        className = ElementType.Phys;
                        break;
                    case CombatElementType.Contact:
                        break;
                    default:
                        className = elem;
                        break;
                }

                row = html.insertRow();

                // 名前セル
                cel = document.createElement("th");
                cel.appendChild(document.createTextNode(attr.name));
                if (elem === CombatElementType.Contact) {
                    // 付加元素タイプ選択
                    let select = document.createElement("select");
                    select.id = "contact_type";
                    for (let type of ReactionSquareTypes) {
                        let opt = document.createElement("option");
                        opt.value = type;
                        opt.label = ReactionSquareLabel[type];
                        select.appendChild(opt);
                    }
                    select.addEventListener("change", ev => this.contactType(ev.target as HTMLSelectElement));

                    cel.appendChild(select);
                }
                row.appendChild(cel);

                // 倍率セル
                cel = document.createElement("td");
                cel.className = className;
                let text = attr.toString(value => floorRate(value));
                switch (attr.based) {
                    // ダメージ素を追加
                    case DamageBased.Def:
                        text += "(防)"; // TODO: とりあえず
                        break;
                }
                cel.textContent = text;
                row.appendChild(cel);

                // 後続のセル作成
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

        // 属性切替が必要
        if (!damageType.className) {
            this.damageType(html, damageType, status);
        } else {
            this.calcDamage(html, status);
        }
    }

    // ダメージタイプ設定
    private damageType(html: HTMLTableElement, select: HTMLSelectElement, status: Status) {
        let chara = status.chara;

        // ダメージタイプ切替
        let className = select.value;
        if (className === "elem") {
            className = chara.element;
        }

        let row = html.rows[2];
        let rebuildRow = (type: TalentType) => {
            row = row.nextElementSibling as HTMLRowElement; // キャプション行スキップ

            let combat = chara.talent![type];
            for (let i = 0, len = combat.length; i < len; ++i) {
                // 元素付与されるものはセル色変更
                if (combat[i].elem === CombatElementType.Switch) {
                    let cells = row.cells;
                    for (let i = 1; i <= 5; ++i) {
                        cells[i].className = className;
                    }
                }
                row = row.nextElementSibling as HTMLRowElement;
            }
        };

        rebuildRow(TalentType.Combat);
        rebuildRow(TalentType.Skill);
        rebuildRow(TalentType.Burst);

        this.calcDamage(html, status);
    }

    // 付加元素タイプ設定
    private contactType(select: HTMLSelectElement) {
        let cell = select.parentElement!.nextElementSibling as HTMLCellElement;
        let row = cell.parentElement as HTMLRowElement;

        // 初期化しておく
        const className = select.value;
        cell.className = className;
        cell = cell.nextElementSibling as HTMLCellElement;
        cell.className = className;
        cell.textContent = "-";
        cell = cell.nextElementSibling as HTMLCellElement;
        cell.className = className;
        cell.textContent = "-";

        let status = this.member;
        if (!!status && !!select.value) {
            // TODO: 付加元素ダメージが元素爆発に1つだけ前提
            const combats = status.chara.talent!.burst;
            for (const combat of combats) {
                if (combat.elem === CombatElementType.Contact) {
                    let attr = new CombatAttribute(combat, status.talent.burst);
                    attr.damage(row, status, Table.List.enemy!.target!);
                    break;
                }
            }
        }
    }

    // 元素反応タイプ取得
    private reactionType(cell: HTMLCellElement): ReactionType | undefined {
        let select = cell.firstElementChild as Nullable<HTMLSelectElement>;
        if (!!select) {
            return select.value as ReactionType;
        }
        return undefined;
    }

    // ダメージ計算
    private calcDamage(html: HTMLTableElement, status: Status) {
        status = Table.List.apply!.status(status);

        // キャラ攻撃力設定
        let row = html.rows[1];
        let cells = Array.from(row.cells);
        const critical = status.critical();
        cells[2].textContent = status.attack.toFixed();
        cells[3].textContent = `+${floorRate(critical.damage)}(${floorRate(critical.rate)})`;

        const reaction = this.reactionType(cells[4]);

        row = row.nextElementSibling as HTMLRowElement;
        let enemy = Table.List.enemy!.target!;

        let damageRow = (type: TalentType) => {
            row = row.nextElementSibling as HTMLRowElement; // キャプション行スキップ

            let level = status.talent[type];
            let combats = status.chara.talent![type];
            for (let combat of combats) {
                let attr = new CombatAttribute(combat, level);
                attr.damage(row, status, enemy, reaction);

                row = row.nextElementSibling as HTMLRowElement;
            }
        };

        damageRow(TalentType.Combat);
        damageRow(TalentType.Skill);
        damageRow(TalentType.Burst);
    }

    // ダメージ計算（外部公開向け）
    calculate() {
        let member = this.member;
        if (!!member) {
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

function refreshTable(type: TableType) {
    Table.List[type]!.refresh();
}
