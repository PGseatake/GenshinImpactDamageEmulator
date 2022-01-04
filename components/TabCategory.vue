<template>
  <v-tabs v-model="tab" centered center-active show-arrows>
    <v-tab v-for="item of tabs" :key="item.key">
      {{ item.text ? item.text(item) : $t(item.label) }}
      <v-btn
        v-if="item.close"
        icon
        tile
        x-small
        :ripple="false"
        @click.stop="item.close(item)"
      >
        <v-icon>{{ icons.remove }}</v-icon>
      </v-btn>
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { mdiClose } from "@mdi/js";
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "TabCategory" })
export default class TabCategory extends Vue {
  readonly icons = { remove: mdiClose };

  get tab() {
    return this.$store.getters.tab;
  }
  set tab(value: number) {
    if (value != null) {
      this.$store.commit("tab", value);
    }
  }

  get tabs() {
    return this.$store.getters.tabs;
  }
}
</script>
