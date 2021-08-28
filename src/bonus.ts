import {
    IBasicBonus, IFlatBonus, IFlatBonusBound, IEnchantBonus, IReductBonus,
    AnyExtraBonus, Constes, Passives, IBonusOption
} from "./interface";
import * as konst from "./const";
import { CharaList, ICharaData } from "./character";
import { WeaponList, IWeaponData } from "./weapon";
import { ArtifactName, ArtifactSet } from "./artifact";

export const RateBonus: ReadonlyArray<string> = [
    konst.StatusBonusType.HpBuf,
    konst.StatusBonusType.AtkBuf,
    konst.StatusBonusType.DefBuf,
    konst.StatusBonusType.EnRec,
    konst.StatusBonusType.HealBuf,
    konst.CriticalBonusType.Damage,
    konst.CriticalBonusType.Rate,
    konst.CriticalBonusType.Heavy,
    konst.CriticalBonusType.Skill,
    konst.ElementBonusType.Pyro,
    konst.ElementBonusType.Hydro,
    konst.ElementBonusType.Dendro,
    konst.ElementBonusType.Elect,
    konst.ElementBonusType.Anemo,
    konst.ElementBonusType.Cryo,
    konst.ElementBonusType.Geo,
    konst.ElementBonusType.Phys,
    konst.AnyBonusType.Damage,
    konst.AnyBonusType.Element,
    konst.CombatBonusType.Normal,
    konst.CombatBonusType.Heavy,
    konst.CombatBonusType.Plunge,
    konst.CombatBonusType.Combat,
    konst.CombatBonusType.Skill,
    konst.CombatBonusType.Burst,
] as const;

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

export function isRateBonus(type: konst.AnyBonusType) {
    return RateBonus.includes(type);
}

export function getSuffix(type: konst.AnyBonusType) {
    return RateBonus.includes(type) ? "%" : "";
}

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
        this.data = { index: index, apply: false, stack: 0 };
    }

    public get effect(): string {
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

    public getLabel(type: konst.AnyBonusType) {
        return String(this.vm.$t("bonus." + type)).replace("(%)", "");
    }

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

    // public apply(status: Status, stack = 1): AnyBonusValue[] {
    //     return [];
    // }
    //
    // public applicable(status: Status): boolean {
    //     if (this.valid) {
    //         switch (this.target) {
    //             case BonusTarget.Next:
    //             case BonusTarget.Other:
    //                 return this.source !== status.chara.index;
    //             case BonusTarget.Melee:
    //                 switch (status.chara.weapon) {
    //                     case WeaponType.Sword:
    //                     case WeaponType.Claymore:
    //                     case WeaponType.Polearm:
    //                         return true;
    //                 }
    //                 return false;
    //             case BonusTarget.Enemy:
    //                 return false;
    //         }
    //         return true;
    //     }
    //     return false;
    // }
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
        if (isRateBonus(items[0])) {
            return `${str} +${this.vm.$roundFloat(this.value)}%`;
        }
        return `${str} +${this.value}`;
    }

    // public apply(_: Status, stack = 1): AnyBonusValue[] {
    //     let values: AnyBonusValue[] = [];
    //     const value = this.value;
    //     for (const type of this.types) {
    //         values.push({ type: type, value: value * stack });
    //     }
    //     return values;
    // }
}

// 固定割合ボーナス
export class FlatBonus extends BonusBase {
    private readonly dest: konst.FlatBonusDest;
    private readonly base: konst.FlatBonusBase;
    private readonly value: number;
    private readonly bound: IFlatBonusBound | null;

    constructor(vm: Vue, ref: string, index: number, group: string, source: string, data: IFlatBonus) {
        super(vm, ref, index, group, source, data);
        const dest = data.dest;
        this.dest = dest;
        this.base = data.base;
        this.value = data.value;
        this.bound = data.bound ?? null;
        // if (data.scale) {
        //     this.value *= DAMAGE_SCALE[data.scale][status.talent.burst - 1] / 100; // TODO: 元素爆発固定
        // }
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

    // public apply(status: Status, stack = 1): AnyBonusValue[] {
    //     let value = this.value;
    //     switch (this.base) {
    //         case FlatBonusBase.None:
    //             break;
    //         case FlatBonusBase.Hp:
    //             value = status.hp * value / 100;
    //             break;
    //         case FlatBonusBase.Atk:
    //             value = status.base.atk * value / 100;
    //             break;
    //         case FlatBonusBase.Def:
    //             value = status.defence * value / 100;
    //             break;
    //         default:
    //             value = status.param[this.base] * value / 100; // TODO: 会心基礎値5%が乗らない
    //             break;
    //     }
    //     value *= stack;

    //     // 最大値チェック
    //     if (this.max) {
    //         const max = this.max;
    //         switch (max.base) {
    //             // 直値
    //             case FlatBonusBase.None:
    //                 if (max.value < value) {
    //                     value = max.value;
    //                 }
    //                 break;
    //             // 基礎攻撃力の倍率
    //             case FlatBonusBase.Atk:
    //                 const atk = status.base.atk * max.value / 100;
    //                 if (atk < value) {
    //                     value = atk;
    //                 }
    //                 break;
    //         }
    //     }

    //     switch (this.dest) {
    //         case FlatBonusDest.Combat:
    //             return [
    //                 { extra: ExtraBonusType.Flat, type: CombatType.Normal, value: value },
    //                 { extra: ExtraBonusType.Flat, type: CombatType.Heavy, value: value },
    //                 { extra: ExtraBonusType.Flat, type: CombatType.Plunge, value: value },
    //             ];
    //         case FlatBonusDest.Skill:
    //         case FlatBonusDest.Burst:
    //             return [{ extra: ExtraBonusType.Flat, type: this.dest, value: value },];
    //         case FlatBonusDest.CombatDmg:
    //             return [
    //                 { type: CombatBonusType.Normal, value: value },
    //                 { type: CombatBonusType.Heavy, value: value },
    //                 { type: CombatBonusType.Plunge, value: value },
    //             ];
    //         default:
    //             return [{ type: this.dest, value: value }];
    //     }
    // }
}

// 耐性減衰ボーナス
export class ReductBonus extends BonusBase {
    private readonly types: Readonly<konst.ReductBonusType[]>;
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

    // public applyEnemy(enemy: Enemy, row: HTMLRowElement) {
    //     let input = row.querySelector("td#check input[type='checkbox']") as HTMLInputElement;
    //     if (input?.checked) {
    //         for (const type of this.types) {
    //             if (type !== ReductBonusType.Contact) {
    //                 enemy.reduct[type] += this.value;
    //             }
    //         }
    //     }
    // }
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

    // public apply(_: Status, __?: number): AnyBonusValue[] {
    //     return [{ extra: ExtraBonusType.Enchant, type: this.elem, dest: this.dest, self: this.target === BonusTarget.Self }];
    // }
}

export interface IBonusData {
    index: number;
    apply: boolean;
    stack: number;
}
export type GlobalBonusData = { bonus: IDict<IBonusData>; };

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
        this.bonus = { ...bonus }; // 新しいインスタンスを生成
        this.output = { };
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
            bonus.data = this.bonus[key];
        }
        if (key in this.output) {
            console.warn("duplicate property", key);
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
        let bonus: BonusBase[] = [];
        for (const [idx, origin] of Passives.entries()) {
            const passive = chara.passive[origin];
            if (passive) {
                bonus.push(...this.append(passive, data.id, 100 + (idx * 10), origin, source));
            }
        }
        for (const [idx, origin] of Constes.entries()) {
            const conste = chara.conste[origin];
            if (conste) {
                bonus.push(...this.append(conste, data.id, 150 + idx * 10, origin, source));
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
                        { ...value, value: value.value[data.rank] }, data.id, 200 + i, "weapon", source));
                } else {
                    return [this.convert(
                        { ...bonus, value: bonus.value[data.rank] }, data.id, 200, "weapon", source)];
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
}
