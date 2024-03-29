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
          <v-list-item-group mandatory color="primary">
            <v-list-item
              v-for="item in pages"
              exact
              :key="item.page"
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
        :elevation="tabable ? 0 : 4"
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
        <template v-if="tabable">
          <tab-category height="36px" elevation="4" />
          <div style="height: 36px" />
        </template>
        <nuxt />
      </v-main>

      <v-footer class="justify-space-between">
        <span />
        <span>{{ $t("copyright") }}</span>
        <span>{{ $t("footer") }}</span>
      </v-footer>
      <popup-bar />
      <dialog-import :icons="icons" :reflect="reflect" />
      <dialog-export :icons="icons" />
    </v-app>
  </client-only>
</template>

<style>
html {
  background-color: black;
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

::v-deep .v-data-footer__select .v-select {
  margin: 10px 0 10px 10px;
}
</style>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { MetaInfo } from "vue-meta";
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
import convert, { Database, DBTableTypes } from "~/src/convert";

interface ITool {
  icon: string;
  type?: string;
  func?: Function;
}

@Component({
  name: "default",
  components: {
    DialogImport: () => import("~/components/dialog/DialogImport.vue"),
    DialogExport: () => import("~/components/dialog/DialogExport.vue"),
    SelectLocale: () => import("~/components/menu/SelectLocale.vue"),
    TabCategory: () => import("~/components/menu/TabCategory.vue"),
    PopupBar: () => import("~/components/menu/PopupBar.vue"),
  },
})
export default class Default extends Vue {
  fixed = false;
  clipped = false;
  pageOpened = false;
  toolOpened = false;

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
    { icon: mdiImport, func: () => this.$store.commit("importShow", true) },
    { icon: mdiExport, func: () => this.$store.commit("exportShow", true) },
    { icon: mdiTranslate, type: "locale" },
  ];
  readonly icons = {
    menu: mdiMenu,
    tool: mdiTools,
    clear: mdiClose, // dialog-exportで使用
    file: mdiPaperclip, // dialog-exportで使用
  };

  get mobile() {
    return this.$vuetify.breakpoint.xs;
  }

  get desktop() {
    const bp = this.$vuetify.breakpoint;
    return bp.lg || bp.xl;
  }

  get page() {
    return this.$store.state.page || "index";
  }

  get tabable() {
    return this.$store.getters.tabable;
  }

  get appendable() {
    return this.$store.state.appendable;
  }

  get storeReload() {
    return this.$store.state.reload;
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

  head(): MetaInfo {
    const baseUrl = this.$config.HOSTNAME + "/GenshinImpactDamageEmulator";
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    return {
      title: this.$t("title") as string,
      meta: [
        ...i18nHead.meta,
        { hid: "author", name: "author", content: "PGseatake" },
        {
          hid: "description",
          name: "description",
          content: this.$t("description") as string,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: baseUrl + this.$route.path,
        },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:title",
          property: "og:title",
          content: this.$t("title") as string,
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: this.$t("subtitle") as string,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: baseUrl + "/img/GIDE.jpg",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.$t("description") as string,
        },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@PGseatake" },
        {
          hid: "apple-mobile-web-app-title",
          name: "apple-mobile-web-app-title",
          content: this.$t("title") as string,
        },
      ],
      link: i18nHead.link,
    };
  }

  beforeMount() {
    window.addEventListener("beforeunload", this.onBeforeUnload);
    this.reflect(localStorage.getItem(Database.name));
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

  autosave() {
    if (this.$db.setting.autosave) {
      Database.save(this.$db);
      return true;
    }
    return false;
  }

  onSave() {
    Database.save(this.$db);
    this.$store.commit("popup", "save");
    this.toolOpened = false;
  }

  onBeforeUnload(event: BeforeUnloadEvent) {
    if (!this.autosave()) {
      event.preventDefault();
      event.returnValue = "";
    }
  }
}
</script>
