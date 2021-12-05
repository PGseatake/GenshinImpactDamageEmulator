<template>
  <v-container class="container">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="t of types" :key="t">{{ $t("tab." + t) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
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
import WeaponData from "~/components/WeaponData.vue";

@Component({
  name: "PageWeapon",
  components: { WeaponData },
})
export default class PageWeapon extends Vue {
  tab = 0;

  readonly types = WeaponTypes;
  readonly icons = { append: mdiPlaylistPlus };

  get type() {
    return this.types[this.tab];
  }

  get append() {
    return this.$store.getters.append;
  }

  @Watch("append")
  onChangeAppend(value: any) {
    if (value === true) {
      this.$store.commit("setAppend", this.type);
    }
  }

  created() {
    this.$store.commit("setAppendable", true);
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", this.type);
  }
}
</script>
