// TODO: 多言語対応
const TEAM_BONUS: DeepReadonly<Partial<Record<ElementType, IBasicBonus>>> = {
    pyro: { items: StatusBonusType.AtkBuf, value: 25 },
    cryo: { items: CriticalBonusType.Rate, value: 15, limit: "氷元素付着または凍結状態の敵" },
    geo: { items: StatusBonusType.AnyDmg, value: 15, limit: "シールドが存在する時" },
} as const;

const BonusCellType = [
    "check",
    "source",
    "value",
    "stack",
    "times"
] as const;
type BonusCellType = typeof BonusCellType[number];

class BonusBase {
    public id: string;
    public valid: boolean;
    public limit: string;
    public target: BonusTarget;
    protected times: Integer;
    protected stack: Integer;
    protected source: string;
    protected builders: Record<BonusCellType, (cell: HTMLCellElement, changes: EventListener[]) => void>;

    constructor(id: string, source: string) {
        this.id = id;
        this.valid = true;
        this.limit = "";
        this.times = 0;
        this.stack = 0;
        this.target = BonusTarget.Self;
        this.source = source;
        this.builders = {
            check: (cell, changes) => this.buildCheck(cell, changes),
            source: (cell, _) => this.buildSource(cell),
            value: (cell, _) => this.buildValue(cell),
            stack: (cell, changes) => this.buildStack(cell, changes),
            times: (cell, _) => this.buildTimes(cell),
        };
    }

    public get effect(): string {
        return "";
    }

    // TODO:多言語対応
    public toString(): string {
        let str = this.effect;

        if (this.limit) {
            str = `${this.limit}に${str}`;
        }
        if (0 < this.times) {
            str = `${str}、継続時間${this.times}秒`;
        }
        if (0 < this.stack) {
            str = `${str}、最大${this.stack}重`;
        }

        return `[${this.source}] ${str}`;
    }

    public build(caption: HTMLRowElement, row: HTMLRowElement, change: EventListener) {
        for (let cap of caption.cells) {
            const id = cap.id;
            let cell = row.insertCell();
            cell.id = id;
            this.builders[id as BonusCellType](cell, [change]);
        }
    }

    protected buildCheck(cell: HTMLCellElement, changes: EventListener[]) {
        let input = document.createElement("input");
        input.type = "checkbox";
        for (let change of changes) {
            input.addEventListener("change", change);
        }
        cell.appendChild(input);
    }

    protected buildSource(cell: HTMLCellElement) {
        cell.className = "left";
        cell.appendChild(document.createTextNode(this.source));
    }

    protected buildValue(cell: HTMLCellElement) {
        cell.className = "left";
        if (this.limit) {
            cell.appendChild(document.createTextNode(this.limit));
            cell.appendChild(document.createElement("br"));
        }
        cell.appendChild(document.createTextNode(this.effect));
    }

    protected buildStack(cell: HTMLCellElement, changes: EventListener[]) {
        if (1 < this.stack) {
            let input = document.createElement("input");
            input.className = "short";
            input.type = "number";
            input.min = "1";
            input.max = this.stack.toString();
            input.step = "1";
            input.value = "1";
            input.pattern = "[0-9]*";
            for (let change of changes) {
                input.addEventListener("change", change);
            }
            cell.appendChild(input);
        } else {
            cell.appendChild(document.createTextNode("-"));
        }
    }

    protected buildTimes(cell: HTMLCellElement) {
        if (1 < this.times) {
            cell.appendChild(document.createTextNode(this.times.toString() + LABEL_TEXT.second));
        } else {
            cell.appendChild(document.createTextNode("-"));
        }
    }

    public apply(status: Status, stack = 1): AnyBonusValue[] {
        return [];
    }

    public applyRow(status: Status, row: HTMLRowElement): AnyBonusValue[] {
        if (this.applicable(status)) {
            let input = row.querySelector("td#check input[type='checkbox']") as HTMLInputElement;
            if (input?.checked) {
                let stack = 1;
                input = row.querySelector("td#stack input[type='number']") as HTMLInputElement;
                if (input) {
                    stack = parseInt(input.value);
                }
                return this.apply(status, stack);
            }
        }
        return [];
    }

    private applicable(status: Status): boolean {
        if (this.valid) {
            switch (this.target) {
                case BonusTarget.Next:
                case BonusTarget.Other:
                    return this.source !== status.chara.name;
                case BonusTarget.Enemy:
                    return false;
            }
            return true;
        }
        return false;
    }
}

// ステータスボーナス
class BasicBonus extends BonusBase {
    private types: ReadonlyArray<BonusType>;
    private value: Integer | Rate;

    constructor(id: string, data: DeepReadonly<IBasicBonus>, source: string) {
        super(id, source);
        const items = data.items;
        this.types = Array.isArray(items) ? items : [items];
        this.value = data.value;
        this.limit = data.limit ?? "";
        this.times = data.times ?? 0;
        this.stack = data.stack ?? 0;
        this.target = data.target ?? BonusTarget.Self;
    }

    // TODO: 多言語対応
    public get effect(): string {
        const labels = BONUS_LABEL;
        const items = this.types;
        let str = this.types.map(type => labels[type].detail).join("・");
        const suffix = labels[items[0]].suffix;
        if (suffix) {
            return `${str}+${roundFloat(this.value)}${suffix}`;
        }
        return `${str}+${this.value}`;
    }

    public apply(_: Status, stack = 1): AnyBonusValue[] {
        let values: AnyBonusValue[] = [];
        const value = this.value;
        for (const type of this.types) {
            values.push({ type: type, value: value * stack });
        }
        return values;
    }
}

// 固定割合ボーナス
class FlatBonus extends BonusBase {
    private dest: FlatBonusDest;
    private base: FlatBonusBase;
    private value: number;

    constructor(id: string, data: DeepReadonly<IBasicFlatBonus>, source: string, status: Status) {
        super(id, source);
        const dest = data.dest;
        this.dest = dest;
        this.base = data.base;
        this.value = data.value;
        if (data.scale) {
            this.value *= DAMAGE_SCALE[data.scale][status.talent.burst - 1] / 100; // TODO: 元素爆発固定
        }
        this.limit = data.limit ?? "";
        this.times = data.times ?? 0;
        this.stack = data.stack ?? 0;
        this.target = data.target ?? BonusTarget.Self;
    }

    // TODO: 多言語対応
    public get effect(): string {
        const labels = BONUS_LABEL;
        let str: string;
        switch (this.dest) {
            case FlatBonusDest.Combat:
            case FlatBonusDest.NormalDmg:
                str = "通常攻撃・重撃・落下ダメージ";
                break;
            case FlatBonusDest.Skill:
            case FlatBonusDest.Burst:
                str = labels[TypeToBonus.combat(this.dest)].detail;
                break;
            default:
                str = labels[this.dest].detail;
                break;
        }
        const value = roundFloat(this.value);
        switch (this.base) {
            case FlatBonusBase.None:
                return `${str}+${value}%`;
            case FlatBonusBase.Atk:
                return `${str}+${LABEL_TEXT.atk_base}の${value}%分`;
            default:
                return `${str}+${labels[this.base].detail}の${value}%分`;
        }
    }

    public apply(status: Status, stack = 1): AnyBonusValue[] {
        let value = this.value;
        switch (this.base) {
            case FlatBonusBase.None:
                break;
            case FlatBonusBase.Hp:
                value = status.hp * value / 100;
                break;
            case FlatBonusBase.Atk:
                value = status.base.atk * value / 100;
                break;
            case FlatBonusBase.Def:
                value = status.defence * value / 100;
                break;
            default:
                value = status.param[this.base] * value / 100;
                break;
        }
        value *= stack;
        switch (this.dest) {
            case FlatBonusDest.Combat:
                return [
                    { flat: true, type: CombatType.Normal, value: value },
                    { flat: true, type: CombatType.Heavy, value: value },
                    { flat: true, type: CombatType.Plunge, value: value },
                ];
            case FlatBonusDest.Skill:
            case FlatBonusDest.Burst:
                return [{ flat: true, type: this.dest, value: value },];
            default:
                return [{ type: this.dest, value: value }];
        }
    }
}

// 耐性減衰ボーナス
class ReductBonus extends BonusBase {
    private types: Readonly<ReductBonusType[]>;
    private value: Rate;
    private change: EventListener;

    constructor(id: string, data: DeepReadonly<IReductBonus>, source: string, change: EventListener) {
        super(id, source);
        const types = data.type;
        this.types = Array.isArray(types) ? types : [types];
        this.value = data.value;
        this.limit = data.limit ?? "";
        this.times = data.times ?? 0;
        this.target = BonusTarget.Enemy;
        this.change = change;
    }

    protected buildCheck(cell: HTMLCellElement, changes: EventListener[]) {
        super.buildCheck(cell, [this.change, ...changes]);
    }

    // TODO:多言語対応
    public get effect(): string {
        const types = this.types.map(type => REDUCT_LABEL[type]).join("・");
        return `敵の${types}-${roundRate(this.value)}`;
    }

    public applyEnemy(enemy: Enemy, row: HTMLRowElement) {
        let input = row.querySelector("td#check input[type='checkbox']") as HTMLInputElement;
        if (input?.checked) {
            for (const type of this.types) {
                if (type !== ReductBonusType.Contact) {
                    enemy.reduct[type] += this.value;
                }
            }
        }
    }
}
