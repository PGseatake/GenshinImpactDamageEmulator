<template>
  <v-tabs-items v-model="selectedTab">
    <v-tab-item v-for="(value, key) of info()" :key="key">
      <v-artifact-data :types="value" :items="$gideData[key]" />
    </v-tab-item>
  </v-tabs-items>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ArtifactMain } from "~/src/const";
const VArtifactData = () => import("~/components/VArtifactData.vue");

@Component({
  components: { VArtifactData },
})
export default class PageArtifact extends Vue {
  @Prop({ required: true }) tab!: number;

  get selectedTab() {
    return this.tab;
  }
  set selectedTab(value: number) {
    this.$emit("update:tab", value);
  }

  info() {
    return ArtifactMain;
  }
}
</script>
