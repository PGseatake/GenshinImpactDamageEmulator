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
        :hide-on-scroll="!desktop"
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
            <template v-if="list.type === 'locale-select'">
              <v-locale-select fab icon>
                <v-icon v-text="list.icon" />
              </v-locale-select>
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
              <template v-if="list.type === 'locale-select'">
                <v-locale-select fab icon small>
                  <v-icon v-text="list.icon" />
                </v-locale-select>
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

      <v-footer class="justify-end">
        <span>Ver. 2.0.0</span>
      </v-footer>

      <v-import-dialog
        width="400px"
        :show.sync="importDialog"
        @input="onImport"
      />
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
import { Vue, Component } from "vue-property-decorator";
import {
  mdiAccount,
  mdiExport,
  mdiHome,
  mdiImport,
  mdiMenu,
  mdiNotePlus,
  mdiPlaylistPlus,
  mdiRing,
  mdiSword,
  mdiTools,
  mdiTranslate,
} from "@mdi/js";

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
    VLocaleSelect: () => import("~/components/VLocaleSelect.vue"),
    VImportDialog: () => import("~/components/VImportDialog.vue"),
  },
})
export default class Default extends Vue {
  fixed = false;
  clipped = false;
  importDialog = false;
  pageOpened = false;
  toolOpened = false;
  selectedPage = 0;
  readonly pageList: IPage[] = [
    { icon: mdiHome, page: "index", to: "/" },
    { icon: mdiAccount, page: "character", to: "/character" },
    { icon: mdiSword, page: "weapon", to: "/weapon" },
    { icon: mdiRing, page: "artifact", to: "/artifact" },
    { icon: mdiNotePlus, page: "releasenote", to: "/releasenote" },
  ];
  toolList: ITool[] = [
    { icon: mdiPlaylistPlus, func: undefined },
    { icon: mdiImport, func: undefined },
    { icon: mdiExport, func: undefined },
    { icon: mdiTranslate, type: "locale-select" },
  ];
  readonly icons = {
    menu: mdiMenu,
    tool: mdiTools,
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

  created() {
    this.toolList[0].func = this.onAppend;
    this.toolList[1].func = () => (this.importDialog = true);
    this.toolList[2].func = this.onExport;

    const index = this.pageList.findIndex(
      (list) => list.page === this.$store.state.page
    );
    this.selectedPage = index < 0 ? 0 : index;
  }

  onAppend() {
    this.$store.commit("setAppend", true);
  }

  onImport(file: File | null) {
    if (file) {
      // jsonファイル読み込み
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        let json = reader.result as string;
        if (json) {
          let data = JSON.parse(json);
          // TODO: コンバート
          this.$store.commit("setData", data);
        }
      };
    }
  }

  onExport() {
    console.log("export");
  }
}
</script>
