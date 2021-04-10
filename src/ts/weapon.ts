// TODO: 多言語対応（ソース全体）

const SWORD_LIST: DeepReadonly<IMap<IWeapon>> = {
    other: {
        name: "-",
        star: 1,
        // atk: null,
        second: StatusBonusType.Other,
    },
    AquilaFavonia: {
        name: "風鷹剣",
        star: 5,
        atk: WEAPON_ATK5[48],
        second: ElementBonusType.Phys,
        secval: WEAPON_SUB5.phys_dmg,
        // 攻撃力+20~40%
        passive: { items: StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40] },
        // ダメージを受けると発動:抗争の旗を高く掲げる西風の鷹の魂が蘇り、攻撃力の100~160%分のHPを回復し、周りの敵に攻撃力の200~320%のダメージを与える。15秒ごとに1回発動可能。
    },
    SkywardBlade: {
        name: "天空の刃",
        star: 5,
        atk: WEAPON_ATK5[46],
        second: StatusBonusType.EnRec,
        secval: WEAPON_SUB5.en_rec,
        // 会心率+4~8%
        passive: { items: CriticalBonusType.Rate, value: [4, 5, 6, 7, 8] },
        // 元素爆発を使用すると衝天の勢いを獲得する:移動速度+10%、攻撃速度+10%、通常攻撃と重撃が命中する際に、攻撃力の20~40%の追加ダメージを与える、継続時間12秒。
    },
    SummitShaper: {
        name: "斬山の刃",
        star: 5,
        atk: WEAPON_ATK5[46],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB5.atk_buf,
        passive: [
            // シールド強化20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    PrimordialJadeCutter: {
        name: "磐岩結緑",
        star: 5,
        atk: WEAPON_ATK5[44],
        second: CriticalBonusType.Rate,
        secval: WEAPON_SUB5.cri_rate,
        passive: [
            // HP上限+20~40%。
            { items: StatusBonusType.HpBuf, value: [20, 25, 30, 35, 40] },
            // また、キャラクターのHP上限の1.2~2.4%分、攻撃力がアップする。
            { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Atk, base: FlatBonusBase.Hp, value: [1.2, 1.5, 1.8, 2.1, 2.4] },
        ]
    },
    FavoniusSword: {
        name: "西風剣",
        star: 4,
        atk: WEAPON_ATK4[41],
        second: StatusBonusType.EnRec,
        secval: WEAPON_SUB4.en_rec,
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    SacrificialSword: {
        name: "祭礼の剣",
        star: 4,
        atk: WEAPON_ATK4[41],
        second: StatusBonusType.EnRec,
        secval: WEAPON_SUB4.en_rec,
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~16秒毎に1回のみ発動する。
        // passive: null,
    },
    LionsRoar: {
        name: "匣中龍吟",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB4.atk_buf,
        // 炎元素又は雷元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: StatusBonusType.AnyDmg, value: [20, 24, 28, 32, 36], limit: "炎、雷元素の影響を受けた敵" },
    },
    TheFlute: {
        name: "笛の剣",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB4.atk_buf,
        // 通常攻撃または重撃が命中すると、100%の確率で和音を1個獲得する。
        // 和音を5個集めると、音律の力を放ち、周囲の敵に攻撃力の100~200%のダメージを与える。和音は最大30秒存在し、0.5秒毎に最大1個獲得可能。
        // passive: null,
    },
    AlleyFlash: {
        name: "ダークアレイの閃光",
        star: 4,
        atk: WEAPON_ATK4[45],
        second: StatusBonusType.Elem,
        secval: [12, 21, 31, 36, 41, 45, 50, 55],
        // キャラクターが与えるダメージ+12~24%。ダメージを受けると、このダメージアップ効果は5秒間無効になる。
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24] },
    },
    RoyalLongsword: {
        name: "旧貴族長剣",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB4.atk_buf,
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 5 },
    },
    BlackcliffLongsword: {
        name: "黒岩の長剣",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: CriticalBonusType.Damage,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    PrototypeRancour: {
        name: "斬岩・試作",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: ElementBonusType.Phys,
        secval: WEAPON_SUB4.phys_dmg,
        // 通常攻撃または重撃が命中すると、攻撃力と防御力+4~8%、継続時間6秒、最大4重まで。0.3秒ごとに1回発動可能。
        passive: { items: [StatusBonusType.AtkBuf, StatusBonusType.DefBuf], value: [4, 5, 6, 7, 8], limit: "通常攻撃または重撃が命中した時", times: 6, stack: 4 },
    },
    IronSting: {
        name: "鉄蜂の刺し",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.Elem,
        secval: WEAPON_SUB4.elem,
        // 元素ダメージを与えた6秒間、キャラの与えるダメージ+6~12%、最大2重まで、1秒毎に1回のみ発動する。
        passive: { items: StatusBonusType.AnyDmg, value: [6, 7.5, 9, 10.5, 12], limit: "元素ダメージを与えた後", times: 6, stack: 2 },
    },
    SwordDescension: {
        name: "降臨の剣",
        star: 4,
        atk: WEAPON_ATK4[39],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB3.atk_buf,
        // 通常攻撃と重撃が命中時、50%の確率で攻撃力の200%の狭範囲ダメージを与える。10秒毎に1回のみ発動可能。
        // 旅人が降臨の剣を装備するとさらに攻撃力+66。
        passive: { items: StatusBonusType.Atk, value: [66, 66, 66, 66, 66], limit: "旅人が装備した時" },
    },
    BlackSword: {
        name: "黒剣",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: CriticalBonusType.Rate,
        secval: WEAPON_SUB4.cri_rate,
        // 通常攻撃と重撃ダメージ+20~40%
        passive: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [20, 25, 30, 35, 40] },
        // さらに通常攻撃と重撃が会心時、攻撃力の60~100%分のHPを回復する。5秒に1回のみ発動可能。
    },
    FesteringDesire: {
        name: "腐植の剣",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.EnRec,
        secval: [10.0, 17.7, 25.8, 29.8, 33.8, 37.9, 41.9, 45.9],
        passive: [
            // 元素スキルのダメージ+16~32%
            { items: CombatBonusType.Skill, value: [16, 20, 24, 28, 32] },
            // 元素スキルの会心率+6~12%
            { items: CriticalBonusType.Skill, value: [6, 7.5, 9, 10.5, 12] },
        ]
    },
    SkyriderSword: {
        name: "飛天御剣",
        star: 3,
        atk: WEAPON_ATK3[38],
        second: StatusBonusType.EnRec,
        secval: WEAPON_SUB3.en_rec,
        // 元素爆発を発動した後、攻撃力と移動速度+12~24%、継続時間15%。
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 25], limit: "元素爆発後", times: 15 },
    },
    FilletBlade: {
        name: "チ虎魚の刀",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB3.atk_buf,
        // 攻撃が命中すると、50%の確率で1体の敵に攻撃力の240~400%のダメージを与える。15~11秒毎に1回のみ発動する。
        // passive: null,
    },
    TravelersSword: {
        name: "旅道の剣",
        star: 3,
        atk: WEAPON_ATK3[40],
        second: StatusBonusType.DefBuf,
        secval: [6.4, 11.3, 16.4, 19.0, 21.6, 24.1, 26.7, 29.3],
        // 元素オーブまたは元素粒子を獲得した時、HPを1~2%回復する。
        // passive: null,
    },
    HarbingerDawn: {
        name: "黎明の神剣",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: CriticalBonusType.Damage,
        secval: WEAPON_SUB3.cri_dmg,
        // HPが90%以上の場合、会心率+14~28%。
        passive: { items: CriticalBonusType.Rate, value: [14, 17.5, 21, 24.5, 28], limit: "HP90%以上の時" },
    },
    CoolSteel: {
        name: "冷刃",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB3.atk_buf,
        // 水元素又は氷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "水、氷元素の影響を受けた敵" },
    },
    DarkIronSword: {
        name: "暗鉄剣",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: StatusBonusType.Elem,
        secval: [31, 54, 79, 91, 104, 116, 128, 141],
        // 過負荷、超電導、感電、または雷元素拡散反応が発生した12秒間、基礎攻撃力+20~40%。
        passive: { items: StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40], limit: "過負荷、超電磁、感電または雷元素拡散が発生した時", times: 12 },
    },
} as const;

const CLAYMORE_LIST: DeepReadonly<IMap<IWeapon>> = {
    other: {
        name: "-",
        star: 1,
        // atk: null,
        second: StatusBonusType.Other,
    },
    WolfsGravestone: {
        name: "狼の末路",
        star: 5,
        atk: WEAPON_ATK5[46],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB5.atk_buf,
        passive: [
            // 攻撃力+20~40%
            { items: StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40] },
            // HPが30%以下の敵に命中すると、チーム全員の攻撃力+40~80%、継続時間12秒。30秒に1回のみ発動可能。
            { items: StatusBonusType.AtkBuf, value: [40, 50, 60, 70, 80], limit: "HP30%以下の敵に命中した時", times: 12, target: BonusTarget.All },
        ],
    },
    SkywardPride: {
        name: "天空の傲",
        star: 5,
        atk: WEAPON_ATK5[48],
        second: StatusBonusType.EnRec,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 与えるダメージ+8~16%。
        passive: { items: StatusBonusType.AnyDmg, value: [8, 10, 12, 14, 16] },
        // 元素爆発を発動した後、通常攻撃と重撃が命中すると真空の刃を放ち、経路上の敵に攻撃力の80~160%のダメージを与える、継続時間20秒または真空の刃を8回発動まで。
    },
    TheUnforged: {
        name: "無工の剣",
        star: 5,
        atk: WEAPON_ATK5[46],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB5.atk_buf,
        passive: [
            // シールド強化20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    FavoniusGreatsword: {
        name: "西風大剣",
        star: 4,
        atk: WEAPON_ATK4[41],
        second: StatusBonusType.EnRec,
        secval: WEAPON_SUB4.en_rec,
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    SacrificialGreatsword: {
        name: "祭礼の大剣",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~16秒毎に1回のみ発動する。
        // passive: null,
    },
    Rainslasher: {
        name: "雨裁",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.Elem,
        secval: WEAPON_SUB4.elem,
        // 水元素又は雷元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: StatusBonusType.AnyDmg, value: [20, 24, 28, 32, 36], limit: "水、雷元素の影響を受けた敵" },
    },
    TheBell: {
        name: "鐘の剣",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.HpBuf,
        secval: WEAPON_SUB4.hp_buf,
        // ダメージを受けた時、HP上限の20~32%に相当するダメージを吸収できるシールドを生成する。継続時間は最大10秒まで。45秒毎に1回のみ発動する。
        // シールドが存在する時、キャラクターの与えるダメージ+12~24%。
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "シールドが存在する時" },
    },
    LithicBlade: {
        name: "千岩古剣",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB4.atk_buf,
        // チームに璃月出身のキャラクターが1人いる毎に、この武器を装備したキャラクターの攻撃力＋7~11%、会心率＋3~7%。最大4重まで。
        passive: [
            { items: StatusBonusType.AtkBuf, value: [7, 8, 9, 10, 11], limit: "チームに璃月出身のキャラクターが1人いる毎", stack: 4 },
            { items: CriticalBonusType.Rate, value: [3, 4, 5, 6, 7], limit: "チームに璃月出身のキャラクターが1人いる毎", stack: 4 },
        ]
    },
    RoyalGreatsword: {
        name: "旧貴族大剣",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 攻撃が敵にダメージを与えた時、会心率+8%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 5 },
    },
    BlackcliffSlasher: {
        name: "黒岩の斬刀",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: CriticalBonusType.Damage,
        secval: WEAPON_SUB4.cri_dmg,
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    PrototypeAminus: {
        name: "古華・試作",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 通常攻撃と重撃が命中する度、50%の確率で狭範囲の敵に攻撃力の240~480%の追加ダメージを与える。15秒毎に1回のみ発動可能。
        // passive: null,
    },
    Whiteblind: {
        name: "白影の剣",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.DefBuf,
        secval: WEAPON_SUB4.def_buf,
        // 通常攻撃か重撃が命中すると、攻撃力と防御力+6~12%。継続時間6秒、最大4重まで。0.5秒毎に1回のみ発動可能。
        passive: { items: [StatusBonusType.AtkBuf, StatusBonusType.DefBuf], value: [6, 7.5, 9, 10.5, 12], limit: "通常攻撃か重撃が命中した時", times: 6, stack: 4 },
    },
    SerpentSpine: {
        name: "螭龍の剣",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: CriticalBonusType.Rate,
        secval: WEAPON_SUB4.cri_rate,
        // フィールドにいる時、4秒毎に、与えるダメージ+6~10%、被ダメージ+3~1.8%。最大5重まで、退場後もリセットされず、攻撃を受けると効果数-1。
        passive: { items: StatusBonusType.AnyDmg, value: [6, 7, 8, 9, 10], limit: "フィールドにいる時4秒毎", stack: 5 },
    },
    SnowTombedStarsilver: {
        name: "雪葬の星銀",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: ElementBonusType.Phys,
        secval: WEAPON_SUB4.phys_dmg,
        // 通常攻撃と重撃が敵に命中した時、60%の確率で敵の上に恒氷晶核が作られ落下し、攻撃力の80%の範囲ダメージを与える。
        // 敵が氷元素の影響を受けている場合、攻撃力の200%のダメージを受ける。この効果は10秒毎に1回のみ発動可能。
        // passive: null
    },
    SkyriderGreatsword: {
        name: "飛天大御剣",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: ElementBonusType.Phys,
        secval: WEAPON_SUB3.phys_dmg,
        // 通常攻撃と重撃が命中すると、攻撃力+6~10%、継続時間6秒、最大4重まで。0.5秒毎に1回のみ発動可能。
        passive: { items: StatusBonusType.AtkBuf, value: [6, 7, 8, 9, 10], limit: "通常攻撃か重撃が命中した時", times: 6, stack: 4 },
    },
    DebateClub: {
        name: "理屈責め",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB3.atk_buf,
        // 元素スキルを発動した後、通常攻撃と重撃が命中する際に、狭範囲で攻撃力の60~120%のダメージを与える。
        // passive: null,
    },
    WhiteGreatsword: {
        name: "白鉄の大剣",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: StatusBonusType.DefBuf,
        secval: WEAPON_SUB3.def_buf,
        // 敵を倒した時、HPを8~16%回復する。
        // passive: null,
    },
    BloodtaintedGreatsword: {
        name: "龍血を浴びた剣",
        star: 3,
        atk: WEAPON_ATK3[38],
        second: StatusBonusType.Elem,
        secval: [41, 72, 105, 122, 138, 154, 171, 187],
        // 炎元素又は雷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "炎、雷元素の影響を受けた敵" },
    },
    FerrousShadow: {
        name: "鉄影段平",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: StatusBonusType.HpBuf,
        secval: WEAPON_SUB3.hp_buf,
        // HPが70~90%以下になると、重撃は中断されにくくなり、さらに重撃ダメージ+30~50%。
        passive: { items: CombatBonusType.Heavy, value: [30, 35, 40, 45, 50], limit: "HPが一定値以下の時" },
    },
} as const;

const POLEARM_LIST: DeepReadonly<IMap<IWeapon>> = {
    other: {
        name: "-",
        star: 1,
        // atk: null,
        second: StatusBonusType.Other,
    },
    PrimordialSpear: {
        name: "和璞鳶",
        star: 5,
        atk: WEAPON_ATK5[48],
        second: CriticalBonusType.Rate,
        secval: WEAPON_SUB5.cri_rate,
        passive: [
            // 敵に命中した時、自身の攻撃力+3.2~6%、継続時間6秒、最大7重まで。0.3秒に最大1回発動でき、7重まで発動すると与ダメージ+12~24%。
            { items: StatusBonusType.AtkBuf, value: [3.2, 3.9, 4.6, 5.3, 6.0], limit: "敵に命中した時", times: 6, stack: 7 },
            { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "さらに7重まで発動した時" },
        ],
    },
    SkywardSpine: {
        name: "天空の脊",
        star: 5,
        atk: WEAPON_ATK5[48],
        second: StatusBonusType.EnRec,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 会心率+8~16%、通常攻撃速度+12%。
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16] },
        // 通常攻撃と重撃が命中時、50%の確率で真空刃を発動し、攻撃力の40~100%の狭範囲ダメージを与える。2秒毎に1回のみ発動可能。
    },
    VortexVanquisher: {
        name: "破天の槍",
        star: 5,
        atk: WEAPON_ATK5[46],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB5.atk_buf,
        passive: [
            // シールド強化+20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    StaffHoma: {
        name: "護摩の杖",
        star: 5,
        atk: WEAPON_ATK5[46],
        second: CriticalBonusType.Damage,
        secval: WEAPON_SUB5.cri_dmg,
        passive: [
            // HP上限+20~40%。
            { items: StatusBonusType.HpBuf, value: [20, 25, 30, 35, 40] },
            // また、キャラクターのHP上限の0.8~1.6%分、攻撃力がアップする。
            { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Atk, base: FlatBonusBase.Hp, value: [0.8, 1.0, 1.2, 1.4, 1.6] },
            // キャラクターのHPが50%未満の時、攻撃力が更にHP上限の1.0~1.8%分アップする。
            { extra: ExtraBonusType.Flat, dest: FlatBonusDest.Atk, base: FlatBonusBase.Hp, value: [1.0, 1.2, 1.4, 1.6, 1.8], limit: "HPが50未満の時" },
        ]
    },
    FavoniusLance: {
        name: "西風長槍",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    DragonsBane: {
        name: "匣中滅龍",
        star: 4,
        atk: WEAPON_ATK4[41],
        second: StatusBonusType.Elem,
        secval: [48, 85, 124, 143, 162, 182, 201, 221],
        // 水元素又は炎元素の影響を受けた敵に対するダメージ+20~36%。
        passive: { items: StatusBonusType.AnyDmg, value: [20, 24, 28, 32, 36], limit: "水、炎元素の影響を受けた敵" },
    },
    LithicSpear: {
        name: "千岩長槍",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // チームに璃月出身のキャラクターが1人いる毎に、この武器を装備したキャラクターの攻撃力＋7~11%、会心率＋3~7%。最大4重まで。
        passive: [
            { items: StatusBonusType.AtkBuf, value: [7, 8, 9, 10, 11], limit: "チームに璃月出身のキャラクターが1人いる毎", stack: 4 },
            { items: CriticalBonusType.Rate, value: [3, 4, 5, 6, 7], limit: "チームに璃月出身のキャラクターが1人いる毎", stack: 4 },
        ]
    },
    RoyalSpear: {
        name: "旧貴族猟槍",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "敵にダメージを与えた時", stack: 5 },
    },
    BlackcliffPole: {
        name: "黒岩の突槍",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: CriticalBonusType.Damage,
        secval: WEAPON_SUB4.cri_dmg,
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    PrototypeGrudge: {
        name: "星鎌・試作",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.EnRec,
        secval: [10.0, 17.7, 25.8, 29.8, 33.8, 37.9, 41.9, 45.9],
        // 元素スキルを発動した後、通常攻撃と重撃ダメージ+8~16%、継続時間12秒、最大2重まで。
        passive: { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [8, 10, 12, 14, 16], limit: "元素スキル発動後", times: 12, stack: 2 },
    },
    CrescentPike: {
        name: "流月の針",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: ElementBonusType.Phys,
        secval: WEAPON_SUB4.phys_dmg,
        // 元素粒子又は元素オーブを獲得した5秒間、通常攻撃と重撃で、攻撃力の20~40%の追加ダメージを与える。
        // passive: null,
    },
    Deathmatch: {
        name: "死闘の槍",
        star: 4,
        atk: WEAPON_ATK4[41],
        second: CriticalBonusType.Rate,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        passive: [
            // 近くに敵が2人以上いる時、攻撃力+16~32%、防御力+16~32%。
            { items: [StatusBonusType.AtkBuf, StatusBonusType.DefBuf], value: [16, 20, 24, 28, 32], limit: "近くに敵が2人以上いる時" },
            // 近くにいる敵が2人未満の時、攻撃力24~48%。
            { items: StatusBonusType.AtkBuf, value: [24, 30, 36, 42, 48], limit: "近くに敵が2人未満の時" },
        ],
    },
    DragonspineSpear: {
        name: "ドラゴンスピア",
        star: 4,
        atk: WEAPON_ATK4[41],
        second: ElementBonusType.Phys,
        secval: [15.0, 26.5, 38.7, 44.7, 50.8, 56.8, 62.9, 69.0],
        // 通常攻撃と重撃が敵に命中した時、60%の確率で敵の上に恒氷晶核が作られ落下し、攻撃力の80%の範囲ダメージを与える。
        // 敵が氷元素の影響を受けている場合、攻撃力の200%のダメージを受ける。この効果は10秒毎に1回のみ発動可能。
        // passive: null
    },
    BlackTassel: {
        name: "黒纓槍",
        star: 3,
        atk: WEAPON_ATK3[38],
        second: StatusBonusType.HpBuf,
        secval: [10.2, 18.0, 26.3, 30.4, 34.6, 38.7, 42.8, 46.9],
        // スライムタイプの敵に与えるダメージ+40~80%。
        passive: { items: StatusBonusType.AnyDmg, value: [40, 50, 60, 70, 80], limit: "スライムタイプの敵" },
    },
    Halberd: {
        name: "鉾槍",
        star: 3,
        atk: WEAPON_ATK3[40],
        second: StatusBonusType.AtkBuf,
        secval: [5.1, 9.0, 13.1, 15.2, 17.3, 19.3, 21.4, 23.5]
        // 通常攻撃が命中した敵1体に攻撃力の160~320%の追加ダメージを与える。10秒毎に1回のみ発動する。
        // passive: null,
    },
    WhiteTassel: {
        name: "白纓槍",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: CriticalBonusType.Rate,
        secval: [5.1, 9.0, 13.1, 15.2, 17.3, 19.3, 21.4, 23.4],
        // 通常攻撃のダメージ+24~48%。
        passive: { items: CombatBonusType.Normal, value: [24, 30, 36, 42, 48] },
    },
} as const;

const BOW_LIST: DeepReadonly<IMap<IWeapon>> = {
    other: {
        name: "-",
        star: 1,
        // atk: null,
        second: StatusBonusType.Other,
    },
    AmosBow: {
        name: "アモスの弓",
        star: 5,
        atk: WEAPON_ATK5[46],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB5.atk_buf,
        passive: [
            // 通常攻撃と狙い撃ちのダメージ+12~24%。
            { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [12, 15, 18, 21, 24] },
            // 矢を放った後、0.1秒毎にダメージ+8~16%、最大5回まで上昇する。
            { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [8, 10, 12, 14, 16], limit: "矢を放った後0.1秒毎", stack: 5 },
        ]
    },
    SkywardHarp: {
        name: "天空の翼",
        star: 5,
        atk: WEAPON_ATK5[48],
        second: CriticalBonusType.Rate,
        secval: [4.8, 8.5, 12.4, 14.3, 16.2, 18.2, 20.1, 22.1],
        // 会心ダメージ+20~40%。
        passive: { items: CriticalBonusType.Damage, value: [20, 25, 30, 35, 40] },
        // 攻撃が命中した時、60~100%の確率で狭範囲内の敵に攻撃力の125%の物理ダメージを与える。4~2秒毎に1回のみ発動可能。
    },
    ElegyForTheEnd: {
        name: "終焉を嘆く詩",
        star: 5,
        atk: WEAPON_ATK5[46],
        second: StatusBonusType.EnRec,
        secval: WEAPON_SUB5.en_rec,
        passive: [
            // 風と共に流れる｢千年の大楽章｣の一部。元素熟知+60~120。
            { items: StatusBonusType.Elem, value: [60, 75, 90, 105, 120] },
            // 元素スキルまたは元素爆発が敵に命中すると、追憶の欠片を一枚獲得する。この効果は0.2秒毎に一回のみ発動でき、待機中のキャラクターも発動できる。
            // 追憶の欠片を4枚集めると、全ての追憶の欠片を消費し、周囲のチーム全員に12秒継続する｢千年の大楽章・別れの歌｣効果を付与する:元素熟知+100~200、攻撃力+20~40%。
            { items: StatusBonusType.Elem, value: [100, 125, 150, 175, 200], limit: "元素スキルまたは元素爆発が4回敵に命中した時", times: 12 },
            { items: StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40], limit: "元素スキルまたは元素爆発が4回敵に命中した時", times: 12 },
            // 発動後の20秒間、追憶の欠片を再度獲得することはできない。｢千年の大楽章｣のもたらす各効果中、同種類の効果は重ね掛け不可。
        ]
    },
    FavoniusWarbow: {
        name: "西風猟弓",
        star: 4,
        atk: WEAPON_ATK4[41],
        second: StatusBonusType.EnRec,
        secval: WEAPON_SUB4.en_rec,
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    SacrificialBow: {
        name: "祭礼の弓",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~14秒毎に1回のみ発動する。
        // passive: null,
    },
    Rust: {
        name: "弓蔵",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB4.atk_buf,
        // 通常攻撃のダメージ+40~80%、狙い撃ち射撃のダメージ-10%。
        passive: [
            { items: CombatBonusType.Normal, value: [40, 50, 60, 70, 80] },
            { items: CombatBonusType.Heavy, value: [-10, -10, -10, -10, -10] },
        ],
    },
    Stringless: {
        name: "絶弦",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.Elem,
        secval: WEAPON_SUB4.elem,
        // 元素スキルと元素爆発のダメージ+24~48%。
        passive: { items: [CombatBonusType.Skill, CombatBonusType.Burst], value: [24, 30, 36, 42, 48] },
    },
    RoyalBow: {
        name: "旧貴族長弓",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB4.atk_buf,
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで、攻撃会心発生時、効果をクリアにする。
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "敵にダメージを与えた時", stack: 5 },
    },
    BlackcliffWarbow: {
        name: "黒岩の戦弓",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: CriticalBonusType.Damage,
        secval: [8.0, 14.1, 20.6, 23.8, 27.1, 30.3, 33.5, 36.8],
        // 敵を倒した後、攻撃力+12~24%、継続時間30秒。最大3重まで、継続時間は加算されず、重ごとに別カウントされる。
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    PrototypeCrescent: {
        name: "澹月・試作",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB4.atk_buf,
        // 狙い撃ちが弱点に命中すると、移動速度+10%、攻撃力+36~72%、継続時間10秒。
        passive: { items: StatusBonusType.AtkBuf, value: [36, 45, 54, 63, 72], limit: "狙い撃ちが弱点に命中した時", times: 10 },
    },
    CompoundBow: {
        name: "リングボウ",
        star: 4,
        atk: WEAPON_ATK4[41],
        second: ElementBonusType.Phys,
        secval: [15.0, 26.5, 38.7, 44.7, 50.8, 56.8, 62.9, 69.0],
        // 通常攻撃と狙い撃ち射撃が命中すると、攻撃力+4~8%、通常攻撃速度1.2~2.4%、継続時間6秒、最大4重まで、0.3秒に1回のみ発動可能。
        passive: { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "通常攻撃と狙い撃ちが命中した時", times: 6, stack: 4 },
    },
    ViridescentHunt: {
        name: "蒼翠の狩猟弓",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: CriticalBonusType.Rate,
        secval: WEAPON_SUB4.cri_rate,
        // 通常攻撃と重撃が命中時、50%の確率で風の目を生成し、近くの敵を吸い寄せる。
        // 0.5秒毎に攻撃力の40~80%のダメージを与える。継続時間4秒、14~10秒毎に1回のみ発動可能。
        // passive: null,
    },
    WindblumeOde: {
        name: "風花の頌歌",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.Elem,
        secval: WEAPON_SUB4.elem,
        // 元素スキルを発動した後、風の花の悠久なる願いの加護を獲得し、攻撃力+16~32%、持続時間6秒。
        passive: { items: StatusBonusType.AtkBuf, value: [16, 20, 24, 28, 32], limit: "元素スキルを発動した後", times: 6 },
    },
    SharpshootersOath: {
        name: "シャープシューターの誓い",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: CriticalBonusType.Damage,
        secval: WEAPON_SUB3.cri_dmg,
        // 弱点に対するダメージ+24~48%。
        passive: { items: StatusBonusType.AnyDmg, value: [24, 30, 36, 42, 48], limit: "弱点" },
    },
    RavenBow: {
        name: "鴉羽の弓",
        star: 3,
        atk: WEAPON_ATK3[40],
        second: StatusBonusType.Elem,
        secval: [20, 36, 53, 61, 69, 77, 85, 94],
        // 水元素又は炎元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "水、炎元素の影響を受けた敵" },
    },
    Slingshot: {
        name: "弾弓",
        star: 3,
        atk: WEAPON_ATK3[38],
        second: CriticalBonusType.Rate,
        secval: [6.8, 12.0, 17.5, 20.3, 23.0, 25.7, 28.5, 31.2],
        // 通常攻撃又は狙い撃ちの時、矢が発射後0.3秒内に敵に命中すると、ダメージ+36~60%。0.3秒より長い場合、ダメージ-10%。
        passive: [
            // 通常攻撃又は狙い撃ちの時、矢が発射後0.3秒内に敵に命中すると、ダメージ+36~60%。
            { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [36, 42, 48, 54, 60], limit: "矢が発射後0.3秒以内に敵に命中した時" },
            // 0.3秒より長い場合、ダメージ-10%。
            { items: [CombatBonusType.Normal, CombatBonusType.Heavy], value: [-10, -10, -10, -10, -10], limit: "矢が発射後0.3秒より長く敵に命中した時" }
        ]
    },
    Messenger: {
        name: "文使い",
        star: 3,
        atk: WEAPON_ATK3[40],
        second: CriticalBonusType.Damage,
        secval: [6.8, 12.0, 17.5, 20.3, 23.0, 25.7, 28.5, 31.2],
        // 狙い撃ち時、弱点に命中すると、追加で攻撃力の100~200%のダメージを与え、必ず会心ダメージになる。10秒毎に1回のみ発動可能。
        // passive: null,
    },
    RecurveBow: {
        name: "リカーブボウ",
        star: 3,
        atk: WEAPON_ATK3[38],
        second: StatusBonusType.HpBuf,
        secval: [10.2, 18.0, 26.3, 30.4, 34.6, 38.7, 42.8, 46.9],
        // 敵を倒した時、HPを8~16%回復する。
        // passive: null,
    },
} as const;

const CATALYST_LIST: DeepReadonly<IMap<IWeapon>> = {
    other: {
        name: "-",
        star: 1,
        // atk: null,
        second: StatusBonusType.Other,
    },
    SkywardAtlas: {
        name: "天空の巻",
        star: 5,
        atk: WEAPON_ATK5[48],
        second: StatusBonusType.AtkBuf,
        secval: [7.2, 12.7, 18.5, 21.4, 24.4, 27.3, 30.2, 33.1],
        // 元素ダメージ+12~24%。
        passive: { items: ElementBonusType.Any, value: [12, 15, 18, 21, 24] },
        // 通常攻撃が命中した時、50%の確率で高天流雲の好意を獲得し、15秒内に自ら周囲の敵を攻撃すると、攻撃力の160~320%相当のダメージを与える。30秒毎に1回のみ発動可能。
    },
    LostSacredWinds: {
        name: "四風原典",
        star: 5,
        atk: WEAPON_ATK5[46],
        second: CriticalBonusType.Rate,
        secval: [7.2, 12.7, 18.5, 21.4, 24.4, 27.3, 30.2, 33.1],
        // 移動速度+10%。
        // 出場中は4秒毎に元素ダメージ+8~16%、最大4重まで。キャラが退場または戦闘不能まで有効する。
        passive: { items: ElementBonusType.Any, value: [8, 10, 12, 14, 16], limit: "出場中は4秒毎", stack: 4 },
    },
    MemoryDust: {
        name: "浮世の錠",
        star: 5,
        atk: WEAPON_ATK5[46],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB5.atk_buf,
        passive: [
            // シールド強化+20~40%。
            // 攻撃が命中した8秒間、攻撃力+4~8%。この効果は最大5重まで、0.3秒毎に一回のみ発動可能。
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "攻撃が命中した時", times: 8, stack: 5 },
            // また、シールド状態の時、攻撃力アップの効果量は2倍になる。
            { items: StatusBonusType.AtkBuf, value: [4, 5, 6, 7, 8], limit: "さらにシールド状態の時", times: 8, stack: 5 },
        ]
    },
    FavoniusCodex: {
        name: "西風秘典",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.EnRec,
        secval: [10.0, 17.7, 25.8, 29.8, 33.8, 37.9, 41.9, 45.9],
        // 会心攻撃をした時、60~100%の確率で少量の元素粒子を生成し、元素エネルギーを6回復する。12~6秒毎に1回のみへ発動する。
        // passive: null,
    },
    SacrificialFragments: {
        name: "祭礼の断片",
        star: 4,
        atk: WEAPON_ATK4[41],
        second: StatusBonusType.Elem,
        secval: [48, 85, 124, 143, 162, 182, 201, 221],
        // 元素スキルが敵にダメージを与えた時、40~80%の確率で該当スキルのクールタイムをリセットする。30~14秒毎に1回のみ発動する。
        // passive: null,
    },
    EyePerception: {
        name: "昭心",
        star: 4,
        atk: WEAPON_ATK4[41],
        second: StatusBonusType.AtkBuf,
        secval: [12.0, 21.2, 30.9, 35.7, 40.6, 45.4, 50.3, 55.1],
        // 通常攻撃と重撃が命中する時、50%の確率で昭心法珠を1つ発射し、敵に攻撃力の240~360%のダメージを与える。敵同士に最大4回跳ね返る。この効果は12~8秒毎に1回発動可能。
        // passive: null,
    },
    TheWidsith: {
        name: "流浪楽章",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: CriticalBonusType.Damage,
        secval: WEAPON_SUB4.cri_dmg,
        // キャラ登場時、ランダムにテーマ曲を1つ獲得する、継続時間10秒。30秒ごとに1回のみ発動する。
        passive: [
            // 叙唱:攻撃力+60~120%
            { items: StatusBonusType.AtkBuf, value: [60, 75, 90, 105, 120], limit: "叙唱：キャラ登場時", times: 10 },
            // 詠唱:全元素ダメージ+48~96%
            { items: ElementBonusType.Any, value: [48, 60, 72, 84, 96], limit: "詠唱：キャラ登場時", times: 10 },
            // 間奏曲:元素熟知+240~480%
            { items: StatusBonusType.Elem, value: [240, 300, 360, 420, 480], limit: "間奏曲：キャラ登場時", times: 10 },
        ],
    },
    WineAndSong: {
        name: "ダークアレイの酒と詩",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: StatusBonusType.EnRec,
        secval: [6.7, 11.8, 17.2, 19.9, 22.6, 25.2, 27.9, 30.6],
        // 通常攻撃が敵に命中すると、ダッシュまたはダッシュを代替する能力のスタミナ消費-？%、持続時間5秒。
        // また、ダッシュまたはダッシュを代替する能力を使用すると、攻撃力+25~45%、持続時間5秒。
        passive: { items: StatusBonusType.AtkBuf, value: [25, 30, 35, 40, 45], limit: "ダッシュまたはダッシュを代替する能力を使用した時", times: 5 },
    },
    RoyalGrimoire: {
        name: "旧貴族秘法録",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: StatusBonusType.AtkBuf,
        secval: [6.0, 10.6, 15.5, 17.9, 20.3, 22.7, 25.1, 27.6],
        // 攻撃が敵にダメージを与えた時、会心率+8~16%、最大5重まで。攻撃会心発生時、効果をクリアにする。
        passive: { items: CriticalBonusType.Rate, value: [8, 10, 12, 14, 16], limit: "ダメージを与えた時", stack: 6 },
    },
    BlackcliffAmulet: {
        name: "黒岩の緋玉",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: CriticalBonusType.Damage,
        secval: WEAPON_SUB4.cri_dmg,
        // 敵を倒したあと、攻撃力+12~24%、継続時間30秒、最大3重まで、継続時間は加算されず、重ごとに別カウントされる
        passive: { items: StatusBonusType.AtkBuf, value: [12, 15, 18, 21, 24], limit: "敵を倒した後", times: 30, stack: 3 },
    },
    PrototypeMalice: {
        name: "金珀・試作",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.HpBuf,
        secval: WEAPON_SUB4.hp_buf,
        // 元素爆発を発動した後6秒間、2秒毎に元素エネルギーを4~6回復:さらに2秒毎にチーム全員のHPの4~6%を回復
        // passive: null,
    },
    MappaMare: {
        name: "万国諸海の図譜",
        star: 4,
        atk: WEAPON_ATK4[44],
        second: StatusBonusType.Elem,
        secval: [24, 42, 62, 71, 81, 91, 101, 110],
        // 元素反応を起こした後、元素ダメージ+8~16%、継続時間10秒、最大2重まで。
        passive: { items: ElementBonusType.Any, value: [8, 10, 12, 14, 16], limit: "元素反応を起こした後", times: 10, stack: 2 },
    },
    SolarPearl: {
        name: "匣中日月",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: CriticalBonusType.Rate,
        secval: WEAPON_SUB4.cri_rate,
        passive: [
            // 通常攻撃が命中した後、6秒間元素スキルと元素爆発のダメージ+20~40%。
            { items: [CombatBonusType.Skill, CombatBonusType.Burst], value: [20, 25, 30, 35, 40], limit: "通常攻撃が命中した時", times: 6 },
            // 元素スキル又は元素爆発が命中した後、6秒間通常攻撃のダメージ+20~40%。
            { items: CombatBonusType.Normal, value: [20, 25, 30, 35, 40], limit: "元素スキルか元素爆発が命中した時", times: 6 },
        ],
    },
    Frostbearer: {
        name: "冬忍びの実",
        star: 4,
        atk: WEAPON_ATK4[42],
        second: StatusBonusType.AtkBuf,
        secval: WEAPON_SUB4.atk_buf,
        // 通常攻撃と重撃が敵に命中した時、60%の確率で敵の上に恒氷晶核が作られ落下し、攻撃力の80%の範囲ダメージを与える。
        // 敵が氷元素の影響を受けている場合、攻撃力の200%のダメージを受ける。この効果は10秒毎に1回のみ発動可能。
        // passive: null
    },
    AmberCatalyst: {
        name: "翡玉法珠",
        star: 3,
        atk: WEAPON_ATK3[40],
        second: StatusBonusType.Elem,
        secval: [20, 36, 53, 61, 69, 77, 85, 94],
        // 蒸発、感電、凍結または水元素拡散反応を起こした後12秒間、攻撃力+20~40%。
        passive: { items: StatusBonusType.AtkBuf, value: [20, 25, 30, 35, 40], limit: "蒸発、感電、凍結、または水元素拡散反応後", times: 12 },
    },
    MagicGuide: {
        name: "魔導緒論",
        star: 3,
        atk: WEAPON_ATK3[38],
        second: StatusBonusType.Elem,
        secval: [41, 72, 105, 122, 138, 154, 171, 187],
        // 水元素又は雷元素の影響を受けた敵に対するダメージ+12~24%。
        passive: { items: StatusBonusType.AnyDmg, value: [12, 15, 18, 21, 24], limit: "水、雷元素の影響を受けた敵" },
    },
    TalesDragonSlayers: {
        name: "竜殺しの英傑譚",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: StatusBonusType.HpBuf,
        secval: WEAPON_SUB3.hp_buf,
        // キャラを切り替えると、次に登場するキャラの攻撃力+24~48%、継続時間10秒。20秒に1回のみ発動可能。
        passive: { items: StatusBonusType.AtkBuf, value: [24, 30, 36, 42, 48], limit: "次に登場するキャラ", times: 10, target: BonusTarget.Next },
    },
    OtherworldlyStory: {
        name: "異世界旅行記",
        star: 3,
        atk: WEAPON_ATK3[39],
        second: StatusBonusType.EnRec,
        secval: [8.5, 15.0, 21.9, 25.3, 28.8, 32.2, 35.6, 39.0],
        // 元素オーブまたは元素粒子を獲得した時、HPを1%回復する
        // passive: null,
    },
    TwinNephrite: {
        name: "特級の宝玉",
        star: 3,
        atk: WEAPON_ATK3[40],
        second: CriticalBonusType.Rate,
        secval: [3.4, 6.0, 8.8, 10.1, 11.5, 12.9, 14.2, 15.6],
        // 敵を倒した後15秒間、移動速度と攻撃力+12~20%。
        passive: { items: StatusBonusType.AtkBuf, value: [12, 14, 16, 18, 20], limit: "敵を倒した後", times: 15 },
    },
} as const;

interface IWeaponList extends Record<WeaponType, IMap<IWeapon>> { }

const WEAPON_LIST: DeepReadonly<IWeaponList> = {
    sword: SWORD_LIST,
    claymore: CLAYMORE_LIST,
    polearm: POLEARM_LIST,
    bow: BOW_LIST,
    catalyst: CATALYST_LIST
} as const;
