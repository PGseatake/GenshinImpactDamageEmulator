<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :temporary="$vuetify.breakpoint.name === 'xs'"
      fixed
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon size="34px">{{ icons.menu }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ $t("menu.title") }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item-group v-model="selectedList" color="primary" mandatory>
          <v-list-item
            v-for="(list, index) in lists"
            :key="index"
            :to="list.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ list.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="$t('menu.' + list.page)" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      :hide-on-scroll="true"
      :dense="$vuetify.breakpoint.xs"
      extension-height="36"
      app
      fixed
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <template v-slot:default>
          <v-btn icon>
            <v-icon>{{ icons.menu }}</v-icon>
          </v-btn>
        </template>
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t("menu." + page) }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn fab small @click="onAppend" class="mx-1">
        <v-icon>{{ icons.append }}</v-icon>
      </v-btn>
      <v-btn fab small @click="onExport" class="mx-1">
        <v-icon>{{ icons.export }}</v-icon>
      </v-btn>
      <v-btn fab small @click="onImport" class="mx-1">
        <v-icon>{{ icons.import }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>

    <!--
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    -->
  </v-app>
</template>

<style lang="scss" scoped>
::v-deep .v-select-list {
  .v-list-item {
    .v-list-item__content {
      padding: 0;
    }
  }
}
</style>

<script>
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
} from "@mdi/js";
import { WeaponTypes, ArtifactTypes } from "~/src/const";

export default {
  name: "default",
  data() {
    return {
      fixed: false,
      drawer: false,
      clipped: false,
      tabs: {
        home: null,
        artifact: ArtifactTypes,
        weapon: WeaponTypes,
        releasenote: null,
      },
      lists: [
        { icon: mdiHome, page: "index", to: "/" },
        { icon: mdiAccount, page: "character", to: "/character" },
        { icon: mdiSword, page: "weapon", to: "/weapon" },
        { icon: mdiRing, page: "artifact", to: "/artifact" },
        { icon: mdiNotePlus, page: "releasenote", to: "/releasenote" },
      ],
      selectedTab: 0,
      selectedList: 0,
      icons: {
        menu: mdiMenu,
        append: mdiPlaylistPlus,
        import: mdiImport,
        export: mdiExport,
      },
    };
  },
  computed: {
    page() {
      return this.lists[this.selectedList].page;
    },
    // availableLocales() {
    //   return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    // },
  },
  mounted() {},
  methods: {
    onAppend() {
      this.$store.commit("appendData", true);
    },
    onImport() {},
    onExport() {},
  },
};
</script>
