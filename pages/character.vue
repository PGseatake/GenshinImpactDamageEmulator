<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-character-data :items="charas" @remove="onRemove" />

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <v-append-dialog
      max-width="300px"
      type="character"
      :items="names"
      @append="onAppend"
    />
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
    VCharacterData: () => import("~/components/VCharacterData.vue"),
    VAppendDialog: () => import("~/components/VAppendDialog.vue"),
  },
})
export default class PageCharacter extends Vue {
  globals: GlobalCharaData = { chara: [] };

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

  onAppend(name: string) {
    const konst = CharaList[name as CharaName];
    const item: ICharaData = {
      id: this.$makeUniqueId(),
      name: name,
      comment: "",
      conste: 0,
      level: "1",
      hp: konst.status.hp[0],
      atk: konst.status.atk[0],
      def: konst.status.def[0],
      special: {
        type: konst.special,
        value: konst.spvalue[0],
      },
      combat: 1,
      skill: 1,
      burst: 1,
    };
    this.$appendData(this.globals.chara, item);
  }

  onRemove(item: ICharaData) {
    this.$removeData(this.globals.chara, item);
  }
}
</script>
