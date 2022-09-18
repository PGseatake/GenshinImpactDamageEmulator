<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs-items v-model="tab" :touchless="!$vuetify.breakpoint.xs">
      <v-tab-item v-for="t of types" :key="t">
        <weapon-data :type="t" />
      </v-tab-item>
    </v-tabs-items>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>
  </v-container>
</template>

<style lang="scss" scoped>
.container {
  max-width: 800px;
}
</style>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mdiPlaylistPlus } from "@mdi/js";
import { WeaponTypes } from "~/src/const";
import WeaponData from "~/components/equip/WeaponData.vue";

@Component({
  name: "PageWeapon",
  components: { WeaponData },
})
export default class PageWeapon extends Vue {
  get types() {
    return WeaponTypes;
  }

  get icons() {
    return { append: mdiPlaylistPlus };
  }

  get tab() {
    return this.$store.getters.tab;
  }
  set tab(value: number) {
    this.$store.commit("tab", value);
  }

  get type() {
    return this.types[this.tab];
  }

  get append() {
    return this.$store.getters.append;
  }

  @Watch("append")
  onChangeAppend(value: any) {
    if (value === true) {
      this.$store.commit("append", this.type);
    }
  }

  created() {
    this.$store.commit("appendable", true);
    this.$store.commit("tabs", {
      tab: "weapon",
      items: WeaponTypes.map((item) => ({
        key: item,
        label: "tab." + item,
      })),
    });
  }

  onBeforeAppend() {
    this.$store.commit("append", this.type);
  }
}
</script>
