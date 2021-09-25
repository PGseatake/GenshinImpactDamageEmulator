import { ElementType, NoneElementType } from "~/src/const";
import { INameable } from "~/src/interface";

export type Phase = {
    readonly label: string;
    readonly fixed: number;
};

export interface IEnemyInfo {
    readonly unique?: boolean;
    readonly resist: ReadonlyRecord<ElementType, number>;
    readonly element?: ReadonlyArray<ElementType>;
    readonly count?: number;
    readonly value?: number;
    readonly phase?: ReadonlyArray<Phase>;
}

export const EnemyNames = [
    "Slime",
    "Hilichurl",
    "Mitachurl",
    "Samachurl",
    "Lawachurl",
    "RuinGuard",
    "RuinGrader",
    "RuinHunter",
    "WhopperFlower",
    "FatuiSkirmisher",
    "FatuiAgent",
    "FatuiCicinMage",
    "TreasureHoarder",
    "GeovishapHatchling",
    "Geovishap",
    "AbyssMage",
    "EyeoftheStorm",
    "Cicin",
    "SnowboarKing",
    "Hypostasis",
    "Oceanid",
    "Regisvine",
    "PrimoGeovishap",
    "Dvalin",
    "Andrius",
    "Tartaglia1",
    "Tartaglia2",
    "Tartaglia3",
    "Azhdaha1",
    "Azhdaha2",
    "Azhdaha3",
] as const;
export type EnemyName = typeof EnemyNames[number];

// https://bbs.mihoyo.com/ys/article/2160993
export const EnemyList: ReadonlyRecord<EnemyName, IEnemyInfo> = {
    Slime: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10,
        },
        element: [
            ElementType.Pyro,
            ElementType.Hydro,
            ElementType.Dendro,
            ElementType.Elect,
            ElementType.Anemo,
            ElementType.Cryo,
            ElementType.Geo,
        ],
        value: Infinity,
    },
    Hilichurl: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10,
        },
    },
    Mitachurl: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 30,
        },
    },
    Samachurl: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10,
        },
        element: [
            ElementType.Pyro,
            ElementType.Hydro,
            ElementType.Dendro,
            ElementType.Elect,
            ElementType.Anemo,
            ElementType.Cryo,
            ElementType.Geo,
        ],
        value: 40,
    },
    Lawachurl: {
        unique: true,
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 50,
        },
        element: [
            ElementType.Cryo,
            ElementType.Geo,
        ],
        value: 60,
    },
    RuinGuard: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 70,
        },
    },
    RuinGrader: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 70,
        },
    },
    RuinHunter: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 50,
        },
    },
    WhopperFlower: {
        resist: {
            pyro: 35,
            hydro: 35,
            dendro: 35,
            elect: 35,
            anemo: 35,
            cryo: 35,
            geo: 35,
            phys: 35
        },
        element: [
            ElementType.Pyro,
            ElementType.Cryo,
        ],
        value: 40,
        phase: [
            { label: "enemy.down", fixed: -25 },
        ],
    },
    FatuiSkirmisher: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20,
        },
        phase: [
            { label: "enemy.shield", fixed: 100 },
        ],
    },
    FatuiAgent: {
        resist: {
            pyro: 50,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20,
        },
    },
    FatuiCicinMage: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20,
        },
        element: [
            ElementType.Elect,
            ElementType.Cryo,
        ],
        value: 40,
    },
    TreasureHoarder: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20,
        },
    },
    GeovishapHatchling: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30,
        },
    },
    Geovishap: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30,
        },
        element: [
            ElementType.Pyro,
            ElementType.Hydro,
            ElementType.Elect,
            ElementType.Cryo,
        ],
        value: 20,
    },
    AbyssMage: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10,
        },
    },
    EyeoftheStorm: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: Infinity,
            cryo: 10,
            geo: 10,
            phys: 10,
        },
    },
    Cicin: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -50,
        },
        element: [
            ElementType.Hydro,
            ElementType.Elect,
            ElementType.Cryo,
        ],
        value: 40,
    },
    SnowboarKing: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 30,
            geo: 10,
            phys: 50,
        },
    },
    Hypostasis: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10,
        },
        element: [
            ElementType.Elect,
            ElementType.Anemo,
            ElementType.Cryo,
            ElementType.Geo,
        ],
        value: Infinity,
    },
    Oceanid: {
        resist: {
            pyro: 10,
            hydro: Infinity,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 15,
        },
    },
    Regisvine: {
        unique: true,
        resist: {
            pyro: 110,
            hydro: 110,
            dendro: 110,
            elect: 110,
            anemo: 110,
            cryo: 110,
            geo: 110,
            phys: 130,
        },
        element: [
            ElementType.Pyro,
            ElementType.Cryo,
        ],
        value: 60,
        phase: [
            { label: "enemy.down", fixed: -100 },
        ],
    },
    PrimoGeovishap: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30,
        },
        element: [
            ElementType.Pyro,
            ElementType.Hydro,
            ElementType.Elect,
            ElementType.Cryo,
        ],
        value: 20,
        phase: [
            { label: "enemy.down", fixed: -50 },
            { label: "enemy.wakeup", fixed: 200 },
        ],
    },
    Dvalin: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10,
        },
    },
    Andrius: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: Infinity,
            cryo: Infinity,
            geo: 10,
            phys: 10,
        },
    },
    Tartaglia1: {
        resist: {
            pyro: 0,
            hydro: 50,
            dendro: 0,
            elect: 0,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0,
        },
        phase: [
            { label: "enemy.down", fixed: -30 },
        ],
    },
    Tartaglia2: {
        resist: {
            pyro: 0,
            hydro: 0,
            dendro: 0,
            elect: 50,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0
        },
        phase: [
            { label: "enemy.down", fixed: -50 },
        ],
    },
    Tartaglia3: {
        resist: {
            pyro: 70,
            hydro: 0,
            dendro: 0,
            elect: 70,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0
        },
    },
    Azhdaha1: {
        resist: {
            pyro: 40,
            hydro: 40,
            dendro: 40,
            elect: 40,
            anemo: 40,
            cryo: 40,
            geo: 100,
            phys: 10
        },
    },
    Azhdaha2: {
        resist: {
            pyro: 40,
            hydro: 40,
            dendro: 40,
            elect: 40,
            anemo: 40,
            cryo: 40,
            geo: 100,
            phys: 10
        },
        element: [
            ElementType.Pyro,
            ElementType.Hydro,
            ElementType.Elect,
            ElementType.Cryo,
        ],
        value: 60,
    },
    Azhdaha3: {
        resist: {
            pyro: 40,
            hydro: 40,
            dendro: 40,
            elect: 40,
            anemo: 40,
            cryo: 40,
            geo: 100,
            phys: 10
        },
        element: [
            ElementType.Pyro,
            ElementType.Hydro,
            ElementType.Elect,
            ElementType.Cryo,
        ],
        count: 2,
        value: 50,
    },
} as const;

export interface IEnemyData extends INameable {
    name: EnemyName;
    elem: NoneElementType;
    level: number;
    fixed: number;
}
