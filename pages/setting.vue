<template>
  <v-container class="d-flex justify-center">
    <v-list width="600">
      <template v-for="(item, i) of dialogItems">
        <!-- カテゴリヘッダ -->
        <template v-if="item.icon === 'header'">
          <v-divider v-if="i" :key="'d' + i" />
          <v-subheader :key="'s' + i">{{
            $t("setting." + item.text)
          }}</v-subheader>
        </template>
        <!-- カテゴリアイテム -->
        <v-list-item v-else :key="i">
          <v-list-item-icon
            v-if="!$vuetify.breakpoint.xs"
            class="align-self-center"
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{
            $t("setting." + item.text)
          }}</v-list-item-content>
          <!-- スイッチタイプ -->
          <v-list-item-action v-if="item.switch" :class="itemClass">
            <setting-switch v-bind="item.switch" />
          </v-list-item-action>
          <!-- セレクトタイプ -->
          <v-list-item-action v-if="item.select" :class="itemClass">
            <setting-select v-bind="item.select" />
          </v-list-item-action>
          <!-- ボタンタイプ -->
          <v-list-item-action v-if="item.button" :class="itemClass">
            <v-btn
              v-text="$t(item.button.text)"
              :color="item.button.color"
              @click="item.button.on(item)"
            />
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>

    <dialog-setting
      :show.sync="dialogShow"
      :group="dialogGroup"
      width="450px"
      @accept="dialogAccept"
    />
    <dialog-initial
      :show.sync="initialShow"
      :title="initialTitle"
      :items="initialItems"
      width="300px"
      @accept="initialAccept"
    />
    <dialog-supply
      :show.sync="supplyShow"
      width="400px"
      @accept="onChangeSupply"
    />
  </v-container>
</template>

<style lang="scss" scoped>
::v-deep .v-list-item__content {
  padding: 0;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiContentSave, mdiExport, mdiImport } from "@mdi/js";
import { Database } from "~/src/convert";
import SettingSwitch, { ISwitch } from "~/components/menu/SettingSwitch.vue";
import SettingSelect, { ISelect } from "~/components/menu/SettingSelect.vue";
import {
  ILevel,
  IRange,
  ListItem as InitialItem,
} from "~/components/dialog/DialogInitial.vue";
import { SettingCritical } from "~/src/setting";

type IButton = {
  readonly text: string;
  readonly color?: string;
  readonly on: (item: ListItem) => void;
};
type IDialog = {
  readonly group: string;
  readonly on: () => void;
};
type ListItem = {
  readonly icon?: string;
  readonly text: string;
  readonly value?: any;
  readonly switch?: ISwitch;
  readonly select?: ISelect;
  readonly button?: IButton;
  readonly dialog?: IDialog;
};

@Component({
  name: "PageSetting",
  components: {
    SettingSwitch,
    SettingSelect,
    DialogSetting: () => import("~/components/dialog/DialogSetting.vue"),
    DialogInitial: () => import("~/components/dialog/DialogInitial.vue"),
    DialogSupply: () => import("~/components/dialog/DialogSupply.vue"),
  },
})
export default class PageSetting extends Vue {
  dialogShow = false;
  dialogItems: ListItem[] = [
    { icon: "header", text: "data" },
    {
      text: "autosave",
      switch: { prop: "autosave" },
    },
    {
      icon: mdiContentSave,
      text: "save",
      button: { text: "setting.exec", on: this.onClickSave },
    },
    {
      icon: mdiImport,
      text: "import",
      button: { text: "setting.exec", on: () => (this.importShow = true) },
    },
    {
      icon: mdiExport,
      text: "export",
      button: { text: "setting.exec", on: () => (this.exportShow = true) },
    },
    {
      text: "delete.detail",
      button: {
        text: "setting.exec",
        color: "error",
        on: this.onClickDialog,
      },
      dialog: {
        group: "delete",
        on: this.onClickDelete,
      },
    },
    {
      text: "initial.chara.detail",
      button: {
        text: "setting.initial.button",
        on: this.onClickInitChara,
      },
    },
    {
      text: "initial.equip.detail",
      button: {
        text: "setting.initial.button",
        on: this.onClickInitEquip,
      },
    },
    {
      text: "supply.detail",
      button: { text: "dialog.append", on: this.onClickSupply },
    },
    { icon: "header", text: "disp" },
    {
      text: "artifact.detail",
      select: {
        prop: "artifact",
        items: [
          { text: "name", value: "" },
          { text: "set", value: "set" },
        ],
      },
    },
    {
      text: "critical.detail",
      select: {
        prop: "critical",
        items: [
          { text: "base", value: SettingCritical.Base },
          { text: "expc", value: SettingCritical.Expc },
          { text: "both", value: SettingCritical.Both },
        ],
      },
    },
  ];
  dialogGroup = "delete";
  dialogAccept = () => {};
  charaItems: InitialItem[] = [
    { type: "header", text: "menu.character" },
    {
      type: "range",
      text: "general.conste",
      value: 0,
      min: 0,
      max: 6,
    },
    {
      type: "level",
      text: "general.level",
      value: "1",
    },
    { type: "header", text: "general.talent" },
    {
      type: "range",
      text: "general.combat",
      value: 1,
      min: 1,
      max: 10,
    },
    {
      type: "range",
      text: "combat.skill",
      value: 1,
      min: 1,
      max: 10,
    },
    {
      type: "range",
      text: "combat.burst",
      value: 1,
      min: 1,
      max: 10,
    },
  ];
  equipItems: InitialItem[] = [
    { type: "header", text: "menu.weapon" },
    {
      type: "range",
      text: "general.rank",
      value: 1,
      min: 1,
      max: 5,
    },
    {
      type: "level",
      text: "general.level",
      value: "1",
    },
    { type: "header", text: "menu.artifact" },
    {
      type: "range",
      text: "general.star",
      value: 3,
      min: 3,
      max: 5,
    },
    {
      type: "range",
      text: "general.level",
      value: 0,
      min: 0,
      max: 20,
    },
  ];
  initialShow = false;
  initialTitle = "";
  initialItems: InitialItem[] = [];
  initialAccept = () => {};
  supplyShow = false;

  get itemClass() {
    return this.$vuetify.breakpoint.xs ? "my-1 ml-4" : "my-1 ml-12";
  }

  get importShow(): boolean {
    return this.$store.state.importShow;
  }
  set importShow(value: boolean) {
    this.$store.commit("importShow", value);
  }

  get exportShow(): boolean {
    return this.$store.state.exportShow;
  }
  set exportShow(value: boolean) {
    this.$store.commit("exportShow", value);
  }

  created() {
    this.$store.commit("appendable", false);
    this.$store.commit("tabs", {});
  }

  onClickDialog(item: ListItem) {
    const dialog = item.dialog;
    if (dialog) {
      this.dialogAccept = dialog.on;
      this.dialogGroup = dialog.group;
      this.dialogShow = true;
    }
  }

  onClickSave() {
    Database.save(this.$db);
    this.$store.commit("popup", "save");
  }

  onClickDelete() {
    Database.reset(this.$db);
    Database.save(this.$db);
    this.$store.commit("popup", "delete");
  }

  onClickInitChara() {
    const { chara } = this.$db.setting.initial;
    let items = this.charaItems;
    items[1].value = chara.conste;
    items[2].value = chara.level;
    items[4].value = chara.combat;
    items[5].value = chara.skill;
    items[6].value = chara.burst;

    this.initialItems.splice(0);
    this.initialItems.push(...items);

    this.initialAccept = this.onChangeInitChara;
    this.initialTitle = "chara.title";
    this.initialShow = true;
  }

  onChangeInitChara() {
    let { chara } = this.$db.setting.initial;
    const items = this.charaItems;
    chara.conste = (items[1] as IRange).value;
    chara.level = (items[2] as ILevel).value;
    chara.combat = (items[4] as IRange).value;
    chara.skill = (items[5] as IRange).value;
    chara.burst = (items[6] as IRange).value;

    this.onClickSave();
  }

  onClickInitEquip() {
    const { weapon, artifact } = this.$db.setting.initial;
    let items = this.equipItems;
    items[1].value = weapon.rank;
    items[2].value = weapon.level;
    items[4].value = artifact.star;
    items[5].value = artifact.level;

    this.initialItems.splice(0);
    this.initialItems.push(...items);

    this.initialAccept = this.onChangeInitEquip;
    this.initialTitle = "equip.title";
    this.initialShow = true;
  }

  onChangeInitEquip() {
    let { weapon, artifact } = this.$db.setting.initial;
    const items = this.equipItems;
    weapon.rank = (items[1] as IRange).value;
    weapon.level = (items[2] as ILevel).value;
    artifact.star = (items[4] as IRange).value;
    artifact.level = (items[5] as IRange).value;

    this.onClickSave();
  }

  onClickSupply() {
    this.supplyShow = true;
  }

  onChangeSupply() {
    Database.save(this.$db);
    this.$store.commit("popup", "append");
  }
}
</script>
