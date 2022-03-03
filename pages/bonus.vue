<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <bonus-table :items="bonus" :status="status" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { BonusBase, BonusBuilder } from "~/src/bonus";
import { Team } from "~/src/team";
import Status from "~/src/status";
import BonusTable from "~/components/damage/BonusTable.vue";

@Component({
  name: "PageBonus",
  components: { BonusTable },
})
export default class PageBonus extends Vue {
  status: Status[] = [];
  bonus: BonusBase[] = [];

  get tab() {
    return this.$store.getters.tab;
  }
  set tab(value: number) {
    this.$store.commit("tab", value);
  }

  @Watch("tab")
  onChangeTab(value: number) {
    this.status.splice(0);
    this.bonus.splice(0);

    const team = this.$db.team[value];
    if (team) {
      let builder = new BonusBuilder(this.$i18n, this.$db.bonus);
      for (const member of new Team(team).members(this.$db)) {
        let status = new Status(Status.empty());
        status.equip(member, this.$db);
        this.status.push(status);
      }
      this.bonus.push(...builder.build(team, this.$db));
    }
  }

  created() {
    this.$store.commit("appendable", false);
    this.$store.commit("tabs", {});
  }

  mounted() {
    const i18n = this.$i18n;
    this.$store.commit("tabs", {
      tab: "bonus",
      items: this.$db.team.map((t, i) => ({
        key: t.id,
        text: () => Team.format(t, i, i18n),
      })),
    });

    // ボーナスデータの正規化
    let builder = new BonusBuilder(i18n, this.$db.bonus);
    for (const t of this.$db.team) {
      builder.build(t, this.$db);
    }
    this.$db.bonus = builder.output;

    this.onChangeTab(this.tab);
  }
}
</script>
