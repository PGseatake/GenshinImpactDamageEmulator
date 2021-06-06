<template>
  <v-container class="container">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="sword">
        <v-weapon-data type="sword" :items="sword" @remove="onRemove" />
      </v-tab-item>
      <v-tab-item key="claymore">
        <v-weapon-data type="claymore" :items="claymore" @remove="onRemove" />
      </v-tab-item>
      <v-tab-item key="polearm">
        <v-weapon-data type="polearm" :items="polearm" @remove="onRemove" />
      </v-tab-item>
      <v-tab-item key="bow">
        <v-weapon-data type="bow" :items="bow" @remove="onRemove" />
      </v-tab-item>
      <v-tab-item key="catalyst">
        <v-weapon-data type="catalyst" :items="catalyst" @remove="onRemove" />
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
import { GlobalWeaponData, IWeaponData } from "~/src/interface";
import { WeaponTypes } from "~/src/const";
import { WeaponList, WeaponNames } from "~/src/weapon";

@Component({
  name: "PageWeapon",
  components: { VWeaponData: () => import("~/components/VWeaponData.vue") },
})
export default class PageWeapon extends Vue {
  globals: GlobalWeaponData = {
    sword: [],
    claymore: [],
    polearm: [],
    bow: [],
    catalyst: [],
  };
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

  get sword() {
    return this.globals.sword;
  }

  get claymore() {
    return this.globals.claymore;
  }

  get polearm() {
    return this.globals.polearm;
  }

  get bow() {
    return this.globals.bow;
  }

  get catalyst() {
    return this.globals.catalyst;
  }

  created() {
    this.globals = this.$globals;
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend(name: string) {
    const konst = WeaponList[this.type][name];
    const item: IWeaponData = {
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
    };
    this.$appendData(this.globals[this.type], item);
  }

  onRemove(item: IWeaponData) {
    this.$removeData(this.globals[this.type], item);
  }
}
</script>
