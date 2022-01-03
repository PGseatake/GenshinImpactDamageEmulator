<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <bonus-table :items="items" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { DBEquipTable } from "~/src/interface";
import { DBCharaTable } from "~/src/character";
import { DBWeaponTable } from "~/src/weapon";
import { DBArtifactTable } from "~/src/artifact";
import { DBTeamTable, Team } from "~/src/team";
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
  teams: Array<BonusBase[]> = [];

  get tab() {
    return this.$store.getters.tab;
  }
  set tab(value: number) {
    this.$store.commit("tab", value);
  }

  get items() {
    return this.teams[this.tab] || [];
  }

  created() {
    this.db = this.$db;
    this.$store.commit("appendable", false);
    this.$store.commit("tabs", {});
  }

  mounted() {
    let builder = new BonusBuilder(this.$i18n, this.db.bonus);
    let names: { key: number; text: string }[] = [];
    this.db.team.forEach((t, i) => {
      this.teams.push(builder.build(t, this.db));
      names.push({ key: i, text: new Team(t).getName(this.$i18n, i) });
    });
    this.db.bonus = builder.output;

    this.$store.commit("tabs", { tab: "bonus", items: names });
  }
}
</script>
