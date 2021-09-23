<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    :class="tableClass"
    :items-per-page="1000"
    group-by="talent"
    dense
    fixed-header
    disable-sort
    hide-default-footer
  >
    <template #[`group.header`]="{ group, headers }">
      <td
        :colspan="headers.length"
        class="v-row-group__header text-subtitle-2 text-center"
      >
        {{
          `${$t("combat." + group)} : ${$t("general.level")}${
            status.talent[group]
          }`
        }}
      </td>
    </template>
    <template #item="{ item }">
      <tr :key="item.key" v-html="makeHtml(item)" />
    </template>
  </v-data-table>
</template>

<style lang="scss" scoped>
.pc-data-table ::v-deep {
  tr:hover {
    background: inherit !important;
  }
  td.text-start {
    align-self: center;
    vertical-align: middle;
  }
}

.mb-data-table ::v-deep {
  td.v-data-table__mobile-row {
    padding: 0 12px;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  isAmplifyReaction,
  IStatus,
  ReactionFactorTable,
  Status,
} from "~/src/bonus";
import { Enemy, EnemyData } from "~/components/EnemyTable.vue";
import { CombatElementType, ICharacter, ICombat } from "~/src/interface";
import {
  CombatType,
  DamageBased,
  DamageScaleTable,
  ElementType,
  NoneElementType,
  NoneReactionType,
  ReactionType,
  TalentType,
} from "~/src/const";
import { ICharaData } from "~/src/character";

class Damage {
  public atk: number;
  public def: number;
  public flat: number;
  public value: ReadonlyArray<number>;
  public multi: number;
  public strike: boolean;

  constructor(
    atk: number,
    def: number,
    flat: number,
    value: ReadonlyArray<number>,
    multi: number
  ) {
    this.atk = atk;
    this.def = def;
    this.flat = flat;
    this.value = value;
    this.multi = multi;
    this.strike = false;
  }

  toHtml() {
    if (this.multi > 1) {
      const val = this.value[0];
      return `<td class="text-right">${this.calc(val)} x${this.multi}</td>`;
    }
    const through = this.strike
      ? " text-decoration-line-through text--disabled"
      : "";
    return (
      `<td class="text-right${through}">` +
      this.value.map((val) => this.calc(val)).join("<br>") +
      "</td>"
    );
  }

  private calc(val: number) {
    return (((val * this.atk + this.flat) * this.def) / 100).toFixed();
  }
}

function toScale(rate: number) {
  return 1.0 + rate / 100.0;
}

// 天賦の各種倍率
class CombatAttribute {
  public name: string;
  public type: CombatType;
  public elem: CombatElementType;
  public value: ReadonlyArray<number>;
  public multi: number;
  public based: DamageBased;

  constructor(info: ICombat, level: number) {
    const scale = DamageScaleTable[info.scale];
    const index = Math.min(Math.max(1, level), scale.length) - 1; // Math.clamp(level, 1, length) - 1
    this.name = info.name;
    this.type = info.type;
    this.elem = info.elem;
    if (Array.isArray(info.value)) {
      this.value = info.value.map((val) => (val * scale[index]) / 100);
    } else {
      this.value = [(info.value * scale[index]) / 100];
    }
    this.multi = info.multi ?? 1;
    this.based = info.based ?? DamageBased.Atk;
  }

  toHtml(vm: Vue) {
    if (this.multi > 1) {
      const val = this.value[0];
      return `<td class="text-right">${vm.$roundRate(val)} x${this.multi}</td>`;
    }
    return (
      `<td class="text-right">` +
      this.value.map((val) => vm.$roundRate(val)).join("<br>") +
      "</td>"
    );
  }

  damage(
    status: Status,
    enemy: Enemy,
    reaction?: ReactionType,
    contact?: ElementType
  ): string[] {
    let elem = this.elem;
    // 元素変化
    if (elem === CombatElementType.Contact) {
      if (!contact) return [];
      elem = contact;
      reaction = undefined;
    }
    // 元素付与
    if (elem === ElementType.Phys && status.enchant.type) {
      elem = status.enchant.type;
    }

    // 元素反応の正規化
    reaction = this.reaction(elem, reaction);

    // 攻撃力
    let attackPower: number;
    switch (this.based) {
      case DamageBased.Def:
        attackPower = status.def;
        break;
      default:
        attackPower = status.atk;
        break;
    }

    // 防御力
    const enemyDefence = enemy.defence(status.level) / 100;
    const enemyResist = enemy.resist(elem);

    // 各種倍率
    const combatBonus = status.combatBonus(this.type);
    const elementBonus = status.elementBonus(elem);
    const damageBonus = status.param.any_dmg;
    const combatScale = toScale(combatBonus + elementBonus + damageBonus);
    const critical = status.critical(this.type);
    const criticalScale = toScale(critical.damage);

    const atk = attackPower * combatScale;
    const def = enemyDefence * enemyResist;
    const flat = status.flat[this.type];
    const pair = (rate: number) => {
      return [
        this.toDamage(rate, def, flat), // 通常ダメージ
        this.toDamage(rate * criticalScale, def, flat), // 会心ダメージ
      ];
    };
    let damages = pair(atk);

    if (reaction) {
      const elementMaster = status.elementMaster(reaction);
      const reactionBonus = status.reactionBonus(reaction);

      if (isAmplifyReaction(reaction)) {
        // 蒸発と溶解は取り消し線で表示
        damages.forEach((d) => (d.strike = true));

        const reactionScale =
          toScale(elementMaster + reactionBonus) *
          status.reactionScale(reaction, elem);

        // 元素反応ダメージ
        damages.push(...pair(atk * reactionScale));
      } else {
        const reactionScale = toScale(elementMaster + reactionBonus);
        const reactionFactor = ReactionFactorTable[reaction];
        const reactionResist = enemy.resist(reactionFactor.resist);
        const reactionDamage =
          (reactionFactor.values[status.level - 1] ?? 0) *
          reactionScale *
          reactionResist;

        return [
          ...damages.map((val) => val.toHtml()),
          `<td class="text-right">${reactionDamage.toFixed()}</td>`, // 元素反応ダメージ
        ];
      }
    }
    return damages.map((val) => val.toHtml());
  }

  private toDamage(atk: number, def: number, flat: number) {
    return new Damage(atk, def, flat, this.value, this.multi);
  }

  private reaction(elem: ElementType, reaction?: ReactionType) {
    if (reaction === ReactionType.Shutter) {
      switch (elem) {
        case ElementType.Phys:
        case ElementType.Geo:
          return reaction;
      }
    } else if (elem !== ElementType.Phys) {
      return reaction;
    }
    return undefined;
  }
}

interface IAttribute extends ICombat {
  talent: TalentType;
  status: Status;
  enemy: Enemy;
  key: number;
}

@Component({
  name: "DamageTable",
  inheritAttrs: false,
})
export default class DamageTable extends Vue {
  @Prop({ required: true }) info!: ICharacter | null;
  @Prop({ required: true }) chara!: ICharaData | null;
  @Prop({ required: true }) enemy!: EnemyData;
  @Prop({ required: true }) status!: IStatus;
  @Prop({ required: true }) contact!: NoneElementType;
  @Prop({ required: true }) reaction!: NoneReactionType;

  readonly headers = [
    {
      text: "",
      value: "name",
    },
    {
      text: "倍率",
      value: "rate",
      align: "right",
    },
    {
      text: "ダメージ",
      value: "damage",
      align: "right",
    },
    {
      text: "ｸﾘﾃｨｶﾙ",
      value: "critical",
      align: "right",
    },
    {
      text: "元素反応",
      value: "element",
      align: "right",
    },
    {
      text: "ｸﾘﾃｨｶﾙ",
      value: "elem_cri",
      align: "right",
    },
  ];

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get items() {
    let status = new Status(this.status);
    status.chara = this.chara;
    let enemy = new Enemy(this.enemy, this.status.reduct);
    let items: IAttribute[] = [];
    const info = this.info;
    if (info) {
      let key = 1;
      for (const data of info.talent.combat) {
        items.push({ ...data, talent: TalentType.Combat, status, enemy, key });
        key++;
      }
      for (const data of info.talent.skill) {
        items.push({ ...data, talent: TalentType.Skill, status, enemy, key });
        key++;
      }
      for (const data of info.talent.burst) {
        items.push({ ...data, talent: TalentType.Burst, status, enemy, key });
        key++;
      }
    }
    return items;
  }

  makeHtml(item: IAttribute) {
    let attr = new CombatAttribute(item, item.status.talent[item.talent]);
    let html = `<td>${item.name}</td>` + attr.toHtml(this);
    const damage = attr.damage(
      item.status,
      item.enemy,
      this.reaction || undefined,
      this.contact || undefined
    );
    for (let i = 0; i < 4; ++i) {
      if (i < damage.length) {
        html += damage[i];
      } else {
        html += "<td></td>";
      }
    }
    return html;
  }
}
</script>
