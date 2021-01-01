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

/*
type ItemType = WeaponType | ArtifactType;
const ItemTypes = [
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
*/

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

const CriticalBonus = {
    Damage: "cri_dmg",
    Rate: "cri_rate",
    Heavy: "heavy_cri",
    Skill: "skill_cri",
} as const;
type CriticalBonus = typeof CriticalBonus[keyof typeof CriticalBonus];

const StatusBonus = {
    Other: "other",
    Hp: "hp",
    HpBuf: "hp_buf",
    Atk: "atk",
    AtkBuf: "atk_buf",
    // AtkBase: "atk_base",
    Def: "def",
    DefBuf: "def_buf",
    Elem: "elem",
    EnRec: "en_rec",
    // HealBuf: "heal_buf"
    AnyDmg: "any_dmg",
} as const;
type StatusBonus = typeof StatusBonus[keyof typeof StatusBonus] | CriticalBonus;

const CombatBonus = {
    Normal: "normal_dmg",
    Heavy: "heavy_dmg",
    Skill: "skill_dmg",
    Burst: "burst_dmg"
} as const;
type CombatBonus = typeof CombatBonus[keyof typeof CombatBonus];

const ElementBonus = {
    Phys: "phys_dmg",
    Pyro: "pyro_dmg",
    Hydro: "hydro_dmg",
    Elect: "elect_dmg",
    Anemo: "anemo_dmg",
    Cryo: "cryo_dmg",
    Geo: "geo_dmg",
    Any: "elem_dmg"
} as const;
type ElementBonus = typeof ElementBonus[keyof typeof ElementBonus];

const ReactionBonus = {
    // Burning: "burning_dmg",
    Vaporize: "vaporize_dmg",
    Melt: "melt_dmg",
    Swirl: "swirl_dmg",
    Echarge: "echarge_dmg",
    Shutter: "shutter_dmg",
    Conduct: "conduct_dmg",
    Overload: "overload_dmg"
} as const;
type ReactionBonus = typeof ReactionBonus[keyof typeof ReactionBonus];

type AnyBonusType = StatusBonus | ElementBonus | CombatBonus | ReactionBonus;
type BonusType = Exclude<AnyBonusType, "other">;
type BonusValueType = Exclude<StatusBonus | ElementBonus, "elem_dmg" | "any_dmg" | "heavy_cri" | "skill_cri">;

const ReactionBase = {
    Amplify: "ampl",
    Transform: "trans",
} as const;
type ReactionBase = typeof ReactionBase[keyof typeof ReactionBase];

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

const CombatType = {
    Normal: "normal",
    Heavy: "heavy",
    Skill: "skill",
    Burst: "burst",
} as const;
type CombatType = typeof CombatType[keyof typeof CombatType];

const DamageScale = {
    Phys: "phys",
    Elem: "elem",
    Etc1: "etc1"
} as const;
type DamageScale = typeof DamageScale[keyof typeof DamageScale];

const BonusTarget = {
    Self: "self",
    Next: "next",
    All: "all"
} as const;
type BonusTarget = typeof BonusTarget[keyof typeof BonusTarget];

interface IBonus {
    items: Arrayable<BonusType>;
    value: Arrayable<number>;
    limit?: string;
    times?: number;
    stack?: number;
    target?: BonusTarget;
}
interface IBasicBonus extends IBonus {
    value: number;
}
interface IWeaponBonus extends IBonus {
    value: Array<number>;
}

interface IRankedWeaponBonus {
    bonus: Arrayable<IWeaponBonus> | undefined;
    rank: number;
}

interface IBonusValue {
    type: BonusValueType;
    value: number;
}
interface IAnyBonusValue {
    type: AnyBonusType;
    value: number;
}

interface INameable {
    name: string;
}

interface IWeapon extends INameable {
    star: number;
    second: BonusValueType;
    passive?: Arrayable<IWeaponBonus>;
}

interface IArtifactSet extends INameable {
    set2?: IBasicBonus;
    set4?: Arrayable<IBasicBonus>;
}

interface IArtifactBonus {
    intercept: number;
    slope: number;
    substep?: number;
}

type ArtifactParamType = "hp" | "atk" | "def" | "atk_buf" | "def_buf" | "en_rec" | "cri_rate" | "cri_dmg";
type ArtifactParam = Record<ArtifactParamType, IArtifactBonus>;

const TalentType = {
    Combat: "combat",
    Skill: "skill",
    Burst: "burst",
} as const;
type TalentType = typeof TalentType[keyof typeof TalentType];

const CombatElementType = {
    Switch: "switch",
    AddElem: "addem"
} as const;
type CombatElementType = ElementType | typeof CombatElementType[keyof typeof CombatElementType];

interface ICombat {
    name: string;
    type: CombatType;
    elem: CombatElementType;
    scale: DamageScale;
    value: number;
    value2?: number;
    multi?: number;
    base?: string;
}

type CharaStatusType = "hp" | "atk" | "def";
type CharaStatus = Record<CharaStatusType, number[]>;
type CharaTalent = Record<TalentType, ICombat[]>;

interface ICharacter extends INameable {
    star: number;
    element: ElementType;
    weapon: WeaponType;
    status: Nullable<CharaStatus>;
    special: BonusValueType;
    spvalue: Nullable<number[]>;
    talent: Nullable<CharaTalent>;
}

type StatusBase = Record<CharaStatusType, number>;
type StatusParam = Record<BonusType, number>;
type StatusTalent = Record<TalentType, number>;

type Resist = Record<ElementType, number>;

interface IEnemy extends INameable {
    resist: Resist;
}

interface IAscensionLevel {
    level: number;
    index: number;
}

interface ICriticalValue {
    rate: number;
    damage: number;
    combat: boolean;
}

type ItoString<T> = (value: T) => string;

const TypeToBonus = {
    element(type: ElementType): ElementBonus {
        return type + "_dmg" as ElementBonus;
    },

    combat(type: CombatType): CombatBonus {
        return type + "_dmg" as CombatBonus;
    },

    reaction(type: ReactionType): ReactionBonus {
        return type + "_dmg" as ReactionBonus;
    },

    buffer(type: CharaStatusType): BonusType {
        return type + "_buf" as BonusType;
    },
} as const;
