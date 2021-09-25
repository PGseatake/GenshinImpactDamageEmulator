import { TranslateResult } from "vue-i18n";
import { ElementType, WeaponType, ArtifactTypes } from "~/src/const";
import { ICharaInfo, IIdentify, INameable, IEquipData, DBEquipTable } from "~/src/interface";
import { CharaList, ICharaData, DBCharaTable } from "~/src/character";
import { IArtifactData, DBArtifactTable } from "~/src/artifact";
import { IWeaponData, DBWeaponTable } from "~/src/weapon";

export const Members = ["member1", "member2", "member3", "member4"] as const;

export interface ITeamData extends IIdentify, INameable, Record<typeof Members[number], string> {
    resonance: ElementType[];
}
export type DBTeamTable = { team: ITeamData[]; };

export function getTeamName(text: TranslateResult, data: ITeamData, idx: number) {
    return data.name || `${text}${idx + 1}`;
}

export type Member = {
    info: ICharaInfo | null;
    chara: ICharaData | null;
    equip: IEquipData | null;
};

export function getMember(id: string, { equip, chara }: DBEquipTable & DBCharaTable): Member {
    if (id) {
        const e = equip.find((val) => val.id === id);
        if (e) {
            const c = chara.find((val) => val.id === e.chara);
            if (c) {
                return { info: CharaList[c.name], chara: c, equip: e };
            }
        }
    }
    return { info: null, chara: null, equip: null };
}

export type Weapon = {
    readonly type: WeaponType;
    readonly data?: IWeaponData;
};

export function getWeapon(info: ICharaInfo, equip: IEquipData, db: DBWeaponTable): Weapon {
    const type = info.weapon;
    const data = db[type].find(
        (val) => val.id === equip.weapon
    );
    return { type, data };
}

export function getArtifacts(equip: IEquipData, db: DBArtifactTable): IArtifactData[] {
    let ret: IArtifactData[] = [];
    for (const type of ArtifactTypes) {
        const id = equip[type];
        const data = db[type].find((val) => val.id === id);
        if (data) {
            ret.push(data);
        }
    }
    return ret;
}
