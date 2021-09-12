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
import { GlobalEquipData } from "~/src/interface";
import { GlobalCharaData } from "~/src/character";
import { GlobalWeaponData } from "~/src/weapon";
import { GlobalArtifactData } from "~/src/artifact";
import { GlobalTeamData, getTeamName } from "~/src/team";
import { GlobalBonusData, BonusBase, BonusBuilder } from "~/src/bonus";

@Component({
  name: "PageBonus",
  components: {
    SelectRange: () => import("~/components/SelectRange.vue"),
  },
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

  get items() {
    if (this.tab >= 0) {
      return this.teams[this.tab].data;
    }
    return [];
  }

  created() {
    this.globals = this.$globals;
    this.$store.commit("setAppendable", false);
  }

  mounted() {
    const text = this.$t("menu.team");
    let builder = new BonusBuilder(this, this.globals.bonus);
    this.globals.team.forEach((t, i) => {
      const key = getTeamName(text, t, i);
      const data = builder.build(t, this.globals);
      this.teams.push({ key, data });
      this.tab = 0;
    });
    this.globals.bonus = builder.output;
  }
}
</script>
