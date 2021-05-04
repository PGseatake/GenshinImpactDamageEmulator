<template>
  <v-container>
    <v-tabs v-model="tab" centered>
      <v-tab v-for="(_, key) of info()" :key="key">{{
        $t("tab." + key)
      }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(value, key) of info()" :key="key">
        <v-artifact-data :types="value" :items="$gideData[key]" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ArtifactMain } from "~/src/const";
const VArtifactData = () => import("~/components/VArtifactData.vue");

@Component({
  components: { VArtifactData },
})
export default class PageArtifact extends Vue {
  tab: number = 0;

  info() {
    return ArtifactMain;
  }
}
</script>
