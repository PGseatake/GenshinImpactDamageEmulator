"use strict";
const CHARACTER = {
    other: {
        name: "-",
        star: 1,
        element: ElementType.Anemo,
        weapon: WeaponType.Sword,
        status: null,
        special: StatusBonusType.Other,
        spvalue: null,
        talent: null,
        passive: null,
        conste: null
    },
    TravelAnemo: {
        name: "旅人(風)",
        star: 5,
        element: ElementType.Anemo,
        weapon: WeaponType.Sword,
        status: {
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
            ]
        },
        special: StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 44.5 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 43.4 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 53.0 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 58.3 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 70.8 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 55.9, value2: 72.2 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "初期切裂ダメージ", type: CombatType.Skill, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 12.0 },
                { name: "最大切裂ダメージ", type: CombatType.Skill, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 16.8 },
                { name: "初期爆風ダメージ", type: CombatType.Skill, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 176 },
                { name: "最大爆風ダメージ", type: CombatType.Skill, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 192 },
            ],
            burst: [
                { name: "竜巻ダメージ", type: CombatType.Burst, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 80.8 },
                { name: "付加元素ダメージ", type: CombatType.Burst, elem: CombatElementType.Contact, scale: DamageScale.Elem, value: 24.8 },
            ]
        },
        passive: {},
        conste: {
            lv2: { items: StatusBonusType.EnRec, value: 16.0 },
            lv6: [
                { extra: ExtraBonusType.Reduct, type: ElementType.Anemo, value: 20.0, limit: "元素爆発のダメージを受けた時" },
                { extra: ExtraBonusType.Reduct, type: CombatElementType.Contact, value: 20.0, limit: "元素変化があった時" },
            ]
        }
    },
    TravelGeo: {
        name: "旅人(岩)",
        star: 5,
        element: ElementType.Geo,
        weapon: WeaponType.Sword,
        status: {
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
            ]
        },
        special: StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 44.5 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 43.4 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 53.0 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 58.3 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 70.8 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 55.9, value2: 72.2 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Geo, scale: DamageScale.Elem, value: 248 },
            ],
            burst: [
                { name: "地震波1回のダメージ", type: CombatType.Burst, elem: ElementType.Geo, scale: DamageScale.Elem, value: 148 },
            ]
        },
        passive: {},
        conste: {
            lv1: { items: CriticalBonusType.Rate, value: 10.0, limit: "岩潮幾重の岩の山に包囲されている時", target: BonusTarget.All },
        }
    },
    Albedo: {
        name: "アルベド",
        star: 5,
        element: ElementType.Geo,
        weapon: WeaponType.Sword,
        status: {
            hp: [
                1030, 2671,
                3554, 5317,
                5944, 6839,
                7675, 8579,
                9207, 10119,
                10746, 11669,
                12296, 13226
            ],
            atk: [
                20, 51,
                68, 101,
                113, 130,
                146, 163,
                175, 192,
                204, 222,
                234, 251
            ],
            def: [
                68, 177,
                235, 352,
                394, 453,
                508, 568,
                610, 670,
                712, 773,
                815, 876
            ]
        },
        special: ElementBonusType.Geo,
        spvalue: [0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 36.7 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 36.7 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 47.5 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 49.8 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 62.1 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 47.3, value2: 60.2 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Geo, scale: DamageScale.Elem, value: 130 },
                { name: "刹那の花ダメージ", type: CombatType.Skill, elem: ElementType.Geo, scale: DamageScale.Elem, value: 134, based: DamageBased.Def },
            ],
            burst: [
                { name: "爆発ダメージ", type: CombatType.Burst, elem: ElementType.Geo, scale: DamageScale.Elem, value: 367 },
                { name: "生滅の花ダメージ", type: CombatType.Burst, elem: ElementType.Geo, scale: DamageScale.Elem, value: 72 },
            ]
        },
        passive: {
            lv4: { items: CombatBonusType.Skill, value: 25.0, limit: "元素スキルがHP50％以下の敵にダメージを与えた時" },
            lv5: { items: StatusBonusType.Elem, value: 125, limit: "元素爆発を発動した時付近のキャラ", times: 10, target: BonusTarget.All },
        },
        conste: {
            lv2: { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Burst, base: StatusBonusType.Def, value: 30.0, limit: "生滅カウントに応じて元素爆発を発動した時", stack: 4 },
            lv4: { items: CombatBonusType.Plunge, value: 30.0, limit: "元素爆発エリア内のキャラ", target: BonusTarget.All },
            lv6: { items: StatusBonusType.AnyDmg, value: 17.0, limit: "元素爆発エリア内で結晶反応によるシールド状態の時" },
        }
    },
    Amber: {
        name: "アンバー",
        star: 4,
        element: ElementType.Pyro,
        weapon: WeaponType.Bow,
        status: {
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
            ]
        },
        special: StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 36.1 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 36.1 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 46.4 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 47.3 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 59.3 },
                { name: "狙い撃ち", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 43.9 },
                { name: "フルチャージ狙い撃ち", type: CombatType.Heavy, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 124 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "爆発ダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 123 },
            ],
            burst: [
                { name: "矢の雨1回のダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 28.1 },
                { name: "矢の雨の合計ダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 505 },
            ]
        },
        passive: {
            lv5: { items: StatusBonusType.AtkBuf, value: 15.0, limit: "狙い撃ちが弱点に命中した時", times: 10 },
        },
        conste: {
            lv6: { items: StatusBonusType.AtkBuf, value: 15.0, limit: "元素爆発を発動した時", times: 10, target: BonusTarget.All },
        }
    },
    Barbara: {
        name: "バーバラ",
        star: 4,
        element: ElementType.Hydro,
        weapon: WeaponType.Catalyst,
        status: {
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
            ]
        },
        special: StatusBonusType.HpBuf,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 37.8 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 35.5 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 41.0 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 55.2 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 166 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Hydro, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Hydro, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Hydro, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "水玉ダメージ", type: CombatType.Skill, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 58.4 },
            ],
            burst: []
        },
        passive: {},
        conste: {
            lv2: { items: ElementBonusType.Hydro, value: 15.0, limit: "元素スキル継続中・出場キャラ", target: BonusTarget.All },
        }
    },
    Beidou: {
        name: "北斗",
        star: 4,
        element: ElementType.Elect,
        weapon: WeaponType.Claymore,
        status: {
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
            ]
        },
        special: ElementBonusType.Elect,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 71.1 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 70.9 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 88.3 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 86.5 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 112 },
                { name: "連続重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 56.2 },
                { name: "重撃終了ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 102 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 74.6 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 149 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 186 },
            ],
            skill: [
                { name: "基礎ダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 122 },
                { name: "被撃時ダメージ+1", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 282 },
                { name: "被撃時ダメージ+2", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 442 },
            ],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Elect, scale: DamageScale.Elem, value: 122 },
                { name: "落雷ダメージ", type: CombatType.Burst, elem: ElementType.Elect, scale: DamageScale.Elem, value: 96 },
            ]
        },
        passive: {
            lv5: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: 15.0, limit: "最大ダメージ上昇効果のある元素スキルを発動した時", times: 10 },
        },
        conste: {
            lv6: { extra: ExtraBonusType.Reduct, type: ElementType.Elect, value: 15.0, limit: "元素爆発継続中・周囲の敵" },
        }
    },
    Bennett: {
        name: "ベネット",
        star: 4,
        element: ElementType.Pyro,
        weapon: WeaponType.Sword,
        status: {
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
            ]
        },
        special: StatusBonusType.EnRec,
        spvalue: [0.0, 0.0, 20.0 / 3, 40.0 / 3, 40.0 / 3, 20.0, 80.0 / 3],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 44.5 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 42.7 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 54.6 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 59.7 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 71.9 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 55.9, value2: 60.7 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "1回押しダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 138 },
                { name: "1段チャージダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 84.0, value2: 92.0 },
                { name: "2段チャージダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 88.0, value2: 96.0 },
                { name: "爆発ダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 132 },
            ],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 233 },
            ]
        },
        passive: {
            burst: { extra: ExtraBonusType.Flat, dest: StatusBonusType.Atk, base: FlatBonusBase.Atk, value: 56.0, scale: DamageScale.Elem, limit: "元素爆発エリア内のキャラ", target: BonusTarget.All }
        },
        conste: {
            lv2: { items: StatusBonusType.EnRec, value: 30.0, limit: "HPが70%以下の時" },
            lv6: [
                { items: ElementBonusType.Pyro, value: 15.0, limit: "元素爆発エリア内の近接武器キャラ", target: BonusTarget.Melee },
                { extra: ExtraBonusType.Enchant, elem: ElementType.Pyro, dest: [CombatType.Normal, CombatType.Heavy, CombatType.Plunge], limit: "元素爆発エリア内の近接武器キャラ", target: BonusTarget.Melee },
            ]
        }
    },
    Chongyun: {
        name: "重雲",
        star: 4,
        element: ElementType.Cryo,
        weapon: WeaponType.Claymore,
        status: {
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
            ]
        },
        special: StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 70.0 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.1 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 80.3 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 101 },
                { name: "連続重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 56.3 },
                { name: "重撃終了ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 102 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 74.6 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 149 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 186 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 172 },
            ],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 142 },
            ]
        },
        passive: {
            skill: { extra: ExtraBonusType.Enchant, elem: ElementType.Cryo, dest: [CombatType.Normal, CombatType.Heavy, CombatType.Plunge], limit: "元素スキルエリア内の近接武器キャラ", target: BonusTarget.Melee },
            lv5: { extra: ExtraBonusType.Reduct, type: ElementType.Cryo, value: 10.0, limit: "元素スキルの霊刃が命中した敵", times: 8 },
        },
        conste: {
            lv6: { items: CombatBonusType.Burst, value: 15.0, limit: "HPの割合が重雲より低い敵" },
        }
    },
    Diluc: {
        name: "ディルック",
        star: 5,
        element: ElementType.Pyro,
        weapon: WeaponType.Claymore,
        status: {
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
            ]
        },
        special: CriticalBonusType.Rate,
        spvalue: [0.0, 0.0, 4.8, 9.6, 9.6, 14.4, 19.2],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 89.7 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 87.6 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 98.8 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 134 },
                { name: "連続重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 68.8 },
                { name: "重撃終了ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 125 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 89.5 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 179 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 224 },
            ],
            skill: [
                { name: "1段ダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 94.4 },
                { name: "2段ダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 97.6 },
                { name: "3段ダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 129 }
            ],
            burst: [
                { name: "斬撃ダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 204 },
                { name: "継続ダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 60.0 },
                { name: "爆発ダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 204 }
            ]
        },
        passive: {
            burst: { extra: ExtraBonusType.Enchant, elem: ElementType.Pyro, dest: [CombatType.Normal, CombatType.Heavy, CombatType.Plunge], limit: "元素爆発発動後", times: 8 },
            lv5: { items: ElementBonusType.Pyro, value: 20.0, limit: "元素爆発の炎元素付与継続中", times: 12 },
        },
        conste: {
            lv1: { items: StatusBonusType.AnyDmg, value: 15.0, limit: "HP50%より上回る敵" },
            lv2: { items: StatusBonusType.AtkBuf, value: 10.0, limit: "ダメージを受けた時", times: 10, stack: 3 },
            lv4: { items: CombatBonusType.Skill, value: 40.0, limit: "元素スキル発動2秒後", times: 2 },
            lv6: { items: CombatBonusType.Normal, value: 30.0, limit: "元素スキル発動後2回まで", times: 6 },
        }
    },
    Diona: {
        name: "ディオナ",
        star: 4,
        element: ElementType.Cryo,
        weapon: WeaponType.Bow,
        status: {
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
            ]
        },
        special: ElementBonusType.Cryo,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 36.1 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 33.5 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 45.6 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 43.0 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 53.8 },
                { name: "狙い撃ち", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 43.9 },
                { name: "フルチャージ狙い撃ち", type: CombatType.Heavy, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 124 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "キャッツクローダメージ", type: CombatType.Skill, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 41.9 },
            ],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 80 },
                { name: "エリアの継続ダメージ", type: CombatType.Burst, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 52.6 },
            ]
        },
        passive: {},
        conste: {
            lv2: { items: CombatBonusType.Skill, value: 15.0 },
            lv6: { items: StatusBonusType.Elem, value: 200, limit: "元素爆発エリア内でHP50%以上のキャラ", target: BonusTarget.All },
        }
    },
    Fischl: {
        name: "フィッシュル",
        star: 4,
        element: ElementType.Elect,
        weapon: WeaponType.Bow,
        status: {
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
            ]
        },
        special: StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 44.1 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 46.8 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 58.1 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 57.7 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 72.1 },
                { name: "狙い撃ち", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 43.9 },
                { name: "フルチャージ狙い撃ち", type: CombatType.Heavy, elem: ElementType.Elect, scale: DamageScale.Elem, value: 124 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "オズの攻撃ダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 88.8 },
                { name: "召喚ダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 115 },
            ],
            burst: [
                { name: "落雷ダメージ", type: CombatType.Burst, elem: ElementType.Elect, scale: DamageScale.Elem, value: 208 }
            ]
        },
        passive: {},
        conste: {}
    },
    Ganyu: {
        name: "甘雨",
        star: 5,
        element: ElementType.Cryo,
        weapon: WeaponType.Bow,
        status: {
            hp: [
                763, 1978,
                2632, 3939,
                4403, 5066,
                5686, 6555,
                6820, 7495,
                7960, 8643,
                9108, 9797
            ],
            atk: [
                26, 68,
                90, 135,
                151, 173,
                194, 217,
                233, 256,
                272, 295,
                311, 335
            ],
            def: [
                49, 127,
                169, 253,
                283, 326,
                366, 409,
                439, 482,
                512, 556,
                586, 630
            ]
        },
        special: CriticalBonusType.Damage,
        spvalue: [0.0, 0.0, 9.6, 19.2, 19.2, 28.8, 38.4],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 31.7 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 35.6 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 45.5 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 45.5 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 48.2 },
                { name: "6段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 57.6 },
                { name: "狙い撃ち", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 43.9 },
                { name: "1段チャージ狙い撃ち", type: CombatType.Heavy, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 124 },
                { name: "霜華の矢の命中ダメージ", type: CombatType.Heavy, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 128 },
                { name: "霜華の矢・霜華満開ダメージ", type: CombatType.Heavy, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 218 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 132 },
            ],
            burst: [
                { name: "氷柱ダメージ", type: CombatType.Burst, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 70 }
            ]
        },
        passive: {
            lv5: { items: ElementBonusType.Cryo, value: 20.0, limit: "元素爆発エリア内のキャラ", target: BonusTarget.All },
        },
        conste: {
            lv1: { extra: ExtraBonusType.Reduct, type: ElementType.Cryo, value: 15.0, limit: "霜華の矢・霜華満開が命中した時", times: 6 },
            lv4: { items: CombatBonusType.Burst, value: 5.0, limit: "元素爆発エリア内の敵・3秒毎", stack: 5 },
        }
    },
    Hutao: {
        name: "胡桃",
        star: 5,
        element: ElementType.Pyro,
        weapon: WeaponType.Polearm,
        status: {
            hp: [
                1211, 3141,
                4179, 6253,
                6990, 8042,
                9026, 10089,
                10826, 11899,
                12637, 13721,
                14459, 15552
            ],
            atk: [
                8, 21,
                29, 43,
                48, 55,
                62, 69,
                74, 81,
                86, 94,
                99, 106
            ],
            def: [
                68, 177,
                235, 352,
                394, 453,
                508, 568,
                610, 670,
                712, 773,
                815, 876
            ]
        },
        special: CriticalBonusType.Damage,
        spvalue: [0.0, 0.0, 9.6, 19.2, 19.2, 28.8, 38.4],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Hutao, value: 46.9 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Hutao, value: 48.3 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Hutao, value: 61.1 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Hutao, value: 65.6 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Hutao, value: 33.3, value2: 35.2 },
                { name: "6段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Hutao, value: 86.0 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Hutao, value: 136 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Hutao, value: 65.4 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Hutao, value: 131 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Hutao, value: 163 },
            ],
            skill: [],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Xiao, value: 303 },
                { name: "低HP時スキルダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Xiao, value: 379 },
            ]
        },
        passive: {
            skill: [
                { extra: ExtraBonusType.Flat, dest: StatusBonusType.Atk, base: FlatBonusBase.Hp, scale: DamageScale.Xiao, value: 3.84, limit: "元素スキル発動後", times: 9 },
                { extra: ExtraBonusType.Enchant, elem: ElementType.Pyro, dest: [CombatType.Normal, CombatType.Heavy, CombatType.Plunge], limit: "元素スキル発動後", times: 9 },
            ],
            lv4: { items: CriticalBonusType.Rate, value: 12, limit: "元素スキル終了後", times: 8, target: BonusTarget.Other },
            lv5: { items: ElementBonusType.Pyro, value: 100 / 3, limit: "HPが50%以下の時" },
        },
        conste: {
            lv4: { items: CriticalBonusType.Rate, value: 12, limit: "胡桃自ら与えた血梅香状態の敵が倒された時", times: 15, target: BonusTarget.Other },
            lv6: { items: CriticalBonusType.Rate, value: 100, limit: "戦闘不能に至るダメージを受けた時", times: 10 },
        }
    },
    Jean: {
        name: "ジン",
        star: 5,
        element: ElementType.Anemo,
        weapon: WeaponType.Sword,
        status: {
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
            ]
        },
        special: StatusBonusType.Other,
        spvalue: null,
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 48.3 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 45.6 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 60.3 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 65.9 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 79.2 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 162 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 292 }
            ],
            burst: [
                { name: "爆発ダメージ", type: CombatType.Burst, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 425 },
                { name: "エリア出入りダメージ", type: CombatType.Burst, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 78.4 },
            ]
        },
        passive: {},
        conste: {
            lv1: { items: CombatBonusType.Skill, value: 40.0, limit: "スキル長押しが1秒以上の時" },
            lv4: { extra: ExtraBonusType.Reduct, type: ElementType.Anemo, value: 40.0, limit: "元素爆発エリア内の敵" },
        }
    },
    Kaeya: {
        name: "ガイア",
        star: 4,
        element: ElementType.Cryo,
        weapon: WeaponType.Sword,
        status: {
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
            ]
        },
        special: StatusBonusType.EnRec,
        spvalue: [0.0, 0.0, 20.0 / 3, 40.0 / 3, 40.0 / 3, 20.0, 80.0 / 3],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 53.8 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 51.7 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 65.3 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 70.9 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 88.2 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 55.0, value2: 73.1 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 191 },
            ],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 77.6 },
            ]
        },
        passive: {},
        conste: {}
    },
    Keqing: {
        name: "刻晴",
        star: 5,
        element: ElementType.Elect,
        weapon: WeaponType.Sword,
        status: {
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
            ]
        },
        special: CriticalBonusType.Damage,
        spvalue: [0.0, 0.0, 9.6, 19.2, 19.2, 28.8, 38.4],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 41.0 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 41.0 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 54.4 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 31.5, value2: 34.4 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 67.0 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 76.8, value2: 86.0 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "雷楔ダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 50.4 },
                { name: "斬撃ダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 168 },
                { name: "雷連斬ダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 84.0, multi: 2 },
            ],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Elect, scale: DamageScale.Elem, value: 88.0 },
                { name: "連斬ダメージ", type: CombatType.Burst, elem: ElementType.Elect, scale: DamageScale.Elem, value: 24.0, multi: 8 },
                { name: "最後の一撃ダメージ", type: CombatType.Burst, elem: ElementType.Elect, scale: DamageScale.Elem, value: 189 },
            ]
        },
        passive: {
            lv4: { extra: ExtraBonusType.Enchant, elem: ElementType.Elect, dest: [CombatType.Normal, CombatType.Heavy, CombatType.Plunge], limit: "星辰帰位を発動後", times: 5 },
            lv5: { items: [CriticalBonusType.Rate, StatusBonusType.EnRec], value: 15.0, limit: "元素爆発継続中", times: 8 },
        },
        conste: {
            lv4: { items: StatusBonusType.AtkBuf, value: 25.0, limit: "雷元素の関連反応を起こした時", times: 10 },
            lv6: { items: ElementBonusType.Elect, value: 6.0, limit: "通常攻撃、重撃、元素スキルまたは元素爆発を発動する時", times: 8 },
        }
    },
    Klee: {
        name: "クレー",
        star: 5,
        element: ElementType.Pyro,
        weapon: WeaponType.Catalyst,
        status: {
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
            ]
        },
        special: ElementBonusType.Pyro,
        spvalue: [0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 72.2 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 62.4 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 89.9 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 157 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Pyro, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Pyro, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Pyro, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "ボンボン爆弾ダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 95.2 },
                { name: "ブービートラップダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 32.8 },
            ],
            burst: [
                { name: "ドッカン花火ダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 42.6 },
            ]
        },
        passive: {
            lv5: { items: CombatBonusType.Heavy, value: 50.0, limit: "爆裂花火を消費した時", times: 25 },
        },
        conste: {
            lv2: { extra: ExtraBonusType.Reduct, type: ReductBonusType.Defence, value: 23.0, limit: "ブービートラップダメージを受けた敵", times: 10 },
            lv6: { items: ElementBonusType.Pyro, value: 10.0, limit: "元素爆発発動後", times: 25, target: BonusTarget.All },
        }
    },
    Lisa: {
        name: "リサ",
        star: 4,
        element: ElementType.Elect,
        weapon: WeaponType.Catalyst,
        status: {
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
            ]
        },
        special: StatusBonusType.Elem,
        spvalue: [0, 0, 24, 48, 48, 72, 96],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Elect, scale: DamageScale.Elem, value: 39.6 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Elect, scale: DamageScale.Elem, value: 35.9 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Elect, scale: DamageScale.Elem, value: 42.8 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Elect, scale: DamageScale.Elem, value: 55.0 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Elect, scale: DamageScale.Elem, value: 177 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Elect, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Elect, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Elect, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "1回押しダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 80.0 },
                { name: "誘雷なしの長押しダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 320 },
                { name: "誘雷1重の長押しダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 368 },
                { name: "誘雷2重の長押しダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 424 },
                { name: "誘雷3重の長押しダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 487 },
            ],
            burst: [
                { name: "放電ダメージ", type: CombatType.Burst, elem: ElementType.Elect, scale: DamageScale.Elem, value: 36.6 }
            ]
        },
        passive: {
            lv5: { extra: ExtraBonusType.Reduct, type: ReductBonusType.Defence, value: 15.0, limit: "元素爆発の攻撃を受けた敵", times: 10 },
        },
        conste: {
            lv2: { items: StatusBonusType.DefBuf, value: 20.0, limit: "スキル長押し中" },
        }
    },
    Mona: {
        name: "モナ",
        star: 5,
        element: ElementType.Hydro,
        weapon: WeaponType.Catalyst,
        status: {
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
            ]
        },
        special: StatusBonusType.EnRec,
        spvalue: [0.0, 0.0, 8.0, 16.0, 16.0, 24.0, 32.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 37.6 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 36.0 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 44.8 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 56.2 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 150 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Hydro, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Hydro, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Hydro, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "継続ダメージ", type: CombatType.Skill, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 32.0 },
                { name: "爆裂ダメージ", type: CombatType.Skill, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 133 },
            ],
            burst: [
                { name: "泡影破裂ダメージ", type: CombatType.Burst, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 442 },
            ]
        },
        passive: {
            lv5: { extra: ExtraBonusType.Flat, dest: ElementBonusType.Hydro, base: StatusBonusType.EnRec, value: 20.0 },
        },
        conste: {
            lv1: { items: [ReactionBonusType.Echarge, ReactionBonusType.Vaporize], value: 15.0 },
            lv4: { items: CriticalBonusType.Rate, value: 15.0, limit: "星異状態の敵を攻撃する時", target: BonusTarget.All },
            lv6: { items: CombatBonusType.Heavy, value: 60.0, limit: "虚実流動で1秒移動する毎", times: 8, stack: 3 },
        }
    },
    Ningguang: {
        name: "凝光",
        star: 4,
        element: ElementType.Geo,
        weapon: WeaponType.Catalyst,
        status: {
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
            ]
        },
        special: ElementBonusType.Geo,
        spvalue: [0, 0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "通常攻撃ダメージ", type: CombatType.Normal, elem: ElementType.Geo, scale: DamageScale.Elem, value: 28.0 },
                { name: "重激ダメージ", type: CombatType.Heavy, elem: ElementType.Geo, scale: DamageScale.Elem, value: 174 },
                { name: "星璇ダメージ", type: CombatType.Normal, elem: ElementType.Geo, scale: DamageScale.Elem, value: 49.6 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Geo, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Geo, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Geo, scale: DamageScale.Phys, value: 142 }
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Geo, scale: DamageScale.Elem, value: 230 },
            ],
            burst: [
                { name: "宝石ダメージ", type: CombatType.Burst, elem: ElementType.Geo, scale: DamageScale.Elem, value: 87.0 },
            ]
        },
        passive: {
            lv5: { items: ElementBonusType.Geo, value: 12.0, limit: "璇璣屏を突き抜けたキャラ", times: 10, target: BonusTarget.All },
        },
        conste: {}
    },
    Noelle: {
        name: "ノエル",
        star: 4,
        element: ElementType.Geo,
        weapon: WeaponType.Claymore,
        status: {
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
            ]
        },
        special: StatusBonusType.DefBuf,
        spvalue: [0, 0, 7.5, 15.0, 15.0, 22.5, 30.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 79.1 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 73.4 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 86.3 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 113 },
                { name: "連続重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 50.7 },
                { name: "重撃終了ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 90.5 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 74.6 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 149 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 186 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Geo, scale: DamageScale.Elem, value: 120, based: DamageBased.Def },
            ],
            burst: [
                { name: "爆発ダメージ", type: CombatType.Burst, elem: ElementType.Geo, scale: DamageScale.Elem, value: 67.2 },
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Geo, scale: DamageScale.Elem, value: 92.8 },
            ]
        },
        passive: {},
        conste: {
            lv2: { items: CombatBonusType.Heavy, value: 15.0 },
            lv6: { extra: ExtraBonusType.Flat, dest: StatusBonusType.Atk, base: StatusBonusType.Def, value: 50.0, limit: "元素爆発継続中" },
        }
    },
    Qiqi: {
        name: "七七",
        star: 5,
        element: ElementType.Cryo,
        weapon: WeaponType.Sword,
        status: {
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
            ]
        },
        special: StatusBonusType.Other,
        spvalue: null,
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 37.8 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 38.9 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 24.2, value2: 24.2 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 24.7, value2: 24.7 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.0 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 64.3, value2: 64.3 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 96.0 },
                { name: "寒病獄卒ダメージ", type: CombatType.Skill, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 36.0 },
            ],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Cryo, scale: DamageScale.Elem, value: 285 },
            ]
        },
        passive: {},
        conste: {
            lv2: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: 15.0, limit: "氷元素の影響を受けた敵" },
        }
    },
    Razor: {
        name: "レザー",
        star: 4,
        element: ElementType.Elect,
        weapon: WeaponType.Claymore,
        status: {
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
            ]
        },
        special: ElementBonusType.Phys,
        spvalue: [0, 0, 7.5, 15.0, 15.0, 22.5, 30.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 95.9 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 82.6 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 103 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 136 },
                { name: "連続重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 62.5 },
                { name: "重撃終了ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 113 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 82.0 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 164 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 205 },
            ],
            skill: [
                { name: "1回押しスキルダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 199 },
                { name: "長押しスキルダメージ", type: CombatType.Skill, elem: ElementType.Elect, scale: DamageScale.Elem, value: 295 },
            ],
            burst: [
                { name: "爆発ダメージ", type: CombatType.Burst, elem: ElementType.Elect, scale: DamageScale.Elem, value: 160 },
            ]
        },
        passive: {
            lv5: { items: StatusBonusType.EnRec, value: 30.0, limit: "元素エネルギーが50%以下の時" },
        },
        conste: {
            lv1: { items: StatusBonusType.AnyDmg, value: 10.0, limit: "元素オーブまたは元素粒子を獲得した時", times: 8 },
            lv2: { items: CriticalBonusType.Rate, value: 10.0, limit: "HPが30％以下の敵を攻撃する時" },
            lv4: { extra: ExtraBonusType.Reduct, type: ReductBonusType.Defence, value: 15.0, limit: "元素スキル一回押しで攻撃した時", times: 7 },
        }
    },
    Sucrose: {
        name: "スクロース",
        star: 4,
        element: ElementType.Anemo,
        weapon: WeaponType.Catalyst,
        status: {
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
            ]
        },
        special: ElementBonusType.Anemo,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 33.5 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 30.6 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 38.4 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 47.9 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 120 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Anemo, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Anemo, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Anemo, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 211 },
            ],
            burst: [
                { name: "継続ダメージ", type: CombatType.Burst, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 148 },
                { name: "付加元素ダメージ", type: CombatType.Burst, elem: CombatElementType.Contact, scale: DamageScale.Elem, value: 44 },
            ]
        },
        passive: {
            lv4: { items: StatusBonusType.Elem, value: 50, limit: "拡散反応を起こした時、該当元素のキャラ", times: 8, target: BonusTarget.Other },
            lv5: { extra: ExtraBonusType.Flat, dest: StatusBonusType.Elem, base: StatusBonusType.Elem, value: 20.0, limit: "元素スキル・元素爆発が敵に命中した時", times: 8, target: BonusTarget.Other },
        },
        conste: {}
    },
    Tartaglia: {
        name: "タルタリヤ",
        star: 5,
        element: ElementType.Hydro,
        weapon: WeaponType.Bow,
        status: {
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
            ]
        },
        special: ElementBonusType.Hydro,
        spvalue: [0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 41.3 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 46.3 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 55.4 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 57.0 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 60.9 },
                { name: "6段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 72.8 },
                { name: "狙い撃ち", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 43.9 },
                { name: "フルチャージ狙い撃ち", type: CombatType.Heavy, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 124 },
                { name: "断流・閃 ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 12.4, multi: 3 },
                { name: "断流・破 ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 62.0 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "状態切替時に与えるダメージ", type: CombatType.Skill, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 72.0 },
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 38.9 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 41.6 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 56.3 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 59.9 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 55.3 },
                { name: "6段ダメージ", type: CombatType.Normal, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 35.4, value2: 37.7 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 60.2, value2: 72.0 },
                { name: "断流・斬 ダメージ", type: CombatType.Skill, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 60.0 },
            ],
            burst: [
                { name: "スキルダメージ・近接", type: CombatType.Burst, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 464 },
                { name: "スキルダメージ・遠隔", type: CombatType.Burst, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 378 },
                { name: "断流・爆 ダメージ", type: CombatType.Burst, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 120 },
            ]
        },
        passive: {},
        conste: {}
    },
    Venti: {
        name: "ウェンティ",
        star: 5,
        element: ElementType.Anemo,
        weapon: WeaponType.Bow,
        status: {
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
            ]
        },
        special: StatusBonusType.EnRec,
        spvalue: [0.0, 0.0, 8.0, 16.0, 16.0, 24.0, 32.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 20.4, value2: 20.4 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 44.4 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 52.4 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 26.1, value2: 26.1 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 50.7 },
                { name: "6段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 71.0 },
                { name: "狙い撃ち", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 43.9 },
                { name: "フルチャージ狙い撃ち", type: CombatType.Heavy, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 124 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 56.8 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 114 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "1回押しダメージ", type: CombatType.Skill, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 276 },
                { name: "長押しダメージ", type: CombatType.Skill, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 380 },
            ],
            burst: [
                { name: "継続ダメージ", type: CombatType.Burst, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 37.6 },
                { name: "付加元素ダメージ", type: CombatType.Burst, elem: CombatElementType.Contact, scale: DamageScale.Elem, value: 18.8 },
            ]
        },
        passive: {},
        conste: {
            lv2: [
                { extra: ExtraBonusType.Reduct, type: [ElementType.Anemo, ElementType.Phys], value: 12.0, limit: "元素スキル発動後", times: 10 },
                { extra: ExtraBonusType.Reduct, type: [ElementType.Anemo, ElementType.Phys], value: 12.0, limit: "さらにノックバックした敵が着地する前" },
            ],
            lv4: { items: ElementBonusType.Anemo, value: 25.0, limit: "元素オーブまたは元素粒子を獲得した時", times: 10 },
            lv6: { extra: ExtraBonusType.Reduct, type: [ElementType.Anemo, ReductBonusType.Contact], value: 20.0, limit: "元素爆発の影響を受ける敵" },
        }
    },
    Xiangling: {
        name: "香菱",
        star: 4,
        element: ElementType.Pyro,
        weapon: WeaponType.Polearm,
        status: {
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
            ]
        },
        special: StatusBonusType.Elem,
        spvalue: [0, 0, 24, 48, 48, 72, 96],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 42.1 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 42.1 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 26.1, value2: 26.1 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 14.1, multi: 4 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 71.0 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 122 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "噴火ダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 111 },
            ],
            burst: [
                { name: "振り回しによる1段ダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 72.0 },
                { name: "振り回しによる2段ダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 88.0 },
                { name: "振り回しによる3段ダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 110 },
                { name: "旋火輪ダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 112 },
            ]
        },
        passive: {
            lv5: { items: StatusBonusType.AtkBuf, value: 10.0, limit: "唐辛子を拾った時", times: 10 },
        },
        conste: {
            lv1: { extra: ExtraBonusType.Reduct, type: ElementType.Pyro, value: 15.0, limit: "グゥオパァーに攻撃された敵", times: 6 },
            lv6: { items: ElementBonusType.Pyro, value: 15.0, limit: "元素爆発継続中", target: BonusTarget.All },
        }
    },
    Xiao: {
        name: "魈",
        star: 5,
        element: ElementType.Anemo,
        weapon: WeaponType.Polearm,
        status: {
            hp: [
                991, 2572,
                3422, 5120,
                5724, 6586,
                7391, 8262,
                8866, 9744,
                10348, 11236,
                11840, 12736
            ],
            atk: [
                26, 71,
                94, 141,
                157, 181,
                203, 227,
                243, 267,
                284, 308,
                325, 349
            ],
            def: [
                62, 161,
                215, 321,
                359, 413,
                464, 519,
                556, 612,
                649, 705,
                743, 799
            ]
        },
        special: CriticalBonusType.Rate,
        spvalue: [0.0, 0.0, 4.8, 9.6, 9.6, 14.4, 19.2],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 27.5, value2: 27.5 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 56.9 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 68.6 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 37.7, value2: 37.7 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 71.5 },
                { name: "6段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 95.8 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 121 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 82 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 164 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 204 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Anemo, scale: DamageScale.Elem, value: 253 },
            ],
            burst: []
        },
        passive: {
            burst: { extra: ExtraBonusType.Flat, dest: FlatBonusDest.CombatDmg, base: FlatBonusBase.None, value: 58.5, scale: DamageScale.Xiao, limit: "元素爆発発動後", times: 15 },
            lv4: { items: StatusBonusType.AnyDmg, value: 5.0, limit: "元素爆発継続中3秒毎", stack: 5 },
            lv5: { items: CombatBonusType.Skill, value: 15.0, limit: "元素スキル発動後", times: 7, stack: 3 },
        },
        conste: {
            lv2: { items: StatusBonusType.EnRec, value: 25.0, limit: "フィールド上にいない時" },
            lv4: { items: StatusBonusType.DefBuf, value: 100.0, limit: "HPが50%未満の時" },
        }
    },
    Xingqiu: {
        name: "行秋",
        star: 4,
        element: ElementType.Hydro,
        weapon: WeaponType.Sword,
        status: {
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
            ]
        },
        special: StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 46.6 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 47.6 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 28.6, value2: 28.6 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 56.0 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 35.9 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 47.3, value2: 56.2 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "スキルダメージ", type: CombatType.Skill, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 168, value2: 191 },
            ],
            burst: [
                { name: "剣雨のダメージ", type: CombatType.Burst, elem: ElementType.Hydro, scale: DamageScale.Elem, value: 54.3 },
            ]
        },
        passive: {
            lv5: { items: ElementBonusType.Hydro, value: 20.0 },
        },
        conste: {
            lv2: { extra: ExtraBonusType.Reduct, type: ElementType.Hydro, value: 15.0, limit: "元素爆発の攻撃を受けた敵", times: 4 },
            lv4: { items: CombatBonusType.Skill, value: 15.0, limit: "元素爆発継続中" },
        }
    },
    Xinyan: {
        name: "辛炎",
        star: 4,
        element: ElementType.Pyro,
        weapon: WeaponType.Claymore,
        status: {
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
            ]
        },
        special: StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 76.5 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 74.0 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 95.5 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 115.8 },
                { name: "連続重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 62.5 },
                { name: "重撃終了ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 113 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 74.6 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 149 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 186 }
            ],
            skill: [
                { name: "振り回しダメージ", type: CombatType.Skill, elem: ElementType.Phys, scale: DamageScale.Elem, value: 170 },
                { name: "継続ダメージ", type: CombatType.Skill, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 33.6 }
            ],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Phys, scale: DamageScale.Elem, value: 341 },
                { name: "継続炎ダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Elem, value: 40.0 }
            ]
        },
        passive: {
            lv5: { items: ElementBonusType.Phys, value: 15.0, limit: "元素スキルのシールドが存在する時" },
        },
        conste: {
            lv4: { extra: ExtraBonusType.Reduct, type: ElementType.Phys, value: 15.0, limit: "元素スキルのダメージを受けた敵", times: 12 },
        }
    },
    Zhongli: {
        name: "鍾離",
        star: 5,
        element: ElementType.Geo,
        weapon: WeaponType.Polearm,
        status: {
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
            ]
        },
        special: ElementBonusType.Geo,
        spvalue: [0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "1段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 30.8 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 31.2 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 38.6 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 42.9 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 10.8, multi: 4 },
                { name: "6段ダメージ", type: CombatType.Normal, elem: ElementType.Phys, scale: DamageScale.Phys, value: 54.5 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: ElementType.Phys, scale: DamageScale.Phys, value: 111 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 63.9 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 128 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: ElementType.Phys, scale: DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "岩柱ダメージ", type: CombatType.Skill, elem: ElementType.Geo, scale: DamageScale.Elem, value: 16.0 },
                { name: "共鳴ダメージ", type: CombatType.Skill, elem: ElementType.Geo, scale: DamageScale.Phys, value: 32.0 },
                { name: "長押しダメージ", type: CombatType.Skill, elem: ElementType.Geo, scale: DamageScale.Elem, value: 80.0 },
            ],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Geo, scale: DamageScale.Etc1, value: 401.4 },
            ]
        },
        passive: {
            lv5: [
                { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Combat, base: StatusBonusType.Hp, value: 1.39 },
                { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Skill, base: StatusBonusType.Hp, value: 1.9 },
                { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Burst, base: StatusBonusType.Hp, value: 100.0 / 3 },
            ]
        },
        conste: {}
    },
};
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
    SamachurlCryo: {
        name: "ヒルチャールシャーマン・氷",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 50,
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
    LawachurlGeo: {
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
    LawachurlCryo: {
        name: "ヒルチャール・霜鎧の王",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 70,
            geo: 10,
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
    RuinGrader: {
        name: "遺跡重機",
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
            phys: 50
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
    FatuiAgentPyro: {
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
    FatuiCicinMageElect: {
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
    FatuiCicinMageCryo: {
        name: "ファデュイ・氷蛍術士",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 50,
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
    Geovishap: {
        name: "ヴィシャップ・岩",
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
    GeovishapPyro: {
        name: "ヴィシャップ・岩（元素変化・炎）",
        resist: {
            pyro: 30,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30
        },
    },
    GeovishapHydro: {
        name: "ヴィシャップ・岩（元素変化・水）",
        resist: {
            pyro: 10,
            hydro: 30,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30
        },
    },
    GeovishapElect: {
        name: "ヴィシャップ・岩（元素変化・雷）",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 30,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30
        },
    },
    GeovishapCryo: {
        name: "ヴィシャップ・岩（元素変化・氷）",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 30,
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
    EyeoftheStorm: {
        name: "狂風のコア",
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
    CicinElect: {
        name: "雷蛍",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 50,
            anemo: 10,
            cryo: 10,
            geo: 10,
            phys: -50
        },
    },
    CicinCryo: {
        name: "氷蛍",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 50,
            geo: 10,
            phys: -50
        },
    },
    SnowboarKing: {
        name: "雪のイノシシ王",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 30,
            geo: 10,
            phys: 50
        },
    },
    HypostasisElect: {
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
    HypostasisAnemo: {
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
    HypostasisGeo: {
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
            phys: 15
        },
    },
    RegisvineCryo: {
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
    RegisvineCryoDown: {
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
    RegisvinePyro: {
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
    RegisvinePyroDown: {
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
    PrimoGeovishapPyro: {
        name: "エンシェントヴィシャップ・岩（炎）",
        resist: {
            pyro: 30,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30
        },
    },
    PrimoGeovishapHydro: {
        name: "エンシェントヴィシャップ・岩（水）",
        resist: {
            pyro: 10,
            hydro: 30,
            elect: 10,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30
        },
    },
    PrimoGeovishapElect: {
        name: "エンシェントヴィシャップ・岩（雷）",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 30,
            anemo: 10,
            cryo: 10,
            geo: 50,
            phys: 30
        },
    },
    PrimoGeovishapCryo: {
        name: "エンシェントヴィシャップ・岩（氷）",
        resist: {
            pyro: 10,
            hydro: 10,
            elect: 10,
            anemo: 10,
            cryo: 30,
            geo: 50,
            phys: 30
        },
    },
    PrimoGeovishapPyroDown: {
        name: "エンシェントヴィシャップ・岩（炎・ダウン）",
        resist: {
            pyro: -20,
            hydro: -40,
            elect: -40,
            anemo: -40,
            cryo: -40,
            geo: 0,
            phys: -20
        },
    },
    PrimoGeovishapHydroDown: {
        name: "エンシェントヴィシャップ・岩（水・ダウン）",
        resist: {
            pyro: -40,
            hydro: -20,
            elect: -40,
            anemo: -40,
            cryo: -40,
            geo: 0,
            phys: -20
        },
    },
    PrimoGeovishapElectDown: {
        name: "エンシェントヴィシャップ・岩（雷・ダウン）",
        resist: {
            pyro: -40,
            hydro: -40,
            elect: -20,
            anemo: -40,
            cryo: -40,
            geo: 0,
            phys: -20
        },
    },
    PrimoGeovishapCryoDown: {
        name: "エンシェントヴィシャップ・岩（氷・ダウン）",
        resist: {
            pyro: -40,
            hydro: -40,
            elect: -40,
            anemo: -40,
            cryo: -20,
            geo: 0,
            phys: -20
        },
    },
    PrimoGeovishapWaking: {
        name: "エンシェントヴィシャップ・岩（寝起き）",
        resist: {
            pyro: 210,
            hydro: 210,
            elect: 210,
            anemo: 210,
            cryo: 210,
            geo: 250,
            phys: 230
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
        name: "アンドリアス",
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
