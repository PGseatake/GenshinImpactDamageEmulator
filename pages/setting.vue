<template>
  <v-container class="d-flex justify-center">
    <v-list width="600">
      <template v-for="(item, i) of items">
        <!-- カテゴリヘッダ -->
        <template v-if="item.icon === 'header'">
          <v-divider v-if="i" :key="'d' + i" />
          <v-subheader v-text="$t(item.text)" :key="'s' + i" />
        </template>
        <!-- カテゴリアイテム -->
        <v-list-item v-else :key="i">
          <v-list-item-icon
            v-if="!$vuetify.breakpoint.xs"
            class="align-self-center"
          >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ $t(item.text) }}</v-list-item-content>
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
            <v-btn :color="item.button.color" @click="item.button.on(item)">{{
              $t(item.button.text)
            }}</v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>

    <v-dialog v-model="dialogShow" width="450px">
      <v-card>
        <v-card-title v-text="$t(dialogInfo.title)" />
        <v-card-text v-html="$t(dialogInfo.text)" />
        <v-card-text
          v-if="dialogInfo.subtext"
          v-html="$t(dialogInfo.subtext)"
          class="text-caption"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn text color="secondary" @click="dialogShow = false">{{
            $t("dialog.cancel")
          }}</v-btn>
          <v-btn text color="primary" @click="dialogInfo.on">{{
            $t("dialog.ok")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import SettingSelect, { ISelect } from "~/components/menu/SettingSelect.vue";
import SettingSwitch, { ISwitch } from "~/components/menu/SettingSwitch.vue";

type IButton = {
  readonly text: string;
  readonly color?: string;
  readonly on: (item: IListItem) => void;
};
type IDialog = {
  readonly title: string;
  readonly text: string;
  readonly subtext?: string;
  readonly on: () => void;
};
type IListItem = {
  readonly icon?: string;
  readonly text: string;
  readonly value?: any;
  readonly select?: ISelect;
  readonly switch?: ISwitch;
  readonly button?: IButton;
  readonly dialog?: IDialog;
};

@Component({
  name: "PageSetting",
  components: { SettingSwitch, SettingSelect },
})
export default class PageSetting extends Vue {
  items: IListItem[] = [
    { icon: "header", text: "setting.data" },
    {
      text: "setting.autosave",
      switch: { prop: "autosave" },
    },
    {
      icon: mdiContentSave,
      text: "setting.save",
      button: { text: "setting.exec", on: this.onClickSave },
    },
    {
      icon: mdiImport,
      text: "setting.import",
      button: { text: "setting.exec", on: () => (this.importShow = true) },
    },
    {
      icon: mdiExport,
      text: "setting.export",
      button: { text: "setting.exec", on: () => (this.exportShow = true) },
    },
    {
      text: "setting.delete.detail",
      button: {
        text: "setting.exec",
        color: "error",
        on: (item: IListItem) => this.dialog(item.dialog),
      },
      dialog: {
        title: "setting.delete.title",
        text: "setting.delete.text",
        subtext: "setting.delete.subtext",
        on: this.onClickDelete,
      },
    },
    { icon: "header", text: "setting.disp" },
    {
      text: "setting.artifact.detail",
      select: {
        prop: "artifact",
        items: [
          { text: "setting.artifact.name", value: "" },
          { text: "setting.artifact.set", value: "set" },
        ],
      },
    },
    {
      text: "setting.critical.detail",
      select: {
        prop: "critical",
        items: [
          { text: "setting.critical.base", value: "" },
          { text: "setting.critical.expc", value: "expc" },
          { text: "setting.critical.both", value: "both" },
        ],
      },
    },
  ];
  dialogInfo: IDialog = {
    title: "",
    text: "",
    on: () => {},
  };
  dialogShow = false;

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

  dialog(info?: IDialog) {
    if (info) {
      this.dialogInfo = info;
      this.dialogShow = true;
    }
  }

  popup(label: string) {
    this.$store.commit("popup", this.$t("popup." + label));
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
