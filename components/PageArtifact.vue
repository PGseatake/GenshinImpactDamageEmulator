<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types()" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="type of types()" :key="type">
        <v-artifact-data :type="type" :items="$gideData[type]" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ArtifactTypes } from "~/src/const";

@Component({
  name: "PageArtifact",
  components: { VArtifactData: () => import("~/components/VArtifactData.vue") },
})
export default class PageArtifact extends Vue {
  tab: number = 0;

  types() {
    return ArtifactTypes;
  }
}
</script>
