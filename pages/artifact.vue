<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="flower">
        <v-artifact-data type="flower" :items="flowers" />
      </v-tab-item>
      <v-tab-item key="feather">
        <v-artifact-data type="feather" :items="feathers" />
      </v-tab-item>
      <v-tab-item key="sands">
        <v-artifact-data type="sands" :items="sands" />
      </v-tab-item>
      <v-tab-item key="goblet">
        <v-artifact-data type="goblet" :items="goblets" />
      </v-tab-item>
      <v-tab-item key="circlet">
        <v-artifact-data type="circlet" :items="circlets" />
      </v-tab-item>
    </v-tabs-items>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <v-append-dialog
      max-width="300px"
      :type="type"
      :items="names"
      @append="onAppend"
    />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiPlaylistPlus } from "@mdi/js";
import { IArtifactData } from "~/src/interface";
import { ArtifactTypes, BonusType } from "~/src/const";
import { ArtifactNames } from "~/src/artifact";

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

  get type() {
    return this.types[this.tab];
  }

  get names() {
    return ArtifactNames.map((name) => ({
      text: this.$t(["artifact", this.type, name].join(".")),
      value: name,
    }));
  }

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

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend(name: string) {
    const store: { type: string; data: IArtifactData } = {
      type: this.type,
      data: {
        id: this.$makeUniqueId(),
        name: name,
        comment: "",
        star: 3,
        level: "0",
        main: {
          type: BonusType.None,
          value: 0,
        },
        sub1: {
          type: BonusType.None,
          value: 0,
        },
        sub2: {
          type: BonusType.None,
          value: 0,
        },
        sub3: {
          type: BonusType.None,
          value: 0,
        },
        sub4: {
          type: BonusType.None,
          value: 0,
        },
      },
    };
    this.$store.commit("appendData", store);
  }
}
</script>
