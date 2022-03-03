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
import { IMember } from "~/src/team";
import Status from "~/src/status";
import Enemy from "~/src/enemy";
import { BonusBase } from "~/src/bonus";
import { IDamageData, Attribute, IAttribute } from "~/src/damage";
import { SettingCritical } from "~/src/setting";

interface IAttrItem extends IAttribute {
  enemy: Enemy;
  group: number;
}

@Component({
  name: "DamageTable",
  inheritAttrs: false,
})
export default class DamageTable extends Vue {
  @Prop({ required: true }) data!: Readonly<IDamageData>;
  @Prop({ required: true }) leader!: Readonly<IMember>;
  @Prop({ required: true }) party!: ReadonlyArray<Status>;
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

  get status() {
    return this.party[this.leader.index];
  }

  get items() {
    let items: IAttrItem[] = [];
    let status = this.status;
    if (status) {
      let enemy = new Enemy(this.data, status.reduct);
      const info = this.leader.info;
      if (info) {
        let talent: TalentType = TalentType.Combat;
        for (const data of info.talent.combat) {
          items.push({ ...data, talent, enemy, group: 0 });
        }
        talent = TalentType.Skill;
        for (const data of info.talent.skill) {
          items.push({ ...data, talent, enemy, group: 1 });
        }
        talent = TalentType.Burst;
        for (const data of info.talent.burst) {
          items.push({ ...data, talent, enemy, group: 2 });
        }
      }
    }
    return items;
  }

  get critical() {
    return this.$db.setting.critical as SettingCritical;
  }

  formatGroup(group: number) {
    const type = TalentTypes[group];
    return `${this.$t("combat." + type)} : ${this.$t("general.level")}${
      this.status.talent[type]
    }`;
  }

  makeHtml(item: IAttrItem) {
    let attr = new Attribute(item, this.data, this.status, this.party);
    let html = `<td>${this.$h("combat." + item.name)}</td>` + attr.head();
    const crit = this.critical;
    const cells = attr.make(crit, item.enemy, this.bonus);
    const len = crit === SettingCritical.Both ? 6 : 4;
    for (let i = 0; i < len; ++i) {
      if (i < cells.length) {
        html += cells[i];
      } else {
        html += "<td></td>";
      }
    }
    return html;
  }
}
</script>
