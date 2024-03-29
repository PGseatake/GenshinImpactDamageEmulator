import * as ascension from "~/src/ascension";
import { BonusType, WeaponTypes, ArtifactType, ArtifactTypes } from "~/src/const";
import { BonusValue } from "~/src/interface";
import { DBEquipTable } from "~/src/equipment";
import Artifact, { DBArtifactTable, ArtifactName, ArtifactNames, ArtifactMain, ArtifactSub } from "~/src/artifact";
import { DBCharaTable, CharaList, CharaName } from "~/src/character";
import { DBWeaponTable, WeaponList } from "~/src/weapon";
import { DBBonusTable } from "~/src/bonus";
import { DBTeamTable } from "~/src/team";
import { DBDamageTable } from "~/src/damage";
import { DBSetting } from "~/src/setting";

export const CurrentVersion = "1.1";
export type DBVersion = { version: string; };

export type Database = DBVersion &
    DBCharaTable & DBWeaponTable & DBArtifactTable & DBEquipTable &
    DBTeamTable & DBBonusTable & DBDamageTable & DBSetting;

export const DBTableTypes = [
    "equip",
    "team",
    "bonus",
    "damage",
    "chara",
    ...WeaponTypes,
    ...ArtifactTypes,
    "setting",
] as const;

interface ICharaV002 {
    name: CharaName,
    conste: string,
    level: string,
    hp: string,
    atk: string,
    def: string,
    combat: string,
    skill: string,
    burst: string,
}
interface IWeaponV002 {
    name: string,
    level: string,
    rank: string,
    atk: string,
    second: [BonusType, string],
}
interface IArtifactV002 {
    name: ArtifactName,
    star: string,
    level: string,
    main: BonusType,
    sub1: [BonusType, string],
    sub2: [BonusType, string],
    sub3: [BonusType, string],
    sub4: [BonusType, string],
}
interface IEquipV002 {
    chara: string;
    weapon: string;
    flower: string;
    feather: string;
    sands: string;
    goblet: string;
    circlet: string;
}
type DatabaseV002 = {
    ver: "0.02",
    version: undefined,
    chara: ICharaV002[],
    sword: IWeaponV002[],
    claymore: IWeaponV002[],
    polearm: IWeaponV002[],
    bow: IWeaponV002[],
    catalyst: IWeaponV002[],
    flower: IArtifactV002[],
    feather: IArtifactV002[],
    sands: IArtifactV002[],
    goblet: IArtifactV002[],
    circlet: IArtifactV002[],
    equip: IEquipV002[],
};

type DatabaseV1xx = { ver: undefined; };
type DatabaseV100 = DatabaseV1xx & Database;

function tryParseFloat(val: string) {
    const num = parseFloat(val);
    if (isNaN(num)) {
        return 0;
    }
    return num;
}

const ver002 = {
    main(type: ArtifactType, { main, star, level }: IArtifactV002): BonusValue {
        let data = Artifact.create("", type, ArtifactNames[0], {
            star: tryParseFloat(star),
            level: tryParseFloat(level.replace("+", "")),
        });
        const types = ArtifactMain[type];
        if (!types.includes(main)) {
            data.main.type = types[0];
            Artifact.main(data);
        }
        return data.main;
    },
    sub([type, value]: [BonusType, string]): BonusValue {
        if (ArtifactSub.includes(type)) {
            return { type: type, value: tryParseFloat(value) };
        }
        return { type: ArtifactSub[0], value: 0 };
    },
    toVer100(before: DatabaseV002): Database {
        let after = convert();
        before.chara.forEach((chara, index) => {
            if (chara.name in CharaList) {
                const info = CharaList[chara.name];
                after.chara.push({
                    id: `chara002_${index}`,
                    name: chara.name,
                    comment: "",
                    conste: tryParseFloat(chara.conste),
                    level: chara.level,
                    hp: tryParseFloat(chara.hp),
                    atk: tryParseFloat(chara.atk),
                    def: tryParseFloat(chara.def),
                    special: {
                        type: info.special,
                        value: ascension.calc8(chara.level, info.spvalue)
                    },
                    combat: tryParseFloat(chara.combat),
                    skill: tryParseFloat(chara.skill),
                    burst: tryParseFloat(chara.burst),
                });
            }
        });
        for (const type of WeaponTypes) {
            const weapons = WeaponList[type];
            before[type].forEach((weapon, index) => {
                if (weapon.name in weapons) {
                    const info = weapons[weapon.name];
                    after[type].push({
                        id: `${type}002_${index}`,
                        name: weapon.name,
                        comment: "",
                        rank: tryParseFloat(weapon.rank),
                        level: weapon.level,
                        atk: tryParseFloat(weapon.atk),
                        second: {
                            type: info.second,
                            value: ascension.calc8(weapon.level, info.secval)
                        },
                    });
                }
            });
        }
        for (const type of ArtifactTypes) {
            before[type].forEach((artifact, index) => {
                if (ArtifactNames.includes(artifact.name)) {
                    after[type].push({
                        id: `${type}002_${index}`,
                        name: artifact.name,
                        comment: "",
                        star: tryParseFloat(artifact.star),
                        level: tryParseFloat(artifact.level),
                        main: ver002.main(type, artifact),
                        sub1: ver002.sub(artifact.sub1),
                        sub2: ver002.sub(artifact.sub2),
                        sub3: ver002.sub(artifact.sub3),
                        sub4: ver002.sub(artifact.sub4),
                    });
                }
            });
        }
        before.equip.forEach((equip, index) => {
            let data = {
                id: `equip002_${index}`,
                comment: "",
                chara: "",
                weapon: "",
                flower: "",
                feather: "",
                sands: "",
                goblet: "",
                circlet: ""
            };
            // キャラの検索
            let id = "chara002_" + equip.chara;
            const chara = after.chara.find(item => item.id === id);
            if (chara) {
                data.chara = id;
                // 武器の検索
                const weapon = CharaList[chara.name].weapon;
                id = weapon + "002_" + equip.weapon;
                if (after[weapon].find(item => item.id === id)) {
                    data.weapon = id;
                }
                // 聖遺物の検索
                for (const artifact of ArtifactTypes) {
                    id = artifact + "002_" + equip[artifact];
                    if (after[artifact].find(item => item.id === id)) {
                        data[artifact] = id;
                    }
                }
                after.equip.push(data);
            }
        });
        return after;
    },
} as const;

const ver100 = {
    initial() {
        return {
            initial: {
                chara: {
                    conste: 0,
                    level: "1",
                    combat: 1,
                    skill: 1,
                    burst: 1,
                },
                weapon: {
                    rank: 1,
                    level: "1",
                },
                artifact: {
                    star: 3,
                    level: 0,
                },
            }
        };
    }
} as const;

export default function convert(data?: DatabaseV002 | DatabaseV100): Database {
    if (data) {
        if (data.ver) {
            if (data.ver === "0.02") {
                return ver002.toVer100(data);
            }
        }
        const version = data.version;
        if (version) {
            let def = convert();
            switch (version) {
                case "1.0":
                    data.setting = {
                        ...def.setting,
                        ...data.setting,
                        ...ver100.initial(),
                    };
                // fallthrough
                case "1.1":
                    return {
                        ...def,
                        ...data,
                    };
            }
            console.warn("Unkonwn version: " + version);
            return data;
        }
    }
    return {
        version: CurrentVersion,
        chara: [],
        sword: [],
        claymore: [],
        polearm: [],
        bow: [],
        catalyst: [],
        flower: [],
        feather: [],
        sands: [],
        goblet: [],
        circlet: [],
        equip: [],
        team: [],
        bonus: {},
        damage: [],
        setting: {
            autosave: true,
            artifact: "",
            critical: "",
            ...ver100.initial(),
        },
    };
}

export const Database = {
    name: "global_data",
    save(data: Database) {
        localStorage.setItem(Database.name, JSON.stringify(data));
    },
    reset(data: Database) {
        for (const type of DBTableTypes) {
            if (type !== "setting") {
                let items = data[type];
                if (Array.isArray(items)) {
                    items.splice(0);
                }
            }
        }
        localStorage.removeItem(Database.name);
    },
} as const;
