<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="type of types" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="flower">
        <artifact-data
          type="flower"
          :items="db.flower"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
      <v-tab-item key="feather">
        <artifact-data
          type="feather"
          :items="db.feather"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
      <v-tab-item key="sands">
        <artifact-data
          type="sands"
          :items="db.sands"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
      <v-tab-item key="goblet">
        <artifact-data
          type="goblet"
          :items="db.goblet"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
      <v-tab-item key="circlet">
        <artifact-data
          type="circlet"
          :items="db.circlet"
          @remove="onBeforeRemove"
        />
      </v-tab-item>
    </v-tabs-items>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <dialog-append
      :disabled="!append"
      :title="'tab.' + type"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <v-select
        v-model="append"
        :items="names"
        :menu-props="{ auto: true, transition: false }"
      />
    </dialog-append>
    <dialog-remove
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
import { ArtifactTypes, BonusType } from "~/src/const";
import {
  ArtifactMain,
  ArtifactName,
  ArtifactNames,
  IArtifactData,
  DBArtifactTable,
} from "~/src/artifact";

@Component({
  name: "PageArtifact",
  components: {
    ArtifactData: () => import("~/components/ArtifactData.vue"),
    DialogAppend: () => import("~/components/DialogAppend.vue"),
    DialogRemove: () => import("~/components/DialogRemove.vue"),
  },
})
export default class PageArtifact extends Vue {
  db: DBArtifactTable = {
    flower: [],
    feather: [],
    sands: [],
    goblet: [],
    circlet: [],
  };
  tab = 0;
  append: ArtifactName | "" = "";
  remove: IArtifactData | null = null;

  readonly types = ArtifactTypes;
  readonly icons: IReadonlyDict<string> = {
    append: mdiPlaylistPlus,
  };

  get type() {
    return this.types[this.tab];
  }

  get names() {
    return ArtifactNames.map((name) => ({
      text: this.$t(`artifact.${this.type}.${name}`),
      value: name,
    }));
  }

  get removeName() {
    const name = this.remove?.name;
    return name ? this.$t(`artifact.${this.type}.${name}`) : "";
  }

  created() {
    this.db = this.$db;
    this.$store.commit("setAppendable", true);
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend() {
    const name = this.append;
    if (name) {
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
      this.$appendData(this.db[this.type], data);
      this.append = "";
    }
  }

  onBeforeRemove(data: IArtifactData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.db[this.type], this.remove);
      this.remove = null;
    }
  }

  exists(id: string): boolean {
    return !!this.$db.equip.find((data) => data[this.type] === id);
  }
}
</script>
