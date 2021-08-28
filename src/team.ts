import { TranslateResult } from "vue-i18n";
import * as konst from "~/src/const";
import { ArtifactName, GlobalArtifactData } from "./artifact";
import { GlobalCharaData, CharaList, ICharaData } from "./character";
import { GlobalEquipData, ICharacter, IEquipData, IIdentify, INameable } from "./interface";
import { GlobalWeaponData, IWeaponData } from "./weapon";

export const Members = ["member1", "member2", "member3", "member4"] as const;

export interface ITeamData extends IIdentify, INameable, Record<typeof Members[number], string> {
    resonance: konst.ElementType[];
}
export type GlobalTeamData = { team: ITeamData[]; };

export function getTeamName(text: TranslateResult, data: ITeamData, idx: number) {
    return data.name || `${text}${idx + 1}`;
}

export type Member = {
    readonly info?: ICharacter;
    readonly chara?: ICharaData;
    readonly equip?: IEquipData;
};

export function getMember(id: string, { equip, chara }: GlobalEquipData & GlobalCharaData): Member {
    if (id) {
        const e = equip.find((val) => val.id === id);
        if (e) {
            const c = chara.find((val) => val.id === e.chara);
            if (c) {
                return { info: CharaList[c.name], chara: c, equip: e };
            }
        }
    }
    return { };
}

export type Weapon = {
    readonly type: konst.WeaponType;
    readonly data?: IWeaponData;
};

export function getWeapon(info: ICharacter, equip: IEquipData, globals: GlobalWeaponData): Weapon {
    const type = info.weapon;
    const data = globals[type].find(
        (val) => val.id === equip.weapon
    );
    return { type, data };
}

export function getArtifacts(equip: IEquipData, globals: GlobalArtifactData): ArtifactName[] {
    let ret: ArtifactName[] = [];
    for (const type of konst.ArtifactTypes) {
        const id = equip[type];
        const data = globals[type].find((val) => val.id === id);
        if (data) {
            ret.push(data.name);
        }
    }
    return ret;
}
