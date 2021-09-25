import * as konst from "~/src/const";
import { BonusValue, IIdentify, INameable, ICommentable, IWeaponInfo } from "~/src/interface";

const WeaponAtk3: IReadonlyHash<ReadonlyArray<number>> = {
    //    1,  20, 20+,  40, 40+,  50, 50+,  60, 60+,  70, 70+,  80, 80+,  90
    38: [38, 86, 105, 151, 171, 193, 212, 234, 253, 274, 294, 314, 334, 354],
    39: [39, 94, 113, 169, 189, 216, 236, 263, 282, 309, 329, 355, 375, 401],
    40: [40, 102, 121, 187, 207, 239, 259, 292, 311, 344, 363, 396, 415, 448],
} as const;

const WeaponAtk4: IReadonlyHash<ReadonlyArray<number>> = {
    //    1,  20, 20+,  40, 40+,  50, 50+,  60, 60+,  70, 70+,  80, 80+,  90
    39: [39, 94, 120, 176, 202, 229, 255, 282, 308, 335, 361, 388, 414, 440],
    41: [41, 99, 125, 184, 210, 238, 264, 293, 319, 347, 373, 401, 427, 454],
    42: [42, 109, 135, 205, 231, 266, 292, 327, 353, 388, 414, 449, 475, 510],
    44: [44, 119, 144, 226, 252, 293, 319, 361, 387, 429, 455, 497, 523, 565],
    45: [45, 128, 154, 247, 273, 321, 347, 395, 421, 470, 496, 545, 571, 620],
} as const;

const WeaponAtk5: IReadonlyHash<ReadonlyArray<number>> = {
    //    1,  20, 20+,  40, 40+,  50, 50+,  60, 60+,  70, 70+,  80, 80+,  90
    44: [44, 110, 141, 210, 241, 275, 307, 341, 373, 408, 439, 475, 506, 542],
    46: [46, 122, 153, 235, 266, 308, 340, 382, 414, 457, 488, 532, 563, 608],
    48: [48, 133, 164, 261, 292, 341, 373, 423, 455, 506, 537, 590, 621, 674],
} as const;

const WeaponSub3: ReadonlyRecord<konst.ItemBonusType, ReadonlyArray<number>> = {
    //         1, 20, 40, 50, 60, 70, 80, 90
    "hp_buf": [7.7, 13.5, 19.7, 22.8, 25.9, 29.0, 32.1, 35.2],
    "atk_buf": [7.7, 13.5, 19.7, 22.8, 25.9, 29.0, 32.1, 35.2],
    "def_buf": [9.6, 16.9, 24.6, 28.5, 32.3, 36.2, 40.1, 43.9],
    "elem": [31, 54, 79, 91, 104, 116, 128, 141],
    "en_rec": [11.3, 20.0, 29.2, 33.8, 38.3, 42.9, 47.5, 52.1],
    "cri_dmg": [10.2, 18.0, 26.3, 30.4, 34.5, 38.6, 42.7, 46.9],
    "cri_rate": [5.1, 9.0, 13.1, 15.2, 17.3, 19.3, 21.4, 23.4],
    "phys_dmg": [9.6, 16.9, 24.6, 28.5, 32.3, 36.2, 40.1, 43.9],
} as const;

const WeaponSub4: ReadonlyRecord<konst.ItemBonusType, ReadonlyArray<number>> = {
    //         1, 20, 40, 50, 60, 70, 80, 90
    "hp_buf": [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
    "atk_buf": [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
    "def_buf": [11.3, 19.9, 29.0, 33.5, 38.1, 42.6, 47.2, 51.7],
    "elem": [36, 64, 93, 107, 122, 136, 151, 165],
    "en_rec": [13.3, 23.6, 34.3, 39.7, 45.1, 50.5, 55.9, 61.3],
    "cri_dmg": [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
    "cri_rate": [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
    "phys_dmg": [7.5, 13.3, 19.3, 22.4, 25.4, 28.4, 31.5, 34.5],
} as const;

const WeaponSub5: ReadonlyRecord<konst.ItemBonusType, ReadonlyArray<number>> = {
    //         1, 20, 40, 50, 60, 70, 80, 90
    "hp_buf": [],
    "atk_buf": [10.8, 19.1, 27.8, 32.2, 36.5, 40.9, 45.3, 49.6],
    "def_buf": [],
    "elem": [],
    "en_rec": [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
    "cri_dmg": [14.4, 25.4, 37.1, 42.9, 48.7, 54.5, 60.3, 66.2],
    "cri_rate": [9.6, 17.0, 24.7, 28.6, 32.5, 36.3, 40.2, 44.1],
    "phys_dmg": [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
} as const;

const SwordNames = [
    "AquilaFavonia",
    "SkywardBlade",
    "SummitShaper",
    "PrimordialJadeCutter",
    "FavoniusSword",
    "SacrificialSword",
    "LionsRoar",
    "TheFlute",
    "AlleyFlash",
    "RoyalLongsword",
    "BlackcliffLongsword",
    "PrototypeRancour",
    "IronSting",
    "SwordDescension",
    "BlackSword",
    "FesteringDesire",
    "SkyriderSword",
    "FilletBlade",
    "TravelersSword",
    "HarbingerDawn",
    "CoolSteel",
    "DarkIronSword",
] as const;

// TODO: limitを多言語対応
const SwordList: ReadonlyRecord<typeof SwordNames[number], IWeaponInfo> = {
    AquilaFavonia: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.ElementBonusType.Phys,
        secval: WeaponSub5.phys_dmg,
        // 攻撃力+20~40%
        passive: { items: konst.StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40] },
        // ダメージを受けると発動:抗争の旗を高く掲げる西風の鷹の魂が蘇り、攻撃力の100~160%分のHPを回復し、周りの敵に攻撃力の200~320%のダメージを与える。15秒ごとに1回発動可能。
    },
    SkywardBlade: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.EnRec,
        secval: WeaponSub5.en_rec,
        // 会心率+4~8%
        passive: { items: konst.CriticalBonusType.Rate, value: [4, 5, 6, 7, 8] },
        // 元素爆発を使用すると衝天の勢いを獲得する:移動速度+10%、攻撃速度+10%、通常攻撃と重撃が命中する際に、攻撃力の20~40%の追加ダメージを与える、継続時間12秒。
    },
    SummitShaper: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub5.atk_buf,
        passive: [
            // シールド強化20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    PrimordialJadeCutter: {
        star: 5,
        atk: WeaponAtk5[44],
        second: konst.CriticalBonusType.Rate,
        secval: WeaponSub5.cri_rate,
        passive: [
            // HP上限+20~40%。
            { items: konst.StatusBonusType.HpBuf, value: [20, 25, 30, 35, 40] },
            // また、キャラクターのHP上限の1.2~2.4%分、攻撃力がアップする。
            { extra: konst.ExtraBonusType.Flat, dest: konst.FlatBonusDest.Atk, base: konst.FlatBonusBase.Hp, value: [1.2, 1.5, 1.8, 2.1, 2.4] },
        ]
    },
    FavoniusSword: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.EnRec,
        secval: WeaponSub4.en_rec,
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    SacrificialSword: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.EnRec,
        secval: WeaponSub4.en_rec,
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~16秒毎に1回のみ発動する。
        // passive: null,
    },
    LionsRoar: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub4.atk_buf,
        // 炎元素又は雷元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: konst.AnyBonusType.Damage, value: [20, 24, 28, 32, 36], limit: "炎、雷元素の影響を受けた敵" },
    },
    TheFlute: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub4.atk_buf,
        // 通常攻撃または重撃が命中すると、100%の確率で和音を1個獲得する。
        // 和音を5個集めると、音律の力を放ち、周囲の敵に攻撃力の100~200%のダメージを与える。和音は最大30秒存在し、0.5秒毎に最大1個獲得可能。
        // passive: null,
    },
    AlleyFlash: {
        star: 4,
        atk: WeaponAtk4[45],
        second: konst.StatusBonusType.Elem,
        secval: [12, 21, 31, 36, 41, 45, 50, 55],
        // キャラクターが与えるダメージ+12~24%。ダメージを受けると、このダメージアップ効果は5秒間無効になる。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24] },
    },
    RoyalLongsword: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub4.atk_buf,
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 5 },
    },
    BlackcliffLongsword: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.CriticalBonusType.Damage,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    PrototypeRancour: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.ElementBonusType.Phys,
        secval: WeaponSub4.phys_dmg,
        // 通常攻撃または重撃が命中すると、攻撃力と防御力+4~8%、継続時間6秒、最大4重まで。0.3秒ごとに1回発動可能。
        passive: { items: [konst.StatusBonusType.AtkBuf, konst.StatusBonusType.DefBuf], value: [4, 5, 6, 7, 8], limit: "通常攻撃または重撃が命中した時", times: 6, stack: 4 },
    },
    IronSting: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.Elem,
        secval: WeaponSub4.elem,
        // 元素ダメージを与えた6秒間、キャラの与えるダメージ+6~12%、最大2重まで、1秒毎に1回のみ発動する。
        passive: { items: konst.AnyBonusType.Damage, value: [6, 7.5, 9, 10.5, 12], limit: "元素ダメージを与えた後", times: 6, stack: 2 },
    },
    SwordDescension: {
        star: 4,
        atk: WeaponAtk4[39],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub3.atk_buf,
        // 通常攻撃と重撃が命中時、50%の確率で攻撃力の200%の狭範囲ダメージを与える。10秒毎に1回のみ発動可能。
        // 旅人が降臨の剣を装備するとさらに攻撃力+66。
        passive: { items: konst.StatusBonusType.Atk, value: [66, 66, 66, 66, 66], limit: "旅人が装備した時" },
    },
    BlackSword: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Rate,
        secval: WeaponSub4.cri_rate,
        // 通常攻撃と重撃ダメージ+20~40%
        passive: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: [20, 25, 30, 35, 40] },
        // さらに通常攻撃と重撃が会心時、攻撃力の60~100%分のHPを回復する。5秒に1回のみ発動可能。
    },
    FesteringDesire: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.EnRec,
        secval: [10.0, 17.7, 25.8, 29.8, 33.8, 37.9, 41.9, 45.9],
        passive: [
            // 元素スキルのダメージ+16~32%
            { items: konst.CombatBonusType.Skill, value: [16, 20, 24, 28, 32] },
            // 元素スキルの会心率+6~12%
            { items: konst.CriticalBonusType.Skill, value: [6, 7.5, 9, 10.5, 12] },
        ]
    },
    SkyriderSword: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.StatusBonusType.EnRec,
        secval: WeaponSub3.en_rec,
        // 元素爆発を発動した後、攻撃力と移動速度+12~24%、継続時間15%。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 25], limit: "元素爆発後", times: 15 },
    },
    FilletBlade: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub3.atk_buf,
        // 攻撃が命中すると、50%の確率で1体の敵に攻撃力の240~400%のダメージを与える。15~11秒毎に1回のみ発動する。
        // passive: null,
    },
    TravelersSword: {
        star: 3,
        atk: WeaponAtk3[40],
        second: konst.StatusBonusType.DefBuf,
        secval: [6.4, 11.3, 16.4, 19.0, 21.6, 24.1, 26.7, 29.3],
        // 元素オーブまたは元素粒子を獲得した時、HPを1~2%回復する。
        // passive: null,
    },
    HarbingerDawn: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.CriticalBonusType.Damage,
        secval: WeaponSub3.cri_dmg,
        // HPが90%以上の場合、会心率+14~28%。
        passive: { items: konst.CriticalBonusType.Rate, value: [14, 17.5, 21, 24.5, 28], limit: "HP90%以上の時" },
    },
    CoolSteel: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub3.atk_buf,
        // 水元素又は氷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "水、氷元素の影響を受けた敵" },
    },
    DarkIronSword: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.Elem,
        secval: [31, 54, 79, 91, 104, 116, 128, 141],
        // 過負荷、超電導、感電、または雷元素拡散反応が発生した12秒間、基礎攻撃力+20~40%。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40], limit: "過負荷、超電磁、感電または雷元素拡散が発生した時", times: 12 },
    },
} as const;

const ClaymoreNames = [
    "WolfsGravestone",
    "SkywardPride",
    "TheUnforged",
    "FavoniusGreatsword",
    "SacrificialGreatsword",
    "Rainslasher",
    "TheBell",
    "LithicBlade",
    "RoyalGreatsword",
    "BlackcliffSlasher",
    "PrototypeAminus",
    "Whiteblind",
    "SerpentSpine",
    "SnowTombedStarsilver",
    "SkyriderGreatsword",
    "DebateClub",
    "WhiteGreatsword",
    "BloodtaintedGreatsword",
    "FerrousShadow",
] as const;

const ClaymoreList: ReadonlyRecord<typeof ClaymoreNames[number], IWeaponInfo> = {
    WolfsGravestone: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub5.atk_buf,
        passive: [
            // 攻撃力+20~40%
            { items: konst.StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40] },
            // HPが30%以下の敵に命中すると、チーム全員の攻撃力+40~80%、継続時間12秒。30秒に1回のみ発動可能。
            { items: konst.StatusBonusType.AtkBuf, value: [40, 50, 60, 70, 80], limit: "HP30%以下の敵に命中した時", times: 12, target: konst.BonusTarget.All },
        ],
    },
    SkywardPride: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.StatusBonusType.EnRec,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 与えるダメージ+8~16%。
        passive: { items: konst.AnyBonusType.Damage, value: [8, 10, 12, 14, 16] },
        // 元素爆発を発動した後、通常攻撃と重撃が命中すると真空の刃を放ち、経路上の敵に攻撃力の80~160%のダメージを与える、継続時間20秒または真空の刃を8回発動まで。
    },
    TheUnforged: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub5.atk_buf,
        passive: [
            // シールド強化20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    FavoniusGreatsword: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.EnRec,
        secval: WeaponSub4.en_rec,
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    SacrificialGreatsword: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~16秒毎に1回のみ発動する。
        // passive: null,
    },
    Rainslasher: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.Elem,
        secval: WeaponSub4.elem,
        // 水元素又は雷元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: konst.AnyBonusType.Damage, value: [20, 24, 28, 32, 36], limit: "水、雷元素の影響を受けた敵" },
    },
    TheBell: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.HpBuf,
        secval: WeaponSub4.hp_buf,
        // ダメージを受けた時、HP上限の20~32%に相当するダメージを吸収できるシールドを生成する。継続時間は最大10秒まで。45秒毎に1回のみ発動する。
        // シールドが存在する時、キャラクターの与えるダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "シールドが存在する時" },
    },
    LithicBlade: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub4.atk_buf,
        // チームに璃月出身のキャラクターが1人いる毎に、この武器を装備したキャラクターの攻撃力＋7~11%、会心率＋3~7%。最大4重まで。
        passive: [
            { items: konst.StatusBonusType.AtkBuf, value: [7, 8, 9, 10, 11], limit: "チームに璃月出身のキャラクターが1人いる毎", stack: 4 },
            { items: konst.CriticalBonusType.Rate, value: [3, 4, 5, 6, 7], limit: "チームに璃月出身のキャラクターが1人いる毎", stack: 4 },
        ]
    },
    RoyalGreatsword: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 攻撃が敵にダメージを与えた時、会心率+8%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 5 },
    },
    BlackcliffSlasher: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Damage,
        secval: WeaponSub4.cri_dmg,
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    PrototypeAminus: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 通常攻撃と重撃が命中する度、50%の確率で狭範囲の敵に攻撃力の240~480%の追加ダメージを与える。15秒毎に1回のみ発動可能。
        // passive: null,
    },
    Whiteblind: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.DefBuf,
        secval: WeaponSub4.def_buf,
        // 通常攻撃か重撃が命中すると、攻撃力と防御力+6~12%。継続時間6秒、最大4重まで。0.5秒毎に1回のみ発動可能。
        passive: { items: [konst.StatusBonusType.AtkBuf, konst.StatusBonusType.DefBuf], value: [6, 7.5, 9, 10.5, 12], limit: "通常攻撃か重撃が命中した時", times: 6, stack: 4 },
    },
    SerpentSpine: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Rate,
        secval: WeaponSub4.cri_rate,
        // フィールドにいる時、4秒毎に、与えるダメージ+6~10%、被ダメージ+3~1.8%。最大5重まで、退場後もリセットされず、攻撃を受けると効果数-1。
        passive: { items: konst.AnyBonusType.Damage, value: [6, 7, 8, 9, 10], limit: "フィールドにいる時4秒毎", stack: 5 },
    },
    SnowTombedStarsilver: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.ElementBonusType.Phys,
        secval: WeaponSub4.phys_dmg,
        // 通常攻撃と重撃が敵に命中した時、60%の確率で敵の上に恒氷晶核が作られ落下し、攻撃力の80%の範囲ダメージを与える。
        // 敵が氷元素の影響を受けている場合、攻撃力の200%のダメージを受ける。この効果は10秒毎に1回のみ発動可能。
        // passive: null
    },
    SkyriderGreatsword: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.ElementBonusType.Phys,
        secval: WeaponSub3.phys_dmg,
        // 通常攻撃と重撃が命中すると、攻撃力+6~10%、継続時間6秒、最大4重まで。0.5秒毎に1回のみ発動可能。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [6, 7, 8, 9, 10], limit: "通常攻撃か重撃が命中した時", times: 6, stack: 4 },
    },
    DebateClub: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub3.atk_buf,
        // 元素スキルを発動した後、通常攻撃と重撃が命中する際に、狭範囲で攻撃力の60~120%のダメージを与える。
        // passive: null,
    },
    WhiteGreatsword: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.DefBuf,
        secval: WeaponSub3.def_buf,
        // 敵を倒した時、HPを8~16%回復する。
        // passive: null,
    },
    BloodtaintedGreatsword: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.StatusBonusType.Elem,
        secval: [41, 72, 105, 122, 138, 154, 171, 187],
        // 炎元素又は雷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "炎、雷元素の影響を受けた敵" },
    },
    FerrousShadow: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.HpBuf,
        secval: WeaponSub3.hp_buf,
        // HPが70~90%以下になると、重撃は中断されにくくなり、さらに重撃ダメージ+30~50%。
        passive: { items: konst.CombatBonusType.Heavy, value: [30, 35, 40, 45, 50], limit: "HPが一定値以下の時" },
    },
} as const;

const PolearmNames = [
    "PrimordialSpear",
    "SkywardSpine",
    "VortexVanquisher",
    "StaffHoma",
    "FavoniusLance",
    "DragonsBane",
    "LithicSpear",
    "RoyalSpear",
    "BlackcliffPole",
    "PrototypeGrudge",
    "CrescentPike",
    "Deathmatch",
    "DragonspineSpear",
    "BlackTassel",
    "Halberd",
    "WhiteTassel",
] as const;

const PolearmList: ReadonlyRecord<typeof PolearmNames[number], IWeaponInfo> = {
    PrimordialSpear: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.CriticalBonusType.Rate,
        secval: WeaponSub5.cri_rate,
        passive: [
            // 敵に命中した時、自身の攻撃力+3.2~6%、継続時間6秒、最大7重まで。0.3秒に最大1回発動でき、7重まで発動すると与ダメージ+12~24%。
            { items: konst.StatusBonusType.AtkBuf, value: [3.2, 3.9, 4.6, 5.3, 6.0], limit: "敵に命中した時", times: 6, stack: 7 },
            { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "さらに7重まで発動した時" },
        ],
    },
    SkywardSpine: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.StatusBonusType.EnRec,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 会心率+8~16%、通常攻撃速度+12%。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16] },
        // 通常攻撃と重撃が命中時、50%の確率で真空刃を発動し、攻撃力の40~100%の狭範囲ダメージを与える。2秒毎に1回のみ発動可能。
    },
    VortexVanquisher: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub5.atk_buf,
        passive: [
            // シールド強化+20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    StaffHoma: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.CriticalBonusType.Damage,
        secval: WeaponSub5.cri_dmg,
        passive: [
            // HP上限+20~40%。
            { items: konst.StatusBonusType.HpBuf, value: [20, 25, 30, 35, 40] },
            // また、キャラクターのHP上限の0.8~1.6%分、攻撃力がアップする。
            { extra: konst.ExtraBonusType.Flat, dest: konst.FlatBonusDest.Atk, base: konst.FlatBonusBase.Hp, value: [0.8, 1.0, 1.2, 1.4, 1.6] },
            // キャラクターのHPが50%未満の時、攻撃力が更にHP上限の1.0~1.8%分アップする。
            { extra: konst.ExtraBonusType.Flat, dest: konst.FlatBonusDest.Atk, base: konst.FlatBonusBase.Hp, value: [1.0, 1.2, 1.4, 1.6, 1.8], limit: "HPが50未満の時" },
        ]
    },
    FavoniusLance: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    DragonsBane: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.Elem,
        secval: [48, 85, 124, 143, 162, 182, 201, 221],
        // 水元素又は炎元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: konst.AnyBonusType.Damage, value: [20, 24, 28, 32, 36], limit: "水、炎元素の影響を受けた敵" },
    },
    LithicSpear: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // チームに璃月出身のキャラクターが1人いる毎に、この武器を装備したキャラクターの攻撃力＋7~11%、会心率＋3~7%。最大4重まで。
        passive: [
            { items: konst.StatusBonusType.AtkBuf, value: [7, 8, 9, 10, 11], limit: "チームに璃月出身のキャラクターが1人いる毎", stack: 4 },
            { items: konst.CriticalBonusType.Rate, value: [3, 4, 5, 6, 7], limit: "チームに璃月出身のキャラクターが1人いる毎", stack: 4 },
        ]
    },
    RoyalSpear: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "敵にダメージを与えた時", stack: 5 },
    },
    BlackcliffPole: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Damage,
        secval: WeaponSub4.cri_dmg,
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    PrototypeGrudge: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.EnRec,
        secval: [10.0, 17.7, 25.8, 29.8, 33.8, 37.9, 41.9, 45.9],
        // 元素スキルを発動した後、通常攻撃と重撃ダメージ+8~16%、継続時間12秒、最大2重まで。
        passive: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: [8, 10, 12, 14, 16], limit: "元素スキル発動後", times: 12, stack: 2 },
    },
    CrescentPike: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.ElementBonusType.Phys,
        secval: WeaponSub4.phys_dmg,
        // 元素粒子又は元素オーブを獲得した5秒間、通常攻撃と重撃で、攻撃力の20~40%の追加ダメージを与える。
        // passive: null,
    },
    Deathmatch: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.CriticalBonusType.Rate,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        passive: [
            // 近くに敵が2人以上いる時、攻撃力+16~32%、防御力+16~32%。
            { items: [konst.StatusBonusType.AtkBuf, konst.StatusBonusType.DefBuf], value: [16, 20, 24, 28, 32], limit: "近くに敵が2人以上いる時" },
            // 近くにいる敵が2人未満の時、攻撃力24~48%。
            { items: konst.StatusBonusType.AtkBuf, value: [24, 30, 36, 42, 48], limit: "近くに敵が2人未満の時" },
        ],
    },
    DragonspineSpear: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.ElementBonusType.Phys,
        secval: [15.0, 26.5, 38.7, 44.7, 50.8, 56.8, 62.9, 69.0],
        // 通常攻撃と重撃が敵に命中した時、60%の確率で敵の上に恒氷晶核が作られ落下し、攻撃力の80%の範囲ダメージを与える。
        // 敵が氷元素の影響を受けている場合、攻撃力の200%のダメージを受ける。この効果は10秒毎に1回のみ発動可能。
        // passive: null
    },
    BlackTassel: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.StatusBonusType.HpBuf,
        secval: [10.2, 18.0, 26.3, 30.4, 34.6, 38.7, 42.8, 46.9],
        // スライムタイプの敵に与えるダメージ+40~80%。
        passive: { items: konst.AnyBonusType.Damage, value: [40, 50, 60, 70, 80], limit: "スライムタイプの敵" },
    },
    Halberd: {
        star: 3,
        atk: WeaponAtk3[40],
        second: konst.StatusBonusType.AtkBuf,
        secval: [5.1, 9.0, 13.1, 15.2, 17.3, 19.3, 21.4, 23.5]
        // 通常攻撃が命中した敵1体に攻撃力の160~320%の追加ダメージを与える。10秒毎に1回のみ発動する。
        // passive: null,
    },
    WhiteTassel: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.CriticalBonusType.Rate,
        secval: [5.1, 9.0, 13.1, 15.2, 17.3, 19.3, 21.4, 23.4],
        // 通常攻撃のダメージ+24~48%。
        passive: { items: konst.CombatBonusType.Normal, value: [24, 30, 36, 42, 48] },
    },
} as const;

const BowNames = [
    "AmosBow",
    "SkywardHarp",
    "ElegyForTheEnd",
    "FavoniusWarbow",
    "SacrificialBow",
    "Rust",
    "Stringless",
    "RoyalBow",
    "BlackcliffWarbow",
    "PrototypeCrescent",
    "CompoundBow",
    "ViridescentHunt",
    "WindblumeOde",
    "SharpshootersOath",
    "RavenBow",
    "Slingshot",
    "Messenger",
    "RecurveBow",
] as const;

const BowList: ReadonlyRecord<typeof BowNames[number], IWeaponInfo> = {
    AmosBow: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub5.atk_buf,
        passive: [
            // 通常攻撃と狙い撃ちのダメージ+12~24%。
            { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: [12, 15, 18, 21, 24] },
            // 矢を放った後、0.1秒毎にダメージ+8~16%、最大5回まで上昇する。
            { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: [8, 10, 12, 14, 16], limit: "矢を放った後0.1秒毎", stack: 5 },
        ]
    },
    SkywardHarp: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.CriticalBonusType.Rate,
        secval: [4.8, 8.5, 12.4, 14.3, 16.2, 18.2, 20.1, 22.1],
        // 会心ダメージ+20~40%。
        passive: { items: konst.CriticalBonusType.Damage, value: [20, 25, 30, 35, 40] },
        // 攻撃が命中した時、60~100%の確率で狭範囲内の敵に攻撃力の125%の物理ダメージを与える。4~2秒毎に1回のみ発動可能。
    },
    ElegyForTheEnd: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.EnRec,
        secval: WeaponSub5.en_rec,
        passive: [
            // 風と共に流れる｢千年の大楽章｣の一部。元素熟知+60~120。
            { items: konst.StatusBonusType.Elem, value: [60, 75, 90, 105, 120] },
            // 元素スキルまたは元素爆発が敵に命中すると、追憶の欠片を一枚獲得する。この効果は0.2秒毎に一回のみ発動でき、待機中のキャラクターも発動できる。
            // 追憶の欠片を4枚集めると、全ての追憶の欠片を消費し、周囲のチーム全員に12秒継続する｢千年の大楽章・別れの歌｣効果を付与する:元素熟知+100~200、攻撃力+20~40%。
            { items: konst.StatusBonusType.Elem, value: [100, 125, 150, 175, 200], limit: "元素スキルまたは元素爆発が4回敵に命中した時", times: 12 },
            { items: konst.StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40], limit: "元素スキルまたは元素爆発が4回敵に命中した時", times: 12 },
            // 発動後の20秒間、追憶の欠片を再度獲得することはできない。｢千年の大楽章｣のもたらす各効果中、同種類の効果は重ね掛け不可。
        ]
    },
    FavoniusWarbow: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.EnRec,
        secval: WeaponSub4.en_rec,
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    SacrificialBow: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~14秒毎に1回のみ発動する。
        // passive: null,
    },
    Rust: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub4.atk_buf,
        // 通常攻撃のダメージ+40~80%、狙い撃ち射撃のダメージ-10%。
        passive: [
            { items: konst.CombatBonusType.Normal, value: [40, 50, 60, 70, 80] },
            { items: konst.CombatBonusType.Heavy, value: [-10, -10, -10, -10, -10] },
        ],
    },
    Stringless: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.Elem,
        secval: WeaponSub4.elem,
        // 元素スキルと元素爆発のダメージ+24~48%。
        passive: { items: [konst.CombatBonusType.Skill, konst.CombatBonusType.Burst], value: [24, 30, 36, 42, 48] },
    },
    RoyalBow: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub4.atk_buf,
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで、攻撃会心発生時、効果をクリアにする。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "敵にダメージを与えた時", stack: 5 },
    },
    BlackcliffWarbow: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.CriticalBonusType.Damage,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 敵を倒した後、攻撃力+12~24%、継続時間30秒。最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    PrototypeCrescent: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub4.atk_buf,
        // 狙い撃ちが弱点に命中すると、移動速度+10%、攻撃力+36~72%、継続時間10秒。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [36, 45, 54, 63, 72], limit: "狙い撃ちが弱点に命中した時", times: 10 },
    },
    CompoundBow: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.ElementBonusType.Phys,
        secval: [15.0, 26.5, 38.7, 44.7, 50.8, 56.8, 62.9, 69.0],
        // 通常攻撃と狙い撃ち射撃が命中すると、攻撃力+4~8%、通常攻撃速度1.2~2.4%、継続時間6秒、最大4重まで、0.3秒に1回のみ発動可能。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "通常攻撃と狙い撃ちが命中した時", times: 6, stack: 4 },
    },
    ViridescentHunt: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Rate,
        secval: WeaponSub4.cri_rate,
        // 通常攻撃と重撃が命中時、50%の確率で風の目を生成し、近くの敵を吸い寄せる。
        // 0.5秒毎に攻撃力の40~80%のダメージを与える。継続時間4秒、14~10秒毎に1回のみ発動可能。
        // passive: null,
    },
    WindblumeOde: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.Elem,
        secval: WeaponSub4.elem,
        // 元素スキルを発動した後、風の花の悠久なる願いの加護を獲得し、攻撃力+16~32%、持続時間6秒。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [16, 20, 24, 28, 32], limit: "元素スキルを発動した後", times: 6 },
    },
    SharpshootersOath: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.CriticalBonusType.Damage,
        secval: WeaponSub3.cri_dmg,
        // 弱点に対するダメージ+24~48%。
        passive: { items: konst.AnyBonusType.Damage, value: [24, 30, 36, 42, 48], limit: "弱点" },
    },
    RavenBow: {
        star: 3,
        atk: WeaponAtk3[40],
        second: konst.StatusBonusType.Elem,
        secval: [20, 36, 53, 61, 69, 77, 85, 94],
        // 水元素又は炎元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "水、炎元素の影響を受けた敵" },
    },
    Slingshot: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.CriticalBonusType.Rate,
        secval: [6.8, 12.0, 17.5, 20.3, 23.0, 25.7, 28.5, 31.2],
        // 通常攻撃又は狙い撃ちの時、矢が発射後0.3秒内に敵に命中すると、ダメージ+36~60%。0.3秒より長い場合、ダメージ-10%。
        passive: [
            // 通常攻撃又は狙い撃ちの時、矢が発射後0.3秒内に敵に命中すると、ダメージ+36~60%。
            { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: [36, 42, 48, 54, 60], limit: "矢が発射後0.3秒以内に敵に命中した時" },
            // 0.3秒より長い場合、ダメージ-10%。
            { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: [-10, -10, -10, -10, -10], limit: "矢が発射後0.3秒より長く敵に命中した時" }
        ]
    },
    Messenger: {
        star: 3,
        atk: WeaponAtk3[40],
        second: konst.CriticalBonusType.Damage,
        secval: [6.8, 12.0, 17.5, 20.3, 23.0, 25.7, 28.5, 31.2],
        // 狙い撃ち時、弱点に命中すると、追加で攻撃力の100~200%のダメージを与え、必ず会心ダメージになる。10秒毎に1回のみ発動可能。
        // passive: null,
    },
    RecurveBow: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.StatusBonusType.HpBuf,
        secval: [10.2, 18.0, 26.3, 30.4, 34.6, 38.7, 42.8, 46.9],
        // 敵を倒した時、HPを8~16%回復する。
        // passive: null,
    },
} as const;

const CatalystNames = [
    "SkywardAtlas",
    "LostSacredWinds",
    "MemoryDust",
    "FavoniusCodex",
    "SacrificialFragments",
    "EyePerception",
    "TheWidsith",
    "WineAndSong",
    "RoyalGrimoire",
    "BlackcliffAmulet",
    "PrototypeMalice",
    "MappaMare",
    "SolarPearl",
    "Frostbearer",
    "AmberCatalyst",
    "MagicGuide",
    "TalesDragonSlayers",
    "OtherworldlyStory",
    "TwinNephrite",
] as const;

const CatalystList: ReadonlyRecord<typeof CatalystNames[number], IWeaponInfo> = {
    SkywardAtlas: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.StatusBonusType.AtkBuf,
        secval: [7.2, 12.7, 18.5, 21.4, 24.4, 27.3, 30.2, 33.1],
        // 元素ダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Element, value: [12, 15, 18, 21, 24] },
        // 通常攻撃が命中した時、50%の確率で高天流雲の好意を獲得し、15秒内に自ら周囲の敵を攻撃すると、攻撃力の160~320%相当のダメージを与える。30秒毎に1回のみ発動可能。
    },
    LostSacredWinds: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.CriticalBonusType.Rate,
        secval: [7.2, 12.7, 18.5, 21.4, 24.4, 27.3, 30.2, 33.1],
        // 移動速度+10%。
        // 出場中は4秒毎に元素ダメージ+8~16%、最大4重まで。キャラが退場または戦闘不能まで有効する。
        passive: { items: konst.AnyBonusType.Element, value: [8, 10, 12, 14, 16], limit: "出場中は4秒毎", stack: 4 },
    },
    MemoryDust: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub5.atk_buf,
        passive: [
            // シールド強化+20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    FavoniusCodex: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.EnRec,
        secval: [10.0, 17.7, 25.8, 29.8, 33.8, 37.9, 41.9, 45.9],
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    SacrificialFragments: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.Elem,
        secval: [48, 85, 124, 143, 162, 182, 201, 221],
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~14秒毎に1回のみ発動する。
        // passive: null,
    },
    EyePerception: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.AtkBuf,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        // 通常攻撃と重撃が命中する時、50%の確率で昭心法珠を1つ発射し、敵に攻撃力の240~360%のダメージを与える。敵同士に最大4回跳ね返る。この効果は12~8秒毎に1回発動可能。
        // passive: null,
    },
    TheWidsith: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Damage,
        secval: WeaponSub4.cri_dmg,
        // キャラ登場時、ランダムにテーマ曲を1つ獲得する、継続時間10秒。30秒ごとに1回のみ発動する。
        passive: [
            // 叙唱:攻撃力+60~120%
            { items: konst.StatusBonusType.AtkBuf, value: [60, 75, 90, 105, 120], limit: "叙唱：キャラ登場時", times: 10 },
            // 詠唱:全元素ダメージ+48~96%
            { items: konst.AnyBonusType.Element, value: [48, 60, 72, 84, 96], limit: "詠唱：キャラ登場時", times: 10 },
            // 間奏曲:元素熟知+240~480%
            { items: konst.StatusBonusType.Elem, value: [240, 300, 360, 420, 480], limit: "間奏曲：キャラ登場時", times: 10 },
        ],
    },
    WineAndSong: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 通常攻撃が敵に命中すると、ダッシュまたはダッシュを代替する能力のスタミナ消費-？%、持続時間5秒。
        // また、ダッシュまたはダッシュを代替する能力を使用すると、攻撃力+25~45%、持続時間5秒。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [25, 30, 35, 40, 45], limit: "ダッシュまたはダッシュを代替する能力を使用した時", times: 5 },
    },
    RoyalGrimoire: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 6 },
    },
    BlackcliffAmulet: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Damage,
        secval: WeaponSub4.cri_dmg,
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    PrototypeMalice: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.HpBuf,
        secval: WeaponSub4.hp_buf,
        // 元素爆発を発動した後6秒間、2秒毎に元素エネルギーを4~6回復:さらに2秒毎にチーム全員のHPの4~6%を回復
        // passive: null,
    },
    MappaMare: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.Elem,
        secval: [24, 42, 62, 71, 81, 91, 101, 110],
        // 元素反応を起こした後、元素ダメージ+8~16%、継続時間10秒、最大2重まで。
        passive: { items: konst.AnyBonusType.Element, value: [8, 10, 12, 14, 16], limit: "元素反応を起こした後", times: 10, stack: 2 },
    },
    SolarPearl: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Rate,
        secval: WeaponSub4.cri_rate,
        passive: [
            // 通常攻撃が命中した後、6秒間元素スキルと元素爆発のダメージ+20~40%。
            { items: [konst.CombatBonusType.Skill, konst.CombatBonusType.Burst], value: [20, 25, 30, 35, 40], limit: "通常攻撃が命中した時", times: 6 },
            // 元素スキル又は元素爆発が命中した後、6秒間通常攻撃のダメージ+20~40%。
            { items: konst.CombatBonusType.Normal, value: [20, 25, 30, 35, 40], limit: "元素スキルか元素爆発が命中した時", times: 6 },
        ],
    },
    Frostbearer: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: WeaponSub4.atk_buf,
        // 通常攻撃と重撃が敵に命中した時、60%の確率で敵の上に恒氷晶核が作られ落下し、攻撃力の80%の範囲ダメージを与える。
        // 敵が氷元素の影響を受けている場合、攻撃力の200%のダメージを受ける。この効果は10秒毎に1回のみ発動可能。
        // passive: null
    },
    AmberCatalyst: {
        star: 3,
        atk: WeaponAtk3[40],
        second: konst.StatusBonusType.Elem,
        secval: [20, 36, 53, 61, 69, 77, 85, 94],
        // 蒸発、感電、凍結または水元素拡散反応を起こした後12秒間、攻撃力+20~40%。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40], limit: "蒸発、感電、凍結、または水元素拡散反応後", times: 12 },
    },
    MagicGuide: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.StatusBonusType.Elem,
        secval: [41, 72, 105, 122, 138, 154, 171, 187],
        // 水元素又は雷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "水、雷元素の影響を受けた敵" },
    },
    TalesDragonSlayers: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.HpBuf,
        secval: WeaponSub3.hp_buf,
        // キャラを切り替えると、次に登場するキャラの攻撃力+24~48%、継続時間10秒。20秒に1回のみ発動可能。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [24, 30, 36, 42, 48], limit: "次に登場するキャラ", times: 10, target: konst.BonusTarget.Next },
    },
    OtherworldlyStory: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.EnRec,
        secval: [8.5, 15.0, 21.9, 25.3, 28.8, 32.2, 35.6, 39.0],
        // 元素オーブまたは元素粒子を獲得した時、HPを1%回復する
        // passive: null,
    },
    TwinNephrite: {
        star: 3,
        atk: WeaponAtk3[40],
        second: konst.CriticalBonusType.Rate,
        secval: [3.4, 6.0, 8.8, 10.1, 11.5, 12.9, 14.2, 15.6],
        // 敵を倒した後15秒間、移動速度と攻撃力+12~20%。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 14, 16, 18, 20], limit: "敵を倒した後", times: 15 },
    },
} as const;

export const WeaponNames: ReadonlyRecord<konst.WeaponType, ReadonlyArray<string>> = {
    sword: SwordNames,
    claymore: ClaymoreNames,
    polearm: PolearmNames,
    bow: BowNames,
    catalyst: CatalystNames
};

export type WeaponList = { readonly [key: string]: IWeaponInfo; };
export const WeaponList: ReadonlyRecord<konst.WeaponType, WeaponList> = {
    sword: SwordList,
    claymore: ClaymoreList,
    polearm: PolearmList,
    bow: BowList,
    catalyst: CatalystList
} as const;

export interface IWeaponData extends IIdentify, INameable, ICommentable {
    rank: number;
    level: string;
    atk: number;
    second: BonusValue;
}
export type GlobalWeaponData = Record<konst.WeaponType, IWeaponData[]>;
