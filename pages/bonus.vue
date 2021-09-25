<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="{ key } of teams" :key="key">{{ key }}</v-tab>
    </v-tabs>
    <bonus-table :items="items" />
  </v-container>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { DBEquipTable } from "~/src/interface";
import { DBCharaTable } from "~/src/character";
import { DBWeaponTable } from "~/src/weapon";
import { DBArtifactTable } from "~/src/artifact";
import { DBTeamTable, getTeamName } from "~/src/team";
import { DBBonusTable, BonusBase, BonusBuilder } from "~/src/bonus";

@Component({
  name: "PageBonus",
  components: {
    SelectRange: () => import("~/components/SelectRange.vue"),
  },
})
export default class PageBonus extends Vue {
  db!: DBTeamTable &
    DBEquipTable &
    DBCharaTable &
    DBWeaponTable &
    DBArtifactTable &
    DBBonusTable;
  tab: number = -1;
  teams: { key: string; data: BonusBase[] }[] = [];

  get items() {
    if (this.tab >= 0) {
      return this.teams[this.tab].data;
    }
    return [];
  }

  created() {
    this.db = this.$db;
    this.$store.commit("setAppendable", false);
  }

  mounted() {
    const text = this.$t("menu.team");
    let builder = new BonusBuilder(this, this.db.bonus);
    this.db.team.forEach((t, i) => {
      const key = getTeamName(text, t, i);
      const data = builder.build(t, this.db);
      this.teams.push({ key, data });
      this.tab = 0;
    });
    this.db.bonus = builder.output;
  }
}
</script>
