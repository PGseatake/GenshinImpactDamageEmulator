import {
    IBasicBonus, IFlatBonus, IFlatBonusBound, IEnchantBonus, IReductBonus,
    AnyExtraBonus, Constes, Passives
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
    public vm: Vue;
    public ref: string; // キャラID
    public index: string;
    public group: string; // table-dataのグループ
    // public origin: string; // ボーナス出自+添え字
    public extra: konst.ExtraBonusType | undefined;
    public limit: string;
    public times: number;
    public stack: number;
    public source: string;
    public target: konst.BonusTarget;

    // constructor(ref: string, index: string, group: string, origin: string, source: string, extra?: ExtraBonusType) {
    constructor(vm: Vue, ref: string, index: string, group: string, source: string, extra?: konst.ExtraBonusType) {
        this.vm = vm;
        this.ref = ref;
        this.index = index;
        this.group = group;
        // this.origin = origin;
        this.extra = extra;
        this.limit = "";
        this.times = 0;
        this.stack = 0;
        this.source = source;
        this.target = konst.BonusTarget.Self;
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
    private data: IBasicBonus;
    private types: ReadonlyArray<konst.BonusType>;
    private value: number;

    // constructor(data: IBasicBonus, ref: string, group: string, origin: string, source: string) {
    //     super(ref, group, origin, source);
    constructor(vm: Vue, data: IBasicBonus, ref: string, index: string, group: string, source: string) {
        super(vm, ref, index, group, source);
        this.data = data;
        const types = data.items;
        this.types = Array.isArray(types) ? types : [types];
        this.value = data.value;
        this.limit = data.limit ?? "";
        this.times = data.times ?? 0;
        this.stack = data.stack ?? 0;
        this.target = data.target ?? konst.BonusTarget.Self;
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
    private data: IFlatBonus;
    private dest: konst.FlatBonusDest;
    private base: konst.FlatBonusBase;
    private value: number;
    private bound: IFlatBonusBound | null;

    // constructor(data: IFlatBonus, ref: string, group: string, origin: string, source: string) {//, status: Status) {
    //     super(ref, group, origin, source, ExtraBonusType.Flat);
    constructor(vm: Vue, data: IFlatBonus, ref: string, index: string, group: string, source: string) {//, status: Status) {
        super(vm, ref, index, group, source, konst.ExtraBonusType.Flat);
        this.data = data;
        const dest = data.dest;
        this.dest = dest;
        this.base = data.base;
        this.value = data.value;
        // if (data.scale) {
        //     this.value *= DAMAGE_SCALE[data.scale][status.talent.burst - 1] / 100; // TODO: 元素爆発固定
        // }
        this.bound = data.bound ?? null;
        this.limit = data.limit ?? "";
        this.times = data.times ?? 0;
        this.stack = data.stack ?? 0;
        this.target = data.target ?? konst.BonusTarget.Self;
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
    private types: Readonly<konst.ReductBonusType[]>;
    private value: number;

    // constructor(data: IReductBonus, ref: string, group: string, origin: string, source: string) {
    //     super(ref, group, origin, source, ExtraBonusType.Reduct);
    constructor(vm: Vue, data: IReductBonus, ref: string, index: string, group: string, source: string) {
        super(vm, ref, index, group, source, konst.ExtraBonusType.Reduct);
        const types = data.type;
        this.types = Array.isArray(types) ? types : [types];
        this.value = data.value;
        this.limit = data.limit ?? "";
        this.times = data.times ?? 0;
        this.target = konst.BonusTarget.Enemy;
    }

    // TODO: 多言語対応
    public get effect() {
        const types = this.types.map(type => this.vm.$t("reduct." + type)).join("・");
        return `敵の${types} -${this.vm.$roundRate(this.value)}`;
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
    public readonly elem: konst.ElementType;
    private dest: ReadonlyArray<konst.CombatType>;

    // constructor(data: IEnchantBonus, ref: string, group: string, origin: string, source: string) {
    //     super(ref, group, origin, source, ExtraBonusType.Enchant);
    constructor(vm: Vue, data: IEnchantBonus, ref: string, index: string, group: string, source: string) {
        super(vm, ref, index, group, source, konst.ExtraBonusType.Enchant);
        this.elem = data.elem;
        this.dest = data.dest;
        this.limit = data.limit;
        this.times = data.times ?? 0;
        this.target = data.target ?? konst.BonusTarget.Self;
    }

    public get effect() {
        const dest = this.dest.map(dest => this.vm.$t("combat." + dest)).join("・");
        return `${dest}に${this.vm.$t("element." + this.elem)}元素付与`;
    }

    // public apply(_: Status, __?: number): AnyBonusValue[] {
    //     return [{ extra: ExtraBonusType.Enchant, type: this.elem, dest: this.dest, self: this.target === BonusTarget.Self }];
    // }
}

type Bonus = AnyExtraBonus;
// function convert(vm: Vue, bonus: Bonus, ref: string, group: string, origin: string, index: string, source: string): BonusBase {
//     if (bonus.target && bonus.target !== BonusTarget.Self) {
//         group = vm.$t("general.everyone") as string;
//     } else {
//         source = "origin." + origin;
//     }
//     if (index) {
//         origin = `${origin}.${index}`;
//     }
//     switch (bonus.extra) {
//         case ExtraBonusType.Flat:
//             return new FlatBonus(bonus, ref, group, origin, source);
//         case ExtraBonusType.Reduct:
//             return new ReductBonus(bonus, ref, group, origin, source);
//         case ExtraBonusType.Enchant:
//             return new EnchantBonus(bonus, ref, group, origin, source);
//         default:
//             return new BasicBonus(bonus, ref, group, origin, source);
//     }
// }
function convert(vm: Vue, bonus: Bonus, ref: string, index: number, group: string, origin: string, source: string): BonusBase {
    if (bonus.target && bonus.target !== konst.BonusTarget.Self) {
        index = 1000 + (Math.floor(index / 100) * 100);
        group = vm.$t("general.everyone") as string;
    } else {
        source = "origin." + origin;
    }
    const stridx = index.toString();
    switch (bonus.extra) {
        case konst.ExtraBonusType.Flat:
            return new FlatBonus(vm, bonus, ref, stridx, group, source);
        case konst.ExtraBonusType.Reduct:
            return new ReductBonus(vm, bonus, ref, stridx, group, source);
        case konst.ExtraBonusType.Enchant:
            return new EnchantBonus(vm, bonus, ref, stridx, group, source);
        default:
            return new BasicBonus(vm, bonus, ref, stridx, group, source);
    }
}

type ArrayableBonus = ReadonlyArrayable<AnyExtraBonus>;
// function append(vm: Vue, bonus: ArrayableBonus, ref: string, group: string, origin: string, source: string): BonusBase[] {
//     if (Array.isArray(bonus)) {
//         return bonus.map((value, i) => convert(vm, value, ref, group, origin, i + 1, source));
//     }
//     return [convert(vm, bonus, ref, group, origin, 0, source)];
// }
function append(vm: Vue, bonus: ArrayableBonus, ref: string, index: number, group: string, origin: string, source: string): BonusBase[] {
    if (Array.isArray(bonus)) {
        return bonus.map((value, i) => convert(vm, value, ref, index, group, origin, source));
    }
    return [convert(vm, bonus, ref, index, group, origin, source)];
}

export function getCharaBonus(vm: Vue, data: ICharaData, group: string): BonusBase[] {
    const source = "chara." + data.name;
    const chara = CharaList[data.name];
    let bonuses: BonusBase[] = [];
    for (const [index, origin] of Passives.entries()) {
        const passive = chara.passive[origin];
        if (passive) {
            bonuses.push(...append(vm, passive, data.id, 100 + (index * 10), group, origin, source));
        }
    }
    for (const [index, origin] of Constes.entries()) {
        const conste = chara.conste[origin];
        if (conste) {
            bonuses.push(...append(vm, conste, data.id, 150 + index * 10, group, origin, source));
        }
    }
    return bonuses;
}

export function getWeaponBonus(vm: Vue, type: konst.WeaponType, data: IWeaponData, group: string): BonusBase[] {
    const source = `weapon.${type}.${data.name}`;
    const weapon = WeaponList[type][data.name];
    const bonus = weapon.passive;
    if (bonus) {
        if (Array.isArray(bonus)) {
            return bonus.map((value, i) => convert(
                vm, { ...value, value: value.value[data.rank] }, data.id, 200 + i, group, "weapon", source));
        } else {
            return [convert(
                vm, { ...bonus, value: bonus.value[data.rank] }, data.id, 200, group, "weapon", source)];
        }
    }
    return [];
}

export function getArtifactBonus(vm: Vue, names: ArtifactName[], group: string): BonusBase[] {
    let bonuses: BonusBase[] = [];
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
                    bonuses.push(...append(vm, artifact.set2, name, 300, group, "artifact", source));
                }
            }
            // 4セットの効果追加
            if (4 <= same) {
                if (artifact.set4) {
                    bonuses.push(...append(vm, artifact.set4, name, 310, group, "artifact", source));
                }
            }
        }
        first = last;
    }
    return bonuses;
}
