<template>
  <v-container class="container">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="sword">
        <v-weapon-data type="sword" :items="sword" @remove="onBeforeRemove" />
      </v-tab-item>
      <v-tab-item key="claymore">
        <v-weapon-data
          type="claymore"
          :items="claymore"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
      <v-tab-item key="polearm">
        <v-weapon-data
          type="polearm"
          :items="polearm"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
      <v-tab-item key="bow">
        <v-weapon-data type="bow" :items="bow" @remove="onBeforeRemove" />
      </v-tab-item>
      <v-tab-item key="catalyst">
        <v-weapon-data
          type="catalyst"
          :items="catalyst"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
    </v-tabs-items>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <v-append-dialog
      :disabled="!append"
      :title="'tab.' + type"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <v-select v-model="append" :items="names" />
    </v-append-dialog>
    <v-remove-dialog
      :title="$t('tab.' + type) + $t('dialog.remove')"
      :item="remove"
      :name="removeName"
      :exists="exists"
      max-width="300px"
      @accept="onRemove"
      @cancel="remove = null"
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
import { WeaponTypes } from "~/src/const";
import {
  WeaponList,
  WeaponNames,
  IWeaponData,
  GlobalWeaponData,
} from "~/src/weapon";

@Component({
  name: "PageWeapon",
  components: {
    VWeaponData: () => import("~/components/VWeaponData.vue"),
    VAppendDialog: () => import("~/components/VAppendDialog.vue"),
    VRemoveDialog: () => import("~/components/VRemoveDialog.vue"),
  },
})
export default class PageWeapon extends Vue {
  globals: GlobalWeaponData = {
    sword: [],
    claymore: [],
    polearm: [],
    bow: [],
    catalyst: [],
  };
  tab = 0;
  append = "";
  remove: IWeaponData | null = null;

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

  get removeName() {
    const name = this.remove?.name;
    return name ? this.$t(`weapon.${this.type}.${name}`) : "";
  }

  created() {
    this.globals = this.$globals;
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend() {
    const name = this.append;
    const item = WeaponList[this.type][name];
    const data: IWeaponData = {
      id: this.$makeUniqueId(),
      name: name,
      comment: "",
      rank: 1,
      level: "1",
      atk: item.atk[0],
      second: {
        type: item.second,
        value: item.secval[0],
      },
    };
    this.$appendData(this.globals[this.type], data);
    this.append = "";
  }

  onBeforeRemove(data: IWeaponData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.globals[this.type], this.remove);
      this.remove = null;
    }
  }

  exists(id: string): boolean {
    return !!this.$globals.equip.find((data) => data.weapon === id);
  }
}
</script>
