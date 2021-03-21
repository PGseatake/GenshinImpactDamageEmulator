"use strict";
const TEAM_BONUS = {
    pyro: { items: StatusBonusType.AtkBuf, value: 25 },
    cryo: { items: CriticalBonusType.Rate, value: 15, limit: "氷元素付着または凍結状態の敵" },
    geo: { items: StatusBonusType.AnyDmg, value: 15, limit: "シールドが存在する時" },
};
const BonusCellType = [
    "check",
    "source",
    "value",
    "stack",
    "times"
];
class BonusBase {
    constructor(id, source) {
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
    get effect() {
        return "";
    }
    toString() {
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
    build(caption, row, change) {
        for (let cap of caption.cells) {
            const id = cap.id;
            let cell = row.insertCell();
            cell.id = id;
            this.builders[id](cell, [change]);
        }
    }
    buildCheck(cell, changes) {
        let input = document.createElement("input");
        input.type = "checkbox";
        for (let change of changes) {
            input.addEventListener("change", change);
        }
        cell.appendChild(input);
    }
    buildSource(cell) {
        cell.className = "left";
        cell.appendChild(document.createTextNode(this.source));
    }
    buildValue(cell) {
        cell.className = "left";
        if (this.limit) {
            cell.appendChild(document.createTextNode(this.limit));
            cell.appendChild(document.createElement("br"));
        }
        cell.appendChild(document.createTextNode(this.effect));
    }
    buildStack(cell, changes) {
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
        }
        else {
            cell.appendChild(document.createTextNode("-"));
        }
    }
    buildTimes(cell) {
        if (1 < this.times) {
            cell.appendChild(document.createTextNode(this.times.toString() + LABEL_TEXT.second));
        }
        else {
            cell.appendChild(document.createTextNode("-"));
        }
    }
    apply(status, stack = 1) {
        return [];
    }
    applyRow(status, row) {
        if (this.applicable(status)) {
            let input = row.querySelector("td#check input[type='checkbox']");
            if (input === null || input === void 0 ? void 0 : input.checked) {
                let stack = 1;
                input = row.querySelector("td#stack input[type='number']");
                if (input) {
                    stack = parseInt(input.value);
                }
                return this.apply(status, stack);
            }
        }
        return [];
    }
    applicable(status) {
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
class BasicBonus extends BonusBase {
    constructor(id, data, source) {
        var _a, _b, _c, _d;
        super(id, source);
        const items = data.items;
        this.types = Array.isArray(items) ? items : [items];
        this.value = data.value;
        this.limit = (_a = data.limit) !== null && _a !== void 0 ? _a : "";
        this.times = (_b = data.times) !== null && _b !== void 0 ? _b : 0;
        this.stack = (_c = data.stack) !== null && _c !== void 0 ? _c : 0;
        this.target = (_d = data.target) !== null && _d !== void 0 ? _d : BonusTarget.Self;
    }
    get effect() {
        const labels = BONUS_LABEL;
        const items = this.types;
        let str = this.types.map(type => labels[type].detail).join("・");
        const suffix = labels[items[0]].suffix;
        if (suffix) {
            return `${str}+${roundFloat(this.value)}${suffix}`;
        }
        return `${str}+${this.value}`;
    }
    apply(_, stack = 1) {
        let values = [];
        const value = this.value;
        for (const type of this.types) {
            values.push({ type: type, value: value * stack });
        }
        return values;
    }
}
class FlatBonus extends BonusBase {
    constructor(id, data, source, status) {
        var _a, _b, _c, _d;
        super(id, source);
        const dest = data.dest;
        this.dest = dest;
        this.base = data.base;
        this.value = data.value;
        if (data.scale) {
            this.value *= DAMAGE_SCALE[data.scale][status.talent.burst - 1] / 100;
        }
        this.limit = (_a = data.limit) !== null && _a !== void 0 ? _a : "";
        this.times = (_b = data.times) !== null && _b !== void 0 ? _b : 0;
        this.stack = (_c = data.stack) !== null && _c !== void 0 ? _c : 0;
        this.target = (_d = data.target) !== null && _d !== void 0 ? _d : BonusTarget.Self;
    }
    get effect() {
        const labels = BONUS_LABEL;
        let str;
        switch (this.dest) {
            case FlatBonusDest.Combat:
            case FlatBonusDest.CombatDmg:
                str = LABEL_TEXT.combat_dmg;
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
    apply(status, stack = 1) {
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
            case FlatBonusDest.CombatDmg:
                return [
                    { type: CombatBonusType.Normal, value: value },
                    { type: CombatBonusType.Heavy, value: value },
                    { type: CombatBonusType.Plunge, value: value },
                ];
            default:
                return [{ type: this.dest, value: value }];
        }
    }
}
class ReductBonus extends BonusBase {
    constructor(id, data, source, change) {
        var _a, _b;
        super(id, source);
        const types = data.type;
        this.types = Array.isArray(types) ? types : [types];
        this.value = data.value;
        this.limit = (_a = data.limit) !== null && _a !== void 0 ? _a : "";
        this.times = (_b = data.times) !== null && _b !== void 0 ? _b : 0;
        this.target = BonusTarget.Enemy;
        this.change = change;
    }
    buildCheck(cell, changes) {
        super.buildCheck(cell, [this.change, ...changes]);
    }
    get effect() {
        const types = this.types.map(type => REDUCT_LABEL[type]).join("・");
        return `敵の${types}-${roundRate(this.value)}`;
    }
    applyEnemy(enemy, row) {
        let input = row.querySelector("td#check input[type='checkbox']");
        if (input === null || input === void 0 ? void 0 : input.checked) {
            for (const type of this.types) {
                if (type !== ReductBonusType.Contact) {
                    enemy.reduct[type] += this.value;
                }
            }
        }
    }
}
