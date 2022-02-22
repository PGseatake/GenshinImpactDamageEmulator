<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    :class="tableClass"
    :items-per-page="-1"
    group-by="group"
    dense
    disable-sort
    fixed-header
    hide-default-footer
    class="text-right"
  >
    <template #[`group.header`]="{ group, headers, isOpen, toggle }">
      <td
        :colspan="headers.length"
        class="v-row-group__header text-subtitle-2 text-center"
      >
        <v-icon size="20" @click="toggle">
          {{ isOpen ? icons.close : icons.open }}
        </v-icon>
        {{ formatGroup(group) }}
      </td>
    </template>
    <template #item="{ item }">
      <tr :key="item.name + item.group" v-html="makeHtml(item)" />
    </template>
  </v-data-table>
</template>

<style lang="scss" scoped>
.pc-data-table ::v-deep {
  tr:hover {
    background: inherit !important;
  }
  th {
    padding: 0 8px !important;
  }
  td {
    padding: 0 8px !important;
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
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import { TalentType, TalentTypes } from "~/src/const";
import { ICombat } from "~/src/interface";
import { IMember } from "~/src/team";
import Status, { IStatus } from "~/src/status";
import Enemy from "~/src/enemy";
import { BonusBase } from "~/src/bonus";
import { IDamageData, CombatAttribute } from "~/src/damage";
import { SettingCritical } from "~/src/setting";

interface IAttribute extends ICombat {
  talent: TalentType;
  status: Status;
  enemy: Enemy;
  group: number;
}

@Component({
  name: "DamageTable",
  inheritAttrs: false,
})
export default class DamageTable extends Vue {
  @Prop({ required: true }) data!: Readonly<IDamageData>;
  @Prop({ required: true }) member!: Readonly<IMember>;
  @Prop({ required: true }) status!: Readonly<IStatus>;
  @Prop({ required: true }) bonus!: ReadonlyArray<BonusBase>;

  readonly icons = { open: mdiChevronDown, close: mdiChevronUp };

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get headers() {
    let headers = [
      { text: "", value: "", align: "right" },
      { text: this.$t("general.rate"), value: "", align: "right" },
      { text: this.$t("general.damage"), value: "", align: "right" },
    ];
    const i18n = this.$i18n;
    const crit = this.critical;
    const append = () => {
      if (crit !== SettingCritical.Expc) {
        headers.push({
          text: i18n.t("damage.critical"),
          value: "",
          align: "right",
        });
      } else {
        headers.push({
          text: i18n.t("damage.crit_expc"),
          value: "",
          align: "right",
        });
      }
      if (crit === SettingCritical.Both) {
        headers.push({
          text: i18n.t("damage.crit_both"),
          value: "",
          align: "right",
        });
      }
    };
    append();
    headers.push({
      text: this.$t("damage.reaction"),
      value: "",
      align: "right",
    });
    append();
    return headers;
  }

  get items() {
    let status = new Status(this.status);
    status.chara = this.member.chara;
    let enemy = new Enemy(this.data, this.status.reduct);
    let items: IAttribute[] = [];
    const info = this.member.info;
    if (info) {
      let talent: TalentType = TalentType.Combat;
      for (const data of info.talent.combat) {
        items.push({ ...data, talent, status, enemy, group: 0 });
      }
      talent = TalentType.Skill;
      for (const data of info.talent.skill) {
        items.push({ ...data, talent, status, enemy, group: 1 });
      }
      talent = TalentType.Burst;
      for (const data of info.talent.burst) {
        items.push({ ...data, talent, status, enemy, group: 2 });
      }
    }
    return items;
  }

  get critical() {
    return this.$db.setting.critical;
  }

  formatGroup(group: number) {
    const type = TalentTypes[group];
    return `${this.$t("combat." + type)} : ${this.$t("general.level")}${
      this.status.talent[type]
    }`;
  }

  makeHtml(item: IAttribute) {
    let attr = new CombatAttribute(
      item,
      item.status.talent[item.talent],
      this.$db.setting.critical as SettingCritical,
      this.bonus
    );
    let html = `<td>${this.$h("combat." + item.name)}</td>` + attr.toHtml();
    const damage = attr.damage(this.data, item.status, item.enemy);
    const len = this.critical === SettingCritical.Both ? 6 : 4;
    for (let i = 0; i < len; ++i) {
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
