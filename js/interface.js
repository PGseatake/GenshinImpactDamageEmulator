"use strict";
const ElementType = {
    Phys: "phys",
    Pyro: "pyro",
    Hydro: "hydro",
    Elect: "elect",
    Anemo: "anemo",
    Cryo: "cryo",
    Geo: "geo"
};
const WeaponType = {
    Sword: "sword",
    Claymore: "claymore",
    Polearm: "polearm",
    Bow: "bow",
    Catalyst: "catalyst"
};
const WeaponTypes = [
    "sword",
    "claymore",
    "polearm",
    "bow",
    "catalyst"
];
const ArtifactType = {
    Flower: "flower",
    Feather: "feather",
    Sands: "sands",
    Goblet: "goblet",
    Circlet: "circlet"
};
const ArtifactTypes = [
    "flower",
    "feather",
    "sands",
    "goblet",
    "circlet"
];
const ItemTypes = [
    "sword",
    "claymore",
    "polearm",
    "bow",
    "catalyst",
    "flower",
    "feather",
    "sands",
    "goblet",
    "circlet"
];
const EquipmentType = {
    Chara: "chara"
};
const EquipmentTypes = [
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
    "circlet"
];
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
    CriRate: "cri_rate",
    CriDmg: "cri_dmg",
    HeavyCri: "heavy_cri",
    AnyDmg: "any_dmg",
};
// const CriticalBonus = {
//     Damage: "cri_dmg",
//     Rate: "cri_rate",
//     Heavy: "heavy_cri",
//     Skill: "skill_cri",
// } as const;
const CombatBonus = {
    Normal: "normal_dmg",
    Heavy: "heavy_dmg",
    Skill: "skill_dmg",
    Burst: "burst_dmg"
};
const ElementBonus = {
    Phys: "phys_dmg",
    Pyro: "pyro_dmg",
    Hydro: "hydro_dmg",
    Elect: "elect_dmg",
    Anemo: "anemo_dmg",
    Cryo: "cryo_dmg",
    Geo: "geo_dmg",
    Any: "elem_dmg"
};
const ReactionBonus = {
    // Burning: "burning_dmg",
    Vaporize: "vaporize_dmg",
    Melt: "melt_dmg",
    Swirl: "swirl_dmg",
    Echarge: "echarge_dmg",
    Shutter: "shutter_dmg",
    Conduct: "conduct_dmg",
    Overload: "overload_dmg"
};
const ReactionType = {
    Amplify: "ampl",
    Transform: "trans",
    // Burning: "burning",
    Vaporize: "vaporize",
    Melt: "melt",
    Swirl: "swirl",
    Echarge: "echarge",
    Shutter: "shutter",
    Conduct: "conduct",
    Overload: "overload"
};
const CombatType = {
    Normal: "normal",
    Heavy: "heavy",
    Skill: "skill",
    Burst: "burst"
};
const DamageScale = {
    Phys: "phys",
    Elem: "elem",
    Etc1: "etc1"
};
const BonusTarget = {
    Self: "self",
    Next: "next",
    All: "all"
};
const TalentType = {
    Combat: "combat",
    Skill: "skill",
    Burst: "burst",
};
const CombatElementType = {
    Switch: "switch",
    AddElem: "addem"
};
function contains(list, value) {
    return 0 <= list.indexOf(value);
}
