function removeChildren(elem: HTMLElement) {
    while (elem.lastChild) {
        elem.lastChild.remove();
    }
}

function removeWithoutFirstChild(elem: HTMLElement) {
    while (elem.firstChild !== elem.lastChild) {
        elem.lastChild!.remove();
    }
}

type EventListenerList = Nullable<Partial<Record<keyof HTMLElementEventMap, EventListener>>>;
type HTMLCellElement = HTMLTableDataCellElement;
type HTMLRowElement = HTMLTableRowElement;
type HTMLElementList = NodeListOf<HTMLElement>;

interface IValueProp {
    value: string;
}
interface HTMLValueElement extends HTMLElement, IValueProp { }

interface ITruthProp {
    truth: number;
}
interface HTMLTruthElement extends HTMLInputElement, ITruthProp { }

type CellData = Arrayable<string>;

interface INumberCell {
    build(cell: HTMLCellElement, value: string | number): HTMLTruthElement;
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
    static getSelectLabel(cell: HTMLCellElement) {
        let select = cell.firstElementChild as HTMLSelectElement;
        return select.options[select.selectedIndex].label;
    }

    protected listeners: EventListenerList;

    constructor(listeners: EventListenerList = null) {
        this.listeners = listeners;
    }

    get initial(): Nullable<CellData> {
        return null;
    }

    value(cell: HTMLCellElement): unknown {
        return null;
    }

    save(cell: HTMLCellElement): Nullable<CellData> {
        return null;
    }

    load(cell: HTMLCellElement, id: string, values: IMap<CellData>): Nullable<HTMLElement> {
        return null;
    }

    update(cell: HTMLCellElement, ...args: unknown[]) {
    }

    protected listen<T extends HTMLElement>(cell: HTMLCellElement, child: T): T {
        // childに外部リスナーを登録
        if (this.listeners) {
            for (const type in this.listeners) {
                child.addEventListener(type, this.listeners[type as keyof HTMLElementEventMap]!);
            }
        }

        cell.appendChild(child);
        return child;
    }
}

// 整数セル
class IntCell extends Cell implements INumberCell {
    private static onChange(e: Event) {
        let input = e.target as HTMLTruthElement;
        if (input.value) {
            input.truth = parseInt(input.value);
        } else {
            input.truth = 0;
        }
    }

    private static onFocus(e: Event) {
        let input = e.target as HTMLTruthElement;
        if (input.value === "0") {
            input.value = "";
        }
    }

    private static onBlur(e: Event) {
        let input = e.target as HTMLTruthElement;
        if (input.value === "") {
            input.value = "0";
            input.truth = 0;
        }
    }

    get initial(): string {
        return "0";
    }

    value(cell: HTMLCellElement): Integer {
        return (cell.firstElementChild as HTMLTruthElement).truth;
    }

    save(cell: HTMLCellElement): string {
        return (cell.firstElementChild as HTMLTruthElement).truth.toString();
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>): HTMLTruthElement {
        // 正規化
        let value = values[id];
        if (isNaN(parseInt(value))) {
            value = "0";
        }

        return this.build(cell, value);
    }

    build(cell: HTMLCellElement, value: string | Integer): HTMLTruthElement {
        let child = document.createElement("input") as HTMLTruthElement;
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

        return this.listen(cell, child);
    }
}

// 割合セル
class RateCell extends Cell implements INumberCell {
    private static onChange(e: Event) {
        let input = e.target as HTMLTruthElement;
        if (input.value) {
            input.truth = parseFloat(input.value);
        } else {
            input.truth = 0.0;
        }
    }

    private static onFocus(e: Event) {
        let input = e.target as HTMLTruthElement;
        if (input.value === "0.0") {
            input.value = "";
        }
    }

    private static onBlur(e: Event) {
        let input = e.target as HTMLTruthElement;
        if (input.value === "") {
            input.value = "0.0";
            input.truth = 0.0;
        } else {
            const value = parseFloat(input.value);
            if (isNaN(value)) {
                input.value = "0.0";
                input.truth = 0.0;
            } else if (value === Math.floor(value)) {
                // 整数に小数点を追加
                input.value = value.toString() + ".0";
            }
        }
    }

    get initial(): string {
        return "0.0";
    }

    value(cell: HTMLCellElement): Rate {
        return (cell.firstElementChild as HTMLTruthElement).truth;
    }

    save(cell: HTMLCellElement): string {
        return (cell.firstElementChild as HTMLTruthElement).truth.toString();
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>): HTMLTruthElement {
        // 正規化
        let value = values[id];
        if (isNaN(parseFloat(value))) {
            value = "0.0";
        }

        return this.build(cell, value);
    }

    build(cell: HTMLCellElement, value: string | Rate): HTMLTruthElement {
        let child = document.createElement("input") as HTMLTruthElement;
        child.type = "number";
        child.step = "0.1";
        child.min = "0";
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

        this.listen(cell, child);
        cell.appendChild(document.createTextNode("%"));

        return child;
    }
}

// 空のセル
class EmptyCell extends Cell implements INumberCell {
    build(cell: HTMLCellElement, _: string | number): HTMLTruthElement {
        // 処理簡略化のため非表示で配置しておく
        let child = document.createElement("input") as HTMLTruthElement;
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
    private index(cell: HTMLCellElement): string {
        let row = cell.parentElement as HTMLRowElement;
        return (row.rowIndex - 1).toString(); // 0,1はキャプション行
    }

    load(cell: HTMLCellElement, _: string, __: IMap<string>): null {
        cell.appendChild(document.createTextNode(this.index(cell)));
        return null;
    }

    update(cell: HTMLCellElement) {
        cell.childNodes[0].textContent = this.index(cell);
    }
}

// キャラクター基礎ステータスセル
class CharaStatusCell extends IntCell {
    update(cell: HTMLCellElement, name: string, level: string) {
        const status = CHARACTER[name].status;
        if (status) {
            const param = status[cell.id as CharaStatusType];
            const value = AscensionLevelCell.calc(level, param);
            let input = cell.firstElementChild as HTMLTruthElement;
            input.value = Math.ceil(value).toFixed(); // TODO: 切り捨て・四捨五入など要検証
            input.truth = value;
        }
    }
}

// 武器攻撃力セル
class WeaponAtkCell extends IntCell {
    private list: DeepReadonly<IMap<IWeapon>>;

    constructor(list: DeepReadonly<IMap<IWeapon>>, listeners: EventListenerList) {
        super(listeners);
        this.list = list;
    }

    update(cell: HTMLCellElement, name: string, level: string) {
        const param = this.list[name]?.atk;
        if (param) {
            const value = AscensionLevelCell.calc(level, param);
            let input = cell.firstElementChild as HTMLTruthElement;
            input.value = Math.ceil(value).toFixed(); // TODO: 切り捨て・四捨五入など要検証
            input.truth = value;
        }
    }
}

interface IAscensionLevel {
    level: Integer;
    index: Integer;
}

// 突破レベルセル
class AscensionLevelCell extends Cell {
    static step(level: string): IAscensionLevel {
        if (0 < level.indexOf("+")) {
            const lv = parseInt(level.replace("+", ""));
            return { level: lv, index: ASCENSION_LV_STEP.indexOf(lv) + 1 };
        } else {
            const lv = parseInt(level);
            for (let i = 0, len = ASCENSION_LV_STEP.length; i < len; ++i) {
                if (lv <= ASCENSION_LV_STEP[i]) {
                    return { level: lv, index: i };
                }
            }
            return { level: lv, index: ASCENSION_LV_STEP.length };
        }
    }

    static calc(level: string, param: AscensionParam): Float {
        const bound = ASCENSION_LV_RANGE;
        const step = AscensionLevelCell.step(level);
        const min = bound[step.index];
        const max = bound[step.index + 1];
        const lower = param[step.index * 2];
        const upper = param[step.index * 2 + 1];
        if (step.level === min) {
            return lower;
        }
        if (step.level === max) {
            return upper;
        }
        return (upper - lower) / (max - min) * (step.level - min) + lower;
    }

    get initial(): string {
        return "1";
    }

    value(cell: HTMLCellElement): string {
        let select = cell.firstElementChild as HTMLSelectElement;
        return select.value;
    }

    save(cell: HTMLCellElement): string {
        let select = cell.firstElementChild as HTMLSelectElement;
        return select.value;
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>): HTMLSelectElement {
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
            if (ASCENSION_LV_STEP.contains(i)) {
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

// 整数範囲セル
class RangeCell extends Cell {
    protected min: Integer;
    protected max: Integer;

    constructor(min: Integer, max: Integer, listeners: EventListenerList = null) {
        super(listeners);
        this.min = min;
        this.max = max;
    }

    get initial(): string {
        return this.min.toString();
    }

    value(cell: HTMLCellElement): Integer {
        let select = cell.firstElementChild as HTMLSelectElement;
        return parseInt(select.value);
    }

    save(cell: HTMLCellElement): string {
        let select = cell.firstElementChild as HTMLSelectElement;
        return select.value;
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>): HTMLSelectElement {
        // 正規化
        let value = parseInt(values[id]);
        if (isNaN(value)) {
            value = this.min;
        } else if (value < this.min) {
            value = this.min;
        } else if (this.max < value) {
            value = this.max;
        }

        return this.build(cell, value);
    }

    protected build(cell: HTMLCellElement, value: Integer): HTMLSelectElement {
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
    load(cell: HTMLCellElement, id: string, values: IMap<string>): HTMLSelectElement {
        let child = super.load(cell, id, values);
        cell.insertBefore(document.createTextNode("Lv."), child);
        return child;
    }
}

// 聖遺物レベルセル
class ArtifactLevelCell extends RangeCell {
    constructor(listeners: EventListenerList = null) {
        super(0, 0, listeners);
        // this.min = 0 固定
        // this.max = td#star の値に応じて変更
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>): HTMLSelectElement {
        let star = parseInt(values.star);
        if (isNaN(star)) {
            star = 0;
        }

        this.max = ARTIFACT_LEVEL[star];
        return super.load(cell, id, values);
    }

    update(cell: HTMLCellElement, star: Integer) {
        const value = (cell.firstElementChild as HTMLSelectElement).selectedIndex;
        removeChildren(cell);

        this.max = ARTIFACT_LEVEL[star];
        this.build(cell, value);
    }
}

// 聖遺物名セル
class ArtifactCell extends Cell {
    private map: DeepReadonly<IMap<string>>;

    constructor(map: DeepReadonly<IMap<string>>, listeners: EventListenerList = null) {
        super(listeners);
        this.map = map;
    }

    get initial(): string {
        return "other";
    }

    value(cell: HTMLCellElement): string {
        let select = cell.firstElementChild as HTMLSelectElement;
        return select.value;
    }

    save(cell: HTMLCellElement): string {
        let select = cell.firstElementChild as HTMLSelectElement;
        return select.value;
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>): HTMLSelectElement {
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

// 名前セル
class NameCell extends Cell {
    private dict: DeepReadonly<IMap<INameable>>;

    constructor(dict: DeepReadonly<IMap<INameable>>, listeners: EventListenerList = null) {
        super(listeners);
        this.dict = dict;
    }

    get initial(): string {
        return "other";
    }

    value(cell: HTMLCellElement): string {
        let select = cell.firstElementChild as HTMLSelectElement;
        return select.value;
    }

    save(cell: HTMLCellElement): string {
        let select = cell.firstElementChild as HTMLSelectElement;
        return select.value;
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>): HTMLSelectElement {
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

type NumberCell = IntCell | RateCell | EmptyCell;

// 数値ボーナス
class NumberBonus {
    public name: string;

    constructor(type: AnyBonusType) {
        this.name = BONUS_LABEL[type].select;
    }

    get init(): string {
        return "0";
    }

    cell(_: EventListenerList): NumberCell {
        return new EmptyCell();
    }
}

// 整数ボーナス
class IntBonus extends NumberBonus {
    cell(listeners: EventListenerList): IntCell {
        return new IntCell(listeners);
    }
}

// 割合ボーナス
class RateBonus extends NumberBonus {
    get init(): string {
        return "0.0";
    }

    cell(listeners: EventListenerList): RateCell {
        return new RateCell(listeners);
    }
}

const BonusValueList: Readonly<Record<BonusValueType, NumberBonus>> = {
    other: new NumberBonus(StatusBonusType.Other),
    hp: new IntBonus(StatusBonusType.Hp),
    hp_buf: new RateBonus(StatusBonusType.HpBuf),
    atk: new IntBonus(StatusBonusType.Atk),
    atk_buf: new RateBonus(StatusBonusType.AtkBuf),
    def: new IntBonus(StatusBonusType.Def),
    def_buf: new RateBonus(StatusBonusType.DefBuf),
    elem: new IntBonus(StatusBonusType.Elem),
    en_rec: new RateBonus(StatusBonusType.EnRec),
    cri_rate: new RateBonus(CriticalBonusType.Rate),
    cri_dmg: new RateBonus(CriticalBonusType.Damage),
    pyro_dmg: new RateBonus(ElementBonusType.Pyro),
    hydro_dmg: new RateBonus(ElementBonusType.Hydro),
    elect_dmg: new RateBonus(ElementBonusType.Elect),
    anemo_dmg: new RateBonus(ElementBonusType.Anemo),
    cryo_dmg: new RateBonus(ElementBonusType.Cryo),
    geo_dmg: new RateBonus(ElementBonusType.Geo),
    phys_dmg: new RateBonus(ElementBonusType.Phys),
} as const;

// ボーナスセル
class BonusCell extends Cell {
    protected list: ReadonlyArray<BonusValueType>;

    constructor(list: ReadonlyArray<BonusValueType>, listeners: EventListenerList = null) {
        super(listeners);
        this.list = list;
    }

    value(cell: HTMLCellElement): IBonusValue {
        let child1 = cell.firstElementChild as HTMLSelectElement;
        let child2 = child1.nextElementSibling as HTMLTruthElement;
        return { type: child1.value as BonusValueType, value: child2.truth };
    }

    protected select(value: BonusValueType): HTMLSelectElement {
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
class CharaSpecialCell extends BonusCell {
    constructor() {
        super([]);
    }

    load(cell: HTMLCellElement, _: string, values: IMap<string>): null {
        cell.className = "bonus";
        this.build(cell, values.name, values.level);
        return null;
    }

    update(cell: HTMLCellElement, name: string, level: string) {
        removeChildren(cell);
        this.build(cell, name, level);
    }

    private build(cell: HTMLCellElement, name: string, level: string) {
        const chara = CHARACTER[name];
        const bonus = chara.special;
        this.list = [bonus];
        cell.appendChild(this.select(bonus));

        let value = 0;
        if (chara.spvalue) {
            value = chara.spvalue[AscensionLevelCell.step(level).index];
        }

        let builder = BonusValueList[bonus].cell(null);
        builder.build(cell, value).disabled = true;
    }
}

// ボーナスリストセル
class BonusListCell extends BonusCell {
    update(cell: HTMLCellElement, star: Integer, level: Integer) {
        removeWithoutFirstChild(cell);

        let select = cell.firstElementChild as HTMLSelectElement;
        let bonus = select.value as BonusValueType;
        let builder = BonusValueList[bonus].cell(this.listeners);
        builder.build(cell, this.param(star, level, bonus)).disabled = true;
    }

    protected build(cell: HTMLCellElement, astar: string, alevel: string, bonus: BonusValueType): HTMLSelectElement {
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

    protected param(star: Integer, level: Integer, bonus: AnyBonusType): Float {
        let param = getArtifactParam(star, level, bonus);
        if (param) {
            return param.intercept + level * param.slope;
        }
        return 0.0;
    }
}

// 聖遺物単体ボーナスセル
class SingleBonusCell extends BonusListCell {
    constructor(bonus: BonusValueType, listeners: EventListenerList = null) {
        super([bonus], listeners);
    }

    load(cell: HTMLCellElement, _: string, values: IMap<string>): HTMLSelectElement {
        cell.className = "bonus";

        let child = this.build(cell, values.star, values.level, this.list[0]);
        child.disabled = true;

        return child;
    }
}

// 聖遺物複数ボーナスセル
class MultiBonusCell extends BonusListCell {
    get initial(): string {
        return this.list[0];
    }

    save(cell: HTMLCellElement): string {
        let select = cell.firstElementChild as HTMLSelectElement;
        return select.value;
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>): HTMLSelectElement {
        cell.className = "bonus";

        // 正規化
        let value = values[id] as BonusValueType;
        if (!this.list.contains(value)) {
            value = this.list[0];
        }

        return this.build(cell, values.star, values.level, value);
    }
}

type BonusValueTuple = [BonusValueType, string];

interface IBonusValueEventListener extends EventListenerObject {
    listeners: EventListenerList;
}

// ボーナス値セル
class BonusValueCell extends BonusCell {
    private onChange: IBonusValueEventListener;

    constructor(list: ReadonlyArray<BonusValueType>, listeners: EventListenerList = null) {
        super(list, listeners);
        this.onChange = {
            listeners: listeners,
            handleEvent(e: Event) {
                let select = e.target as HTMLSelectElement;
                let cell = select.parentElement as HTMLCellElement;
                removeWithoutFirstChild(cell);

                let bonus = BonusValueList[select.value as BonusValueType];
                bonus.cell(this.listeners).build(cell, bonus.init);
            }
        };
    }

    get initial(): BonusValueTuple {
        const type = this.list[0];
        return [type, BonusValueList[type].init];
    }

    save(cell: HTMLCellElement): string[] {
        let child1 = cell.firstElementChild as HTMLSelectElement;
        let chils2 = child1.nextElementSibling as HTMLTruthElement;
        return [child1.value, chils2.value];
    }

    load(cell: HTMLCellElement, id: string, values: IMap<Arrayable<string>>): HTMLTruthElement {
        cell.className = "bonus";

        // 正規化
        let pair = values[id] as BonusValueTuple;
        if (!Array.isArray(pair) || !this.list.contains(pair[0])) {
            pair = this.initial;
        }

        return this.build(cell, pair[0], pair[1]);
    }

    protected build(cell: HTMLCellElement, type: BonusValueType, value: string | number): HTMLTruthElement {
        let child = this.select(type);
        // onChangeを先に実行させる
        child.addEventListener("change", this.onChange);
        this.listen(cell, child);

        return BonusValueList[type].cell(this.listeners).build(cell, value);
    }
}

// 武器追加ボーナスセル
class SecondBonusCell extends BonusValueCell {
    private items: DeepReadonly<IMap<IWeapon>>;
    private step: ReadonlyArray<number> | undefined;

    constructor(items: DeepReadonly<IMap<IWeapon>>, listeners: EventListenerList = null) {
        super([items.other.second], listeners);
        this.items = items;
        this.step = undefined;
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>): HTMLTruthElement {
        // 正規化
        let name = values.name;
        if (!(name in this.items)) {
            name = "other";
        }

        const item = this.items[name];
        this.list = [item.second];
        this.step = item.secval;
        return super.load(cell, id, values);
    }

    private calc(level: string): Float {
        const param = this.step!;
        const bound = ASCENSION_LV_RANGE;
        const step = AscensionLevelCell.step(level);
        const min = bound[step.index];
        const max = bound[step.index + 1];
        const lower = param[step.index];
        const upper = param[step.index + 1];
        if (step.level === min) {
            return lower;
        }
        if (step.level === max) {
            return upper;
        }
        return (upper - lower) / (max - min) * (step.level - min) + lower;
    }

    protected build(cell: HTMLCellElement, type: BonusValueType, value: string): HTMLTruthElement {
        if (this.step) {
            let row = cell.parentElement as HTMLRowElement;
            let cel = row.querySelector("td#level") as HTMLCellElement;
            let select = cel.firstElementChild as HTMLSelectElement;
            return super.build(cell, type, this.calc(select.value));
        }
        return super.build(cell, type, value);
    }

    update(cell: HTMLCellElement, name: string) {
        const item = this.items[name];
        this.list = [item.second];
        this.step = item.secval;
        const initial = this.initial as BonusValueTuple;
        removeChildren(cell);
        this.build(cell, initial[0], initial[1]);
    }
}

type ItoDetail = (cell: HTMLCellElement, row: HTMLRowElement) => void;

interface IEquipmentEventListener extends EventListenerObject {
    type: EquipmentType;
}

// 装備セル
class EquipmentCell extends Cell {
    private static detailLine(cell: HTMLCellElement, row: HTMLRowElement, id: string, prefix: string) {
        let elem = row.querySelector("td#" + id);
        if (elem) {
            let child = elem.firstElementChild as HTMLValueElement;
            cell.appendChild(document.createElement("br"));
            cell.appendChild(document.createTextNode(prefix + child.value));
        }
    }

    private static detailBonus(cell: HTMLCellElement, row: HTMLRowElement, id: string) {
        let elem = row.querySelector("td#" + id);
        if (elem) {
            let child = elem.firstElementChild as HTMLValueElement;
            let type = child.value as BonusValueType;
            if ((type in BonusValueList) && (type !== StatusBonusType.Other)) {
                const bonus = BonusValueList[type];
                const label = bonus.name.replace("(%)", "");
                const value = (child.nextElementSibling as HTMLValueElement).value;
                const suffix = BONUS_LABEL[type].suffix;

                cell.appendChild(document.createElement("br"));
                cell.appendChild(document.createTextNode(`${label} +${value}${suffix}`));
            }
        }
    }

    private static detailChara(cell: HTMLCellElement, row: HTMLRowElement) {
        EquipmentCell.detailLine(cell, row, "level", "Lv.");
        EquipmentCell.detailLine(cell, row, "hp", "HP:");
        EquipmentCell.detailLine(cell, row, "atk", LABEL_TEXT.atk + ":");
        EquipmentCell.detailLine(cell, row, "def", LABEL_TEXT.def + ":");
    }

    private static detailWeapon(cell: HTMLCellElement, row: HTMLRowElement) {
        EquipmentCell.detailLine(cell, row, "level", "Lv.");
        EquipmentCell.detailLine(cell, row, "rank", LABEL_TEXT.rank + ":");
        EquipmentCell.detailLine(cell, row, "atk", LABEL_TEXT.atk + " +");
        EquipmentCell.detailBonus(cell, row, "second");
    }

    private static detailArtifact(cell: HTMLCellElement, row: HTMLRowElement) {
        EquipmentCell.detailBonus(cell, row, "main");
        EquipmentCell.detailBonus(cell, row, "sub1");
        EquipmentCell.detailBonus(cell, row, "sub2");
        EquipmentCell.detailBonus(cell, row, "sub3");
        EquipmentCell.detailBonus(cell, row, "sub4");
    }

    private static DetailTable: Readonly<Record<EquipmentType, ItoDetail>> = {
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
    } as const;

    private type: EquipmentType;
    private onChange: IEquipmentEventListener;

    constructor(type: EquipmentType, listeners: EventListenerList = null) {
        super(listeners);
        this.type = type;
        this.onChange = {
            type: type,
            handleEvent(e: Event) {
                let select = e.target as HTMLSelectElement;
                let cell = select.parentElement as HTMLCellElement;
                removeWithoutFirstChild(cell);

                if (this.type in EquipmentCell.DetailTable) {
                    let item = document.querySelector(`table#tbl_${this.type} tr#${select.value}`);
                    EquipmentCell.DetailTable[this.type](cell, item as HTMLRowElement);
                }
            }
        };
    }

    get initial(): string {
        return "0";
    }

    get items(): HTMLElementList {
        // 装備対象をリストアップ
        return document.querySelectorAll(`table#tbl_${this.type} td#name`);
    }

    value(cell: HTMLCellElement): Nullable<HTMLRowElement> {
        let select = cell.firstElementChild as HTMLSelectElement;
        return document.querySelector(`table#tbl_${this.type} tr#${select.value}`);
    }

    save(cell: HTMLCellElement): string {
        // 保存するのは id ではなく index
        let select = cell.firstElementChild as HTMLSelectElement;
        return select.selectedIndex.toString();
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>) {
        cell.className = "equip";

        // 正規化
        let value = parseInt(values[id]);
        if (isNaN(value)) {
            value = 0;
        }

        return this.build(cell, value, this.items);
    }

    update(cell: HTMLCellElement, items: HTMLElementList) {
        let row = this.value(cell);
        const index = row ? (row.rowIndex - 2) : 0;
        removeChildren(cell);
        this.build(cell, index, items);
    }

    private build(cell: HTMLCellElement, index: Integer, items: HTMLElementList): HTMLSelectElement {
        let child = document.createElement("select");
        for (let i = 0, len = items.length; i < len; ++i) {
            let item = items[i] as HTMLCellElement;

            // 文字が長い場合は短縮表示
            let label = Cell.getSelectLabel(item);
            if (7 < label.length) { // TODO: 他言語は要調整
                label = label.slice(0, 6) + "…";
            }

            let opt = document.createElement("option");
            opt.value = item.parentElement!.id; // tr[id] を保持する
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
            if (row) {
                EquipmentCell.DetailTable[this.type](cell, row);
            }
        }

        return child;
    }
}

// 装備武器セル
class EquipWeaponCell extends Cell {
    private builders: Readonly<Record<WeaponType, EquipmentCell>>;

    constructor(listeners: EventListenerList = null) {
        super();

        this.builders = {
            sword: new EquipmentCell(WeaponType.Sword, listeners),
            claymore: new EquipmentCell(WeaponType.Claymore, listeners),
            polearm: new EquipmentCell(WeaponType.Polearm, listeners),
            bow: new EquipmentCell(WeaponType.Bow, listeners),
            catalyst: new EquipmentCell(WeaponType.Catalyst, listeners)
        };
    }

    get initial(): string {
        return "0";
    }

    save(cell: HTMLCellElement): string {
        let select = cell.firstElementChild as HTMLSelectElement;
        // 保存するのは id ではなく index
        return select.selectedIndex.toString();
    }

    load(cell: HTMLCellElement, id: string, values: IMap<string>): Nullable<HTMLSelectElement> {
        let index = parseInt(values.chara);
        if (isNaN(index)) {
            index = 0;
        }

        let rows = (document.getElementById("tbl_chara") as HTMLTableElement).rows;
        let length = rows.length;
        if (length <= 2) { // キャプション以外はない
            return null;
        }
        if (length < 2 + index) { // アイテム範囲外
            index = 0;
        }

        // 装備キャラクターから装備する武器種を取得
        let chara = rows[2 + index].cells[1];
        const name = (chara.firstElementChild as HTMLSelectElement).value;

        const weapon = CHARACTER[name].weapon;
        return this.builders[weapon].load(cell, id, values);
    }

    builder(type: WeaponType) {
        return this.builders[type];
    }
}

// チームパラメータ基底クラス
// 追加値をそのまま表示
class Param {
    protected type: BonusType;

    constructor(type: BonusType) {
        this.type = type;
    }

    set(cell: HTMLCellElement, status: Status) {
        if (!status) {
            (cell.nextElementSibling as HTMLCellElement).textContent = "0";
        } else {
            (cell.nextElementSibling as HTMLCellElement).textContent = status.param[this.type].toString();
        }
    }
}

// 基礎があるパラメータ向け
class BaseParam extends Param {
    set(cell: HTMLCellElement, status: Status) {
        if (!status) {
            cell.textContent = "0";
            (cell.nextElementSibling as HTMLCellElement).textContent = "0";
        } else {
            const type = this.type as CharaStatusType;
            const base = status.base[type];
            cell.textContent = base.toString();

            const add = status.param[type];
            const buf = status.param[TypeToBonus.buffer(type)];
            (cell.nextElementSibling as HTMLCellElement).textContent = this.text(base, add, buf);
        }
    }

    private text(base: Integer, add: Integer, buf: Rate): string {
        return Math.floor((base * (buf * 10) / 1000) + add).toFixed();
    }
}

// 割合表記のパラメータ向け
class RateParam extends Param {
    set(cell: HTMLCellElement, status: Status) {
        if (!status) {
            (cell.nextElementSibling as HTMLCellElement).textContent = "0.0%";
        } else {
            (cell.nextElementSibling as HTMLCellElement).textContent = this.text(status.param[this.type]);
        }
    }

    protected text(rate: Rate): string {
        return rate.toFixed(1) + "%";
    }
}

// 元素ダメージバフパラメータ向け
class ElemBuffParam extends RateParam {
    set(cell: HTMLCellElement, status: Status) {
        if (!status) {
            (cell.nextElementSibling as HTMLCellElement).textContent = "0.0%";
        } else {
            (cell.nextElementSibling as HTMLCellElement).textContent = this.text(status.param.elem_dmg + status.param[this.type]);
        }
    }
}

// ダメージパラメータ向け
class DamageParam extends RateParam {
    set(cell: HTMLCellElement, status: Status) {
        if (!status) {
            (cell.nextElementSibling as HTMLCellElement).textContent = "+0.0%";
        } else {
            (cell.nextElementSibling as HTMLCellElement).textContent = "+" + this.text(status.param[this.type]);
        }
    }
}

// 元素反応パラメータ向け
class ElemReactParam extends RateParam {
    private reaction: ReactionType;

    constructor(type: ReactionBonusType) {
        super(type);
        this.reaction = type.replace("_dmg", "") as ReactionType;
    }

    set(cell: HTMLCellElement, status: Status) {
        if (!status) {
            cell.textContent = "+0.0%";
            (cell.nextElementSibling as HTMLCellElement).textContent = "+0.0%";
        } else {
            cell.textContent = "+" + this.text(status.elementMaster(this.reaction));
            (cell.nextElementSibling as HTMLCellElement).textContent = "+" + this.text(status.param[this.type]);
        }
    }
}
