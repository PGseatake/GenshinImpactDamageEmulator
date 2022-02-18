export const ElementTypes = [
    "pyro",
    "hydro",
    "dendro",
    "elect",
    "anemo",
    "cryo",
    "geo",
    "phys",
] as const;
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
export type NoneElementType = ElementType | "";

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
export type NoneReactionType = ReactionType | "";

export const WeaponTypes = [
    "sword",
    "claymore",
    "polearm",
    "bow",
    "catalyst"
] as const;
export const WeaponType = {
    Sword: "sword",
    Claymore: "claymore",
    Polearm: "polearm",
    Bow: "bow",
    Catalyst: "catalyst"
} as const;
export type WeaponType = typeof WeaponType[keyof typeof WeaponType];

export function isWeaponType(type: string): type is WeaponType {
    return WeaponTypes.includes(type as WeaponType);
}

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

export function isArtifactType(type: string): type is ArtifactType {
    return ArtifactTypes.includes(type as ArtifactType);
}

export const TalentTypes = [
    "combat",
    "skill",
    "burst",
] as const;
export const TalentType = {
    Combat: "combat",
    Skill: "skill",
    Burst: "burst",
} as const;
export type TalentType = typeof TalentType[keyof typeof TalentType];

export const CombatTypes = [
    "normal",
    "heavy",
    "plunge",
    "skill",
    "burst",
] as const;
export const CombatType = {
    Normal: "normal",
    Heavy: "heavy",
    Plunge: "plunge",
    Skill: "skill",
    Burst: "burst",
} as const;
export type CombatType = typeof CombatType[keyof typeof CombatType];
export type AnyCombatType = CombatType | "combat";

export const CombatElementType = {
    Contact: "contact"
} as const;
export type CombatElementType = ElementType | typeof CombatElementType[keyof typeof CombatElementType];

export const ResistTypes = [
    ...ElementTypes,
    "defence",
] as const;
export const ResistType = {
    Defence: "defence",
} as const;
export type ResistType = ElementType | typeof ResistType[keyof typeof ResistType];

export const ReductTypes = [
    ...ElementTypes,
    "defence",
] as const;
export const ReductType = {
    Defence: "defence",
} as const;
export type ReductType = ElementType | typeof ReductType[keyof typeof ReductType];

export const AnyReductType = {
    Contact: "contact",
    All: "all",
} as const;
export type AnyReductType = ReductType | typeof AnyReductType[keyof typeof AnyReductType];

export const ContactTypes = [
    "pyro",
    "hydro",
    "elect",
    "cryo",
] as const;
export type ContactType = typeof ContactTypes[number];
export type NoneContactType = ContactType | "";

export type AmplifyReactionType = "vaporize" | "melt";
export function isAmplifyReaction(type: ReactionType): type is AmplifyReactionType {
    switch (type) {
        case ReactionType.Vaporize:
        case ReactionType.Melt:
            return true;
    }
    return false;
}
export type TransformReactionType = "burning" | "swirl" | "echarge" | "shutter" | "conduct" | "overload";

export type StatusType = "hp" | "atk" | "def";

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
} as const;
export type StatusBonusType = typeof StatusBonusType[keyof typeof StatusBonusType];
export type AnyStatusBonusType = StatusBonusType | "any_dmg";

export const CriticalBonusType = {
    Damage: "cri_dmg",
    Rate: "cri_rate",
    Normal: "normal_cri",
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
} as const;
export type ElementBonusType = typeof ElementBonusType[keyof typeof ElementBonusType];
export type AnyElementBonusType = ElementBonusType | "elem_dmg";

export const CombatBonusType = {
    Normal: "normal_dmg",
    Heavy: "heavy_dmg",
    Plunge: "plunge_dmg",
    Combat: "combat_dmg",
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
} as const;
export type BonusType = AnyStatusBonusType | CriticalBonusType | AnyElementBonusType | CombatBonusType | ReactionBonusType;

export const AnyBonusType = {
    Damage: "any_dmg",
    Element: "elem_dmg",
} as const;
export type AnyBonusType = BonusType | "none";

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

export const ItemBonusType = {
    HpBuf: "hp_buf",
    AtkBuf: "atk_buf",
    DefBuf: "def_buf",
    Elem: "elem",
    EnRec: "en_rec",
    CriDmg: "cri_dmg",
    CriRate: "cri_rate",
    PhysDmg: "phys_dmg",
} as const;
export type ItemBonusType = typeof ItemBonusType[keyof typeof ItemBonusType];

export const BonusTarget = {
    All: "all", // 全員
    Self: "self", // 自キャラ
    Next: "next", // 次キャラ
    Other: "other", // 自キャラ以外
    Melee: "melee", // 片手剣・両手剣・長柄武器キャラ
} as const;
export type BonusTarget = typeof BonusTarget[keyof typeof BonusTarget];

export const DamageScale = {
    Phys: "phys",
    Elem: "elem",
    Xiao: "xiao",
    Hutao: "hutao",
    Zhongli: "zhongli",
} as const;
export type DamageScale = typeof DamageScale[keyof typeof DamageScale];

export const DamageBased = {
    Hp: "hp",
    Atk: "atk",
    Def: "def"
} as const;
export type DamageBased = typeof DamageBased[keyof typeof DamageBased];

export const ExtraBonusType = {
    Flat: "flat",
    Reduct: "reduct",
    Enchant: "enchant",
} as const;
export type ExtraBonusType = typeof ExtraBonusType[keyof typeof ExtraBonusType];

export const FlatBonusDest = {
    // StatusType 実数
    Atk: "atk",
    Def: "def",
    Elem: "elem",
    EnRec: "en_rec",
    // CombatType 実数
    Combat: "combat",
    Normal: "normal",
    Heavy: "heavy",
    Skill: "skill",
    Burst: "burst",
    // StatusType 割合
    AtkBuf: "atk_buf",
    CriRate: "cri_rate",
    // CombatBonusType 割合
    CombatDmg: "combat_dmg",
    NormalDmg: "normal_dmg",
    HeavyDmg: "heavy_dmg",
    SkillDmg: "skill_dmg",
    BurstDmg: "burst_dmg",
    // ElementBonusType 割合
    HydroDmg: "hydro_dmg",
    CryoDmg: "cryo_dmg",
    Contact: "contact",
} as const;
export type FlatBonusDest = typeof FlatBonusDest[keyof typeof FlatBonusDest];

export const FlatBonusBase = {
    None: "none",
    Direct: "direct",
    Energy: "energy",
    Hp: "hp", // 最終値
    AtkBase: "atk_base", // 基礎値
    Def: "def", // 最終値
    Elem: "elem",
    EnRec: "en_rec",
    HealBuf: "heal_buf",
    CriRate: "cri_rate",
} as const;
export type FlatBonusBase = typeof FlatBonusBase[keyof typeof FlatBonusBase];

export const EnchantType = {
    None: "",
    Pyro: "pyro",
    Elect: "elect",
    Cryo: "cryo",
    Anemo: "anemo",
    Geo: "geo",
} as const;
export type EnchantType = typeof EnchantType[keyof typeof EnchantType];

export const TypeToBonus = {
    element(type: ElementType) {
        return type + "_dmg" as ElementBonusType;
    },
    combat(type: AnyCombatType) {
        return type + "_dmg" as CombatBonusType;
    },
    reaction(type: ReactionType) {
        return type + "_dmg" as ReactionBonusType;
    },
    buffer(type: StatusBonusType) {
        return type + "_buf" as StatusBonusType;
    },
} as const;
