<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="flower">
        <v-artifact-data type="flower" :items="flowers" :append="append" />
      </v-tab-item>
      <v-tab-item key="feather">
        <v-artifact-data type="feather" :items="feathers" :append="append" />
      </v-tab-item>
      <v-tab-item key="sands">
        <v-artifact-data type="sands" :items="sands" :append="append" />
      </v-tab-item>
      <v-tab-item key="goblet">
        <v-artifact-data type="goblet" :items="goblets" :append="append" />
      </v-tab-item>
      <v-tab-item key="circlet">
        <v-artifact-data type="circlet" :items="circlets" :append="append" />
      </v-tab-item>
    </v-tabs-items>

    <v-btn fab small @click="onAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiPlaylistPlus } from "@mdi/js";
import { ArtifactTypes } from "~/src/const";

@Component({
  name: "PageArtifact",
  components: { VArtifactData: () => import("~/components/VArtifactData.vue") },
})
export default class PageArtifact extends Vue {
  tab: number = 0;

  readonly types = ArtifactTypes;
  readonly icons: IReadonlyMap<string> = {
    append: mdiPlaylistPlus,
  };

  get flowers() {
    return this.$store.state.data.flower;
  }

  get feathers() {
    return this.$store.state.data.feather;
  }

  get sands() {
    return this.$store.state.data.sands;
  }

  get goblets() {
    return this.$store.state.data.goblet;
  }

  get circlets() {
    return this.$store.state.data.circlet;
  }

  get append() {
    if (this.$store.state.append) {
      return ArtifactTypes[this.tab];
    }
    return "";
  }

  onAppend() {
    this.$store.commit("setAppend", true);
  }
}
</script>
