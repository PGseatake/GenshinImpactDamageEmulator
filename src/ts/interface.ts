type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> { }
type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>
};

type Nullable<T> = T | null;
type Arrayable<T> = T | T[];

interface IPair<TKey, TValue> {
    key: TKey;
    value: TValue;
}

interface IMap<T> {
    [key: string]: T;
}
interface INumMap<T> {
    [key: number]: T;
}

type Rate = number;
type Scale = number;
type Float = number;
type Integer = number;

const ElementType = {
    Phys: "phys",
    Pyro: "pyro",
    Hydro: "hydro",
    Elect: "elect",
    Anemo: "anemo",
    Cryo: "cryo",
    Geo: "geo"
} as const;
type ElementType = typeof ElementType[keyof typeof ElementType];

const WeaponType = {
    Sword: "sword",
    Claymore: "claymore",
    Polearm: "polearm",
    Bow: "bow",
    Catalyst: "catalyst"
} as const;
type WeaponType = typeof WeaponType[keyof typeof WeaponType];

const WeaponTypes = [
    WeaponType.Sword,
    WeaponType.Claymore,
    WeaponType.Polearm,
    WeaponType.Bow,
    WeaponType.Catalyst
] as const;

const ArtifactType = {
    Flower: "flower",
    Feather: "feather",
    Sands: "sands",
    Goblet: "goblet",
    Circlet: "circlet"
} as const;
type ArtifactType = typeof ArtifactType[keyof typeof ArtifactType];

const ArtifactTypes = [
    ArtifactType.Flower,
    ArtifactType.Feather,
    ArtifactType.Sands,
    ArtifactType.Goblet,
    ArtifactType.Circlet
] as const;

const EquipmentType = {
    Chara: "chara"
} as const;
type EquipmentType = typeof EquipmentType[keyof typeof EquipmentType] | WeaponType | ArtifactType;

const EquipmentTypes = [
    EquipmentType.Chara,
    WeaponType.Sword,
    WeaponType.Claymore,
    WeaponType.Polearm,
    WeaponType.Bow,
    WeaponType.Catalyst,
    ArtifactType.Flower,
    ArtifactType.Feather,
    ArtifactType.Sands,
    ArtifactType.Goblet,
    ArtifactType.Circlet
] as const;

const ReactionType = {
    // Burning: "burning",
    Vaporize: "vaporize",
    Melt: "melt",
    Swirl: "swirl",
    Echarge: "echarge",
    Shutter: "shutter",
    Conduct: "conduct",
    Overload: "overload"
} as const;
type ReactionType = typeof ReactionType[keyof typeof ReactionType];

type AmplifyReactionType = "vaporize" | "melt";
const IsAmplifyReaction = (type: ReactionType): type is AmplifyReactionType => {
    switch (type) {
        case ReactionType.Melt:
        case ReactionType.Vaporize:
            return true;
    }
    return false;
};

type TransformReactionType = "swirl" | "echarge" | "shutter" | "conduct" | "overload";
const IsTransformReaction = (type: ReactionType): type is TransformReactionType => {
    if (IsAmplifyReaction(type)) return false;
    // if (type === ReactionType.Burning) return false;
    return true;
};

const ContactReactionTypes = [
    "",
    ElementType.Pyro,
    ElementType.Hydro,
    ElementType.Elect,
    ElementType.Cryo
] as const;
type ContactReactionType = typeof ContactReactionTypes[number];

const CriticalBonusType = {
    Damage: "cri_dmg",
    Rate: "cri_rate",
    // Normal: "normal_cri",
    Heavy: "heavy_cri",
    Skill: "skill_cri",
} as const;
type CriticalBonusType = typeof CriticalBonusType[keyof typeof CriticalBonusType];

const StatusBonusType = {
    Other: "other",
    Hp: "hp",
    HpBuf: "hp_buf",
    Atk: "atk",
    AtkBuf: "atk_buf",
    Def: "def",
    DefBuf: "def_buf",
    Elem: "elem",
    EnRec: "en_rec",
    // HealBuf: "heal_buf"
    AnyDmg: "any_dmg",
} as const;
type StatusBonusType = typeof StatusBonusType[keyof typeof StatusBonusType] | CriticalBonusType;

const ItemBonusType = {
    HpBuf: "hp_buf",
    AtkBuf: "atk_buf",
    DefBuf: "def_buf",
    Elem: "elem",
    EnRec: "en_rec",
    CriDmg: "cri_dmg",
    CriRate: "cri_rate",
    PhysDmg: "phys_dmg",
} as const;
type ItemBonusType = typeof ItemBonusType[keyof typeof ItemBonusType];

const CombatBonusType = {
    Normal: "normal_dmg",
    Heavy: "heavy_dmg",
    Plunge: "plunge_dmg",
    Skill: "skill_dmg",
    Burst: "burst_dmg"
} as const;
type CombatBonusType = typeof CombatBonusType[keyof typeof CombatBonusType];

const ElementBonusType = {
    Phys: "phys_dmg",
    Pyro: "pyro_dmg",
    Hydro: "hydro_dmg",
    Elect: "elect_dmg",
    Anemo: "anemo_dmg",
    Cryo: "cryo_dmg",
    Geo: "geo_dmg",
    Any: "elem_dmg"
} as const;
type ElementBonusType = typeof ElementBonusType[keyof typeof ElementBonusType];

const ReactionBonusType = {
    // Burning: "burning_dmg",
    Vaporize: "vaporize_dmg",
    Melt: "melt_dmg",
    Swirl: "swirl_dmg",
    Echarge: "echarge_dmg",
    Shutter: "shutter_dmg",
    Conduct: "conduct_dmg",
    Overload: "overload_dmg"
} as const;
type ReactionBonusType = typeof ReactionBonusType[keyof typeof ReactionBonusType];

type AnyBonusType = StatusBonusType | ElementBonusType | CombatBonusType | ReactionBonusType;
type BonusType = Exclude<AnyBonusType, "other">;
type BonusValueType = Exclude<StatusBonusType | ElementBonusType, "elem_dmg" | "any_dmg" | "heavy_cri" | "skill_cri">;

const BonusTarget = {
    All: "all", // 全員
    Self: "self", // 自キャラ
    Next: "next", // 次キャラ
    Other: "other", // 自キャラ以外
    Melee: "melee", // 片手剣・両手剣・長柄武器キャラ
    Enemy: "enemy", // 敵
} as const;
type BonusTarget = typeof BonusTarget[keyof typeof BonusTarget];

interface IBonus {
    extra?: undefined;
    items: Arrayable<BonusType>;
    value: Arrayable<Integer | Rate>;
    limit?: string;
    times?: Integer;
    stack?: Integer;
    target?: BonusTarget;
}
interface IBasicBonus extends IBonus {
    value: Integer | Rate;
}
interface IWeaponBonus extends IBonus {
    value: Array<Integer | Rate>;
}

const CombatType = {
    Normal: "normal",
    Heavy: "heavy",
    Plunge: "plunge",
    Skill: "skill",
    Burst: "burst",
} as const;
type CombatType = typeof CombatType[keyof typeof CombatType];

const DamageScale = {
    Phys: "phys",
    Elem: "elem",
    Etc1: "etc1", // Zhongli
    Xiao: "xiao",
    Hutao: "hutao",
} as const;
type DamageScale = typeof DamageScale[keyof typeof DamageScale];

const DamageBased = {
    Atk: "atk",
    Def: "def"
} as const;
type DamageBased = typeof DamageBased[keyof typeof DamageBased];

const ExtraBonusType = {
    Flat: "flat",
    Reduct: "reduct",
    Enchant: "enchant",
} as const;
type ExtraBonusType = typeof ExtraBonusType[keyof typeof ExtraBonusType];

interface IExtraBonus {
    extra?: ExtraBonusType;
}

const FlatBonusDest = {
    // StatusType 実数
    Atk: "atk",
    Elem: "elem",
    // CombatType 実数
    Combat: "combat",
    Skill: "skill",
    Burst: "burst",
    // CombatBonusType 割合
    CombatDmg: "combat_dmg",
    // ElementBonusType 割合
    HydroDmg: "hydro_dmg",
} as const;
type FlatBonusDest = typeof FlatBonusDest[keyof typeof FlatBonusDest];

const FlatBonusBase = {
    None: "none",
    Hp: "hp", // 最終値
    Atk: "atk", // 基礎値
    Def: "def", // 最終値
    Elem: "elem",
    EnRec: "en_rec",
} as const;
type FlatBonusBase = typeof FlatBonusBase[keyof typeof FlatBonusBase];

interface IFlatBonus extends IExtraBonus {
    extra: "flat";
    dest: FlatBonusDest;
    base: FlatBonusBase;
    value: Arrayable<Rate>;
    scale?: DamageScale;
    limit?: string;
    times?: Integer;
    stack?: Integer;
    target?: BonusTarget;
}
interface IBasicFlatBonus extends IFlatBonus {
    value: Rate;
}
interface IWeaponFlatBonus extends IFlatBonus {
    value: Array<Rate>;
}

const ReductBonusType = {
    Defence: "defence",
    Contact: "contact"
} as const;
type ReductBonusType = ElementType | typeof ReductBonusType[keyof typeof ReductBonusType];

interface IReductBonus extends IExtraBonus {
    extra: "reduct";
    type: Arrayable<ReductBonusType>;
    value: Float;
    limit?: string;
    times?: Integer;
}

interface IEnchantBonus extends IExtraBonus {
    extra: "enchant";
    elem: ElementType;
    dest: Array<CombatType>;
    limit: string;
    times?: Integer;
    target?: BonusTarget;
}

type AnyExtraBonus = IBasicBonus | IBasicFlatBonus | IReductBonus | IEnchantBonus;

type AnyWeaponBonus = Arrayable<IWeaponBonus | IWeaponFlatBonus>;

interface IRankedWeaponBonus {
    bonus?: AnyWeaponBonus;
    rank: Integer;
}

interface IBonusValue {
    type: BonusValueType;
    value: Integer | Rate;
}

interface IBasicBonusValue {
    extra?: undefined;
    type: AnyBonusType;
    value: Float | Rate;
}

interface IFlatBonusValue {
    extra: "flat";
    type: CombatType;
    value: Float;
}

interface IEnchantBonusValue {
    extra: "enchant";
    type: ElementType;
    dest: ReadonlyArray<CombatType>;
    self: boolean;
}

type AnyBonusValue = IBasicBonusValue | IFlatBonusValue | IEnchantBonusValue;

interface INameable {
    name: string;
}

type AscensionParam = ReadonlyArray<number>;

interface IWeapon extends INameable {
    star: Integer;
    atk?: AscensionParam;
    second: BonusValueType;
    secval?: AscensionParam;
    passive?: Arrayable<IWeaponBonus | IWeaponFlatBonus>;
}

interface IArtifactSet extends INameable {
    set2?: IBasicBonus;
    set4?: Arrayable<IBasicBonus>;
}

interface IArtifactParam {
    intercept: Float;
    slope: Float;
    substep?: Float;
}

type ArtifactParamType = "hp" | "atk" | "def" | "atk_buf" | "def_buf" | "en_rec" | "cri_rate" | "cri_dmg";
type ArtifactParam = Record<ArtifactParamType, IArtifactParam>;

const TalentType = {
    Combat: "combat",
    Skill: "skill",
    Burst: "burst",
} as const;
type TalentType = typeof TalentType[keyof typeof TalentType];

const CombatElementType = {
    Contact: "contact"
} as const;
type CombatElementType = ElementType | typeof CombatElementType[keyof typeof CombatElementType];

interface ICombat {
    name: string;
    type: CombatType;
    elem: CombatElementType;
    scale: DamageScale;
    value: Rate;
    value2?: Rate;
    multi?: Integer;
    based?: DamageBased;
}

type CharaStatusType = "hp" | "atk" | "def";
type CharaStatus = Record<CharaStatusType, AscensionParam>;
type CharaTalent = Record<TalentType, ICombat[]>;

interface IPassive {
    skill?: Arrayable<AnyExtraBonus>;
    burst?: Arrayable<AnyExtraBonus>;
    lv4?: Arrayable<AnyExtraBonus>;
    lv5?: Arrayable<AnyExtraBonus>;
}

interface IConste {
    lv1?: Arrayable<AnyExtraBonus>;
    lv2?: Arrayable<AnyExtraBonus>;
    lv4?: Arrayable<AnyExtraBonus>;
    lv6?: Arrayable<AnyExtraBonus>;
}

interface ICharacter extends INameable {
    star: Integer;
    element: ElementType;
    weapon: WeaponType;
    status: Nullable<CharaStatus>;
    special: BonusValueType;
    spvalue: Nullable<Rate[]>;
    talent: Nullable<CharaTalent>;
    passive: Nullable<IPassive>;
    conste: Nullable<IConste>;
}

type StatusBase = Record<CharaStatusType, Integer>;
type StatusParam = Record<BonusType, Integer | Rate>;
type StatusTalent = Record<TalentType, Integer>;

type Resist = Record<ElementType, Rate>;
type Reduct = Resist & { defence: Rate; };

interface IEnemy extends INameable {
    resist: Resist;
}

const TypeToBonus = {
    element(type: ElementType): ElementBonusType {
        return type + "_dmg" as ElementBonusType;
    },

    combat(type: CombatType): CombatBonusType {
        return type + "_dmg" as CombatBonusType;
    },

    reaction(type: ReactionType): ReactionBonusType {
        return type + "_dmg" as ReactionBonusType;
    },

    buffer(type: CharaStatusType): BonusType {
        return type + "_buf" as BonusType;
    },
} as const;

function floorRate(value: Rate): string {
    if (value < 100) {
        return value.toFixed(1) + "%";
    }
    return value.toFixed() + "%";
}

function roundRate(value: Rate): string {
    if (value < 100) {
        return (Math.round(value * 10) / 10).toFixed(1) + "%";
    }
    return Math.round(value).toFixed() + "%";
}

function floorFloat(value: Float): string {
    if (value < 100) {
        return value.toFixed(1);
    }
    return value.toFixed();
}

function roundFloat(value: Float): string {
    if (value < 100) {
        return (Math.round(value * 10) / 10).toFixed(1);
    }
    return Math.round(value).toFixed();
}

function toScale(rate: Rate): Scale {
    return (100.0 + rate) / 100.0;
}

const TableTypes = [
    "chara",
    "sword",
    "claymore",
    "polearm",
    "bow",
    "catalyst",
    "flower",
    "feather",
    "sands",
    "goblet",
    "circlet",
    "equip",
    "team",
    "bonus",
    "enemy",
    "apply",
    "damage"
] as const;

type TableType = typeof TableTypes[number];
const TableType = {
    Chara: "chara",
    Equip: "equip",
    Team: "team",
    Bonus: "bonus",
    Enemy: "enemy",
    Apply: "apply",
    Damage: "damage",
} as const;
