import {
    IBasicBonus, IFlatBonus, IFlatBonusBound, IEnchantBonus, IReductBonus,
    IBonusOption, AnyExtraBonus, Constes, Passives, GlobalEquipData
} from "./interface";
import * as konst from "./const";
import { CharaList, ICharaData, GlobalCharaData } from "./character";
import { WeaponList, IWeaponData, GlobalWeaponData } from "./weapon";
import { ArtifactName, ArtifactSet, SubBonus, GlobalArtifactData } from "./artifact";
import { Member, Members, ITeamData, getArtifacts, getMember, getWeapon } from "./team";

export const BonusTypes = [
    // StatusBonusType
    "hp",
    "hp_buf",
    "atk",
    "atk_buf",
    "def",
    "def_buf",
    "elem",
    "en_rec",
    "heal_buf",
    "cri_dmg",
    "cri_rate",
    // ElementBonusType
    "pyro_dmg",
    "hydro_dmg",
    "dendro_dmg",
    "elect_dmg",
    "anemo_dmg",
    "cryo_dmg",
    "geo_dmg",
    "phys_dmg",
    // AnyBonusType
    "any_dmg",
    "elem_dmg",
    // CombatBonusType
    "normal_dmg",
    "heavy_dmg",
    "plunge_dmg",
    "combat_dmg",
    "skill_dmg",
    "burst_dmg",
    // CriticalBonusType
    "normal_cri",
    "heavy_cri",
    "skill_cri",
    // ReactionBonusType
    "burning_dmg",
    "vaporize_dmg",
    "melt_dmg",
    "swirl_dmg",
    "echarge_dmg",
    "shutter_dmg",
    "conduct_dmg",
    "overload_dmg",
] as const;

export type StatusTalent = Record<konst.TalentType, number>;
export type StatusBase = { hp: number; atk: number; def: number; };
export type StatusParam = Record<konst.BonusType, number>;
export type StatusFlat = Record<konst.CombatType, number>;
export type StatusReduct = Record<konst.ReductType, number>;
export type StatusEnchant = {
    type: konst.ElementType;
    dest: konst.CombatType[];
};

export interface IStatus {
    talent: StatusTalent;
    base: StatusBase;
    param: StatusParam;
    flat: StatusFlat;
    reduct: StatusReduct;
    enchant: StatusEnchant;
};

export class Status {
    public chara: ICharaData | null;
    public talent: StatusTalent;
    public base: StatusBase;
    public param: StatusParam;
    public flat: StatusFlat;
    public reduct: StatusReduct;
    public enchant: StatusEnchant;

    constructor(data: IStatus) {
        this.chara = null;
        this.talent = data.talent;
        this.base = data.base;
        this.param = data.param;
        this.flat = data.flat;
        this.reduct = data.reduct;
        this.enchant = data.enchant;
    }

    equip({ info, equip, chara }: Member, globals: GlobalWeaponData & GlobalArtifactData) {
        this.chara = chara;

        for (const type of BonusTypes) {
            this.param[type] = 0;
        }
        for (const type of konst.CombatTypes) {
            this.flat[type] = 0;
        }
        for (const type of konst.ReductTypes) {
            this.reduct[type] = 0;
        }
        this.enchant.type = konst.ElementType.Phys;
        this.enchant.dest.splice(0);

        // 基礎値
        this.param[konst.CriticalBonusType.Damage] = 50;
        this.param[konst.CriticalBonusType.Rate] = 5;

        if (info && equip && chara) {
            this.talent.combat = chara.combat;
            this.talent.skill = chara.skill;
            this.talent.burst = chara.burst;
            this.base.hp = chara.hp;
            this.base.atk = chara.atk;
            this.base.def = chara.def;

            // キャラクタ
            this.apply(chara.special);
            // 武器
            const { data } = getWeapon(info, equip, globals);
            if (data) {
                this.base.atk += data.atk;
                this.apply(data.second);
            }
            // 聖遺物
            const list = getArtifacts(equip, globals);
            for (const data of list) {
                this.apply(data.main);
                for (const prop of SubBonus) {
                    this.apply(data[prop]);
                }
            }
        } else {
            this.talent.combat = 0;
            this.talent.skill = 0;
            this.talent.burst = 0;
            this.base.hp = 0;
            this.base.atk = 0;
            this.base.def = 0;
        }
    }

    private apply({ type, value }: { type: konst.AnyBonusType, value: number; }) {
        if (type !== konst.BonusType.None) {
            this.param[type] += value;
        }
    }

    setEnchant(type: konst.ElementType, dest: ReadonlyArray<konst.CombatType>) {
        this.enchant.type = type;
        this.enchant.dest.splice(0);
        this.enchant.dest.push(...dest);
    }
}

export const TypeToBonus = {
    element(type: konst.ElementType) {
        return type + "_dmg" as konst.ElementBonusType;
    },
    combat(type: konst.CombatType) {
        return type + "_dmg" as konst.CombatBonusType;
    },
    reaction(type: konst.ReactionType) {
        return type + "_dmg" as konst.ReactionBonusType;
    },
    buffer(type: konst.StatusBonusType) {
        return type + "_buf" as konst.StatusBonusType;
    },
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
    }
} as const;

// TODO: 多言語対応
export const TeamBonus: Partial<ReadonlyRecord<konst.ElementType, IBasicBonus>> = {
    pyro: { items: konst.StatusBonusType.AtkBuf, value: 25 },
    cryo: { items: konst.CriticalBonusType.Rate, value: 15, limit: "氷元素付着または凍結状態の敵" },
    geo: { items: konst.AnyBonusType.Damage, value: 15, limit: "シールドが存在する時" },
} as const;

export class BonusBase {
    public readonly vm: Vue;
    public readonly ref: string; // キャラID
    public readonly index: number;
    public readonly group: string; // table-dataのグループ
    public readonly extra: konst.ExtraBonusType | undefined;
    public readonly limit: string;
    public readonly times: number;
    public readonly stack: number;
    public readonly target: konst.BonusTarget;
    public readonly source: string;
    public data: IBonusData;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string,
        { extra, limit, times, stack, target }: IBonusOption) {
        this.vm = vm;
        this.ref = ref;
        this.index = index;
        this.group = group;
        this.extra = extra;
        this.limit = limit ?? "";
        this.times = times ?? 0;
        this.stack = stack ?? 0;
        this.target = target ?? konst.BonusTarget.Self;
        this.source = source;
        this.data = { index: index, apply: this.always, stack: stack ?? 1 };
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

    public get effect() {
        return "";
    }

    public get condition() {
        if (this.limit) {
            return `${this.limit}に${this.effect}`;
        }
        return this.effect;
    }

    public get stacks() {
        return this.data.stack;
    }
    public set stacks(value: number) {
        this.data.stack = value;
    }

    public reset(data: IBonusData) {
        this.data = data;
        this.data.apply = this.always || data.apply;
        this.data.stack = data.stack || 1;
    }

    public isMine(chara: ICharaData) {
        return this.group === "general.everyone" || this.group.includes(chara.name);
    }

    public getLabel(type: konst.AnyBonusType) {
        return String(this.vm.$t("bonus." + type)).replace("(%)", "");
    }

    public apply(status: Status) { }
}

// 通常ボーナス
export class BasicBonus extends BonusBase {
    private readonly types: ReadonlyArray<konst.BonusType>;
    private readonly value: number;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string, data: IBasicBonus) {
        super(vm, ref, index, group, source, data);
        const types = data.items;
        this.types = Array.isArray(types) ? types : [types];
        this.value = data.value;
    }

    public get effect() {
        const items = this.types;
        let str = this.types.map(type => this.getLabel(type)).join("・");
        if (RateBonus.check(items[0])) {
            return `${str} +${this.vm.$roundFloat(this.value)}%`;
        }
        return `${str} +${this.value}`;
    }

    public apply(status: Status) {
        if (this.data.apply) {
            const value = this.value;
            for (const type of this.types) {
                status.param[type] += value * this.data.stack;
            }
        }
    }
}

// 固定割合ボーナス
export class FlatBonus extends BonusBase {
    private readonly dest: konst.FlatBonusDest;
    private readonly base: konst.FlatBonusBase;
    private readonly value: number;
    private readonly scale: konst.DamageScale | "";
    private readonly bound: IFlatBonusBound | null;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string, data: IFlatBonus) {
        super(vm, ref, index, group, source, data);
        const dest = data.dest;
        this.dest = dest;
        this.base = data.base;
        this.value = data.value;
        this.scale = data.scale ?? "";
        this.bound = data.bound ?? null;
    }

    // TODO: 多言語対応
    public get effect() {
        let str: string;
        switch (this.dest) {
            case konst.FlatBonusDest.Combat:
            case konst.FlatBonusDest.CombatDmg:
                str = this.vm.$t("bonus.combat_dmg") as string;
                break;
            case konst.FlatBonusDest.Skill:
            case konst.FlatBonusDest.Burst:
                str = this.getLabel(TypeToBonus.combat(this.dest));
                break;
            default:
                str = this.getLabel(this.dest);
                break;
        }
        const value = this.vm.$roundFloat(this.value);
        switch (this.base) {
            case konst.FlatBonusBase.None:
                return `${str} +${value}%`;
            case konst.FlatBonusBase.Atk:
                return `${str} +${this.vm.$t("bonus.atk_base")}の${value}%分`;
            default:
                return `${str} +${this.getLabel(this.base)}の${value}%分`;
        }
    }

    public apply(status: Status) {
        if (this.data.apply) {
            let value = this.value;
            switch (this.base) {
                case konst.FlatBonusBase.None:
                    break;
                case konst.FlatBonusBase.Hp:
                    value = status.base.hp * value / 100;
                    break;
                case konst.FlatBonusBase.Atk:
                    value = status.base.atk * value / 100;
                    break;
                case konst.FlatBonusBase.Def:
                    value = status.base.def * value / 100;
                    break;
                default:
                    value = status.param[this.base] * value / 100;
                    break;
            }
            value *= this.data.stack;

            // ダメージ倍率適用
            if (this.scale) {
                const burst = status.talent.burst || 1; // TODO: 元素爆発固定
                value *= konst.DamageScaleTable[this.scale][burst - 1] / 100;
            }

            // 最大値チェック
            const bound = this.bound;
            if (bound) {
                switch (bound.base) {
                    // 直値
                    case konst.FlatBonusBase.None:
                        if (bound.value < value) {
                            value = bound.value;
                        }
                        break;
                    // 基礎攻撃力の倍率
                    case konst.FlatBonusBase.Atk:
                        const atk = status.base.atk * bound.value / 100;
                        if (atk < value) {
                            value = atk;
                        }
                        break;
                    // 最終値の倍率
                    default:
                        const limit = status.param[bound.base] * bound.value / 100;
                        if (limit < value) {
                            value = limit;
                        }
                        break;
                }
            }

            switch (this.dest) {
                case konst.FlatBonusDest.Combat:
                    status.flat[konst.CombatType.Normal] += value;
                    status.flat[konst.CombatType.Heavy] += value;
                    status.flat[konst.CombatType.Plunge] += value;
                    break;
                case konst.FlatBonusDest.Skill:
                case konst.FlatBonusDest.Burst:
                    status.flat[this.dest] += value;
                    break;
                case konst.FlatBonusDest.CombatDmg:
                    status.param[konst.CombatBonusType.Normal] += value;
                    status.param[konst.CombatBonusType.Heavy] += value;
                    status.param[konst.CombatBonusType.Plunge] += value;
                    break;
                default:
                    status.param[this.dest] += value;
                    break;
            }
        }
    }
}

// 耐性減衰ボーナス
export class ReductBonus extends BonusBase {
    private readonly types: Readonly<konst.ReductType[]>;
    private readonly value: number;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string, data: IReductBonus) {
        super(vm, ref, index, group, source, { ...data, target: konst.BonusTarget.Enemy });
        const types = data.type;
        this.types = Array.isArray(types) ? types : [types];
        this.value = data.value;
    }

    // TODO: 多言語対応
    public get effect() {
        const types = this.types.map(type => this.vm.$t("reduct." + type)).join("・");
        return `${types} -${this.vm.$roundRate(this.value)}`;
    }

    public apply(status: Status) {
        if (this.data.apply) {
            for (const type of this.types) {
                status.reduct[type] += this.value;
            }
        }
    }
}

// 元素付与ボーナス
export class EnchantBonus extends BonusBase {
    private readonly elem: konst.ElementType;
    private readonly dest: ReadonlyArray<konst.CombatType>;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string, data: IEnchantBonus) {
        super(vm, ref, index, group, source, data);
        this.elem = data.elem;
        this.dest = data.dest;
    }

    public get effect() {
        const dest = this.dest.map(dest => this.vm.$t("combat." + dest)).join("・");
        return `${dest}に${this.vm.$t("element." + this.elem)}元素付与`;
    }

    public apply(status: Status) {
        if (this.data.apply) {
            if (status.enchant) {
                if (this.target === konst.BonusTarget.Self) {
                    status.setEnchant(this.elem, this.dest);
                } else {
                    switch (status.enchant.type) {
                        case konst.ElementType.Elect:
                            status.setEnchant(this.elem, this.dest);
                            break;
                        case konst.ElementType.Cryo:
                            if (this.elem === konst.ElementType.Pyro) {
                                status.setEnchant(this.elem, this.dest);
                            }
                            break;
                    }
                }
            } else {
                status.setEnchant(this.elem, this.dest);
            }
        }
    }
}

export interface IBonusData {
    index: number;
    apply: boolean;
    stack: number;
}
export type GlobalBonusData = { bonus: IDict<IBonusData>; };

type InputData =
    GlobalEquipData &
    GlobalCharaData &
    GlobalWeaponData &
    GlobalArtifactData &
    GlobalBonusData;

export class BonusBuilder {
    private vm: Vue;
    public team: string;
    public equip: string;
    public group: string;
    private bonus: IDict<IBonusData>;
    public output: IDict<IBonusData>;

    constructor(vm: Vue, bonus: IDict<IBonusData>) {
        this.vm = vm;
        this.team = "";
        this.equip = "";
        this.group = "";
        this.bonus = bonus;
        this.output = {};
    }

    private convert(data: AnyExtraBonus, ref: string, index: number, origin: string, source: string): BonusBase {
        let group: string;
        if (data.target && data.target !== konst.BonusTarget.Self) {
            group = "general.everyone";
            index += 1000;
        } else {
            group = this.group;
            source = "origin." + origin;
        }

        let bonus: BonusBase;
        switch (data.extra) {
            case konst.ExtraBonusType.Flat:
                bonus = new FlatBonus(this.vm, ref, index, group, source, data);
                break;
            case konst.ExtraBonusType.Reduct:
                bonus = new ReductBonus(this.vm, ref, index, group, source, data);
                break;
            case konst.ExtraBonusType.Enchant:
                bonus = new EnchantBonus(this.vm, ref, index, group, source, data);
                break;
            default:
                bonus = new BasicBonus(this.vm, ref, index, group, source, data);
                break;
        }

        const key = `${this.team}.${this.equip}.${index}`;
        if (key in this.bonus) {
            bonus.reset(this.bonus[key]);
        }
        this.output[key] = bonus.data;
        return bonus;
    }

    private append(data: ReadonlyArrayable<AnyExtraBonus>, ref: string, index: number, origin: string, source: string): BonusBase[] {
        if (Array.isArray(data)) {
            return data.map((value, i) => this.convert(value, ref, index + i, origin, source));
        }
        return [this.convert(data, ref, index, origin, source)];
    }

    public charaBonus(data: ICharaData): BonusBase[] {
        const source = "chara." + data.name;
        const chara = CharaList[data.name];
        const level = parseInt(data.level.replace("+", "") || "1");
        let bonus: BonusBase[] = [];
        for (const [idx, origin] of Passives.entries()) {
            const passive = chara.passive[origin];
            if (passive) {
                switch (origin) {
                    case Passives[2]:
                        if ((21 <= level) || (data.level === "20+")) {
                bonus.push(...this.append(passive, data.id, 100 + (idx * 10), origin, source));
            }
                        break;
                    case Passives[3]:
                        if ((61 <= level) || (data.level === "60+")) {
                            bonus.push(...this.append(passive, data.id, 100 + (idx * 10), origin, source));
                        }
                        break;
                    default:
                        bonus.push(...this.append(passive, data.id, 100 + (idx * 10), origin, source));
                }
            }
        }
        for (const [idx, origin] of Constes.entries()) {
            const conste = chara.conste[origin];
            const count = parseInt(origin.replace("lv", ""));
            if (conste) {
                if (data.conste <= count) {
                bonus.push(...this.append(conste, data.id, 150 + idx * 10, origin, source));
                }
            }
        }
        return bonus;
    }

    public weaponBonus(type: konst.WeaponType, data: IWeaponData | undefined): BonusBase[] {
        if (data) {
            const source = `weapon.${type}.${data.name}`;
            const weapon = WeaponList[type][data.name];
            const bonus = weapon.passive;
            if (bonus) {
                if (Array.isArray(bonus)) {
                    return bonus.map((value, i) => this.convert(
                        { ...value, value: value.value[data.rank - 1] }, data.id, 200 + i, "weapon", source));
                } else {
                    return [this.convert(
                        { ...bonus, value: bonus.value[data.rank - 1] }, data.id, 200, "weapon", source)];
                }
            }
        }
        return [];
    }

    public artifactBonus(names: ArtifactName[]): BonusBase[] {
        let bonus: BonusBase[] = [];
        let first = 0;
        while (first < names.length) {
            let name = names[first];
            let last = names.lastIndexOf(name) + 1;
            if (name in ArtifactSet) {
                let same = last - first;
                const source = "artifact.name." + name;
                const artifact = ArtifactSet[name];
                // 2セットの効果追加
                if (2 <= same) {
                    if (artifact.set2) {
                        bonus.push(...this.append(artifact.set2, name, 300, "artifact", source));
                    }
                }
                // 4セットの効果追加
                if (4 <= same) {
                    if (artifact.set4) {
                        bonus.push(...this.append(artifact.set4, name, 310, "artifact", source));
                    }
                }
            }
            first = last;
        }
        return bonus;
    }

    public resonanceBonus(elems: konst.ElementType[]): BonusBase[] {
        let bonus: BonusBase[] = [];
        for (const [idx, elem] of elems.entries()) {
            const base = TeamBonus[elem];
            if (base) {
                const data = { ...base, target: konst.BonusTarget.All };
                bonus.push(...this.append(data, "", 400 + idx, "resonance", "general.resonance"));
            }
        }
        return bonus;
    }

    public build(team: ITeamData, input: InputData) {
        let data: BonusBase[] = [];
        this.team = team.id;
        for (const key of Members) {
            const { info, chara, equip } = getMember(team[key], input);
            if (info && chara && equip) {
                this.equip = equip.id;
                this.group = "chara." + chara.name;

                // キャラボーナス追加
                data.push(...this.charaBonus(chara));
                // 武器ボーナス追加
                const weapon = getWeapon(info, equip, input);
                data.push(...this.weaponBonus(weapon.type, weapon.data));
                // 聖遺物ボーナス追加
                const artifacts = getArtifacts(equip, input).map((val) => val.name);
                data.push(...this.artifactBonus(artifacts));
            }
        }
        // 超電導を追加 TODO: 多言語対応
        {
            const bonus = {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Phys,
                value: 40,
                limit: "超電導が発生した時",
                times: 12,
                target: konst.BonusTarget.All
            };
            data.push(...this.append(bonus, "", 250, "conduct", "reaction.conduct"));
        }
        // 元素共鳴ボーナス追加
        data.push(...this.resonanceBonus(team.resonance));
        data.sort(
            (a, b) =>
                a.group.localeCompare(b.group) ||
                a.index - b.index ||
                a.source.localeCompare(b.source)
        );
        return data;
    }
}
