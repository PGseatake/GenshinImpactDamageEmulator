import { IVueI18n } from "vue-i18n/types";
import { ElementType, WeaponType, ArtifactTypes } from "~/src/const";
import { ICharaInfo, IIdentify, INameable } from "~/src/interface";
import { DBCharaTable, ICharaData, CharaList } from "~/src/character";
import { DBArtifactTable, IArtifactData } from "~/src/artifact";
import { DBWeaponTable, IWeaponData } from "~/src/weapon";
import { DBEquipTable, IEquipData } from "./equipment";

export const Members = ["member1", "member2", "member3", "member4"] as const;

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

export type TeamMember = {
    team: string;
    member: string;
};

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

    public static create(id: string, member: string): ITeamData {
        return {
            id,
            name: "",
            member1: member,
            member2: "",
            member3: "",
            member4: "",
            resonance: [],
        };
    }

    public static format(data: Readonly<ITeamData>, index: number, i18n: IVueI18n) {
        return data.name || `${i18n.t("menu.team")}${index + 1}`;
    }

    public static resonance(data: ITeamData, db: DBEquipTable & DBCharaTable) {
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
    }

    public static delegate(teams: ReadonlyArray<ITeamData>, data?: TeamMember): TeamMember | undefined {
        if (data) {
            const team = data.team;
            const t = teams.find((val) => val.id === team);
            if (t) {
                const select = data.member;
                let member = "";
                for (const m of new Team(t).member) {
                    if (m === select) {
                        // 変更なし
                        return undefined;
                    }
                    member = member || m;
                }
                // メンバー交代
                return { team, member };
            }
        }

        for (const t of teams) {
            for (const member of new Team(t).member) {
                // チーム交代
                return { team: t.id, member };
            }
        }
        // チームなし
        return { team: "", member: "" };
    }
}
