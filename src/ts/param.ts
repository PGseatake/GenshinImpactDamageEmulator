// TODO: 多言語対応
const LABEL_TEXT: Readonly<IMap<string>> = {
    invalid: "無効",
    weapon: "武器",
    artifact: "聖遺物",
    combat: "通常攻撃・重撃",
    skill: "元素スキル",
    burst: "元素爆発",
    atk: "攻撃力",
    def: "防御力",
    rank: "錬成",
    resonance: "元素共鳴",
    second: "秒",
} as const;

interface IBonusLabel {
    table: Nullable<string>;
    select: string;
    detail: string;
    suffix: string;
}

// TODO: 多言語対応
const BONUS_LABEL: DeepReadonly<Record<AnyBonusType, IBonusLabel>> = {
    other: {
        table: null,
        select: "その他",
        detail: "",
        suffix: ""
    },
    hp: {
        table: "上限HP",
        select: "HP",
        detail: "HP",
        suffix: ""
    },
    hp_buf: {
        table: null,
        select: "HP(%)",
        detail: "HP",
        suffix: "%"
    },
    atk: {
        table: "攻撃力",
        select: "攻撃力",
        detail: "攻撃力",
        suffix: ""
    },
    atk_buf: {
        table: null,
        select: "攻撃力(%)",
        detail: "攻撃力",
        suffix: "%"
    },
    // atk_base: {
    //     table: null,
    //     select: "",
    //     detail: "基礎攻撃力",
    //     suffix: "%"
    // },
    def: {
        table: "防御力",
        select: "防御力",
        detail: "防御力",
        suffix: ""
    },
    def_buf: {
        table: null,
        select: "防御力(%)",
        detail: "防御力",
        suffix: "%"
    },
    elem: {
        table: "元素熟知",
        select: "元素熟知",
        detail: "元素熟知",
        suffix: ""
    },
    en_rec: {
        table: "元素ﾁｬｰｼﾞ効率",
        select: "元素ﾁｬｰｼﾞ率",
        detail: "元素チャージ効率",
        suffix: "%"
    },
    cri_rate: {
        table: "会心率",
        select: "会心率",
        detail: "会心率",
        suffix: "%"
    },
    cri_dmg: {
        table: "会心ダメージ",
        select: "会心ダメ",
        detail: "会心ダメージ",
        suffix: "%"
    },
    any_dmg: {
        table: "与ダメージ",
        select: "",
        detail: "ダメージ",
        suffix: "%"
    },
    elem_dmg: {
        table: null,
        select: "",
        detail: "元素ダメージ",
        suffix: "%"
    },
    pyro_dmg: {
        table: "炎元素バフ",
        select: "炎元素バフ",
        detail: "炎元素ダメージバフ",
        suffix: "%"
    },
    hydro_dmg: {
        table: "水元素バフ",
        select: "水元素バフ",
        detail: "水元素ダメージバフ",
        suffix: "%"
    },
    elect_dmg: {
        table: "雷元素バフ",
        select: "雷元素バフ",
        detail: "雷元素ダメージバフ",
        suffix: "%"
    },
    anemo_dmg: {
        table: "風元素バフ",
        select: "風元素バフ",
        detail: "風元素ダメージバフ",
        suffix: "%"
    },
    cryo_dmg: {
        table: "氷元素バフ",
        select: "氷元素バフ",
        detail: "氷元素ダメージバフ",
        suffix: "%"
    },
    geo_dmg: {
        table: "岩元素バフ",
        select: "岩元素バフ",
        detail: "岩元素ダメージバフ",
        suffix: "%"
    },
    phys_dmg: {
        table: "物理バフ",
        select: "物理バフ",
        detail: "物理ダメージバフ",
        suffix: "%"
    },
    normal_dmg: {
        table: "通常攻撃ダメ",
        select: "",
        detail: "通常攻撃ダメージ",
        suffix: "%"
    },
    heavy_dmg: {
        table: "重撃ダメ",
        select: "",
        detail: "重撃ダメージ",
        suffix: "%"
    },
    heavy_cri: {
        table: "重撃会心率",
        select: "",
        detail: "重撃会心率",
        suffix: "%"
    },
    skill_dmg: {
        table: "元素スキルダメ",
        select: "",
        detail: "元素スキルダメージ",
        suffix: "%"
    },
    skill_cri: {
        table: "スキル会心率",
        select: "",
        detail: "元素スキル会心率",
        suffix: "%"
    },
    burst_dmg: {
        table: "元素爆発ダメ",
        select: "",
        detail: "元素爆発ダメージ",
        suffix: "%"
    },
    // burning_dmg: {
    //     table: "燃焼ダメ",
    //     select: null,
    //     detail: "燃焼ダメージ",
    //     postfix: "%"
    // },
    vaporize_dmg: {
        table: "蒸発ダメ",
        select: "",
        detail: "蒸発ダメージ",
        suffix: "%"
    },
    melt_dmg: {
        table: "融解ダメ",
        select: "",
        detail: "融解ダメージ",
        suffix: "%"
    },
    swirl_dmg: {
        table: "拡散ダメ",
        select: "",
        detail: "拡散ダメージ",
        suffix: "%"
    },
    echarge_dmg: {
        table: "感電ダメ",
        select: "",
        detail: "感電ダメージ",
        suffix: "%"
    },
    shutter_dmg: {
        table: "氷砕きダメ",
        select: "",
        detail: "氷砕きダメージ",
        suffix: "%"
    },
    conduct_dmg: {
        table: "超電導きダメ",
        select: "",
        detail: "超電導ダメージ",
        suffix: "%"
    },
    overload_dmg: {
        table: "過負荷ダメ",
        select: "",
        detail: "過負荷ダメージ",
        suffix: "%"
    },
} as const;

// TODO: 多言語対応
const TEAM_BONUS: DeepReadonly<Partial<Record<ElementType, IBasicBonus>>> = {
    pyro: { items: StatusBonusType.AtkBuf, value: 25 },
    cryo: { items: CriticalBonusType.Rate, value: 15, limit: "氷元素付着または凍結状態の敵" },
    geo: { items: StatusBonusType.AnyDmg, value: 15, limit: "シールドが存在する時" },
} as const;

// ステータスボーナス
class Bonus {
    public id: string;
    public apply: boolean;
    public types: ReadonlyArray<BonusType>;
    public value: Integer | Rate;
    public limit: string;
    public times: Integer;
    public stack: Integer;
    public source: string;

    constructor(id: string, items: DeepReadonly<Arrayable<BonusType>>, value: Integer | Rate, others: DeepReadonly<IBonus>, source: string) {
        this.id = id;
        this.apply = false;
        this.types = Array.isArray(items) ? items : [items];
        this.value = value;
        this.limit = others.limit ?? "";
        this.times = others.times ?? 0;
        this.stack = others.stack ?? 0;
        this.source = source;
    }

    get effect(): string {
        const labels = BONUS_LABEL;
        const items = this.types;
        let str = labels[items[0]].detail;
        for (let i = 1; i < items.length; ++i) {
            str += "・" + labels[items[i]].detail;
        }
        const suffix = labels[items[0]].suffix;
        if (!!suffix) {
            return `${str}+${roundFloat(this.value)}${suffix}`;
        }
        return `${str}+${this.value}`;
    }

    toString(): string {
        let str = this.effect;

        // TODO:多言語対応
        if (!!this.limit) {
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
}

const ReactionDamageScale: DeepReadonly<Partial<Record<ElementType, Partial<Record<ReactionType, Scale>>>>> = {
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

// キャラステータス
class Status {
    public id: string;
    public chara: DeepReadonly<ICharacter>;
    public conste: Integer;
    public lv: string;
    public bonus: Bonus[];
    public talent: StatusTalent;
    public base: StatusBase;
    public param: StatusParam;

    constructor(id: string) {
        this.id = id;
        this.chara = CHARACTER.other;
        this.conste = 0;
        this.lv = "0";
        this.bonus = [];
        this.talent = { combat: 0, skill: 0, burst: 0 };
        this.base = { hp: 0, atk: 0, def: 0 };
        this.param = {
            hp: 0,
            hp_buf: 0.0,
            atk: 0,
            atk_buf: 0.0,
            def: 0,
            def_buf: 0.0,
            elem: 0,
            en_rec: 0.0,
            cri_rate: 0.0,
            cri_dmg: 0.0,
            any_dmg: 0.0,
            elem_dmg: 0.0,
            pyro_dmg: 0.0,
            hydro_dmg: 0.0,
            elect_dmg: 0.0,
            anemo_dmg: 0.0,
            cryo_dmg: 0.0,
            geo_dmg: 0.0,
            phys_dmg: 0.0,
            normal_dmg: 0.0,
            heavy_dmg: 0.0,
            heavy_cri: 0.0,
            skill_dmg: 0.0,
            skill_cri: 0.0,
            burst_dmg: 0.0,
            melt_dmg: 0.0,
            swirl_dmg: 0.0,
            echarge_dmg: 0.0,
            shutter_dmg: 0.0,
            conduct_dmg: 0.0,
            vaporize_dmg: 0.0,
            overload_dmg: 0.0
        };
    }

    get level(): Integer {
        return parseInt(this.lv.replace("+", ""));
    }

    // 元素反応のリストを取得
    get reactions(): ReactionType[] {
        const chara = this.chara;
        const elem = chara.element;
        const scales = ReactionDamageScale[elem];

        let types: ReactionType[] = [];
        // 元素反応を追加
        if (!!scales) {
            for (const type in scales) {
                types.push(type as ReactionType);
            }
        }
        // 氷砕きを追加
        if (elem === ElementType.Geo) {
            types.push(ReactionType.Shutter);
        } else if (chara.weapon === WeaponType.Claymore) {
            types.push(ReactionType.Shutter);
        }

        return types;
    }

    private get elem_react(): number {
        return this.param.elem / (1401 + this.param.elem) * 100;
    }

    // 元素反応・増幅（％）
    private get elem_ampl(): number {
        return 25.0 / 9.0 * this.elem_react;
    }

    // 元素反応・転化（％）
    private get elem_trans(): number {
        return 60.0 / 9.0 * this.elem_react;
    }

    // 攻撃力（実数）
    get attack(): Float {
        return this.base.atk + (this.base.atk * this.param.atk_buf / 100) + this.param.atk;
    }

    // 防御力（実数）
    get defence(): Float {
        return this.base.def + (this.base.def * this.param.def_buf / 100) + this.param.def;
    }

    // 攻撃ダメージ値（％）
    combatBonus(type: CombatType): Rate {
        return this.param[TypeToBonus.combat(type)];
    }

    // 元素ダメージ値（％）
    elementBonus(type: ElementType): number {
        let rate = this.param[TypeToBonus.element(type)];
        if (type !== ElementType.Phys) {
            rate += this.param.elem_dmg;
        }
        return rate;
    }

    // 元素熟知ダメージ値（％）
    elementMaster(type: ReactionType): Rate {
        let rate: Rate;
        switch (type) {
            case ReactionType.Melt:
            case ReactionType.Vaporize:
                rate = this.elem_ampl;
                break;
            default:
                rate = this.elem_trans;
                break;
        }
        return rate;
    }

    // 元素反応ダメージ値（％）
    reactionBonus(type: ReactionType): Rate {
        return this.param[TypeToBonus.reaction(type)];
    }

    // 元素反応のダメージ倍率
    reactionScale(elem: ElementType, reaction: ReactionType): number {
        if ((reaction === ReactionType.Shutter) &&
            ((elem === ElementType.Phys) || (elem === ElementType.Geo))) {
            return 1.0;
        }
        const scales = ReactionDamageScale[elem];
        if (!!scales) {
            const value = scales[reaction];
            if (!!value) {
                return value;
            }
        }
        return 0.0;
    }

    // 会心値（％）
    critical(type: CombatType = CombatType.Normal): ICriticalValue {
        let special = 0;
        switch (type) {
            case CombatType.Heavy:
                special = this.param.heavy_cri;
                break;
            case CombatType.Skill:
                special = this.param.skill_cri;
                break;
        }
        return {
            rate: 5 + this.param.cri_rate + special, // 基礎5%追加
            damage: 50 + this.param.cri_dmg, // 基礎50%追加
            special: special !== 0,
        };
    }

    // ボーナス追加
    append(bonus: Bonus) {
        if (!bonus.limit) {
            bonus.apply = true;
            this.apply(bonus);
        }
        this.bonus.push(bonus);
    }

    // ボーナス適用
    apply(bonus: Bonus) {
        for (const item of bonus.types) {
            this.addValue({ type: item, value: bonus.value });
        }
    }

    // ボーナス除去
    remove(bonus: Bonus) {
        for (const item of bonus.types) {
            this.subValue({ type: item, value: bonus.value });
        }
    }

    // ボーナス値加算
    addValue(bonus: IAnyBonusValue) {
        if (bonus.type !== StatusBonusType.Other) {
            this.param[bonus.type] += bonus.value;
        }
    }

    // ボーナス値減算
    subValue(bonus: IAnyBonusValue) {
        if (bonus.type !== StatusBonusType.Other) {
            this.param[bonus.type] -= bonus.value;
        }
    }

    // 複製
    clone(): Status {
        let status = new Status(this.id);
        status.chara = this.chara;
        status.conste = this.conste;
        status.lv = this.lv;
        status.bonus = this.bonus;
        status.talent = { ...this.talent };
        status.base = { ...this.base };
        status.param = { ...this.param };
        return status;
    }
}

// 敵ステータス
class Enemy {
    public name: string;
    public level: Integer;
    public debuff: Rate;
    public resist: DeepReadonly<Resist>;
    public reduct: Resist;

    constructor(id: string) {
        const info = ENEMY_LIST[id];
        this.name = info.name;
        this.level = 0;
        // デバフ（％）
        this.debuff = 0;
        // 耐性（％）
        this.resist = info.resist;
        // 耐性減衰（％）
        this.reduct = {
            pyro: 0,
            hydro: 0,
            elect: 0,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0,
        };
    }

    // 防御力（小数）
    defence(level: Integer): Scale {
        const charaLevel = level + 100;
        const enemyLevel = this.level + 100;
        const debuffRate = 1.0 - (this.debuff / 100);
        return charaLevel / (debuffRate * enemyLevel + charaLevel);
    }

    // 耐性（小数）
    resistance(type: ElementType): Scale {
        const value = this.resist[type] - this.reduct[type];
        if (value < 0) {
            // 1 - (RES ÷ 2)
            return (100 - (value / 2)) / 100;
        } else if (75 <= value) {
            // 1 ÷ (4 × RES + 1)
            return 100 / (value * 4 + 100);
        } else {
            // 1 - RES
            return (100 - value) / 100;
        }
    }
}

const DAMAGE_SCALE: DeepReadonly<Record<DamageScale, Rate[]>> = {
    phys: [100.0, 108.0, 116.0, 127.5, 135.0, 145.0, 157.5, 170.0, 182.5, 197.5, 211.5, 225.5, 239.5, 253.5, 267.5],
    elem: [100.0, 107.5, 115.0, 125.0, 132.5, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0, 212.5, 225.0, 237.5],
    etc1: [100.0, 110.5, 121.5, 135.0, 147.0, 159.5, 175.5, 192.0, 208.0, 224.0, 240.5, 256.5, 270.0, 283.5, 297.0],
} as const;

// 天賦の各種倍率
class CombatAttribute {
    public name: string;
    public type: CombatType;
    public elem: CombatElementType;
    public value: Rate[];
    public multi: Integer;
    public based: DamageBased;

    constructor(info: DeepReadonly<ICombat>, level: Integer) {
        const scale = DAMAGE_SCALE[info.scale];
        const index = Math.min(Math.max(0, level - 1), scale.length - 1); // Math.clamp()
        this.name = info.name;
        this.type = info.type;
        this.elem = info.elem;
        this.value = [info.value * scale[index] / 100];
        if (!!info.value2) {
            this.value.push(info.value2 * scale[index] / 100);
        }
        this.multi = info.multi ?? 1;
        this.based = info.based ?? DamageBased.Atk;
    }

    toString(func: ItoString<Rate>): string {
        let str = this.value.map(func).join("+");
        if (1 < this.multi) {
            return `${str}x${this.multi}`;
        }
        return str;
    }

    damage(row: HTMLRowElement, status: Status, enemy: Enemy, reaction?: ReactionType) {
        let cell = row.cells[2];
        if (!!cell.className) {
            let elem = cell.className as ElementType;
            // TODO: 風元素か反応元素かボーナスなしか要検証
            // if (this.elem === CombatElementType.Contact) {
            //     elem = ElementType.Anemo;
            // }

            // 元素反応の正規化
            reaction = this.reaction(elem, reaction);

            // 攻撃力
            let attackPower: Float;
            switch (this.based) {
                case DamageBased.Def:
                    attackPower = status.defence;
                    break;
                default:
                    attackPower = status.attack;
                    break;
            }

            // 防御力
            const enemyDefence = enemy.defence(status.level);
            const enemyResist = enemy.resistance(elem);

            // 各種倍率
            const combatBonus = status.combatBonus(this.type);
            const elementBonus = status.elementBonus(elem);
            const combatScale = (100 + combatBonus + elementBonus + status.param.any_dmg) / 100;
            const critical = status.critical(this.type);
            const criticalScale = (100 + critical.damage) / 100;

            const setDamage = (damage: number) => {
                // 通常ダメージ
                cell.textContent = this.toString(value => (damage * value / 100).toFixed());
                cell = cell.nextElementSibling as HTMLCellElement;

                damage *= criticalScale;

                // 会心ダメージ
                let text = this.toString(value => (damage * value / 100).toFixed());
                // 会心率が異なる場合は特別表示
                if (critical.special) {
                    text = `${text}(${toFloorRate(critical.rate)})`;
                }
                cell.textContent = text;
                cell = cell.nextElementSibling as HTMLCellElement;
            };

            let totalDamage = attackPower * combatScale * enemyDefence * enemyResist;

            // 蒸発と溶解は取り消し線で表示
            if ((reaction === ReactionType.Vaporize) || (reaction === ReactionType.Melt)) {
                let damage = totalDamage;

                // 通常ダメージ
                cell.innerHTML = `<span class="strike">${this.toString(value => (damage * value / 100).toFixed())}</span>`;
                cell = cell.nextElementSibling as HTMLCellElement;

                damage *= criticalScale;

                // 会心ダメージ
                cell.innerHTML = `<span class="strike">${this.toString(value => (damage * value / 100).toFixed())}</span>`;
                cell = cell.nextElementSibling as HTMLCellElement;
            } else {
                // 通常表示
                setDamage(totalDamage);
            }

            if (!!reaction) {
                const elementMaster = status.elementMaster(reaction);
                const reactionBonus = status.reactionBonus(reaction);
                const reactionScale = status.reactionScale(elem, reaction) * (100 + elementMaster + reactionBonus) / 100;

                // 元素反応ダメージ
                setDamage(totalDamage * reactionScale);
            } else {
                for (let i = 0; i < 2; ++i) {
                    cell.textContent = "-";
                    cell = cell.nextElementSibling as HTMLCellElement;
                }
            }
        } else {
            // ダメージ表示なし
            for (let i = 0; i < 4; ++i) {
                cell.textContent = "-";
                cell = cell.nextElementSibling as HTMLCellElement;
            }
        }
    }

    private reaction(elem: ElementType, reaction?: ReactionType): ReactionType | undefined {
        if (this.elem !== CombatElementType.Contact) {
            if (reaction === ReactionType.Shutter) {
                switch (elem) {
                    case ElementType.Phys:
                    case ElementType.Geo:
                        return reaction;
                }
            } else if (elem !== ElementType.Phys) {
                return reaction;
            }
        }
        return undefined;
    }
}

const ASCENSION_LV_STEP = [20, 40, 50, 60, 70, 80];
const ASCENSION_LV_MIN = 1;
const ASCENSION_LV_MAX = 90;
const TALENT_LV_MAX = 15;

const ARTIFACT_STAR_MAX = 5;
const ARTIFACT_LEVEL = [0, 0, 0, 12, 16, 20];

const ARTIFACT_PARAM: DeepReadonly<ArtifactParam[]> = [
    // ☆☆☆
    {
        hp: { intercept: 430, slope: 121.8846154 }, // HP
        atk: { intercept: 28, slope: 7.89010989 }, // 攻撃力
        def: { intercept: 21, slope: 5.917582418 }, // 防御力,元素熟知
        atk_buf: { intercept: 5.2, slope: 1.488461538 }, // HP(%),攻撃力(%),元素ダメージ
        def_buf: { intercept: 6.6, slope: 1.854945055 }, // 防御力(%),物理ダメージ
        en_rec: { intercept: 5.8, slope: 1.65 }, // 元素チャージ効率
        cri_rate: { intercept: 3.5, slope: 0.989010989 }, // 会心率
        cri_dmg: { intercept: 7.0, slope: 1.980769231 }, // 会心ダメージ
    },
    // ☆☆☆☆
    {
        hp: { intercept: 645, slope: 182.8529412, substep: 23.9 },
        atk: { intercept: 42, slope: 11.8995098, substep: 1.6 },
        def: { intercept: 25, slope: 7.137254902, substep: 1.9 },
        atk_buf: { intercept: 6.3, slope: 1.782352941, substep: 0.47 },
        def_buf: { intercept: 7.9, slope: 2.22745098, substep: 0.58 },
        en_rec: { intercept: 7.0, slope: 1.980882353, substep: 0.52 },
        cri_rate: { intercept: 4.2, slope: 1.1875, substep: 0.31 },
        cri_dmg: { intercept: 8.4, slope: 2.377696078, substep: 0.62 },
    },
    // ☆☆☆☆☆
    {
        hp: { intercept: 717, slope: 203.1597403, substep: 29.9 },
        atk: { intercept: 47, slope: 13.22597403, substep: 1.9 },
        def: { intercept: 28, slope: 7.932467532, substep: 2.3 },
        atk_buf: { intercept: 7, slope: 1.980909091, substep: 0.58 },
        def_buf: { intercept: 8.7, slope: 2.477402597, substep: 0.73 },
        en_rec: { intercept: 7.8, slope: 2.2, substep: 0.65 },
        cri_rate: { intercept: 4.7, slope: 1.330779221, substep: 0.39 },
        cri_dmg: { intercept: 9.3, slope: 2.644805195, substep: 0.78 },
    }
] as const;

function getArtifactParam(star: Integer, level: Integer, bonus: AnyBonusType): Nullable<IArtifactBonus> {
    // ☆を正規化
    if (star < 3 || 5 < star) {
        return null;
    }
    // levelを正規化
    if (level < 0 || ARTIFACT_LEVEL[star] < level) {
        return null;
    }

    let param = ARTIFACT_PARAM[star - 3];
    switch (bonus) {
        case StatusBonusType.Hp:
        case StatusBonusType.Atk:
        case StatusBonusType.Def:
        case StatusBonusType.AtkBuf:
        case StatusBonusType.DefBuf:
        case StatusBonusType.EnRec:
        case CriticalBonusType.Rate:
        case CriticalBonusType.Damage:
            return param[bonus];

        case StatusBonusType.Elem:
            return param.def;

        case StatusBonusType.HpBuf:
        case ElementBonusType.Anemo:
        case ElementBonusType.Geo:
        case ElementBonusType.Elect:
        case ElementBonusType.Hydro:
        case ElementBonusType.Pyro:
        case ElementBonusType.Cryo:
            return param.atk_buf;

        case ElementBonusType.Phys:
            return param.def_buf;
    }
    return null;
}

const ARTIFACT_SUB = [
    StatusBonusType.Other,
    StatusBonusType.Hp,
    StatusBonusType.HpBuf,
    StatusBonusType.Atk,
    StatusBonusType.AtkBuf,
    StatusBonusType.Def,
    StatusBonusType.DefBuf,
    StatusBonusType.Elem,
    StatusBonusType.EnRec,
    CriticalBonusType.Rate,
    CriticalBonusType.Damage
] as const;

const ARTIFACT_SANDS = [
    StatusBonusType.Other,
    StatusBonusType.HpBuf,
    StatusBonusType.AtkBuf,
    StatusBonusType.DefBuf,
    StatusBonusType.Elem,
    StatusBonusType.EnRec,
] as const;

const ARTIFACT_GOBLET = [
    StatusBonusType.Other,
    StatusBonusType.HpBuf,
    StatusBonusType.AtkBuf,
    StatusBonusType.DefBuf,
    StatusBonusType.Elem,
    ElementBonusType.Phys,
    ElementBonusType.Anemo,
    ElementBonusType.Geo,
    ElementBonusType.Elect,
    ElementBonusType.Hydro,
    ElementBonusType.Pyro,
    ElementBonusType.Cryo
] as const;

const ARTIFACT_CIRCLET = [
    StatusBonusType.Other,
    StatusBonusType.HpBuf,
    StatusBonusType.AtkBuf,
    StatusBonusType.DefBuf,
    StatusBonusType.Elem,
    CriticalBonusType.Rate,
    CriticalBonusType.Damage
] as const;

const WEAPON_RANK_MAX = 5;