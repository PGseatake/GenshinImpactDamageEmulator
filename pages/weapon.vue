<template>
  <v-container class="container">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="sword">
        <v-weapon-data type="sword" :items="swords" :append="append" />
      </v-tab-item>
      <v-tab-item key="claymore">
        <v-weapon-data type="claymore" :items="claymores" :append="append" />
      </v-tab-item>
      <v-tab-item key="polearm">
        <v-weapon-data type="polearm" :items="polearms" :append="append" />
      </v-tab-item>
      <v-tab-item key="bow">
        <v-weapon-data type="bow" :items="bows" :append="append" />
      </v-tab-item>
      <v-tab-item key="catalyst">
        <v-weapon-data type="catalyst" :items="catalysts" :append="append" />
      </v-tab-item>
    </v-tabs-items>

    <v-btn fab small @click="onAppend" class="ma-1">
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
import { Vue, Component } from "vue-property-decorator";
import { mdiPlaylistPlus } from "@mdi/js";
import { WeaponTypes } from "~/src/const";

@Component({
  name: "PageWeapon",
  components: { VWeaponData: () => import("~/components/VWeaponData.vue") },
})
export default class PageWeapon extends Vue {
  tab: number = 0;

  readonly types = WeaponTypes;
  readonly icons: IReadonlyMap<string> = {
    append: mdiPlaylistPlus,
  };

  get swords() {
    return this.$store.state.data.sword;
  }

  get claymores() {
    return this.$store.state.data.claymore;
  }

  get polearms() {
    return this.$store.state.data.polearm;
  }

  get bows() {
    return this.$store.state.data.bow;
  }

  get catalysts() {
    return this.$store.state.data.catalyst;
  }

  get append() {
    if (this.$store.state.append) {
      return WeaponTypes[this.tab];
    }
    return "";
  }

  onAppend() {
    this.$store.commit("setAppend", true);
  }
}
</script>
