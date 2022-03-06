import * as konst from "~/src/const";
import { parseLevel } from "~/src/ascension";
import {
    ICharaInfo, IStatus, StatusTalent, StatusBase, StatusParam,
    StatusFlat, StatusEnchant, StatusReduct, StatusCritical
} from "~/src/interface";
import { ICharaData } from "~/src/character";
import { DBWeaponTable } from "~/src/weapon";
import { DBArtifactTable, SubBonus } from "~/src/artifact";
import { Member, IMember, IAnyMember } from "~/src/team";
import Reaction from "~/src/reaction";

const StatusBonusTypes = Object.values(konst.StatusBonusType);
const ElementBonusTypes = [...Object.values(konst.ElementBonusType), konst.BonusType.Element];
const ReactionBonusTypes = Object.values(konst.ReactionBonusType);
const StatusGroup = (type: any) => {
    if (StatusBonusTypes.includes(type)) return 0;
    if (ElementBonusTypes.includes(type)) return 1;
    if (ReactionBonusTypes.includes(type)) return 3;
    return 2;
};

export type StatusPart = {
    type: konst.BonusType;
    total: number;
    base: number;
    group: number;
};

export default class Status {
    public static empty(): IStatus {
        return {
            info: null,
            talent: { combat: 0, skill: 0, burst: 0 },
            base: { hp: 0, atk: 0, def: 0 },
            param: {
                hp: 0,
                hp_buf: 0,
                atk: 0,
                atk_buf: 0,
                def: 0,
                def_buf: 0,
                elem: 0,
                en_rec: 0,
                heal_buf: 0,
                cri_dmg: 0,
                cri_rate: 0,
                any_dmg: 0,
                normal_cri: 0,
                heavy_cri: 0,
                skill_cri: 0,
                combat_dmg: 0,
                normal_dmg: 0,
                heavy_dmg: 0,
                plunge_dmg: 0,
                skill_dmg: 0,
                burst_dmg: 0,
                phys_dmg: 0,
                pyro_dmg: 0,
                hydro_dmg: 0,
                dendro_dmg: 0,
                elect_dmg: 0,
                anemo_dmg: 0,
                cryo_dmg: 0,
                geo_dmg: 0,
                elem_dmg: 0,
                burning_dmg: 0,
                vaporize_dmg: 0,
                melt_dmg: 0,
                swirl_dmg: 0,
                echarge_dmg: 0,
                shutter_dmg: 0,
                conduct_dmg: 0,
                overload_dmg: 0,
            },
            flat: {
                normal: 0,
                heavy: 0,
                plunge: 0,
                skill: 0,
                burst: 0,
            },
            reduct: {
                pyro: 0,
                hydro: 0,
                dendro: 0,
                elect: 0,
                anemo: 0,
                cryo: 0,
                geo: 0,
                phys: 0,
                defence: 0,
            },
            enchant: {
                type: "",
                dest: [],
                self: false,
            },
        };
    }

    public static part(type: konst.BonusType, param: Readonly<StatusParam>, base: Readonly<StatusBase>): StatusPart {
        const group = StatusGroup(type);
        let total = param[type];
        if (StatusBase.check(type)) {
            const x = param[konst.TypeToBonus.buffer(type)];
            const b = base[type];
            total += b + (b * x) / 100;
            return { type, total, base: b, group };
        }
        return { type, total, base: StatusBase.value(type), group };
    }

    public info: ICharaInfo | null;
    public chara: ICharaData | null;
    public talent: StatusTalent;
    public base: StatusBase;
    public param: StatusParam;
    public flat: StatusFlat;
    public reduct: StatusReduct;
    public enchant: StatusEnchant;

    constructor(data: IStatus) {
        this.info = null;
        this.chara = null;
        this.talent = data.talent;
        this.base = data.base;
        this.param = data.param;
        this.flat = data.flat;
        this.reduct = data.reduct;
        this.enchant = data.enchant;
    }

    equip(member: IAnyMember, db: DBWeaponTable & DBArtifactTable) {
        const { info, chara } = member;
        this.info = info;
        this.chara = chara;

        for (const type of konst.BonusTypes) {
            this.param[type] = StatusBase.value(type);
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

        if (chara) {
            for (const type of konst.TalentTypes) {
                this.talent[type] = chara[type];
            }
            this.base.hp = chara.hp;
            this.base.atk = chara.atk;
            this.base.def = chara.def;

            // キャラクタ
            this.apply(chara.special);
            // 武器
            const m = new Member(member as IMember);
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
            for (const type of konst.TalentTypes) {
                this.talent[type] = 0;
            }
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

    get level() {
        return parseLevel(this.chara?.level).level;
    }

    // 最終値取得
    total(type: konst.StatusType) {
        const x = this.param[konst.TypeToBonus.buffer(type)];
        const b = this.base[type];
        return b + (x * b) / 100 + this.param[type];
    }

    // 元素付与ボーナス適用
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

    // 付与元素取得
    elchant(type: konst.CombatType) {
        if (this.enchant.type && this.enchant.dest.includes(type)) {
            return this.enchant.type;
        }
        return konst.ElementType.Phys;
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
            const scales = Reaction.Scale[act];
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
    critical(base: StatusCritical, type: konst.CombatType): StatusCritical {
        base.damage += this.param.cri_dmg;
        base.rate += this.param.cri_rate;
        switch (type) {
            case konst.CombatType.Normal:
                base.rate += this.param.normal_cri;
                break;
            case konst.CombatType.Heavy:
                base.rate += this.param.heavy_cri;
                break;
            case konst.CombatType.Skill:
                base.rate += this.param.skill_cri;
                break;
        }
        return base;
    }
}
