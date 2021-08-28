<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="{ key } of teams" :key="key">{{ key }}</v-tab>
    </v-tabs>
    <v-data-table
      :headers="headers"
      :items="items"
      :class="tableClass"
      :items-per-page="1000"
      group-by="group"
      dense
      fixed-header
      disable-sort
      hide-default-footer
    >
      <template #[`group.header`]="{ group, headers }">
        <td
          :colspan="headers.length"
          class="v-row-group__header text-subtitle-2"
          style="vertical-align: middle; text-align: center"
        >
          {{ $t(group) }}
        </td>
      </template>
      <template #[`item.source`]="{ item }">{{ $t(item.source) }}</template>
      <template #[`item.stack`]="{ item }">
        <template v-if="item.stack">
          <v-select-range
            :min="0"
            :max="item.stack"
            :suffix="`/${item.stack}`"
            :value="item.stacks"
            @input="item.stacks = $event"
          />
        </template>
        <template v-else>-</template>
      </template>
      <template #[`item.times`]="{ item }">{{
        formatTimes(item.times)
      }}</template>
    </v-data-table>
  </v-container>
</template>

<style lang="scss" scoped>
.pc-data-table ::v-deep {
  tr:hover {
    background: inherit !important;
  }
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";
import { GlobalEquipData } from "~/src/interface";
import {
  Members,
  GlobalTeamData,
  getTeamName,
  getMember,
  getWeapon,
  getArtifacts,
} from "~/src/team";
import { BonusBase, BonusBuilder, GlobalBonusData } from "~/src/bonus";
import { GlobalCharaData } from "~/src/character";
import { GlobalWeaponData } from "~/src/weapon";
import { GlobalArtifactData } from "~/src/artifact";

@Component({
  name: "PageBonus",
  components: {},
})
export default class PageBonus extends Vue {
  globals!: GlobalTeamData &
    GlobalEquipData &
    GlobalCharaData &
    GlobalWeaponData &
    GlobalArtifactData &
    GlobalBonusData;
  tab: number = -1;
  teams: { key: string; data: BonusBase[] }[] = [];

  readonly headers: ReadonlyArray<DataTableHeader> = [
    { text: this.$t("tab.source") as string, value: "source" },
    { text: this.$t("tab.condition") as string, value: "condition" },
    { text: this.$t("tab.stack") as string, value: "stack", align: "center" },
    { text: this.$t("tab.times") as string, value: "times", align: "center" },
  ];

  get items() {
    if (this.tab >= 0) {
      return this.teams[this.tab].data;
    }
    return [];
  }

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  created() {
    this.globals = this.$globals;
    this.$store.commit("setAppendable", false);
  }

  mounted() {
    const text = this.$t("menu.team");
    let builder = new BonusBuilder(this, this.globals.bonus);
    this.globals.bonus = {};

    this.globals.team.forEach((t, i) => {
      builder.team = t.id;
      let data: BonusBase[] = [];
      for (const key of Members) {
        const { info, chara, equip } = getMember(t[key], this.globals);
        if (info && chara && equip) {
          builder.equip = equip.id;
          builder.group = "chara." + chara.name;

          // キャラボーナス追加
          data.push(...builder.charaBonus(chara));
          // 武器ボーナス追加
          const weapon = getWeapon(info, equip, this.globals);
          data.push(...builder.weaponBonus(weapon.type, weapon.data));
          // 聖遺物ボーナス追加
          const artifacts = getArtifacts(equip, this.globals);
          data.push(...builder.artifactBonus(artifacts));
        }
      }
      // 元素共鳴ボーナス追加
      data.push(...builder.resonanceBonus(t.resonance));
      data.sort(
        (a, b) =>
          a.group.localeCompare(b.group) ||
          a.index - b.index ||
          a.source.localeCompare(b.source)
      );
      const key = getTeamName(text, t, i);
      this.teams.push({ key, data });
      this.tab = 0;
    });
    this.globals.bonus = builder.output;
  }

  formatTimes(value: number) {
    return value ? `${value}${this.$t("general.sec")}` : "-";
  }
}
</script>
