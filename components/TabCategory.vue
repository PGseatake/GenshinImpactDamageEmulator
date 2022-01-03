<template>
  <v-tabs v-model="tab" centered center-active show-arrows>
    <v-tab v-for="item of tabs" :key="item.key">{{
      item.text ? item.text : $t(item.label)
    }}</v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "TabCategory" })
export default class TabCategory extends Vue {
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
