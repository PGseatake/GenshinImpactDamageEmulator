<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="type of types" :key="type">
        <v-artifact-data
          :type="type"
          :items="$gideData[type]"
          :append="append"
        />
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

  get append() {
    if (this.$store.state.append) {
      return ArtifactTypes[this.tab];
    }
    return "";
  }

  onAppend() {
    this.$store.commit("appendData", true);
  }
}
</script>
