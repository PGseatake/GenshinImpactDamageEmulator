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
import { GlobalEquipData, GlobalTeamData, Members } from "~/src/interface";
import { ArtifactTypes } from "~/src/const";
import { BonusBase, GlobalBonusData, BonusBuilder } from "~/src/bonus";
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
    GlobalArtifactData &
    GlobalBonusData = {
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
    bonus: {},
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
    const { team, equip, chara, bonus } = this.globals;
    let builder = new BonusBuilder(this, bonus);
    this.globals.bonus = {};
    team.forEach((t, i) => {
      builder.team = t.id;
      let data: BonusBase[] = [];
      Members.forEach((key) => {
        const member = t[key];
        if (member) {
          const e = equip.find((item) => item.id === member);
          if (e) {
            builder.equip = e.id;
            const c = chara.find((item) => item.id === e.chara);
            if (c) {
              const idx = key.replace("member", "");
              builder.group = `${idx}. ${this.$t("chara." + c.name)}`;
              // キャラボーナス追加
              data.push(...builder.charaBonus(c));
              // 武器ボーナス追加
              {
                const type = CharaList[c.name].weapon;
                const weapon = this.globals[type].find(
                  (item) => item.id === e.weapon
                );
                if (weapon) {
                  data.push(...builder.weaponBonus(type, weapon));
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
              data.push(...builder.artifactBonus(artifacts));
            }
          }
        }
      });
      data.push(...builder.resonanceBonus(t.resonance));
      data.sort(
        (a, b) =>
          a.group.localeCompare(b.group) ||
          a.index - b.index ||
          a.source.localeCompare(b.source)
      );
      const key = t.name || `${this.$t("menu.team")}${i + 1}`;
      this.$set(this.teams, key, data);
      this.tab = 0;
    });
    this.globals.bonus = builder.output;
  }

  formatTimes(value: number) {
    return value ? `${value}${this.$t("general.sec")}` : "-";
  }
}
</script>
