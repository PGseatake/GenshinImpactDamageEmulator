<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <chara-data :items="charas" @remove="onBeforeRemove" />

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <dialog-append
      :disabled="!append"
      title="menu.character"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <v-select v-model="append" :items="names" />
    </dialog-append>
    <dialog-remove
      :title="$t('menu.character') + $t('dialog.remove')"
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
import {
  CharaList,
  CharaName,
  CharaNames,
  ICharaData,
  GlobalCharaData,
} from "~/src/character";

@Component({
  name: "PageCharacter",
  components: {
    CharaData: () => import("~/components/CharaData.vue"),
    DialogAppend: () => import("~/components/DialogAppend.vue"),
    DialogRemove: () => import("~/components/DialogRemove.vue"),
  },
})
export default class PageCharacter extends Vue {
  globals: GlobalCharaData = { chara: [] };
  append: CharaName | "" = "";
  remove: ICharaData | null = null;

  readonly icons: IReadonlyDict<string> = {
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

  get removeName() {
    const name = this.remove?.name;
    return name ? this.$t(`chara.${name}`) : "";
  }

  created() {
    this.globals = this.$globals;
    this.$store.commit("setAppendable", true);
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend() {
    const name = this.append;
    if (name) {
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
  }

  onBeforeRemove(data: ICharaData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.globals.chara, this.remove);
      this.remove = null;
    }
  }

  exists(id: string): boolean {
    return !!this.$globals.equip.find((data) => data.chara === id);
  }
}
</script>
