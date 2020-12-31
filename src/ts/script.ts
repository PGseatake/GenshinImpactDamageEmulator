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
    "damage"
] as const;

type TableType = typeof TableTypes[number];
const TableType = {
    Chara: "chara",
    Equip: "equip",
    Team: "team",
    Bonus: "bonus",
    Enemy: "enemy",
    Damage: "damage",

    from(id: string): TableType {
        return id.split("_")[1] as TableType;
    }
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
    damage?: DamageTable;
}
type TableList = Table | NonNullable<ITableList[TableType]>;

// テーブル管理の基底クラス
class Table {
    static List: ITableList = {}
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
        let data: IMap<any> = { ver: VERSION }
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
        const yes = confirm("すべてのタブの内容が上書きされます。よろしいですか？");
        if (yes) {
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
            }
        }
    }

    // データ削除前の確認
    // TODO: 多言語対応
    static clearConfirm(all: boolean) {
        if (all) {
            const yes = confirm("すべてのタブの内容が破棄されます。よろしいですか？");
            if (yes) {
                for (const type of TableTypes) {
                    Table.List[type]!.clear();
                }

                document.title = Table.Title;
                Table.Updated = false;
            }
        } else {
            let elem = document.querySelector("input[name='TAB']:checked") as HTMLInputElement;
            let tbl = Table.List[TableType.from(elem.id)]!;
            if (tbl.clearable) {
                const yes = confirm(`${tbl.text}タブの内容が破棄されます。よろしいですか？`);
                if (yes) {
                    tbl.clear();
                }
            }
        }
    }

    protected type: TableType;
    private serial: number;
    public counter: number;

    // コンストラクタ
    constructor(type: TableType) {
        this.type = type;
        this.serial = 0;
        this.counter = 0;
    }

    // テーブル表示名取得
    get text(): string {
        return TABLE_LABEL[this.type];
    }

    // 識別子取得
    protected get rid(): string {
        ++this.serial;
        return `${this.type}_${this.serial}`;
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
    refresh(): number {
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

interface IItemTableBuilder {
    index: IndexCell;
    [key: string]: Cell;
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
        let btn = e.target as HTMLButtonElement
        let row = btn.parentElement!.parentElement as HTMLRowElement;
        let html = row.parentElement!.parentElement as HTMLTableElement;
        let tbl = Table.List[TableType.from(html.id) as ItemTableType]!;
        const id = btn.id;
        const no = row.rowIndex - 1;
        if (tbl.removable(id)) {
            const yes = confirm(`No.${no}を削除します。よろしいですか？`);
            if (yes) {
                tbl.remove(html, id);
            }
        } else {
            window.alert(`No.${no}は装備中のため削除できません。`);
        }
    }

    protected builder: IItemTableBuilder;

    // コンストラクタ
    constructor(type: TableType) {
        super(type);
        this.builder = { index: new IndexCell() }
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
            let map: IMap<CellData> = {}
            let cells = rows[i].cells;
            for (let cell of cells) {
                const id = cell.id;
                if (id in this.builder) {
                    const value = this.builder[id].save(cell);
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
        let ret: IMap<CellData> = {}
        let caps = html.rows[1].cells;
        for (let cap of caps) {
            const id = cap.id;
            if (id in this.builder) {
                const val = this.builder[id].initial;
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
        btn.addEventListener("click", ItemTable.removeConfirm);
        btn.appendChild(document.createTextNode("-"));
        add.appendChild(btn);
    }

    // 1行削除
    remove(html: HTMLTableElement, id: string) {
        // データ削除
        html.querySelector("tr#" + id)!.remove();

        // indexの再設定
        let index = this.builder.index;
        let rows = Array.from(html.rows);
        for (let i = 2, len = rows.length; i < len; ++i) {
            index.update(rows[i].cells[0]);
        }

        this.onChange();
    }

    status(tr: HTMLRowElement, status: Status): any {
        return null;
    }

    // 値変更通知
    onChange(e: Nullable<Event> = null) {
        super.onChange(e);

        if (!Table.Updated) {
            Table.Updated = true
            document.title = "* " + Table.Title;
        }
    }

    // セルの更新
    protected updateCell(tr: HTMLRowElement, id: string, ...args: any[]) {
        this.builder[id].update(tr.querySelector("td#" + id) as HTMLCellElement, ...args);
    }

    // セル値の取得
    protected cellValue<T = any>(tr: HTMLRowElement, id: string): T {
        return this.builder[id].value(tr.querySelector("td#" + id) as HTMLCellElement);
    }
}

// キャラクターテーブル
class CharaTable extends ItemTable {
    constructor() {
        super(TableType.Chara);
        const listeners = { change: (e: Event) => super.onChange(e) }
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(CHARACTER, { change: e => this.changeName(e) }),
            conste: new RangeCell(0, 6, listeners),
            level: new AscensionLevelCell({ change: e => this.changeLevel(e) }),
            hp: new BaseParamCell(listeners),
            atk: new BaseParamCell(listeners),
            def: new BaseParamCell(listeners),
            special: new SpecialCell(),
            combat: new TalentCell(1, TALENT_LV_MAX, listeners),
            skill: new TalentCell(1, TALENT_LV_MAX, listeners),
            burst: new TalentCell(1, TALENT_LV_MAX, listeners),
        }
    }

    // 名前の変更
    private changeName(e: Event) {
        let select = e.target as HTMLSelectElement
        const name = select.value;
        let tr = select.parentElement!.parentElement as HTMLRowElement;
        const level = this.cellValue<number>(tr, "level");

        // 基礎値の更新
        this.updateCell(tr, "hp", name, level);
        this.updateCell(tr, "atk", name, level);
        this.updateCell(tr, "def", name, level);

        // 追加効果更新
        this.updateCell(tr, "special", name, level);

        this.onChange(e);
    }

    // レベルの変更
    private changeLevel(e: Event) {
        let select = e.target as HTMLSelectElement
        const level = select.value;
        let tr = select.parentElement!.parentNode as HTMLRowElement;
        const name = this.cellValue<string>(tr, "name");

        // 基礎値の更新
        this.updateCell(tr, "hp", name, level);
        this.updateCell(tr, "atk", name, level);
        this.updateCell(tr, "def", name, level);

        // 追加効果更新
        this.updateCell(tr, "special", name, level);

        this.onChange(e);
    }

    // ステータス適用
    status(tr: HTMLRowElement, status: Status): DeepReadonly<ICharacter> {
        const name = this.cellValue<string>(tr, "name");
        // status.conste = this.cellValue(tr, "conste");
        status.lv = this.cellValue(tr, "level");
        status.base.hp = this.cellValue(tr, "hp");
        status.base.atk = this.cellValue(tr, "atk");
        status.base.def = this.cellValue(tr, "def");
        status.addValue(this.cellValue<IBonusValue>(tr, "special"));
        status.talent.combat = this.cellValue(tr, "combat");
        status.talent.skill = this.cellValue(tr, "skill");
        status.talent.burst = this.cellValue(tr, "burst");

        return CHARACTER[name];
    }
}

interface IRankedWeapon {
    item: IWeapon;
    rank: number;
}

// 武器テーブル基底
class WeaponTable extends ItemTable {
    // 名前の変更
    protected changeName(e: Event) {
        let select = e.target as HTMLSelectElement
        const bonus = select.value;
        let tr = select.parentElement!.parentElement as HTMLRowElement;

        // 追加効果変更
        this.updateCell(tr, "second", bonus);

        this.onChange(e);
    }

    // ステータス適用
    status(tr: HTMLRowElement, status: Status): DeepReadonly<IRankedWeapon> {
        const name = this.cellValue<string>(tr, "name");
        const rank = this.cellValue<number>(tr, "rank");
        status.base.atk += this.cellValue<number>(tr, "atk");
        status.addValue(this.cellValue(tr, "second"));

        return { item: WEAPON_LIST[this.type][name], rank: rank - 1 }
    }
}

// 片手剣テーブル
class SwordTable extends WeaponTable {
    constructor() {
        super(WeaponType.Sword);
        const listeners = { change: (e: Event) => super.onChange(e) }
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(SWORD_LIST, { change: e => super.changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new SecondBonusCell(SWORD_LIST, listeners),
        }
    }
}

// 両手剣テーブル
class ClaymoreTable extends WeaponTable {
    constructor() {
        super(WeaponType.Claymore);
        const listeners = { change: (e: Event) => super.onChange(e) }
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(CLAYMORE_LIST, { change: e => super.changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new SecondBonusCell(CLAYMORE_LIST, listeners),
        }
    }
}

// 長柄武器テーブル
class PolearmTable extends WeaponTable {
    constructor() {
        super(WeaponType.Polearm);
        const listeners = { change: (e: Event) => super.onChange(e) }
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(POLEARM_LIST, { change: e => super.changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new SecondBonusCell(POLEARM_LIST, listeners),
        }
    }
}

// 弓テーブル
class BowTable extends WeaponTable {
    constructor() {
        super(WeaponType.Bow);
        const listeners = { change: (e: Event) => super.onChange(e) }
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(BOW_LIST, { change: e => super.changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new SecondBonusCell(BOW_LIST, listeners),
        }
    }
}

// 法器テーブル
class CatalystTable extends WeaponTable {
    constructor() {
        super(WeaponType.Catalyst);
        const listeners = { change: (e: Event) => super.onChange(e) }
        super.builder = {
            index: new IndexCell(),
            name: new DictCell(CATALYST_LIST, { change: e => super.changeName(e) }),
            level: new AscensionLevelCell(listeners),
            rank: new RangeCell(1, WEAPON_RANK_MAX, listeners),
            atk: new IntCell(listeners),
            second: new SecondBonusCell(CATALYST_LIST, listeners),
        }
    }
}

// 聖遺物テーブル基底
class ArtifactTable extends ItemTable {
    // データの読込
    load() {
        super.load();

        // 読み込み時のスコア表示
        let tr = this.html.rows[2];
        while (!!tr) {
            this.updateScore(tr, this.cellValue(tr, "star"), this.cellValue(tr, "level"));
            tr = tr.nextElementSibling as HTMLRowElement;
        }
    }

    // ☆の変更
    protected changeStar(e: Event) {
        let select = e.target as HTMLSelectElement
        const star = parseInt(select.value);
        let tr = select.parentElement!.parentElement as HTMLRowElement;

        // 聖遺物レベルの変更
        let cell = tr.querySelector("td#level") as HTMLCellElement;
        this.builder.level.update(cell, star);
        const level = this.builder.level.value(cell);

        // 聖遺物メイン効果の更新
        super.updateCell(tr, "main", star, level);

        // 聖遺物スコアの更新
        this.updateScore(tr, star, level);

        this.onChange(e);
    }

    // レベルの変更
    protected changeLevel(e: Event) {
        let select = e.target as HTMLSelectElement
        const level = parseInt(select.value);
        let tr = select.parentElement!.parentElement as HTMLRowElement;
        const star = this.cellValue(tr, "star");

        // 聖遺物メイン効果の更新
        this.updateCell(tr, "main", star, level);

        // 聖遺物スコアの更新
        this.updateScore(tr, star, level);

        this.onChange(e);
    }

    // メイン効果の変更
    protected changeMain(e: Event) {
        let select = e.target as HTMLSelectElement
        let td = select.parentElement as HTMLCellElement;
        let tr = td.parentElement as HTMLRowElement;

        // 聖遺物メイン効果の更新
        this.builder.main.update(td, this.cellValue(tr, "star"), this.cellValue(tr, "level"));

        this.onChange(e);
    }

    // サブ効果の変更
    protected changeSub(e: Event) {
        let tr = (e.target as HTMLElement).parentNode!.parentNode as HTMLRowElement;

        // 聖遺物スコアの更新
        this.updateScore(tr, this.cellValue(tr, "star"), this.cellValue(tr, "level"));

        this.onChange(e);
    }

    // スコアの更新
    private updateScore(tr: HTMLRowElement, star: number, level: number) {
        let cell = tr.querySelector("td#name") as HTMLCellElement;
        cell.className = "score"; // TODO: とりあえずここで設定
        removeWithoutFirstChild(cell);

        // ☆3以下はスコア表示しない
        if (star < 4) return;

        let sub: IBonusValue[] = [
            this.cellValue(tr, "sub1"),
            this.cellValue(tr, "sub2"),
            this.cellValue(tr, "sub3"),
            this.cellValue(tr, "sub4"),
        ];
        let score = [0, 0, 0, 0];
        let total = 0;
        let limit = 10 + Math.floor(level / 4) * 10;

        for (let i = 0; i < 4; ++i) {
            let param = getArtifactParam(star, level, sub[i].bonus);
            if (!!param && !!param.substep) {
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
    status(tr: HTMLRowElement, status: Status): string {
        const name = this.cellValue(tr, "name");
        status.addValue(this.cellValue(tr, "main"));
        for (let i = 1; i <= 4; ++i) {
            status.addValue(this.cellValue(tr, "sub" + i));
        }

        return name;
    }
}

// 生の花テーブル
class FlowerTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Flower);
        const listeners = { change: (e: Event) => super.changeSub(e) }
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(FLOWER_LIST, { change: e => super.onChange(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super.changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super.changeLevel(e) }),
            main: new SingleBonusCell(StatusBonus.Hp, { change: e => super.onChange(e) }),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        }
    }
}

// 死の羽テーブル
class FeatherTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Feather);
        const listeners = { change: (e: Event) => super.changeSub(e) }
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(FEATHER_LIST, { change: e => super.onChange(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super.changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super.changeLevel(e) }),
            main: new SingleBonusCell(StatusBonus.Atk, { change: e => super.onChange(e) }),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        }
    }
}

// 時の砂テーブル
class SandsTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Sands);
        const listeners = { change: (e: Event) => super.changeSub(e) }
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(SANDS_LIST, { change: e => super.onChange(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super.changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super.changeLevel(e) }),
            main: new MultiBonusCell(ARTIFACT_SANDS, { change: e => super.changeMain(e) }),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        }
    }
}

// 空の杯テーブル
class GobletTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Goblet);
        const listeners = { change: (e: Event) => super.changeSub(e) }
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(GOBLET_LIST, { change: e => super.onChange(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super.changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super.changeLevel(e) }),
            main: new MultiBonusCell(ARTIFACT_GOBLET, { change: e => super.changeMain(e) }),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        }
    }
}

// 理の冠テーブル
class CircletTable extends ArtifactTable {
    constructor() {
        super(ArtifactType.Circlet);
        const listeners = { change: (e: Event) => super.changeSub(e) }
        super.builder = {
            index: new IndexCell(),
            name: new MapCell(CIRCLET_LIST, { change: e => super.onChange(e) }),
            star: new RangeCell(1, ARTIFACT_STAR_MAX, { change: e => super.changeStar(e) }),
            level: new ArtifactLevelCell({ change: e => super.changeLevel(e) }),
            main: new MultiBonusCell(ARTIFACT_CIRCLET, { change: e => super.changeMain(e) }),
            sub1: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub2: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub3: new BonusValueCell(ARTIFACT_SUB, listeners),
            sub4: new BonusValueCell(ARTIFACT_SUB, listeners),
        }
    }
}

interface IEquipmentChara {
    id: string;
    name: string;
}

// EquipmentCellをEquipmentTableとして扱うクラス
class EquipmentCellTable {
    private target: ItemTable;
    private builder: EquipmentCell;
    private counter: number;
    private items: Nullable<HTMLElementList>;

    constructor(type: EquipmentType, cell: EquipmentCell) {
        this.target = Table.List[type]!;
        this.builder = cell;
        this.counter = 0;
        this.items = null;
    }

    get updated(): boolean {
        return this.target.counter !== this.counter;
    }

    prepare() {
        this.items = this.builder.items;
    }

    refresh(cell: HTMLCellElement) {
        this.builder.update(cell, this.items!);
    }

    cleanup() {
        this.counter = this.target.counter;
        this.items = null;
    }

    update(cell: HTMLCellElement) {
        this.builder.update(cell, this.builder.items);
    }

    status<T>(cell: HTMLCellElement, status: Status): T {
        return this.target.status(this.builder.value(cell) as HTMLRowElement, status);
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
        const listeners = { change: (e: Event) => super.onChange(e) }
        let chara = new EquipmentCell(EquipmentType.Chara, { change: e => this.changeChara(e) });
        let weapon = new EquipWeaponCell(listeners);
        let flower = new EquipmentCell(ArtifactType.Flower, listeners);
        let feather = new EquipmentCell(ArtifactType.Feather, listeners);
        let sands = new EquipmentCell(ArtifactType.Sands, listeners);
        let goblet = new EquipmentCell(ArtifactType.Goblet, listeners);
        let circlet = new EquipmentCell(ArtifactType.Circlet, listeners);
        super.builder = {
            index: new IndexCell(),
            chara: chara,
            weapon: weapon,
            flower: flower,
            feather: feather,
            sands: sands,
            goblet: goblet,
            circlet: circlet,
        }
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
        }
    }

    // データ削除可能かどうか
    removable(id: string): boolean {
        return true;
    }

    // データの再表示
    refresh() {
        // 更新情報の取得
        let updated = false;
        let updates: IMap<EquipmentCellTable> = {}
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
        if (contains(WeaponTypes, type)) {
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
    characters(): IEquipmentChara[] {
        // 装備テーブルから{equip rid, キャラ名}のペアを生成
        let cells = Array.from(document.querySelectorAll("table#tbl_equip td#chara"));
        let values: IEquipmentChara[] = [];
        for (let cell of cells) {
            const label = Cell.getSelectLabel(cell as HTMLCellElement);
            values.push({ id: cell.parentElement!.id, name: label.split(".")[1] });
        }
        return values;
    }

    apply<T>(type: EquipmentType, cell: HTMLCellElement, status: Status): T {
        return this.tables[type].status<T>(cell, status);
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
        let td = document.querySelector(`table#tbl_chara tr#${value} td#name`) as HTMLCellElement;
        const weapon = CHARACTER[(td.firstElementChild as HTMLSelectElement).value].weapon;
        let cell = select.parentElement!.nextElementSibling as HTMLCellElement;
        this.tables[weapon].update(cell);

        this.onChange(e);
    }
}

interface IRefreshTable extends Table {
    onRefresh(): void;
}

// テーブル更新の橋渡し
class TableBridge {
    private counter: number;
    private parent: Table;

    constructor(parent: Table) {
        this.counter = 0;
        this.parent = parent;
    }

    reset() {
        this.counter = this.parent.counter;
    }

    refresh(owner: IRefreshTable) {
        let counter = this.parent.refresh();
        if (this.counter !== counter) {
            this.counter = counter;
            owner.onRefresh();
            owner.onChange();
        }
        return owner.counter;
    }
}

// チームテーブル
class TeamTable extends Table implements IRefreshTable {
    // メンバー変更
    static changeMember(no: number, elem: HTMLSelectElement) {
        Table.List.team!.assign(no, elem);
    }

    private bridge: TableBridge;
    private builder: IMap<Param>;
    public members: Nullable<Status>[];

    // コンストラクタ
    constructor() {
        super(TableType.Team);
        this.bridge = new TableBridge(Table.List.equip!);
        this.members = [null, null, null, null];
        this.builder = {
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
            overload_dmg: new ElemReactParam("overload_dmg"),
        }
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
    refresh() {
        return this.bridge.refresh(this);
    }

    // データの再表示
    onRefresh() {
        Table.List.bonus!.reset();

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
                opt.value = item.id;
                opt.label = `${i + 1}.${item.name}`;
                opt.selected = (selected === item.id);
                select.appendChild(opt);
            }

            if (0 <= select.selectedIndex) {
                this.members[no] = this.member(select.value);
            }
        }
        this.build(html);

        Table.List.bonus!.attach(this.members);
        Table.List.damage!.listup();
    }

    // メンバーデータの設定
    private build(html: HTMLTableElement) {
        let rows = Array.from(html.rows);
        for (let i = 2, len = rows.length; i < len; ++i) {
            let row = rows[i];
            let param = row.id;
            if (param in this.builder) {
                let cells = row.cells;
                let builder = this.builder[param];
                for (let no = 0; no < 4; ++no) {
                    builder.set(cells[1 + no * 2], this.members[no]!);
                }
            }
        }
    }

    // メンバー取得
    private member(cid: string) {
        let equip = Table.List.equip!;
        let record = document.querySelector("table#tbl_equip tr#" + cid)
        let cells = (record as HTMLRowElement).cells;
        let status = new Status(this.rid);

        // キャラクターのステータスチェック
        let chara: ICharacter = equip.apply(EquipmentType.Chara, cells[1], status);
        status.chara = chara;

        let bonus = Table.List.bonus!;
        // TODO: 天賦によるボーナス追加
        // TODO: 星座によるボーナス追加

        // 武器のステータスチェック
        let weapon: IRankedWeapon = equip.apply(chara.weapon, cells[2], status);
        // 武器ボーナス追加
        if (!!weapon.item.passive) {
            bonus.weapon(status, weapon.item.passive, weapon.rank);
        }

        // 聖遺物のステータスチェック
        let items: string[] = [
            equip.apply(ArtifactType.Flower, cells[3], status),
            equip.apply(ArtifactType.Feather, cells[4], status),
            equip.apply(ArtifactType.Sands, cells[5], status),
            equip.apply(ArtifactType.Goblet, cells[6], status),
            equip.apply(ArtifactType.Circlet, cells[7], status),
        ];
        // 聖遺物の組み合わせボーナス追加
        bonus.artifact(status, items);

        return status;
    }

    // メンバー登録
    private assign(no: number, elem: HTMLSelectElement) {
        let bonus = Table.List.bonus!;
        bonus.detach(this.members[no]);

        this.members[no] = null; // メモリ解放しておく
        this.members[no] = this.member(elem.value);
        this.build(this.html);

        bonus.attach(this.members);

        Table.List.damage!.listup();

        this.onChange();
    }
}

// ボーナステーブル
class BonusTable extends Table implements IRefreshTable {
    private bridge: TableBridge;
    private items: Bonus[];

    // コンストラクタ
    constructor() {
        super(TableType.Bonus);
        this.bridge = new TableBridge(Table.List.team!);
        this.items = [];
    }

    // データ消去可能かどうか
    get clearable() {
        return false;
    }

    // データの保存
    save() {
        // 何もしない
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
    refresh() {
        return this.bridge.refresh(this);
    }

    // データの再表示
    onRefresh() {
        let rows = this.html.rows;
        let members = Table.List.team!.members;

        for (let no = 0; no < 4; ++no) {
            let status = members[no];
            let cells = rows[1 + no].cells;
            if (!status) {
                cells[0].textContent = "-";
                cells[1].innerHTML = "";
            } else {
                // キャラクター名更新
                cells[0].textContent = status.chara!.name;

                // ボーナス一覧更新
                let text = ""
                for (let bonus of status.bonus) {
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
    weapon(status: Status, bonuses: Arrayable<IWeaponBonus>, rank: number) {
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
        while (first < 5) {
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
                        for (let bonus of bonuses as DeepReadonlyArray<IBasicBonus>) {
                            this.append(status, bonus.value, bonus, LABEL_TEXT.artifact);
                        }
                    } else {
                        let bonus = bonuses as DeepReadonly<IBasicBonus>
                        this.append(status, bonus.value, bonus, LABEL_TEXT.artifact);
                    }
                }
            }
            first = last;
        }
    }

    // ボーナス追加
    private append(status: Status, value: number, others: DeepReadonly<IBonus>, source: string) {
        if (!!others.target && (others.target !== BonusTarget.Self)) {
            // TODO: target="next" の対応は保留
            let bonus = new Bonus(others.items, value, others, source);
            bonus.id = status.id;
            this.items.push(bonus);
        } else {
            status.append(new Bonus(others.items, value, others, source));
        }
    }

    // チームボーナス追加
    attach(members: Nullable<Status>[]) {
        // TODO: チームボーナス追加
    }

    // チームボーナス削除
    detach(status: Nullable<Status>) {
        if (!!status) {
            // 削除したメンバーのボーナスを全削除
            let bonuses = this.items.filter(bonus => bonus.id !== status.id);

            // TODO: チームボーナス削除
            this.items = bonuses.filter(bonus => bonus.id !== "team");
        }
    }
}

// 敵テーブル
class EnemyTable extends Table {
    // 敵キャラ変更
    static changeList(elem: HTMLSelectElement) {
        let tbl = Table.List.enemy!;
        let html = tbl.html;
        tbl.build(html, elem.value);
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

    // データ消去可能かどうか
    get clearable() {
        return false;
    }

    // データの保存
    save() {
        // 何もしない
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

        this.build(html, select.value);
    }

    // データの削除
    clear() {
        this.defence(null);
    }

    // 敵データの設定
    private build(html: HTMLTableElement, name: string) {
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
        super("damage");
        this.bridge = new TableBridge(Table.List.team!);
    }

    // データ消去可能かどうか
    get clearable() {
        return false;
    }

    // ダメージキャラ取得
    get member() {
        let no = (this.html.querySelector("select#member_list") as HTMLSelectElement).selectedIndex;
        if (no !== -1) {
            return Table.List.team!.members[no];
        }
        return null;
    }

    // データの保存
    save() {
        // 何もしない
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
                opt.label = member.chara!.name;
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
        Table.List.enemy!.defence(status);

        // キャプション行以外を削除
        let html = this.html;
        for (let len = html.rows.length; 2 < len; --len) {
            html.deleteRow(2);
        }

        if (!!status) {
            this.setup(html, status);
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

    private setup(html: HTMLTableElement, status: Status) {
        // ダメージタイプ非表示
        let damageType = html.querySelector("select#damage_type") as HTMLSelectElement;
        damageType.className = "hide";

        // キャラレベル設定
        let rows = html.rows;
        rows[0].cells[0].lastChild!.textContent = "Lv." + status.level;

        // キャラ攻撃力設定
        let cells = rows[1].cells;
        let critical = status.critical();
        cells[2].textContent = status.attack.toFixed();
        cells[3].textContent = `+${critical.damage.toFixed(1)}%(${critical.rate.toFixed(1)}%)`;

        let buildRow = (type: TalentType) => {
            let level = status.talent[type];

            // キャプション行追加
            let row = html.insertRow();
            let cel = document.createElement("th");
            cel.colSpan = 4;
            cel.textContent = `${LABEL_TEXT[type]} : Lv.${level}`;
            row.appendChild(cel);

            let combats = status.chara!.talent![type];
            for (let combat of combats) {
                let attr = new Attribute(combat, level);
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
        }

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
    private damageType(html: HTMLTableElement, elem: HTMLSelectElement, status: Status) {
        let chara = status.chara!;

        // ダメージタイプ切替
        let className = elem.value;
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
                    cells[1].className = className;
                    cells[2].className = className;
                    cells[3].className = className;
                }
                row = row.nextElementSibling as HTMLRowElement;
            }
        }

        rebuildRow(TalentType.Combat);
        rebuildRow(TalentType.Skill);
        rebuildRow(TalentType.Burst);

        this.calcDamage(html, status);
    }

    // ダメージ計算
    private calcDamage(html: HTMLTableElement, status: Status) {
        let row = html.rows[2];
        let enemy = Table.List.enemy!.target!;

        let attackPower = status.attack;
        let enemyDefence = enemy.defence(status.level);

        let damageRow = (type: TalentType) => {
            row = row.nextElementSibling as HTMLRowElement; // キャプション行スキップ

            let level = status.talent[type];
            let combats = status.chara!.talent![type];
            for (let combat of combats) {
                let cell = row.cells[2];
                let elem = cell.className as ElementType;
                let attr = new Attribute(combat, level);

                // 各種倍率
                let elementBonus = status.elemental(elem);
                let combatBonus = status.combat(attr.type);
                let enemyResist = enemy.resistance(elem);
                let bonusDamage = (100 + elementBonus + combatBonus + status.param.any_dmg) / 100;
                let totalScale = attackPower * enemyDefence * enemyResist * bonusDamage;

                // 最終ダメージ
                cell.textContent = attr.toString(value => (totalScale * value / 100).toFixed());
                cell = cell.nextElementSibling as HTMLCellElement;

                // 会心ダメージ
                let critical = status.critical(attr.type);
                totalScale *= (critical.damage + 100) / 100;
                let text = attr.toString(value => (totalScale * value / 100).toFixed());
                // 重撃会心率が異なる場合は特別表示
                if ((attr.type === CombatType.Heavy) && (0 < status.param.heavy_cri)) {
                    text = `${text} (${critical.rate}%)`;
                }
                cell.textContent = text;

                row = row.nextElementSibling as HTMLRowElement;
            }
        }

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
    Table.List.sword = new SwordTable();
    Table.List.claymore = new ClaymoreTable();
    Table.List.polearm = new PolearmTable();
    Table.List.bow = new BowTable();
    Table.List.catalyst = new CatalystTable();
    Table.List.flower = new FlowerTable();
    Table.List.feather = new FeatherTable();
    Table.List.sands = new SandsTable();
    Table.List.goblet = new GobletTable();
    Table.List.circlet = new CircletTable();
    Table.List.equip = new EquipmentTable();
    Table.List.team = new TeamTable();
    Table.List.bonus = new BonusTable();
    Table.List.enemy = new EnemyTable();
    Table.List.damage = new DamageTable();
    Table.loadData();
}

function refreshTable(type: TableType) {
    Table.List[type]!.refresh();
}