import * as konst from "~/src/const";
import { BonusValue, IIdentify, INameable, ICommentable, ICharaInfo } from "~/src/interface";
import * as ascension from "~/src/ascension";
import { SettingChara } from "~/src/setting";
import { MonaBurstBonus, RaidenEnrecBonus, SayuBurstBonus } from "~/src/special";

export const CharaNames = [
    "TravelAnemo",
    "TravelGeo",
    "TravelElect",
    "Albedo",
    "Aloy",
    "Amber",
    "Arataki", // Itto
    "Barbara",
    "Beidou",
    "Bennett",
    "Chongyun",
    "Diluc",
    "Diona",
    "Eula",
    "Fischl",
    "Ganyu",
    "Goro",
    "Hutao",
    "Jean",
    "Kaedehara", // Kazuha,
    "Kaeya",
    "Keqing",
    "Kamisato", // Ayaka
    "Ayato", // KamisatoAyato
    "Klee",
    "Kujo", // Sara
    "Lisa",
    "Mona",
    "Ningguang",
    "Noelle",
    "Qiqi",
    "Raiden", // Shogun
    "Razor",
    "Rosaria",
    "Sangonomiya", // Kokomi
    "Sayu",
    "Shenhe",
    "Sucrose",
    "Tartaglia",
    "Thoma",
    "Venti",
    "Xiangling",
    "Xiao",
    "Xingqiu",
    "Xinyan",
    "YaeMiko",
    "Yanfei",
    "Yoimiya",
    "YunJin",
    "Zhongli",
] as const;
export type CharaName = typeof CharaNames[number];

export const CharaList: ReadonlyRecord<CharaName, ICharaInfo> = {
    TravelAnemo: {
        star: 5,
        element: konst.ElementType.Anemo,
        energy: 60,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                912, 2342,
                3024, 4529,
                5013, 5766,
                6411, 7164,
                7648, 8401,
                8885, 9638,
                10122, 10875,
            ],
            atk: [
                18, 46,
                59, 88,
                98, 113,
                125, 140,
                149, 164,
                174, 188,
                198, 212,
            ],
            def: [
                57, 147,
                190, 284,
                315, 362,
                405, 450,
                480, 527,
                558, 605,
                635, 683,
            ],
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 44.5 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.4 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 53.0 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 58.3 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 70.8 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [55.9, 60.7, 72.2] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "traveler.tear_init", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 12.0 },
                { name: "traveler.tear_max", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 16.8 },
                { name: "traveler.expl_init", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 176 },
                { name: "traveler.expl_max", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 192 },
            ],
            burst: [
                { name: "traveler.tornado", type: konst.CombatType.Burst, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 80.8 },
                { name: "general.contact", type: konst.CombatType.Burst, elem: konst.CombatElementType.Contact, scale: konst.DamageScale.Elem, value: 24.8 },
            ],
        },
        passive: {
            // 4. 通常攻撃の最後の一撃が風の刃を放ち、風の刃は途中の敵に60%攻撃力の風ダメージを与える。
            // 5. 旋風の剣で敵を倒した後、1秒ごとにHPを2%回復する。継続時間5秒。5秒に1回のみ発動可能。
        },
        conste: {
            // 1. 旋風の剣は周囲5メートル以内の敵をゆっくりと自分の前に吸い寄せることができる。
            // 2. 元素エネルギー回復効率+16%
            lv2: { items: konst.StatusBonusType.EnRec, value: 16.0 },
            // 3. 激風の息のスキルLv.+3
            // 4. 旋風の剣継続中､自身の受けるダメージ-10%
            // 5. 旋風の剣のスキルLv.3
            // 6. 激風の息によるダメージを受けた目標の風耐性-20%
            lv6: [
                {
                    extra: konst.ExtraBonusType.Reduct,
                    type: konst.ElementType.Anemo,
                    value: 20.0,
                    limit: "burst.hit",
                    target: konst.BonusTarget.All,
                },
                //    元素変化があった場合､該当の元素耐性-20%
                {
                    extra: konst.ExtraBonusType.Reduct,
                    type: konst.CombatElementType.Contact,
                    value: 20.0,
                    limit: "elem.change",
                    target: konst.BonusTarget.All,
                },
            ],
        },
    },
    TravelGeo: {
        star: 5,
        element: konst.ElementType.Geo,
        energy: 60,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                912, 2342,
                3024, 4529,
                5013, 5766,
                6411, 7164,
                7648, 8401,
                8885, 9638,
                10122, 10875,
            ],
            atk: [
                18, 46,
                59, 88,
                98, 113,
                125, 140,
                149, 164,
                174, 188,
                198, 212,
            ],
            def: [
                57, 147,
                190, 284,
                315, 362,
                405, 450,
                480, 527,
                558, 605,
                635, 683,
            ]
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 44.5 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.4 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 53.0 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 58.3 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 70.8 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [55.9, 60.7, 72.2] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 248 },
            ],
            burst: [
                { name: "traveler.quake", type: konst.CombatType.Burst, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 148 },
            ],
        },
        passive: {
            // 4. 星落としの剣のクールタイム-2秒
            // 5. 通常攻撃の最後1撃は岩崩れを発生させ、範囲内の敵に攻撃力の60%の岩ダメージを与える
        },
        conste: {
            // 1. チーム内キャラクターが「岩潮幾重」の岩の山に包囲されている時、会心率+10%、中断耐性がアップする。
            lv1: {
                items: konst.CriticalBonusType.Rate,
                value: 10.0,
                limit: "burst.area",
                target: konst.BonusTarget.All,
            },
            // 2. 星落としの剣の荒星が破壊される時に爆破が再び発生し、周囲の敵に星落としの剣のダメージ相当の岩範囲ダメージを与える。
            // 3. 岩潮幾重のスキルLv.+3
            // 4. 岩潮幾重が引き起こす振動波が的に命中する度に、元素エネルギーが5回復する。この方法で1回で最大25まで回復可能。
            // 5. 星落としの剣のスキルLv.3
            // 6. 岩潮幾重の岩の山の継続時間+5秒
            //    星落としの剣荒星の継続時間+10秒
        },
    },
    TravelElect: {
        star: 5,
        element: konst.ElementType.Elect,
        energy: 60,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                912, 2342,
                3024, 4529,
                5013, 5766,
                6411, 7164,
                7648, 8401,
                8885, 9638,
                10122, 10875,
            ],
            atk: [
                18, 46,
                59, 88,
                98, 113,
                125, 140,
                149, 164,
                174, 188,
                198, 212,
            ],
            def: [
                57, 147,
                190, 284,
                315, 362,
                405, 450,
                480, 527,
                558, 605,
                635, 683,
            ],
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 44.5 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.4 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 53.0 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 58.3 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 70.8 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [55.9, 60.7, 72.2] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 79 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 114.4 },
                { name: "traveler.thunder", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 32.8 },
            ],
        },
        passive: {
            // skill. 豊穣の勾玉　キャラクターが近寄ると、豊穣の勾玉を吸収し、下記効果を獲得する。
            // 元素エネルギーが回復する。継続時間内、元素チャージ効率がアップする。
            skill: { items: konst.StatusBonusType.EnRec, value: 20.0, limit: "traveler.magatama", times: 6 },
            // 4. 周囲のチームメンバー（旅人自身を除く）が雷影剣で生成された豊穣の勾玉を拾うと、雷影剣のクールタイム-1.5秒
            // 5. 旅人自身の元素チャージ効率の10%を基準に、雷影剣が生成した豊穣の勾玉による元素チャージ効率をアップする
            asc4th: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.EnRec,
                base: konst.FlatBonusBase.EnRec,
                value: 10.0,
                limit: "traveler.magatama",
                times: 6,
                target: konst.BonusTarget.All,
            },
        },
        conste: {
            // 1. 雷影剣発動時に生成する豊穣の勾玉の数を3つにアップ。
            // 2. 電光雷轟の威光の落雷が敵に命中すると、敵の雷元素耐性-15%、継続時間8秒。
            lv2: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Elect,
                value: 15,
                limit: "traveler.thunderbolt",
                times: 8,
                target: konst.BonusTarget.All,
            },
            // 3. 電光雷轟のスキルLv.+3
            // 4. キャラクターが雷影剣で生成した豊穣の勾玉を獲得した時、該当キャラクターの元素エネルギーが35%未満の場合、豊穣の勾玉で回復できる元素エネルギー+100%。
            // 5. 雷影剣のスキルLv.+3
            // 6. 電光雷轟が威光の落雷を2回引き起こすたび、次の威光の落雷を大幅に強化し、本来の200%分のダメージを与え、さらに現在のキャラクターの元素エネルギーを1ポイント回復する。
        },
    },
    Albedo: {
        star: 5,
        element: konst.ElementType.Geo,
        energy: 40,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                1030, 2671,
                3554, 5317,
                5944, 6839,
                7675, 8579,
                9207, 10119,
                10746, 11669,
                12296, 13226,
            ],
            atk: [
                20, 51,
                68, 101,
                113, 130,
                146, 163,
                175, 192,
                204, 222,
                233, 251,
            ],
            def: [
                68, 177,
                235, 352,
                394, 453,
                508, 568,
                610, 670,
                712, 773,
                815, 876,
            ]
        },
        special: konst.ElementBonusType.Geo,
        spvalue: [0.0, 0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 36.7 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 36.7 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 47.5 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 49.8 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 62.1 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [47.3, 60.2] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 130 },
                { name: "albedo.moment", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 134, based: konst.DamageBased.Def },
            ],
            burst: [
                { name: "general.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 367 },
                { name: "albedo.death", type: konst.CombatType.Burst, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 72 },
            ],
        },
        passive: {
            // 4. 創生術・擬似陽華の刹那の花がHP50％以下の敵にダメージを与えた場合、ダメージ量+25％
            asc1st: { items: konst.CombatBonusType.Skill, value: 25.0, limit: "albedo.skill_hple50" },
            // 5. 誕生式・大地の潮を発動した時、付近のチーム内キャラクターの元素熟知を+125、継続時間10秒。
            asc4th: {
                items: konst.StatusBonusType.Elem,
                value: 125,
                limit: "burst.hit",
                times: 10,
                target: konst.BonusTarget.All,
            },
        },
        conste: {
            // 1. アルベドの創生術・疑似陽華の刹那の花が放たれた時、アルベド自身の元素エネルギーが1.2回復する。
            // 2. 創生術・疑似陽華の刹那の花が放たれた時、アルベドに生滅カウントを付与する。継続時間30秒。
            //    誕生式・大地の潮を発動する時、全ての生滅カウントを取り除く。取り除かれた数によって、誕生式・大地の潮の爆発ダメージと生滅の花のダメージが上昇する。
            //    生滅カウント1つにつき、アルベドの防御力30％分のダメージが上昇する。
            //    生滅カウントは最大4重まで。
            lv2: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Burst,
                base: konst.FlatBonusBase.Def,
                value: 30.0,
                limit: "albedo.burst_count",
                stack: 4,
            },
            // 3. 創生術・疑似陽華のスキルLv.+3
            // 4. 陽華のエリア内にいるキャラクターの落下攻撃ダメージ+30%。
            lv4: { items: konst.CombatBonusType.Plunge, value: 30.0, limit: "burst.area", target: konst.BonusTarget.All },
            // 5. 誕生式・大地の潮のスキルLv.+3
            // 6. 陽華のエリア内にいるフィールド上のキャラクターが、結晶反応で生成されたシールド状態にある時、与えるダメージ+17%。
            lv6: { items: konst.BonusType.Damage, value: 17.0, limit: "albedo.burst_crystal" },
        },
    },
    Aloy: {
        star: 5,
        element: konst.ElementType.Cryo,
        energy: 40,
        weapon: konst.WeaponType.Bow,
        status: {
            hp: [
                848, 2201,
                2928, 4382,
                4899, 5636,
                6325, 7070,
                7587, 8339,
                8856, 9616,
                10133, 10899,
            ],
            atk: [
                18, 47,
                63, 94,
                105, 121,
                136, 152,
                163, 179,
                190, 206,
                217, 234,
            ],
            def: [
                53, 137,
                182, 272,
                304, 350,
                393, 439,
                471, 517,
                550, 597,
                629, 676,
            ]
        },
        special: konst.ElementBonusType.Cryo,
        spvalue: [0.0, 0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [21.1, 23.8] },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.1 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 52.8 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 65.6 },
                { name: "general.aim", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.9 },
                { name: "general.fully", type: konst.CombatType.Heavy, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 124 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "aloy.ice", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 178 },
                { name: "aloy.frozen", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 40 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 359 },
            ],
        },
        passive: {
            // skill. コイル
            // ・層数を基準に、アーロイの通常攻撃ダメージをアップさせる。
            // ・コイルを4層所有する時、アーロイのコイル効果は全てクリアされ、「アイスラッシュ」を獲得する。
            // 通常攻撃ダメージをさらにアップさせ、通常攻撃が氷元素ダメージに変化する。
            skill: [
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.NormalDmg,
                    value: 5.85,
                    limit: "skill.hit",
                    scale: { type: konst.DamageScale.Xiao, talent: konst.TalentType.Skill },
                    stack: 3,
                    times: 10,
                },
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.NormalDmg,
                    value: 29.2,
                    limit: "aloy.ice_rush",
                    scale: { type: konst.DamageScale.Xiao, talent: konst.TalentType.Skill },
                    times: 10,
                },
                {
                    extra: konst.ExtraBonusType.Enchant,
                    elem: konst.EnchantType.Cryo,
                    limit: "aloy.ice_rush",
                    dest: [konst.CombatType.Normal],
                    times: 10,
                },
            ],
            // 4. アーロイが凍てついた大地のコイル効果を獲得した時、アーロイの攻撃力+16％、周囲にいるチーム内他のキャラクターの攻撃力+8％、持続時間10秒。
            asc1st: [
                {
                    items: konst.FlatBonusDest.AtkBuf,
                    value: 16,
                    limit: "aloy.get_coil",
                    times: 10,
                },
                {
                    items: konst.FlatBonusDest.AtkBuf,
                    value: 8,
                    limit: "aloy.get_coil",
                    times: 10,
                    target: konst.BonusTarget.Other,
                },
            ],
            // 5. 凍てついた大地のアイスラッシュ状態にある時、1秒毎に氷元素ダメージ+3.5％、この方式での氷元素ダメージアップ効果は35％まで。
            asc4th: { items: konst.FlatBonusDest.CryoDmg, value: 3.5, limit: "aloy.per_1sec_rush", stack: 10, times: 10 },
        },
        conste: {
            // 1. 
            // 2. 
            // 3. 
            // 4. 
            // 5. 
            // 6. 
        }
    },
    Arataki: {
        star: 5,
        element: konst.ElementType.Geo,
        energy: 70,
        weapon: konst.WeaponType.Claymore,
        status: {
            hp: [
                1001, 2597,
                3455, 5170,
                5779, 6649,
                7462, 8341,
                8951, 9838,
                10448, 11345,
                11954, 12858,
            ],
            atk: [
                18, 46,
                61, 91,
                102, 117,
                132, 147,
                158, 174,
                185, 199,
                211, 227,
            ],
            def: [
                75, 194,
                258, 386,
                431, 496,
                557, 622,
                668, 734,
                779, 846,
                892, 959,
            ],
        },
        special: konst.CriticalBonusType.Rate,
        spvalue: [0.0, 0.0, 0.0, 4.8, 9.6, 9.6, 14.4, 19.2],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 79.2 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 86.4 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 91.6 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 117.2 },
                { name: "arataki.keep", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 91.2 },
                { name: "arataki.last", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 190.9 },
                { name: "arataki.left", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 90.5 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 81.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 164 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 204 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 307 },
            ],
            burst: [],
        },
        passive: {
            // 通常攻撃、重撃、落下攻撃ダメージは、元素付与によって他の元素に変化しない岩元素ダメージへと変わる。
            // 荒瀧一斗自身の通常攻撃の攻撃速度がアップし、そして防御力を基準に攻撃力がアップする。
            burst: [
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Atk,
                    base: konst.FlatBonusBase.Def,
                    value: 57.6,
                    scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                    limit: "burst.using",
                    times: 11,
                },
                {
                    extra: konst.ExtraBonusType.Enchant,
                    elem: konst.ElementType.Geo,
                    dest: [konst.CombatType.Normal, konst.CombatType.Heavy, konst.CombatType.Plunge],
                    limit: "burst.using",
                    times: 11,
                }
            ],
            // 4. 荒瀧一斗が連続で「荒瀧逆袈裟」を発動した時、下記効果を獲得する。
            // ・斬撃を繰り出すたびに、その後の斬撃の攻撃速度 +10%。この方式でアップできる攻撃速度は30% まで。
            // ・中断耐性がアップ。
            // これらの効果は連続斬撃が終了した時にクリアされる。
            // 5. 「荒瀧逆袈裟」のダメージが荒瀧一斗の防御力35%分アップする。
            asc4th: {
                extra: konst.ExtraBonusType.Combat,
                bind: ["arataki.keep", "arataki.last"],
                base: konst.StatusBonusType.Def,
                value: 35.0,
                format: "arataki.asc4th",
            },
        },
        conste: {
            // 1. 最強鬼王・一斗轟臨!発動後、荒瀧一斗は「乱神の怪力」効果を2層獲得する。発動1秒後、1.5秒の間、荒瀧一斗は0.5秒毎に「乱心の怪力」効果をさらに1層獲得する。
            // 2. 最強鬼王・一斗轟臨!を発動した後、チーム内に"岩元素"タイプキャラクターが1人いる毎に、クールタイム-1.5秒、荒瀧一斗の元素エネルギーを6ポイント回復する。
            // この方式で短縮できるクールタイムは4.5秒までとなり、回復できる元素エネルギーは18ポイントまでとなる。
            // 3. 魔殺絶技・岩牛発破!のスキルLv.+3。
            // 4. 最強鬼王・一斗轟臨!!による「憤怒の鬼王」状態が終了すると、周囲チーム全員の防御力+20%、攻撃力+20%、継続時間10秒。
            lv4: {
                items: [konst.StatusBonusType.DefBuf, konst.StatusBonusType.AtkBuf],
                value: 20,
                limit: "burst.use",
                times: 10,
                target: konst.BonusTarget.All,
            },
            // 5. 最強鬼王・一斗轟臨!!のスキルLv.+3。
            // 6. 荒瀧一斗の重撃の会心ダメージ+70%、また「荒瀧逆袈裟」を発動する時、50％の確率で「乱神の怪力」が消費されなくなる。
            lv6: {
                extra: konst.ExtraBonusType.Combat,
                bind: konst.CombatType.Heavy,
                dest: konst.CombatBonusDest.CriDmg,
                value: 70.0,
                format: "arataki.lv6",
            },
        },
    },
    Amber: {
        star: 4,
        element: konst.ElementType.Pyro,
        energy: 40,
        weapon: konst.WeaponType.Bow,
        status: {
            hp: [
                793, 2038,
                2630, 3940,
                4361, 5016,
                5578, 6233,
                6654, 7309,
                7730, 8385,
                8806, 9461,
            ],
            atk: [
                19, 48,
                62, 93,
                103, 118,
                131, 147,
                157, 172,
                182, 198,
                208, 223,
            ],
            def: [
                50, 129,
                167, 250,
                277, 318,
                354, 396,
                422, 464,
                491, 532,
                559, 601,
            ],
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 36.1 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 36.1 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 46.4 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 47.3 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 59.3 },
                { name: "general.aim", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.9 },
                { name: "general.fully", type: konst.CombatType.Heavy, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 124 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "general.burst", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 123 },
            ],
            burst: [
                { name: "amber.once", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 28.1 },
                { name: "amber.total", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 505 },
            ],
        },
        passive: {
            // 4. 矢の雨の会心率+10%、影響範囲+30%。
            // 5. 狙い撃ちが弱点に命中すると、攻撃力+15%、継続時間10秒。
            asc4th: { items: konst.StatusBonusType.AtkBuf, value: 15.0, limit: "general.weak_aim", times: 10 },
        },
        conste: {
            // 1. 狙い撃ちする時、矢を連続2本放つ。2本目の矢は元の矢の20%のダメージを与える。
            // 2. ウサギ伯爵が改良された!フルチャージの狙い撃ちがウサギ伯爵の足に命中するとウサギ伯爵を直接起爆させられる。
            //    この形で自らウサギ伯爵を起爆させると、追加で200%のダメージを与える。
            // 3. 矢の雨のスキルLv.+3
            // 4. 爆弾人形のクールタイム-20%、使用可能回数が1回増える。
            // 5. 爆弾人形のスキルLv.+3
            // 6. 矢の雨を発動した10秒間、チーム全員の移動速度+15%、攻撃力+15%。
            lv6: {
                items: konst.StatusBonusType.AtkBuf,
                value: 15.0,
                limit: "burst.use",
                times: 10,
                target: konst.BonusTarget.All,
            },
        },
    },
    Barbara: {
        star: 4,
        element: konst.ElementType.Hydro,
        energy: 80,
        weapon: konst.WeaponType.Catalyst,
        status: {
            hp: [
                821, 2108,
                2721, 4076,
                4512, 5189,
                5770, 6448,
                6884, 7561,
                7996, 8674,
                9110, 9787,
            ],
            atk: [
                13, 34,
                44, 66,
                73, 84,
                94, 105,
                112, 123,
                130, 141,
                148, 159,
            ],
            def: [
                56, 144,
                186, 279,
                308, 355,
                394, 441,
                470, 517,
                546, 593,
                623, 669,
            ]
        },
        special: konst.StatusBonusType.HpBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 37.8 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 35.5 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 41.0 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 55.2 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 166 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "barbara.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 58.4 },
            ],
            burst: [],
        },
        passive: {
            // 4. 公演、開始歌声の輪が継続している間、スタミナ消費-12%。
            // 5. 出場している自身のキャラクターが元素オーブまたは元素粒子を獲得時に、公演、開始♪の歌声の輪の継続時間+1秒。この方法で最大5秒まで延長可能。
        },
        conste: {
            // 1. 10秒毎に元素エネルギーを1回復する。
            // 2. 公演開始♪のクールタイム-15％。スキル継続中、出場している自身のキャラクターの与える水ダメージ+15％。
            lv2: {
                items: konst.ElementBonusType.Hydro,
                value: 15.0,
                limit: "skill.using",
                target: konst.BonusTarget.All,
                times: 15,
            },
            // 3. シャイニングミラクル♪のスキルLv.+3
            // 4. 重撃が敵に命中する度に、バーバラの元素エネルギーが1回復する。一回で最大元素エネルギーが5まで回復できる。
            // 5. 公演、開始♪のスキルLv.+3
            // 6. バーバラ待機中にチーム内の自身のキャラクターが死亡すると、下記の効果が発動される
            //    ・死亡したキャラを復活させる
            //    ・該当キャラのHPが100%回復される。
            //    この効果は15分ごとに1回のみ発動可能。
        },
    },
    Beidou: {
        star: 4,
        element: konst.ElementType.Elect,
        energy: 80,
        weapon: konst.WeaponType.Claymore,
        status: {
            hp: [
                1094, 2811,
                3628, 5435,
                6015, 6919,
                7694, 8597,
                9178, 10081,
                10662, 11565,
                12146, 13050,
            ],
            atk: [
                19, 48,
                63, 94,
                104, 119,
                133, 148,
                158, 174,
                184, 200,
                210, 225,
            ],
            def: [
                54, 140,
                180, 270,
                299, 344,
                382, 427,
                456, 501,
                530, 575,
                603, 648,
            ],
        },
        special: konst.ElementBonusType.Elect,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 71.1 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 70.9 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 88.3 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 86.5 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 112 },
                { name: "general.keep", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.2 },
                { name: "general.last", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 102 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 74.6 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 149 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 186 },
            ],
            skill: [
                { name: "beidou.one", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 122 },
                { name: "beidou.two", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 282 },
                { name: "beidou.three", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 442 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 122 },
                { name: "beidou.thunder", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 96 },
            ],
        },
        passive: {
            // 4. 攻撃された時に発動した浪追い反撃は最大ダメージ上昇効果がある。
            // 5. 最大ダメージ上昇効果のある浪追いを発動した10秒内、下記の効果が発動される:
            //    ・通常攻撃と重撃の攻撃速度+15%、攻撃ダメージ+15%
            //    ・重撃に必要な時間が大幅に減少する。
            asc4th: {
                items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy],
                value: 15.0,
                limit: "beidou.skill_max",
                times: 10,
            },
        },
        conste: {
            // 1. 雷斫り発動時:HP上限16%相当のシールドを生成し、持続時間15秒。該当シールドは雷ダメージに対して250%の吸収効果がある。
            // 2. 雷斫りの稲妻は2体の敵を追加で攻撃可能。
            // 3. 浪追いのスキルLv.+3
            // 4. 攻撃を受けた10秒内、北斗の通常攻撃は20%の雷ダメージが付与される。
            // 5. 雷斫りのスキルLv.+3
            // 6. 雷斫り継続中、周囲の敵の雷耐性-15%
            lv6: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Elect,
                value: 15.0,
                limit: "burst.using",
                times: 15,
                target: konst.BonusTarget.All,
            },
        },
    },
    Bennett: {
        star: 4,
        element: konst.ElementType.Pyro,
        energy: 60,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                1039, 2670,
                3447, 5163,
                5715, 6573,
                7309, 8168,
                8719, 9577,
                10129, 10987,
                11539, 12397,
            ],
            atk: [
                16, 41,
                53, 80,
                88, 101,
                113, 126,
                134, 148,
                156, 169,
                178, 191,
            ],
            def: [
                65, 166,
                214, 321,
                356, 409,
                455, 508,
                542, 596,
                630, 684,
                718, 771,
            ]
        },
        special: konst.StatusBonusType.EnRec,
        spvalue: [0.0, 0.0, 0.0, 20.0 / 3, 40.0 / 3, 40.0 / 3, 20.0, 80.0 / 3],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 44.5 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 42.7 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 54.6 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 59.7 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 71.9 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [55.9, 60.7] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.press", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 138 },
                { name: "general.charge1", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: [84.0, 92.0] },
                { name: "general.charge2", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: [88.0, 96.0] },
                { name: "general.burst", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 132 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 233 },
            ],
        },
        passive: {
            // burst. ･エリア内のキャラのHPが最大値の70%を下回ると、HPが継続回復する。回復量はベネットのHP上限によって決まる。
            //        ･エリア内のキャラのHPが最大値の70%以上の場合、ベネットの基礎攻撃力を基準に、一定比例の攻撃力がアップする。
            //        ･エリア内のキャラに炎元素付着効果を付与する。
            burst: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Atk,
                base: konst.FlatBonusBase.AtkBase,
                value: 56.0,
                scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                limit: "burst.area",
                times: 12,
                target: konst.BonusTarget.All,
            }
            // 4. 溢れる情熱のクールタイム-20%
            // 5. 素晴らしい旅エリア内にいると、溢れる情熱のクールタイムが-50%され、2段チャージによるベネットのノックバックが発生しなくなる
        },
        conste: {
            // 1. 「素晴らしい旅」の攻撃力アップ効果はHPによる制限がなくなり、更にベネットの基礎攻撃力の20%に当たる数値を追加。
            // 2. HPが70％以下になると、元素チャージ効率+30％
            lv2: { items: konst.StatusBonusType.EnRec, value: 30.0, limit: "hp.le70" },
            // 3. 溢れる情熱のスキルLv.3
            // 4. 1段チャージ溢れる情熱を発動する時、二段目攻撃中に通常攻撃をすると追加攻撃を発動できる。二段目攻撃の135％の追加ダメージを与える。
            // 5. 素晴らしい旅のスキルLv.3
            // 6. 素晴らしい旅エリア内の片手剣、両手剣、長柄武器キャラの炎ダメージ+15％、通常攻撃と重撃ダメージを炎ダメージに変換する。
            lv6: [
                {
                    items: konst.ElementBonusType.Pyro,
                    value: 15.0,
                    limit: "burst.area_melee",
                    times: 12,
                    target: konst.BonusTarget.Melee,
                },
                {
                    extra: konst.ExtraBonusType.Enchant,
                    elem: konst.EnchantType.Pyro,
                    dest: [konst.CombatType.Normal, konst.CombatType.Heavy, konst.CombatType.Plunge],
                    limit: "burst.area_melee",
                    times: 12,
                    target: konst.BonusTarget.Melee,
                },
            ],
        },
    },
    Chongyun: {
        star: 4,
        element: konst.ElementType.Cryo,
        energy: 40,
        weapon: konst.WeaponType.Claymore,
        status: {
            hp: [
                1003, 2366,
                3054, 4574,
                5063, 5824,
                6475, 7236,
                7725, 8485,
                8974, 9734,
                10223, 10984,
            ],
            atk: [
                19, 48,
                62, 93,
                103, 118,
                131, 147,
                157, 172,
                182, 198,
                208, 223,
            ],
            def: [
                54, 140,
                180, 270,
                299, 344,
                382, 427,
                456, 501,
                530, 575,
                603, 648,
            ]
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 70.0 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.1 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 80.3 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 101 },
                { name: "general.keep", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.3 },
                { name: "general.last", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 102 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 74.6 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 149 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 186 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 172 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 142 },
            ],
        },
        passive: {
            // skill. 氷爆による寒気が重華積霜エリアになり、エリア内の片手剣、大剣、長柄武器キャラの通常攻撃、重撃と落下攻撃ダメージは氷元素ダメージになる。
            skill: {
                extra: konst.ExtraBonusType.Enchant,
                elem: konst.EnchantType.Cryo,
                dest: [konst.CombatType.Normal, konst.CombatType.Heavy, konst.CombatType.Plunge],
                limit: "burst.area_melee",
                target: konst.BonusTarget.Melee,
            },
            // 4. 霊刃・重華積霜エリア内にいる時、片手剣、両手剣、長柄武器キャラの通常攻撃と攻撃速度が8%上昇する。
            // 5. 霊刃・重華積霜エリアが消えた時、自動的に付近の敵を攻撃する霊刃を召喚し、霊刃・重華積霜のスキルダメージ100%の氷範囲ダメージを与える。
            //    命中された敵の氷耐性が10%減少する、継続時間8秒。
            asc4th: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Cryo,
                value: 10.0,
                limit: "chongyun.skill_blade",
                times: 8,
                target: konst.BonusTarget.All,
            },
        },
        conste: {
            // 1. 通常攻撃の最後の一撃が前方に3つの氷の刃を放ち、氷の刃は途中の敵に重雲の50%攻撃力の氷ダメージを与える。
            // 2. 霊刃・重華積霜エリア内、元素スキルと元素爆発のクールタイムが15%減少する。
            // 3. 霊刃・雲開星落のスキルLv.+3
            // 4. 重雲のすべての攻撃が氷元素の影響を受けた敵に命中した時、自身の元素エネルギーを1回復。この効果は2秒毎に1回のみ発動可能。
            // 5. 霊刃・重華積霜のスキルLv.+3
            // 6. 霊刃・雲開星落がHPの百分率が重雲より低い時に命中した時、ダメージが15%上昇。その他、使用する時にさらに追加で霊刃を1本を召喚する。
            lv6: { items: konst.CombatBonusType.Burst, value: 15.0, limit: "chongyun.hp_low" },
        },
    },
    Diluc: {
        star: 5,
        element: konst.ElementType.Pyro,
        energy: 40,
        weapon: konst.WeaponType.Claymore,
        status: {
            hp: [
                1011, 2621,
                3488, 5219,
                5834, 6712,
                7533, 8421,
                9036, 9932,
                10547, 11453,
                12068, 12981,
            ],
            atk: [
                26, 68,
                90, 135,
                151, 173,
                194, 217,
                233, 256,
                272, 295,
                311, 335,
            ],
            def: [
                61, 158,
                211, 315,
                352, 405,
                455, 509,
                546, 600,
                637, 692,
                729, 784,
            ],
        },
        special: konst.CriticalBonusType.Rate,
        spvalue: [0.0, 0.0, 0.0, 4.8, 9.6, 9.6, 14.4, 19.2],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 89.7 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 87.6 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 98.8 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 134 },
                { name: "general.keep", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 68.8 },
                { name: "general.last", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 125 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 89.5 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 179 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 224 },
            ],
            skill: [
                { name: "general.one", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 94.4 },
                { name: "general.two", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 97.6 },
                { name: "general.three", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 129 }
            ],
            burst: [
                { name: "general.slash", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 204 },
                { name: "general.dot", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 60.0 },
                { name: "general.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 204 }
            ],
        },
        passive: {
            // burst. 武器に凝集した列焔により、ディルックの通常攻撃と重撃ダメージは炎ダメージに変わる。継続時間8秒。
            burst: {
                extra: konst.ExtraBonusType.Enchant,
                elem: konst.EnchantType.Pyro,
                dest: [konst.CombatType.Normal, konst.CombatType.Heavy, konst.CombatType.Plunge],
                limit: "burst.use",
                times: 8,
            },
            // 4. 重撃のスタミナ消費-50%、最大継続時間+3秒。
            // 5. 黎明による炎元素バフの継続時間+4秒。さらに効果継続中にディルックの与える炎ダメージ+20%。
            asc4th: { items: konst.ElementBonusType.Pyro, value: 20.0, limit: "diluc.enchant", times: 12 },
        },
        conste: {
            // 1. HPが50%より上回る敵に対して、ディルックの与えるダメージ+15％。
            lv1: { items: konst.BonusType.Damage, value: 15.0, limit: "diluc.hp_gt50" },
            // 2. ディルックがダメージを受けると、攻撃力+10%、攻撃速度+5％、継続時間10秒。該当効果は最大3重まで、1.5秒に1回のみ発動可能。
            lv2: { items: konst.StatusBonusType.AtkBuf, value: 10.0, limit: "diluc.damage", stack: 3, times: 10 },
            // 3. 逆焔の刃のスキルLv.+3
            // 4. リズム的に逆焔の刃を発動させることで、ダメージを大幅に上げることができる。逆焔の刃発動2秒後、次の逆焔の刃のダメージ+40％、継続時間2秒。
            lv4: { items: konst.CombatBonusType.Skill, value: 40.0, limit: "diluc.skill_2sec", times: 2 },
            // 5. 黎明のスキルLv.+3
            // 6. 逆焔の刃発動後、6秒以内の通常攻撃の攻撃速度+30％、攻撃ダメージ+30％、2回まで。逆焔の刃によって通常攻撃のコンボ数がリセットされることはなくなる。
            lv6: { items: konst.CombatBonusType.Normal, value: 30.0, limit: "diluc.skill", times: 6 },
        },
    },
    Diona: {
        star: 4,
        element: konst.ElementType.Cryo,
        energy: 80,
        weapon: konst.WeaponType.Bow,
        status: {
            hp: [
                802, 2061,
                2661, 3985,
                4411, 5074,
                5642, 6305,
                6731, 7393,
                7818, 8481,
                8907, 9570,
            ],
            atk: [
                18, 46,
                59, 88,
                98, 113,
                125, 140,
                149, 164,
                174, 188,
                198, 212,
            ],
            def: [
                50, 129,
                167, 250,
                277, 318,
                354, 396,
                422, 464,
                491, 532,
                559, 601,
            ],
        },
        special: konst.ElementBonusType.Cryo,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 36.1 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 33.5 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 45.6 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.0 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 53.8 },
                { name: "general.aim", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.9 },
                { name: "general.fully", type: konst.CombatType.Heavy, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 124 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "diona.claw", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 41.9 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 80 },
                { name: "diona.area", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 52.6 },
            ],
        },
        passive: {
            // 4. フリーズキャッツクローのシールドが存在する時、キャラクターの移動速度+10％、スタミナ消費-10％。
            // 5. 特製スピリッツのエリアに入った敵の攻撃力が15秒間-10％。
        },
        conste: {
            // 1. 特製スピリッツの効果終了時、ディオナの元素エネルギーを15回復する。
            // 2. フリーズキャッツクローによるダメージ+15%、シールドのダメージ吸収量+15%。
            lv2: { items: konst.CombatBonusType.Skill, value: 15.0 },
            //    命中時、近くに出場しているキャラクターにフリーズキャッツクローの50％のダメージを吸収するシールドを付与する。継続時間5秒。
            // 3. 特製スピリッツのスキルLv.+3
            // 4. 特製スピリッツのエリアにいる時、ディオナの狙い撃ちのチャージ時間が60%減少する。
            // 5. フリーズキャッツクローのスキルLv.+3
            // 6. 特製スピリッツのエリアのいるキャラクターは自身の現在HPにより以下の効果を獲得する:
            //    ・HPが50％またその以下の時、被回復量が30％上昇。
            //    ・HPが50％以上の時、元素熟知が200上昇。
            lv6: {
                items: konst.StatusBonusType.Elem,
                value: 200,
                limit: "burst.area",
                times: 12,
                target: konst.BonusTarget.All,
            },
        },
    },
    Eula: {
        star: 5,
        element: konst.ElementType.Cryo,
        energy: 80,
        weapon: konst.WeaponType.Claymore,
        status: {
            hp: [
                1030, 2671,
                3554, 5317,
                5944, 6839,
                7675, 8579,
                9207, 10119,
                10746, 11669,
                12296, 13226,
            ],
            atk: [
                27, 69,
                92, 138,
                154, 177,
                199, 222,
                238, 262,
                278, 302,
                318, 342,
            ],
            def: [
                58, 152,
                202, 302,
                337, 388,
                438, 487,
                523, 574,
                610, 662,
                698, 751,
            ],
        },
        special: konst.CriticalBonusType.Damage,
        spvalue: [0.0, 0.0, 0.0, 9.6, 19.2, 19.2, 28.8, 38.4],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 89.7 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 93.6 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [56.8, 56.8] },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 112.6 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [71.8, 71.8] },
                { name: "general.keep", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 68.8 },
                { name: "general.last", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 124 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 74.6 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 149 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 186 },
            ],
            skill: [
                { name: "general.press", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 146 },
                { name: "general.hold", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 246 },
                { name: "eula.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 96, multi: 2 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 246 },
                { name: "eula.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 367.0 },
                { name: "eula.once", type: konst.CombatType.Burst, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 75.0, multi: 30 },
                { name: "eula.total", type: konst.CombatType.Burst, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 2617 },
            ],
        },
        passive: {
            // skill. 冷酷な心を消費すると、周囲の敵の物理耐性及び氷元素耐性をダウンさせる。
            skill: [
                {
                    items: konst.StatusBonusType.DefBuf,
                    value: 30,
                    limit: "eula.heart",
                    stack: 2,
                    times: 7,
                },
                {
                    extra: konst.ExtraBonusType.Reduct,
                    type: [konst.ElementType.Cryo, konst.ElementType.Phys],
                    value: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
                    limit: "eula.heart",
                    times: 7,
                    target: konst.BonusTarget.All,
                },
            ],
            // 4. 長押しで氷潮の渦を発動した時、一度に冷酷な心を2つ消費すると、直ちに爆発する光臨の剣の欠片を創造する。
            // 光臨の剣の欠片は、氷浪の光剣で創造される光臨の剣の基礎ダメージ50%分の物理ダメージを与える。
            // 5. 氷浪の光剣を発動した時、氷潮の渦のクールタイムがリセットされ、冷酷な心を1つ獲得する。
        },
        conste: {
            // 1. 氷潮の渦の冷酷な心を消費するとエウルアの物理ダメージ+30%、継続時間6秒
            // 冷酷な心を1つ消費する毎に継続時間+6秒、最大18秒まで。
            lv1: { items: konst.ElementBonusType.Phys, value: 30.0, limit: "eula.heart", times: 6 },
            // 2. 氷彫の渦の長押しのクールタイムを短縮し、一回押しと同じクールタイムにする。
            // 3. 氷浪の光剣のスキルLv.+3
            // 4. HP50%未満の敵に対する光臨の剣のダメージ+25%
            lv4: {
                extra: konst.ExtraBonusType.Combat,
                bind: ["eula.burst", "eula.once", "eula.total"],
                dest: konst.CombatBonusDest.Damage,
                value: 25.0,
                limit: "hp.lt50_en",
                format: "eula.lv4",
            },
            // 5. 氷潮の渦のスキルLv.+3
            // 6. 氷浪の光剣で創造した光臨の剣は、直ちにエネルギーを5つ獲得する。通常攻撃、元素スキルまたは元素爆発によりエネルギーを獲得する際、50％の確率でさらに1つ獲得する。
        },
    },
    Fischl: {
        star: 4,
        element: konst.ElementType.Elect,
        energy: 60,
        weapon: konst.WeaponType.Bow,
        status: {
            hp: [
                770, 1979,
                2555, 3827,
                4236, 4872,
                5418, 6054,
                6463, 7099,
                7508, 8144,
                8553, 9189,
            ],
            atk: [
                20, 53,
                68, 102,
                113, 130,
                144, 161,
                172, 189,
                200, 216,
                227, 244,
            ],
            def: [
                50, 128,
                165, 247,
                274, 315,
                350, 391,
                418, 459,
                485, 526,
                553, 594,
            ],
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 44.1 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 46.8 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 58.1 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 57.7 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 72.1 },
                { name: "general.aim", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.9 },
                { name: "general.fully", type: konst.CombatType.Heavy, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 124 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "fischl.oz", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 88.8 },
                { name: "fischl.summon", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 115 },
            ],
            burst: [
                { name: "fischl.thunder", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 208 },
            ],
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
        },
    },
    Ganyu: {
        star: 5,
        element: konst.ElementType.Cryo,
        energy: 60,
        weapon: konst.WeaponType.Bow,
        status: {
            hp: [
                763, 1978,
                2632, 3939,
                4403, 5066,
                5686, 6355,
                6820, 7495,
                7960, 8643,
                9108, 9797,
            ],
            atk: [
                26, 68,
                90, 135,
                151, 173,
                194, 217,
                233, 256,
                272, 295,
                311, 335,
            ],
            def: [
                49, 127,
                169, 253,
                283, 326,
                366, 409,
                439, 482,
                512, 556,
                586, 630,
            ],
        },
        special: konst.CriticalBonusType.Damage,
        spvalue: [0.0, 0.0, 0.0, 9.6, 19.2, 19.2, 28.8, 38.4],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 31.7 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 35.6 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 45.5 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 45.5 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 48.2 },
                { name: "general.six", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 57.6 },
                { name: "general.aim", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.9 },
                { name: "ganyu.charge", type: konst.CombatType.Heavy, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 124 },
                { name: "ganyu.frost", type: konst.CombatType.Heavy, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 128 },
                { name: "ganyu.bloom", type: konst.CombatType.Heavy, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 218 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 132 },
            ],
            burst: [
                { name: "ganyu.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 70 }
            ],
        },
        passive: {
            // 4. 霜華の矢を放った後の5秒以内に放たれた霜華の矢と霜華満開の会心率+20%
            asc1st: {
                extra: konst.ExtraBonusType.Combat,
                bind: ["ganyu.frost", "ganyu.bloom"],
                dest: konst.CombatBonusDest.CriRate,
                value: 20.0,
                limit: "ganyu.max_charge",
                format: "ganyu.asc1st",
            },
            // 5. 降衆天華エリア内のキャラクターの氷元素ダメージ+20%
            asc4th: { items: konst.ElementBonusType.Cryo, value: 20.0, limit: "burst.area", times: 15, target: konst.BonusTarget.All },
        },
        conste: {
            // 1. 二段チャージ重撃の霜華の矢または霜華満開が命中した時、敵の氷元素耐性-15%。継続時間6秒
            lv1: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Cryo,
                value: 15.0,
                limit: "ganyu.hit_charge",
                times: 6,
                target: konst.BonusTarget.All,
            },
            //    命中時に甘羽の元素エネルギーを2回復。二段チャージの重撃による元素エネルギーの回復効果は、1回の重撃で1度のみ発動可能。
            // 2. 山沢麟跡の発動回数+1
            // 3. 降衆天華のスキルLv.+3
            // 4. 降衆天華エリア内、敵の受けるダメージが増加する。
            //    受けるダメージの増加量は初期が5%、3秒毎に5%上昇し、最大25%まで上昇する。
            lv4: { items: konst.CombatBonusType.Burst, value: 5.0, limit: "ganyu.burst_per_3sec", stack: 5 },
            //    エリアを出た後、継続時間3秒。
            // 5. 山沢麟跡のスキルLv.+3
            // 6. 山沢麟跡を発動すると、30秒以内に放つ最初の霜華の矢が、チャージせずに発動可能になる。
        },
    },
    Goro: {
        star: 4,
        element: konst.ElementType.Geo,
        energy: 80,
        weapon: konst.WeaponType.Bow,
        status: {
            hp: [
                802, 2061,
                2661, 3985,
                4411, 5074,
                5642, 6305,
                6731, 7393,
                7818, 8481,
                8907, 9570,
            ],
            atk: [
                15, 39,
                51, 76,
                84, 97,
                108, 120,
                128, 141,
                149, 162,
                170, 183,
            ],
            def: [
                54, 140,
                180, 270,
                299, 344,
                382, 427,
                456, 501,
                530, 575,
                603, 648,
            ],
        },
        special: konst.ElementBonusType.Geo,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 37.8 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 37.2 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 49.5 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 59.0 },
                { name: "general.aim", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.9 },
                { name: "general.fully", type: konst.CombatType.Heavy, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 124 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 107.2 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 98, based: konst.DamageBased.Def },
                { name: "goro.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 61, based: konst.DamageBased.Def },
            ],
        },
        passive: {
            // 発動時、チームにいる岩元素タイプキャラクターの人数に応じて、領域内のフィールド上キャラクターに下記効果を与える。
            // ・1人の時・「堅牢」：防御力がアップ。
            // ・2人の時・「破耐」：上記効果に加え、中断体制がアップ。
            // ・3人の時・「粉砕」：上記効果に加え、岩元素ダメージがアップ。
            skill: [
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Def,
                    base: konst.FlatBonusBase.Direct,
                    value: 206,
                    scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Skill },
                    limit: "goro.skill_per_geo",
                    times: 10,
                    target: konst.BonusTarget.All,
                },
                {
                    items: konst.ElementBonusType.Geo,
                    value: 15,
                    limit: "goro.skill_per_geo3",
                    times: 10,
                    target: konst.BonusTarget.All,
                },
            ],
            // 4. 獣牙突撃陣形戦法を発動した後の12秒間、近くのチーム全員の防御力+25%。
            asc1st: { items: konst.StatusBonusType.DefBuf, value: 25.0, limit: "burst.use", times: 12, target: konst.BonusTarget.All },
            // 5. 防御力を基にゴローの以下攻撃のダメージが増加する。
            // ・犬坂の遠吠え方円陣のスキルダメージが防御力156%分アップする。
            // ・獣牙突撃陣形戦法のスキルダメージと岩晶崩滅のダメージが防御力15.6%分アップする。
            asc4th: [
                { extra: konst.ExtraBonusType.Flat, dest: konst.FlatBonusDest.Skill, base: konst.FlatBonusBase.Def, value: 156 },
                { extra: konst.ExtraBonusType.Flat, dest: konst.FlatBonusDest.Burst, base: konst.FlatBonusBase.Def, value: 15.6 },
            ],
        },
        conste: {
            // 1. ゴロー自身による大将の旗指物または大将威儀の領域にいるフィールド上キャラクター（ゴロー自身を除く）が敵に岩元素ダメージを与えると、
            //    ゴロー自身の犬坂の遠吠え方円陣のクールタイム- 2秒。この効果は10秒毎に1回のみ発動可能。
            // 2. 大将威儀の持続時間内、近くのフィールド上キャラクターが結晶反応による結晶の欠片を獲得すると、ゴロー自身の大将威儀の継続時間+1秒。
            //    0.1秒毎に1回のみ発動可能、この方式で最大3秒まで延長できる。
            // 3. 犬坂の遠吠え方円陣のスキルLv.+3
            // 4. 大将威儀が「破耐」または「粉砕」効果を持つ時、1.5秒毎に領域内のフィールド上キャラクターのHPを回復する。
            //    回復量はゴロー自身の防御力50%分に相当する。
            // 5. 獣牙突撃陣形戦法のスキルLv.+3
            // 6. 犬坂の遠吠え方円陣または獣牙突撃陣形戦法発動後の12秒間、発動時の領域状態に基づき、周囲チーム全員の岩元素ダメージの会心ダメージをアップする。
            // ・「堅牢」：10%アップ。
            // ・「破耐」：20%アップ。
            // ・「粉砕」：40%アップ。
            lv6: [
                {
                    extra: konst.ExtraBonusType.Element,
                    dest: konst.StatusBonusType.CriDmg,
                    value: 10.0,
                    limit: "goro.skill_burst1",
                    times: 12,
                    target: konst.BonusTarget.All,
                    format: "goro.elem",
                },
                {
                    extra: konst.ExtraBonusType.Element,
                    dest: konst.StatusBonusType.CriDmg,
                    value: 20.0,
                    limit: "goro.skill_burst2",
                    times: 12,
                    target: konst.BonusTarget.All,
                    format: "goro.elem",
                },
                {
                    extra: konst.ExtraBonusType.Element,
                    dest: konst.StatusBonusType.CriDmg,
                    value: 40.0,
                    limit: "goro.skill_burst3",
                    times: 12,
                    target: konst.BonusTarget.All,
                    format: "goro.elem",
                },
            ],
        },
    },
    Hutao: {
        star: 5,
        element: konst.ElementType.Pyro,
        energy: 60,
        weapon: konst.WeaponType.Polearm,
        status: {
            hp: [
                1211, 3141,
                4179, 6253,
                6990, 8042,
                9026, 10089,
                10826, 11899,
                12637, 13721,
                14459, 15552,
            ],
            atk: [
                8, 21,
                29, 43,
                48, 55,
                62, 69,
                74, 81,
                86, 94,
                99, 106,
            ],
            def: [
                68, 177,
                235, 352,
                394, 453,
                508, 568,
                610, 670,
                712, 773,
                815, 876,
            ],
        },
        special: konst.CriticalBonusType.Damage,
        spvalue: [0.0, 0.0, 0.0, 9.6, 19.2, 19.2, 28.8, 38.4],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Hutao, value: 46.9 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Hutao, value: 48.3 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Hutao, value: 61.1 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Hutao, value: 65.6 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Hutao, value: [33.3, 35.2] },
                { name: "general.six", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Hutao, value: 86.0 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Hutao, value: 136 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Hutao, value: 65.4 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Hutao, value: 131 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Hutao, value: 163 },
            ],
            skill: [
                { name: "hutao.plum", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 64 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Xiao, value: 303 },
                { name: "hutao.low", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Xiao, value: 379 },
            ],
        },
        passive: {
            // skill. 胡桃のHP上限を基準に攻撃力が上昇する。この効果で得られる攻撃力上昇の最大値は、胡桃の基礎攻撃力の400%まで。
            //        攻撃ダメージは炎元素ダメージとなり、元素付与によって他の元素に変化することはない。
            //        重撃は敵に血梅香効果を与える。胡桃の中断耐性が上昇する。
            skill: [
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Atk,
                    base: konst.FlatBonusBase.Hp,
                    bound: { base: konst.FlatBonusBase.AtkBase, value: 400 },
                    scale: { type: konst.DamageScale.Xiao, talent: konst.TalentType.Skill },
                    value: 3.84,
                    limit: "skill.using",
                    times: 9,
                },
                {
                    extra: konst.ExtraBonusType.Enchant,
                    elem: konst.EnchantType.Pyro,
                    dest: [konst.CombatType.Normal, konst.CombatType.Heavy, konst.CombatType.Plunge],
                    limit: "skill.using",
                    times: 9,
                },
            ],
            // 4. 蝶導来世による冥蝶の舞状態終了後、チーム全員(胡桃自身を除く)の会心率+12%、継続時間8秒。
            asc1st: {
                items: konst.CriticalBonusType.Rate,
                value: 12,
                limit: "skill.used",
                times: 8,
                target: konst.BonusTarget.Other,
            },
            // 5. 胡桃のHPが50%以下の時、炎元素ダメージ+33%。
            asc4th: { items: konst.ElementBonusType.Pyro, value: 100 / 3, limit: "hp.le50" },
        },
        conste: {
            // 1. 蝶導来世による冥蝶の舞状態の時、胡桃の重撃はスタミナを消費しない。
            // 2. 血梅香のダメージ量が胡桃のHP上限の10%分上昇する。また、安神秘法は命中した敵に血梅香効果を与える。
            // 4. 胡桃自ら与えた血梅香状態の敵が倒されると、周囲のチーム全員(胡桃自身をを除く)の会心率+12%、継続時間15秒。
            lv4: {
                items: konst.CriticalBonusType.Rate,
                value: 12,
                limit: "hutao.skill_defeat",
                times: 15,
                target: konst.BonusTarget.Other,
            },
            // 6. 胡桃のHPが25%以下、または戦闘不能に至るダメージを受けた時に発動：このダメージで胡桃が戦闘不能になることはない。
            //    また、次の10秒間、胡桃の全元素耐性及び物理耐性+200%、会心率+100%、中断耐性大幅アップ。
            //    この効果は胡桃のHPが1の時に自動で発動される。60秒毎に1回のみ発動可能。
            lv6: { items: konst.CriticalBonusType.Rate, value: 100, limit: "hutao.damage_defeat", times: 10 },
        },
    },
    Jean: {
        star: 5,
        element: konst.ElementType.Anemo,
        energy: 80,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                1144, 2967,
                3948, 5908,
                6605, 7599,
                8528, 9533,
                10230, 11243,
                11940, 12965,
                13662, 14695,
            ],
            atk: [
                19, 48,
                64, 96,
                108, 124,
                139, 155,
                166, 183,
                194, 211,
                222, 239,
            ],
            def: [
                60, 155,
                206, 309,
                345, 397,
                446, 499,
                535, 588,
                624, 678,
                715, 769,
            ],
        },
        special: konst.StatusBonusType.HealBuf,
        spvalue: [0.0, 0.0, 0.0, 5.55, 11.1, 11.1, 16.65, 22.2],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 48.3 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 45.6 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 60.3 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 65.9 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 79.2 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 162 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 292 }
            ],
            burst: [
                { name: "general.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 425 },
                { name: "jean.inout", type: konst.CombatType.Burst, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 78.4 },
            ],
        },
        passive: {
            // 4. ジンの通常攻撃が命中する時、50%の確率でチーム全員のHPを回復する。回復量はジンの攻撃力15%。
            // 5. 蒲公英の風発動後、元素エネルギーが20％回復する。
        },
        conste: {
            // 1. 風圧剣の長押しが1秒以上の時、吸い寄せる速度がアップし、与えるダメージ+40%。
            lv1: { items: konst.CombatBonusType.Skill, value: 40.0, limit: "jean.skill_long" },
            // 2. 元素オーブまたは元素粒子を獲得時、チームにいる全てのキャラの移動速度、攻撃速度+15%、継続時間15秒。
            // 3. 蒲公英の風のスキルLv.+3
            // 4. 蒲公英の風エリア内、全ての敵の風元素耐性-40%。
            lv4: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Anemo,
                value: 40.0,
                limit: "burst.area_en",
                target: konst.BonusTarget.All,
            },
            // 5. 風圧剣のスキルLv.+3
            // 6. 蒲公英の風エリア内、キャラの受けるダメージ-35%。エリアを出た後、この効果は3回攻撃を受けた後、または10秒後に消える。
        },
    },
    Kaedehara: {
        star: 5,
        element: konst.ElementType.Anemo,
        energy: 60,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                1039, 2695,
                3586, 5366,
                5999, 6902,
                7747, 8659,
                9292, 10213,
                10846, 11777,
                12410, 13348,
            ],
            atk: [
                23, 60,
                80, 119,
                133, 153,
                172, 192,
                206, 227,
                241, 262,
                276, 297,
            ],
            def: [
                63, 163,
                217, 324,
                363, 417,
                468, 523,
                562, 617,
                656, 712,
                750, 807,
            ],
        },
        special: konst.StatusBonusType.Elem,
        spvalue: [0.0, 0.0, 0.0, 28.8, 57.6, 57.6, 86.4, 115.2],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 45.0 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 45.2 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [25.8, 31.0] },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 60.7 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 25.4, multi: 3 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [43.0, 74.6] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 81.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 164 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 204 },
            ],
            skill: [
                { name: "general.press", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 192 },
                { name: "general.hold", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 261 },
            ],
            burst: [
                { name: "general.slash", type: konst.CombatType.Burst, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 262 },
                { name: "general.dot", type: konst.CombatType.Burst, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 120 },
                { name: "general.contact", type: konst.CombatType.Burst, elem: konst.CombatElementType.Contact, scale: konst.DamageScale.Elem, value: 36 },
            ],
        },
        passive: {
            // skill: 元素スキル・千早振る後の落下攻撃のダメージは風元素ダメージへと変わる。
            skill: {
                extra: konst.ExtraBonusType.Enchant,
                elem: konst.EnchantType.Anemo,
                dest: [konst.CombatType.Plunge],
                limit: "skill.use",
            },
            // 4. 千早振るを発動時、水元素/炎元素/氷元素/雷元素と接触した場合、
            // その千早振る後の落下攻撃・乱れ嵐斬に元素変化が起き、攻撃力200% 分の該当元素ダメージを追加で与える。
            // このダメージは落下攻撃とみなされる。
            // 5. 楓原万葉が拡散反応を起こした後、楓原万葉の元素熟知の数値が1につき、チーム全員に対し、拡散させた元素ダメージ+0.04%、継続時間8秒。
            asc4th: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Contact,
                base: konst.FlatBonusBase.Elem,
                value: 0.04,
                limit: "kaedehara.swirl",
                times: 8,
                target: konst.BonusTarget.All,
            },
        },
        conste: {
            // 1. 千早振るのクールタイム-10%。万葉の一刀を発動した後、千早振るのクールタイムがリセットされる。
            // 2. 万葉の一刀の流風秋野で下記の効果を発動する。
            // ・継続時間内、楓原万葉自身の元素熟知+200。
            // ・流風秋野の中にいるフィールド上キャラクターの元素熟知+200。
            lv2: [
                { items: konst.StatusBonusType.Elem, value: 200, limit: "burst.using", times: 8 },
                {
                    items: konst.StatusBonusType.Elem,
                    value: 200,
                    limit: "burst.area",
                    times: 8,
                    target: konst.BonusTarget.Other,
                },
            ],
            // 3. 千早振るのスキルLv.+3
            // 4. 楓原万葉の元素エネルギーが45以下の時、下記の効果を獲得する。
            // ・一回押し／長押しで千早振るを発動した時、元素エネルギーを3／4回復する。
            // ・滑翔状態の時、1秒毎に元素エネルギーを2回復する。
            // 5. 万葉の一刀のスキルLv.+3
            // 6. 楓原万葉が千早振るまたは万葉の一刀を発動した後の5秒間、風元素付与を獲得する、
            // また楓原万葉の元素熟知の数値が1につき、自身の通常攻撃、重撃、落下攻撃のダメージ+0.2%。
            lv6: [
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.CombatDmg,
                    base: konst.FlatBonusBase.Elem,
                    value: 0.2,
                    limit: "skill.use",
                    times: 5,
                },
                {
                    extra: konst.ExtraBonusType.Enchant,
                    elem: konst.EnchantType.Anemo,
                    dest: [konst.CombatType.Normal, konst.CombatType.Heavy, konst.CombatType.Plunge],
                    limit: "skill.use",
                    times: 5,
                },
            ],
        },
    },
    Kaeya: {
        star: 4,
        element: konst.ElementType.Cryo,
        energy: 60,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                976, 2506,
                3235, 4846,
                5364, 6170,
                6860, 7666,
                8184, 8990,
                9508, 10312,
                10830, 11636,
            ],
            atk: [
                19, 48,
                62, 93,
                103, 118,
                131, 147,
                157, 172,
                182, 198,
                208, 223,
            ],
            def: [
                66, 171,
                220, 330,
                365, 420,
                467, 522,
                557, 612,
                647, 702,
                737, 792,
            ],
        },
        special: konst.StatusBonusType.EnRec,
        spvalue: [0.0, 0.0, 0.0, 20.0 / 3, 40.0 / 3, 40.0 / 3, 20.0, 80.0 / 3],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 53.7 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 51.7 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 65.3 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 70.9 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 88.2 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [55.0, 73.1] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 191 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 77.6 },
            ],
        },
        passive: {
            // 4. 霜の襲撃が敵1体に命中する度に、攻撃力の15%相当のHPを回復する。
            // 5. 霜の襲撃が敵を凍結状態にした場合、凍結された敵から追加の元素粒子が落ちる。
            //    1回の霜襲は2つの元素粒子が追加で発生する。
        },
        conste: {
            // 1. 氷元素の影響を受けた敵に対して、ガイアの通常攻撃と重撃の会心率+15%
            lv1: { items: [konst.CriticalBonusType.Normal, konst.CriticalBonusType.Heavy], value: 15.0, limit: "elem.cryo" },
            // 2. 凛冽なる戯れ継続中に敵を撃破したとき、継続時間+2.5秒、最大15秒まで
            // 3. 霜の襲撃のスキルLv.+3
            // 4. ガイアのHPが20％の時に自動発動される。
            //    HP上限30％相当のシールドを吸収するシールド生成し、継続時間20秒。
            //    シールドは氷ダメージに対して250％の吸収効果がある。60秒毎に1回のみ発動可能。
            // 5. 凛冽なる輪舞のスキルLv.+3
            // 6. 凛冽なる戯れの寒氷の柱が1本追加され、発動するときは元素エネルギーが15回復する。
        },
    },
    Kamisato: {
        star: 5,
        element: konst.ElementType.Cryo,
        energy: 80,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                1001, 2597,
                3455, 5170,
                5779, 6649,
                7462, 8341,
                8951, 9838,
                10448, 11345,
                11954, 12858,
            ],
            atk: [
                27, 79,
                92, 138,
                154, 177,
                198, 222,
                238, 262,
                278, 302,
                318, 342,
            ],
            def: [
                61, 158,
                211, 315,
                352, 405,
                455, 509,
                546, 600,
                637, 692,
                729, 794,
            ],
        },
        special: konst.CriticalBonusType.Damage,
        spvalue: [0.0, 0.0, 0.0, 9.6, 19.2, 19.2, 28.8, 38.4],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 45.7 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 48.7 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 62.6 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 22.6, multi: 3 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 78.2 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 55.1, multi: 3 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 64 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 239 },
            ],
            burst: [
                { name: "general.slash", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 112 },
                { name: "kamisato.bloom", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 168 },
            ],
        },
        passive: {
            // dash. 氷の力を剣に集中させ、一定時間氷元素付与を獲得する。
            dash: {
                extra: konst.ExtraBonusType.Enchant,
                elem: konst.EnchantType.Cryo,
                dest: [konst.CombatType.Normal, konst.CombatType.Heavy, konst.CombatType.Plunge],
                limit: "kamisato.dash",
                times: 5,
            },
            // 4. 神里流・氷華を発動した後の6秒間、神里綾華の通常攻撃と重撃のダメージ+30%。
            asc1st: {
                items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy],
                value: 30,
                limit: "skill.use",
                times: 6,
            },
            // 5. 神里流・霰歩終了後に発生する氷が敵に命中すると、神里綾華は下記効果を獲得する。
            // ・スタミナを10ポイント獲得する。
            // ・氷元素ダメージ+18%、継続時間10秒。
            asc4th: { items: konst.ElementBonusType.Cryo, value: 18, limit: "kamisato.dash_ice", times: 10 },
        },
        conste: {
            // 1. 神里綾華の通常攻撃または重撃が敵に氷元素ダメージを与えた時、50%の確率で神里流・氷華のクールタイム-0.3秒。
            // 2. 神里流・霜滅発動時、追加で2つの小さい霜見雪関扉を放ち、それぞれ本来の20%分のダメージを与える。
            // 3. 神里流・霜滅のスキルLv.+3
            // 4. 神里流・霜滅の霜見雪関扉のダメージを受けた敵の防御力-30%、継続時間6秒。
            lv4: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ReductType.Defence,
                value: 30,
                limit: "burst.hit",
                times: 6,
                target: konst.BonusTarget.All,
            },
            // 5. 神里流・氷華のスキルLv.+3
            // 6. 10秒毎に、神里綾華は「薄氷の舞」状態を獲得し、重撃ダメージが298%アップする。
            // 重撃が敵に命中してから0.5秒後、「薄氷の舞」の効果はクリアされ、クールタイムのカウントが開始される。
            lv6: { items: konst.CombatBonusType.Heavy, value: 298, limit: "kamisato.thin_ice" },
        },
    },
    Ayato: {
        star: 5,
        element: konst.ElementType.Hydro,
        energy: 80,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                1068, 2770,
                3685, 5514,
                6165, 7092,
                7960, 8897,
                9548, 10494,
                11144, 12101,
                12751, 13715,
            ],
            atk: [
                24, 61,
                81, 120,
                135, 155,
                174, 194,
                208, 229,
                243, 264,
                278, 299,
            ],
            def: [
                60, 155,
                206, 309,
                345, 397,
                446, 499,
                535, 558,
                624, 678,
                715, 769,
            ],
        },
        special: konst.CriticalBonusType.Damage,
        spvalue: [0.0, 0.0, 0.0, 9.6, 19.2, 19.2, 28.8, 38.4],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 45.0 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 47.2 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 58.6 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 29.4, multi: 2 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 75.6 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 129.5 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "ayato.shunsui1", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 52.9 },
                { name: "ayato.shunsui2", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 58.9 },
                { name: "ayato.shunsui3", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 64.9 },
                { name: "ayato.illusion", type: konst.CombatType.Skill, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 101.5 },
            ],
            burst: [
                { name: "ayato.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 66.5 },
            ],
        },
        passive: {
            skill: {
                extra: konst.ExtraBonusType.Combat,
                bind: ["ayato.shunsui1", "ayato.shunsui2", "ayato.shunsui3"],
                base: konst.StatusBonusType.Hp,
                value: 0.56,
                scale: { type: konst.DamageScale.Phys, talent: konst.TalentType.Skill },
                format: "ayato.skill",
                limit: "skill.using",
                stack: 5,
                times: 6,
            },
            burst: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Normal,
                base: konst.FlatBonusBase.Hp,
                value: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                limit: "skill.using",
                times: 18,
                target: konst.BonusTarget.All,
            },
            // 4. 神里流・鏡花は下記の効果を持つ。
            // ・発動後、神里綾人は2層の浪閃効果を獲得する。
            // ・水の幻影が破裂すると、神里綾人は重ね掛け上限に相当する浪閃効果を獲得する。
            // 5. 神里綾人が待機中の時、元素エネルギーが40未満の場合、1秒毎に元素エネルギーを2回復する。
        },
        conste: {
            // 1. HP50%以下の敵に対して、瞬水剣によるダメージ+40%。
            lv1: {
                extra: konst.ExtraBonusType.Combat,
                bind: ["ayato.shunsui1", "ayato.shunsui2", "ayato.shunsui3"],
                dest: konst.CombatBonusDest.Damage,
                value: 40,
                format: "ayato.conste",
                limit: "skill.using",
            },
            // 2. 浪閃の重ね掛け上限が5層になる。神里綾人が3層以上の浪閃状態の時、HP上限が50%アップする。
            lv2: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Hp,
                base: konst.FlatBonusBase.Hp,
                value: 50,
                limit: "ayato.conste",
            },
            // 3. 神里流・鏡花のスキルLv.+3
            // 4. 神里流・水囿発動後、周囲チーム全員の通常攻撃速度+15%、継続期間15秒。
            // 5. 神里流・水囿のスキルLv.+3
            // 6. 神里流・鏡花発動後、神里綾人の次に発動する瞬水剣が敵に命中した時、神里綾人の攻撃力450%分のダメージを持つ瞬水剣を2回追加で発動する。
            // 追加で発動する2回の瞬水剣は浪閃の効果を受けない。
        },
    },
    Keqing: {
        star: 5,
        element: konst.ElementType.Elect,
        energy: 40,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                1020, 2646,
                3521, 5268,
                5889, 6776,
                7604, 8500,
                9121, 10025,
                10647, 11561,
                12182, 13103,
            ],
            atk: [
                25, 65,
                87, 130,
                145, 167,
                187, 209,
                225, 247,
                262, 285,
                300, 323,
            ],
            def: [
                63, 161,
                215, 321,
                359, 413,
                464, 519,
                556, 612,
                649, 705,
                743, 799,
            ]
        },
        special: konst.CriticalBonusType.Damage,
        spvalue: [0.0, 0.0, 0.0, 9.6, 19.2, 19.2, 28.8, 38.4],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 41.0 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 41.0 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 54.4 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [31.5, 34.4] },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 67.0 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [76.8, 86.0] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "keqing.wedge", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 50.4 },
                { name: "general.slash", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 168 },
                { name: "keqing.slash", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 84.0, multi: 2 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 88.0 },
                { name: "keqing.many", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 24.0, multi: 8 },
                { name: "keqing.last", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 189 },
            ]
        },
        passive: {
            // 4. 雷楔継続中に再び星辰帰位を発動すると、刻晴は雷元素バフを獲得する。継続時間5秒。
            asc1st: {
                extra: konst.ExtraBonusType.Enchant,
                elem: konst.EnchantType.Elect,
                dest: [konst.CombatType.Normal, konst.CombatType.Heavy, konst.CombatType.Plunge],
                limit: "keqing.skill",
                times: 5,
            },
            // 5. 天街巡遊継続中、刻晴の会心率+15%、元素チャージ効率+15%、継続時間8秒。
            asc4th: {
                items: [konst.CriticalBonusType.Rate, konst.StatusBonusType.EnRec],
                value: 15.0,
                limit: "burst.use",
                times: 8,
            },
        },
        conste: {
            // 1. 雷楔継続中に再び星辰帰位を発動すると、刻晴は消失位置と出現位置に攻撃力の50%の雷元素範囲ダメージを与える。
            // 2. 刻晴の通常攻撃と重撃が雷元素の影響を受けた敵に命中した時、50%の確率で元素粒子を1個生成する。5秒毎に1回のみ発動可能。
            // 3. 天街巡遊のスキルLv.+3
            // 4. 刻晴が雷元素の関連反応を起こした10秒間、攻撃力+25%。
            lv4: { items: konst.StatusBonusType.AtkBuf, value: 25.0, limit: "elem.react_elect", times: 10 },
            // 5. 星辰帰位のスキルLv.+3
            // 6. 通常攻撃、重撃、元素スキルまたは元素爆発を発動する時、刻晴の与える雷元素ダメージ+6%、継続時間8秒。
            lv6: {
                items: konst.ElementBonusType.Elect,
                value: 6.0,
                limit: "keqing.attack",
                times: 8,
            },
            //    通常攻撃、重撃、元素スキルまたは元素爆発の発動による効果はそれぞれ別々でカウントされる。
        },
    },
    Klee: {
        star: 5,
        element: konst.ElementType.Pyro,
        energy: 60,
        weapon: konst.WeaponType.Catalyst,
        status: {
            hp: [
                801, 2077,
                2764, 4136,
                4623, 5319,
                5970, 6673,
                7161, 7870,
                8358, 9076,
                9563, 10287,
            ],
            atk: [
                24, 63,
                84, 125,
                140, 161,
                180, 202,
                216, 238,
                253, 274,
                289, 311,
            ],
            def: [
                48, 124,
                165, 247,
                276, 318,
                357, 399,
                428, 470,
                500, 542,
                572, 615,
            ],
        },
        special: konst.ElementBonusType.Pyro,
        spvalue: [0.0, 0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 72.2 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 62.4 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 89.9 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 157 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "klee.bomb", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 95.2 },
                { name: "klee.trap", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 32.8 },
            ],
            burst: [
                { name: "klee.fire", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 42.6 },
            ],
        },
        passive: {
            // 4. ボンボン爆弾と通常攻撃が敵にダメージを与える時、50%の確率でクレーが爆裂花火を獲得する。
            //    重撃を発動する時はスタミナの変わりに爆裂花火を優先的に消費し、さらに与えるダメージ+50%
            asc1st: { items: konst.CombatBonusType.Heavy, value: 50.0, limit: "klee.use_fire", times: 25 },
            // 5. クレーの重撃が会心発生した後、チーム全員の元素エネルギーが2回復する。
        },
        conste: {
            // 1. 攻撃やスキル発動の際に、一定確率で花火を召喚し敵を攻撃、ドッカン花火攻撃力の120%ダメージを与える。
            // 2. ボンボン爆弾ブービートラップダメージを受けた敵の防御力-23%、継続時間10秒
            lv2: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ReductType.Defence,
                value: 23.0,
                limit: "klee.hit_trap",
                times: 10,
                target: konst.BonusTarget.All,
            },
            // 3. ボンボン爆弾のスキルLv.+3
            // 4. ドッカン花火継続中にキャラを切り替えると、爆発が発生し、攻撃力の555%の炎範囲ダメージを与える。
            // 5. ドッカン花火のスキルLv.+3
            // 6. ドッカン花火状態中、クレーは3秒毎にチーム全員（クレーを除く）の元素エネルギーを3回復する。
            //    ドッカン花火発動後25秒間、チーム全員の炎ダメージ+10%。
            lv6: { items: konst.ElementBonusType.Pyro, value: 10.0, limit: "burst.use", times: 25, target: konst.BonusTarget.All },
        },
    },
    Kujo: {
        star: 4,
        element: konst.ElementType.Elect,
        energy: 80,
        weapon: konst.WeaponType.Bow,
        status: {
            hp: [
                802, 2061,
                2661, 3985,
                4411, 5074,
                5642, 6305,
                6731, 7393,
                7818, 8481,
                8907, 9570,
            ],
            atk: [
                16, 42,
                54, 81,
                90, 104,
                115, 129,
                137, 151,
                160, 173,
                182, 195,
            ],
            def: [
                53, 135,
                175, 262,
                289, 333,
                370, 414,
                442, 485,
                513, 556,
                584, 628,
            ],
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 36.9 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 38.7 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 48.5 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 50.4 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 58.1 },
                { name: "general.aim", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.9 },
                { name: "general.fully", type: konst.CombatType.Heavy, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 124 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "kujo.down", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 125.8 },
            ],
            burst: [
                { name: "kujo.break", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 409.6 },
                { name: "kujo.stone", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 34.1 },
            ],
        },
        passive: {
            // skill: 天狗の神速で後方へ移動し、烏羽の加護を呼びかける。18秒間続く「烏羽護持」を獲得する。九条裟羅がフルチャージを終えた矢を放つと、「烏羽護持」を消費し、命中した位置に「烏羽」を残す。
            //「烏羽」は短時間後に天狗呪雷・伏を引き起こし、範囲内の敵に雷元素ダメージを与え、範囲内のフィールド上キャラクターの攻撃力を、九条裟羅の基礎攻撃力を基準にアップさせる。
            skill: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Atk,
                base: konst.FlatBonusBase.AtkBase,
                value: 43.0,
                scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Skill },
                limit: "skill.area",
                target: konst.BonusTarget.All,
            }
            // 4. 烏天狗雷霆召呪による「烏羽護持」の時、狙い撃ちのチャージ時間-60%。
            // 5. 天狗呪雷・伏は敵に命中すると、九条裟羅の元素チャージ効率を基準にし、その100%の元素チャージ効率毎に、チーム全員の元素エネルギーを1.2回復する。この効果は3秒毎に1回のみ発動可能。
        },
        conste: {
            // 1. 天狗呪雷はキャラクターに攻撃力アップ効果を付与し、または敵に命中すると、烏天狗雷霆召呪のクールタイム-1秒。
            // 2. 烏天狗雷霆召呪を発動した時、九条裟羅が元々いた位置に微弱な天狗呪雷・伏の｢烏羽｣を発動し、本来の30%のダメージを与える。
            // 3. 煌煌千道鎮式のスキルLv.+3
            // 4. 煌煌千道鎮式による天狗呪雷・雷礫の数が6つに増加する。
            // 5. 烏天狗雷霆召呪のスキルLv.+3
            // 6. 天狗呪雷による攻撃力アップ状態のキャラクターは、雷元素ダメージの会心ダメージ+60%。
            lv6: {
                extra: konst.ExtraBonusType.Element,
                dest: konst.StatusBonusType.CriDmg,
                value: 60.0,
                limit: "kujo.skill_use",
                times: 6,
                target: konst.BonusTarget.All,
                format: "kujo.elem",
            },
        },
    },
    Lisa: {
        star: 4,
        element: konst.ElementType.Elect,
        energy: 80,
        weapon: konst.WeaponType.Catalyst,
        status: {
            hp: [
                802, 2061,
                2661, 3985,
                4411, 5074,
                5642, 6305,
                6731, 7393,
                7818, 8481,
                8907, 9570,
            ],
            atk: [
                19, 50,
                64, 96,
                107, 123,
                136, 153,
                163, 179,
                189, 205,
                215, 232,
            ],
            def: [
                48, 123,
                159, 239,
                264, 304,
                338, 378,
                403, 443,
                468, 508,
                534, 573,
            ]
        },
        special: konst.StatusBonusType.Elem,
        spvalue: [0, 0, 0, 24, 48, 48, 72, 96],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 39.6 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 35.9 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 42.8 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 55.0 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 177 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Elect, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Elect, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Elect, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "general.press", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 80.0 },
                { name: "lisa.zero", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 320 },
                { name: "lisa.one", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 368 },
                { name: "lisa.two", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 424 },
                { name: "lisa.three", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 487 },
            ],
            burst: [
                { name: "lisa.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 36.6 }
            ],
        },
        passive: {
            // 4. 重撃が命中した時、敵に蒼雷の誘雷効果を付与する。
            // 5. 薔薇の雷光攻撃を受けた敵の防御力-15%、継続時間10秒。
            asc4th: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ReductType.Defence,
                value: 15.0,
                limit: "burst.hit",
                times: 10,
                target: konst.BonusTarget.All,
            },
        },
        conste: {
            // 1. 蒼雷を長押しで発動した後、敵に命中する度にリサの元素エネルギー+2。一回で最大10まで回復可能。
            // 2. 蒼雷長押し時に下記の効果がある:
            //    ・防御力+20%
            //    ・リサの中断耐性をアップする
            lv2: { items: konst.StatusBonusType.DefBuf, value: 20.0, limit: "lisa.skill_long" },
            // 3. 薔薇の雷光のスキルLv.+3
            // 4. 薔薇の雷光が攻撃する時、放つ稲妻が1～3本に増加する。
            // 5. 蒼雷のスキルLv.+3
            // 6. 登場時、周囲の敵に蒼雷の誘雷効果を3重付与する。この効果は5秒毎に1回のみ発動する。
        },
    },
    Mona: {
        star: 5,
        element: konst.ElementType.Hydro,
        energy: 60,
        weapon: konst.WeaponType.Catalyst,
        status: {
            hp: [
                810, 2102,
                2797, 4185,
                4678, 5383,
                6041, 6752,
                7246, 7964,
                8458, 9184,
                9677, 10409,
            ],
            atk: [
                22, 58,
                77, 115,
                129, 148,
                167, 186,
                200, 220,
                233, 253,
                267, 287,
            ],
            def: [
                51, 132,
                176, 263,
                294, 338,
                379, 424,
                455, 500,
                531, 576,
                607, 653,
            ],
        },
        special: konst.StatusBonusType.EnRec,
        spvalue: [0.0, 0.0, 0.0, 8.0, 16.0, 16.0, 24.0, 32.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 37.6 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 36.0 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 44.8 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 56.2 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 150 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "general.dot", type: konst.CombatType.Skill, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 32.0 },
                { name: "mona.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 133 },
            ],
            burst: [
                { name: "mona.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 442 },
            ],
        },
        passive: {
            // burst: 星異状態継続中、受けるダメージがアップする
            burst: {
                extra: konst.ExtraBonusType.Special,
                value: [42, 44, 46, 48, 50, 52, 54, 56, 58, 60],
                limit: "mona.bind",
                times: 5, // TODO: 4~5 sec
                target: konst.BonusTarget.All,
                ...MonaBurstBonus,
            },
            // 4. 虚実流動状態に入った2秒後、周囲に敵がいる場合は自動的に虚影を1つ生成する。
            //    虚影は2秒間存在し破裂する。破裂ダメージは水中幻願のダメージの50%。
            // 5. モナの与える水ダメージが増加する。増加量はモナの元素チャージ効率の20%に相当する。
            asc4th: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.HydroDmg,
                base: konst.FlatBonusBase.EnRec,
                value: 20.0,
            },
        },
        conste: {
            // 1. チーム内の自身のキャラクターの攻撃が星異状態の敵に命中した8秒間、水元素の関連反応の効果が上昇する：
            //    ・感電反応ダメージ+15%、蒸発反応ダメージ+15%。水元素の拡散反応によるダメージ+15%。凍結反応の継続時間+15%
            lv1: {
                items: [konst.ReactionBonusType.Echarge, konst.ReactionBonusType.Vaporize/*contact hydro*/],
                value: 15.0,
                limit: "mona.hit_bind",
                times: 8,
            },
            // 2. 通常攻撃が命中した時、20%の確率で自動的に重撃を発動する。
            // 3. 星命定軌のスキルLv.+3
            // 4. チーム内の自身のキャラクターが星異状態の敵を攻撃する時、会心率+15%。
            lv4: { items: konst.CriticalBonusType.Rate, value: 15.0, limit: "mona.bind", target: konst.BonusTarget.All },
            // 5. 水中幻願のスキルLv.+3
            // 6. モナが虚実流動状態に入った後、1秒移動する毎に、次の重撃ダメージ+60%。最大180%まで、継続時間8秒。
            lv6: { items: konst.CombatBonusType.Heavy, value: 60.0, limit: "mona.dash", stack: 3, times: 8 },
        },
    },
    Ningguang: {
        star: 4,
        element: konst.ElementType.Geo,
        energy: 40,
        weapon: konst.WeaponType.Catalyst,
        status: {
            hp: [
                821, 2108,
                2721, 4076,
                4512, 5189,
                5770, 6448,
                6884, 7561,
                7996, 8674,
                9110, 9787,
            ],
            atk: [
                18, 46,
                59, 88,
                98, 113,
                125, 140,
                149, 164,
                174, 188,
                198, 212,
            ],
            def: [
                48, 123,
                159, 239,
                264, 304,
                338, 378,
                403, 443,
                468, 508,
                533, 573,
            ]
        },
        special: konst.ElementBonusType.Geo,
        spvalue: [0, 0, 0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "ningguang.combat", type: konst.CombatType.Normal, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 28.0 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 174 },
                { name: "ningguang.bead", type: konst.CombatType.Normal, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 49.6 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Geo, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Geo, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Geo, scale: konst.DamageScale.Phys, value: 142 }
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 230 },
            ],
            burst: [
                { name: "ningguang.jewel", type: konst.CombatType.Burst, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 87.0 },
            ],
        },
        passive: {
            // 4. 星璇がついている間に、凝光の重撃はスタミナを消費しない。
            // 5. 璇璣屏を突き抜けたキャラの岩ダメージ+12%、継続時間10秒
            asc4th: {
                items: konst.ElementBonusType.Geo,
                value: 12.0,
                limit: "ningguang.through",
                times: 10,
                target: konst.BonusTarget.All,
            },
        },
        conste: {
            // 1. 通常攻撃が命中すると範囲ダメージを与える。
            // 2. 璇璣屏が破裂した時、クールタイムがリセットする。6秒毎に1回のみ発動可能。
            // 3. 王権崩玉のスキルLv.+3
            // 4. 璇璣屏付近のキャラクターの全元素耐性+10%
            // 5. 璇璣屏のスキルLv.+3
            // 6. 天権崩玉を放つ時、凝光は七枚の星璇を生成する。
        },
    },
    Noelle: {
        star: 4,
        element: konst.ElementType.Geo,
        energy: 60,
        weapon: konst.WeaponType.Claymore,
        status: {
            hp: [
                1012, 2600,
                3356, 5027,
                5564, 6400,
                7117, 7953,
                8490, 9325,
                9862, 10698,
                11235, 12071,
            ],
            atk: [
                16, 41,
                53, 80,
                88, 101,
                113, 126,
                134, 148,
                156, 169,
                178, 191,
            ],
            def: [
                67, 172,
                222, 333,
                368, 423,
                471, 526,
                562, 617,
                652, 708,
                743, 799,
            ],
        },
        special: konst.StatusBonusType.DefBuf,
        spvalue: [0.0, 0.0, 0.0, 7.5, 15.0, 15.0, 22.5, 30.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 79.1 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 73.4 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 86.3 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 113 },
                { name: "general.keep", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 50.7 },
                { name: "general.last", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 90.5 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 74.6 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 149 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 186 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 120, based: konst.DamageBased.Def },
            ],
            burst: [
                { name: "general.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 67.2 },
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 92.8 },
            ],
        },
        passive: {
            // burst. ・攻撃ダメージは岩ダメージに変化する。
            // ・ノエルの防御力を基準に攻撃力がアップする。
            burst: [
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Atk,
                    base: konst.FlatBonusBase.Def,
                    value: [40, 43, 46, 50, 53, 56, 60, 64, 68, 72, 76, 80, 85, 90],
                    limit: "burst.using",
                },
                {
                    extra: konst.ExtraBonusType.Enchant,
                    elem: konst.EnchantType.Geo,
                    limit: "burst.using",
                    dest: [konst.CombatType.Normal, konst.CombatType.Heavy, konst.CombatType.Plunge],
                },
            ],
            // 4. ノエルが待機時、出場中のキャラクターのHPが30%以下になると自動発動される：
            //    出場している自身のキャラクターに、ノエルの防御力400%相当のダメージを吸収シールドを付与する、継続時間20秒。該当効果は60秒毎に1回のみ発動する。
            // 5. 通常攻撃または重撃が4回命中するたびに、護心鎧のクールタイム-1秒。
            //    攻撃が同時に複数の敵に命中した場合は1回としてカウントされる
        },
        conste: {
            // 1. 同時に大掃除と護心鎧状態に居るとき、護心鎧のHP回復効果の発動率は100％になる
            // 2. ノエルの重撃によるスタミナ消費-20%、与えるダメージ+15%。
            lv2: { items: konst.CombatBonusType.Heavy, value: 15.0 },
            // 3. 護心鎧のスキルLv.+3
            // 4. 護心鎧の効果終了時、またはダメージによって破壊されたとき、周囲の敵に攻撃力の400%の岩ダメージを与える
            // 5. 大掃除のスキルLv.+3
            // 6. 大掃除発動で、ノエルの防御力50%相当の攻撃力を追加でアップする。
            lv6: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Atk,
                base: konst.FlatBonusBase.Def,
                value: 50.0,
                limit: "burst.using",
            },
            //    スキル継続中、敵1体倒すたびに、継続時間+1秒、最大10秒まで
        },
    },
    Qiqi: {
        star: 5,
        element: konst.ElementType.Cryo,
        energy: 80,
        weapon: konst.WeaponType.Sword,
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
                22, 58,
                77, 115,
                129, 148,
                167, 186,
                200, 220,
                233, 253,
                267, 287,
            ],
            def: [
                72, 186,
                248, 371,
                415, 477,
                535, 598,
                642, 706,
                749, 814,
                857, 992,
            ],
        },
        special: konst.StatusBonusType.HealBuf,
        spvalue: [0.0, 0.0, 0.0, 5.55, 11.1, 11.1, 16.65, 22.2],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 37.8 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 38.9 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [24.2, 24.2] },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [24.7, 24.7] },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.0 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [64.3, 64.3] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 96.0 },
                { name: "qiqi.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 36.0 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 285 },
            ],
        },
        passive: {
            // 4. 仙法・寒病鬼差状態時のキャラクターが元素反応を起こした時、被回復量+20%、継続時間8秒。
            // 5. 七七の通常攻撃と重撃が敵に命中する時、50%の確率で敵に度厄のお札を1枚付与する、継続時間6秒、30秒毎に一回発動可能。
        },
        conste: {
            // 1. 寒病鬼差が度厄のお礼マークのついた敵に命中した時、七七の元素エネルギーを2回復する。
            // 2. 氷元素の影響を受けた敵に、七七の通常攻撃と重撃の与えるダメージ+15％。
            lv2: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: 15.0, limit: "elem.cryo" },
            // 3. 仙法・救苦度厄のスキルLv.3
            // 4. 度厄のお札マークのついた敵の攻撃力-20％。
            // 5. 仙法・寒病鬼差のスキルLv.3
            // 6. 仙法·救苦度厄を発動する時、近くにいるチーム内全ての戦闘不能状態のキャラクターを復活させ、HPの50%を回復する。
            //    この効果は15分毎に1回のみ発動可能。
        },
    },
    Raiden: {
        star: 5,
        element: konst.ElementType.Elect,
        energy: 90,
        weapon: konst.WeaponType.Polearm,
        status: {
            hp: [
                1005, 2606,
                3468, 5189,
                5801, 6675,
                7491, 8373,
                8985, 9875,
                10487, 11388,
                12000, 12907,
            ],
            atk: [
                26, 68,
                91, 136,
                152, 175,
                196, 219,
                235, 258,
                274, 298,
                314, 337,
            ],
            def: [
                61, 159,
                212, 317,
                355, 408,
                458, 512,
                549, 604,
                641, 696,
                737, 789,
            ],
        },
        special: konst.StatusBonusType.EnRec,
        spvalue: [0.0, 0.0, 0.0, 8.0, 16.0, 16.0, 24.0, 32.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 39.6 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 39.7 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 49.9 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [29.0, 29.0] },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 65.4 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 99.6 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 117.2 },
                { name: "raiden.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 42.0 },
            ],
            burst: [
                { name: "raiden.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 401 },
                { name: "general.one", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Hutao, value: 44.7 },
                { name: "general.two", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Hutao, value: 44.0 },
                { name: "general.three", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Hutao, value: 53.8 },
                { name: "general.four", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Hutao, value: [30.9, 31.0] },
                { name: "general.five", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Hutao, value: 73.9 },
                { name: "general.heavy", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Hutao, value: [61.6, 74.4] },
                { name: "general.fall", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Phys, value: 160 },
            ],
        },
        passive: {
            // skill: 雷罰悪曜の眼を持つキャラクターは継続時間内に、元素爆発の元素エネルギーを基準に、元素爆発ダメージがアップする。
            skill: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.BurstDmg,
                base: konst.FlatBonusBase.Energy,
                value: [0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.30],
                limit: "skill.using",
                times: 25,
                target: konst.BonusTarget.All,
            },
            // burst: 周囲のチーム全員（雷電将軍自身を除く）が元素爆発を発動すると、元素爆発の元素エネルギーを元に雷電将軍の諸願百目の輪に願力を蓄積する。
            // 蓄積できる願力は最大60層まで。
            burst: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.AtkBuf,
                value: 0.73,
                scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                limit: "burst.using",
                stack: 60,
                times: 7,
            },
            // 4. 周囲にいるチーム内キャラクターが元素オーブまたは元素粒子を獲得した時、諸願百目の輪に願力を2層蓄積する。
            // 5. 元素チャージ効率が100%を超えている場合、超えた分1%につき、雷電将軍は以下の効果を獲得する。
            // ・夢想の一心状態で提供する元素エネルギー回復+0.6%。雷元素ダメージ+0.4%。
            asc4th: {
                extra: konst.ExtraBonusType.Special,
                dest: konst.ElementBonusType.Elect,
                value: 0.4,
                limit: "general.enrec_over",
                times: 7,
                target: konst.BonusTarget.Self,
                ...RaidenEnrecBonus,
            },
        },
        conste: {
            // 1. 諸願百目の輪の願力をより早く蓄積できるようになる。
            // 雷元素タイプのキャラクターによる元素爆発が蓄積する願力+ 80 %。他の元素タイプのキャラクターによる元素爆発が蓄積する願力+ 20 %。
            // 2. 奥義・夢想真説の夢想の一太刀と夢想の一心による攻撃は敵の防御力60%を無視する。
            lv2: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ReductType.Defence,
                value: 60,
                limit: "burst.using",
                times: 7,
                target: konst.BonusTarget.Self,
            },
            // 3. 奥義・夢想真説のスキルLv.+3
            // 4. 奥義・夢想真説による夢想の一心状態終了後、周囲のチーム全員（雷電将軍自身を除く）の攻撃力+30%、継続時間10秒。
            lv4: { items: konst.StatusBonusType.AtkBuf, value: 30, limit: "burst.used", times: 10, target: konst.BonusTarget.Other },
            // 5. 神変・悪曜開眼のスキルLv.+3
            // 6. 奥義・夢想真説による夢想の一心状態の時、雷電将軍の通常攻撃、重撃、落下攻撃が敵に命中すると、
            // 周囲のチーム全員（雷電将軍自身を除く）の元素爆発のクールタイム-1秒。この効果は1秒毎に1回のみ可能で、継続時間内に最大5回まで発動可能。
        },
    },
    Razor: {
        star: 4,
        element: konst.ElementType.Elect,
        energy: 80,
        weapon: konst.WeaponType.Claymore,
        status: {
            hp: [
                1003, 2577,
                3326, 4982,
                5514, 6343,
                7052, 7881,
                8413, 9241,
                9773, 10602,
                11134, 11962,
            ],
            atk: [
                20, 50,
                65, 97,
                108, 124,
                138, 154,
                164, 180,
                191, 207,
                217, 234,
            ],
            def: [
                63, 162,
                209, 313,
                346, 398,
                443, 495,
                528, 580,
                613, 665,
                699, 751,
            ],
        },
        special: konst.ElementBonusType.Phys,
        spvalue: [0.0, 0.0, 0.0, 7.5, 15.0, 15.0, 22.5, 30.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 95.9 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 82.6 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 103 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 136 },
                { name: "general.keep", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 62.5 },
                { name: "general.last", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 113 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 82.0 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 162 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 205 },
            ],
            skill: [
                { name: "general.press", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 199 },
                { name: "general.hold", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 295 },
            ],
            burst: [
                { name: "general.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 160 },
            ]
        },
        passive: {
            // 4. 鋭い爪と蒼雷のクールタイムが18％減少する。雷牙を放つ時、鋭い爪と蒼雷のクールタイムをリセットする。
            // 5. レザーの元素エネルギーが50％以下になると、元素チャージ効率30％上昇する。
            asc4th: { items: konst.StatusBonusType.EnRec, value: 30.0, limit: "razor.en_le50" },
        },
        conste: {
            // 1. レザーが元素オーブまたは元素粒子を獲得した8秒内、与えるダメージが10％上昇する。
            lv1: { items: konst.BonusType.Damage, value: 10.0, limit: "general.energy_orb", times: 8 },
            // 2. HPが30％以下の敵を攻撃する時、会心率が10％上昇する。
            lv2: { items: konst.CriticalBonusType.Rate, value: 10.0, limit: "hp.le30_en" },
            // 3. 雷牙のスキルLv.+3
            // 4. 鋭い爪と蒼雷の一回押しで攻撃時、命中された敵の防御力が15%減少する、継続時間7秒。
            lv4: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ReductType.Defence,
                value: 15.0,
                limit: "razor.skill_once",
                times: 7,
                target: konst.BonusTarget.All,
            },
            // 5. 鋭い爪と蒼雷のスキルLv.+3
            // 6. 10秒毎に、レザーの大剣が自動的にエネルギーを溜め、次の通常攻撃に落雷を引き起こし、攻撃力の100％の雷ダメージを与える。
            //    雷牙状態でない時、落雷が敵に命中すると、レザーに鋭い爪と蒼雷の雷の印を1重付与する。
        },
    },
    Rosaria: {
        star: 4,
        element: konst.ElementType.Cryo,
        energy: 60,
        weapon: konst.WeaponType.Polearm,
        status: {
            hp: [
                1030, 2647,
                3417, 5118,
                5665, 6516,
                7245, 8096,
                8643, 9493,
                10040, 10891,
                11438, 12289,
            ],
            atk: [
                20, 52,
                67, 100,
                111, 127,
                141, 158,
                169, 185,
                196, 213,
                223, 240,
            ],
            def: [
                60, 153,
                197, 296,
                327, 376,
                418, 468,
                499, 548,
                580, 629,
                661, 710,
            ],
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 52.5 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 51.6 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 31.8, multi: 2 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 69.7 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [41.6, 43.0] },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 137 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: [58.0, 136] },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: [104, 152] },
                { name: "general.dot", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 132 },
            ],
        },
        passive: {
            // 4. 罪喰いの懺悔で敵の背後から攻撃すると、ロサリアの会心率+12%、継続時間5秒。
            asc1st: { items: konst.CriticalBonusType.Rate, value: 12.0, limit: "rosaria.skill_back", times: 5 },
            // 5. 臨終の聖礼発動時、自身の会心率の15%分、チーム全員(ロサリア自身を除く)の会心率をアップさせる、継続時間10秒。
            //    この方法で獲得できる会心率アップ効果は、最大15%まで。
            asc4th: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.CriRate,
                base: konst.FlatBonusBase.CriRate,
                value: 15.0,
                bound: { base: konst.FlatBonusBase.CriRate, value: 15.0 },
                limit: "burst.use",
                times: 10,
                target: konst.BonusTarget.Other,
            },
        },
        conste: {
            // 1. ロサリアの攻撃で会心が発生すると、攻撃速度+10%、通常攻撃のダメージ+10%、継続時間4秒。
            lv1: { items: konst.CombatBonusType.Normal, value: 10.0, limit: "rosaria.critical", times: 4 },
            // 2. 臨終の聖礼で創られる氷槍の継続時間+4秒。
            // 3. 罪喰いの懺悔のスキルLv.+3。
            // 4. 罪喰いの懺悔で会心が発生すると、ロサリア自身の元素エネルギーが5回復する。この効果は、1回の罪喰いの懺悔で1度のみ発動可能。
            // 5. 臨終の聖礼のスキルLv.+3。
            // 6. 臨終の聖礼の攻撃が敵に命中すると、敵の物理耐性-20%、継続時間10秒。
            lv6: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Phys,
                value: 20.0,
                limit: "burst.hit_en",
                times: 10,
                target: konst.BonusTarget.All,
            },
        },
    },
    Sangonomiya: {
        star: 5,
        element: konst.ElementType.Hydro,
        energy: 70,
        weapon: konst.WeaponType.Catalyst,
        status: {
            hp: [
                1049, 2720,
                3619, 5416,
                6055, 6966,
                7818, 8783,
                9377, 10306,
                10945, 11885,
                12524, 13471,
            ],
            atk: [
                18, 47,
                63, 94,
                105, 121,
                136, 152,
                163, 179,
                190, 207,
                218, 234,
            ],
            def: [
                51, 133,
                174, 264,
                295, 340,
                381, 426,
                457, 503,
                534, 580,
                611, 657,
            ],
        },
        special: konst.ElementBonusType.Hydro,
        spvalue: [0.0, 0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 68.4 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 61.5 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 94.3 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 148 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "sangonomiya.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 109.2 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 10.4, based: konst.DamageBased.Hp },
            ],
        },
        passive: {
            // burst. ・珊瑚宮心海の通常攻撃、重撃、及び元素スキルの「化海月」によるダメージをアップさせる。ダメージアップ量は珊瑚宮心海のHP上限によって決まる。
            burst: [
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Normal,
                    base: konst.FlatBonusBase.Hp,
                    value: 4.8,
                    scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                    limit: "burst.using",
                    times: 10,
                },
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Heavy,
                    base: konst.FlatBonusBase.Hp,
                    value: 6.8,
                    scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                    limit: "burst.using",
                    times: 10,
                },
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Skill,
                    base: konst.FlatBonusBase.Hp,
                    value: 7.1,
                    scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                    limit: "burst.using",
                    times: 10,
                },
            ],
            // 4. 海人の羽衣発動時、フィールド上に珊瑚宮心海自身の化海月が存在する場合、化海月の継続時間をリセットする。
            // 5. 海人の羽衣の儀来羽衣状態にある時、珊瑚宮心海のHP上限を基準にアップする通常攻撃と重撃のダメージがさらに増えるようになる。アップする量は珊瑚宮心海の与える治療効果の15%となる。
            asc4th: {
                extra: konst.ExtraBonusType.Flat,
                dest: [konst.FlatBonusDest.NormalDmg, konst.FlatBonusDest.HeavyDmg],
                base: konst.FlatBonusBase.HealBuf,
                value: 15,
                limit: "burst.using",
                times: 10,
            },
        },
        conste: {
            // 1. 海人の羽衣による「儀来羽衣」状態の時、珊瑚宮心海の通常攻撃の最後の一撃は追加で遊魚を一匹召喚し、珊瑚宮心海のHP上限30%分の水元素ダメージを与える。
            // このダメージは通常攻撃ダメージとみなされない。
            // 2. 珊瑚宮心海のHP上限を基準に、HP50%以下のキャラクターに対し、下記方式による回復量がアップする。
            // 3. 海人の羽衣のスキルLv.+3
            // 4. 海人の羽衣による儀来羽衣状態の時、珊瑚宮心海の通常攻撃の攻撃速度+10%。そして通常攻撃が敵に命中すると、元素エネルギーを0.8ポイント回復する。
            // この効果は0.2秒毎に1回のみ発動可能。
            // 5. 海月の誓いのスキルLv.+3
            // 6. 海人の羽衣による儀来羽衣状態の時、珊瑚宮心海の通常攻撃または重撃でHP80%以上のキャラクターに治療を行うと、水元素ダメージ+40%、継続時間4秒。
            lv6: {
                items: konst.ElementBonusType.Hydro,
                value: 40,
                limit: "sangonomiya.heal_hpge80",
                times: 4,
            },
        }
    },
    Sayu: {
        star: 4,
        element: konst.ElementType.Anemo,
        energy: 80,
        weapon: konst.WeaponType.Claymore,
        status: {
            hp: [
                994, 2553,
                3296, 4937,
                5464, 6285,
                6988, 7809,
                8337, 9157,
                9684, 10505,
                11033, 11854,
            ],
            atk: [
                20, 53,
                68, 102,
                113, 130,
                144, 161,
                172, 189,
                200, 216,
                227, 244,
            ],
            def: [
                62, 160,
                207, 310,
                343, 395,
                439, 491,
                524, 575,
                608, 660,
                693, 745,
            ],
        },
        special: konst.StatusBonusType.Elem,
        spvalue: [0.0, 0.0, 0.0, 24, 48, 48, 72, 96],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 72.2 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 71.4 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [43.3, 43.4] },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 98.1 },
                { name: "general.keep", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 62.5 },
                { name: "general.last", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 113 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 74.6 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 149 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 186 },
            ],
            skill: [
                { name: "sayu.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 36.0 },
                { name: "sayu.push", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 158.4 },
                { name: "sayu.press", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 217.6 },
                { name: "sayu.contact", type: konst.CombatType.Skill, elem: konst.CombatElementType.Contact, scale: konst.DamageScale.Elem, value: 16.8 },
                { name: "sayu.p_con", type: konst.CombatType.Skill, elem: konst.CombatElementType.Contact, scale: konst.DamageScale.Elem, value: 76.2 },
            ],
            burst: [
                { name: "sayu.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 117 },
                { name: "sayu.daruma", type: konst.CombatType.Burst, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 52 },
            ],
        },
        passive: {
            // 4. 早柚がフィールド上で拡散反応を起こした時、チーム内の自身のキャラクターまたは周囲の味方のHPを300回復する。
            // また、早柚の元素熟知の数値が1につき、さらにHPを1.2回復する。
            // 5. 嗚呼流・影貉繚乱のむじむじだるまは下記効果を獲得する。
            // ・キャラクターのHPを回復するとき、該当キャラクターの近くに出場している他キャラクターも回復量20％に相当するHPを回復する。
            // ・敵を攻撃するとき、与えるダメージ範囲を拡大する。
        },
        conste: {
            // 1. 嗚呼流・影貉繚乱のむじむじだるまは、キャラクターのHPを無視し、周囲の敵への攻撃とキャラクターへのHP回復行動の２つを同時に行う。
            // 2. 嗚呼流・風隠急進で下記の効果を獲得する。
            // ・一回押しの時の風々輪・旋舞蹴のダメージ＋3.3％。
            // ・長押しの風々輪状態では、0.5秒ごとに風々輪・旋舞蹴のダメージ＋3.3％。この方式でアップできる風々輪・旋舞蹴のダメージは66％まで。
            lv2: { items: konst.CombatBonusType.Skill, value: 3.3, limit: "sayu.skill_per_05sec", stack: 20 },
            // 3. 嗚呼流・影貉繚乱のスキルLv.+3
            // 4. 早柚がフィールド上で拡散反応を起こした時、元素エネルギーを1.2ポイント回復する。この効果は2秒毎に1回のみ発動可能。
            // 5. 嗚呼流・風隠急進のスキルLv.+3
            // 6. 早柚自身の嗚呼流・影貉繚乱によって召喚されたむじむじだるまの攻撃力と回復量は、早柚の元素熟知によって決まる。早柚の元素熟知の数値が１につき、下記効果が発動する。
            // ・むじむじだるまのダメージは攻撃力0.2％分アップする。この方式でアップできるダメージは攻撃力400％まで。
            // ・むじむじだるまによるHP回復量＋3。この方式でアップできる回復量は6000まで。
            lv6: {
                extra: konst.ExtraBonusType.Special,
                value: 0.2,
                bind: "sayu.daruma",
                limit: "burst.using",
                times: 12,
                target: konst.BonusTarget.Self,
                ...SayuBurstBonus,
            },
        },
    },
    Shenhe: {
        star: 5,
        element: konst.ElementType.Cryo,
        energy: 80,
        weapon: konst.WeaponType.Polearm,
        status: {
            hp: [
                1011, 2624,
                3491, 5224,
                5840, 6719,
                7540, 8429,
                9045, 9941,
                10557, 11463,
                12080, 12993,
            ],
            atk: [
                24, 61,
                82, 122,
                137, 157,
                176, 197,
                211, 232,
                247, 268,
                282, 304,
            ],
            def: [
                65, 168,
                223, 334,
                373, 429,
                482, 538,
                578, 635,
                674, 732,
                772, 830,
            ],
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.3 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 40.2 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 53.3 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [26.3, 26.3] },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 65.6 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 110.7 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.press", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 139 },
                { name: "general.hold", type: konst.CombatType.Skill, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 188.8 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 101 },
                { name: "general.dot", type: konst.CombatType.Burst, elem: konst.ElementType.Cryo, scale: konst.DamageScale.Elem, value: 33.1 },
            ],
        },
        passive: {
            // 通常攻撃、重撃、落下攻撃、元素スキル、元素爆発が敵に氷元素ダメージを与える時、申鶴自身の攻撃力を基準にダメージがアップする。
            skill: {
                extra: konst.ExtraBonusType.Element,
                base: konst.StatusBonusType.Atk,
                value: 45.7,
                scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Skill },
                limit: "shenhe.skill_use",
                times: 10, // or 15
                target: konst.BonusTarget.All,
                format: "shenhe.elem",
            },
            // 「籙霊」は領域を形成し、中にいるすべての敵の氷元素耐性と物理耐性をダウンさせ、継続的に氷元素ダメージを与える。
            burst: {
                extra: konst.ExtraBonusType.Reduct,
                type: [konst.ElementType.Cryo, konst.ElementType.Phys],
                value: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                limit: "burst.area_en",
                times: 12,
                target: konst.BonusTarget.All,
            },
            // 4. 神女遣霊真訣の領域にいるフィールドキャラクターの氷元素ダメージ+15%
            asc1st: {
                items: konst.ElementBonusType.Cryo,
                value: 15,
                limit: "burst.area",
                times: 12,
                target: konst.BonusTarget.All,
            },
            // 5. 申鶴が仰霊威召将役呪を発動すると、周囲チーム全員に下記効果を与える。
            // ・一回押しの場合、元素スキルおよび元素爆発ダメージ+15%、持続時間10秒。
            // ・長押しの場合、通常攻撃、重撃、落下攻撃ダメージ+15%、継続時間15秒。
            asc4th: [
                {
                    items: [konst.CombatBonusType.Skill, konst.CombatBonusType.Burst],
                    value: 15,
                    limit: "shenhe.skill_once",
                    times: 10,
                    target: konst.BonusTarget.All,
                },
                {
                    items: konst.CombatBonusType.Combat,
                    value: 15,
                    limit: "shenhe.skill_long",
                    times: 15,
                    target: konst.BonusTarget.All,
                },
            ],
        },
        conste: {
            // 1. 仰霊威召将役呪の使用回数+1
            // 2. 神女遣霊真訣の継続時間+6秒。領域内フィールドキャラクターが与える氷元素ダメージの会心ダメージ+15%
            // 3. 仰霊威召将役呪のスキルLv.+3
            // 4. 申鶴自身によって「氷翎」効果を付与されたキャラクターが、「氷翎」のダメージアップ効果を発動すると、申鶴は「霜霄訣」を一層獲得する。
            // 申鶴が仰霊威召将役呪を発動した時、「霜霄訣」をすべて消費する。
            // 消費した層数1につき、その時発動した仰霊威召将役呪のダメージ+5%。この効果は最大50回まで重ね掛け可能、継続時間60秒。
            lv4: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.SkillDmg,
                value: 5.0,
                limit: "shenhe.skill_up",
                stack: 50,
                times: 60,
            },
            // 5. 神女遣霊真訣のスキルLv.+3
            // 6. キャラクターが通常攻撃および重撃で「氷翎」効果を発動した時、「氷翎」の発動回数が消費されなくなる。
        },
    },
    Sucrose: {
        star: 4,
        element: konst.ElementType.Anemo,
        energy: 80,
        weapon: konst.WeaponType.Catalyst,
        status: {
            hp: [
                775, 1991,
                2570, 3850,
                4261, 4901,
                5450, 6090,
                6501, 7141,
                7552, 8192,
                8603, 9243,
            ],
            atk: [
                14, 37,
                47, 71,
                78, 90,
                100, 112,
                120, 131,
                139, 151,
                158, 170,
            ],
            def: [
                59, 151,
                195, 293,
                324, 373,
                414, 463,
                494, 543,
                574, 623,
                654, 703,
            ],
        },
        special: konst.ElementBonusType.Anemo,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 33.5 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 30.6 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 38.4 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 47.9 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 120 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 211 },
            ],
            burst: [
                { name: "general.dot", type: konst.CombatType.Burst, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 148 },
                { name: "general.contact", type: konst.CombatType.Burst, elem: konst.CombatElementType.Contact, scale: konst.DamageScale.Elem, value: 44 },
            ],
        },
        passive: {
            // 4. スクロースが拡散反応を起こした時、該当元素のチームメンバー全員（スクロース自身を除く）の元素熟知+50、継続時間8秒。
            asc1st: {
                items: konst.StatusBonusType.Elem,
                value: 50,
                limit: "sucrose.swirl_elem",
                times: 8,
                target: konst.BonusTarget.Other,
            },
            // 5. 「風霊作成·六三〇八」又は「禁·風霊作成·七五同構弐型」が敵に命中した時、スクロースの元素熟知の20%を基準に、チーム内キャラクター全員（スクロース自身を除く）の元素熟知を強化、継続時間8秒。
            asc4th: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Elem,
                base: konst.FlatBonusBase.Elem,
                value: 20.0,
                limit: "general.skill_burst",
                times: 8,
                target: konst.BonusTarget.Other,
            },
        },
        conste: {
            // 1. 風霊作成・六三〇八の発動可能回数+1。
            // 2. 禁・風霊作成・七五同構弐型のスキル継続時間+2秒。
            // 3. 風霊作成・六三〇八のスキルLv.+3
            // 4. スクロースが通常攻撃または重撃を7回発動すると、風霊作成・六三0八のクールタイムはランダムに1～7秒減少する。
            // 5. 禁・風霊作成・七五同構弐型のスキルLv.+3
            // 6. 禁・風霊作成・七五同構弐型に元素変化があった場合、スキル継続中にチーム全員の該当元素ダメージ+20%。
            lv6: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Contact,
                value: 20,
                limit: "sucrose.burst_change",
                target: konst.BonusTarget.All,
            },
        },
    },
    Tartaglia: {
        star: 5,
        element: konst.ElementType.Hydro,
        energy: 60,
        weapon: konst.WeaponType.Bow,
        status: {
            hp: [
                1020, 2646,
                3521, 5268,
                5889, 6776,
                7604, 8500,
                9121, 10025,
                10647, 11561,
                12182, 13103,
            ],
            atk: [
                23, 61,
                81, 121,
                135, 156,
                175, 195,
                210, 231,
                245, 266,
                280, 301,
            ],
            def: [
                63, 165,
                219, 328,
                366, 421,
                473, 528,
                567, 623,
                662, 719,
                757, 815,
            ],
        },
        special: konst.ElementBonusType.Hydro,
        spvalue: [0.0, 0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 41.3 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 46.3 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 55.4 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 57.0 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 60.9 },
                { name: "general.six", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 72.8 },
                { name: "general.aim", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.9 },
                { name: "general.fully", type: konst.CombatType.Heavy, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 124 },
                { name: "tartaglia.flash", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 12.4, multi: 3 },
                { name: "tartaglia.break", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 62.0 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "tartaglia.change", type: konst.CombatType.Skill, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 72.0 },
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 38.9 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 41.6 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 56.3 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 59.9 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 55.3 },
                { name: "general.six", type: konst.CombatType.Normal, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: [35.4, 37.7] },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: [60.2, 72.0] },
                { name: "tartaglia.slash", type: konst.CombatType.Skill, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Phys, value: 60.0 },
            ],
            burst: [
                { name: "tartaglia.melee", type: konst.CombatType.Burst, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 464 },
                { name: "tartaglia.range", type: konst.CombatType.Burst, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 378 },
                { name: "tartaglia.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 120 },
            ],
        },
        passive: {
            // 4. 断流効果の継続時間が8秒延長する。
            // 5. 魔王の武装・荒波の近接モード時、通常攻撃と重撃が会心を発生すると、命中した敵に断流効果を付与する。
            // 6. チーム内の自身のキャラクター全員の通常攻撃Lv.+1
        },
        conste: {
            // 1. 魔王の武装・荒波のクールタイムが20%減少する。
            // 2. 断流効果の影響を受けた敵が倒されると、タルタリヤの元素エネルギーが4回復する。
            // 3. 魔王の武装・荒波のスキルLv.+3
            // 4. 4秒毎に、タルタリヤによって発動された断流効果がフィールドに存在する時、タルタリヤが魔王の武装・荒波の近接モードの場合、断流・斬を発動する。それ以外の場合、断流・閃を発動する。
            //    この効果によって発動された断流・斬と断流・閃は、この二つのスキル本来の発動時間制限を受けない。また、本来のスキルへの発動時間制限にも影響を与えない。
            // 5. 極悪技・尽滅閃のスキルLv.+3
            // 6. 極悪技・尽滅閃発動時、魔王の武装・荒波のクールタイムをリセットする。この効果は遠隔モードに戻った後に発動する。
        },
    },
    Thoma: {
        star: 4,
        element: konst.ElementType.Pyro,
        energy: 80,
        weapon: konst.WeaponType.Polearm,
        status: {
            hp: [
                866, 2225,
                2872, 4302,
                4762, 5478,
                6091, 6806,
                7266, 7981,
                8440, 9156,
                9616, 10331,
            ],
            atk: [
                17, 43,
                56, 84,
                93, 107,
                119, 133,
                142, 156,
                165, 179,
                188, 202,
            ],
            def: [
                63, 162,
                209, 313,
                346, 398,
                443, 495,
                528, 580,
                613, 665,
                699, 751,
            ],
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 44.4 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.6 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 26.8, multi: 2 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 67.4 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 113 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 146 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 88 },
                { name: "thoma.shield", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 58 },
            ],
        },
        passive: {
            // 4. フィールド上キャラクターが烈炎侍立シールドを獲得または更新した時、シールド強化+5%、継続時間6秒。
            // この効果は0.3秒毎に1回のみ発動可能、最大5重まで。
            // 5. 真紅熾炎の大鎧の熾炎崩滅によるダメージがトーマのHP上限2.2%分アップする。
            asc4th: {
                extra: konst.ExtraBonusType.Combat,
                bind: "thoma.shield",
                base: konst.StatusBonusType.Hp,
                value: 2.2,
                format: "thoma.asc4th",
            },
        },
        conste: {
            // 1. トーマ自身の烈炎侍立シールドに守られたキャラクター（トーマ自身を除く）が攻撃を受けた時、トーマ自身の烈炎侍立のクールタイム-3秒、真紅熾炎の大鎧のクールタイム-3秒。
            // この効果は20秒に1回のみ発動可能。
            // 2. 真紅熾炎の大鎧の継続時間+3秒。
            // 3. 烈炎侍立のスキルLv.+3
            // 4. 真紅熾炎の大鎧を発動すると、トーマの元素エネルギーを15ポイント回復する。
            // 5. 真紅熾炎の大鎧のスキルLv.+3
            // 6. 烈炎侍立シールドを獲得または更新した時、チーム全員の通常攻撃、重撃及び落下攻撃ダメージ+15%、継続時間6秒。
            lv6: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.CombatDmg,
                value: 15.0,
                limit: "thoma.shield_update",
                times: 6,
                target: konst.BonusTarget.All,
            },
        },
    },
    Venti: {
        star: 5,
        element: konst.ElementType.Anemo,
        energy: 60,
        weapon: konst.WeaponType.Bow,
        status: {
            hp: [
                820, 2127,
                2830, 4234,
                4734, 5446,
                6112, 6832,
                7331, 8058,
                8557, 9292,
                9790, 10531,
            ],
            atk: [
                20, 53,
                71, 106,
                118, 136,
                153, 171,
                183, 201,
                214, 232,
                245, 263,
            ],
            def: [
                52, 135,
                180, 269,
                301, 346,
                388, 434,
                465, 512,
                543, 590,
                622, 669,
            ],
        },
        special: konst.StatusBonusType.EnRec,
        spvalue: [0.0, 0.0, 0.0, 8.0, 16.0, 16.0, 24.0, 32.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [20.4, 20.4] },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 44.4 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 52.4 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [26.1, 26.1] },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 50.7 },
                { name: "general.six", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 71.0 },
                { name: "general.aim", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.9 },
                { name: "general.fully", type: konst.CombatType.Heavy, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 124 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "general.press", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 276 },
                { name: "general.hold", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 380 },
            ],
            burst: [
                { name: "general.dot", type: konst.CombatType.Burst, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 37.6 },
                { name: "general.contact", type: konst.CombatType.Burst, elem: konst.CombatElementType.Contact, scale: konst.DamageScale.Elem, value: 18.8 },
            ],
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
                {
                    extra: konst.ExtraBonusType.Reduct,
                    type: [konst.ElementType.Anemo, konst.ElementType.Phys],
                    value: 12.0,
                    limit: "skill.use",
                    times: 10,
                    target: konst.BonusTarget.All,
                },
                //    高天の歌によってノックバックされた敵は着地する前に、更に風耐性と物理耐性-12%
                {
                    extra: konst.ExtraBonusType.Reduct,
                    type: [konst.ElementType.Anemo, konst.ElementType.Phys],
                    value: 12.0,
                    limit: "venti.more_knockback",
                    target: konst.BonusTarget.All,
                },
            ],
            // 3. 風神の詩のスキルLv.+3
            // 4. 元素オーブまたは元素粒子を獲得した後、風ダメージ+25%、継続時間10秒。
            lv4: { items: konst.ElementBonusType.Anemo, value: 25.0, limit: "general.energy_orb", times: 10 },
            // 5. 高天の歌のスキルLv.+3
            // 6. 風神の詩の影響を受ける敵の風属性-20%。元素変化があった場合、変化した元素の耐性-20%。
            lv6: {
                extra: konst.ExtraBonusType.Reduct,
                type: [konst.ElementType.Anemo, konst.AnyReductType.Contact],
                value: 20.0,
                limit: "burst.hit_en",
                target: konst.BonusTarget.All,
            },
        },
    },
    Xiangling: {
        star: 4,
        element: konst.ElementType.Pyro,
        energy: 80,
        weapon: konst.WeaponType.Polearm,
        status: {
            hp: [
                912, 2342,
                3024, 4529,
                5013, 5766,
                6411, 7164,
                7648, 8401,
                8885, 9638,
                10112, 10875,
            ],
            atk: [
                19, 48,
                63, 94,
                104, 119,
                133, 148,
                158, 174,
                184, 200,
                210, 225,
            ],
            def: [
                56, 144,
                186, 279,
                308, 355,
                394, 441,
                470, 517,
                546, 593,
                623, 669,
            ],
        },
        special: konst.StatusBonusType.Elem,
        spvalue: [0, 0, 0, 24, 48, 48, 72, 96],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 42.1 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 42.1 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [26.1, 26.1] },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 14.1, multi: 4 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 71.0 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 122 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "xiangling.eruption", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 111 },
            ],
            burst: [
                { name: "xiangling.one", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 72.0 },
                { name: "xiangling.two", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 88.0 },
                { name: "xiangling.three", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 110 },
                { name: "xiangling.turn", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 112 },
            ],
        },
        passive: {
            // 4. グゥオパァーの噴火距離が20％上昇する。
            // 5. グゥオパァー出撃効果終了時、グゥオパァーは消える位置に唐辛子を残す。唐辛子を拾うと、攻撃力10％上昇する。継続時間10秒。
            asc4th: { items: konst.StatusBonusType.AtkBuf, value: 10.0, limit: "xiangling.get_chili", times: 10 },
        },
        conste: {
            // 1. グゥオパァーに攻撃された敵の炎耐性が15％減少する、継続時間6秒。
            lv1: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Pyro,
                value: 15.0,
                limit: "xiangling.atk_guoba",
                times: 6,
                target: konst.BonusTarget.All,
            },
            // 2. 通常攻撃の最後一撃で敵に2秒継続する爆縮効果を与える。効果終了時に爆発し、敵に75％の炎範囲ダメージを与える。
            // 3. 旋火輪のスキルLv.+3
            // 4. 旋火輪の継続時間が40％上昇する。
            // 5. グゥオパァー出撃のスキルLv.+3
            // 6. 旋火輪継続中、チーム全員の炎ダメージが15％上昇する。
            lv6: { items: konst.ElementBonusType.Pyro, value: 15.0, limit: "burst.using", target: konst.BonusTarget.All, times: 10 },
        },
    },
    Xiao: {
        star: 5,
        element: konst.ElementType.Anemo,
        energy: 70,
        weapon: konst.WeaponType.Polearm,
        status: {
            hp: [
                991, 2572,
                3422, 5120,
                5724, 6586,
                7391, 8262,
                8866, 9744,
                10348, 11236,
                11840, 12736,
            ],
            atk: [
                27, 71,
                94, 141,
                157, 181,
                203, 227,
                243, 267,
                284, 308,
                325, 349,
            ],
            def: [
                62, 161,
                215, 321,
                359, 413,
                464, 519,
                556, 612,
                649, 705,
                743, 799,
            ],
        },
        special: konst.CriticalBonusType.Rate,
        spvalue: [0.0, 0.0, 0.0, 4.8, 9.6, 9.6, 14.4, 19.2],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [27.5, 27.5] },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.9 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 68.6 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [37.7, 37.7] },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 71.5 },
                { name: "general.six", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 95.8 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 121 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 82 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 164 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 204 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Anemo, scale: konst.DamageScale.Elem, value: 253 },
            ],
            burst: [],
        },
        passive: {
            // burst. 魈のジャンプ力が大幅にアップする。
            //        攻撃範囲が広がり、与えるダメージが上昇する。攻撃ダメージによって他の元素に変化することはない。
            //        この状態の魈は、HPが持続的に減少する。この効果は魈が退場する時に解除される。
            burst: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.CombatDmg,
                value: 58.5,
                scale: { type: konst.DamageScale.Xiao, talent: konst.TalentType.Burst },
                limit: "burst.using",
                times: 15,
            },
            // 4. 靖妖儺舞状態の時、魈の与える全ダメージ+5%。また、スキル継続中、3秒毎に与える全ダメージが更に+5%。最大25％まで。
            asc1st: { items: konst.BonusType.Damage, value: 5.0, limit: "xiao.burst_per_3sec", stack: 5 },
            // 5. 風輪両立発動後の7秒間、風輪両立によるダメージ+15%。継続時間7秒、最大3重まで、重複で発動すると継続時間がリセットされる。
            asc4th: { items: konst.CombatBonusType.Skill, value: 15.0, limit: "skill.use", stack: 3, times: 7 },
        },
        conste: {
            // 1. 風輪両立の使用可能回数+1。
            // 2. フィールド上にいない時、魈自身の元素チャージ効率+25%。
            lv2: { items: konst.StatusBonusType.EnRec, value: 25.0, limit: "xiao.stay" },
            // 3. 風輪両立のスキルLv.+3。
            // 4. 魈のHPが50%未満の時、防御力+100%。
            lv4: { items: konst.StatusBonusType.DefBuf, value: 100.0, limit: "hp.lt50" },
            // 5. 靖妖儺舞のスキルLv.+3。
            // 6. 靖妖儺舞状態の時、落下攻撃が2体以上の敵に命中すると、風輪両立の使用回数+1。
            //    その後の1秒間以内は、クールタイム関係なく風輪両立を発動できる。
        },
    },
    Xingqiu: {
        star: 4,
        element: konst.ElementType.Hydro,
        energy: 80,
        weapon: konst.WeaponType.Sword,
        status: {
            hp: [
                857, 2202,
                2842, 4257,
                4712, 5420,
                6027, 6735,
                7190, 7897,
                8352, 9060,
                9515, 10223,
            ],
            atk: [
                17, 43,
                56, 84,
                93, 107,
                119, 133,
                142, 156,
                165, 179,
                188, 202,
            ],
            def: [
                64, 163,
                211, 316,
                349, 402,
                447, 499,
                533, 585,
                619, 671,
                705, 758,
            ],
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 46.6 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 47.6 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [28.6, 28.6] },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.0 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 35.9 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [47.3, 56.2] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: [168, 191] },
            ],
            burst: [
                { name: "xingqiu.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Hydro, scale: konst.DamageScale.Elem, value: 54.3 },
            ],
        },
        passive: {
            // 4. 雨すだれの剣が破壊、または継続時間が終了したとき、行秋のHP上限の6％を基準に出場キャラのHPを回復する。
            // 5. 行秋の水ダメージ+20％。
            asc4th: { items: konst.ElementBonusType.Hydro, value: 20.0 },
        },
        conste: {
            // 1. 雨すだれの剣の最大本数+1。
            // 2. 古華剣・裁雨留虹の継続時間+3秒。その他、剣雨攻撃を受けた敵の水耐性-15％、継続時間4秒。
            lv2: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Hydro,
                value: 15.0,
                limit: "burst.hit_en",
                times: 4,
                target: konst.BonusTarget.All,
            },
            // 3. 古華剣・裁雨留虹のスキルLv.+3
            // 4. 古華剣・裁雨留虹継続中、古華剣・画雨籠山の与えるダメージ+50％。
            lv4: { items: konst.CombatBonusType.Skill, value: 50.0, limit: "burst.using", times: 15 },
            // 5. 古華剣・画雨籠山のスキルLv.+3
            // 6. 古華剣・裁雨留虹が剣雨攻撃を2回発動する度に、次の剣雨攻撃が大幅に強化され、敵に命中する時、行秋の元素エネルギーを3回復する。
        },
    },
    Xinyan: {
        star: 4,
        element: konst.ElementType.Pyro,
        energy: 60,
        weapon: konst.WeaponType.Claymore,
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
            ],
        },
        special: konst.StatusBonusType.AtkBuf,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 76.5 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 74.0 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 95.5 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 115.8 },
                { name: "general.keep", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 62.5 },
                { name: "general.last", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 113 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 74.6 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 149 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 186 }
            ],
            skill: [
                { name: "xinyan.swing", type: konst.CombatType.Skill, elem: konst.ElementType.Phys, scale: konst.DamageScale.Elem, value: 170 },
                { name: "general.dot", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 33.6 }
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Phys, scale: konst.DamageScale.Elem, value: 341 },
                { name: "xinyan.pyro", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 40.0 }
            ],
        },
        passive: {
            // 4. 情熱の薙ぎ払いのシールド発動に必要な命中数を減少する：
            //    ・Lv2シールド・指揮のリズム：1名の敵に命中する；
            //    ・Lv3シールド・舞のリズム：2名の敵に命中する。
            // 5. 情熱の薙ぎ払いのシールドが存在する時、キャラクターが与える物理ダメージが15%上昇する。
            asc4th: { items: konst.ElementBonusType.Phys, value: 15.0, limit: "xinyan.skill_shield" },
        },
        conste: {
            // 1. 会心攻撃が発生した5秒間、通常攻撃と重撃の攻撃速度が12%上昇する。5秒毎に1回のみ発動可能。
            // 2. 反逆の弾きによる物理ダメージの会心率を100%上昇させる。さらに発動する時にLv3シールド・舞のリズムを生成する。
            lv2: {
                extra: konst.ExtraBonusType.Combat,
                bind: "xinyan.swing",
                dest: konst.CombatBonusDest.CriRate,
                value: 100,
                format: "xinyan.lv2",
            },
            // 3. 情熱の薙ぎ払いのスキルLv.+3
            // 4. 情熱の薙ぎ払いの振り回しダメージを受けた敵の物理耐性が15%減少する、継続時間12秒。
            lv4: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ElementType.Phys,
                value: 15.0,
                limit: "skill.hit_en",
                times: 12,
                target: konst.BonusTarget.All,
            },
            // 5. 反逆の弾きのスキルLv.+3
            // 6. 辛炎の重撃によるスタミナ消費-30%。重撃を発動する時、辛炎の防御力50%分の攻撃力が増加する。
            lv6: {
                extra: konst.ExtraBonusType.Combat,
                bind: konst.CombatType.Heavy,
                dest: konst.CombatBonusDest.Atk,
                base: konst.StatusBonusType.Def,
                value: 50.0,
                format: "xinyan.lv6"
            },
        },
    },
    YaeMiko: {
        star: 5,
        element: konst.ElementType.Elect,
        energy: 90,
        weapon: konst.WeaponType.Catalyst,
        status: {
            hp: [
                807, 2065,
                2787, 4170,
                4662, 5364,
                6020, 6729,
                7220, 7936,
                8428, 9151,
                9643, 10372,
            ],
            atk: [
                26, 69,
                91, 137,
                153, 176,
                197, 220,
                236, 260,
                276, 300,
                316, 340,
            ],
            def: [
                44, 115,
                153, 229,
                256, 294,
                330, 369,
                396, 435,
                462, 502,
                529, 569,
            ],
        },
        special: konst.CriticalBonusType.Rate,
        spvalue: [0.0, 0.0, 0.0, 4.8, 9.6, 9.6, 14.4, 19.2],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 39.7 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 38.5 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 56.9 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 142.9 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Elect, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Elect, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Elect, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "yaemiko.skill1", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 60.7 },
                { name: "yaemiko.skill2", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 75.8 },
                { name: "yaemiko.skill3", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 94.8 },
                { name: "yaemiko.skill4", type: konst.CombatType.Skill, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 118.5 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 260 },
                { name: "yaemiko.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Elect, scale: konst.DamageScale.Elem, value: 334 },
            ],
        },
        passive: {
            // 4. 大密法・天狐顕現発動時、殺生櫻を1株破壊するごとに、野干役呪・殺生櫻のクールタイムを1回分リセットする。
            // 5. 八重神子の元素熟知の数値が1につき、殺生櫻によるダメージ+0.15%。
            asc4th: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.SkillDmg,
                base: konst.FlatBonusBase.Elem,
                value: 0.15,
            },
        },
        conste: {
            // 1. 大密法・天狐顕現で天狐顕現を1回発生させるたびに、八重神子自身の元素エネルギーを8ポイント回復する。
            // 2. 殺生櫻の創造時の初期階位を弐、最大階位を肆にアップ、攻撃範囲+60%。
            // 3. 野干役呪・殺生櫻のスキルLv.+3
            // 4. 殺生櫻の落雷が敵に命中すると、周囲のチーム全員の雷元素ダメージ+20%、継続時間5秒。
            lv4: { items: konst.ElementBonusType.Elect, value: 20, limit: "skill.hit", times: 5, target: konst.BonusTarget.All },
            // 5. 大密法・天狐顕現のスキルLv.+3
            // 6. 殺生櫻が攻撃する時、敵の防御力の60%を無視する。
            lv6: {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.ReductType.Defence,
                value: 60.0,
                limit: "skill.hit",
                target: konst.BonusTarget.Self,
                bind: konst.CombatType.Skill,
            },
        },
    },
    Yanfei: {
        star: 4,
        element: konst.ElementType.Pyro,
        energy: 80,
        weapon: konst.WeaponType.Catalyst,
        status: {
            hp: [
                784, 2014,
                2600, 3895,
                4311, 4959,
                5514, 6161,
                6578, 7225,
                7641, 8289,
                8705, 9352,
            ],
            atk: [
                20, 52,
                67, 100,
                111, 127,
                141, 158,
                169, 185,
                196, 213,
                223, 240,
            ],
            def: [
                49, 126,
                163, 244,
                271, 311,
                346, 387,
                413, 453,
                480, 520,
                546, 587,
            ],
        },
        special: konst.ElementBonusType.Pyro,
        spvalue: [0.0, 0.0, 0.0, 6.0, 12.0, 12.0, 18.0, 24.0],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 58.0 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 52.0 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 76.0 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Xiao, value: [98, 116, 133, 150, 168] },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [
                { name: "general.skill", type: konst.CombatType.Skill, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 170 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 182 },
            ],
        },
        passive: {
            // burst: 烈焔を引き起こし、周囲の敵を襲う。炎元素範囲ダメージを与え、煙緋に最大数の丹火の印と灼灼効果を付与する。
            //        重撃ダメージをアップする。
            burst: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.HeavyDmg,
                value: [33, 35, 37, 40, 42, 44, 47, 49, 52, 54, 57, 60, 62],
                limit: "burst.using",
                times: 15,
            },
            // 4. 煙緋が重撃で丹火の印を消費した時、丹火の印1枚につき炎元素ダメージ+5%、継続時間6秒。
            //    効果持続中に再び重撃を放つと、既存の効果が先にクリアされる。
            asc1st: { items: konst.ElementBonusType.Pyro, value: 5.0, limit: "yanfei.heavy_up", stack: 6, times: 6 },
            // 5. 煙緋が自ら発動した重撃が敵に対して会心した時、追加で自身の攻撃力80%分の炎元素範囲ダメージを与える。
            //    このダメージは重撃によるダメージとみなされる。
        },
        conste: {
            // 1. 煙緋が丹火の印を1枚所持するごとに、重撃を詠唱している間の中断耐性がアップ、さらに重撃のスタミナ消費-10%。
            // 2. 煙緋の重撃がHP50%未満の敵に対して、会心率+20%。
            lv2: { items: konst.CriticalBonusType.Rate, value: 20.0, limit: "yanfei.hplt50_en" },
            // 3. 丹書契約のスキルLv.+3
            // 4. 契約成立を発動した時、下記の効果を発動する。
            //    ダメージ吸収量がHP上限の45% に相当するシールドを生成する。持続時間15秒。
            //    このシールドは炎元素ダメージに対して250% の吸収効果がある。
            // 5. 契約成立のスキルLv.+3
            // 6. 煙緋が所持できる丹火の印の最大枚数+1
        },
    },
    Yoimiya: {
        star: 5,
        element: konst.ElementType.Pyro,
        energy: 60,
        weapon: konst.WeaponType.Bow,
        status: {
            hp: [
                791, 2053,
                2731, 4086,
                4568, 5256,
                5899, 6593,
                7075, 7777,
                8259, 8968,
                9450, 10164,
            ],
            atk: [
                25, 65,
                87, 130,
                145, 167,
                187, 209,
                225, 247,
                262, 285,
                300, 323,
            ],
            def: [
                48, 124,
                165, 247,
                276, 318,
                357, 399,
                428, 470,
                500, 542,
                572, 615,
            ],
        },
        special: konst.CriticalBonusType.Rate,
        spvalue: [0.0, 0.0, 0.0, 4.8, 9.6, 9.6, 14.4, 19.2],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 35.6, multi: 2 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 68.4 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 88.9 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 46.4, multi: 2 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 105.9 },
                { name: "general.aim", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 43.9 },
                { name: "general.fully", type: konst.CombatType.Heavy, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 124 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 56.8 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 114 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 142 },
            ],
            skill: [],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 127 },
                { name: "yoimiya.burst", type: konst.CombatType.Burst, elem: konst.ElementType.Pyro, scale: konst.DamageScale.Elem, value: 122 },
            ],
        },
        passive: {
            // skill. 継続時間内、宵宮の通常攻撃で発射した矢は熾焔の矢となる。
            // 炎元素ダメージに変化し、通常攻撃のダメージがアップする。
            // 継続時間中、「通常攻撃・打ち上げ花火」の2段チャージで焔硝の矢を生成できなくなる。
            skill: [
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.NormalDmg,
                    value: 37.9,
                    scale: { type: konst.DamageScale.Xiao, talent: konst.TalentType.Skill },
                    limit: "skill.using",
                    times: 10,
                    target: konst.BonusTarget.Self,
                },
                {
                    extra: konst.ExtraBonusType.Enchant,
                    elem: konst.ElementType.Pyro,
                    dest: [konst.CombatType.Normal],
                    limit: "skill.using",
                    times: 10,
                },
            ],
            // 4. 焔硝の庭火舞いの効果継続時間中、宵宮の通常攻撃が命中すると、炎元素ダメージ+2%、継続時間3秒、最大10重まで。
            asc1st: { items: konst.ElementBonusType.Pyro, value: 2, limit: "yoimiya.skill_normal", stack: 10, times: 3 },
            // 5. 琉金の雲間草を発動した後の15秒内、周囲のチーム全員（宵宮自身を除く）の攻撃力+10%。
            // また、宵宮が琉金の雲間草を発動時に固有天賦「袖火百景図」の重ねた数をもとに、1重ごとにさらに攻撃力を1%アップする。
            asc4th: [
                { items: konst.StatusBonusType.AtkBuf, value: 10, limit: "burst.use", times: 15, target: konst.BonusTarget.Other },
                {
                    items: konst.StatusBonusType.AtkBuf,
                    value: 1,
                    limit: "yoimiya.skill_burst",
                    stack: 10,
                    times: 15,
                    target: konst.BonusTarget.Other,
                },
            ],
        },
        conste: {
            // 1. 琉金の雲間草の琉金の炎の継続時間+4秒。
            // また、宵宮自身が発動した琉金の炎の影響を受けた敵が継続時間内に倒されると、宵宮の攻撃力+ 20 %、継続時間20秒。
            lv1: { items: konst.StatusBonusType.AtkBuf, value: 20, limit: "yoimiya.burst_defeat", times: 20 },
            // 2. 宵宮の炎元素ダメージで会心が発生した後の6秒間、宵宮の炎元素ダメージ+25%。
            lv2: { items: konst.ElementBonusType.Pyro, value: 25, limit: "yoimiya.pyro_crit", times: 6 },
            // 3. 焔硝の庭火舞いのスキルLv.+3
            // 4. 宵宮自身が発動した琉金の炎が爆発を起こすと、焔硝の庭火舞いのクールタイム-1.2秒。
            // 5. 琉金の雲間のスキルLv.+3
            // 6. 焔硝の庭火舞いの継続時間中、宵宮自身の通常攻撃は50%の確率で熾焔の矢を1本追加で発射し、本来の60%分のダメージを与える。
            // このダメージは通常攻撃とみなされる。
        },
    },
    YunJin: {
        star: 4,
        element: konst.ElementType.Cryo,
        energy: 60,
        weapon: konst.WeaponType.Polearm,
        status: {
            hp: [
                894, 2296,
                2963, 4438,
                4913, 5651,
                6283, 7021,
                7495, 8233,
                8707, 9445,
                9919, 10657,
            ],
            atk: [
                16, 41,
                53, 80,
                88, 101,
                113, 126,
                134, 148,
                156, 169,
                178, 191,
            ],
            def: [
                62, 156,
                204, 306,
                339, 389,
                433, 484,
                517, 567,
                600, 651,
                684, 734,
            ],
        },
        special: konst.StatusBonusType.EnRec,
        spvalue: [0, 0, 0, 20 / 3, 20 / 3 * 2, 20 / 3 * 2, 20, 20 / 3 * 4],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 40.5 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 40.2 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [23.0, 27.5] },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: [24.0, 28.8] },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 67.3 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 121.7 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "general.press", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 149.1, based: konst.DamageBased.Def },
                { name: "general.charge1", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 261.0, based: konst.DamageBased.Def },
                { name: "general.charge2", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 372.8, based: konst.DamageBased.Def },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 244 },
            ],
        },
        passive: {
            // 敵に通常攻撃ダメージを与える時、雲菫自身の防御力を基準にダメージがアップする。
            // 「飛雲旗陣」効果は継続時間の終了、または規定回数の発動後に消失する。
            // 一回の通常攻撃が複数の敵に命中した場合は、その敵の数に応じて発動回数が消費される。「飛雲旗陣」の発動回数は、付与されたキャラクターごとに計算される。
            burst: {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Normal,
                base: konst.FlatBonusBase.Def,
                value: 32,
                scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                limit: "yunjin.burst_30",
                times: 12,
                target: konst.BonusTarget.All,
            },
            // 4. 攻撃された瞬間に発動する旋雲開相は、長押しの2段チャージ状態になる。
            // 5. チーム内キャラクターの元素タイプが1/2/3/4種類の時、「飛雲旗陣」による通常攻撃ダメージアップ効果は、
            // さらに雲菫の防御力2.5%/5%/7.5%/11.5%分上乗せされる。 // TODO: 段階
            asc4th: [
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Normal,
                    base: konst.FlatBonusBase.Def,
                    value: 2.5,
                    scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                    limit: "yunjin.burst_30_t1",
                    times: 12,
                    target: konst.BonusTarget.All,
                },
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Normal,
                    base: konst.FlatBonusBase.Def,
                    value: 5,
                    scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                    limit: "yunjin.burst_30_t2",
                    times: 12,
                    target: konst.BonusTarget.All,
                },
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Normal,
                    base: konst.FlatBonusBase.Def,
                    value: 7.5,
                    scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                    limit: "yunjin.burst_30_t3",
                    times: 12,
                    target: konst.BonusTarget.All,
                },
                {
                    extra: konst.ExtraBonusType.Flat,
                    dest: konst.FlatBonusDest.Normal,
                    base: konst.FlatBonusBase.Def,
                    value: 11.5,
                    scale: { type: konst.DamageScale.Elem, talent: konst.TalentType.Burst },
                    limit: "yunjin.burst_30_t4",
                    times: 12,
                    target: konst.BonusTarget.All,
                },
            ],
        },
        conste: {
            // 1. 旋雲開相のクールタイム-18%
            // 2. 破嶂の旌儀発動後、周囲チーム全員の通常攻撃ダメージ+15%、継続時間12秒。
            lv2: {
                items: konst.CombatBonusType.Normal,
                value: 15,
                limit: "burst.using",
                times: 12,
                target: konst.BonusTarget.All,
            },
            // 3. 破嶂の旌儀のスキルLv.+3
            // 4. 雲菫が結晶反応を起こすと防御力+20%、継続時間12秒。
            lv4: {
                items: konst.StatusBonusType.DefBuf,
                value: 20,
                limit: "yunjin.crystal",
                times: 20,
            },
            // 5. 旋雲開相のスキルLv.+3
            // 6. 「飛雲旗陣」状態のキャラクターの通常攻撃の攻撃速度+12%。
        },
    },
    Zhongli: {
        star: 5,
        element: konst.ElementType.Geo,
        energy: 40,
        weapon: konst.WeaponType.Polearm,
        status: {
            hp: [
                1144, 2967,
                3948, 5908,
                6605, 7599,
                8528, 9533,
                10230, 11243,
                11940, 12965,
                13662, 14695,
            ],
            atk: [
                20, 51,
                67, 101,
                113, 130,
                146, 163,
                175, 192,
                204, 222,
                233, 251,
            ],
            def: [
                57, 149,
                198, 297,
                332, 382,
                428, 479,
                514, 564,
                599, 651,
                686, 738,
            ],
        },
        special: konst.ElementBonusType.Geo,
        spvalue: [0.0, 0.0, 0.0, 7.2, 14.4, 14.4, 21.6, 28.8],
        talent: {
            combat: [
                { name: "general.one", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 30.8 },
                { name: "general.two", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 31.2 },
                { name: "general.three", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 38.6 },
                { name: "general.four", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 42.9 },
                { name: "general.five", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 10.8, multi: 4 },
                { name: "general.six", type: konst.CombatType.Normal, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 54.5 },
                { name: "general.heavy", type: konst.CombatType.Heavy, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 111 },
                { name: "general.fall", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 63.9 },
                { name: "general.low", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 128 },
                { name: "general.high", type: konst.CombatType.Plunge, elem: konst.ElementType.Phys, scale: konst.DamageScale.Phys, value: 160 },
            ],
            skill: [
                { name: "zhongli.pillar", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 16.0 },
                { name: "zhongli.resonance", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Phys, value: 32.0 },
                { name: "general.hold", type: konst.CombatType.Skill, elem: konst.ElementType.Geo, scale: konst.DamageScale.Elem, value: 80.0 },
            ],
            burst: [
                { name: "general.skill", type: konst.CombatType.Burst, elem: konst.ElementType.Geo, scale: konst.DamageScale.Zhongli, value: 401.4 },
            ],
        },
        passive: {
            // 4. 玉璋シールドはダメージを受けた際に防御効果を発動する。
            //    玉璋シールドに守られたキャラクターのシールド強化+5%。
            //    シールドが消えるまで、最大5回強度を上げることができる。
            // 玉璋シールドに守られたキャラクターは、付近範囲内の敵の全元素耐性と物理耐性-20%。この効果は重ねがけ不可。
            skill: {
                extra: konst.ExtraBonusType.Reduct,
                value: 20,
                limit: "zhongli.shield_en",
                target: konst.BonusTarget.All,
            },
            // 5. 天星のダメージ量が鍾離のHP上限の33%分上昇する。
            asc4th: [
                { extra: konst.ExtraBonusType.Flat, dest: konst.FlatBonusDest.Combat, base: konst.FlatBonusBase.Hp, value: 1.39 },
                { extra: konst.ExtraBonusType.Flat, dest: konst.FlatBonusDest.Skill, base: konst.FlatBonusBase.Hp, value: 1.9 },
                { extra: konst.ExtraBonusType.Flat, dest: konst.FlatBonusDest.Burst, base: konst.FlatBonusBase.Hp, value: 100.0 / 3 },
            ],
        },
        conste: {
            // 1. 地心の岩柱は最大2個同時に存在できる。
            // 2. 天星落下時、近くにいる出場中のキャラクターに玉璋シールドを付与する。
            // 3. 地心のスキルLv.がが3つ上昇する。
            // 4. 天星の影響範囲が20%拡大する。さらに天星の石化効果の継続時間2秒延長する。
            // 5. 天星のスキルLv.+3
            // 6. 玉璋シールドがダメージを受けた時、そのダメージ量の40%分のHPを回復させる。一回の回復上限はキャラクターのHP上限の8%。
        },
    },
} as const;

export interface ICharaData extends IIdentify, INameable, ICommentable {
    name: CharaName;
    conste: number;
    level: string;
    hp: number;
    atk: number;
    def: number;
    special: BonusValue;
    combat: number;
    skill: number;
    burst: number;
}
export type DBCharaTable = { chara: ICharaData[]; };

export default class Chara {
    public static create(id: string, name: CharaName, init: SettingChara) {
        const item = CharaList[name];
        const data: ICharaData = {
            id,
            name,
            comment: "",
            conste: init.conste,
            level: init.level,
            hp: item.status.hp[0],
            atk: item.status.atk[0],
            def: item.status.def[0],
            special: {
                type: item.special,
                value: item.spvalue[0],
            },
            combat: init.combat,
            skill: init.skill,
            burst: init.burst,
        };
        Chara.level(data);
        return data;
    }

    public static reset(data: ICharaData, init: SettingChara) {
        const { special } = CharaList[data.name];
        data.conste = init.conste;
        data.level = init.level;
        data.special = { type: special, value: 0 };
        data.combat = init.combat;
        data.skill = init.skill;
        data.burst = init.burst;
        Chara.level(data);
    }

    public static level(data: ICharaData) {
        const { status, spvalue } = CharaList[data.name];
        const level = data.level;
        data.hp = ascension.calc14(level, status.hp);
        data.atk = ascension.calc14(level, status.atk);
        data.def = ascension.calc14(level, status.def);
        data.special.value = ascension.step8(level, spvalue);
    }
}
