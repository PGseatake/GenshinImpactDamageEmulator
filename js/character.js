// TODO: 多言語対応（ソース全体）

const CHARACTER = {
    other: {
        name: "-",
        star: 1,
        element: "",
        weapon: "sword",
        // Lv[1, 20, 20+, 40, 40+, 50, 50+, 60, 60+, 70, 70+, 80, 80+, 90]
        hp: null,
        // Lv[1, 20, 20+, 40, 40+, 50, 50+, 60, 60+, 70, 70+, 80, 80+, 90]
        atk: null,
        // Lv[1, 20, 20+, 40, 40+, 50, 50+, 60, 60+, 70, 70+, 80, 80+, 90]
        def: null,
        special: "other",
        // Lv[1, 20+, 40+, 50+, 60+, 70+, 80+]
        spvalue: null,
        combat: null,
        skill: null,
        burst: null
    },
    TravelAnemo: {
        name: "旅人(風)",
        star: 5,
        element: "anemo",
        weapon: "sword",
        hp: [
            912, 2342,
            3024, 4529,
            5013, 5766,
            6411, 7164,
            7648, 8401,
            8885, 9638,
            10122, 10875
        ],
        atk: [
            18, 46,
            60, 88,
            98, 112,
            126, 140,
            149, 164,
            174, 188,
            198, 213
        ],
        def: [
            57, 147,
            190, 284,
            315, 362,
            405, 450,
            480, 527,
            558, 605,
            635, 682
        ],
        special: "atk_buf",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 44.5 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 43.4 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 53.0 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 58.3 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 70.8 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 55.9, value2: 72.2 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "初期切裂ダメージ", type: "skill", elem: "anemo", scale: "elem", value: 12.0 },
            { name: "最大切裂ダメージ", type: "skill", elem: "anemo", scale: "elem", value: 16.8 },
            { name: "初期爆風ダメージ", type: "skill", elem: "anemo", scale: "elem", value: 176 },
            { name: "最大爆風ダメージ", type: "skill", elem: "anemo", scale: "elem", value: 192 },
        ],
        burst: [
            { name: "竜巻ダメージ", type: "burst", elem: "anemo", scale: "elem", value: 80.8 },
            { name: "付加元素ダメージ", type: "burst", elem: "addem", scale: "elem", value: 24.8 },
        ]
    },
    TravelGeo: {
        name: "旅人(岩)",
        star: 5,
        element: "geo",
        weapon: "sword",
        hp: [
            912, 2342,
            3024, 4529,
            5013, 5766,
            6411, 7164,
            7648, 8401,
            8885, 9638,
            10122, 10875
        ],
        atk: [
            18, 46,
            60, 88,
            98, 112,
            126, 140,
            149, 164,
            174, 188,
            198, 213
        ],
        def: [
            57, 147,
            190, 284,
            315, 362,
            405, 450,
            480, 527,
            558, 605,
            635, 682
        ],
        special: "atk_buf",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 44.5 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 43.4 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 53.0 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 58.3 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 70.8 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 55.9, value2: 72.2 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "スキルダメージ	", type: "skill", elem: "geo", scale: "elem", value: 248 },
        ],
        burst: [
            { name: "地震波1回のダメージ", type: "burst", elem: "geo", scale: "elem", value: 148 },
        ]
    },
    Amber: {
        name: "アンバー",
        star: 4,
        element: "pyro",
        weapon: "bow",
        hp: [
            793, 2038,
            2630, 3940,
            4361, 5016,
            5578, 6233,
            6654, 7309,
            7730, 8385,
            8806, 9461
        ],
        atk: [
            19, 48,
            62, 93,
            103, 118,
            132, 147,
            157, 172,
            182, 198,
            208, 223
        ],
        def: [
            50, 129,
            167, 250,
            277, 318,
            354, 396,
            422, 464,
            491, 532,
            559, 601
        ],
        special: "atk_buf",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 36.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 36.1 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 46.4 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 47.3 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 59.3 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "pyro", scale: "elem", value: 124 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "爆発ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 123 },
        ],
        burst: [
            { name: "矢の雨1回のダメージ", type: "burst", elem: "pyro", scale: "elem", value: 28.1 },
            { name: "矢の雨の合計ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 505 },
        ]
    },
    Barbara: {
        name: "バーバラ",
        star: 4,
        element: "hydro",
        weapon: "catalyst",
        hp: [
            821, 2108,
            2721, 4076,
            4512, 5189,
            5770, 6448,
            6884, 7561,
            7996, 8674,
            9110, 9787
        ],
        atk: [
            14, 34,
            44, 67,
            74, 84,
            94, 105,
            112, 123,
            130, 141,
            149, 159
        ],
        def: [
            56, 144,
            186, 279,
            308, 355,
            394, 441,
            470, 517,
            546, 593,
            623, 669
        ],
        special: "hp_buf",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 37.8 },
            { name: "2段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 35.5 },
            { name: "3段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 41.0 },
            { name: "4段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 55.2 },
            { name: "重撃ダメージ", type: "heavy", elem: "hydro", scale: "elem", value: 166 },
            { name: "落下期間のダメージ", type: "normal", elem: "hydro", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "hydro", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "hydro", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "水玉ダメージ", type: "skill", elem: "hydro", scale: "elem", value: 58.4 },
        ],
        burst: []
    },
    Beidou: {
        name: "北斗",
        star: 4,
        element: "elect",
        weapon: "claymore",
        hp: [
            1094, 2811,
            3628, 5435,
            6015, 6919,
            7694, 8597,
            9178, 10081,
            10662, 11565,
            12146, 13050
        ],
        atk: [
            19, 49,
            63, 94,
            104, 120,
            133, 148,
            158, 174,
            184, 199,
            210, 225
        ],
        def: [
            54, 140,
            180, 270,
            299, 344,
            382, 427,
            456, 501,
            530, 575,
            603, 648
        ],
        special: "elect_dmg",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 71.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 70.9 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 88.3 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 86.5 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 112 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 56.2 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 102 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 74.6 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 149 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 186 },
        ],
        skill: [
            { name: "基礎ダメージ", type: "skill", elem: "elect", scale: "elem", value: 122 },
            { name: "被撃時ダメージ+1", type: "skill", elem: "elect", scale: "elem", value: 282 },
            { name: "被撃時ダメージ+2", type: "skill", elem: "elect", scale: "elem", value: 442 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "elect", scale: "elem", value: 122 },
            { name: "落雷ダメージ", type: "burst", elem: "elect", scale: "elem", value: 96 },
        ]
    },
    Bennett: {
        name: "ベネット",
        star: 4,
        element: "pyro",
        weapon: "sword",
        hp: [
            1039, 2670,
            3447, 5163,
            5715, 6573,
            7309, 8168,
            8719, 9577,
            10129, 10987,
            11539, 12397
        ],
        atk: [
            16, 41,
            53, 80,
            88, 102,
            113, 126,
            135, 148,
            156, 169,
            178, 191
        ],
        def: [
            65, 166,
            214, 321,
            356, 409,
            455, 508,
            542, 596,
            630, 684,
            718, 771
        ],
        special: "en_rec",
        spvalue: [0.0, 0.0, 6.6666666666, 13.3333333333, 13.3333333333, 20.0, 26.6666666666],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 44.5 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 42.7 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 54.6 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 59.7 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 71.9 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 55.9, value2: 60.7 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "1回押しダメージ", type: "skill", elem: "pyro", scale: "elem", value: 138 },
            { name: "1段チャージダメージ", type: "skill", elem: "pyro", scale: "elem", value: 84.0, value2: 92.0 },
            { name: "2段チャージダメージ", type: "skill", elem: "pyro", scale: "elem", value: 88.0, value2: 96.0 },
            { name: "爆発ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 132 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "pyro", scale: "elem", value: 233 },
        ]
    },
    Chongyun: {
        name: "重雲",
        star: 4,
        element: "cryo",
        weapon: "claymore",
        hp: [
            1003, 2366,
            3054, 4574,
            5063, 5824,
            6475, 7236,
            7725, 8485,
            8974, 9734,
            10223, 10984
        ],
        atk: [
            19, 48,
            62, 93,
            103, 119,
            132, 147,
            158, 172,
            182, 198,
            208, 223
        ],
        def: [
            54, 140,
            180, 270,
            299, 344,
            382, 427,
            456, 501,
            530, 575,
            603, 648
        ],
        special: "atk_buf",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 70.0 },
            { name: "2段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 63.1 },
            { name: "3段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 80.3 },
            { name: "4段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 101 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 56.3 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 102 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 74.6 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 149 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 186 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "cryo", scale: "elem", value: 172 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "cryo", scale: "elem", value: 142 },
        ]
    },
    Diluc: {
        name: "ディルック",
        star: 5,
        element: "pyro",
        weapon: "claymore",
        hp: [
            1011, 2621,
            3488, 5219,
            5834, 6712,
            7533, 8421,
            9036, 9932,
            10547, 11453,
            12068, 12981
        ],
        atk: [
            26, 68,
            90, 135,
            151, 173,
            195, 217,
            233, 256,
            272, 296,
            312, 335
        ],
        def: [
            61, 158,
            211, 315,
            352, 405,
            455, 509,
            546, 600,
            637, 692,
            729, 784
        ],
        special: "cri_rate",
        spvalue: [5.0, 5.0, 9.8, 14.6, 14.6, 19.4, 24.2],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 89.7 },
            { name: "2段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 87.6 },
            { name: "3段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 98.8 },
            { name: "4段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 134 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 68.8 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 125 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 89.5 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 179 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 224 },
        ],
        skill: [
            { name: "1段ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 94.4 },
            { name: "2段ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 97.6 },
            { name: "3段ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 129 }
        ],
        burst: [
            { name: "斬撃ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 204 },
            { name: "継続ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 60.0 },
            { name: "爆発ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 204 }
        ]
    },
    Diona: {
        name: "ディオナ",
        star: 4,
        element: "cryo",
        weapon: "bow",
        hp: [
            802, 2061,
            2661, 3985,
            4411, 5074,
            5642, 6305,
            6731, 7393,
            7818, 8481,
            8907, 9570
        ],
        atk: [
            18, 46,
            59, 89,
            98, 113,
            125, 140,
            149, 164,
            173, 188,
            198, 213
        ],
        def: [
            50, 129,
            167, 250,
            277, 319,
            354, 396,
            422, 464,
            491, 532,
            559, 601
        ],
        special: "cryo_dmg",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 36.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 33.5 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 45.6 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 43.0 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 53.8 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "cryo", scale: "elem", value: 124 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "キャッツクローダメージ", type: "skill", elem: "cryo", scale: "elem", value: 41.9 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "cryo", scale: "elem", value: 80 },
            { name: "エリアの継続ダメージ", type: "burst", elem: "cryo", scale: "elem", value: 52.6 },
        ]
    },
    Fischl: {
        name: "フィッシュル",
        star: 4,
        element: "elect",
        weapon: "bow",
        hp: [
            770, 1979,
            2555, 3827,
            4236, 4872,
            5418, 6054,
            6463, 7099,
            7508, 8144,
            8553, 9189
        ],
        atk: [
            21, 53,
            68, 102,
            113, 130,
            144, 161,
            172, 189,
            200, 216,
            227, 245
        ],
        def: [
            50, 128,
            165, 247,
            274, 315,
            350, 391,
            418, 459,
            485, 526,
            553, 594
        ],
        special: "atk_buf",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 44.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 46.8 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 58.1 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 57.7 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 72.1 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "elect", scale: "elem", value: 124 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "オズの攻撃ダメージ", type: "skill", elem: "elect", scale: "elem", value: 88.8 },
            { name: "召喚ダメージ", type: "skill", elem: "elect", scale: "elem", value: 115 },
        ],
        burst: [
            { name: "落雷ダメージ", type: "burst", elem: "elect", scale: "elem", value: 208 }
        ]
    },
    Jean: {
        name: "ジン",
        star: 5,
        element: "anemo",
        weapon: "sword",
        hp: [
            1144, 2967,
            3948, 5908,
            6605, 7599,
            8528, 9533,
            10230, 11243,
            11940, 12965,
            13662, 14695
        ],
        atk: [
            19, 49,
            65, 96,
            108, 124,
            139, 155,
            166, 183,
            195, 211,
            222, 239
        ],
        def: [
            60, 155,
            206, 309,
            345, 397,
            446, 499,
            535, 588,
            624, 678,
            715, 769
        ],
        special: "other",
        spvalue: null,
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 48.3 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 45.6 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 60.3 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 65.9 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 79.2 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 162 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "anemo", scale: "elem", value: 292 }
        ],
        burst: [
            { name: "爆発ダメージ", type: "burst", elem: "anemo", scale: "elem", value: 425 },
            { name: "エリア出入りダメージ", type: "burst", elem: "anemo", scale: "elem", value: 78.4 },
        ]
    },
    Kaeya: {
        name: "ガイア",
        star: 4,
        element: "cryo",
        weapon: "sword",
        hp: [
            976, 2506,
            3235, 4846,
            5364, 6170,
            6860, 7666,
            8184, 8990,
            9508, 10312,
            10830, 11636
        ],
        atk: [
            19, 48,
            62, 93,
            103, 118,
            131, 147,
            156, 172,
            181, 196,
            205, 220
        ],
        def: [
            66, 171,
            220, 330,
            365, 420,
            467, 522,
            557, 612,
            647, 702,
            737, 792
        ],
        special: "en_rec",
        spvalue: [0.0, 0.0, 6.6666666666, 13.3333333333, 13.3333333333, 20.0, 26.6666666666],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 53.8 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 51.7 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 65.3 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 70.9 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 88.2 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 55.0, value2: 73.1 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "cryo", scale: "elem", value: 191 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "cryo", scale: "elem", value: 77.6 },
        ]
    },
    Keqing: {
        name: "刻晴",
        star: 5,
        element: "elect",
        weapon: "sword",
        hp: [
            983, 2634,
            3512, 5268,
            5889, 6776,
            7604, 8500,
            9121, 10025,
            10647, 11561,
            12182, 13105
        ],
        atk: [
            26, 66,
            88, 130,
            145, 167,
            188, 209,
            225, 247,
            262, 285,
            300, 323
        ],
        def: [
            63, 162,
            215, 321,
            359, 413,
            464, 519,
            556, 612,
            649, 705,
            743, 800
        ],
        special: "cri_dmg",
        spvalue: [0.0, 0.0, 9.6, 19.2, 19.2, 28.8, 38.4],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 41.0 },
            { name: "2段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 41.0 },
            { name: "3段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 54.4 },
            { name: "4段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 31.5, value2: 34.4 },
            { name: "5段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 67.0 },
            { name: "重撃ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 76.8, value2: 86.0 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "雷楔ダメージ", type: "skill", elem: "elect", scale: "elem", value: 50.4 },
            { name: "斬撃ダメージ", type: "skill", elem: "elect", scale: "elem", value: 168 },
            { name: "雷連斬ダメージ", type: "skill", elem: "elect", scale: "elem", value: 84.0, stack: 2 },
        ],
        burst: [
            { name: "スキルダメージ	", type: "burst", elem: "elect", scale: "elem", value: 88.0 },
            { name: "連斬ダメージ", type: "burst", elem: "elect", scale: "elem", value: 24.0, stack: 8 },
            { name: "最後の一撃ダメージ	", type: "burst", elem: "elect", scale: "elem", value: 189 },
        ]
    },
    Klee: {
        name: "クレー",
        star: 5,
        element: "pyro",
        weapon: "catalyst",
        hp: [
            801, 2077,
            2764, 4136,
            4623, 5319,
            5970, 6673,
            7161, 7870,
            8358, 9076,
            9563, 10287
        ],
        atk: [
            24, 63,
            84, 125,
            140, 161,
            181, 202,
            217, 238,
            253, 274,
            289, 311
        ],
        def: [
            48, 124,
            165, 247,
            276, 318,
            357, 399,
            428, 470,
            500, 542,
            572, 615
        ],
        special: "pyro_dmg",
        spvalue: [0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "pyro", scale: "elem", value: 72.2 },
            { name: "2段ダメージ", type: "normal", elem: "pyro", scale: "elem", value: 62.4 },
            { name: "3段ダメージ", type: "normal", elem: "pyro", scale: "elem", value: 89.9 },
            { name: "重撃ダメージ", type: "heavy", elem: "pyro", scale: "elem", value: 157 },
            { name: "落下期間のダメージ", type: "normal", elem: "pyro", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "pyro", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "pyro", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "ボンボン爆弾ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 95.2 },
            { name: "ブービートラップダメージ", type: "skill", elem: "pyro", scale: "elem", value: 32.8 },
        ],
        burst: [
            { name: "ドッカン花火ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 42.6 },
        ]
    },
    Lisa: {
        name: "リサ",
        star: 4,
        element: "elect",
        weapon: "catalyst",
        hp: [
            802, 2061,
            2661, 3985,
            4411, 5074,
            5642, 6305,
            6730, 7393,
            7818, 8481,
            8906, 9569
        ],
        atk: [
            20, 50,
            65, 96,
            107, 123,
            137, 153,
            164, 180,
            191, 207,
            218, 234
        ],
        def: [
            48, 123,
            159, 239,
            264, 304,
            338, 378,
            403, 443,
            468, 508,
            533, 573
        ],
        special: "elem",
        spvalue: [0, 0, 24, 48, 48, 72, 96],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "elect", scale: "elem", value: 39.6 },
            { name: "2段ダメージ", type: "normal", elem: "elect", scale: "elem", value: 35.9 },
            { name: "3段ダメージ", type: "normal", elem: "elect", scale: "elem", value: 42.8 },
            { name: "4段ダメージ", type: "normal", elem: "elect", scale: "elem", value: 55.0 },
            { name: "重撃ダメージ", type: "heavy", elem: "elect", scale: "elem", value: 177 },
            { name: "落下期間のダメージ", type: "normal", elem: "elect", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "elect", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "elect", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "1回押しダメージ", type: "skill", elem: "elect", scale: "elem", value: 80.0 },
            { name: "誘雷なしの長押しダメージ", type: "skill", elem: "elect", scale: "elem", value: 320 },
            { name: "誘雷1重の長押しダメージ", type: "skill", elem: "elect", scale: "elem", value: 368 },
            { name: "誘雷2重の長押しダメージ", type: "skill", elem: "elect", scale: "elem", value: 424 },
            { name: "誘雷3重の長押しダメージ", type: "skill", elem: "elect", scale: "elem", value: 487 },
        ],
        burst: [
            { name: "放電ダメージ", type: "burst", elem: "elect", scale: "elem", value: 36.6 }
        ]
    },
    Mona: {
        name: "モナ",
        star: 5,
        element: "hydro",
        weapon: "catalyst",
        hp: [
            810, 2102,
            2797, 4185,
            4678, 5383,
            6041, 6752,
            7246, 7964,
            8458, 9184,
            9677, 10409
        ],
        atk: [
            24, 58,
            77, 116,
            129, 149,
            167, 186,
            199, 219,
            233, 253,
            266, 286
        ],
        def: [
            51, 132,
            176, 263,
            294, 338,
            379, 424,
            455, 500,
            531, 576,
            607, 653
        ],
        special: "en_rec",
        spvalue: [0.0, 0.0, 8.0, 16.0, 16.0, 24.0, 32.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 37.6 },
            { name: "2段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 36.0 },
            { name: "3段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 44.8 },
            { name: "4段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 56.2 },
            { name: "重撃ダメージ", type: "heavy", elem: "hydro", scale: "elem", value: 150 },
            { name: "落下期間のダメージ", type: "normal", elem: "hydro", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "hydro", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "hydro", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "継続ダメージ", type: "skill", elem: "hydro", scale: "elem", value: 32.0 },
            { name: "爆裂ダメージ", type: "skill", elem: "hydro", scale: "elem", value: 133 },
        ],
        burst: [
            { name: "泡影破裂ダメージ", type: "burst", elem: "hydro", scale: "elem", value: 442 },
        ]
    },
    Ningguang: {
        name: "凝光",
        star: 4,
        element: "geo",
        weapon: "catalyst",
        hp: [
            821, 2108,
            2721, 4076,
            4512, 5189,
            5770, 6448,
            6884, 7561,
            7996, 8674,
            9110, 9787
        ],
        atk: [
            18, 46,
            59, 89,
            98, 112,
            125, 140,
            150, 164,
            173, 188,
            198, 212
        ],
        def: [
            48, 123,
            159, 239,
            264, 304,
            338, 378,
            403, 443,
            468, 508,
            533, 573
        ],
        special: "geo_dmg",
        spvalue: [0, 0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "通常攻撃ダメージ", type: "normal", elem: "geo", scale: "elem", value: 28.0 },
            { name: "重激ダメージ", type: "heavy", elem: "geo", scale: "elem", value: 174 },
            { name: "星璇ダメージ", type: "normal", elem: "geo", scale: "elem", value: 49.6 },
            { name: "落下期間のダメージ", type: "normal", elem: "geo", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "geo", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "geo", scale: "phys", value: 142 }
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "geo", scale: "elem", value: 230 },
        ],
        burst: [
            { name: "宝石ダメージ", type: "burst", elem: "geo", scale: "elem", value: 87.0 },
        ]
    },
    Noelle: {
        name: "ノエル",
        star: 4,
        element: "geo",
        weapon: "claymore",
        hp: [
            1012, 2600,
            3356, 5027,
            5564, 6400,
            7117, 7953,
            8490, 9325,
            9862, 10698,
            11235, 12071
        ],
        atk: [
            16, 41,
            53, 80,
            88, 102,
            113, 126,
            135, 148,
            156, 170,
            178, 191
        ],
        def: [
            67, 172,
            222, 333,
            368, 423,
            471, 526,
            562, 617,
            652, 708,
            743, 799
        ],
        special: "def_buf",
        spvalue: [0, 0, 7.5, 15.0, 15.0, 22.5, 30.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 79.1 },
            { name: "2段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 73.4 },
            { name: "3段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 86.3 },
            { name: "4段ダメージ", type: "normal", elem: "switch", scale: "phys", value: 113 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 50.7 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "switch", scale: "phys", value: 90.5 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 74.6 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 149 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 186 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "geo", scale: "elem", value: 120, base: "def" },
        ],
        burst: [
            { name: "爆発ダメージ", type: "burst", elem: "geo", scale: "elem", value: 67.2 },
            { name: "スキルダメージ", type: "burst", elem: "geo", scale: "elem", value: 92.8 },
        ]
    },
    Qiqi: {
        name: "七七",
        star: 5,
        element: "cryo",
        weapon: "sword",
        hp: [
            963, 2498,
            3323, 4973,
            5559, 6396,
            7178, 8023,
            8610, 9463,
            10050, 10912,
            11499, 12368
        ],
        atk: [
            23, 58,
            77, 115,
            129, 149,
            167, 186,
            200, 219,
            233, 253,
            266, 297
        ],
        def: [
            72, 186,
            248, 371,
            415, 477,
            535, 598,
            642, 706,
            749, 814,
            857, 992
        ],
        special: "other",
        spvalue: null,
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 37.8 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 38.9 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 24.2, value2: 24.2 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 24.7, value2: 24.7 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.0 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 64.3, value2: 64.3 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "cryo", scale: "elem", value: 96.0 },
            { name: "寒病獄卒ダメージ", type: "skill", elem: "cryo", scale: "elem", value: 36.0 },
        ],
        burst: [
            { name: "スキルダメージ", type: "burst", elem: "cryo", scale: "elem", value: 285 },
        ]
    },
    Razor: {
        name: "レザー",
        star: 4,
        element: "elect",
        weapon: "claymore",
        hp: [
            1003, 2577,
            3326, 4982,
            5514, 6343,
            7052, 7881,
            8413, 9241,
            9773, 10602,
            11134, 11962
        ],
        atk: [
            20, 51,
            65, 97,
            108, 124,
            138, 154,
            164, 180,
            191, 207,
            217, 234
        ],
        def: [
            63, 162,
            209, 313,
            346, 398,
            443, 495,
            528, 580,
            613, 665,
            699, 751
        ],
        special: "phys_dmg",
        spvalue: [0, 0, 7.5, 15.0, 15.0, 22.5, 30.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 95.9 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 82.6 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 103 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 136 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 62.5 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 113 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 82.0 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 164 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 205 },
        ],
        skill: [
            { name: "1回押しスキルダメージ", type: "skill", elem: "elect", scale: "elem", value: 199 },
            { name: "長押しスキルダメージ", type: "skill", elem: "elect", scale: "elem", value: 295 },
        ],
        burst: [
            { name: "爆発ダメージ", type: "burst", elem: "elect", scale: "elem", value: 160 },
        ]
    },
    Sucrose: {
        name: "スクロース",
        star: 4,
        element: "anemo",
        weapon: "catalyst",
        hp: [
            775, 1991,
            2570, 3850,
            4261, 4901,
            5450, 6090,
            6501, 7141,
            7552, 8192,
            8603, 9243
        ],
        atk: [
            14, 37,
            47, 71,
            79, 90,
            100, 112,
            120, 132,
            139, 151,
            159, 170
        ],
        def: [
            59, 151,
            195, 293,
            324, 373,
            414, 463,
            494, 543,
            574, 623,
            654, 703
        ],
        special: "anemo_dmg",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "anemo", scale: "elem", value: 33.5 },
            { name: "2段ダメージ", type: "normal", elem: "anemo", scale: "elem", value: 30.6 },
            { name: "3段ダメージ", type: "normal", elem: "anemo", scale: "elem", value: 38.4 },
            { name: "4段ダメージ", type: "normal", elem: "anemo", scale: "elem", value: 47.9 },
            { name: "重撃ダメージ", type: "heavy", elem: "anemo", scale: "elem", value: 120 },
            { name: "落下期間のダメージ", type: "normal", elem: "anemo", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "anemo", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "anemo", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "スキルダメージ", type: "skill", elem: "anemo", scale: "elem", value: 211 },
        ],
        burst: [
            { name: "継続ダメージ", type: "burst", elem: "anemo", scale: "elem", value: 148 },
            { name: "付加元素ダメージ", type: "burst", elem: "addem", scale: "elem", value: 44 },
        ]
    },
    Tartaglia: {
        name: "タルタリヤ",
        star: 5,
        element: "hydro",
        weapon: "bow",
        hp: [
            1020, 2646,
            3521, 5268,
            5889, 6776,
            7604, 8500,
            9121, 10025,
            10647, 11561,
            12182, 13103
        ],
        atk: [
            24, 61,
            81, 121,
            136, 156,
            175, 196,
            210, 231,
            245, 266,
            280, 301
        ],
        def: [
            63, 165,
            219, 328,
            366, 421,
            473, 528,
            567, 623,
            662, 719,
            757, 815
        ],
        special: "hydro_dmg",
        spvalue: [0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 41.3 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 46.3 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 55.4 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 57.0 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 60.9 },
            { name: "6段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 72.8 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "hydro", scale: "elem", value: 124 },
            { name: "断流・閃 ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 12.4, stack: 3 },
            { name: "断流・破 ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 62.0 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "状態切替時に与えるダメージ", type: "skill", elem: "hydro", scale: "elem", value: 72.0 },
            { name: "1段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 38.9 },
            { name: "2段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 41.6 },
            { name: "3段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 56.3 },
            { name: "4段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 59.9 },
            { name: "5段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 55.3 },
            { name: "6段ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 35.4, value2: 37.7 },
            { name: "重撃ダメージ", type: "heavy", elem: "hydro", scale: "elem", value: 60.2, value2: 72.0 },
            { name: "断流・斬 ダメージ", type: "skill", elem: "hydro", scale: "elem", value: 60.0 },
        ],
        burst: [
            { name: "スキルダメージ・近接", type: "burst", elem: "hydro", scale: "elem", value: 464 },
            { name: "スキルダメージ・遠隔", type: "burst", elem: "hydro", scale: "elem", value: 378 },
            { name: "断流・爆 ダメージ", type: "burst", elem: "hydro", scale: "elem", value: 120 },
        ]
    },
    Venti: {
        name: "ウェンティ",
        star: 5,
        element: "anemo",
        weapon: "bow",
        hp: [
            820, 2127,
            2830, 4234,
            4734, 5446,
            6112, 6832,
            7331, 8058,
            8557, 9291,
            9790, 10531
        ],
        atk: [
            21, 53,
            71, 106,
            118, 136,
            153, 170,
            183, 202,
            214, 233,
            245, 265
        ],
        def: [
            52, 135,
            180, 269,
            301, 346,
            388, 434,
            465, 512,
            543, 591,
            622, 670
        ],
        special: "en_rec",
        spvalue: [0.0, 0.0, 8.0, 16.0, 16.0, 24.0, 32.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 20.4, value2: 20.4 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 44.4 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 52.4 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 26.1, value2: 26.1 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 50.7 },
            { name: "6段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 71.0 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "anemo", scale: "elem", value: 124 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.8 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 114 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 142 },
        ],
        skill: [
            { name: "1回押しダメージ", type: "skill", elem: "anemo", scale: "elem", value: 276 },
            { name: "長押しダメージ", type: "skill", elem: "anemo", scale: "elem", value: 380 },
        ],
        burst: [
            { name: "継続ダメージ", type: "burst", elem: "anemo", scale: "elem", value: 37.6 },
            { name: "付加元素ダメージ", type: "burst", elem: "addem", scale: "elem", value: 18.8 },
        ]
    },
    Xiangling: {
        name: "香菱",
        star: 4,
        element: "pyro",
        weapon: "polearm",
        hp: [
            912, 2342,
            3024, 4529,
            5013, 5766,
            6411, 7164,
            7648, 8401,
            8885, 9638,
            10112, 10875
        ],
        atk: [
            19, 49,
            63, 94,
            104, 119,
            133, 149,
            159, 174,
            184, 200,
            210, 225
        ],
        def: [
            56, 144,
            186, 279,
            308, 355,
            394, 441,
            470, 517,
            546, 593,
            623, 669
        ],
        special: "elem",
        spvalue: [0, 0, 24, 48, 48, 72, 96],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 42.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 42.1 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 26.1, value2: 26.1 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 14.1, stack: 4 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 71.0 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 122 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "噴火ダメージ", type: "skill", elem: "pyro", scale: "elem", value: 111 },
        ],
        burst: [
            { name: "振り回しによる1段ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 72.0 },
            { name: "振り回しによる2段ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 88.0 },
            { name: "振り回しによる3段ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 110 },
            { name: "旋火輪ダメージ", type: "burst", elem: "pyro", scale: "elem", value: 112 },
        ]
    },
    // Xiao: { name: "魈", star: 5, element: "anemo", weapon: "polearm", special: "other", },
    Xingqiu: {
        name: "行秋",
        star: 4,
        element: "hydro",
        weapon: "sword",
        hp: [
            857, 2202,
            2842, 4257,
            4712, 5420,
            6027, 6735,
            7190, 7897,
            8352, 9060,
            9515, 10223
        ],
        atk: [
            17, 44,
            56, 84,
            93, 107,
            119, 133,
            142, 156,
            165, 179,
            188, 202
        ],
        def: [
            64, 163,
            211, 316,
            349, 402,
            447, 499,
            533, 585,
            619, 672,
            706, 759
        ],
        special: "atk_buf",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 46.6 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 47.6 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 28.6, value2: 28.6 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 56.0 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 35.9 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 47.3, value2: 56.2 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "スキルダメージ	", type: "skill", elem: "hydro", scale: "elem", value: 168, value2: 191 },
        ],
        burst: [
            { name: "剣雨のダメージ", type: "burst", elem: "hydro", scale: "elem", value: 54.3 },
        ]
    },
    Xinyan: {
        name: "辛炎",
        star: 4,
        element: "pyro",
        weapon: "claymore",
        hp: [
            939, 2413,
            3114, 4665,
            5163, 5939,
            6604, 7379,
            7878, 8653,
            9151, 9927,
            10425, 11201
        ],
        atk: [
            21, 54,
            69, 103,
            115, 132,
            147, 164,
            175, 192,
            203, 220,
            231, 249
        ],
        def: [
            67, 172,
            222, 333,
            368, 423,
            471, 526,
            562, 617,
            652, 708,
            743, 799
        ],
        special: "atk_buf",
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 76.5 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 74.0 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 95.5 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 115.8 },
            { name: "連続重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 62.5 },
            { name: "重撃終了ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 113 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 74.6 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 149 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 186 }
        ],
        skill: [
            { name: "振り回しダメージ", type: "skill", elem: "phys", scale: "elem", value: 170 },
            { name: "継続ダメージ	", type: "skill", elem: "pyro", scale: "elem", value: 33.6 }
        ],
        burst: [
            { name: "スキルダメージ	", type: "burst", elem: "phys", scale: "elem", value: 341 },
            { name: "継続炎ダメージ	", type: "burst", elem: "pyro", scale: "elem", value: 40.0 }
        ]
    },
    Zhongli: {
        name: "鍾離",
        star: 5,
        element: "geo",
        weapon: "polearm",
        hp: [
            1144, 2967,
            3948, 5908,
            6605, 7599,
            8528, 9533,
            10230, 11243,
            11940, 12965,
            13662, 14695
        ],
        atk: [
            20, 51,
            67, 101,
            113, 130,
            146, 163,
            175, 192,
            204, 222,
            233, 251
        ],
        def: [
            57, 149,
            196, 297,
            332, 382,
            428, 479,
            514, 564,
            599, 651,
            686, 738
        ],
        special: "geo_dmg",
        spvalue: [0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 30.8 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 31.2 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 38.6 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 42.9 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 10.8, stack: 4 },
            { name: "6段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 54.5 },
            { name: "重撃ダメージ", type: "heavy", elem: "phys", scale: "phys", value: 111 },
            { name: "落下期間のダメージ", type: "normal", elem: "phys", scale: "phys", value: 63.9 },
            { name: "低空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 128 },
            { name: "高空落下攻撃ダメージ", type: "normal", elem: "phys", scale: "phys", value: 160 },
        ],
        skill: [
            { name: "岩柱ダメージ", type: "skill", elem: "geo", scale: "elem", value: 16.0 },
            { name: "共鳴ダメージ", type: "skill", elem: "geo", scale: "phys", value: 32.0 },
            { name: "長押しダメージ", type: "skill", elem: "geo", scale: "elem", value: 80.0 },
        ],
        burst: [
            { name: "スキルダメージ	", type: "burst", elem: "geo", scale: "etc1", value: 401.4 },
        ]
    },
};

// https://bbs.mihoyo.com/ys/article/2160993
const ENEMY_LIST = {
    SlimePyro: {
        name: "スライム・炎",
        resist: {
            pyro: Infinity,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SlimeHydro: {
        name: "スライム・水",
        resist: {
            pyro: 10,
            hydro: Infinity,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SlimeElect: {
        name: "スライム・雷",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: Infinity,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SlimeAnemo: {
        name: "スライム・風",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: Infinity,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SlimeCryo: {
        name: "スライム・氷",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: Infinity,
            geo: 10,
            phys: 10
        }
    },
    SlimeGeo: {
        name: "スライム・岩",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: Infinity,
            phys: 10
        }
    },
    SlimeDendro: {
        name: "スライム・草",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    Hilichurl: {
        name: "ヒルチャール",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    Mitachurl: {
        name: "ヒルチャール暴徒",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 30
        }
    },
    SamachurlHydro: {
        name: "ヒルチャールシャーマン・水",
        resist: {
            pyro: 10,
            hydro: 50,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SamachurlGeo: {
        name: "ヒルチャールシャーマン・岩",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 10
        }
    },
    SamachurlAnemo: {
        name: "ヒルチャールシャーマン・風",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 50,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    SamachurlDendro: {
        name: "ヒルチャールシャーマン・草",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        }
    },
    Lawachurl: {
        name: "ヒルチャール・岩兜の王",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 70,
            phys: 50
        },
    },
    RuinGuard: {
        name: "遺跡守衛",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 70
        },
    },
    RuinHunter: {
        name: "遺跡狩人",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 70
        },
    },
    WhopperflowerPyro: {
        name: "トリックフラワー・炎",
        resist: {
            pyro: 75,
            hydro: 35,
            elect: 35,
            anemo: 35,
            cryo: 35,
            geo: 35,
            phys: 35
        },
    },
    WhopperflowerPyroDown: {
        name: "トリックフラワー・炎（めまい）",
        resist: {
            pyro: 50,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    WhopperflowerCryo: {
        name: "トリックフラワー・氷",
        resist: {
            pyro: 35,
            hydro: 35,
            elect: 35,
            anemo: 35,
            cryo: 75,
            geo: 35,
            phys: 35
        },
    },
    WhopperflowerCryoDown: {
        name: "トリックフラワー・氷（めまい）",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 50,
            geo: 10,
            phys: 10
        },
    },
    FatuiSkirmisher: {
        name: "ファデュイ先遣隊",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20
        },
    },
    FatuiSkirmisherShieled: {
        name: "ファデュイ先遣隊（シールド）",
        resist: {
            pyro: 110,
            hydro: 110,
            elect: 110,
            anemo: 110,
            cryo: 110,
            geo: 110,
            phys: 80
        },
    },
    FatuiPyroAgent: {
        name: "ファデュイ・デットエージェント・炎",
        resist: {
            pyro: 50,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20
        },
    },
    FatuiElectroCicinMage: {
        name: "ファデュイ・雷蛍術師",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 50,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20
        },
    },
    TreasureHoarder: {
        name: "盗賊団",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -20
        },
    },
    GeovishapHatchling: {
        name: "ベビーヴィシャップ・岩",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30
        },
    },
    AbyssMage: {
        name: "アビスの魔術師",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    // EyeoftheStorm: {},
    ElectroHypostasis: {
        name: "無相の雷",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: Infinity,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    AnemoHypostasis: {
        name: "無相の風",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: Infinity,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    GeoHypostasis: {
        name: "無相の岩",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: Infinity,
            phys: 10
        },
    },
    Oceanid: {
        name: "純水精霊",
        resist: {
            pyro: 10,
            hydro: Infinity,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    CryoRegisvine: {
        name: "急凍樹",
        resist: {
            pyro: 110,
            hydro: 110,
            elect: 110,
            anemo: 110,
            cryo: 170,
            geo: 110,
            phys: 130
        },
    },
    CryoRegisvineDown: {
        name: "急凍樹（ダウン）",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 70,
            geo: 10,
            phys: 30
        },
    },
    PyroRegisvine: {
        name: "爆炎樹",
        resist: {
            pyro: 170,
            hydro: 110,
            elect: 110,
            anemo: 110,
            cryo: 110,
            geo: 110,
            phys: 130
        },
    },
    PyroRegisvineDown: {
        name: "爆炎樹（ダウン）",
        resist: {
            pyro: 70,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 30
        },
    },
    Dvalin: {
        name: "トワリン",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: 10
        },
    },
    Andrius: {
        name: "北風の狼",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: Infinity,
            cryo: Infinity,
            geo: 10,
            phys: 10
        },
    },
    TartagliaP1: {
        name: "タルタリヤ・第1段階",
        resist: {
            pyro: 0,
            hydro: 50,
            elect: 0,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0
        },
    },
    TartagliaP1Weak: {
        name: "タルタリヤ・第1段階（ダウン）",
        resist: {
            pyro: -30,
            hydro: 20,
            elect: -30,
            anemo: -30,
            cryo: -30,
            geo: -30,
            phys: -30
        },
    },
    TartagliaP2: {
        name: "タルタリヤ・第2段階",
        resist: {
            pyro: 0,
            hydro: 0,
            elect: 50,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0
        },
    },
    TartagliaP2Weak: {
        name: "タルタリヤ・第2段階（ダウン）",
        resist: {
            pyro: -50,
            hydro: -50,
            elect: 0,
            anemo: -50,
            cryo: -50,
            geo: -50,
            phys: -50
        },
    },
    TartagliaP3: {
        name: "タルタリヤ・第3段階",
        resist: {
            pyro: 70,
            hydro: 0,
            elect: 70,
            anemo: 0,
            cryo: 0,
            geo: 0,
            phys: 0
        },
    },
};