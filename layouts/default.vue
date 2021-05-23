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
          <v-icon size="34px">{{ menuIcon() }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ $t("menu.title") }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item-group
          v-model="selectedList"
          color="primary"
          mandatory
          @change="change"
        >
          <v-list-item v-for="(list, index) in lists" :key="index" link>
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
      extension-height="36"
      app
      fixed
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <template v-slot:default>
          <v-btn icon>
            <v-icon>{{ menuIcon() }}</v-icon>
          </v-btn>
        </template>
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t("menu." + page) }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
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
  mdiMenu,
  mdiNotePlus,
  mdiHome,
  mdiAccount,
  mdiSword,
  mdiRing,
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
        { icon: mdiHome, page: "home", to: "/" },
        { icon: mdiAccount, page: "chara", to: "/chara" },
        { icon: mdiSword, page: "weapon", to: "/weapon" },
        { icon: mdiRing, page: "artifact", to: "/artifact" },
        { icon: mdiNotePlus, page: "releasenote", to: "/releasenote" },
      ],
      selectedTab: 0,
      selectedList: 0,
    };
  },
  computed: {
    page: {
      get() {
        return this.lists[this.selectedList].page;
      },
    },
  },
  methods: {
    change() {
      this.$router.push(this.lists[this.selectedList].to);
    },
    menuIcon() {
      return mdiMenu;
    },
  },
};
</script>
