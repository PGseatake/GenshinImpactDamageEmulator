<template>
  <v-container class="container">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="sword">
        <v-weapon-data type="sword" :items="swords" />
      </v-tab-item>
      <v-tab-item key="claymore">
        <v-weapon-data type="claymore" :items="claymores" />
      </v-tab-item>
      <v-tab-item key="polearm">
        <v-weapon-data type="polearm" :items="polearms" />
      </v-tab-item>
      <v-tab-item key="bow">
        <v-weapon-data type="bow" :items="bows" />
      </v-tab-item>
      <v-tab-item key="catalyst">
        <v-weapon-data type="catalyst" :items="catalysts" />
      </v-tab-item>
    </v-tabs-items>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <v-append-dialog
      max-width="300px"
      :type="type"
      :items="names"
      @append="onAppend"
    />
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
import { IWeaponData } from "~/src/interface";
import { WeaponTypes } from "~/src/const";
import { WeaponList, WeaponNames } from "~/src/weapon";

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

  get type() {
    return this.types[this.tab];
  }

  get names() {
    return WeaponNames[this.type].map((name) => ({
      text: this.$t(["weapon", this.type, name].join(".")),
      value: name,
    }));
  }

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

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend(name: string) {
    const konst = WeaponList[this.type][name];
    const store: { type: string; data: IWeaponData } = {
      type: this.type,
      data: {
        id: this.$makeUniqueId(),
        name: name,
        comment: "",
        rank: 1,
        level: "1",
        atk: konst.atk[0],
        second: {
          type: konst.second,
          value: konst.secval[0],
        },
      },
    };
    this.$store.commit("appendData", store);
  }
}
</script>
