<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    :class="tableClass"
    :items-per-page="-1"
    group-by="talent"
    dense
    disable-sort
    fixed-header
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
import { TalentType } from "~/src/const";
import { ICombat } from "~/src/interface";
import { IMember } from "~/src/team";
import { IStatus, Status } from "~/src/status";
import { IDamageData, CombatAttribute, Enemy } from "~/src/damage";

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
  @Prop({ required: true }) data!: Readonly<IDamageData>;
  @Prop({ required: true }) member!: Readonly<IMember>;
  @Prop({ required: true }) status!: IStatus;

  readonly headers = [
    { text: "", value: "name" },
    { text: this.$t("general.rate"), value: "rate", align: "right" },
    { text: this.$t("general.damage"), value: "damage", align: "right" },
    { text: this.$t("damage.critical"), value: "critical", align: "right" },
    { text: this.$t("damage.reaction"), value: "element", align: "right" },
    { text: this.$t("damage.critical"), value: "elem_cri", align: "right" },
  ];

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get items() {
    let status = new Status(this.status, this.data.contact);
    status.chara = this.member.chara;
    let enemy = new Enemy(this.data, this.status.reduct);
    let items: IAttribute[] = [];
    const info = this.member.info;
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
    let html = `<td>${item.name}</td>` + attr.toHtml();
    const damage = attr.damage(
      item.status,
      item.enemy,
      this.data.reaction || undefined,
      this.data.contact || undefined
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
