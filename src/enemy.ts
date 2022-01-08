import { ElementType, NoneElementType } from "~/src/const";
import { INameable } from "~/src/interface";

export type Phase = {
    readonly label: string;
    readonly fixed: number;
};

export interface IEnemyInfo {
    readonly unique?: boolean;
    readonly custom?: boolean;
    readonly resist: ReadonlyRecord<ElementType, number>;
    readonly element?: ReadonlyArray<ElementType>;
    readonly count?: number;
    readonly value?: number;
    readonly phase?: ReadonlyArray<Phase>;
}

export const EnemyNames = [
    "Slime",
    "Specters",
    "Hilichurl",
    "Mitachurl",
    "Samachurl",
    "Lawachurl",
    "RuinGuard",
    "RuinGrader",
    "RuinHunter",
    "RuinCruiser",
    "RuinDestroyer",
    "RuinDefender",
    "RuinScout",
    "WhopperFlower",
    "FatuiSkirmisher",
    "FatuiAgent",
    "FatuiCicinMage",
    "FatuiMirrorMaiden",
    "TreasureHoarder",
    "Nobushi",
    "Kairagi",
    "RifthoundWhelpBefore",
    "RifthoundWhelp",
    "RifthoundBefore",
    "Rifthound",
    "GeovishapHatchling",
    "Geovishap",
    "BathysmalVishapHatchling",
    "AbyssMage",
    "AbyssHeralds", // TODO: s削除
    "AbyssLectors", // TODO: s削除
    "EyeoftheStorm",
    "Cicin",
    "SnowboarKing",
    "Hypostasis",
    "Oceanid",
    "Regisvine",
    "PrimoGeovishap",
    "BathysmalVishap",
    "MaguuKenki",
    "PerpetualArray",
    "GoldenWolflord",
    "GoldenWolflordLow",
    "Dvalin",
    "Andrius",
    "Tartaglia1",
    "Tartaglia2",
    "Tartaglia3",
    "Azhdaha1",
    "Azhdaha2",
    "Azhdaha3",
    "Signora1",
    "Signora2",
] as const;
export type EnemyName = typeof EnemyNames[number];

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
    Specters: {
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
            ElementType.Elect,
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
    RuinCruiser: {
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
    RuinDestroyer: {
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
    RuinDefender: {
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
    RuinScout: {
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
            ElementType.Elect,
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
    FatuiMirrorMaiden: {
        resist: {
            pyro: 10,
            hydro: 50,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20,
        },
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
    Nobushi: {
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
    Kairagi: {
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
    RifthoundWhelpBefore: {
        resist: {
            pyro: 20,
            hydro: 20,
            dendro: 20,
            elect: 20,
            anemo: 20,
            cryo: 20,
            geo: 20,
            phys: 20
        },
    },
    RifthoundWhelp: {
        resist: {
            pyro: 20,
            hydro: 20,
            dendro: 20,
            elect: 20,
            anemo: 20,
            cryo: 20,
            geo: 20,
            phys: 20
        },
        element: [
            ElementType.Elect,
            ElementType.Geo,
        ],
        value: -30,
    },
    RifthoundBefore: {
        resist: {
            pyro: 25,
            hydro: 25,
            dendro: 25,
            elect: 25,
            anemo: 25,
            cryo: 25,
            geo: 25,
            phys: 25
        },
        element: [
            ElementType.Elect,
            ElementType.Geo,
        ],
        value: -65,
    },
    Rifthound: {
        resist: {
            pyro: 25,
            hydro: 25,
            dendro: 25,
            elect: 25,
            anemo: 25,
            cryo: 25,
            geo: 25,
            phys: 25
        },
        element: [
            ElementType.Elect,
            ElementType.Geo,
        ],
        value: -65,
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
    BathysmalVishapHatchling: {
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
        element: [
            ElementType.Hydro,
            ElementType.Elect,
            ElementType.Cryo,
        ],
        value: 10,
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
    AbyssHeralds: {
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
    AbyssLectors: {
        custom: true,
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
            ElementType.Elect,
        ],
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
            ElementType.Hydro,
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
            phys: 10,
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
    BathysmalVishap: {
        custom: true,
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
        element: [
            ElementType.Hydro,
            ElementType.Elect,
            ElementType.Cryo,
        ],
        value: 20,
    },
    MaguuKenki: {
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
    PerpetualArray: {
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
        phase: [
            { label: "enemy.down", fixed: -50 },
        ],
    },
    GoldenWolflord: {
        resist: {
            pyro: 25,
            hydro: 25,
            dendro: 25,
            elect: 25,
            anemo: 25,
            cryo: 25,
            geo: 25,
            phys: 25,
        },
        phase: [
            { label: "enemy.enter", fixed: 200 },
        ],
    },
    GoldenWolflordLow: {
        resist: {
            pyro: 25,
            hydro: 25,
            dendro: 25,
            elect: 25,
            anemo: 25,
            cryo: 25,
            geo: -40,
            phys: 25,
        },
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
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 70,
            phys: 40
        },
    },
    Azhdaha2: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 70,
            phys: 40
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
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 70,
            phys: 40
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
    Signora1: {
        resist: {
            pyro: 10,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 50,
            geo: 10,
            phys: 10
        },
    },
    Signora2: {
        resist: {
            pyro: 70,
            hydro: 10,
            dendro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
} as const;

export interface IEnemyData extends INameable {
    name: EnemyName;
    elem: NoneElementType;
    level: number;
    fixed: number;
}
