import * as konst from "~/src/const";
import { ICharaInfo } from "~/src/interface";
import { ICharaData } from "~/src/character";
import { DBWeaponTable } from "~/src/weapon";
import { SubBonus, DBArtifactTable } from "~/src/artifact";
import { IMember, Member } from "~/src/team";

const ReactionScaleTable: ReadonlyPartial<Record<konst.ElementType, ReadonlyPartial<Record<konst.ReactionType, number>>>> = {
    pyro: {
        "vaporize": 1.5,
        "overload": 1.0,
        "melt": 2.0,
    },
    hydro: {
        "vaporize": 2.0,
        "echarge": 1.0,
    },
    elect: {
        "overload": 1.0,
        "echarge": 1.0,
        "conduct": 1.0,
    },
    cryo: {
        "melt": 1.5,
        "conduct": 1.0,
    },
    anemo: {
        "swirl": 1.0,
    }
} as const;

export function enumerateReaction(chara: ICharaInfo | null, enchant: konst.EnchantType) {
    let types: konst.ReactionType[] = [];
    if (chara) {
        let elems = [chara.element];
        if (enchant && (enchant !== chara.element)) {
            elems.push(enchant);
        }

        for (const elem of elems) {
            const scales = ReactionScaleTable[elem];
            if (scales) {
                // 元素反応を追加
                for (const type in scales) {
                    types.push(type as konst.ReactionType);
                }
            }

            // 氷砕きを追加
            if (elem === konst.ElementType.Geo) {
                types.push(konst.ReactionType.Shutter);
            } else if (chara.weapon === konst.WeaponType.Claymore) {
                types.push(konst.ReactionType.Shutter);
            }
        }
    }
    return types;
}

export type StatusTalent = Record<konst.TalentType, number>;
export type StatusBase = Record<konst.StatusType, number>;
export type StatusParam = Record<konst.BonusType, number>;
export type StatusFlat = Record<konst.CombatType, number>;
export type StatusReduct = Record<konst.ReductType, number>;
export type StatusEnchant = {
    type: konst.EnchantType;
    dest: konst.CombatType[];
    self: boolean;
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
    public info: ICharaInfo | null;
    public chara: ICharaData | null;
    public talent: StatusTalent;
    public base: StatusBase;
    public param: StatusParam;
    public flat: StatusFlat;
    public reduct: StatusReduct;
    public enchant: StatusEnchant;
    public contact: konst.NoneContactType;

    constructor(data: IStatus, contact: konst.NoneContactType) {
        this.info = null;
        this.chara = null;
        this.talent = data.talent;
        this.base = data.base;
        this.param = data.param;
        this.flat = data.flat;
        this.reduct = data.reduct;
        this.enchant = data.enchant;
        this.contact = contact;
    }

    equip({ info, chara, equip }: IMember, db: DBWeaponTable & DBArtifactTable) {
        for (const type of konst.BonusTypes) {
            this.param[type] = 0;
        }
        for (const type of konst.CombatTypes) {
            this.flat[type] = 0;
        }
        for (const type of konst.ReductTypes) {
            this.reduct[type] = 0;
        }
        this.enchant.type = "";
        this.enchant.dest.splice(0);
        this.enchant.self = false;

        // 基礎値
        this.param[konst.StatusBonusType.EnRec] = 100;
        this.param[konst.CriticalBonusType.Damage] = 50;
        this.param[konst.CriticalBonusType.Rate] = 5;

        if (info && chara && equip) {
            this.info = info;
            this.chara = chara;
            this.talent.combat = chara.combat;
            this.talent.skill = chara.skill;
            this.talent.burst = chara.burst;
            this.base.hp = chara.hp;
            this.base.atk = chara.atk;
            this.base.def = chara.def;

            // キャラクタ
            this.apply(chara.special);
            // 武器
            const m = new Member({ info, chara, equip });
            const { data } = m.weapon(db);
            if (data) {
                this.base.atk += data.atk;
                this.apply(data.second);
            }
            // 聖遺物
            const list = m.artifact(db);
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

    get level() {
        return parseInt(this.chara?.level?.replace("+", "") || "1");
    }

    get hp() {
        const a = this.param.hp;
        const x = this.param.hp_buf;
        const b = this.base.hp;
        return a + b + (x * b) / 100;
    }

    get atk() {
        const a = this.param.atk;
        const x = this.param.atk_buf;
        const b = this.base.atk;
        return a + b + (x * b) / 100;
    }

    get def() {
        const a = this.param.def;
        const x = this.param.def_buf;
        const b = this.base.def;
        return a + b + (x * b) / 100;
    }

    private apply({ type, value }: { type: konst.AnyBonusType, value: number; }) {
        if (type !== konst.BonusType.None) {
            this.param[type] += value;
        }
    }

    renchant(type: konst.EnchantType, dest: ReadonlyArray<konst.CombatType>, self: boolean) {
        if (!self && this.enchant.type) {
            switch (this.enchant.type) {
                case konst.ElementType.Elect:
                    if (type === konst.ElementType.Elect) {
                        return;
                    }
                    // 雷->氷・炎
                    break;
                case konst.ElementType.Cryo:
                    if (type !== konst.ElementType.Pyro) {
                        return;
                    }
                    // 氷->炎
                    break;
                default:
                    return;
            }
        }

        this.enchant.type = type;
        this.enchant.dest.splice(0);
        this.enchant.dest.push(...dest);
        this.enchant.self = self;
    }

    // 攻撃ダメージ値（％）
    combatBonus(type: konst.CombatType) {
        return this.param[konst.TypeToBonus.combat(type)];
    }

    // 元素ダメージ値（％）
    elementBonus(type: konst.ElementType) {
        let rate = this.param[konst.TypeToBonus.element(type)];
        if (type !== konst.ElementType.Phys) {
            rate += this.param.elem_dmg;
        }
        return rate;
    }

    // 元素熟知ダメージ値（％）
    elementMaster(type: konst.ReactionType) {
        switch (type) {
            case konst.ReactionType.Melt:
            case konst.ReactionType.Vaporize:
                return 100 * this.param.elem / (1400 + this.param.elem) * 25 / 9;
        }
        return 100 * this.param.elem / (2000 + this.param.elem) * 16;
    }

    // 元素反応ダメージ値（％）
    reactionBonus(type: konst.ReactionType) {
        return this.param[konst.TypeToBonus.reaction(type)];
    }

    // 元素反応のダメージ倍率
    reactionScale(type: konst.ReactionType, act: konst.ElementType) {
        if (type === konst.ReactionType.Shutter) {
            switch (act) {
                case konst.ElementType.Phys:
                case konst.ElementType.Geo:
                    return 1.0;
            }
        } else {
            const scales = ReactionScaleTable[act];
            if (scales) {
                const value = scales[type];
                if (value) {
                    return value;
                }
            }
        }
        return 0.0;
    }

    // 会心値（％）
    critical(type: konst.CombatType = konst.CombatType.Normal): {
        rate: number;
        damage: number;
    } {
        let rate = this.param.cri_rate;
        switch (type) {
            case konst.CombatType.Normal:
                rate += this.param.normal_cri;
                break;
            case konst.CombatType.Heavy:
                rate += this.param.heavy_cri;
                break;
            case konst.CombatType.Skill:
                rate += this.param.skill_cri;
                break;
        }
        return { rate, damage: this.param.cri_dmg };
    }
}
