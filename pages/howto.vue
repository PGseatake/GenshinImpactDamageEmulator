<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs-items v-model="tab" :touchless="!$vuetify.breakpoint.xs">
      <v-tab-item :value="0"><howto-chara /></v-tab-item>
      <v-tab-item :value="1"><howto-weapon /></v-tab-item>
      <v-tab-item :value="2"><howto-artifact /></v-tab-item>
      <v-tab-item :value="3"><howto-equip /></v-tab-item>
      <v-tab-item :value="4"><howto-team /></v-tab-item>
      <v-tab-item :value="5"><howto-bonus /></v-tab-item>
      <v-tab-item :value="6"><howto-damage /></v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {
  mdiAccount,
  mdiAccountMultiplePlus,
  mdiCalculatorVariant,
  mdiExpandAll,
  mdiRing,
  mdiSword,
  mdiTshirtCrew,
} from "@mdi/js";

@Component({
  name: "PageHowto",
  components: {
    HowtoChara: () => import("~/components/howto/HowtoChara.vue"),
    HowtoWeapon: () => import("~/components/howto/HowtoWeapon.vue"),
    HowtoArtifact: () => import("~/components/howto/HowtoArtifact.vue"),
    HowtoEquip: () => import("~/components/howto/HowtoEquip.vue"),
    HowtoTeam: () => import("~/components/howto/HowtoTeam.vue"),
    HowtoBonus: () => import("~/components/howto/HowtoBonus.vue"),
    HowtoDamage: () => import("~/components/howto/HowtoDamage.vue"),
  },
})
export default class PageHowto extends Vue {
  readonly items = [
    { icon: mdiAccount, name: "character" },
    { icon: mdiSword, name: "weapon" },
    { icon: mdiRing, name: "artifact" },
    { icon: mdiTshirtCrew, name: "equipment" },
    { icon: mdiAccountMultiplePlus, name: "team" },
    { icon: mdiExpandAll, name: "bonus" },
    { icon: mdiCalculatorVariant, name: "damage" },
  ];

  get tab() {
    return this.$store.getters.tab;
  }
  set tab(value: number) {
    this.$store.commit("tab", value);
  }

  created() {
    this.$store.commit("appendable", false);
    this.$store.commit("tabs", {
      tab: "howto",
      items: this.items.map((item) => ({
        key: item.name,
        label: "menu." + item.name,
      })),
    });
  }
}
</script>
