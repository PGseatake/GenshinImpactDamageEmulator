<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="flower">
        <v-artifact-data
          type="flower"
          :items="flower"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
      <v-tab-item key="feather">
        <v-artifact-data
          type="feather"
          :items="feather"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
      <v-tab-item key="sands">
        <v-artifact-data type="sands" :items="sands" @remove="onBeforeRemove" />
      </v-tab-item>
      <v-tab-item key="goblet">
        <v-artifact-data
          type="goblet"
          :items="goblet"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
      <v-tab-item key="circlet">
        <v-artifact-data
          type="circlet"
          :items="circlet"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
    </v-tabs-items>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <v-append-dialog
      :disabled="!append"
      :title="'tab.' + type"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <v-select v-model="append" :items="names" />
    </v-append-dialog>
    <v-remove-dialog
      :title="$t('tab.' + type) + $t('dialog.remove')"
      :item="remove"
      :name="removeName"
      :exists="exists"
      max-width="300px"
      @accept="onRemove"
      @cancel="remove = null"
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
    VRemoveDialog: () => import("~/components/VRemoveDialog.vue"),
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
  tab = 0;
  append = "";
  remove: IArtifactData | null = null;

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

  get removeName() {
    const name = this.remove?.name;
    return name ? this.$t(`artifact.${this.type}.${name}`) : "";
  }

  created() {
    this.globals = this.$globals;
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend() {
    const name = this.append;
    const data: IArtifactData = {
      id: this.$makeUniqueId(),
      name: name,
      comment: "",
      star: 3,
      level: 0,
      main: {
        type: ArtifactMain[this.type][0],
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
    this.$appendData(this.globals[this.type], data);
    this.append = "";
  }

  onBeforeRemove(data: IArtifactData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.globals[this.type], this.remove);
      this.remove = null;
    }
  }

  exists(id: string): boolean {
    return !!this.$globals.equip.find((data) => data[this.type] === id);
  }
}
</script>
