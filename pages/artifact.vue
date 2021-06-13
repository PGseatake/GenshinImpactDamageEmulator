<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="flower">
        <v-artifact-data type="flower" :items="flower" @remove="onRemove" />
      </v-tab-item>
      <v-tab-item key="feather">
        <v-artifact-data type="feather" :items="feather" @remove="onRemove" />
      </v-tab-item>
      <v-tab-item key="sands">
        <v-artifact-data type="sands" :items="sands" @remove="onRemove" />
      </v-tab-item>
      <v-tab-item key="goblet">
        <v-artifact-data type="goblet" :items="goblet" @remove="onRemove" />
      </v-tab-item>
      <v-tab-item key="circlet">
        <v-artifact-data type="circlet" :items="circlet" @remove="onRemove" />
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
import { GlobalArtifactData, IArtifactData } from "~/src/interface";
import { ArtifactTypes, BonusType } from "~/src/const";
import { ArtifactMain, ArtifactNames } from "~/src/artifact";

@Component({
  name: "PageArtifact",
  components: {
    VArtifactData: () => import("~/components/VArtifactData.vue"),
    VAppendDialog: () => import("~/components/VAppendDialog.vue"),
  },
})
export default class PageArtifact extends Vue {
  globals: GlobalArtifactData = {
    flower: [],
    feather: [],
    sands: [],
    goblet: [],
    circlet: [],
  };
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

  get flower() {
    return this.globals.flower;
  }

  get feather() {
    return this.globals.feather;
  }

  get sands() {
    return this.globals.sands;
  }

  get goblet() {
    return this.globals.goblet;
  }

  get circlet() {
    return this.globals.circlet;
  }

  created() {
    this.globals = this.$globals;
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend(name: string) {
    const mains = ArtifactMain[this.type];
    const item: IArtifactData = {
      id: this.$makeUniqueId(),
      name: name,
      comment: "",
      star: 3,
      level: 0,
      main: {
        type: mains[0],
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
    };
    this.$appendData(this.globals[this.type], item);
  }

  onRemove(item: IArtifactData) {
    this.$removeData(this.globals[this.type], item);
  }
}
</script>
