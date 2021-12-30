<template>
  <client-only>
    <v-app dark>
      <!-- メインメニュー -->
      <v-navigation-drawer
        v-model="pageOpened"
        app
        fixed
        clipped
        :mini-variant="desktop"
        :expand-on-hover="desktop"
        :temporary="mobile"
      >
        <v-list v-if="!desktop">
          <v-list-item>
            <v-list-item-avatar size="32px" class="my-0 mr-4">
              <v-icon v-text="icons.menu" />
            </v-list-item-avatar>
            <v-list-item-title v-text="$t('menu.title')" />
          </v-list-item>
        </v-list>
        <v-divider v-if="!desktop" />

        <v-list>
          <v-list-item-group v-model="selectedPage" mandatory color="primary">
            <v-list-item
              v-for="(item, index) in pages"
              exact
              :key="index"
              :ripple="false"
              :to="localePath(item.to)"
            >
              <v-list-item-action>
                <v-icon v-text="item.icon" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="$t('menu.' + item.page)" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-- ツールバー -->
      <v-app-bar
        app
        fixed
        extension-height="36"
        :dense="mobile"
        :clipped-left="desktop"
        :clipped-right="desktop"
      >
        <v-app-bar-nav-icon
          large
          :small="!desktop"
          @click.stop="pageOpened = !pageOpened"
        >
          <v-icon v-text="icons.menu" />
        </v-app-bar-nav-icon>
        <v-toolbar-title v-text="$t('menu.' + page)" />
        <v-spacer />

        <template v-if="mobile">
          <v-btn fab icon :small="!desktop" @click="toolOpened = !toolOpened">
            <v-icon v-text="icons.tool" />
          </v-btn>
        </template>
        <template v-else>
          <span v-for="(item, index) in tools" :key="index">
            <template v-if="item.type === 'locale'">
              <select-locale fab icon>
                <v-icon v-text="item.icon" />
              </select-locale>
            </template>
            <template v-else-if="item.type === 'append'">
              <v-btn fab icon :disabled="!appendable" @click="item.func">
                <v-icon v-text="item.icon" />
              </v-btn>
            </template>
            <template v-else>
              <v-btn fab icon @click="item.func">
                <v-icon v-text="item.icon" />
              </v-btn>
            </template>
          </span>
        </template>
      </v-app-bar>

      <!-- サブメニュー -->
      <v-navigation-drawer
        v-if="mobile"
        v-model="toolOpened"
        app
        fixed
        right
        clipped
        temporary
        mini-variant
      >
        <v-list>
          <v-list-item>
            <v-list-item-action class="ma-0">
              <v-icon v-text="icons.tool" />
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider />

        <v-list nav class="px-0">
          <v-list-item v-for="(item, index) in tools" :key="index" class="ma-0">
            <v-list-item-icon>
              <template v-if="item.type === 'locale'">
                <select-locale fab icon small>
                  <v-icon v-text="item.icon" />
                </select-locale>
              </template>
              <template v-else-if="item.type === 'append'">
                <v-btn
                  fab
                  icon
                  small
                  :disabled="!appendable"
                  @click="item.func"
                >
                  <v-icon v-text="item.icon" />
                </v-btn>
              </template>
              <template v-else>
                <v-btn fab icon small @click="item.func">
                  <v-icon v-text="item.icon" />
                </v-btn>
              </template>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <nuxt />
      </v-main>

      <v-snackbar
        app
        v-model="popupShow"
        timeout="3000"
        content-class="text-center"
        >{{ popupText }}</v-snackbar
      >
      <v-footer class="justify-end">
        <span>{{ $t("footer") }}</span>
      </v-footer>

      <!-- インポートダイアログ -->
      <dialog-file
        width="450px"
        :file="importFile"
        :show.sync="importShow"
        :label="$t('dialog.import')"
        :detail="$t('dialog.import_text')"
        @accept="onImport"
      >
        <template v-slot>
          <v-file-input
            v-model="importFile"
            clearable
            truncate-length="40"
            accept="application/json"
            :clear-icon="icons.clear"
            :prepend-icon="icons.file"
          />
        </template>
      </dialog-file>
      <!-- エクスポートダイアログ -->
      <dialog-file
        width="450px"
        :file="exportFile"
        :show.sync="exportShow"
        :label="$t('dialog.export')"
        :detail="$t('dialog.export_text')"
        @accept="onExport"
      >
        <template v-slot>
          <v-text-field
            v-model="exportFile"
            clearable
            :clear-icon="icons.clear"
            :prepend-icon="icons.file"
          />
        </template>
      </dialog-file>
    </v-app>
  </client-only>
</template>

<style>
html {
  overflow-y: auto !important;
}
</style>

<style lang="scss" scoped>
::v-deep .v-select-list {
  .v-list-item {
    .v-list-item__content {
      padding: 0;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import {
  mdiAccount,
  mdiAccountMultiplePlus,
  mdiCalculatorVariant,
  mdiClose,
  mdiCogOutline,
  mdiContentSave,
  mdiExpandAll,
  mdiExport,
  mdiHelpCircleOutline,
  mdiHome,
  mdiImport,
  mdiMenu,
  mdiNotePlus,
  mdiPaperclip,
  mdiPlaylistPlus,
  mdiRing,
  mdiSword,
  mdiTools,
  mdiTranslate,
  mdiTshirtCrew,
} from "@mdi/js";
import convert, { DBTableTypes } from "~/src/convert";

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

interface ITool {
  icon: string;
  type?: string;
  func?: Function;
}

@Component({
  name: "default",
  components: {
    DialogFile: () => import("~/components/DialogFile.vue"),
    SelectLocale: () => import("~/components/SelectLocale.vue"),
  },
})
export default class Default extends Vue {
  fixed = false;
  clipped = false;
  popupShow = false;
  popupText = "";
  pageOpened = false;
  toolOpened = false;
  selectedPage = 0;

  readonly pages = [
    { icon: mdiHome, page: "index", to: "/" },
    { icon: mdiTshirtCrew, page: "equipment", to: "/equipment" },
    { icon: mdiAccountMultiplePlus, page: "team", to: "/team" },
    { icon: mdiExpandAll, page: "bonus", to: "/bonus" },
    { icon: mdiCalculatorVariant, page: "damage", to: "/damage" },
    { icon: mdiAccount, page: "character", to: "/character" },
    { icon: mdiSword, page: "weapon", to: "/weapon" },
    { icon: mdiRing, page: "artifact", to: "/artifact" },
    { icon: mdiHelpCircleOutline, page: "howto", to: "/howto" },
    { icon: mdiCogOutline, page: "setting", to: "/setting" },
    { icon: mdiNotePlus, page: "releasenote", to: "/releasenote" },
  ];
  readonly tools: ITool[] = [
    {
      icon: mdiPlaylistPlus,
      type: "append",
      func: () => this.$store.commit("append", true),
    },
    { icon: mdiContentSave, func: this.onSave },
    { icon: mdiImport, func: () => (this.importShow = true) },
    { icon: mdiExport, func: () => (this.exportShow = true) },
    { icon: mdiTranslate, type: "locale" },
  ];
  readonly icons = {
    menu: mdiMenu,
    tool: mdiTools,
    clear: mdiClose,
    file: mdiPaperclip,
  };

  get mobile() {
    return this.$vuetify.breakpoint.xs;
  }

  get desktop() {
    const bp = this.$vuetify.breakpoint;
    return bp.lg || bp.xl;
  }

  get page() {
    return this.pages[this.selectedPage].page;
  }

  get appendable() {
    return this.$store.state.appendable;
  }

  get importFile(): File | null {
    return this.$store.state.importFile;
  }
  set importFile(value: File | null) {
    this.$store.commit("importFile", value);
  }

  get importShow(): boolean {
    return this.$store.state.importShow;
  }
  set importShow(value: boolean) {
    this.$store.commit("importShow", value);
  }

  get exportFile(): string | null {
    return this.$store.state.exportFile;
  }
  set exportFile(value: string | null) {
    this.$store.commit("exportFile", value);
  }

  get exportShow(): boolean {
    return this.$store.state.exportShow;
  }
  set exportShow(value: boolean) {
    this.$store.commit("exportShow", value);
  }

  get storePopup() {
    return this.$store.state.popup;
  }

  get storeReload() {
    return this.$store.state.reload;
  }

  @Watch("storePopup")
  onChangeStorePopup(value: string) {
    if (value) {
      this.popupText = value;
      this.popupShow = true;
      this.$nextTick(() => this.$store.commit("popup", ""));
    }
  }

  @Watch("storeReload")
  onChangeStoreReload(value: boolean) {
    if (value) {
      window.removeEventListener("beforeunload", this.onBeforeUnload);
      location.reload();
    }
  }

  @Watch("$route")
  onChangeRoute() {
    this.autosave();
  }

  created() {
    const page = this.$store.state.page;
    const index = this.pages.findIndex((item) => item.page === page);
    this.selectedPage = index < 0 ? 0 : index;
  }

  beforeMount() {
    window.addEventListener("beforeunload", this.onBeforeUnload);
    this.reflect(localStorage.getItem("global_data"));
  }

  reflect(json: string | null) {
    if (json) {
      let data = convert(JSON.parse(json));
      for (const type of DBTableTypes) {
        if (data[type]) {
          this.$set(this.$db, type, data[type]);
        }
      }
    }
  }

  save() {
    localStorage.setItem("global_data", JSON.stringify(this.$db));
  }

  autosave() {
    if (this.$db.setting.autosave) {
      this.save();
      return true;
    }
    return false;
  }

  popup(label: string) {
    this.$store.commit("popup", this.$t("popup." + label));
  }

  onSave() {
    this.save();
    this.popup("save");
    this.toolOpened = false;
  }

  onImport() {
    const file = this.importFile;
    if (file) {
      // jsonファイル読み込み
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.reflect(reader.result as string);
        this.save();
        this.popup("import");
        this.$store.commit("reload");
      };
    }
  }

  onExport() {
    const file = this.exportFile;
    if (file) {
      let blob = new Blob([JSON.stringify(this.$db)], {
        type: "application/json",
      });
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, file);
      } else {
        let link = document.createElement("a");
        document.body.appendChild(link);
        let url = (URL || webkitURL).createObjectURL(blob);
        link.href = url;
        link.download = file;
        link.click();
        link.remove();
        (URL || webkitURL).revokeObjectURL(url);
        this.popup("export");
      }
    }
  }

  onBeforeUnload(event: BeforeUnloadEvent) {
    if (!this.autosave()) {
      event.preventDefault();
      event.returnValue = "";
    }
  }
}
</script>
