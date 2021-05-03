<template>
  <v-artifact-data :types="sands()" :items="$gideData.artifact" />
</template>

<script lang="ts">
import Vue from "vue";
import VArtifactData from "~/components/VArtifactData.vue";
import { ArtifactMain } from "~/src/const";

export default Vue.component("Artifact", {
  components: { VArtifactData },
  methods: {
    flower() {
      return ArtifactMain.flower;
    },
    feather() {
      return ArtifactMain.feather;
    },
    sands() {
      return ArtifactMain.sands;
    },
    goblet() {
      return ArtifactMain.goblet;
    },
    circlet() {
      return ArtifactMain.circlet;
    },
  },
});
</script>
