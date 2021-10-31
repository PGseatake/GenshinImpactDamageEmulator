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

export interface IMember {
    info: ICharaInfo | null;
    chara: ICharaData | null;
    equip: IEquipData | null;
}

export class Member {
    public info: ICharaInfo | null;
    public chara: ICharaData | null;
    public equip: IEquipData | null;

    constructor({ info, chara, equip }: IMember) {
        this.info = info;
        this.chara = chara;
        this.equip = equip;
    }

    weapon(db: DBWeaponTable): { type: WeaponType, data?: IWeaponData; } {
        const id = this.equip!.weapon;
        const type = this.info!.weapon;
        const data = db[type].find((val) => val.id === id);
        return { type, data };
    }

    artifacts(db: DBArtifactTable): IArtifactData[] {
        let list: IArtifactData[] = [];
        for (const type of ArtifactTypes) {
            const id = this.equip![type];
            const data = db[type].find((val) => val.id === id);
            if (data) {
                list.push(data);
            }
        }
        return list;
    }

    static find(id: string, { equip, chara }: DBEquipTable & DBCharaTable) {
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
}
