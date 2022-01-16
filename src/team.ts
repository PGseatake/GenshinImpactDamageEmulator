import { IVueI18n } from "vue-i18n/types";
import { ElementType, WeaponType, ArtifactTypes } from "~/src/const";
import { ICharaInfo, IIdentify, INameable, IEquipData, DBEquipTable } from "~/src/interface";
import { CharaList, ICharaData, DBCharaTable } from "~/src/character";
import { IArtifactData, DBArtifactTable } from "~/src/artifact";
import { IWeaponData, DBWeaponTable } from "~/src/weapon";

const Members = ["member1", "member2", "member3", "member4"] as const;

export interface ITeamData extends IIdentify, INameable, Record<typeof Members[number], string> {
    resonance: ElementType[];
}
export type DBTeamTable = { team: ITeamData[]; };

export interface IMember {
    info: ICharaInfo | null;
    chara: ICharaData | null;
    equip: IEquipData | null;
}
export interface IRequiredMember {
    info: ICharaInfo;
    chara: ICharaData;
    equip: IEquipData;
}

// IMemberのユーティリティクラス
export class Member {
    public info: ICharaInfo;
    public chara: ICharaData;
    public equip: IEquipData;

    constructor({ info, chara, equip }: IRequiredMember) {
        this.info = info;
        this.chara = chara;
        this.equip = equip;
    }

    weapon(db: DBWeaponTable): { type: WeaponType, data?: IWeaponData; } {
        const id = this.equip.weapon;
        const type = this.info.weapon;
        const data = db[type].find((val) => val.id === id);
        return { type, data };
    }

    artifact(db: DBArtifactTable): IArtifactData[] {
        let list: IArtifactData[] = [];
        for (const type of ArtifactTypes) {
            const id = this.equip[type];
            const data = db[type].find((val) => val.id === id);
            if (data) {
                list.push(data);
            }
        }
        return list;
    }
}

// ITeamDataのユーティリティクラス
export class Team {
    public data: ITeamData;
    public member: string[];

    constructor(data: ITeamData) {
        this.data = data;
        this.member = [];
        for (const m of Members) {
            if (data[m]) {
                this.member.push(data[m]);
            }
        }
    }

    public getName(i18n: IVueI18n, idx: number) {
        return this.data.name || `${i18n.t("menu.team")}${idx + 1}`;
    }

    public * members({ equip, chara }: DBEquipTable & DBCharaTable) {
        for (const id of this.member) {
            const e = equip.find((val) => val.id === id);
            if (e) {
                const c = chara.find((val) => val.id === e.chara);
                if (c) {
                    yield { info: CharaList[c.name], chara: c, equip: e };
                }
            }
        }
    }
}

export const Builder = {
    equip(id: string, chara: string): IEquipData {
        return {
            id,
            comment: "",
            chara,
            weapon: "",
            flower: "",
            feather: "",
            sands: "",
            goblet: "",
            circlet: "",
        };
    },
    team(id: string, member: string): ITeamData {
        return {
            id,
            name: "",
            member1: member,
            member2: "",
            member3: "",
            member4: "",
            resonance: [],
        };
    },
    resonance(data: ITeamData, db: DBEquipTable & DBCharaTable) {
        let elements: ElementType[] = [];
        for (const { info } of new Team(data).members(db)) {
            elements.push(info.element);
        }
        elements.sort();
        data.resonance.splice(0);

        const count = elements.length;
        let first = 0;
        while (first < count) {
            let type = elements[first];
            let last = elements.lastIndexOf(type) + 1;
            // 元素共鳴追加
            if (2 <= last - first) {
                data.resonance.push(elements[first]);
            }
            first = last;
        }
    },
} as const;
