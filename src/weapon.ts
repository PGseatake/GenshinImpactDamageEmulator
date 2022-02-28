import * as konst from "~/src/const";
import {
    IIdentify, INameable, ICommentable, IWeaponInfo,
    BonusValue, WeaponBonus, AnyWeaponBonus,
} from "~/src/interface";
import * as ascension from "~/src/ascension";
import { SettingWeapon } from "~/src/setting";

const WeaponAtk3: IReadonlyHash<ReadonlyArray<number>> = {
    //    1,  20, 20+,  40, 40+,  50, 50+,  60, 60+,  70, 70+,  80, 80+,  90
    38: [38, 86, 105, 151, 171, 193, 212, 234, 253, 274, 294, 314, 334, 354], // OK
    39: [39, 94, 113, 169, 189, 216, 236, 263, 282, 309, 329, 355, 375, 401], // OK
    40: [40, 102, 121, 187, 207, 239, 259, 292, 311, 344, 363, 396, 415, 448], // OK
} as const;

const WeaponAtk4: IReadonlyHash<ReadonlyArray<number>> = {
    //    1,  20, 20+,  40, 40+,  50, 50+,  60, 60+,  70, 70+,  80, 80+,  90
    39: [39, 94, 120, 176, 202, 229, 255, 282, 308, 335, 361, 388, 414, 440], // OK
    41: [41, 99, 125, 184, 210, 238, 264, 293, 319, 347, 373, 401, 427, 454], // OK
    42: [42, 109, 135, 205, 231, 266, 292, 327, 353, 388, 414, 449, 475, 510], // OK
    44: [44, 119, 144, 226, 252, 293, 319, 361, 387, 429, 455, 497, 523, 565], // OK
    45: [45, 128, 154, 247, 273, 321, 347, 395, 421, 470, 496, 545, 571, 620], // OK
} as const;

const WeaponAtk5: IReadonlyHash<ReadonlyArray<number>> = {
    //    1,  20, 20+,  40, 40+,  50, 50+,  60, 60+,  70, 70+,  80, 80+,  90
    41: [41, 99, 125, 184, 210, 238, 264, 293, 319, 347, 373, 401, 427, 454], // OK
    42: [42, 109, 135, 205, 231, 266, 292, 327, 353, 388, 414, 449, 475, 510], // OK
    44: [44, 110, 141, 210, 241, 275, 307, 341, 373, 408, 439, 475, 506, 542], // OK
    46: [46, 122, 153, 235, 266, 308, 340, 382, 414, 457, 488, 532, 563, 608], // OK
    48: [48, 133, 164, 261, 292, 341, 373, 423, 455, 506, 537, 590, 621, 674], // OK
    49: [49, 145, 176, 286, 317, 374, 406, 464, 495, 555, 586, 648, 679, 741], // OK
} as const;

const SwordNames = [
    "Mistsplitter",
    "SkywardBlade",
    "FreedomSworn",
    "PrimordialJadeCutter",
    "SummitShaper",
    "AquilaFavonia",
    "AmenomaKageuchi",
    "FesteringDesire",
    "SwordDescension",
    "AlleyFlash",
    "FavoniusSword",
    "BlackSword",
    "BlackcliffLongsword",
    "TheFlute",
    "SacrificialSword",
    "RoyalLongsword",
    "PrototypeRancour",
    "LionsRoar",
    "IronSting",
    "CinnabarSpindle",
    "FilletBlade",
    "TravelersSword",
    "HarbingerDawn",
    "DarkIronSword",
    "CoolSteel",
    "SkyriderSword"
] as const;

const SwordList: ReadonlyRecord<typeof SwordNames[number], IWeaponInfo> = {
    Mistsplitter: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.CriticalBonusType.Damage,
        secval: [9.6, 17.0, 24.7, 28.6, 32.5, 36.4, 40.2, 44.1],
        passive: [
            // 全元素ダメージ+12~24%
            { items: konst.AnyBonusType.Element, value: [12, 15, 18, 21, 24] },
            // 霧切の巴紋を1/2/3層有する時、自身元素タイプの元素ダメージ+8~16/16~32/28~56%。
            // 霧切の巴紋は次の各状況において獲得できる。通常攻撃で元素ダメージを与えた時、継続時間5秒の霧切の巴紋を1層獲得する。
            // 元素爆発を発動した時、継続時間10秒の霧切の巴紋を1層獲得する。
            // また、キャラクターの元素エネルギーが100％未満の場合、霧切の巴紋を1層獲得する
            { items: konst.AnyBonusType.Element, value: [28, 35, 42, 49, 56], limit: "weapon.layer3", times: 5 },
            // TODO: { items: konst.ElementBonusType.Self, value: [28, 35, 42, 49, 56], limit: "weapon.layer3", times: 5 },
        ],
    },
    SkywardBlade: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.EnRec,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        // 会心率+4~8%
        passive: { items: konst.CriticalBonusType.Rate, value: [4, 5, 6, 7, 8] },
        // 元素爆発を使用すると衝天の勢いを獲得する:移動速度+10%、攻撃速度+10%、
        // 通常攻撃と重撃が命中する際に、攻撃力の20~40%の追加ダメージを与える、継続時間12秒。
    },
    FreedomSworn: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.Elem,
        secval: [43, 76, 111, 129, 146, 164, 181, 198],
        passive: [
            // 与えるダメージ+10~20%。
            { items: konst.AnyBonusType.Damage, value: [10, 12.5, 15, 17.5, 20] },
            // 元素反応を起こすと、奮起の欠片を1枚獲得する。この効果は0.5秒毎に1回のみ発動でき、待機中のキャラクターも発動できる。
            // 奮起の欠片を2枚集めると、全ての奮起の欠片を消費し、周囲のチーム全員に12秒間継続する「千年の大楽章・抗争の歌」効果を付与する:
            // 通常、重撃、落下攻撃のダメージ+16%~32、攻撃力+20~40%。
            {
                items: konst.CombatBonusType.Combat,
                value: [16, 20, 24, 28, 32],
                limit: "weapon.react_x2",
                times: 12,
                target: konst.BonusTarget.All,
            },
            {
                items: konst.StatusBonusType.AtkBuf,
                value: [20, 25, 30, 35, 40],
                limit: "weapon.react_x2",
                times: 12,
                target: konst.BonusTarget.All,
            },
        ],
    },
    PrimordialJadeCutter: {
        star: 5,
        atk: WeaponAtk5[44],
        second: konst.CriticalBonusType.Rate,
        secval: [9.6, 17.0, 24.7, 28.6, 32.5, 36.4, 40.2, 44.1],
        passive: [
            // HP上限+20~40%。
            { items: konst.StatusBonusType.HpBuf, value: [20, 25, 30, 35, 40] },
            // また、キャラクターのHP上限の1.2~2.4%分、攻撃力がアップする。
            {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Atk,
                base: konst.FlatBonusBase.Hp,
                value: [1.2, 1.5, 1.8, 2.1, 2.4],
            },
        ]
    },
    SummitShaper: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: [10.8, 19.1, 27.8, 32.2, 36.5, 40.9, 45.3, 49.6],
        passive: [
            // シールド強化20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "general.attack", stack: 5, times: 8 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "weapon.more_shield", stack: 5, times: 8 },
        ]
    },
    AquilaFavonia: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.ElementBonusType.Phys,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // 攻撃力+20~40%
        passive: { items: konst.StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40] },
        // ダメージを受けると発動:抗争の旗を高く掲げる西風の鷹の魂が蘇り、攻撃力の100~160%分のHPを回復し、
        // 周りの敵に攻撃力の200~320%のダメージを与える。15秒ごとに1回発動可能。
    },
    AmenomaKageuchi: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.AtkBuf,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        // 元素スキルを発動した後、継続時間30秒の継承の印を1つ獲得する。
        // この効果は5秒毎に1回のみ発動可能で、元素爆発を発動すると、所持している継承の印を全て消費し、
        // 消費した継承の印1つにつき、2秒後に該当キャラクターの元素エネルギーを6ポイント回復する。
        // passive: {},
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
    SwordDescension: {
        star: 4,
        atk: WeaponAtk4[39],
        second: konst.StatusBonusType.AtkBuf,
        secval: [7.7, 13.5, 19.7, 22.8, 25.9, 29.0, 32.1, 35.2],
        // 通常攻撃と重撃が命中時、50%の確率で攻撃力の200%の狭範囲ダメージを与える。10秒毎に1回のみ発動可能。
        // 旅人が降臨の剣を装備するとさらに攻撃力+66。
        passive: { items: konst.StatusBonusType.Atk, value: [66, 66, 66, 66, 66], limit: "weapon.traveler" },
    },
    AlleyFlash: {
        star: 4,
        atk: WeaponAtk4[45],
        second: konst.StatusBonusType.Elem,
        secval: [12, 21, 31, 36, 41, 45, 50, 55],
        // キャラクターが与えるダメージ+12~24%。ダメージを受けると、このダメージアップ効果は5秒間無効になる。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24] },
    },
    FavoniusSword: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.EnRec,
        secval: [13.3, 23.6, 34.3, 39.7, 45.1, 50.5, 55.9, 61.3],
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    BlackSword: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Rate,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 通常攻撃と重撃ダメージ+20~40%
        passive: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: [20, 25, 30, 35, 40] },
        // さらに通常攻撃と重撃が会心時、攻撃力の60~100%分のHPを回復する。5秒に1回のみ発動可能。
    },
    BlackcliffLongsword: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.CriticalBonusType.Damage,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "general.defeat", stack: 3, times: 30 },
    },
    TheFlute: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // 通常攻撃または重撃が命中すると、100%の確率で和音を1個獲得する。
        // 和音を5個集めると、音律の力を放ち、周囲の敵に攻撃力の100~200%のダメージを与える。和音は最大30秒存在し、0.5秒毎に最大1個獲得可能。
        // passive: null,
    },
    SacrificialSword: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.EnRec,
        secval: [13.3, 23.6, 34.3, 39.7, 45.1, 50.5, 55.9, 61.3],
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~16秒毎に1回のみ発動する。
        // passive: null,
    },
    RoyalLongsword: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "general.damage", stack: 5 },
    },
    PrototypeRancour: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.ElementBonusType.Phys,
        secval: [7.5, 13.3, 19.3, 22.4, 25.4, 28.4, 31.5, 34.5],
        // 通常攻撃または重撃が命中すると、攻撃力と防御力+4~8%、継続時間6秒、最大4重まで。0.3秒ごとに1回発動可能。
        passive: {
            items: [konst.StatusBonusType.AtkBuf, konst.StatusBonusType.DefBuf],
            value: [4, 5, 6, 7, 8],
            limit: "general.normal_heavy",
            stack: 4,
            times: 6,
        },
    },
    LionsRoar: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // 炎元素又は雷元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: konst.AnyBonusType.Damage, value: [20, 24, 28, 32, 36], limit: "elem.pyro_elect" },
    },
    IronSting: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.Elem,
        secval: [36, 64, 93, 107, 122, 136, 151, 165],
        // 元素ダメージを与えた6秒間、キャラの与えるダメージ+6~12%、最大2重まで、1秒毎に1回のみ発動する。
        passive: { items: konst.AnyBonusType.Damage, value: [6, 7.5, 9, 10.5, 12], limit: "elem.damage", stack: 2, times: 6 },
    },
    CinnabarSpindle: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.DefBuf,
        secval: [15.0, 26.5, 38.7, 44.7, 50.8, 56.8, 62.9, 69],
        // 元素スキルダメージが防御力の40％分アップする。
        // この効果は1.5秒毎に1回のみ発動可能で、元素スキルがダメージを与えた0.1秒後にクリアされる。
        passive: { items: konst.StatusBonusType.DefBuf, value: [40, 50, 60, 70, 80], limit: "skill.hit", times: 0.1 },
    },
    FilletBlade: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.AtkBuf,
        secval: [7.7, 13.5, 19.7, 22.8, 25.9, 29.0, 32.1, 35.2],
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
        secval: [10.2, 18.0, 26.3, 30.4, 34.5, 38.6, 42.7, 46.9],
        // HPが90%以上の場合、会心率+14~28%。
        passive: { items: konst.CriticalBonusType.Rate, value: [14, 17.5, 21, 24.5, 28], limit: "hp.ge90" },
    },
    DarkIronSword: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.Elem,
        secval: [31, 54, 79, 91, 104, 116, 128, 141],
        // 過負荷、超電導、感電、または雷元素拡散反応が発生した12秒間、基礎攻撃力+20~40%。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40], limit: "elem.react_elect", times: 12 },
    },
    CoolSteel: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.AtkBuf,
        secval: [7.7, 13.5, 19.7, 22.8, 25.9, 29.0, 32.1, 35.2],
        // 水元素又は氷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "elem.hydro_cryo" },
    },
    SkyriderSword: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.StatusBonusType.EnRec,
        secval: [11.3, 20.0, 29.2, 33.8, 38.3, 42.9, 47.5, 52.1],
        // 元素爆発を発動した後、攻撃力と移動速度+12~24%、継続時間15秒。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "burst.use", times: 15 },
    },
} as const;

const ClaymoreNames = [
    "WolfsGravestone",
    "SkywardPride",
    "SongBrokenPines",
    "TheUnforged",
    "KatsuragikiriNagamasa",
    "RedhornStonethresher",
    "LuxuriousSeaLord",
    "BlackcliffSlasher",
    "SnowTombedStarsilver",
    "SacrificialGreatsword",
    "LithicBlade",
    "SerpentSpine",
    "Akuoumaru",
    "Whiteblind",
    "TheBell",
    "RoyalGreatsword",
    "Rainslasher",
    "PrototypeAminus",
    "FavoniusGreatsword",
    "WhiteGreatsword",
    "DebateClub",
    "SkyriderGreatsword",
    "FerrousShadow",
    "BloodtaintedGreatsword",
] as const;

const ClaymoreList: ReadonlyRecord<typeof ClaymoreNames[number], IWeaponInfo> = {
    WolfsGravestone: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: [10.8, 19.1, 27.8, 32.2, 36.5, 40.9, 45.3, 49.6],
        passive: [
            // 攻撃力+20~40%
            { items: konst.StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40] },
            // HPが30%以下の敵に命中すると、チーム全員の攻撃力+40~80%、継続時間12秒。30秒に1回のみ発動可能。
            {
                items: konst.StatusBonusType.AtkBuf,
                value: [40, 50, 60, 70, 80],
                limit: "weapon.hit_hpge30",
                times: 12,
                target: konst.BonusTarget.All,
            },
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
    SongBrokenPines: {
        star: 5,
        atk: WeaponAtk5[49],
        second: konst.ElementBonusType.Phys,
        secval: [4.5, 8.0, 11.6, 13.4, 15.2, 17.0, 18.9, 20.7],
        passive: [
            // 攻撃力+16%。
            { items: konst.StatusBonusType.AtkBuf, value: [16, 20, 24, 28, 32] },
            // 通常攻撃または重撃が敵に命中すると、囁きの欠片を1枚獲得する。この効果は0.3秒毎に1回のみ発動できる。
            // 囁きの欠片を4枚集めると、全ての囁きの欠片を消費し、周囲チーム全員に12秒間継続する「千年の大楽章・旗掲げの歌」効果を付与する:
            // 通常攻撃速度 +12~24%、攻撃力+20~40%。
            {
                items: konst.StatusBonusType.AtkBuf,
                value: [20, 25, 30, 35, 40],
                limit: "weapon.normal_heavy_x4",
                times: 12,
                target: konst.BonusTarget.All,
            },
        ],
    },
    TheUnforged: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: [10.8, 19.1, 27.8, 32.2, 36.5, 40.9, 45.3, 49.6],
        passive: [
            // シールド強化20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "general.attack", stack: 5, times: 8 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "weapon.more_shield", stack: 5, times: 8 },
        ],
    },
    KatsuragikiriNagamasa: {
        star: 5,
        atk: WeaponAtk5[42],
        second: konst.StatusBonusType.EnRec,
        secval: [10.0, 17.7, 25.8, 29.8, 33.8, 37.9, 41.9, 45.9],
        // 元素スキルのダメージ+6%。
        // 元素スキルが命中した時、キャラクターは元素エネルギーを3ポイント失う。
        // その後の6秒間、2秒毎に元素エネルギーを3ポイント獲得する。この効果は10秒毎に1回のみ発動でき、待機中のキャラクターも発動できる。
        passive: { items: konst.CombatBonusType.Skill, value: [6.0, 7.5, 9.0, 10.5, 12.0] },
    },
    RedhornStonethresher: {
        star: 5,
        atk: WeaponAtk5[44],
        second: konst.StatusBonusType.CriDmg,
        secval: [19.2, 34.0, 49.4, 57.2, 65.0, 72.6, 80.4, 88.2],
        passive: [
            // 防御力+28~56%
            { items: konst.StatusBonusType.DefBuf, value: [28, 35, 42, 49, 56] },
            // 通常攻撃と重撃ダメージが防御力40~80%分アップする。
            {
                extra: konst.ExtraBonusType.Flat,
                dest: [konst.FlatBonusDest.Normal, konst.FlatBonusDest.Heavy],
                base: konst.FlatBonusBase.Def,
                value: [40, 50, 60, 70, 80],
            },
        ],
    },
    LuxuriousSeaLord: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.AtkBuf,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        // 元素爆発ダメージ+12％。
        // 元素爆発が敵に命中すると、100％の確率でマグロを召喚し、衝撃を与え、攻撃力100％分の範囲ダメージを与える。この効果は15秒間に1回のみ発動可能。
        passive: { items: konst.CombatBonusType.Burst, value: [12, 15, 18, 21, 24] },
    },
    BlackcliffSlasher: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Damage,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "general.defeat", stack: 3, times: 30 },
    },
    SnowTombedStarsilver: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.ElementBonusType.Phys,
        secval: [7.5, 13.3, 19.3, 22.4, 25.4, 28.4, 31.5, 34.5],
        // 通常攻撃と重撃が敵に命中した時、60%の確率で敵の上に恒氷晶核が作られ落下し、攻撃力の80%の範囲ダメージを与える。
        // 敵が氷元素の影響を受けている場合、攻撃力の200%のダメージを受ける。この効果は10秒毎に1回のみ発動可能。
        // passive: null
    },
    SacrificialGreatsword: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~16秒毎に1回のみ発動する。
        // passive: null,
    },
    LithicBlade: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // チームに璃月出身のキャラクターが1人いる毎に、この武器を装備したキャラクターの攻撃力＋7~11%、会心率＋3~7%。最大4重まで。
        passive: [
            { items: konst.StatusBonusType.AtkBuf, value: [7, 8, 9, 10, 11], limit: "weapon.per_liyue", stack: 4 },
            { items: konst.CriticalBonusType.Rate, value: [3, 4, 5, 6, 7], limit: "weapon.per_liyue", stack: 4 },
        ],
    },
    SerpentSpine: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Rate,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // フィールドにいる時、4秒毎に、与えるダメージ+6~10%、被ダメージ+3~2%。最大5重まで、退場後もリセットされず、攻撃を受けると効果数-1。
        passive: { items: konst.AnyBonusType.Damage, value: [6, 7, 8, 9, 10], limit: "weapon.per_4sec_entry", stack: 5 },
    },
    Akuoumaru: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // チーム全員の元素エネルギー上限の合計を基に、元素爆発ダメージをアップさせる。
        // 1ポイン卜につき、装備したキャラクターの元素爆発ダメージ+0.12~0.24%。
        // この方式アップできる元素爆発ダメージは最大40~80%まで。
        passive: {
            extra: konst.ExtraBonusType.Energy,
            dest: konst.CombatBonusType.Burst,
            value: [0.12, 0.15, 0.18, 0.21, 0.24],
            bound: [40, 50, 60, 70, 80],
            limit: "general.energy_all",
        },
    },
    Whiteblind: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.DefBuf,
        secval: [11.3, 19.9, 29.0, 33.5, 38.1, 42.6, 47.2, 51.7],
        // 通常攻撃か重撃が命中すると、攻撃力と防御力+6~12%。継続時間6秒、最大4重まで。0.5秒毎に1回のみ発動可能。
        passive: {
            items: [konst.StatusBonusType.AtkBuf, konst.StatusBonusType.DefBuf],
            value: [6, 7.5, 9, 10.5, 12],
            limit: "general.normal_heavy",
            stack: 4,
            times: 6,
        },
    },
    TheBell: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.HpBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // ダメージを受けた時、HP上限の20~32%に相当するダメージを吸収できるシールドを生成する。継続時間は最大10秒まで。45秒毎に1回のみ発動する。
        // シールドが存在する時、キャラクターの与えるダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "general.shield" },
    },
    RoyalGreatsword: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 攻撃が敵にダメージを与えた時、会心率+8%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "general.damage", stack: 5 },
    },
    Rainslasher: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.Elem,
        secval: [36, 64, 93, 107, 122, 136, 151, 165],
        // 水元素又は雷元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: konst.AnyBonusType.Damage, value: [20, 24, 28, 32, 36], limit: "elem.hydro_elect" },
    },
    PrototypeAminus: { // PrototypeArchaic
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 通常攻撃と重撃が命中する度、50%の確率で狭範囲の敵に攻撃力の240~480%の追加ダメージを与える。15秒毎に1回のみ発動可能。
        // passive: null,
    },
    FavoniusGreatsword: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.EnRec,
        secval: [13.3, 23.6, 34.3, 39.7, 45.1, 50.5, 55.9, 61.3],
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    WhiteGreatsword: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.DefBuf,
        secval: [9.6, 16.9, 24.6, 28.5, 32.3, 36.2, 40.1, 43.9],
        // 敵を倒した時、HPを8~16%回復する。
        // passive: null,
    },
    DebateClub: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.AtkBuf,
        secval: [7.7, 13.5, 19.7, 22.8, 25.9, 29.0, 32.1, 35.2],
        // 元素スキルを発動した後、通常攻撃と重撃が命中する際に、狭範囲で攻撃力の60~120%のダメージを与える。
        // passive: null,
    },
    SkyriderGreatsword: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.ElementBonusType.Phys,
        secval: [9.6, 16.9, 24.6, 28.5, 32.3, 36.2, 40.1, 43.9],
        // 通常攻撃と重撃が命中すると、攻撃力+6~10%、継続時間6秒、最大4重まで。0.5秒毎に1回のみ発動可能。
        passive: {
            items: konst.StatusBonusType.AtkBuf,
            value: [6, 7, 8, 9, 10],
            limit: "general.normal_heavy",
            stack: 4,
            times: 6,
        },
    },
    FerrousShadow: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.HpBuf,
        secval: [7.7, 13.5, 19.7, 22.8, 25.9, 29.0, 32.1, 35.2],
        // HPが70~90%以下になると、重撃は中断されにくくなり、さらに重撃ダメージ+30~50%。
        passive: { items: konst.CombatBonusType.Heavy, value: [30, 35, 40, 45, 50], limit: "hp.leXX" },
    },
    BloodtaintedGreatsword: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.StatusBonusType.Elem,
        secval: [41, 72, 105, 122, 138, 154, 171, 187],
        // 炎元素又は雷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "elem.pyro_elect" },
    },
} as const;

const PolearmNames = [
    "SkywardSpine",
    "EngulfingLightning",
    "PrimordialSpear",
    "StaffHoma",
    "VortexVanquisher",
    "CalamityQueller",
    "CrescentPike",
    "TheCatch",
    "PrototypeGrudge",
    "KitainCrossSpear",
    "DragonspineSpear",
    "WavebreakersFin",
    "RoyalSpear",
    "FavoniusLance",
    "LithicSpear",
    "Deathmatch",
    "DragonsBane",
    "BlackcliffPole",
    "Halberd",
    "WhiteTassel",
    "BlackTassel",
] as const;

const PolearmList: ReadonlyRecord<typeof PolearmNames[number], IWeaponInfo> = {
    SkywardSpine: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.StatusBonusType.EnRec,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 会心率+8~16%、通常攻撃速度+12%。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16] },
        // 通常攻撃と重撃が命中時、50%の確率で真空刃を発動し、攻撃力の40~100%の狭範囲ダメージを与える。2秒毎に1回のみ発動可能。
    },
    EngulfingLightning: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.EnRec,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        passive: [
            // 元素チャージ効率が100%を超えている場合、その超えた部分の28%分、攻撃力がアップする。この方式でアップできる攻撃力は最大80%まで。
            // TODO: {
            //     extra: konst.ExtraBonusType.Flat,
            //     dest: konst.FlatBonusDest.AtkBuf,
            //     base: konst.FlatBonusBase.EnRec, // 100%超え分
            //     value: 28,
            //     bound: { value: 80 },
            // },
            // 元素爆発を発動した後の12秒間、元素チャージ効率+30~50%。
            { items: konst.StatusBonusType.EnRec, value: [30, 35, 40, 45, 50], limit: "burst.use", times: 12 },
        ],
    },
    PrimordialSpear: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.CriticalBonusType.Rate,
        secval: [4.8, 8.5, 12.4, 14.3, 16.2, 18.2, 20.1, 22.1],
        passive: [
            // 敵に命中した時、自身の攻撃力+3.2~6%、継続時間6秒、最大7重まで。0.3秒に最大1回発動でき、7重まで発動すると与ダメージ+12~24%。
            { items: konst.StatusBonusType.AtkBuf, value: [3.2, 3.9, 4.6, 5.3, 6.0], limit: "general.attack", stack: 7, times: 6 },
            { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "weapon.more_x7" },
        ],
    },
    StaffHoma: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.CriticalBonusType.Damage,
        secval: [14.4, 25.4, 37.1, 42.9, 48.7, 54.5, 60.3, 66.2],
        passive: [
            // HP上限+20~40%。
            { items: konst.StatusBonusType.HpBuf, value: [20, 25, 30, 35, 40] },
            // また、キャラクターのHP上限の0.8~1.6%分、攻撃力がアップする。
            {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Atk,
                base: konst.FlatBonusBase.Hp,
                value: [0.8, 1.0, 1.2, 1.4, 1.6],
            },
            // キャラクターのHPが50%未満の時、攻撃力が更にHP上限の1.0~1.8%分アップする。
            {
                extra: konst.ExtraBonusType.Flat,
                dest: konst.FlatBonusDest.Atk,
                base: konst.FlatBonusBase.Hp,
                value: [1.0, 1.2, 1.4, 1.6, 1.8],
                limit: "hp.lt50",
            },
        ],
    },
    VortexVanquisher: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: [10.8, 19.1, 27.8, 32.2, 36.5, 40.9, 45.3, 49.6],
        passive: [
            // シールド強化+20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "general.attack", stack: 5, times: 8 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "weapon.more_shield", stack: 5, times: 8 },
        ]
    },
    CalamityQueller: {
        star: 5,
        atk: WeaponAtk5[49],
        second: konst.StatusBonusType.AtkBuf,
        secval: [3.6, 6.4, 7.8, 10.7, 12.2, 13.6, 15.1, 16.5],
        passive: [
            // 全元素ダメージ+12~24%。
            { items: konst.AnyBonusType.Element, value: [12, 15, 18, 21, 24] },
            // 元素スキルを発動すると、継続時間20秒の「円頓」を獲得し、1秒毎に攻撃力が3.2~6.4%アップする。この効果は最大6回まで重ね掛け可能。
            {
                items: konst.StatusBonusType.AtkBuf,
                value: [3.2, 4.0, 4.8, 5.6, 6.4],
                limit: "weapon.per_1sec_skill",
                stack: 6,
                times: 20,
                target: konst.BonusTarget.All,
            },
            // この武器を装備したキャラクターが待機中の場合、「円頓」による攻撃力アップ効果は2倍になる。
            {
                items: konst.StatusBonusType.AtkBuf,
                value: [3.2, 4.0, 4.8, 5.6, 6.4],
                limit: "weapon.more_per_1sec_skill",
                stack: 6,
                times: 20,
                target: konst.BonusTarget.Other,
            },
        ]
    },
    CrescentPike: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.ElementBonusType.Phys,
        secval: [7.5, 13.3, 19.3, 22.4, 25.4, 28.4, 31.5, 34.5],
        // 元素粒子又は元素オーブを獲得した5秒間、通常攻撃と重撃で、攻撃力の20~40%の追加ダメージを与える。
        // passive: null,
    },
    TheCatch: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.EnRec,
        secval: [10.0, 17.7, 25.8, 29.8, 33.8, 37.9, 41.9, 45.9],
        passive: [
            // 元素爆発ダメージ+16%、元素爆発の会心率+6%
            { items: konst.CombatBonusType.Burst, value: [16, 20, 24, 28, 32] },
        ],
    },
    PrototypeGrudge: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.EnRec,
        secval: [10.0, 17.7, 25.8, 29.8, 33.8, 37.9, 41.9, 45.9],
        // 元素スキルを発動した後、通常攻撃と重撃ダメージ+8~16%、継続時間12秒、最大2重まで。
        passive: {
            items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy],
            value: [8, 10, 12, 14, 16],
            limit: "skill.use",
            stack: 2,
            times: 12,
        },
    },
    KitainCrossSpear: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.Elem,
        secval: [24, 42, 62, 71, 81, 91, 101, 110],
        // 元素スキルのダメージ+6%。元素スキルが命中した時、キャラクターは元素エネルギーを3ポイント失う。
        // その後の6秒間、2秒毎に元素エネルギーを3ポイント獲得する。この効果は10秒毎に1回のみ発動でき、待機中のキャラクターも発動できる。
        passive: { items: konst.CombatBonusType.Skill, value: [6, 7.5, 9, 10.5, 12] },
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
    WavebreakersFin: {
        star: 4,
        atk: WeaponAtk4[45],
        second: konst.StatusBonusType.AtkBuf,
        secval: [3.0, 5.3, 7.7, 8.9, 10.1, 11.4, 12.6, 13.8],
        // チーム全員の元素エネルギー上限の合計を基に、元素爆発ダメージをアップさせる。
        // 1ポイン卜につき、装備したキャラクターの元素爆発ダメージ+0.12~0.24%。
        // この方式アップできる元素爆発ダメージは最大40~80%まで。
        passive: {
            extra: konst.ExtraBonusType.Energy,
            dest: konst.CombatBonusType.Burst,
            value: [0.12, 0.15, 0.18, 0.21, 0.24],
            bound: [40, 50, 60, 70, 80],
            limit: "general.energy_all",
        },
    },
    RoyalSpear: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "general.damage", stack: 5 },
    },
    FavoniusLance: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    LithicSpear: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // チームに璃月出身のキャラクターが1人いる毎に、この武器を装備したキャラクターの攻撃力＋7~11%、会心率＋3~7%。最大4重まで。
        passive: [
            { items: konst.StatusBonusType.AtkBuf, value: [7, 8, 9, 10, 11], limit: "weapon.per_liyue", stack: 4 },
            { items: konst.CriticalBonusType.Rate, value: [3, 4, 5, 6, 7], limit: "weapon.per_liyue", stack: 4 },
        ],
    },
    Deathmatch: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.CriticalBonusType.Rate,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        passive: [
            // 近くに敵が2人以上いる時、攻撃力+16~32%、防御力+16~32%。
            { items: [konst.StatusBonusType.AtkBuf, konst.StatusBonusType.DefBuf], value: [16, 20, 24, 28, 32], limit: "weapon.near_enemy_ge2" },
            // 近くにいる敵が2人未満の時、攻撃力24~48%。
            { items: konst.StatusBonusType.AtkBuf, value: [24, 30, 36, 42, 48], limit: "weapon.near_enemy_lt2" },
        ],
    },
    DragonsBane: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.Elem,
        secval: [48, 85, 124, 143, 162, 182, 201, 221],
        // 水元素又は炎元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: konst.AnyBonusType.Damage, value: [20, 24, 28, 32, 36], limit: "elem.hydro_pyro" },
    },
    BlackcliffPole: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Damage,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "general.defeat", stack: 3, times: 30 },
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
    BlackTassel: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.StatusBonusType.HpBuf,
        secval: [10.2, 18.0, 26.3, 30.4, 34.6, 38.7, 42.8, 46.9],
        // スライムタイプの敵に与えるダメージ+40~80%。
        passive: { items: konst.AnyBonusType.Damage, value: [40, 50, 60, 70, 80], limit: "weapon.slime" },
    },
} as const;

const BowNames = [
    "PolarStar",
    "ThunderingPulse",
    "AmosBow",
    "ElegyForTheEnd",
    "SkywardHarp",
    "CompoundBow",
    "ViridescentHunt",
    "Predator",
    "PrototypeCrescent",
    "Hamayumi",
    "MouunsMoon",
    "MitternachtsWaltz",
    "WindblumeOde",
    "AlleyHunter",
    "BlackcliffWarbow",
    "FavoniusWarbow",
    "SacrificialBow",
    "Stringless",
    "Rust",
    "RoyalBow",
    "Messenger",
    "Slingshot",
    "SharpshootersOath",
    "RavenBow",
    "RecurveBow",
] as const;

const BowList: ReadonlyRecord<typeof BowNames[number], IWeaponInfo> = {
    PolarStar: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.CriticalBonusType.Rate,
        secval: [7.2, 12.7, 18.5, 21.4, 24.4, 27.3, 30.2, 33.1],
        passive: [
            // 元素スキルと元素爆発が与えるダメージ+12%。
            { items: [konst.CombatBonusType.Skill, konst.CombatBonusType.Burst], value: [12, 15, 18, 21, 24] },
            // 通常攻撃、重撃、元素スキル、元素爆発が敵に命中すると、それぞれ継続時間12秒の「白夜極星」効果を1層獲得する。
            // 「白夜極星」を1/2/3/4層有する時、キャラクターの攻撃力+10~20/20~40/30~60/48~96%。
            // 各攻撃によって獲得する「白夜極星」の継続時間は、層ごとに独立する。
            // TODO: 層
            { items: konst.StatusBonusType.AtkBuf, value: [48, 60, 72, 84, 96], limit: "weapon.layer4", times: 12 },
        ],
    },
    ThunderingPulse: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.CriticalBonusType.Damage,
        secval: [14.4, 25.4, 37.1, 42.9, 48.7, 54.5, 60.3, 66.2],
        passive: [
            // 攻撃力+20%、「飛雷の巴紋」の効果を獲得できる。
            { items: konst.StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40] },
            // 飛雷の巴紋を1/2/3層有する時、通常攻撃のダメージ+12~24/24~48/40~80%。飛雷の巴紋は次の各状況において獲得できる。
            // 通常攻撃でダメージを与えた時、継続時間5秒の飛雷の巴紋を1層獲得する。元素スキルを発動した時、継続時間10秒の飛雷の巴紋を1層獲得する。また、キャラクターの元素
            // エネルギーが100％未満の場合、飛雷の巴紋を1層獲得する、この飛雷の巴紋は元素エネルギーが満タンになると消失する。飛雷の巴紋の継続時間は層ごとに独立している。
            // TODO: 層
            { items: konst.CombatBonusType.Normal, value: [40, 50, 60, 70, 80], limit: "weapon.layer3", times: 10 },
        ],
    },
    AmosBow: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: [10.8, 19.1, 27.8, 32.2, 36.5, 40.9, 45.3, 49.6],
        passive: [
            // 通常攻撃と狙い撃ちのダメージ+12~24%。
            { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: [12, 15, 18, 21, 24] },
            // 矢を放った後、0.1秒毎にダメージ+8~16%、最大5回まで上昇する。
            {
                items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy],
                value: [8, 10, 12, 14, 16],
                limit: "weapon.per_01sec_shoot",
                stack: 5,
            },
        ],
    },
    ElegyForTheEnd: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.EnRec,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        passive: [
            // 風と共に流れる｢千年の大楽章｣の一部。元素熟知+60~120。
            { items: konst.StatusBonusType.Elem, value: [60, 75, 90, 105, 120] },
            // 元素スキルまたは元素爆発が敵に命中すると、追憶の欠片を一枚獲得する。この効果は0.2秒毎に一回のみ発動でき、待機中のキャラクターも発動できる。
            // 追憶の欠片を4枚集めると、全ての追憶の欠片を消費し、周囲のチーム全員に12秒継続する｢千年の大楽章・別れの歌｣効果を付与する:元素熟知+100~200、攻撃力+20~40%。
            {
                items: konst.StatusBonusType.Elem,
                value: [100, 125, 150, 175, 200],
                limit: "weapon.skill_burst_x4",
                times: 12,
                target: konst.BonusTarget.All,
            },
            {
                items: konst.StatusBonusType.AtkBuf,
                value: [20, 25, 30, 35, 40],
                limit: "weapon.skill_burst_x4",
                times: 12,
                target: konst.BonusTarget.All,
            },
            // 発動後の20秒間、追憶の欠片を再度獲得することはできない。｢千年の大楽章｣のもたらす各効果中、同種類の効果は重ね掛け不可。
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
    CompoundBow: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.ElementBonusType.Phys,
        secval: [15.0, 26.5, 38.7, 44.7, 50.8, 56.8, 62.9, 69.0],
        // 通常攻撃と狙い撃ち射撃が命中すると、攻撃力+4~8%、通常攻撃速度1.2~2.4%、継続時間6秒、最大4重まで、0.3秒に1回のみ発動可能。
        passive: {
            items: konst.StatusBonusType.AtkBuf,
            value: [4, 5, 6, 7, 8],
            limit: "general.normal_aim",
            stack: 4,
            times: 6,
        },
    },
    ViridescentHunt: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Rate,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 通常攻撃と重撃が命中時、50%の確率で風の目を生成し、近くの敵を吸い寄せる。
        // 0.5秒毎に攻撃力の40~80%のダメージを与える。継続時間4秒、14~10秒毎に1回のみ発動可能。
        // passive: null,
    },
    Predator: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // 敵に氷元素ダメージを与えた後、通常攻撃と重撃ダメージ+10%、継続時間6秒、最大2重まで。
        // また、アーロイがプレデターを装備している場合、攻撃力+66。
        passive: [
            {
                items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy],
                value: [10, 10, 10, 10, 10],
                limit: "elem.damage_cryo",
                stack: 2,
                times: 6,
            },
            { items: konst.StatusBonusType.Atk, value: [66, 66, 66, 66, 66], limit: "weapon.aloy" },
        ],
    },
    PrototypeCrescent: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // 狙い撃ちが弱点に命中すると、移動速度+10%、攻撃力+36~72%、継続時間10秒。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [36, 45, 54, 63, 72], limit: "general.weak_aim", times: 10 },
    },
    Hamayumi: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.AtkBuf,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        passive: [
            // 通常攻撃のダメージ+16~32%、重撃のダメージ+12~24%。
            { items: konst.CombatBonusType.Normal, value: [16, 20, 24, 28, 32] },
            { items: konst.CombatBonusType.Heavy, value: [12, 15, 18, 21, 24] },
            // この武器を装備したキャラクターの元素エネルギーが満タンの場合、該当効果が2倍になる。
            { items: konst.CombatBonusType.Normal, value: [16, 20, 24, 28, 32], limit: "weapon.energy_full" },
            { items: konst.CombatBonusType.Heavy, value: [12, 15, 18, 21, 24], limit: "weapon.energy_full" },
        ],
    },
    MouunsMoon: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // チーム全員の元素エネルギー上限の合計を基に、元素爆発ダメージをアップさせる。
        // 1ポイン卜につき、装備したキャラクターの元素爆発ダメージ+0.12~0.24%。
        // この方式アップできる元素爆発ダメージは最大40~80%まで。
        passive: {
            extra: konst.ExtraBonusType.Energy,
            dest: konst.CombatBonusType.Burst,
            value: [0.12, 0.15, 0.18, 0.21, 0.24],
            bound: [40, 50, 60, 70, 80],
            limit: "general.energy_all",
        },
    },
    MitternachtsWaltz: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.ElementBonusType.Phys,
        secval: [11.3, 19.9, 29.0, 33.5, 38.1, 42.6, 47.2, 51.7],
        passive: [
            // 通常攻撃が敵に命中した後の5秒間、元素スキルのダメージ+20~40%。
            { items: konst.CombatBonusType.Skill, value: [20, 25, 30, 35, 40], limit: "general.normal", times: 5 },
            // 元素スキルが敵に命中した後の5秒間、通常攻撃のダメージ+20~40%。
            { items: konst.CombatBonusType.Normal, value: [20, 25, 30, 35, 40], limit: "skill.hit", times: 5 },
        ],
    },
    WindblumeOde: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.Elem,
        secval: [36, 64, 93, 107, 122, 136, 151, 165],
        // 元素スキルを発動した後、風の花の悠久なる願いの加護を獲得し、攻撃力+16~32%、持続時間6秒。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [16, 20, 24, 28, 32], limit: "skill.use", times: 6 },
    },
    AlleyHunter: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // この武器を装備したキャラクターが待機している時、1秒ごとに自身の与えるダメージ+2%。この方式で獲得できるダメージアップ効果は20%まで。
        // 4秒以上フィールド上にいると、上記ダメージアップ効果は0% になるまで、1秒毎に4%ダウンする。
        passive: { items: konst.AnyBonusType.Damage, value: [2, 2.5, 3, 3.5, 4], limit: "weapon.per_1sec_stay", stack: 10 },
    },
    BlackcliffWarbow: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.CriticalBonusType.Damage,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 敵を倒した後、攻撃力+12~24%、継続時間30秒。最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "general.defeat", stack: 3, times: 30 },
    },
    FavoniusWarbow: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.EnRec,
        secval: [13.3, 23.6, 34.3, 39.7, 45.1, 50.5, 55.9, 61.3],
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
    Stringless: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.Elem,
        secval: [36, 64, 93, 107, 122, 136, 151, 165],
        // 元素スキルと元素爆発のダメージ+24~48%。
        passive: { items: [konst.CombatBonusType.Skill, konst.CombatBonusType.Burst], value: [24, 30, 36, 42, 48] },
    },
    Rust: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // 通常攻撃のダメージ+40~80%、狙い撃ち射撃のダメージ-10%。
        passive: [
            { items: konst.CombatBonusType.Normal, value: [40, 50, 60, 70, 80] },
            { items: konst.CombatBonusType.Heavy, value: [-10, -10, -10, -10, -10] },
        ],
    },
    RoyalBow: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで、攻撃会心発生時、効果をクリアにする。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "general.damage", stack: 5 },
    },
    Messenger: {
        star: 3,
        atk: WeaponAtk3[40],
        second: konst.CriticalBonusType.Damage,
        secval: [6.8, 12.0, 17.5, 20.3, 23.0, 25.7, 28.5, 31.2],
        // 狙い撃ち時、弱点に命中すると、追加で攻撃力の100~200%のダメージを与え、必ず会心ダメージになる。10秒毎に1回のみ発動可能。
        // passive: null,
    },
    Slingshot: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.CriticalBonusType.Rate,
        secval: [6.8, 12.0, 17.5, 20.3, 23.0, 25.7, 28.5, 31.2],
        // 通常攻撃又は狙い撃ちの時、矢が発射後0.3秒内に敵に命中すると、ダメージ+36~60%。0.3秒より長い場合、ダメージ-10%。
        passive: [
            // 通常攻撃又は狙い撃ちの時、矢が発射後0.3秒内に敵に命中すると、ダメージ+36~60%。
            { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: [36, 42, 48, 54, 60], limit: "weapon.shoot_le03sec" },
            // 0.3秒より長い場合、ダメージ-10%。
            { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: [-10, -10, -10, -10, -10], limit: "weapon.shoot_gt03sec" }
        ]
    },
    SharpshootersOath: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.CriticalBonusType.Damage,
        secval: [10.2, 18.0, 26.3, 30.4, 34.5, 38.6, 42.7, 46.9],
        // 弱点に対するダメージ+24~48%。
        passive: { items: konst.AnyBonusType.Damage, value: [24, 30, 36, 42, 48], limit: "weapon.weak" },
    },
    RavenBow: {
        star: 3,
        atk: WeaponAtk3[40],
        second: konst.StatusBonusType.Elem,
        secval: [20, 36, 53, 61, 69, 77, 85, 94],
        // 水元素又は炎元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "elem.hydro_pyro" },
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
    "LostSacredWinds",
    "SkywardAtlas",
    "MemoryDust",
    "EverlastingMoonglow",
    "KaguraVerity",
    "MappaMare",
    "BlackcliffAmulet",
    "RoyalGrimoire",
    "SacrificialFragments",
    "SolarPearl",
    "TheWidsith",
    "HakushinRing",
    "DodocoTales",
    "FavoniusCodex",
    "WineAndSong",
    "PrototypeMalice",
    "Frostbearer",
    "EyePerception",
    "OathswornEye",
    "MagicGuide",
    "OtherworldlyStory",
    "TwinNephrite",
    "TalesDragonSlayers",
    "EmeraldOrb",
] as const;

const CatalystList: ReadonlyRecord<typeof CatalystNames[number], IWeaponInfo> = {
    LostSacredWinds: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.CriticalBonusType.Rate,
        secval: [7.2, 12.7, 18.5, 21.4, 24.4, 27.3, 30.2, 33.1],
        // 移動速度+10%。
        // 出場中は4秒毎に元素ダメージ+8~16%、最大4重まで。キャラが退場または戦闘不能まで有効する。
        passive: { items: konst.AnyBonusType.Element, value: [8, 10, 12, 14, 16], limit: "weapon.per_4sec_entry", stack: 4 },
    },
    SkywardAtlas: {
        star: 5,
        atk: WeaponAtk5[48],
        second: konst.StatusBonusType.AtkBuf,
        secval: [7.2, 12.7, 18.5, 21.4, 24.4, 27.3, 30.2, 33.1],
        // 元素ダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Element, value: [12, 15, 18, 21, 24] },
        // 通常攻撃が命中した時、50%の確率で高天流雲の好意を獲得し、15秒内に自ら周囲の敵を攻撃すると、攻撃力の160~320%相当のダメージを与える。30秒毎に1回のみ発動可能。
    },
    MemoryDust: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.AtkBuf,
        secval: [10.8, 19.1, 27.8, 32.2, 36.5, 40.9, 45.3, 49.6],
        passive: [
            // シールド強化+20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "general.attack", stack: 5, times: 8 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: konst.StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "weapon.more_shield", stack: 5, times: 8 },
        ],
    },
    EverlastingMoonglow: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.StatusBonusType.HpBuf,
        secval: [10.8, 19.1, 27.8, 32.2, 36.5, 40.9, 45.3, 49.6],
        passive: [
            // 与える治療効果+10~20%。
            { items: konst.StatusBonusType.HealBuf, value: [10, 12.5, 15, 17.5, 20] },
            // この武器を装備したキャラクターのHP上限の1~3%分、通常攻撃ダメージがアップする。
            { extra: konst.ExtraBonusType.Flat, dest: konst.FlatBonusDest.Normal, base: konst.FlatBonusBase.Hp, value: [1, 1.5, 2, 2.5, 3] },
            // 元素爆発を発動した後の12秒間、通常攻撃が敵に命中すると元素エネルギーが0.6ポイント回復する。この方式での元素エネルギー回復は、0.1秒毎に1回のみ可能。
        ],
    },
    KaguraVerity: {
        star: 5,
        atk: WeaponAtk5[46],
        second: konst.CriticalBonusType.Damage,
        secval: [14.4, 25.4, 37.1, 42.9, 48.7, 54.5, 60.3, 66.2],
        passive: [
            // 元素スキルを発動すると、「神楽舞」の効果を獲得する。
            // この武器を装備したキャラクターの元素スキルによるダメージ+12~24%、継続時間16秒、最大3層まで。
            { items: konst.CombatBonusType.Skill, value: [12, 15, 18, 21, 24], stack: 3, times: 16 },
            // 3層の効果を持つ時、該当キャラクターの全元素ダメージ+12%。
            { items: konst.AnyBonusType.Element, value: [12, 15, 18, 21, 24], limit: "weapon.more_layer3" },
        ],
    },
    MappaMare: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.Elem,
        secval: [24, 42, 62, 71, 81, 91, 101, 110],
        // 元素反応を起こした後、元素ダメージ+8~16%、継続時間10秒、最大2重まで。
        passive: { items: konst.AnyBonusType.Element, value: [8, 10, 12, 14, 16], limit: "elem.react", stack: 2, times: 10 },
    },
    BlackcliffAmulet: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Damage,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "general.defeat", stack: 3, times: 30 },
    },
    RoyalGrimoire: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: konst.CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "general.damage", stack: 5 },
    },
    SacrificialFragments: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.Elem,
        secval: [48, 85, 124, 143, 162, 182, 201, 221],
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~14秒毎に1回のみ発動する。
        // passive: null,
    },
    SolarPearl: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Rate,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        passive: [
            // 通常攻撃が命中した後、6秒間元素スキルと元素爆発のダメージ+20~40%。
            { items: [konst.CombatBonusType.Skill, konst.CombatBonusType.Burst], value: [20, 25, 30, 35, 40], limit: "general.normal", times: 6 },
            // 元素スキル又は元素爆発が命中した後、6秒間通常攻撃のダメージ+20~40%。
            { items: konst.CombatBonusType.Normal, value: [20, 25, 30, 35, 40], limit: "general.skill_burst", times: 6 },
        ],
    },
    TheWidsith: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.CriticalBonusType.Damage,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        // キャラ登場時、ランダムにテーマ曲を1つ獲得する、継続時間10秒。30秒ごとに1回のみ発動する。
        passive: [
            // 叙唱:攻撃力+60~120%
            { items: konst.StatusBonusType.AtkBuf, value: [60, 75, 90, 105, 120], limit: "weapon.entry_1", times: 10 },
            // 詠唱:全元素ダメージ+48~96%
            { items: konst.AnyBonusType.Element, value: [48, 60, 72, 84, 96], limit: "weapon.entry_2", times: 10 },
            // 間奏曲:元素熟知+240~480
            { items: konst.StatusBonusType.Elem, value: [240, 300, 360, 420, 480], limit: "weapon.entry_3", times: 10 },
        ],
    },
    HakushinRing: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // この武器を装備したキャラクターが雷元素に関連する反応を起こした時、周囲チーム内にてその反応に関わった元素タイプのキャラクターは強化効果を獲得する。
        // 強化効果：該当元素タイプの元素ダメージ+10~20%、継続時間6秒、この方式で獲得する元素ダメージアップ効果は重ね掛けできない。
        // TODO: 
        passive: {
            items: [konst.ElementBonusType.Pyro, konst.ElementBonusType.Hydro, konst.ElementBonusType.Elect, konst.ElementBonusType.Anemo, konst.ElementBonusType.Cryo],
            value: [10, 12.5, 15, 17.5, 20],
            limit: "elem.react_elect",
            times: 6,
            target: konst.BonusTarget.All,
        },
    },
    DodocoTales: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.AtkBuf,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        passive: [
            // 通常攻撃が敵に命中した後の6秒間、重撃ダメージ+16~32%。
            { items: konst.CombatBonusType.Heavy, value: [16, 20, 24, 28, 32], limit: "general.normal", times: 6 },
            // 重撃が敵に命中した後の6秒間、攻撃力+8~16%。
            { items: konst.StatusBonusType.AtkBuf, value: [8, 10, 12, 14, 16], limit: "general.heavy", times: 6 },
        ],
    },
    FavoniusCodex: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.EnRec,
        secval: [10.0, 17.7, 25.8, 29.8, 33.8, 37.9, 41.9, 45.9],
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    WineAndSong: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 通常攻撃が敵に命中すると、ダッシュまたはダッシュを代替する能力のスタミナ消費-?%、持続時間5秒。
        // また、ダッシュまたはダッシュを代替する能力を使用すると、攻撃力+25~45%、持続時間5秒。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [25, 30, 35, 40, 45], limit: "weapon.dash", times: 5 },
    },
    PrototypeMalice: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.HpBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // 元素爆発を発動した後6秒間、2秒毎に元素エネルギーを4~6回復:さらに2秒毎にチーム全員のHPの4~6%を回復
        // passive: null,
    },
    Frostbearer: {
        star: 4,
        atk: WeaponAtk4[42],
        second: konst.StatusBonusType.AtkBuf,
        secval: [9.0, 15.9, 23.2, 26.8, 30.4, 34.1, 37.7, 41.3],
        // 通常攻撃と重撃が敵に命中した時、60%の確率で敵の上に恒氷晶核が作られ落下し、攻撃力の80%の範囲ダメージを与える。
        // 敵が氷元素の影響を受けている場合、攻撃力の200%のダメージを受ける。この効果は10秒毎に1回のみ発動可能。
        // passive: null
    },
    EyePerception: {
        star: 4,
        atk: WeaponAtk4[41],
        second: konst.StatusBonusType.AtkBuf,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        // 通常攻撃と重撃が命中する時、50%の確率で昭心法珠を1つ発射し、敵に攻撃力の240~360%のダメージを与える。敵同士に最大4回跳ね返る。この効果は12~8秒毎に1回発動可能。
        // passive: null,
    },
    OathswornEye: {
        star: 4,
        atk: WeaponAtk4[44],
        second: konst.StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 元素スキルを発動すると、元素チャージ効率+24~48%、継続時間10秒。
        passive: { items: konst.StatusBonusType.EnRec, value: [24, 30, 36, 42, 48], limit: "skill.use", times: 10 },
    },
    MagicGuide: {
        star: 3,
        atk: WeaponAtk3[38],
        second: konst.StatusBonusType.Elem,
        secval: [41, 72, 105, 122, 138, 154, 171, 187],
        // 水元素又は雷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: konst.AnyBonusType.Damage, value: [12, 15, 18, 21, 24], limit: "elem.hydro_elect" },
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
        passive: { items: konst.StatusBonusType.AtkBuf, value: [12, 14, 16, 18, 20], limit: "general.defeat", times: 15 },
    },
    TalesDragonSlayers: {
        star: 3,
        atk: WeaponAtk3[39],
        second: konst.StatusBonusType.HpBuf,
        secval: [7.7, 13.5, 19.7, 22.8, 25.9, 29.0, 32.1, 35.2],
        // キャラを切り替えると、次に登場するキャラの攻撃力+24~48%、継続時間10秒。20秒に1回のみ発動可能。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [24, 30, 36, 42, 48], limit: "weapon.next", times: 10, target: konst.BonusTarget.Next },
    },
    EmeraldOrb: {
        star: 3,
        atk: WeaponAtk3[40],
        second: konst.StatusBonusType.Elem,
        secval: [20, 36, 53, 61, 69, 77, 85, 94],
        // 蒸発、感電、凍結または水元素拡散反応を起こした後12秒間、攻撃力+20~40%。
        passive: { items: konst.StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40], limit: "elem.react_hydro", times: 12 },
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
export type DBWeaponTable = Record<konst.WeaponType, IWeaponData[]>;

export default class Weapon {
    public static check(type: string): type is konst.WeaponType {
        return konst.WeaponTypes.includes(type as konst.WeaponType);
    }

    public static create(id: string, type: konst.WeaponType, name: string, init: SettingWeapon) {
        const item = WeaponList[type][name];
        const data: IWeaponData = {
            id,
            name,
            comment: "",
            rank: init.rank,
            level: init.level,
            atk: item.atk[0],
            second: {
                type: item.second,
                value: item.secval[0],
            },
        };
        Weapon.level(data, type);
        return data;
    }

    public static reset(data: IWeaponData, type: konst.WeaponType, init: SettingWeapon) {
        const { second } = WeaponList[type][data.name];
        data.rank = init.rank;
        data.level = init.level;
        data.second = { type: second, value: 0 };
        Weapon.level(data, type);
    }

    public static level(data: IWeaponData, type: konst.WeaponType) {
        const { atk, secval } = WeaponList[type][data.name];
        data.atk = ascension.calc14(data.level, atk);
        data.second.value = ascension.calc8(data.level, secval);
    }

    public static ranked(bonus: AnyWeaponBonus, rank: number): WeaponBonus {
        if (bonus.extra === konst.ExtraBonusType.Energy) {
            return { ...bonus, value: bonus.value[rank - 1], bound: bonus.bound[rank - 1] };
        }
        return { ...bonus, value: bonus.value[rank - 1] };
    }
}
