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
              v-for="(list, index) in pageList"
              exact
              :key="index"
              :ripple="false"
              :to="localePath(list.to)"
            >
              <v-list-item-action>
                <v-icon v-text="list.icon" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="$t('menu.' + list.page)" />
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
          <span v-for="(list, index) in toolList" :key="index">
            <template v-if="list.type === 'locale'">
              <select-locale fab icon>
                <v-icon v-text="list.icon" />
              </select-locale>
            </template>
            <template v-else-if="list.type === 'append'">
              <v-btn fab icon :disabled="!appendable" @click="list.func">
                <v-icon v-text="list.icon" />
              </v-btn>
            </template>
            <template v-else>
              <v-btn fab icon @click="list.func">
                <v-icon v-text="list.icon" />
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
          <v-list-item
            v-for="(list, index) in toolList"
            :key="index"
            class="ma-0"
          >
            <v-list-item-icon>
              <template v-if="list.type === 'locale'">
                <select-locale fab icon small>
                  <v-icon v-text="list.icon" />
                </select-locale>
              </template>
              <template v-else-if="list.type === 'append'">
                <v-btn
                  fab
                  icon
                  small
                  :disabled="!appendable"
                  @click="list.func"
                >
                  <v-icon v-text="list.icon" />
                </v-btn>
              </template>
              <template v-else>
                <v-btn fab icon small @click="list.func">
                  <v-icon v-text="list.icon" />
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
  mdiContentSave,
  mdiExpandAll,
  mdiExport,
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
import { DBTableTypes } from "~/src/interface";
import { convert } from "~/src/convert";

interface IPage {
  icon: string;
  page: string;
  to: string;
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
  importShow = false;
  importFile: File | null = null;
  exportShow = false;
  exportFile: string | null = "GIDE.json";
  pageOpened = false;
  toolOpened = false;
  selectedPage = 0;
  readonly pageList: IPage[] = [
    { icon: mdiHome, page: "index", to: "/" },
    { icon: mdiTshirtCrew, page: "equipment", to: "/equipment" },
    { icon: mdiAccountMultiplePlus, page: "team", to: "/team" },
    { icon: mdiExpandAll, page: "bonus", to: "/bonus" },
    { icon: mdiCalculatorVariant, page: "damage", to: "/damage" },
    { icon: mdiAccount, page: "character", to: "/character" },
    { icon: mdiSword, page: "weapon", to: "/weapon" },
    { icon: mdiRing, page: "artifact", to: "/artifact" },
    { icon: mdiNotePlus, page: "releasenote", to: "/releasenote" },
  ];
  toolList: ITool[] = [
    { icon: mdiPlaylistPlus, func: undefined, type: "append" },
    { icon: mdiContentSave, func: undefined },
    { icon: mdiImport, func: undefined },
    { icon: mdiExport, func: undefined },
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
    return this.pageList[this.selectedPage].page;
  }

  get appendable() {
    return this.$store.state.appendable;
  }

  get storePopup() {
    return this.$store.state.popupText;
  }

  @Watch("storePopup")
  onChangeStorePopup(value: string) {
    if (value) {
      this.popupText = value;
      this.popupShow = true;
      this.$store.commit("setPopupText", "");
    }
  }

  created() {
    this.toolList[0].func = () => this.$store.commit("setAppend", true);
    this.toolList[1].func = this.onSave;
    this.toolList[2].func = () => (this.importShow = true);
    this.toolList[3].func = () => (this.exportShow = true);

    const index = this.pageList.findIndex(
      (list) => list.page === this.$store.state.page
    );
    this.selectedPage = index < 0 ? 0 : index;
  }

  mounted() {
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

  popup(label: string) {
    this.$store.commit("setPopupText", this.$t("popup." + label));
  }

  onSave() {
    this.save();
    this.popup("save");
    this.toolOpened = false;
  }

  onImport() {
    if (this.importFile) {
      // jsonファイル読み込み
      let reader = new FileReader();
      reader.readAsText(this.importFile);
      reader.onload = () => {
        this.reflect(reader.result as string);
        this.save();
        this.popup("import");

        window.removeEventListener("beforeunload", this.onBeforeUnload);
        location.reload();
      };
    }
  }

  onExport() {
    if (this.exportFile) {
      let blob = new Blob([JSON.stringify(this.$db)], {
        type: "application/json",
      });
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, this.exportFile);
      } else {
        let link = document.createElement("a");
        document.body.appendChild(link);
        let url = (URL || webkitURL).createObjectURL(blob);
        link.href = url;
        link.download = this.exportFile;
        link.click();
        link.remove();
        (URL || webkitURL).revokeObjectURL(url);
        this.popup("export");
      }
    }
  }

  onBeforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = "";
  }
}
</script>
