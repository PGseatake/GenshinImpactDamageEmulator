import VueI18n, { IVueI18n } from "vue-i18n/types";
import * as konst from "~/src/const";
import {
    IBonusOption, IBasicBonus, IEnchantBonus, IReductBonus,
    IFlatBonus, IFlatBonusScale, IFlatBonusBound, ICombatBonus,
    AnyBonus, Constes, Passives, Passive,
} from "~/src/interface";
import { parseLevel } from "~/src/ascension";
import { DBEquipTable } from "~/src/equipment";
import { DBCharaTable, ICharaData, CharaName, CharaList } from "~/src/character";
import { DBWeaponTable, IWeaponData, WeaponList } from "~/src/weapon";
import { DBArtifactTable, ArtifactName, ArtifactList } from "~/src/artifact";
import { Team, ITeamData, Member, IRequiredMember } from "~/src/team";
import Status, { StatusCritical } from "~/src/status";
import { roundRate } from "~/plugins/utils";
import { Arrayable } from "~/src/utility";

export const DamageScaleTable: ReadonlyRecord<konst.DamageScale, ReadonlyArray<number>> = {
    //    [    1,     2,     3,     4,     5,     6,     7,     8,     9,    10,    11,    12,    13,    14,    15]
    phys: [100.0, 108.0, 116.0, 127.5, 135.0, 145.0, 157.5, 170.0, 182.5, 197.5, 211.5, 225.5, 239.5, 253.5, 267.5],
    elem: [100.0, 107.5, 115.0, 125.0, 132.5, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 212.5, 225.0, 237.5], // 確定
    xiao: [100.0, 106.0, 112.0, 119.5, 125.5, 131.5, 139.5, 147.0, 155.0, 162.5, 170.5, 178.0, 186.0, 193.5, 201.0],
    //     [    1,      2,     3,      4,     5,     6,      7,     8,      9,    10,     11,    12,     13,    14,     15]
    hutao: [100.0, 106.75, 113.5, 122.75, 129.5, 137.5, 147.75, 158.0, 168.25, 178.5, 188.75, 199.0, 209.25, 219.5, 229.75],
    //       [    1,     2,     3,     4,     5,     6,     7,     8,     9,    10,    11,    12,    13,    14,    15]
    zhongli: [100.0, 110.5, 121.5, 135.0, 147.0, 159.5, 175.5, 192.0, 208.0, 224.0, 240.5, 256.5, 270.0, 283.5, 297.0],
} as const;

export const DirectBonus: ReadonlyArray<string> = [
    konst.BonusType.None,
    konst.StatusBonusType.Hp,
    konst.StatusBonusType.Atk,
    konst.StatusBonusType.Def,
    konst.StatusBonusType.Elem,
] as const;

export const RateBonus = {
    check(type: konst.AnyBonusType) {
        return !DirectBonus.includes(type);
    },
    suffix(type: konst.AnyBonusType) {
        return DirectBonus.includes(type) ? "" : "%";
    },
    round(value: number, type?: konst.AnyBonusType) {
        if (!DirectBonus.includes(type!)) {
            return roundRate(value);
        }
        return Math.round(value).toFixed();
    },
    xround(value: number, type?: konst.AnyBonusType) {
        return value < 0 ? "-" : "+" + RateBonus.round(value, type);
    },
} as const;

const TeamBonus: Partial<ReadonlyRecord<konst.ElementType, IBasicBonus>> = {
    pyro: { items: konst.StatusBonusType.AtkBuf, value: 25 },
    cryo: { items: konst.CriticalBonusType.Rate, value: 15, limit: "elem.cryo" },
    geo: { items: konst.AnyBonusType.Damage, value: 15, limit: "general.shield" },
} as const;

const ConductBonus: IReductBonus = {
    extra: konst.ExtraBonusType.Reduct,
    type: konst.ElementType.Phys,
    value: 40,
    limit: "elem.conduct",
    times: 12,
    target: konst.BonusTarget.All,
};

function join<T>(items: readonly T[], pred: (item: T) => VueI18n.TranslateResult) {
    return items.map(item => pred(item)).join("/");
}

// 通常ボーナス
export type StatusBonus = {
    step: number;
    target: Status;
    party: ReadonlyArray<Status>;
    contact?: konst.AnyContactType;
};

// 追加ボーナス
export type ExtraBonus = {
    atk: number;
    dmg: number;
    crit: StatusCritical;
    flat: number;
};

// ボーナス基底
export class BonusBase {
    public readonly i18n: IVueI18n;
    public readonly key: number;
    public readonly index: number;
    public readonly group: string; // table-dataのグループ
    public readonly extra: konst.ExtraBonusType | undefined;
    public readonly limit: string;
    public readonly stack: number;
    public readonly times: number;
    public readonly target: konst.BonusTarget;
    public readonly source: string;
    public name: CharaName | "";
    public data: IBonusData;

    constructor(i18n: IVueI18n, key: number, index: number, group: string, source: string,
        { extra, limit, times, stack, target }: IBonusOption) {
        this.i18n = i18n;
        this.key = key;
        this.index = index;
        this.group = group;
        this.extra = extra;
        this.limit = limit ?? "";
        this.stack = stack ?? 0;
        this.times = times ?? 0;
        this.target = target ?? konst.BonusTarget.Self;
        this.source = source;
        this.name = "";
        this.data = { index: key, apply: this.always, stack: stack ?? 1 };
    }

    public get always() {
        return !this.limit;
    }

    public get checked() {
        return this.data.apply;
    }
    public set checked(value: boolean) {
        this.data.apply = value;
    }

    public get stacks() {
        return this.data.stack;
    }
    public set stacks(value: number) {
        this.data.stack = value;
    }

    public get step() {
        return 0;
    }

    public reset(data: IBonusData) {
        this.data = data;
        this.data.apply = this.always || data.apply;
        this.data.stack = data.stack || 1;
    }

    public effect(party: ReadonlyArray<Status>): VueI18n.TranslateResult {
        return "";
    }

    public condition(party: ReadonlyArray<Status>) {
        const effect = this.effect(party);
        if (this.limit) {
            return this.i18n.t("limit." + this.limit, [effect]);
        }
        return effect;
    }

    public isMine(target: Readonly<ICharaData> | null) {
        if (target) {
            switch (this.target) {
                case konst.BonusTarget.All:
                    return true;
                case konst.BonusTarget.Self:
                    return this.name === target.name;
                case konst.BonusTarget.Next:
                case konst.BonusTarget.Other:
                    return this.name !== target.name;
                case konst.BonusTarget.Melee:
                    switch (CharaList[target.name].weapon) {
                        case konst.WeaponType.Sword:
                        case konst.WeaponType.Claymore:
                        case konst.WeaponType.Polearm:
                            return true;
                    }
                    break;
            }
        }
        return false;
    }

    public isExtra(target: Readonly<ICharaData> | null) {
        return this.isMine(target) && this.step < 0;
    }

    public isApply(target: Readonly<Status>, step: number) {
        const chara = target.chara;
        if (chara && this.data.apply && this.step === step) {
            return this.isMine(chara);
        }
        return false;
    }

    public apply(arg: StatusBonus) { }

    protected text(type: konst.AnyBonusType | "energy" | "contact") {
        return String(this.i18n.t("bonus." + type)).replace("(%)", "");
    }
}

// 通常ボーナス
export class BasicBonus extends BonusBase {
    private readonly types: ReadonlyArray<konst.BonusType>;
    private readonly value: number;

    constructor(i18n: IVueI18n, key: number, index: number, group: string, source: string, data: IBasicBonus, talent = 0) {
        super(i18n, key, index, group, source, data);
        this.types = Arrayable.from(data.items);
        this.value = Arrayable.clamp(data.value, talent);
    }

    public effect(_: ReadonlyArray<Status>) {
        const type = join(this.types, item => this.text(item));
        return this.i18n.t(
            "format.basic",
            { type, value: RateBonus.xround(this.value, this.types[0]) }
        );
    }

    public apply(arg: StatusBonus) {
        const dst = arg.target;
        if (this.isApply(dst, arg.step)) {
            const value = this.value * this.data.stack;
            for (const type of this.types) {
                if (type === konst.FlatBonusDest.CombatDmg) {
                    dst.param[konst.CombatBonusType.Normal] += value;
                    dst.param[konst.CombatBonusType.Heavy] += value;
                    dst.param[konst.CombatBonusType.Plunge] += value;
                } else {
                    dst.param[type] += value;
                }
            }
        }
    }
}

// 固定割合ボーナス
export class FlatBonus extends BonusBase {
    private readonly dest: ReadonlyArray<konst.FlatBonusDest>;
    private readonly base?: konst.FlatBonusBase;
    private readonly value: number;
    private readonly scale?: Readonly<IFlatBonusScale>;
    private readonly bound?: Readonly<IFlatBonusBound>;

    constructor(i18n: IVueI18n, key: number, index: number, group: string, source: string, data: IFlatBonus, talent = 0) {
        super(i18n, key, index, group, source, data);
        this.dest = Arrayable.from(data.dest);
        this.base = data.base;
        this.value = Arrayable.clamp(data.value, talent);
        this.scale = data.scale;
        this.bound = data.bound;
    }

    public get step() {
        switch (this.base) {
            case konst.FlatBonusBase.Direct:
                return 0;
            case konst.FlatBonusBase.Elem:
            case konst.FlatBonusBase.EnRec:
                if (!this.dest.includes(this.base)) {
                    // 変換元と適用先が違うものは後回し
                    return 2;
                }
        }
        return 1;
    }

    private get direct() {
        switch (this.dest[0]) {
            case konst.FlatBonusDest.CombatDmg:
            case konst.FlatBonusDest.NormalDmg:
            case konst.FlatBonusDest.HeavyDmg:
            case konst.FlatBonusDest.SkillDmg:
            case konst.FlatBonusDest.BurstDmg:
            case konst.FlatBonusDest.Contact:
                return true;
        }
        return false;
    }

    private format(type: konst.FlatBonusDest) {
        switch (type) {
            case konst.FlatBonusDest.Combat:
            case konst.FlatBonusDest.Normal:
            case konst.FlatBonusDest.Heavy:
            case konst.FlatBonusDest.Skill:
            case konst.FlatBonusDest.Burst:
                return this.text(konst.TypeToBonus.combat(type));
            default:
                return this.text(type);
        }
    }

    public effect(party: ReadonlyArray<Status>) {
        let type = join(this.dest, (item) => this.format(item));
        const value = this.applyScale(this.value, party[this.index]);
        const based = this.base;
        if (based) {
            const base = this.i18n.t("bonus." + based);
            switch (based) {
                case konst.FlatBonusBase.Direct:
                    return this.i18n.t(
                        "format.basic",
                        { type, value: RateBonus.xround(value, konst.BonusType.None) }
                    );
                case konst.FlatBonusBase.Elem:
                    if (this.direct) {
                        return this.i18n.t(
                            "format.elem",
                            { type, base, value: RateBonus.round(value) }
                        );
                    }
            }
            return this.i18n.t(
                "format.flat",
                { type, base, value: RateBonus.round(value) }
            );
        }
        return this.i18n.t(
            "format.basic",
            { type, value: RateBonus.xround(value) }
        );
    }

    private applyValue(target: Readonly<Status>, owner: Readonly<Status>) {
        let value = this.value;
        const base = this.base;
        switch (base) {
            case undefined:
            case konst.FlatBonusBase.Direct:
                break;
            case konst.FlatBonusBase.Energy:
                value = (target.info?.energy || 0) * value; // 適用者の値を参照
                break;
            case konst.FlatBonusBase.AtkBase:
                value = owner.base.atk * value / 100;
                break;
            case konst.FlatBonusBase.Hp:
            case konst.FlatBonusBase.Def:
                value = owner.total(base) * value / 100;
                break;
            case konst.FlatBonusBase.Elem:
                if (this.direct) {
                    value = owner.param[base] * value;
                } else {
                    value = owner.param[base] * value / 100;
                }
                break;
            default:
                value = owner.param[base] * value / 100;
                break;
        }
        return value * this.data.stack;
    }

    private applyScale(value: number, owner: Readonly<Status>) {
        const scale = this.scale;
        if (scale) {
            const talent = owner.talent[scale.talent] || 1;
            value *= DamageScaleTable[scale.type][talent - 1] / 100;
        }
        return value;
    }

    private applyBound(value: number, owner: Readonly<Status>) {
        const bound = this.bound;
        if (bound) {
            switch (bound.base) {
                // 無視
                case konst.FlatBonusBase.Direct:
                case konst.FlatBonusBase.Energy:
                    break;
                // 直値
                case undefined:
                    if (bound.value < value) {
                        value = bound.value;
                    }
                    break;
                // 基礎攻撃力の倍率
                case konst.FlatBonusBase.AtkBase:
                    const atk = owner.base.atk * bound.value / 100;
                    if (atk < value) {
                        value = atk;
                    }
                    break;
                // 最終値の倍率
                default:
                    const limit = owner.param[bound.base] * bound.value / 100;
                    if (limit < value) {
                        value = limit;
                    }
                    break;
            }
        }
        return value;
    }

    public apply(arg: StatusBonus) {
        const target = arg.target;
        if (this.isApply(target, arg.step)) {
            const owner = arg.party[this.index];

            let value = this.applyValue(target, owner);
            // ダメージ倍率適用
            value = this.applyScale(value, owner);
            // 最大値チェック
            value = this.applyBound(value, owner);

            for (const dest of this.dest) {
                switch (dest) {
                    case konst.FlatBonusDest.Combat:
                        target.flat[konst.CombatType.Normal] += value;
                        target.flat[konst.CombatType.Heavy] += value;
                        target.flat[konst.CombatType.Plunge] += value;
                        break;
                    case konst.FlatBonusDest.Normal:
                    case konst.FlatBonusDest.Heavy:
                    case konst.FlatBonusDest.Skill:
                    case konst.FlatBonusDest.Burst:
                        target.flat[dest] += value;
                        break;
                    case konst.FlatBonusDest.CombatDmg:
                        target.param[konst.CombatBonusType.Normal] += value;
                        target.param[konst.CombatBonusType.Heavy] += value;
                        target.param[konst.CombatBonusType.Plunge] += value;
                        break;
                    case konst.FlatBonusDest.Contact:
                        const contact = arg.contact;
                        if (contact) {
                            const type = konst.TypeToBonus.element(contact);
                            target.param[type] += value;
                        }
                        break;
                    default:
                        target.param[dest] += value;
                        break;
                }
            }
        }
    }
}

// 特定攻撃ボーナス
export class CombatBonus extends BonusBase {
    private readonly bind: ReadonlyArray<string>;
    private readonly dest?: konst.BonusType;
    private readonly base?: konst.StatusBonusType;
    private readonly value: number;
    private readonly format: string;

    constructor(i18n: IVueI18n, key: number, index: number, group: string, source: string, data: ICombatBonus, talent = 0) {
        super(i18n, key, index, group, source, data);
        this.bind = Arrayable.from(data.bind);
        this.dest = data.dest;
        this.base = data.base;
        this.value = Arrayable.clamp(data.value, talent);
        this.format = data.format;
    }

    public get step() {
        return -1;
    }

    public effect(_: ReadonlyArray<Status>) {
        return this.i18n.t("combat." + this.format, {
            bind: join(this.bind, (item) => this.i18n.t("combat." + item)),
            dest: this.dest ? this.i18n.t("bonus." + this.dest) : "",
            base: this.base ? this.i18n.t("bonus." + this.base) : "",
            value: roundRate(this.value),
        });
    }

    private bound(type: konst.CombatType, name: string) {
        const bind = this.bind[0];
        switch (bind) {
            case konst.CombatType.Normal:
            case konst.CombatType.Heavy:
            case konst.CombatType.Plunge:
            case konst.CombatType.Skill:
            case konst.CombatType.Burst:
                return type === bind;
        }
        return this.bind.includes(name);
    }

    private calc(target: Readonly<Status>) {
        let value = this.value;
        switch (this.base) {
            case konst.FlatBonusBase.Hp:
            case konst.FlatBonusBase.Def:
                value = target.total(this.base) * value / 100;
                break;
        }
        return value * this.data.stack;
    }

    public applyEx(dst: ExtraBonus, status: Readonly<Status>, type: konst.CombatType, name: string) {
        if (this.isApply(status, -1)) {
            if (this.bound(type, name)) {
                const value = this.calc(status);
                switch (this.dest) {
                    case konst.CombatBonusDest.Atk:
                        dst.atk += value;
                        break;
                    case konst.CombatBonusDest.Damage:
                        dst.dmg += value;
                        break;
                    case konst.CombatBonusDest.CriDmg:
                        dst.crit.damage += value;
                        break;
                    case konst.CombatBonusDest.CriRate:
                        dst.crit.rate += value;
                        break;
                    default:
                        dst.flat += value;
                        break;
                }
            }
        }
    }
}

// 耐性減衰ボーナス
export class ReductBonus extends BonusBase {
    private readonly types: Readonly<konst.AnyReductType[]>;
    private readonly value: number;

    constructor(i18n: IVueI18n, key: number, index: number, group: string, source: string, data: IReductBonus, talent = 0) {
        super(i18n, key, index, group, source, data);
        this.types = Arrayable.from(data.type);
        this.value = Arrayable.clamp(data.value, talent);
    }

    public effect(_: ReadonlyArray<Status>) {
        const type = join(this.types, type => this.i18n.t("reduct." + type));
        return this.i18n.t(
            "format.reduct",
            { type, value: RateBonus.round(this.value) }
        );
    }

    public apply(arg: StatusBonus) {
        const target = arg.target;
        if (this.isApply(target, arg.step)) {
            for (const type of this.types) {
                switch (type) {
                    case konst.AnyReductType.Contact:
                        const contact = arg.contact;
                        if (contact) {
                            target.reduct[contact] += this.value;
                        }
                        break;
                    case konst.AnyReductType.All:
                        for (const elem of konst.ElementTypes) {
                            target.reduct[elem] += this.value;
                        }
                        break;
                    default:
                        target.reduct[type] += this.value;
                        break;
                }
            }
        }
    }
}

// 元素付与ボーナス
export class EnchantBonus extends BonusBase {
    private readonly type: konst.EnchantType;
    private readonly dest: ReadonlyArray<konst.CombatType>;

    constructor(i18n: IVueI18n, key: number, index: number, group: string, source: string, data: IEnchantBonus) {
        super(i18n, key, index, group, source, data);
        this.type = data.elem;
        this.dest = data.dest;
    }

    public effect(_: ReadonlyArray<Status>) {
        const dest = join(this.dest, (item) => this.i18n.t("combat." + item));
        return this.i18n.t(
            "format.enchant",
            { dest, type: this.i18n.t("element." + this.type) }
        );
    }

    public apply(arg: StatusBonus) {
        const target = arg.target;
        if (this.isApply(target, arg.step)) {
            target.renchant(this.type, this.dest, this.target === konst.BonusTarget.Self);
        }
    }
}

export interface IBonusData {
    index: number;
    apply: boolean;
    stack: number;
}
export type DBBonusTable = { bonus: IDict<IBonusData>; };

type Database =
    DBEquipTable &
    DBBonusTable &
    DBCharaTable &
    DBWeaponTable &
    DBArtifactTable;

export class BonusBuilder {
    private i18n: IVueI18n;
    private team: string;
    private equip: string;
    private index: number;
    private chara: Readonly<ICharaData> | null;
    private bonus: IDict<IBonusData>;
    public output: IDict<IBonusData>;

    constructor(i18n: IVueI18n, bonus: IDict<IBonusData>) {
        this.i18n = i18n;
        this.team = "";
        this.equip = "";
        this.index = -1;
        this.chara = null;
        this.bonus = bonus;
        this.output = {};
    }

    private reset({ id }: ITeamData) {
        this.team = id;
        this.equip = "";
        this.index = -1;
        this.chara = null;
    }

    private member(member: IRequiredMember) {
        this.index++;
        this.equip = member.equip.id;
        this.chara = member.chara;
        return new Member(member);
    }

    private sortKey(index: number) {
        return (this.index + 1) * 1000 + index;
    }

    private convert(data: AnyBonus, id: number, origin: string, source: string): BonusBase {
        const chara = this.chara;
        let group: string;
        switch (data.target || konst.BonusTarget.Self) {
            case konst.BonusTarget.Self:
                group = "chara." + (chara?.name || "");
                source = "origin." + origin;
                break;
            default:
                group = "general.everyone";
                id += 10000;
                break;
        }

        let talent = 0;
        switch (origin) {
            case konst.TalentType.Skill:
                talent = chara?.skill || 0;
                break;
            case konst.TalentType.Burst:
                talent = chara?.burst || 0;
                break;
        }

        const i18n = this.i18n;
        const index = this.index;
        const key = this.sortKey(id);
        let bonus: BonusBase;
        switch (data.extra) {
            case konst.ExtraBonusType.Flat:
                bonus = new FlatBonus(i18n, key, index, group, source, data, talent);
                break;
            case konst.ExtraBonusType.Combat:
                bonus = new CombatBonus(i18n, key, index, group, source, data, talent);
                break;
            case konst.ExtraBonusType.Reduct:
                bonus = new ReductBonus(i18n, key, index, group, source, data, talent);
                break;
            case konst.ExtraBonusType.Enchant:
                bonus = new EnchantBonus(i18n, key, index, group, source, data);
                break;
            default:
                bonus = new BasicBonus(i18n, key, index, group, source, data);
                break;
        }
        bonus.name = chara?.name || "";

        // ボーナスDBから保存情報を取得
        const prop = `${this.team}.${this.equip}.${id}`;
        if (prop in this.bonus) {
            bonus.reset(this.bonus[prop]);
        }
        this.output[prop] = bonus.data;

        return bonus;
    }

    private append(data: ReadonlyArrayable<AnyBonus>, id: number, origin: string, source: string): BonusBase[] {
        if (Array.isArray(data)) {
            return data.map((value, i) => this.convert(value, id + i, origin, source));
        }
        return [this.convert(data, id, origin, source)];
    }

    // chara: 100 <= key < 300
    private charaBonus(): BonusBase[] {
        const data = this.chara!;
        const info = CharaList[data.name];
        const level = parseLevel(data.level);
        const source = "chara." + data.name;
        let bonus: BonusBase[] = [];
        // passive: 100 <= sort < 200
        for (const [idx, origin] of Passives.entries()) {
            const passive = info.passive[origin];
            if (passive) {
                switch (origin) {
                    case Passive.Ascension1:
                        if (level.index >= 1) {
                            bonus.push(...this.append(passive, 100 + (idx * 10), origin, source));
                        }
                        break;
                    case Passive.Ascension4:
                        if (level.index >= 4) {
                            bonus.push(...this.append(passive, 100 + (idx * 10), origin, source));
                        }
                        break;
                    default:
                        bonus.push(...this.append(passive, 100 + (idx * 10), origin, source));
                        break;
                }
            }
        }
        // conste: 200 <= sort < 300
        for (const [idx, origin] of Constes.entries()) {
            const conste = info.conste[origin];
            const count = parseInt(origin.replace("lv", ""));
            if (conste) {
                if (count <= data.conste) {
                    bonus.push(...this.append(conste, 200 + idx * 10, origin, source));
                }
            }
        }
        return bonus;
    }

    // weapon: 300 <= key < 400
    private weaponBonus({ type, data }: { type: konst.WeaponType, data?: IWeaponData; }): BonusBase[] {
        if (data) {
            const source = `weapon.${type}.${data.name}`;
            const weapon = WeaponList[type][data.name];
            const bonus = weapon.passive;
            if (bonus) {
                if (Array.isArray(bonus)) {
                    return bonus.map((value, i) => this.convert(
                        { ...value, value: value.value[data.rank - 1] }, 300 + i, "weapon", source));
                } else {
                    return [this.convert(
                        { ...bonus, value: bonus.value[data.rank - 1] }, 300, "weapon", source)];
                }
            }
        }
        return [];
    }

    // artifact: 400 <= key < 500
    private artifactBonus(names: ArtifactName[]): BonusBase[] {
        let bonus: BonusBase[] = [];
        let first = 0;
        while (first < names.length) {
            let name = names[first];
            let last = names.lastIndexOf(name) + 1;
            if (name in ArtifactList) {
                let same = last - first;
                const source = "artifact.name." + name;
                const artifact = ArtifactList[name];
                // 2セットの効果追加
                if (2 <= same) {
                    if (artifact.set2) {
                        bonus.push(...this.append(artifact.set2, 400, "artifact", source));
                    }
                }
                // 4セットの効果追加
                if (4 <= same) {
                    if (artifact.set4) {
                        bonus.push(...this.append(artifact.set4, 410, "artifact", source));
                    }
                }
            }
            first = last;
        }
        return bonus;
    }

    // resonance: 10000 <= key < 10100
    private resonanceBonus(elems: konst.ElementType[]): BonusBase[] {
        let bonus: BonusBase[] = [];
        for (const [idx, elem] of elems.entries()) {
            const base = TeamBonus[elem];
            if (base) {
                const data = { ...base, target: konst.BonusTarget.All };
                bonus.push(...this.append(data, idx + 1, "resonance", "general.resonance"));
            }
        }
        return bonus;
    }

    public build(team: ITeamData, db: Database) {
        this.reset(team);
        let data: BonusBase[] = [];
        // 元素共鳴ボーナス追加
        data.push(...this.resonanceBonus(team.resonance));
        // 超電導を追加 key = 10100
        data.push(...this.append(ConductBonus, 100, "conduct", "reaction.conduct"));

        for (const m of new Team(team).members(db)) {
            const member = this.member(m);
            // キャラボーナス追加
            data.push(...this.charaBonus());
            // 武器ボーナス追加
            data.push(...this.weaponBonus(member.weapon(db)));
            // 聖遺物ボーナス追加
            data.push(...this.artifactBonus(member.artifact(db).map((val) => val.name)));
        }
        data.sort((a, b) => a.key - b.key);
        return data;
    }
}
