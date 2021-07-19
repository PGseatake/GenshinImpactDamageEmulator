<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="(items, key) in teams" :key="key">{{ key }}</v-tab>
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
        <td :colspan="headers.length" class="v-row-group__header">
          {{ group }}
        </td>
      </template>
      <template #[`item.source`]="{ item }">
        {{ $t(item.source) }}
      </template>
      <template #[`item.stack`]="{ item }">
        {{ item.stack || "-" }}
      </template>
      <template #[`item.times`]="{ item }">
        {{ item.times || "-" }}
      </template>
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
import { GlobalEquipData, GlobalTeamData, Members } from "~/src/interface";
import { ArtifactTypes } from "~/src/const";
import {
  BonusBase,
  getCharaBonus,
  getWeaponBonus,
  getArtifactBonus,
} from "~/src/bonus";
import { CharaList, GlobalCharaData } from "~/src/character";
import { GlobalWeaponData } from "~/src/weapon";
import { ArtifactName, GlobalArtifactData } from "~/src/artifact";

@Component({
  name: "PageBonus",
  components: {},
})
export default class PageBonus extends Vue {
  globals: GlobalTeamData &
    GlobalEquipData &
    GlobalCharaData &
    GlobalWeaponData &
    GlobalArtifactData = {
    team: [],
    equip: [],
    chara: [],
    sword: [],
    claymore: [],
    polearm: [],
    bow: [],
    catalyst: [],
    flower: [],
    feather: [],
    sands: [],
    goblet: [],
    circlet: [],
  };
  tab: number = -1;
  teams: IDict<BonusBase[]> = {};

  readonly headers: ReadonlyArray<DataTableHeader> = [
    { text: this.$t("tab.source") as string, value: "source" },
    { text: this.$t("tab.condition") as string, value: "condition" },
    { text: this.$t("tab.stack") as string, value: "stack", align: "center" },
    { text: this.$t("tab.times") as string, value: "times", align: "center" },
  ];

  get items() {
    if (this.tab >= 0) {
      return Object.values(this.teams)[this.tab];
    }
    return undefined;
  }

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  created() {
    this.globals = this.$globals;
    this.$store.commit("setAppendable", false);
  }

  mounted() {
    const { team, equip, chara } = this.globals;
    team.forEach((t, i) => {
      let bonus: BonusBase[] = [];
      Members.forEach((key, j) => {
        const member = t[key];
        if (member) {
          const e = equip.find((item) => item.id === member);
          if (e) {
            const c = chara.find((item) => item.id === e.chara);
            if (c) {
              const group = `${j + 1}. ${this.$t("chara." + c.name)}`;
              // キャラボーナス追加
              bonus.push(...getCharaBonus(this, c, group));
              // 武器ボーナス追加
              {
                const type = CharaList[c.name].weapon;
                const weapon = this.globals[type].find(
                  (item) => item.id === e.weapon
                );
                if (weapon) {
                  bonus.push(...getWeaponBonus(this, type, weapon, group));
                }
              }
              // 聖遺物ボーナス追加
              let artifacts: ArtifactName[] = [];
              for (const type of ArtifactTypes) {
                const artifact = this.globals[type].find(
                  (item) => item.id === e[type]
                );
                if (artifact) {
                  artifacts.push(artifact.name);
                }
              }
              bonus.push(...getArtifactBonus(this, artifacts, group));
            }
          }
        }
      });
      bonus.sort(
        (a, b) =>
          a.group.localeCompare(b.group) ||
          a.index.localeCompare(b.index) ||
          a.source.localeCompare(b.source)
      );
      const caption = t.name || this.$t("menu.team") + (i + 1).toString();
      this.$set(this.teams, caption, bonus);
      this.tab = 0;
    });
  }
}
</script>
