import { ArtifactType } from "~/src/const";
import { ICommentable, IIdentify } from "~/src/interface";

export interface IEquipData extends IIdentify, ICommentable, Record<ArtifactType, string> {
    chara: string;
    weapon: string;
}
export type DBEquipTable = { equip: IEquipData[]; };

// IEquipDataのユーティリティクラス
export default class Equip {
    public static create(id: string, chara: string): IEquipData {
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
    }
}
