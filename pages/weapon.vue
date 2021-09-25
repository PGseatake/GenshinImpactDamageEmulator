<template>
  <v-container class="container">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="sword">
        <weapon-data type="sword" :items="sword" @remove="onBeforeRemove" />
      </v-tab-item>
      <v-tab-item key="claymore">
        <weapon-data
          type="claymore"
          :items="claymore"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
      <v-tab-item key="polearm">
        <weapon-data type="polearm" :items="polearm" @remove="onBeforeRemove" />
      </v-tab-item>
      <v-tab-item key="bow">
        <weapon-data type="bow" :items="bow" @remove="onBeforeRemove" />
      </v-tab-item>
      <v-tab-item key="catalyst">
        <weapon-data
          type="catalyst"
          :items="catalyst"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
    </v-tabs-items>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <dialog-append
      :disabled="!append"
      :title="'tab.' + type"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <v-select v-model="append" :items="names" />
    </dialog-append>
    <dialog-remove
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
  DBWeaponTable,
} from "~/src/weapon";

@Component({
  name: "PageWeapon",
  components: {
    WeaponData: () => import("~/components/WeaponData.vue"),
    DialogAppend: () => import("~/components/DialogAppend.vue"),
    DialogRemove: () => import("~/components/DialogRemove.vue"),
  },
})
export default class PageWeapon extends Vue {
  db: DBWeaponTable = {
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
  readonly icons: IReadonlyDict<string> = {
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
    return this.db.sword;
  }

  get claymore() {
    return this.db.claymore;
  }

  get polearm() {
    return this.db.polearm;
  }

  get bow() {
    return this.db.bow;
  }

  get catalyst() {
    return this.db.catalyst;
  }

  get removeName() {
    const name = this.remove?.name;
    return name ? this.$t(`weapon.${this.type}.${name}`) : "";
  }

  created() {
    this.db = this.$db;
    this.$store.commit("setAppendable", true);
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend() {
    const name = this.append;
    if (name) {
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
      this.$appendData(this.db[this.type], data);
      this.append = "";
    }
  }

  onBeforeRemove(data: IWeaponData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.db[this.type], this.remove);
      this.remove = null;
    }
  }

  exists(id: string): boolean {
    return !!this.$db.equip.find((data) => data.weapon === id);
  }
}
</script>
