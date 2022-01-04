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
import { DBTeamTable } from "~/src/team";
import { DBBonusTable, BonusBase, BonusBuilder } from "~/src/bonus";

type TabItem = {
  key: number;
  name: string;
  text: (item: TabItem) => string;
};

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
    const i18n = this.$i18n;
    const text = (item: TabItem) =>
      item.name || `${i18n.t("menu.team")}${item.key + 1}`;

    let names: TabItem[] = [];
    let builder = new BonusBuilder(i18n, this.db.bonus);
    this.db.team.forEach((t, i) => {
      this.teams.push(builder.build(t, this.db));
      names.push({ key: i, name: t.name, text });
    });
    this.db.bonus = builder.output;

    this.$store.commit("tabs", { tab: "bonus", items: names });
  }
}
</script>
