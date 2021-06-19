<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-chara-data :items="charas" @remove="onRemove" />

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <v-append-dialog
      :disabled="!append"
      title="menu.character"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <v-select v-model="append" :items="names" />
    </v-append-dialog>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiPlaylistPlus } from "@mdi/js";
import { GlobalCharaData, ICharaData } from "~/src/interface";
import { CharaList, CharaName, CharaNames } from "~/src/character";

@Component({
  name: "PageCharacter",
  components: {
    VCharaData: () => import("~/components/VCharaData.vue"),
    VAppendDialog: () => import("~/components/VAppendDialog.vue"),
  },
})
export default class PageCharacter extends Vue {
  globals: GlobalCharaData = { chara: [] };
  append = "";

  readonly icons: IReadonlyMap<string> = {
    append: mdiPlaylistPlus,
  };

  get names() {
    return CharaNames.map((name) => ({
      text: this.$t("chara." + name),
      value: name,
    }));
  }

  get charas() {
    return this.globals.chara;
  }

  created() {
    this.globals = this.$globals;
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend() {
    const name = this.append as CharaName;
    const item = CharaList[name];
    const data: ICharaData = {
      id: this.$makeUniqueId(),
      name: name,
      comment: "",
      conste: 0,
      level: "1",
      hp: item.status.hp[0],
      atk: item.status.atk[0],
      def: item.status.def[0],
      special: {
        type: item.special,
        value: item.spvalue[0],
      },
      combat: 1,
      skill: 1,
      burst: 1,
    };
    this.$appendData(this.globals.chara, data);
    this.append = "";
  }

  onRemove(data: ICharaData) {
    this.$removeData(this.globals.chara, data);
  }
}
</script>
