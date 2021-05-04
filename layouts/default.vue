<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      :temporary="$vuetify.breakpoint.name === 'xs'"
      fixed
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon v-show="miniVariant">mdi-chevron-right</v-icon>
          <v-icon v-show="!miniVariant">mdi-menu</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ $t("menu.title") }}</v-list-item-title>
        <v-btn
          v-if="$vuetify.breakpoint.name !== 'xs'"
          icon
          @click.stop="miniVariant = !miniVariant"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item-group
          v-model="selectedList"
          color="primary"
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ $t("menu." + page) }}</v-toolbar-title>
      <template v-if="tabs[page]" v-slot:extension>
        <v-tabs v-model="selectedTab" centered align-with-title>
          <v-tab v-for="tab in tabs[page]" :key="tab">
            {{ $t("tab." + tab) }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <page-index v-show="page === 'home'" />
        <page-artifact v-show="page === 'artifact'" :tab.sync="selectedTab" />
        <page-release-note v-show="page === 'releasenote'" />
      </v-container>
    </v-main>

    <!--
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    -->
  </v-app>
</template>

<script>
import {
  mdiApps,
  mdiMenu,
  mdiCreation,
  mdiNotePlus,
  mdiChevronLeft,
  mdiChevronRight,
} from "@mdi/js";
import PageIndex from "~/components/PageIndex.vue";
import { ArtifactTypes } from "~/src/const";
const PageArtifact = () => import("~/components/PageArtifact.vue");
const PageReleaseNote = () => import("~/components/PageReleaseNote.vue");

export default {
  name: "default",
  components: { PageIndex, PageArtifact, PageReleaseNote },
  data() {
    return {
      fixed: false,
      drawer: false,
      clipped: false,
      miniVariant: false,
      tabs: {
        home: null,
        artifact: ArtifactTypes,
        releasenote: null,
      },
      lists: [
        { icon: "mdi-apps", page: "home" },
        { icon: "mdi-creation", page: "artifact" },
        { icon: "mdi-note-plus", page: "releasenote" },
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
};
</script>
