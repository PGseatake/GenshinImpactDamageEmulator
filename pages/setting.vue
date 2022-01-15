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
import SettingSwitch, { ISwitch } from "~/components/menu/SettingSwitch.vue";
import SettingSelect, { ISelect } from "~/components/menu/SettingSelect.vue";

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
  components: { SettingSwitch, SettingSelect },
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
          { text: "base", value: "" },
          { text: "expc", value: "expc" },
          { text: "both", value: "both" },
        ],
      },
    },
  ];
  dialogGroup = "delete";
  dialogAccept = () => {};

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

  popup(label: string) {
    this.$store.commit("popup", this.$t("popup." + label));
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
    localStorage.setItem("global_data", JSON.stringify(this.$db));
    this.popup("save");
  }

  onClickDelete() {
    localStorage.removeItem("global_data");
    this.$store.commit("reload");
  }
}
</script>
