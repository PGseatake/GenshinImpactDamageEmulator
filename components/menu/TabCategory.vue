<template>
  <v-toolbar v-bind="$attrs" color="#212121" class="extension">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="item of tabs" :key="item.key">
        {{ item.text }}
        <v-btn
          v-if="item.close"
          icon
          tile
          x-small
          :ripple="false"
          @click.stop="item.close(item.raw)"
        >
          <v-icon>{{ icons.remove }}</v-icon>
        </v-btn>
      </v-tab>
    </v-tabs>
  </v-toolbar>
</template>

<style lang="scss" scoped>
.extension {
  position: fixed;
  width: 100%;
  z-index: 3;
}
</style>

<script lang="ts">
import { mdiClose } from "@mdi/js";
import { Vue, Component } from "vue-property-decorator";

type TabItem = {
  key: string;
  text?: (item: TabItem) => string | string;
  label: string;
  close?: (item: TabItem) => void;
};

@Component({
  name: "TabCategory",
  inheritAttrs: false,
})
export default class TabCategory extends Vue {
  get icons() {
    return { remove: mdiClose };
  }

  get tab() {
    return this.$store.getters.tab;
  }
  set tab(value: number) {
    if (value != null) {
      this.$store.commit("tab", value);
    }
  }

  get tabs() {
    const i18n = this.$i18n;
    return this.$store.getters.tabs.map((v: TabItem) => ({
      key: v.key,
      text: v.text ? v.text(v) : i18n.t(v.label),
      close: v.close,
      raw: v,
    }));
  }
}
</script>
