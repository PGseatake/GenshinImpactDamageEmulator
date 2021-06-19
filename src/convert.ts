import * as ascension from "./ascension";
import { GlobalData, IBonusValueData } from "./interface";
import { ArtifactType, ArtifactTypes, BonusType, WeaponTypes } from "./const";
import { ArtifactMain, ArtifactName, ArtifactNames, ArtifactSub, calcMain } from "./artifact";
import { CharaList, CharaName } from "./character";
import { WeaponList } from "./weapon";

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
type GlobalDataV002 = {
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
};

type GlobalDataV1xx = { ver: undefined; };
type GlobalDataV100 = GlobalDataV1xx & GlobalData;

export function makeUniqueId() {
    return Date.now().toString(16) +
        Math.floor(0xFFFF * Math.random()).toString(16);
}

function tryParseFloat(val: string) {
    const num = parseFloat(val);
    if (isNaN(num)) {
        return 0;
    }
    return num;
}

const ver002 = {
    main(type: ArtifactType, { main, star, level }: IArtifactV002): IBonusValueData {
        const s = tryParseFloat(star);
        const l = tryParseFloat(level.replace("+", ""));
        const artifactMain = ArtifactMain[type];
        if (artifactMain.includes(main)) {
            return {
                type: main,
                value: calcMain(main, s, l)
            };
        }
        return {
            type: artifactMain[0],
            value: calcMain(artifactMain[0], s, l)
        };
    },
    sub([type, value]: [BonusType, string]): IBonusValueData {
        if (ArtifactSub.includes(type)) {
            return { type: type, value: tryParseFloat(value) };
        }
        return { type: ArtifactSub[0], value: 0 };
    }
};
function Ver002toVer100(data: GlobalDataV002): GlobalData {
    let raw = convert();
    for (const chara of data.chara) {
        if (chara.name in CharaList) {
            const info = CharaList[chara.name];
            raw.chara.push({
                id: makeUniqueId(),
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
    }
    for (const type of WeaponTypes) {
        const weapons = WeaponList[type];
        for (const weapon of data[type]) {
            if (weapon.name in weapons) {
                const info = weapons[weapon.name];
                raw[type].push({
                    id: makeUniqueId(),
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
        }
    }
    for (const type of ArtifactTypes) {
        for (const artifact of data[type]) {
            if (ArtifactNames.includes(artifact.name)) {
                raw[type].push({
                    id: makeUniqueId(),
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
        }
    }
    return raw;
}

export function convert(data?: GlobalDataV002 | GlobalDataV100): GlobalData {
    if (data) {
        if (data.ver) {
            if (data.ver === "0.02") {
                return Ver002toVer100(data);
            }
        } else if (data.version) {
            if (data.version === "1.0") {
                return data;
            }
        }
    }
    return {
        version: "1.0",
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
    };
}
