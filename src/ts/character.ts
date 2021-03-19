// TODO: 多言語対応（ソース全体）

const CHARACTER: DeepReadonly<IMap<ICharacter>> = {
    other: {
        name: "-",
        star: 1,
        element: ElementType.Anemo,
        weapon: WeaponType.Sword,
        // Lv[1, 20, 20+, 40, 40+, 50, 50+, 60, 60+, 70, 70+, 80, 80+, 90]
        status: null,
        special: StatusBonusType.Other,
        // Lv[1, 20+, 40+, 50+, 60+, 70+, 80+]
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
        passive: {
            // 4. 通常攻撃の最後の一撃が風の刃を放ち、風の刃は途中の敵に60%攻撃力の風ダメージを与える。
            // 5. 旋風の剣で敵を倒した後、1秒ごとにHPを2%回復する。継続時間5秒。5秒に1回のみ発動可能。
        },
        conste: {
            // 1. 旋風の剣は周囲5メートル以内の敵をゆっくりと自分の前に吸い寄せることができる。
            // 2. 元素エネルギー回復効率+16%
            lv2: { items: StatusBonusType.EnRec, value: 16.0 },
            // 3. 激風の息のスキルLv.+3
            // 4. 旋風の剣継続中､自身の受けるダメージ-10%
            // 5. 旋風の剣のスキルLv.3
            // 6. 激風の息によるダメージを受けた目標の風耐性-20%
            lv6: [
                { extra: ExtraBonusType.Reduct, type: ElementType.Anemo, value: 20.0, limit: "元素爆発のダメージを受けた時" },
                //    元素変化があった場合､該当の元素耐性-20%
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
        passive: {
            // 4. 星落としの剣のクールタイム-2秒
            // 5. 通常攻撃の最後1撃は岩崩れを発生させ、範囲内の敵に攻撃力の60%の岩ダメージを与える
        },
        conste: {
            // 1. チーム内キャラクターが「岩潮幾重」の岩の山に包囲されている時、会心率+10%、中断耐性がアップする。
            lv1: { items: CriticalBonusType.Rate, value: 10.0, limit: "岩潮幾重の岩の山に包囲されている時", target: BonusTarget.All },
            // 2. 星落としの剣の荒星が破壊される時に爆破が再び発生し、周囲の敵に星落としの剣のダメージ相当の岩範囲ダメージを与える。
            // 3. 岩潮幾重のスキルLv.+3
            // 4. 岩潮幾重が引き起こす振動波が的に命中する度に、元素エネルギーが5回復する。この方法で1回で最大25まで回復可能。
            // 5. 星落としの剣のスキルLv.3
            // 6. 岩潮幾重の岩の山の継続時間+5秒
            //    星落としの剣荒星の継続時間+10秒
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
            // 4. 創生術・擬似陽華の刹那の花がHP50％以下の敵にダメージを与えた場合、ダメージ量+25％
            lv4: { items: CombatBonusType.Skill, value: 25.0, limit: "元素スキルがHP50％以下の敵にダメージを与えた時" },
            // 5. 誕生式・大地の潮を発動した時、付近のチーム内キャラクターの元素熟知を+125、継続時間10秒。
            lv5: { items: StatusBonusType.Elem, value: 125, limit: "元素爆発を発動した時付近のキャラ", times: 10, target: BonusTarget.All },
        },
        conste: {
            // 1. アルベドの創生術・疑似陽華の刹那の花が放たれた時、アルベド自身の元素エネルギーが1.2回復する。
            // 2. 創生術・疑似陽華の刹那の花が放たれた時、アルベドに生滅カウントを付与する。継続時間30秒。
            //    誕生式・大地の潮を発動する時、全ての生滅カウントを取り除く。取り除かれた数によって、誕生式・大地の潮の爆発ダメージと生滅の花のダメージが上昇する。
            //    生滅カウント1つにつき、アルベドの防御力30％分のダメージが上昇する。
            //    生滅カウントは最大4重まで。
            lv2: { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Burst, base: StatusBonusType.Def, value: 30.0, limit: "生滅カウントに応じて元素爆発を発動した時", stack: 4 },
            // 3. 創生術・疑似陽華のスキルLv.+3
            // 4. 陽華のエリア内にいるキャラクターの落下攻撃ダメージ+30%。
            lv4: { items: CombatBonusType.Plunge, value: 30.0, limit: "元素爆発エリア内のキャラ", target: BonusTarget.All },
            // 5. 誕生式・大地の潮のスキルLv.+3
            // 6. 陽華のエリア内にいるフィールド上のキャラクターが、結晶反応で生成されたシールド状態にある時、与えるダメージ+17%。
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
            // 4. 矢の雨の会心率+10%、影響範囲+30%。
            // 5. 狙い撃ちが弱点に命中すると、攻撃力+15%、継続時間10秒。
            lv5: { items: StatusBonusType.AtkBuf, value: 15.0, limit: "狙い撃ちが弱点に命中した時", times: 10 },
        },
        conste: {
            // 1. 狙い撃ちする時、矢を連続2本放つ。2本目の矢は元の矢の20%のダメージを与える。
            // 2. ウサギ伯爵が改良された!フルチャージの狙い撃ちがウサギ伯爵の足に命中するとウサギ伯爵を直接起爆させられる。
            //    この形で自らウサギ伯爵を起爆させると、追加で200%のダメージを与える。
            // 3. 矢の雨のスキルLv.+3
            // 4. 爆弾人形のクールタイム-20%、使用可能回数が1回増える。
            // 5. 爆弾人形のスキルLv.+3
            // 6. 矢の雨を発動した10秒間、チーム全員の移動速度+15%、攻撃力+15%。
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
        passive: {
            // 4. 公演、開始歌声の輪が継続している間、スタミナ消費-12%。
            // 5. 出場している自身のキャラクターが元素オーブまたは元素粒子を獲得時に、公演、開始♪の歌声の輪の継続時間+1秒。この方法で最大5秒まで延長可能。
        },
        conste: {
            // 1. 10秒毎に元素エネルギーを1回復する。
            // 2. 公演開始♪のクールタイム-15％。スキル継続中、出場している自身のキャラクターの与える水ダメージ+15％。
            lv2: { items: ElementBonusType.Hydro, value: 15.0, limit: "元素スキル継続中・出場キャラ", target: BonusTarget.All },
            // 3. シャイニングミラクル♪のスキルLv.+3
            // 4. 重撃が敵に命中する度に、バーバラの元素エネルギーが1回復する。一回で最大元素エネルギーが5まで回復できる。
            // 5. 公演、開始♪のスキルLv.+3
            // 6. バーバラ待機中にチーム内の自身のキャラクターが死亡すると、下記の効果が発動される
            //    ・死亡したキャラを復活させる
            //    ・該当キャラのHPが100%回復される。
            //    この効果は15分ごとに1回のみ発動可能。
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
            // 4. 攻撃された時に発動した浪追い反撃は最大ダメージ上昇効果がある。
            // 5. 最大ダメージ上昇効果のある浪追いを発動した10秒内、下記の効果が発動される:
            //    ・通常攻撃と重撃の攻撃速度+15%、攻撃ダメージ+15%
            //    ・重撃に必要な時間が大幅に減少する。
            lv5: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: 15.0, limit: "最大ダメージ上昇効果のある元素スキルを発動した時", times: 10 },
        },
        conste: {
            // 1. 雷斫り発動時:HP上限16%相当のシールドを生成し、持続時間15秒。該当シールドは雷ダメージに対して250%の吸収効果がある。
            // 2. 雷斫りの稲妻は2体の敵を追加で攻撃可能。
            // 3. 浪追いのスキルLv.+3
            // 4. 攻撃を受けた10秒内、北斗の通常攻撃は20%の雷ダメージが付与される。
            // 5. 雷斫りのスキルLv.+3
            // 6. 雷斫り継続中、周囲の敵の雷耐性-15%
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
            // burst. ･エリア内のキャラのHPが最大値の70%を下回ると、HPが継続回復する。回復量はベネットのHP上限によって決まる。
            //        ･エリア内のキャラのHPが最大値の70%以上の場合、ベネットの基礎攻撃力を基準に、一定比例の攻撃力がアップする。
            //        ･エリア内のキャラに炎元素付着効果を付与する。
            //        56% 60% 64% 70% 74% 78% 84% 90% 95% 101% 106% 112% 119%
            burst: { extra: ExtraBonusType.Flat, dest: StatusBonusType.Atk, base: FlatBonusBase.Atk, value: 56.0, scale: DamageScale.Elem, limit: "元素爆発エリア内のキャラ", target: BonusTarget.All }
            // 4. 溢れる情熱のクールタイム-20%
            // 5. 素晴らしい旅エリア内にいると、溢れる情熱のクールタイムが-50%され、2段チャージによるベネットのノックバックが発生しなくなる
        },
        conste: {
            // 1. 「素晴らしい旅」の攻撃力アップ効果はHPによる制限がなくなり、更にベネットの基礎攻撃力の20%に当たる数値を追加。
            // 2. HPが70％以下になると、元素チャージ効率+30％
            lv2: { items: StatusBonusType.EnRec, value: 30.0, limit: "HPが70%以下の時" },
            // 3. 溢れる情熱のスキルLv.3
            // 4. 1段チャージ溢れる情熱を発動する時、二段目攻撃中に通常攻撃をすると追加攻撃を発動できる。二段目攻撃の135％の追加ダメージを与える。
            // 5. 素晴らしい旅のスキルLv.3
            // 6. 素晴らしい旅エリア内の片手剣、両手剣、長柄武器キャラの炎ダメージ+15％、通常攻撃と重撃ダメージを炎ダメージに変換する。
            lv6: [
                { items: ElementBonusType.Pyro, value: 15.0, limit: "元素爆発エリア内の片手剣・両手剣・長柄武器キャラ" },
                { extra: ExtraBonusType.Enchant, elem: ElementType.Pyro, dest: [CombatType.Normal, CombatType.Heavy], limit: "元素爆発エリア内の片手剣・両手剣・長柄武器キャラ", target: BonusTarget.All },
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
                { name: "1段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 70.0 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 63.1 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 80.3 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 101 },
                { name: "連続重撃ダメージ", type: CombatType.Heavy, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 56.3 },
                { name: "重撃終了ダメージ", type: CombatType.Heavy, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 102 },
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
            // skill. 氷爆による寒気が重華積霜エリアになり、エリア内の片手剣、大剣、長柄武器キャラの通常攻撃、重撃と落下攻撃ダメージは氷元素ダメージになる。
            skill: { extra: ExtraBonusType.Enchant, elem: ElementType.Cryo, dest: [CombatType.Normal, CombatType.Heavy, CombatType.Plunge], limit: "元素スキルエリア内の片手剣・両手剣・長柄武器キャラ", target: BonusTarget.All },
            // 4. 霊刃・重華積霜エリア内にいる時、片手剣、両手剣、長柄武器キャラの通常攻撃と攻撃速度が8%上昇する。
            // 5. 霊刃・重華積霜エリアが消えた時、自動的に付近の敵を攻撃する霊刃を召喚し、霊刃・重華積霜のスキルダメージ100%の氷範囲ダメージを与える。
            //    命中された敵の氷耐性が10%減少する、継続時間8秒。
            lv5: { extra: ExtraBonusType.Reduct, type: ElementType.Cryo, value: 10.0, limit: "元素スキルの霊刃が命中した敵", times: 8 },
        },
        conste: {
            // 1. 通常攻撃の最後の一撃が前方に3つの氷の刃を放ち、氷の刃は途中の敵に重雲の50%攻撃力の氷ダメージを与える。
            // 2. 霊刃・重華積霜エリア内、元素スキルと元素爆発のクールタイムが15%減少する。
            // 3. 霊刃・雲開星落のスキルLv.+3
            // 4. 重雲のすべての攻撃が氷元素の影響を受けた敵に命中した時、自身の元素エネルギーを1回復。この効果は2秒毎に1回のみ発動可能。
            // 5. 霊刃・重華積霜のスキルLv.+3
            // 6. 霊刃・雲開星落がHPの百分率が重雲より低い時に命中した時、ダメージが15%上昇。その他、使用する時にさらに追加で霊刃を1本を召喚する。
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
                { name: "1段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 89.7 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 87.6 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 98.8 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 134 },
                { name: "連続重撃ダメージ", type: CombatType.Heavy, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 68.8 },
                { name: "重撃終了ダメージ", type: CombatType.Heavy, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 125 },
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
            // burst. 武器に凝集した列焔により、ディルックの通常攻撃と重撃ダメージは炎ダメージに変わる。継続時間8秒。
            burst: { extra: ExtraBonusType.Enchant, elem: ElementType.Pyro, dest: [CombatType.Normal, CombatType.Heavy], limit: "元素爆発発動後", times: 8, target: BonusTarget.Self },
            // 4. 重撃のスタミナ消費-50%、最大継続時間+3秒。
            // 5. 黎明による炎元素バフの継続時間+4秒。さらに効果継続中にディルックの与える炎ダメージ+20%。
            lv5: { items: ElementBonusType.Pyro, value: 20.0, limit: "元素爆発の炎元素付与継続中", times: 12 },
        },
        conste: {
            // 1. HPが50%より上回る敵に対して、ディルックの与えるダメージ+15％。
            lv1: { items: StatusBonusType.AnyDmg, value: 15.0, limit: "HP50%より上回る敵" },
            // 2. ディルックがダメージを受けると、攻撃力+10%、攻撃速度+5％、継続時間10秒。該当効果は最大3重まで、1.5秒に1回のみ発動可能。
            lv2: { items: StatusBonusType.AtkBuf, value: 10.0, limit: "ダメージを受けた時", times: 10, stack: 3 },
            // 3. 逆焔の刃のスキルLv.+3
            // 4. リズム的に逆焔の刃を発動させることで、ダメージを大幅に上げることができる。逆焔の刃発動2秒後、次の逆焔の刃のダメージ+40％、継続時間2秒。
            lv4: { items: CombatBonusType.Skill, value: 40.0, limit: "元素スキル発動2秒後", times: 2 },
            // 5. 黎明のスキルLv.+3
            // 6. 逆焔の刃発動後、6秒以内の通常攻撃の攻撃速度+30％、攻撃ダメージ+30％、2回まで。逆焔の刃によって通常攻撃のコンボ数がリセットされることはなくなる。
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
        passive: {
            // 4. フリーズキャッツクローのシールドが存在する時、キャラクターの移動速度+10％、スタミナ消費-10％。
            // 5. 特製スピリッツのエリアに入った敵の攻撃力が15秒間-10％。
        },
        conste: {
            // 1. 特製スピリッツの効果終了時、ディオナの元素エネルギーを15回復する。
            // 2. フリーズキャッツクローによるダメージ+15%、シールドのダメージ吸収量+15%。
            lv2: { items: CombatBonusType.Skill, value: 15.0 },
            //    命中時、近くに出場しているキャラクターにフリーズキャッツクローの50％のダメージを吸収するシールドを付与する。継続時間5秒。
            // 3. 特製スピリッツのスキルLv.+3
            // 4. 特製スピリッツのエリアにいる時、ディオナの狙い撃ちのチャージ時間が60%減少する。
            // 5. フリーズキャッツクローのスキルLv.+3
            // 6. 特製スピリッツのエリアのいるキャラクターは自身の現在HPにより以下の効果を獲得する:
            //    ・HPが50％またその以下の時、被回復量が30％上昇。
            //    ・HPが50％以上の時、元素熟知が200上昇。
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
        passive: {
            // 4. フィッシュルのチャージした狙い撃ち射撃がオズに命中すると、オズは周囲の敵に聖裁の雷を放ち、射撃ダメージ152.7%相当の雷範囲ダメージを与える。
            // 5. オズがフィールドにいる時、出場している自身のキャラクターの敵への攻撃が雷元素の関連反応を起こすと、
            //    敵に聖裁の雷を下し、フィッシュルの攻撃力80%の雷ダメージを与える。
        },
        conste: {
            // 1. オズが戦場にいない時も、鴉の目を通してフィッシュルを守る。
            //    フィッシュルが敵を攻撃する時、オズは鴉の目を通して攻撃し、攻撃力の22%のダメージを与える。
            // 2. 夜巡りの翼発動時、攻撃力の200%の追加ダメージを与える、影響範囲+50%。
            // 3. 夜巡りの翼のスキルLv.+3
            // 4. 夜の幻現発動時、周囲の敵に攻撃力の222%の雷ダメージを与える。
            //    スキル終了時、フィッシュルのHPを20%回復する。
            // 5. 夜の幻現のスキルLv.+3
            // 6. オズの存在時間+2秒。オズは出場している自身のキャラクターと共に攻撃し、攻撃力の30%の雷ダメージを与える。
        }
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
            // 4. 霜華の矢を放った後の5秒以内に放たれた霜華の矢と霜華満開の会心率+20%
            // TODO: lv4: { items: CriticalBonusType.Heavy, value: 20.0, limit: "霜華の矢を放った後", times: 5, target: "heavy_ex" },
            // 5. 降衆天華エリア内のキャラクターの氷元素ダメージ+20%
            lv5: { items: ElementBonusType.Cryo, value: 20.0, limit: "元素爆発エリア内のキャラ", target: BonusTarget.All },
        },
        conste: {
            // 1. 二段チャージ重撃の霜華の矢または霜華満開が命中した時、敵の氷元素耐性-15%。継続時間6秒
            lv1: { extra: ExtraBonusType.Reduct, type: ElementType.Cryo, value: 15.0, limit: "霜華の矢・霜華満開が命中した時", times: 6 },
            //    命中時に甘羽の元素エネルギーを2回復。二段チャージの重撃による元素エネルギーの回復効果は、1回の重撃で1度のみ発動可能。
            // 2. 山沢麟跡の発動回数+1
            // 3. 降衆天華のスキルLv.+3
            // 4. 降衆天華エリア内、敵の受けるダメージが増加する。
            //    受けるダメージの増加量は初期が5%、3秒毎に5%上昇し、最大25%まで上昇する。
            lv4: { items: CombatBonusType.Burst, value: 5.0, limit: "元素爆発エリア内の敵・3秒毎", stack: 5 },
            //    エリアを出た後、継続時間3秒。
            // 5. 山沢麟跡のスキルLv.+3
            // 6. 山沢麟跡を発動すると、30秒以内に放つ最初の霜華の矢が、チャージせずに発動可能になる。
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
                { name: "1段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Hutao, value: 46.9 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Hutao, value: 48.3 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Hutao, value: 61.1 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Hutao, value: 65.6 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Hutao, value: 33.3, value2: 35.2 },
                { name: "6段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Hutao, value: 86.0 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: CombatElementType.Switch, scale: DamageScale.Hutao, value: 136 },
                { name: "落下期間のダメージ", type: CombatType.Plunge, elem: CombatElementType.Switch, scale: DamageScale.Hutao, value: 65.4 },
                { name: "低空落下攻撃ダメージ", type: CombatType.Plunge, elem: CombatElementType.Switch, scale: DamageScale.Hutao, value: 131 },
                { name: "高空落下攻撃ダメージ", type: CombatType.Plunge, elem: CombatElementType.Switch, scale: DamageScale.Hutao, value: 163 },
            ],
            skill: [],
            burst: [
                { name: "スキルダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Xiao, value: 303 },
                { name: "低HP時スキルダメージ", type: CombatType.Burst, elem: ElementType.Pyro, scale: DamageScale.Xiao, value: 379 },
            ]
        },
        passive: {
            // skill. 胡桃のHP上限を基準に攻撃力が上昇する。この効果で得られる攻撃力上昇の最大値は、胡桃の基礎攻撃力の400%まで。
            //        攻撃ダメージは炎元素ダメージとなり、元素付与によって他の元素に変化することはない。
            //        重撃は敵に血梅香効果を与える。胡桃の中断耐性が上昇する。
            skill: [
                { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Atk, base: FlatBonusBase.Hp, scale: DamageScale.Xiao, value: 3.84, limit: "元素スキル発動後", times: 9 },
                // { extra: ExtraBonusType.Enchant, elem: ElementType.Pyro, dest: [CombatType.Normal, CombatType.Heavy, CombatType.Plunge], limit: "元素スキル発動後", times: 9 },
            ],
            // 4. 蝶導来世による冥蝶の舞状態終了後、チーム全員(胡桃自身を除く)の会心率+12%、継続時間8秒。
            lv4: { items: CriticalBonusType.Rate, value: 12, limit: "元素スキル終了後", times: 8, target: BonusTarget.Other },
            // 5. 胡桃のHPが50%以下の時、炎元素ダメージ+33%。
            lv5: { items: ElementBonusType.Pyro, value: 100 / 3, limit: "HPが50%以下の時" },
        },
        conste: {
            // 1. 蝶導来世による冥蝶の舞状態の時、胡桃の重撃はスタミナを消費しない。
            // 2. 血梅香のダメージ量が胡桃のHP上限の10%分上昇する。また、安神秘法は命中した敵に血梅香効果を与える。
            // 4. 胡桃自ら与えた血梅香状態の敵が倒されると、周囲のチーム全員(胡桃自身をを除く)の会心率+12%、継続時間15秒。
            lv4: { items: CriticalBonusType.Rate, value: 12, limit: "胡桃自ら与えた血梅香状態の敵が倒された時", times: 15, target: BonusTarget.Other },
            // 6. 胡桃のHPが25%以下、または戦闘不能に至るダメージを受けた時に発動：このダメージで胡桃が戦闘不能になることはない。
            //    また、次の10秒間、胡桃の全元素耐性及び物理耐性+200%、会心率+100%、中断耐性大幅アップ。
            //    この効果は胡桃のHPが1の時に自動で発動される。60秒毎に1回のみ発動可能。
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
        special: StatusBonusType.Other, // HealBuf
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
        passive: {
            // 4. ジンの通常攻撃が命中する時、50%の確率でチーム全員のHPを回復する。回復量はジンの攻撃力15%。
            // 5. 蒲公英の風発動後、元素エネルギーが20％回復する。
        },
        conste: {
            // 1. 風圧剣の長押しが1秒以上の時、吸い寄せる速度がアップし、与えるダメージ+40%。
            lv1: { items: CombatBonusType.Skill, value: 40.0, limit: "スキル長押しが1秒以上の時" },
            // 2. 元素オーブまたは元素粒子を獲得時、チームにいる全てのキャラの移動速度、攻撃速度+15%、継続時間15秒。
            // 3. 蒲公英の風のスキルLv.+3
            // 4. 蒲公英の風エリア内、全ての敵の風元素耐性-40%。
            lv4: { extra: ExtraBonusType.Reduct, type: ElementType.Anemo, value: 40.0, limit: "元素爆発エリア内の敵" },
            // 5. 風圧剣のスキルLv.+3
            // 6. 蒲公英の風エリア内、キャラの受けるダメージ-35%。エリアを出た後、この効果は3回攻撃を受けた後、または10秒後に消える。
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
        passive: {
            // 4. 霜の襲撃が敵1体に命中する度に、攻撃力の15%相当のHPを回復する。
            // 5. 霜の襲撃が敵を凍結状態にした場合、凍結された敵から追加の元素粒子が落ちる。
            //    1回の霜襲は2つの元素粒子が追加で発生する。
        },
        conste: {
            // 1. 氷元素の影響を受けた敵に対して、ガイアの通常攻撃と重撃の会心率+15%
            // TODO: lv1: { items: [CriticalBonusType.Normal, CriticalBonusType.Heavy], value: 15.0, limit: "氷元素の影響を受けた敵" },
            // 2. 凛冽なる戯れ継続中に敵を撃破したとき、継続時間+2.5秒、最大15秒まで
            // 3. 霜の襲撃のスキルLv.+3
            // 4. ガイアのHPが20％の時に自動発動される。
            //    HP上限30％相当のシールドを吸収するシールド生成し、継続時間20秒。
            //    シールドは氷ダメージに対して250％の吸収効果がある。60秒毎に1回のみ発動可能。
            // 5. 凛冽なる輪舞のスキルLv.+3
            // 6. 凛冽なる戯れの寒氷の柱が1本追加され、発動するときは元素エネルギーが15回復する。
        }
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
                { name: "1段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 41.0 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 41.0 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 54.4 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 31.5, value2: 34.4 },
                { name: "5段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 67.0 },
                { name: "重撃ダメージ", type: CombatType.Heavy, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 76.8, value2: 86.0 },
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
            // 4. 雷楔継続中に再び星辰帰位を発動すると、刻晴は雷元素バフを獲得する。継続時間5秒。
            // 5. 天街巡遊継続中、刻晴の会心率+15%、元素チャージ効率+15%、継続時間8秒。
            lv5: { items: [CriticalBonusType.Rate, StatusBonusType.EnRec], value: 15.0, limit: "元素爆発継続中", times: 8 },
        },
        conste: {
            // 1. 雷楔継続中に再び星辰帰位を発動すると、刻晴は消失位置と出現位置に攻撃力の50%の雷元素範囲ダメージを与える。
            // 2. 刻晴の通常攻撃と重撃が雷元素の影響を受けた敵に命中した時、50%の確率で元素粒子を1個生成する。5秒毎に1回のみ発動可能。
            // 3. 天街巡遊のスキルLv.+3
            // 4. 刻晴が雷元素の関連反応を起こした10秒間、攻撃力+25%。
            lv4: { items: StatusBonusType.AtkBuf, value: 25.0, limit: "雷元素の関連反応を起こした時", times: 10 },
            // 5. 星辰帰位のスキルLv.+3
            // 6. 通常攻撃、重撃、元素スキルまたは元素爆発を発動する時、刻晴の与える雷元素ダメージ+6%、継続時間8秒。
            lv6: { items: ElementBonusType.Elect, value: 6.0, limit: "通常攻撃、重撃、元素スキルまたは元素爆発を発動する時", times: 8 },
            //    通常攻撃、重撃、元素スキルまたは元素爆発の発動による効果はそれぞれ別々でカウントされる。
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
            // 4. ボンボン爆弾と通常攻撃が敵にダメージを与える時、50%の確率でクレーが爆裂花火を獲得する。
            //    重撃を発動する時はスタミナの変わりに爆裂花火を優先的に消費し、さらに与えるダメージ+50%
            // 5. クレーの重撃が会心発生した後、チーム全員の元素エネルギーが2回復する。
            lv5: { items: CombatBonusType.Heavy, value: 50.0, limit: "爆裂花火を消費した時", times: 25 },
        },
        conste: {
            // 1. 攻撃やスキル発動の際に、一定確率で花火を召喚し敵を攻撃、ドッカン花火攻撃力の120%ダメージを与える。
            // 2. ボンボン爆弾ブービートラップダメージを受けた敵の防御力-23%、継続時間10秒
            lv2: { extra: ExtraBonusType.Reduct, type: ReductBonusType.Def, value: 23.0, limit: "ブービートラップダメージを受けた敵", times: 10 },
            // 3. ボンボン爆弾のスキルLv.+3
            // 4. ドッカン花火継続中にキャラを切り替えると、爆発が発生し、攻撃力の555%の炎範囲ダメージを与える。
            // 5. ドッカン花火のスキルLv.+3
            // 6. ドッカン花火状態中、クレーは3秒毎にチーム全員（クレーを除く）の元素エネルギーを3回復する。
            //    ドッカン花火発動後25秒間、チーム全員の炎ダメージ+10%。
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
            // 4. 重撃が命中した時、敵に蒼雷の誘雷効果を付与する。
            // 5. 薔薇の雷光攻撃を受けた敵の防御力-15%、継続時間10秒。
            lv5: { extra: ExtraBonusType.Reduct, type: ReductBonusType.Def, value: 15.0, limit: "元素爆発の攻撃を受けた敵", times: 10 },
        },
        conste: {
            // 1. 蒼雷を長押しで発動した後、敵に命中する度にリサの元素エネルギー+2。一回で最大10まで回復可能。
            // 2. 蒼雷長押し時に下記の効果がある:
            //    ・防御力+20%
            //    ・リサの中断耐性をアップする
            lv2: { items: StatusBonusType.DefBuf, value: 20.0, limit: "スキル長押し中" },
            // 3. 薔薇の雷光のスキルLv.+3
            // 4. 薔薇の雷光が攻撃する時、放つ稲妻が1～3本に増加する。
            // 5. 蒼雷のスキルLv.+3
            // 6. 登場時、周囲の敵に蒼雷の誘雷効果を3重付与する。この効果は5秒毎に1回のみ発動する。
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
            // 4. 虚実流動状態に入った2秒後、周囲に敵がいる場合は自動的に虚影を1つ生成する。
            //    虚影は2秒間存在し破裂する。破裂ダメージは水中幻願のダメージの50%。
            // 5. モナの与える水ダメージが増加する。増加量はモナの元素チャージ効率の20%に相当する。
            lv5: { extra: ExtraBonusType.Flat, dest: ElementBonusType.Hydro, base: StatusBonusType.EnRec, value: 20.0 },
        },
        conste: {
            // 1. チーム内の自身のキャラクターの攻撃が星異状態の敵に命中した8秒間、水元素の関連反応の効果が上昇する：
            //    ・感電反応ダメージ+15%、蒸発反応ダメージ+15%。水元素の拡散反応によるダメージ+15%。凍結反応の継続時間+15%
            lv1: { items: [ReactionBonusType.Echarge, ReactionBonusType.Vaporize/*contact hydro*/], value: 15.0 },
            // 2. 通常攻撃が命中した時、20%の確率で自動的に重撃を発動する。
            // 3. 星命定軌のスキルLv.+3
            // 4. チーム内の自身のキャラクターが星異状態の敵を攻撃する時、会心率+15%。
            lv4: { items: CriticalBonusType.Rate, value: 15.0, limit: "星異状態の敵を攻撃する時", target: BonusTarget.All },
            // 5. 水中幻願のスキルLv.+3
            // 6. モナが虚実流動状態に入った後、1秒移動する毎に、次の重撃ダメージ+60%。最大180%まで、継続時間8秒。
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
            // 4. 星璇がついている間に、凝光の重撃はスタミナを消費しない。
            // 5. 璇璣屏を突き抜けたキャラの岩ダメージ+12%、継続時間10秒
            lv5: { items: ElementBonusType.Geo, value: 12.0, limit: "璇璣屏を突き抜けたキャラ", times: 10, target: BonusTarget.All },
        },
        conste: {
            // 1. 通常攻撃が命中すると範囲ダメージを与える。
            // 2. 璇璣屏が破裂した時、クールタイムがリセットする。6秒毎に1回のみ発動可能。
            // 3. 王権崩玉のスキルLv.+3
            // 4. 璇璣屏付近のキャラクターの全元素耐性+10%
            // 5. 璇璣屏のスキルLv.+3
            // 6. 天権崩玉を放つ時、凝光は七枚の星璇を生成する。
        }
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
                { name: "1段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 79.1 },
                { name: "2段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 73.4 },
                { name: "3段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 86.3 },
                { name: "4段ダメージ", type: CombatType.Normal, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 113 },
                { name: "連続重撃ダメージ", type: CombatType.Heavy, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 50.7 },
                { name: "重撃終了ダメージ", type: CombatType.Heavy, elem: CombatElementType.Switch, scale: DamageScale.Phys, value: 90.5 },
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
        passive: {
            // 4. ノエルが待機時、出場中のキャラクターのHPが30%以下になると自動発動される：
            //    出場している自身のキャラクターに、ノエルの防御力400%相当のダメージを吸収シールドを付与する、継続時間20秒。該当効果は60秒毎に1回のみ発動する。
            // 5. 通常攻撃または重撃が4回命中するたびに、護心鎧のクールタイム-1秒。
            //    攻撃が同時に複数の敵に命中した場合は1回としてカウントされる
        },
        conste: {
            // 1. 同時に大掃除と護心鎧状態に居るとき、護心鎧のHP回復効果の発動率は100％になる
            // 2. ノエルの重撃によるスタミナ消費-20%、与えるダメージ+15%。
            lv2: { items: CombatBonusType.Heavy, value: 15.0 },
            // 3. 護心鎧のスキルLv.+3
            // 4. 護心鎧の効果終了時、またはダメージによって破壊されたとき、周囲の敵に攻撃力の400%の岩ダメージを与える
            // 5. 大掃除のスキルLv.+3
            // 6. 大掃除発動で、ノエルの防御力50%相当の攻撃力を追加でアップする。
            lv6: { extra: ExtraBonusType.Flat, dest: StatusBonusType.Atk, base: StatusBonusType.Def, value: 50.0, limit: "元素爆発継続中" },
            //    スキル継続中、敵1体倒すたびに、継続時間+1秒、最大10秒まで
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
        special: StatusBonusType.Other, // HealBuf
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
        passive: {
            // 4. 仙法・寒病鬼差状態時のキャラクターが元素反応を起こした時、被回復量+20%、継続時間8秒。
            // 5. 七七の通常攻撃と重撃が敵に命中する時、50%の確率で敵に度厄のお札を1枚付与する、継続時間6秒、30秒毎に一回発動可能。
        },
        conste: {
            // 1. 寒病鬼差が度厄のお礼マークのついた敵に命中した時、七七の元素エネルギーを2回復する。
            // 2. 氷元素の影響を受けた敵に、七七の通常攻撃と重撃の与えるダメージ+15％。
            lv2: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: 15.0, limit: "氷元素の影響を受けた敵" },
            // 3. 仙法・救苦度厄のスキルLv.3
            // 4. 度厄のお札マークのついた敵の攻撃力-20％。
            // 5. 仙法・寒病鬼差のスキルLv.3
            // 6. 仙法·救苦度厄を発動する時、近くにいるチーム内全ての戦闘不能状態のキャラクターを復活させ、HPの50%を回復する。
            //    この効果は15分毎に1回のみ発動可能。
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
            // 4. 鋭い爪と蒼雷のクールタイムが18％減少する。雷牙を放つ時、鋭い爪と蒼雷のクールタイムをリセットする。
            // 5. レザーの元素エネルギーが50％以下になると、元素チャージ効率30％上昇する。
            lv5: { items: StatusBonusType.EnRec, value: 30.0, limit: "元素エネルギーが50%以下の時" },
        },
        conste: {
            // 1. レザーが元素オーブまたは元素粒子を獲得した8秒内、与えるダメージが10％上昇する。
            lv1: { items: StatusBonusType.AnyDmg, value: 10.0, limit: "元素オーブまたは元素粒子を獲得した時", times: 8 },
            // 2. HPが30％以下の敵を攻撃する時、会心率が10％上昇する。
            lv2: { items: CriticalBonusType.Rate, value: 10.0, limit: "HPが30％以下の敵を攻撃する時" },
            // 3. 雷牙のスキルLv.+3
            // 4. 鋭い爪と蒼雷の一回押しで攻撃時、命中された敵の防御力が15%減少する、継続時間7秒。
            lv4: { extra: ExtraBonusType.Reduct, type: ReductBonusType.Def, value: 15.0, limit: "元素スキル一回押しで攻撃した時", times: 7 },
            // 5. 鋭い爪と蒼雷のスキルLv.+3
            // 6. 10秒毎に、レザーの大剣が自動的にエネルギーを溜め、次の通常攻撃に落雷を引き起こし、攻撃力の100％の雷ダメージを与える。
            //    雷牙状態でない時、落雷が敵に命中すると、レザーに鋭い爪と蒼雷の雷の印を1重付与する。
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
            // 4. スクロースが拡散反応を起こした時、該当元素のチームメンバー全員（スクロース自身を除く）の元素熟知+50、継続時間8秒。
            lv4: { items: StatusBonusType.Elem, value: 50, limit: "拡散反応を起こした時、該当元素のキャラ", times: 8, target: BonusTarget.Other },
            // 5. 「風霊作成·六三〇八」又は「禁·風霊作成·七五同構弐型」が敵に命中した時、スクロースの元素熟知の20%を基準に、チーム内キャラクター全員（スクロース自身を除く）の元素熟知を強化、継続時間8秒。
            lv5: { extra: ExtraBonusType.Flat, dest: StatusBonusType.Elem, base: StatusBonusType.Elem, value: 20.0, limit: "元素スキル・元素爆発が敵に命中した時", times: 8, target: BonusTarget.Other },
        },
        conste: {
            // 1. 風霊作成・六三〇八の発動可能回数+1。
            // 2. 禁・風霊作成・七五同構弐型のスキル継続時間+2秒。
            // 3. 風霊作成・六三〇八のスキルLv.+3
            // 4. スクロースが通常攻撃または重撃を7回発動すると、風霊作成・六三0八のクールタイムはランダムに1～7秒減少する。
            // 5. 禁・風霊作成・七五同構弐型のスキルLv.+3
            // 6. 禁・風霊作成・七五同構弐型に元素変化があった場合、スキル継続中にチーム全員の該当元素ダメージ+20%。
            // TODO: lv6: { items: CombatElementType.Contact, value: 20, limit: "元素爆発に元素変化があった場合、スキル継続中" },
        }
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
        passive: {
            // 4. 断流効果の継続時間が8秒延長する。
            // 5. 魔王の武装・荒波の近接モード時、通常攻撃と重撃が会心を発生すると、命中した敵に断流効果を付与する。
        },
        conste: {
            // 1. 魔王の武装・荒波のクールタイムが20%減少する。
            // 2. 断流効果の影響を受けた敵が倒されると、タルタリヤの元素エネルギーが4回復する。
            // 3. 魔王の武装・荒波のスキルLv.+3
            // 4. 4秒毎に、タルタリヤによって発動された断流効果がフィールドに存在する時、タルタリヤが魔王の武装・荒波の近接モードの場合、断流・斬を発動する。それ以外の場合、断流・閃を発動する。
            //    この効果によって発動された断流・斬と断流・閃は、この二つのスキル本来の発動時間制限を受けない。また、本来のスキルへの発動時間制限にも影響を与えない。
            // 5. 極悪技・尽滅閃のスキルLv.+3
            // 6. 極悪技・尽滅閃発動時、魔王の武装・荒波のクールタイムをリセットする。この効果は遠隔モードに戻った後に発動する。
        }
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
        passive: {
            // 4. 高天の歌を長押しした後、上昇気流が発生する、継続時間20秒。
            // 5. 風神の詩効果終了後、ウェンティの元素エネルギーを15回復する。
            //    元素変化があった場合、該当元素のチームメンバーの元素エネルギーを15回復する。
        },
        conste: {
            // 1. 狙い撃ちする時、分裂した矢を追加で2本放つ。それぞれ元の矢の33%のダメージを与える
            lv2: [
                // 2. 高天の歌発動後、敵の風耐性と物理耐性-12%、継続時間10秒。
                { extra: ExtraBonusType.Reduct, type: [ElementType.Anemo, ElementType.Phys], value: 12.0, limit: "元素スキル発動後", times: 10 },
                //    高天の歌によってノックバックされた敵は着地する前に、更に風耐性と物理耐性-12%
                { extra: ExtraBonusType.Reduct, type: [ElementType.Anemo, ElementType.Phys], value: 12.0, limit: "さらにノックバックした敵が着地する前" },
            ],
            // 3. 風神の詩のスキルLv.+3
            // 4. 元素オーブまたは元素粒子を獲得した後、風ダメージ+25%、継続時間10秒。
            lv4: { items: ElementBonusType.Anemo, value: 25.0, limit: "元素オーブまたは元素粒子を獲得した時", times: 10 },
            // 5. 高天の歌のスキルLv.+3
            // 6. 風神の詩の影響を受ける敵の風属性-20%。元素変化があった場合、変化した元素の耐性-20%。
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
            // 4. グゥオパァーの噴火距離が20％上昇する。
            // 5. グゥオパァー出撃効果終了時、グゥオパァーは消える位置に唐辛子を残す。唐辛子を拾うと、攻撃力10％上昇する。継続時間10秒。
            lv5: { items: StatusBonusType.AtkBuf, value: 10.0, limit: "唐辛子を拾った時", times: 10 },
        },
        conste: {
            // 1. グゥオパァーに攻撃された敵の炎耐性が15％減少する、継続時間6秒。
            lv1: { extra: ExtraBonusType.Reduct, type: ElementType.Pyro, value: 15.0, limit: "グゥオパァーに攻撃された敵", times: 6 },
            // 2. 通常攻撃の最後一撃で敵に2秒継続する爆縮効果を与える。効果終了時に爆発し、敵に75％の炎範囲ダメージを与える。
            // 3. 旋火輪のスキルLv.+3
            // 4. 旋火輪の継続時間が40％上昇する。
            // 5. グゥオパァー出撃のスキルLv.+3
            // 6. 旋火輪継続中、チーム全員の炎ダメージが15％上昇する。
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
            // burst. 魈のジャンプ力が大幅にアップする。
            //        攻撃範囲が広がり、与えるダメージが上昇する。攻撃ダメージによって他の元素に変化することはない。
            //        この状態の魈は、HPが持続的に減少する。この効果は魈が退場する時に解除される。
            burst: { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Combat, base: FlatBonusBase.None, value: 58.5, scale: DamageScale.Xiao, limit: "元素爆発発動後", times: 15 },
            // 4. 靖妖儺舞状態の時、魈の与える全ダメージ+5%。また、スキル継続中、3秒毎に与える全ダメージが更に+5%。最大25％まで。
            lv4: { items: StatusBonusType.AnyDmg, value: 5.0, limit: "元素爆発継続中3秒毎", stack: 5 },
            // 5. 風輪両立発動後の7秒間、風輪両立によるダメージ+15%。継続時間7秒、最大3重まで、重複で発動すると継続時間がリセットされる。
            lv5: { items: CombatBonusType.Skill, value: 15.0, limit: "元素スキル発動後", times: 7, stack: 3 },
        },
        conste: {
            // 1. 風輪両立の使用可能回数+1。
            // 2. フィールド上にいない時、魈自身の元素チャージ効率+25%。
            lv2: { items: StatusBonusType.EnRec, value: 25.0, limit: "フィールド上にいない時" },
            // 3. 風輪両立のスキルLv.+3。
            // 4. 魈のHPが50%未満の時、防御力+100%。
            lv4: { items: StatusBonusType.DefBuf, value: 100.0, limit: "HPが50%未満の時" },
            // 5. 靖妖儺舞のスキルLv.+3。
            // 6. 靖妖儺舞状態の時、落下攻撃が2体以上の敵に命中すると、風輪両立の使用回数+1。
            //    その後の1秒間以内は、クールタイム関係なく風輪両立を発動できる。
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
            // 4. 雨すだれの剣が破壊、または継続時間が終了したとき、行秋のHP上限の6％を基準に出場キャラのHPを回復する。
            // 5. 行秋の水ダメージ+20％。
            lv5: { items: ElementBonusType.Hydro, value: 20.0 },
        },
        conste: {
            // 1. 雨すだれの剣の最大本数+1。
            // 2. 古華剣・裁雨留虹の継続時間＋3秒。その他、剣雨攻撃を受けた敵の水耐性-15％、継続時間4秒。
            lv2: { extra: ExtraBonusType.Reduct, type: ElementType.Hydro, value: 15.0, limit: "元素爆発の攻撃を受けた敵", times: 4 },
            // 3. 古華剣・裁雨留虹のスキルLv.+3
            // 4. 古華剣・裁雨留虹継続中、古華剣・画雨籠山の与えるダメージ+50％。
            lv4: { items: CombatBonusType.Skill, value: 15.0, limit: "元素爆発継続中" },
            // 5. 古華剣・画雨籠山のスキルLv.+3
            // 6. 古華剣・裁雨留虹が剣雨攻撃を2回発動する度に、次の剣雨攻撃が大幅に強化され、敵に命中する時、行秋の元素エネルギーを3回復する。
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
            // 4. 情熱の薙ぎ払いのシールド発動に必要な命中数を減少する：
            //    ・Lv2シールド・指揮のリズム：1名の敵に命中する；
            //    ・Lv3シールド・舞のリズム：2名の敵に命中する。
            // 5. 情熱の薙ぎ払いのシールドが存在する時、キャラクターが与える物理ダメージが15%上昇する。
            lv5: { items: ElementBonusType.Phys, value: 15.0, limit: "元素スキルのシールドが存在する時" },
        },
        conste: {
            // 1. 会心攻撃が発生した5秒間、通常攻撃と重撃の攻撃速度が12%上昇する。5秒毎に1回のみ発動可能。
            // 2. 反逆の弾きによる物理ダメージの会心率を100%上昇させる。さらに発動する時にLv3シールド・舞のリズムを生成する。
            // TODO: lv2: { items: CriticalBonusType.Burst/*for Phys*/, value: 100.0 },
            // 3. 情熱の薙ぎ払いのスキルLv.+3
            // 4. 情熱の薙ぎ払いの振り回しダメージを受けた敵の物理耐性が15%減少する、継続時間12秒。
            lv4: { extra: ExtraBonusType.Reduct, type: ElementType.Phys, value: 15.0, limit: "元素スキルのダメージを受けた敵", times: 12 },
            // 5. 反逆の弾きのスキルLv.+3
            // 6. 辛炎の重撃によるスタミナ消費-30%。重撃を発動する時、辛炎の防御力50%分の攻撃力が増加する。
            // TODO: lv6: { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Atk/*for Heavy*/, base: FlatBonusBase.Def, value: 50.0 },
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
            // 4. 玉璋シールドはダメージを受けた際に防御効果を発動する。
            //    玉璋シールドに守られたキャラクターのシールド強化+5%。
            //    シールドが消えるまで、最大5回強度を上げることができる。
            // 5. 天星のダメージ量が鍾離のHP上限の33%分上昇する。
            lv5: [
                { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Combat, base: StatusBonusType.Hp, value: 1.39 },
                { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Skill, base: StatusBonusType.Hp, value: 1.9 },
                { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Burst, base: StatusBonusType.Hp, value: 100.0 / 3 },
            ]
        },
        conste: {
            // 1. 地心の岩柱は最大2個同時に存在できる。
            // 2. 天星落下時、近くにいる出場中のキャラクターに玉璋シールドを付与する。
            // 3. 地心のスキルLv.がが3つ上昇する。
            // 4. 天星の影響範囲が20%拡大する。さらに天星の石化効果の継続時間2秒延長する。
            // 5. 天星のスキルLv.+3
            // 6. 玉璋シールドがダメージを受けた時、そのダメージ量の40%分のHPを回復させる。一回の回復上限はキャラクターのHP上限の8%。
        }
    },
} as const;

// https://bbs.mihoyo.com/ys/article/2160993
const ENEMY_LIST: DeepReadonly<IMap<IEnemy>> = {
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
        name: "ヴィシャップ・岩（元素変化・火）",
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
        name: "エンシェントヴィシャップ・岩（火）",
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
        name: "エンシェントヴィシャップ・岩（火・ダウン）",
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
} as const;
