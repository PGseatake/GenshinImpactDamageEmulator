// TODO: 多言語対応（ソース全体）

const CHARACTER = {
    other: {
        name: "-",
        star: 1,
        element: "",
        weapon: "sword",
        special: "other",
        combat: [],
        skill: [],
        burst: []
    },
    TravelAnemo: {
        name: "旅人(風)",
        star: 5,
        element: "anemo",
        weapon: "sword",
        special: "atk_buf",
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
        special: "atk_buf",
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
        special: "atk_buf",
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
        special: "hp_buf",
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
        special: "elect_dmg",
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
        ],
    },
    Bennett: {
        name: "ベネット",
        star: 4,
        element: "pyro",
        weapon: "sword",
        special: "en_rec",
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
        ],
    },
    Chongyun: {
        name: "重雲",
        star: 4,
        element: "cryo",
        weapon: "claymore",
        special: "atk_buf",
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
        ],
    },
    Diluc: {
        name: "ディルック",
        star: 5,
        element: "pyro",
        weapon: "claymore",
        special: "cri_rate",
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
        ],
    },
    Diona: {
        name: "ディオナ",
        star: 4,
        element: "cryo",
        weapon: "bow",
        special: "other",
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
        ],
    },
    Fischl: {
        name: "フィッシュル",
        star: 4,
        element: "elect",
        weapon: "bow",
        special: "atk_buf",
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
        ],
    },
    Jean: {
        name: "ジン",
        star: 5,
        element: "anemo",
        weapon: "sword",
        special: "other",
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
        special: "en_rec",
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
        special: "cri_dmg",
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
            { name: "雷連斬ダメージ", type: "skill", elem: "elect", scale: "elem", value: 84.0, multi: 2 },
        ],
        burst: [
            { name: "スキルダメージ	", type: "burst", elem: "elect", scale: "elem", value: 88.0 },
            { name: "連斬ダメージ", type: "burst", elem: "elect", scale: "elem", value: 24.0, multi: 8 },
            { name: "最後の一撃ダメージ	", type: "burst", elem: "elect", scale: "elem", value: 189 },
        ]
    },
    Klee: {
        name: "クレー",
        star: 5,
        element: "pyro",
        weapon: "catalyst",
        special: "pyro_dmg",
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
        ],
    },
    Lisa: {
        name: "リサ",
        star: 4,
        element: "elect",
        weapon: "catalyst",
        special: "elem",
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
        ],
    },
    Mona: {
        name: "モナ",
        star: 5,
        element: "hydro",
        weapon: "catalyst",
        special: "en_rec",
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
        special: "geo_dmg",
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
        ],
    },
    Noelle: {
        name: "ノエル",
        star: 4,
        element: "geo",
        weapon: "claymore",
        special: "def_buf",
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
        ],
    },
    Qiqi: {
        name: "七七",
        star: 5,
        element: "cryo",
        weapon: "sword",
        special: "other",
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
        special: "phys_dmg",
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
        ],
    },
    Sucrose: {
        name: "スクロース",
        star: 4,
        element: "anemo",
        weapon: "catalyst",
        special: "anemo_dmg",
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
        ],
    },
    Tartaglia: {
        name: "タルタリヤ",
        star: 5,
        element: "hydro",
        weapon: "bow",
        special: "hydro_dmg",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 41.3 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 46.3 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 55.4 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 57.0 },
            { name: "5段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 60.9 },
            { name: "6段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 72.8 },
            { name: "狙い撃ち", type: "heavy", elem: "phys", scale: "phys", value: 43.9 },
            { name: "フルチャージ狙い撃ち", type: "heavy", elem: "hydro", scale: "elem", value: 124 },
            { name: "断流・閃 ダメージ", type: "normal", elem: "hydro", scale: "elem", value: 12.4, multi: 3 },
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
        special: "en_rec",
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
        special: "elem",
        combat: [
            { name: "1段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 42.1 },
            { name: "2段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 42.1 },
            { name: "3段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 26.1, value2: 26.1 },
            { name: "4段ダメージ", type: "normal", elem: "phys", scale: "phys", value: 14.1, multi: 4 },
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
        special: "atk_buf",
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
    // Xinyan: { name: "辛炎", star: 4, element: "pyro", weapon: "claymore", special: "other", },
    // Zhongli: { name: "鍾離", star: 5, element: "geo", weapon: "polearm", special: "other", },
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