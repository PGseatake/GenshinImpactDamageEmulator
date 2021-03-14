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
    WeaponType.Sword,
    WeaponType.Claymore,
    WeaponType.Polearm,
    WeaponType.Bow,
    WeaponType.Catalyst
];
const ArtifactType = {
    Flower: "flower",
    Feather: "feather",
    Sands: "sands",
    Goblet: "goblet",
    Circlet: "circlet"
};
const ArtifactTypes = [
    ArtifactType.Flower,
    ArtifactType.Feather,
    ArtifactType.Sands,
    ArtifactType.Goblet,
    ArtifactType.Circlet
];
const EquipmentType = {
    Chara: "chara"
};
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
];
const CriticalBonusType = {
    Damage: "cri_dmg",
    Rate: "cri_rate",
    Heavy: "heavy_cri",
    Skill: "skill_cri",
};
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
    AnyDmg: "any_dmg",
};
const CombatBonusType = {
    Normal: "normal_dmg",
    Heavy: "heavy_dmg",
    Plunge: "plunge_dmg",
    Skill: "skill_dmg",
    Burst: "burst_dmg"
};
const ElementBonusType = {
    Phys: "phys_dmg",
    Pyro: "pyro_dmg",
    Hydro: "hydro_dmg",
    Elect: "elect_dmg",
    Anemo: "anemo_dmg",
    Cryo: "cryo_dmg",
    Geo: "geo_dmg",
    Any: "elem_dmg"
};
const ReactionBonusType = {
    Vaporize: "vaporize_dmg",
    Melt: "melt_dmg",
    Swirl: "swirl_dmg",
    Echarge: "echarge_dmg",
    Shutter: "shutter_dmg",
    Conduct: "conduct_dmg",
    Overload: "overload_dmg"
};
const ReactionType = {
    Vaporize: "vaporize",
    Melt: "melt",
    Swirl: "swirl",
    Echarge: "echarge",
    Shutter: "shutter",
    Conduct: "conduct",
    Overload: "overload"
};
const IsAmplifyReaction = (type) => {
    switch (type) {
        case ReactionType.Melt:
        case ReactionType.Vaporize:
            return true;
    }
    return false;
};
const IsTransformReaction = (type) => {
    if (IsAmplifyReaction(type))
        return false;
    return true;
};
const ReactionSquareTypes = [
    "",
    ElementType.Pyro,
    ElementType.Hydro,
    ElementType.Elect,
    ElementType.Cryo
];
const CombatType = {
    Normal: "normal",
    Heavy: "heavy",
    Plunge: "plunge",
    Skill: "skill",
    Burst: "burst",
};
const DamageScale = {
    Phys: "phys",
    Elem: "elem",
    Etc1: "etc1",
    Xiao: "xiao",
    Hutao: "hutao",
};
const DamageBased = {
    Atk: "atk",
    Def: "def"
};
const BonusTarget = {
    All: "all",
    Self: "self",
    Next: "next",
    Other: "other",
};
const ExtraBonusType = {
    Flat: "flat",
    Reduct: "reduct",
    Enchant: "enchant",
};
const FlatBonusDest = {
    Atk: "atk",
    Elem: "elem",
    Combat: "combat",
    Skill: "skill",
    Burst: "burst",
    NormalDmg: "normal_dmg",
    SkillDmg: "skill_dmg",
    BurstDmg: "burst_dmg",
    HydroDmg: "hydro_dmg",
};
const FlatBonusBase = {
    None: "none",
    Hp: "hp",
    Atk: "atk",
    Def: "def",
    Elem: "elem",
    EnRec: "en_rec",
};
const ReductBonusType = {
    Def: "def",
    Contact: "contact"
};
const TalentType = {
    Combat: "combat",
    Skill: "skill",
    Burst: "burst",
};
const CombatElementType = {
    Switch: "switch",
    Contact: "contact"
};
const TypeToBonus = {
    element(type) {
        return type + "_dmg";
    },
    combat(type) {
        return type + "_dmg";
    },
    reaction(type) {
        return type + "_dmg";
    },
    buffer(type) {
        return type + "_buf";
    },
};
function floorRate(value) {
    if (value < 100) {
        return value.toFixed(1) + "%";
    }
    return value.toFixed() + "%";
}
function roundRate(value) {
    if (value < 100) {
        return (Math.round(value * 10) / 10).toFixed(1) + "%";
    }
    return Math.round(value).toFixed() + "%";
}
function floorFloat(value) {
    if (value < 100) {
        return value.toFixed(1);
    }
    return value.toFixed();
}
function roundFloat(value) {
    if (value < 100) {
        return (Math.round(value * 10) / 10).toFixed(1);
    }
    return Math.round(value).toFixed();
}
function toScale(rate) {
    return (100.0 + rate) / 100.0;
}
