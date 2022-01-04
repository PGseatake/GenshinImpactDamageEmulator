<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs-items v-model="tab" :touchless="!$vuetify.breakpoint.xs">
      <v-tab-item v-for="t of types" :key="t">
        <artifact-data :type="t" />
      </v-tab-item>
    </v-tabs-items>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mdiPlaylistPlus } from "@mdi/js";
import { ArtifactTypes } from "~/src/const";
import ArtifactData from "~/components/ArtifactData.vue";

@Component({
  name: "PageArtifact",
  components: { ArtifactData },
})
export default class PageArtifact extends Vue {
  readonly types = ArtifactTypes;
  readonly icons = { append: mdiPlaylistPlus };

  get tab() {
    return this.$store.getters.tab;
  }
  set tab(value: number) {
    this.$store.commit("tab", value);
  }

  get type() {
    return this.types[this.tab];
  }

  get append() {
    return this.$store.getters.append;
  }

  @Watch("append")
  onChangeAppend(value: any) {
    if (value === true) {
      this.$store.commit("append", this.type);
    }
  }

  created() {
    this.$store.commit("appendable", true);
    this.$store.commit("tabs", {
      tab: "artifact",
      items: ArtifactTypes.map((item) => ({
        key: item,
        label: "tab." + item,
      })),
    });
  }

  onBeforeAppend() {
    this.$store.commit("append", this.type);
  }
}
</script>
