import * as konst from "~/src/const";
import { BonusValue, IIdentify, INameable, ICommentable, IArtifactInfo } from "~/src/interface";
import { SettingArtifact } from "~/src/setting";

export const ArtifactMain: Record<konst.ArtifactType, ReadonlyArray<konst.AnyBonusType>> = {
    "flower": [konst.StatusBonusType.Hp],
    "feather": [konst.StatusBonusType.Atk],
    "sands": [
        konst.StatusBonusType.HpBuf,
        konst.StatusBonusType.AtkBuf,
        konst.StatusBonusType.DefBuf,
        konst.StatusBonusType.Elem,
        konst.StatusBonusType.EnRec,
    ],
    "goblet": [
        konst.StatusBonusType.HpBuf,
        konst.StatusBonusType.AtkBuf,
        konst.StatusBonusType.DefBuf,
        konst.StatusBonusType.Elem,
        konst.ElementBonusType.Pyro,
        konst.ElementBonusType.Hydro,
        konst.ElementBonusType.Elect,
        konst.ElementBonusType.Anemo,
        konst.ElementBonusType.Cryo,
        konst.ElementBonusType.Geo,
        konst.ElementBonusType.Phys,
    ],
    "circlet": [
        konst.StatusBonusType.HpBuf,
        konst.StatusBonusType.AtkBuf,
        konst.StatusBonusType.DefBuf,
        konst.StatusBonusType.Elem,
        konst.StatusBonusType.HealBuf,
        konst.CriticalBonusType.Rate,
        konst.CriticalBonusType.Damage,
    ]
} as const;

export const ArtifactSub: ReadonlyArray<konst.AnyBonusType> = [
    konst.BonusType.None,
    konst.StatusBonusType.Hp,
    konst.StatusBonusType.HpBuf,
    konst.StatusBonusType.Atk,
    konst.StatusBonusType.AtkBuf,
    konst.StatusBonusType.Def,
    konst.StatusBonusType.DefBuf,
    konst.StatusBonusType.Elem,
    konst.StatusBonusType.EnRec,
    konst.CriticalBonusType.Rate,
    konst.CriticalBonusType.Damage,
] as const;

export const ArtifactNames = [
    "Adventurer",
    "LuckyDog",
    "Doctor",
    "Sojourner",
    "Miracle",
    "Berserker",
    "Instructor",
    "TheExile",
    "Defender",
    "BraveHeart",
    "Artist",
    "Gambler",
    "Scholar",
    // "Illumination",
    // "Destiny",
    // "Wisdom",
    // "Springtime",
    "Gladiator",
    "Troupe",
    "Thundersoother",
    "Fury",
    "Maiden",
    "Venerer",
    "CrimsonWitch",
    "Lavawalker",
    "Noblesse",
    "Chivalry",
    "Petra",
    "Bolide",
    "Icebreaker", // Strayer
    "OceanConqueror", // HeartDepth
    "Millelith",
    "PaleFlame",
    "Shimenawa",
    "SeveredFate",
    "HuskOpulentDreams",
    "OceanHuedClam",
] as const;
export type ArtifactName = typeof ArtifactNames[number];

export const ArtifactList: Record<typeof ArtifactNames[number], IArtifactInfo> = {
    Adventurer: {
        // HP上限+1000
        set2: { items: konst.StatusBonusType.Hp, value: 1000 },
        // 宝箱を開けた後5秒間、HPの30%を徐々に回復する
    },
    LuckyDog: {
        // 防御力+100
        set2: { items: konst.StatusBonusType.Def, value: 100 },
        // モラを拾得すると、HPを300回復する
    },
    Doctor: {
        // 受ける治癒効果+20%
        // 元素爆発を発動すると、HPを20%回復する
    },
    Sojourner: {
        // 攻撃力+18%
        set2: { items: konst.StatusBonusType.AtkBuf, value: 18 },
        // 重撃の会心率+30%
        set4: { items: konst.CriticalBonusType.Heavy, value: 30 },
    },
    Miracle: {
        // 全ての元素耐性+20%
        // 元素ダメージを受けると、その元素の耐性+30%、継続時間10秒。10秒毎に1回のみ発動可能
    },
    Berserker: {
        // 会心率+12%
        set2: { items: konst.CriticalBonusType.Rate, value: 12 },
        // HPが70%以下になると、会心率+24%
        set4: { items: konst.CriticalBonusType.Rate, value: 24, limit: "hp.le70" },
    },
    Instructor: {
        // 元素熟知+80
        set2: { items: konst.StatusBonusType.Elem, value: 80 },
        // 元素反応を引き起こした後、チーム全員の元素熟知+120、継続時間8秒
        set4: { items: konst.StatusBonusType.Elem, value: 120, limit: "elem.react", times: 8, target: konst.BonusTarget.All },
    },
    TheExile: {
        // 元素チャージ効率+20%
        set2: { items: konst.StatusBonusType.EnRec, value: 20 },
        // 元素爆発を発動すると、2秒毎にチームメンバー全員（自分を除く）の元素エネルギーを2回復する、継続時間6秒。重ね掛け不可
    },
    Defender: {
        // 防御力+30%
        set2: { items: konst.StatusBonusType.DefBuf, value: 30 },
        // チーム内の自身のキャラクターの元素タイプが1種類ある毎に、自身にその元素の耐性+30%
    },
    BraveHeart: {
        // 攻撃力+18%
        set2: { items: konst.StatusBonusType.AtkBuf, value: 18 },
        // HPが50%以上の敵に対するダメージ+30%
        set4: { items: konst.AnyBonusType.Damage, value: 30, limit: "hp.ge50_en" },
    },
    Artist: {
        // 通常攻撃と重撃のダメージ+15%
        set2: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: 15 },
        // 元素スキル発動後、通常攻撃と重撃ダメージ+25%、継続時間8秒
        set4: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: 25, limit: "skill.use", times: 8 },
    },
    Gambler: {
        // 元素スキルのダメージ+20%
        set2: { items: konst.CombatBonusType.Skill, value: 20 },
        // 敵を倒した時、100%の確率で元素スキルのクールタイムをリセットする。15秒に1回のみ発動可能
    },
    Scholar: {
        // 元素チャージ効率+20%
        set2: { items: konst.StatusBonusType.EnRec, value: 20 },
        // 元素エネルギーを獲得する時、チームにいる弓と法器キャラの元素エネルギーを3回復する。3秒に1回のみ発動可能
    },
    Gladiator: {
        // 攻撃力+18%
        set2: { items: konst.StatusBonusType.AtkBuf, value: 18 },
        // 該当聖遺物セットを装備したキャラが片手剣、両手剣、長柄武器キャラの場合、通常攻撃ダメージ+35%
        set4: {
            items: konst.CombatBonusType.Normal,
            value: 35,
            limit: "artifact.melee",
            target: konst.BonusTarget.Melee,
        },
    },
    Troupe: {
        // 元素熟知+80
        set2: { items: konst.StatusBonusType.Elem, value: 80 },
        // 該当聖遺物セットを装備したキャラが法器、弓キャラの場合、キャラの重撃ダメージ+35%
        set4: { items: konst.CombatBonusType.Heavy, value: 35, limit: "artifact.ranged" },
    },
    Thundersoother: {
        // 雷元素耐性+40%
        // 雷元素の影響を受けた敵に対するダメージ+35%
        set4: { items: konst.AnyBonusType.Damage, value: 35, limit: "elem.elect" },
    },
    Fury: {
        // 雷元素ダメージ+15%
        set2: { items: konst.ElementBonusType.Elect, value: 15 },
        // 過負荷、感電、超電導反応によるダメージ+40%。
        // それらの元素反応を起こすと、元素スキルのクールタイム-1秒。0.8秒毎に最大1回のみ発動可能
        set4: { items: [konst.ReactionBonusType.Overload, konst.ReactionBonusType.Echarge, konst.ReactionBonusType.Conduct], value: 40 },
    },
    Maiden: {
        // 与える治癒効果+15%
        set2: { items: konst.StatusBonusType.HealBuf, value: 15 },
        // 元素スキルまたは元素爆発を発動した後10秒間、チーム全員が受ける治癒効果+20%
    },
    Venerer: {
        // 風元素ダメージ+15%
        set2: { items: konst.ElementBonusType.Anemo, value: 15 },
        // 拡散反応によるダメージ+60%。拡散された元素タイプを基準に、影響を受けた敵の元素耐性-40%、継続時間10秒
        set4: [
            { items: konst.ReactionBonusType.Swirl, value: 60 },
            {
                extra: konst.ExtraBonusType.Reduct,
                type: konst.AnyReductType.Contact,
                value: 40,
                limit: "elem.swirl",
                times: 10,
                target: konst.BonusTarget.All,
            },
        ],
    },
    CrimsonWitch: {
        // 炎元素ダメージ+15%
        set2: { items: konst.ElementBonusType.Pyro, value: 15 },
        // 過負荷、燃焼反応によるダメージ+40%。蒸発、溶解反応による加算効果+15%。
        // 元素スキルを発動した10秒間、2セットの効果+50%、最大3重まで
        set4: [
            { items: [konst.ReactionBonusType.Overload, konst.ReactionBonusType.Burning], value: 40 },
            { items: [konst.ReactionBonusType.Vaporize, konst.ReactionBonusType.Melt], value: 15 },
            { items: konst.ElementBonusType.Pyro, value: 7.5, limit: "skill.use", stack: 3, times: 10 },
        ],
    },
    Lavawalker: {
        // 炎元素耐性+40%
        // 炎元素の影響を受けた敵に対するダメージ+35%
        set4: { items: konst.AnyBonusType.Damage, value: 35, limit: "elem.pyro" },
    },
    Noblesse: {
        // 元素爆発のダメージ+20%
        set2: { items: konst.CombatBonusType.Burst, value: 20 },
        // 元素爆発を発動すると、チーム全員の攻撃力+20%、継続時間12秒、重ね掛け不可
        set4: { items: konst.StatusBonusType.AtkBuf, value: 20, limit: "burst.use", times: 12, target: konst.BonusTarget.All },
    },
    Chivalry: {
        // 物理ダメージ+25%
        set2: { items: konst.ElementBonusType.Phys, value: 25 },
        // 敵を倒した10秒以内に重撃を発動するとスタミナの消耗はなく、与えるダメージ+50%
        set4: { items: konst.CombatBonusType.Heavy, value: 50, limit: "general.defeat", times: 10 },
    },
    Petra: {
        // 岩ダメージ+15%
        set2: { items: konst.ElementBonusType.Geo, value: 15 },
        // 結晶反応で形成された欠片を獲得すると、チーム全員の該当元素ダメージ+35%、継続時間10秒。元素ダメージ上昇は同時に1種類のみ獲得可能。
        set4: { items: konst.AnyBonusType.Element, value: 35, limit: "artifact.crystal", times: 10, target: konst.BonusTarget.All },
    },
    Bolide: {
        // シールド強化+35%
        // シールド状態の時、通常攻撃と重撃ダメージ+40%
        set4: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: 40, limit: "general.shield" },
    },
    Icebreaker: {
        // 氷元素ダメージ+15%
        set2: { items: konst.ElementBonusType.Cryo, value: 15 },
        // 氷元素の影響を受けている敵を攻撃した場合、会心率+20%。敵が凍結状態の場合、会心率は更に+20%。
        set4: [
            { items: konst.CriticalBonusType.Rate, value: 20, limit: "elem.cryo" },
            { items: konst.CriticalBonusType.Rate, value: 20, limit: "artifact.more_frozen" }
        ],
    },
    OceanConqueror: {
        // 水元素ダメージ+15%
        set2: { items: konst.ElementBonusType.Hydro, value: 15 },
        // 元素スキルを発動した後の15秒間、通常攻撃と重撃のダメージ+30%
        set4: { items: [konst.CombatBonusType.Normal, konst.CombatBonusType.Heavy], value: 30, limit: "skill.use", times: 15 }
    },
    Millelith: {
        // HP+20%
        set2: { items: konst.StatusBonusType.HpBuf, value: 20 },
        // 元素スキルが敵に命中すると、周囲のチーム全員の攻撃力+20%、シールド強化+30%、持続時間3秒。この効果は0.5秒毎に1回のみ発動可能。
        // この聖遺物セットを装備したキャラクターが待機している場合にも効果を発動できる。
        set4: { items: konst.StatusBonusType.AtkBuf, value: 20, limit: "skill.hit", times: 3, target: konst.BonusTarget.All }
    },
    PaleFlame: {
        // 物理ダメージ+25%
        set2: { items: konst.ElementBonusType.Phys, value: 25 },
        // 元素スキルが敵に命中すると、攻撃力+9%。持続時間7秒、最大2重まで、0.3秒毎に1回のみ発動可能。2重まで重ねると、2セットの効果が2倍になる。
        set4: [
            { items: konst.StatusBonusType.AtkBuf, value: 9, limit: "skill.hit", stack: 2, times: 7 },
            { items: konst.StatusBonusType.AtkBuf, value: 18, limit: "artifact.more_x2", times: 7 },
        ],
    },
    Shimenawa: {
        // 攻撃力+18%
        set2: { items: konst.StatusBonusType.AtkBuf, value: 18 },
        // 元素スキルを発動した時、キャラクターの元素エネルギーが15以上の場合、元素エネルギーを15消費し、次の10秒間通常攻撃、重撃、落下攻撃ダメージ+50%
        set4: { items: konst.CombatBonusType.Combat, value: 50, limit: "skill.use_en15", times: 10 }
    },
    SeveredFate: {
        // 元素チャージ効率+20%
        set2: { items: konst.StatusBonusType.EnRec, value: 20 },
        // 元素チャージ効率の25%を基準に、元素爆発ダメージがアップする。この方式でアップできるダメージは最大75%まで。
        set4: {
            extra: konst.ExtraBonusType.Flat,
            dest: konst.FlatBonusDest.BurstDmg,
            base: konst.FlatBonusBase.EnRec,
            value: 25,
            bound: { base: konst.FlatBonusBase.None, value: 75 },
        },
    },
    HuskOpulentDreams: {
        // 防御力+30%
        set2: { items: konst.StatusBonusType.DefBuf, value: 30 },
        // 
        set4: {
            items: [konst.StatusBonusType.DefBuf, konst.ElementBonusType.Geo],
            value: 6,
            limit: "artifact.hit_geo",
            stack: 4,
            times: 6,
        }
    },
    OceanHuedClam: {
        // 与える治療効果+15%
        set2: { items: konst.StatusBonusType.HealBuf, value: 15 },
        //
        // set4: {},
    },
} as const;

export const SubBonus = ["sub1", "sub2", "sub3", "sub4"] as const;
export type SubBonus = typeof SubBonus[number];

export interface IArtifactData extends IIdentify, INameable, ICommentable, Record<SubBonus, BonusValue> {
    name: ArtifactName;
    star: number;
    level: number;
    main: BonusValue;
}
export type DBArtifactTable = Record<konst.ArtifactType, IArtifactData[]>;

type ArtifactParam = {
    readonly intercept: number;
    readonly slope: number;
    readonly substep?: number;
};
type ArtifactParamType = "hp" | "atk" | "def" | "atk_buf" | "def_buf" | "en_rec" | "cri_rate" | "cri_dmg" | "heal_buf";

const ArtifactTable: ReadonlyArray<ReadonlyRecord<ArtifactParamType, ArtifactParam>> = [
    // ☆☆☆
    {
        hp: { intercept: 430, slope: 121.8846154, substep: 14.3 }, // HP
        atk: { intercept: 28, slope: 7.89010989, substep: 0.9 }, // 攻撃力
        def: { intercept: 21, slope: 5.917582418, substep: 1.1 }, // 防御力,元素熟知
        atk_buf: { intercept: 5.2, slope: 1.488461538, substep: 0.35 }, // HP(%),攻撃力(%),元素ダメージ
        def_buf: { intercept: 6.6, slope: 1.854945055, substep: 0.44 }, // 防御力(%),物理ダメージ
        en_rec: { intercept: 5.8, slope: 1.65, substep: 0.39 }, // 元素チャージ効率
        cri_rate: { intercept: 3.5, slope: 0.989010989, substep: 0.23 }, // 会心率
        cri_dmg: { intercept: 7.0, slope: 1.980769231, substep: 0.47 }, // 会心ダメージ
        heal_buf: { intercept: 4.0, slope: 1.145054945 }, // 与える治療効果
    },
    // ☆☆☆☆
    {
        hp: { intercept: 645, slope: 182.8529412, substep: 23.9 },
        atk: { intercept: 42, slope: 11.8995098, substep: 1.6 },
        def: { intercept: 25, slope: 7.137254902, substep: 1.9 },
        atk_buf: { intercept: 6.3, slope: 1.782352941, substep: 0.47 },
        def_buf: { intercept: 7.9, slope: 2.22745098, substep: 0.58 },
        en_rec: { intercept: 7.0, slope: 1.980882353, substep: 0.52 },
        cri_rate: { intercept: 4.2, slope: 1.1875, substep: 0.31 },
        cri_dmg: { intercept: 8.4, slope: 2.377696078, substep: 0.62 },
        heal_buf: { intercept: 4.8, slope: 1.371813725 },
    },
    // ☆☆☆☆☆
    {
        hp: { intercept: 717, slope: 203.1597403, substep: 29.9 },
        atk: { intercept: 47, slope: 13.22597403, substep: 1.9 },
        def: { intercept: 28, slope: 7.932467532, substep: 2.3 },
        atk_buf: { intercept: 7, slope: 1.980909091, substep: 0.58 },
        def_buf: { intercept: 8.7, slope: 2.477402597, substep: 0.73 },
        en_rec: { intercept: 7.8, slope: 2.2, substep: 0.65 },
        cri_rate: { intercept: 4.7, slope: 1.321, substep: 0.39 },
        cri_dmg: { intercept: 9.3, slope: 2.646363636, substep: 0.78 },
        heal_buf: { intercept: 5.4, slope: 1.525324675 },
    }
] as const;

const ArtifactLevel = [12, 16, 20];

function getParam(type: konst.AnyBonusType, star: number, level: number): ArtifactParam | null {
    // ☆を正規化
    if (star < 3 || 5 < star) {
        return null;
    }
    star -= 3;
    // levelを正規化
    if (level < 0 || ArtifactLevel[star] < level) {
        return null;
    }

    const param = ArtifactTable[star];
    switch (type) {
        case konst.StatusBonusType.Hp:
        case konst.StatusBonusType.Atk:
        case konst.StatusBonusType.Def:
        case konst.StatusBonusType.AtkBuf:
        case konst.StatusBonusType.DefBuf:
        case konst.StatusBonusType.EnRec:
        case konst.StatusBonusType.HealBuf:
        case konst.CriticalBonusType.Rate:
        case konst.CriticalBonusType.Damage:
            return param[type];

        case konst.StatusBonusType.Elem:
            return param.def;

        case konst.StatusBonusType.HpBuf:
        case konst.ElementBonusType.Anemo:
        case konst.ElementBonusType.Geo:
        case konst.ElementBonusType.Elect:
        case konst.ElementBonusType.Hydro:
        case konst.ElementBonusType.Pyro:
        case konst.ElementBonusType.Cryo:
            return param.atk_buf;

        case konst.ElementBonusType.Phys:
            return param.def_buf;
    }
    return null;
}

function random(max: number): number {
    return Math.floor(Math.random() * max);
}

function randomSubStep(type: konst.AnyBonusType, star: number): number {
    const param = getParam(type, star, 0);
    if (param?.substep) {
        const rand = 7 + random(4); // 7~10
        return param.substep * rand;
    }
    return 0;
}

export default class Artifact {
    public static check(type: string): type is konst.ArtifactType {
        return konst.ArtifactTypes.includes(type as konst.ArtifactType);
    }

    public static create(
        id: string,
        type: konst.ArtifactType,
        name: ArtifactName,
        init: SettingArtifact
    ) {
        const data: IArtifactData = {
            id,
            name,
            comment: "",
            star: init.star,
            level: init.level,
            main: {
                type: ArtifactMain[type][0],
                value: 0,
            },
            sub1: {
                type: konst.BonusType.None,
                value: 0,
            },
            sub2: {
                type: konst.BonusType.None,
                value: 0,
            },
            sub3: {
                type: konst.BonusType.None,
                value: 0,
            },
            sub4: {
                type: konst.BonusType.None,
                value: 0,
            },
        };
        Artifact.main(data);
        return data;
    }

    public static star(data: IArtifactData) {
        if (data.star * 4 < data.level) {
            data.level = data.star * 4;
        }
        Artifact.main(data);
    }

    public static main(data: IArtifactData) {
        const param = getParam(data.main.type, data.star, data.level);
        if (param) {
            data.main.value = param.intercept + data.level * param.slope;
        } else {
            data.main.value = 0;
        }
    }

    public static score(data: IArtifactData, sub: SubBonus) {
        const bonus = data[sub];
        const param = getParam(bonus.type, data.star, data.level);
        if (param?.substep) {
            return Math.round(bonus.value / param.substep);
        }
        return undefined;
    }

    public static total(data: IArtifactData) {
        const { star, level } = data;
        if (star < 3) return "";
        let total = 0;
        for (const sub of SubBonus) {
            const score = Artifact.score(data, sub);
            if (score !== undefined) {
                total += score;
            }
        }
        const limit = star * 10 - 10 + // 初期最大値
            Math.floor(level / 4) * 10; // 強化回数x10
        return `${total}/${limit}`;
    }

    public static shuffle(data: IArtifactData, types: konst.AnyBonusType[]) {
        const { star, level } = data;
        if (star < 3 || 5 < star) return;

        const min = types.reduce(
            (cnt, val) => (val === konst.BonusType.None ? cnt : cnt + 1),
            0
        );
        types.push(data.main.type); // メイン効果と同じものはでない
        types.push(konst.BonusType.None); // ArtifactSub[0]を除去する

        // サブ効果の強化回数
        var max = star - 1; // Lv.0の最大回数
        max -= Math.round(Math.random()); // ランダムで1回少ない
        max += Math.floor(level / 4);
        max = Math.max(min, max);

        const init = Math.min(max, 4);

        // サブ効果のタイプを選択
        const range = ArtifactSub.length;
        for (var i = 0; i < init; ++i) {
            while (types[i] === konst.BonusType.None) {
                const type = ArtifactSub[random(range)];
                if (!types.includes(type)) {
                    types[i] = type;
                }
            }
        }

        // 初期値設定
        for (var i = 0; i < init; ++i) {
            const type = types[i];
            let bonus = data[SubBonus[i]];
            bonus.type = type;
            bonus.value = randomSubStep(type, star);
        }
        for (var i = init; i < 4; ++i) {
            let bonus = data[SubBonus[i]];
            bonus.type = konst.BonusType.None;
            bonus.value = 0;
        }

        // 強化値加算
        for (var n = 4; n < max; ++n) {
            const i = random(4);
            data[SubBonus[i]].value += randomSubStep(types[i], star);
        }
    }
}
