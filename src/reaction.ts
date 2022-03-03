import { ElementType, EnchantType, AnyReactionType, ReactionType, WeaponType } from "~/src/const";
import { ICharaInfo } from "~/src/interface";

export type AmplifyReactionType = "vaporize" | "melt";
export type TransformReactionType = "burning" | "swirl" | "echarge" | "shutter" | "conduct" | "overload";

type ReactionFactor = {
    readonly resist: ElementType;
    readonly values: ReadonlyArray<number>;
};

export default class Reaction {
    public static Scale: ReadonlyPartial<Record<ElementType, ReadonlyPartial<Record<ReactionType, number>>>> = {
        pyro: {
            "vaporize": 1.5,
            "overload": 1.0,
            "melt": 2.0,
        },
        hydro: {
            "vaporize": 2.0,
            "echarge": 1.0,
        },
        elect: {
            "overload": 1.0,
            "echarge": 1.0,
            "conduct": 1.0,
        },
        cryo: {
            "melt": 1.5,
            "conduct": 1.0,
        },
        anemo: {
            "swirl": 1.0,
        }
    };

    public static Factor: ReadonlyRecord<TransformReactionType, ReactionFactor> = {
        "burning": {
            resist: ElementType.Pyro,
            values: [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            ]
        },
        "conduct": {
            resist: ElementType.Cryo,
            values: [
                8, 9, 9, 10, 11, 12, 12, 13, 16, 17,
                18, 20, 22, 23, 27, 29, 31, 34, 37, 40,
                42, 46, 48, 51, 53, 56, 59, 61, 64, 68,
                71, 74, 77, 80, 84, 88, 91, 96, 99, 103,
                107, 111, 117, 121, 128, 133, 140, 147, 154, 161,
                168, 174, 182, 189, 199, 208, 217, 226, 236, 246,
                257, 269, 282, 296, 311, 326, 339, 353, 368, 382,
                397, 412, 426, 438, 457, 473, 489, 506, 522, 538,
                554, 571, 588, 604, 627, 644, 662, 681, 702, 723,
            ]
        },
        "swirl": {
            resist: ElementType.Anemo,
            values: [
                10, 11, 11, 12, 13, 14, 16, 17, 18, 20,
                22, 23, 27, 29, 32, 34, 38, 41, 44, 48,
                51, 54, 58, 61, 64, 68, 70, 73, 78, 81,
                86, 89, 92, 97, 101, 106, 110, 114, 119, 123,
                129, 134, 140, 146, 153, 161, 169, 177, 184, 193,
                201, 210, 218, 227, 239, 249, 260, 271, 283, 296,
                308, 323, 339, 354, 374, 390, 407, 424, 441, 459,
                477, 494, 510, 526, 548, 568, 587, 607, 627, 646,
                666, 686, 706, 726, 752, 773, 794, 818, 842, 868,
            ]
        },
        "echarge": {
            resist: ElementType.Elect,
            values: [
                20, 22, 23, 24, 27, 29, 31, 34, 37, 40,
                44, 48, 53, 58, 64, 70, 77, 83, 90, 97,
                103, 110, 117, 123, 130, 136, 141, 147, 156, 163,
                171, 178, 186, 193, 202, 211, 220, 230, 239, 248,
                258, 269, 280, 291, 307, 322, 338, 353, 370, 388,
                403, 420, 437, 453, 478, 499, 521, 543, 567, 591,
                616, 647, 678, 710, 749, 781, 814, 849, 883, 918,
                953, 989, 1021, 1052, 1097, 1136, 1174, 1213, 1253, 1292,
                1331, 1371, 1411, 1451, 1504, 1547, 1590, 1636, 1686, 1736,
            ]
        },
        "shutter": {
            resist: ElementType.Phys,
            values: [
                26, 28, 29, 31, 33, 37, 39, 42, 47, 51,
                56, 60, 67, 72, 80, 88, 96, 104, 112, 120,
                129, 137, 146, 153, 162, 169, 177, 184, 194, 203,
                213, 223, 232, 242, 253, 264, 276, 287, 299, 310,
                322, 336, 350, 364, 383, 402, 422, 442, 463, 484,
                504, 526, 547, 568, 598, 624, 651, 679, 709, 739,
                770, 808, 848, 888, 936, 977, 1019, 1061, 1104, 1148,
                1191, 1237, 1277, 1316, 1371, 1420, 1469, 1517, 1567, 1616,
                1664, 1714, 1764, 1814, 1880, 1933, 1988, 2044, 2107, 2170,
            ]
        },
        "overload": {
            resist: ElementType.Pyro,
            values: [
                33, 37, 39, 42, 44, 49, 52, 57, 62, 68,
                73, 81, 89, 97, 107, 118, 128, 139, 150, 161,
                172, 183, 194, 206, 217, 226, 236, 246, 259, 272,
                284, 298, 310, 323, 338, 352, 368, 383, 399, 414,
                430, 448, 467, 487, 511, 537, 562, 590, 618, 647,
                673, 700, 729, 757, 797, 832, 868, 906, 944, 986,
                1027, 1078, 1130, 1184, 1248, 1302, 1359, 1416, 1472, 1531,
                1589, 1649, 1702, 1754, 1828, 1893, 1958, 2022, 2089, 2154,
                2219, 2286, 2352, 2420, 2507, 2578, 2650, 2727, 2810, 2893,
            ]
        },
    };

    public static isAmplify(type: ReactionType): type is AmplifyReactionType {
        switch (type) {
            case ReactionType.Vaporize:
            case ReactionType.Melt:
                return true;
        };
        return false;
    }

    public static enumerate(chara: ICharaInfo | null, enchant: EnchantType) {
        let types: ReactionType[] = [];
        if (chara) {
            let elems = [chara.element];
            if (enchant && (enchant !== chara.element)) {
                elems.push(enchant);
            }

            for (const elem of elems) {
                const scales = Reaction.Scale[elem];
                if (scales) {
                    // 元素反応を追加
                    for (const type in scales) {
                        types.push(type as ReactionType);
                    }
                }

                // 氷砕きを追加
                if (elem === ElementType.Geo) {
                    types.push(ReactionType.Shutter);
                } else if (chara.weapon === WeaponType.Claymore) {
                    types.push(ReactionType.Shutter);
                }
            }
        }
        return types;
    }

    public static normalize(type: AnyReactionType, elem: ElementType) {
        if (type === ReactionType.Shutter) {
            switch (elem) {
                case ElementType.Phys:
                case ElementType.Geo:
                    return type;
            }
        } else if (elem !== ElementType.Phys) {
            return type;
        }
        return "";
    }
}
