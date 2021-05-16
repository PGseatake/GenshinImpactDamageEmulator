export const ElementType = {
    Pyro: "pyro",
    Hydro: "hydro",
    Dendro: "dendro",
    Elect: "elect",
    Anemo: "anemo",
    Cryo: "cryo",
    Geo: "geo",
    Phys: "phys",
} as const;
export type ElementType = typeof ElementType[keyof typeof ElementType];

export const WeaponType = {
    Sword: "sword",
    Claymore: "claymore",
    Polearm: "polearm",
    Bow: "bow",
    Catalyst: "catalyst"
} as const;
export type WeaponType = typeof WeaponType[keyof typeof WeaponType];

export const ArtifactTypes = [
    "flower",
    "feather",
    "sands",
    "goblet",
    "circlet"
] as const;
export const ArtifactType = {
    Flower: "flower",
    Feather: "feather",
    Sands: "sands",
    Goblet: "goblet",
    Circlet: "circlet"
} as const;
export type ArtifactType = typeof ArtifactType[keyof typeof ArtifactType];

export const ReactionType = {
    Burning: "burning",
    Vaporize: "vaporize",
    Melt: "melt",
    Swirl: "swirl",
    Echarge: "echarge",
    Shutter: "shutter",
    Conduct: "conduct",
    Overload: "overload",
} as const;
export type ReactionType = typeof ReactionType[keyof typeof ReactionType];

export const StatusBonusType = {
    Hp: "hp",
    HpBuf: "hp_buf",
    Atk: "atk",
    AtkBuf: "atk_buf",
    Def: "def",
    DefBuf: "def_buf",
    Elem: "elem",
    EnRec: "en_rec",
    HealBuf: "heal_buf",
    CriDmg: "cri_dmg",
    CriRate: "cri_rate",
    // AnyDmg: "any_dmg"
} as const;
export type StatusBonusType = typeof StatusBonusType[keyof typeof StatusBonusType];
export type AnyStatusBonusType = StatusBonusType | "any_dmg";

export const CriticalBonusType = {
    Damage: "cri_dmg",
    Rate: "cri_rate",
    // Normal: "normal_cri",
    Heavy: "heavy_cri",
    Skill: "skill_cri",
} as const;
export type CriticalBonusType = typeof CriticalBonusType[keyof typeof CriticalBonusType];

export const ElementBonusType = {
    Phys: "phys_dmg",
    Pyro: "pyro_dmg",
    Hydro: "hydro_dmg",
    Dendro: "dendro_dmg",
    Elect: "elect_dmg",
    Anemo: "anemo_dmg",
    Cryo: "cryo_dmg",
    Geo: "geo_dmg",
    // Any: "elem_dmg"
} as const;
export type ElementBonusType = typeof ElementBonusType[keyof typeof ElementBonusType];
export type AnyElementBonusType = ElementBonusType | "elem_dmg";

export const CombatBonusType = {
    Normal: "normal_dmg",
    Heavy: "heavy_dmg",
    Plunge: "plunge_dmg",
    Skill: "skill_dmg",
    Burst: "burst_dmg"
} as const;
export type CombatBonusType = typeof CombatBonusType[keyof typeof CombatBonusType];

export const ReactionBonusType = {
    Burning: "burning_dmg",
    Vaporize: "vaporize_dmg",
    Melt: "melt_dmg",
    Swirl: "swirl_dmg",
    Echarge: "echarge_dmg",
    Shutter: "shutter_dmg",
    Conduct: "conduct_dmg",
    Overload: "overload_dmg",
} as const;
export type ReactionBonusType = typeof ReactionBonusType[keyof typeof ReactionBonusType];

export const BonusType = {
    None: "none",
    Other: "other",
} as const;
export type BonusType = AnyStatusBonusType | CriticalBonusType | AnyElementBonusType | CombatBonusType | ReactionBonusType;

export const AnyBonusType = {
    Damage: "any_dmg",
    Element: "elem_dmg",
} as const;
export type AnyBonusType = BonusType | "none";

export const BonusTarget = {
    All: "all", // 全員
    Self: "self", // 自キャラ
    Next: "next", // 次キャラ
    Other: "other", // 自キャラ以外
    Melee: "melee", // 片手剣・両手剣・長柄武器キャラ
    Enemy: "enemy", // 敵
} as const;
export type BonusTarget = typeof BonusTarget[keyof typeof BonusTarget];

export type BonusDisplayInfo = {
    icon?: string;
    suffix?: string;
};
export type BonusDisplayType = "none" | StatusBonusType | ElementBonusType;

export const BonusDisplayInfo: ReadonlyRecord<BonusDisplayType, BonusDisplayInfo> = {
    "none": { icon: "mdi-minus" },
    "hp": { icon: "mdi-water-outline" },
    "hp_buf": { icon: "mdi-water-percent", suffix: "%" },
    "atk": { icon: "mdi-sword" },
    "atk_buf": { icon: "mdi-sword-cross", suffix: "%" },
    "def": { icon: "mdi-shield-outline" },
    "def_buf": { icon: "mdi-shield-half-full", suffix: "%" },
    "elem": { icon: "mdi-google-circles-extended" },
    "en_rec": { icon: "mdi-restore", suffix: "%" },
    "heal_buf": { icon: "mdi-restore", suffix: "%" },
    "cri_dmg": { icon: "mdi-star-four-points", suffix: "%" },
    "cri_rate": { icon: "mdi-star-four-points", suffix: "%" },
    "pyro_dmg": { icon: "mdi-zodiac-taurus", suffix: "%" },
    "hydro_dmg": { icon: "mdi-zodiac-virgo", suffix: "%" },
    "dendro_dmg": { icon: "mdi-zodiac-cancer", suffix: "%" },
    "elect_dmg": { icon: "mdi-zodiac-gemini", suffix: "%" },
    "anemo_dmg": { icon: "mdi-zodiac-pisces", suffix: "%" },
    "cryo_dmg": { icon: "mdi-zodiac-sagittarius", suffix: "%" },
    "geo_dmg": { icon: "mdi-zodiac-capricorn", suffix: "%" },
    "phys_dmg": { icon: "mdi-zodiac-aries", suffix: "%" },
};
