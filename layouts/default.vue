<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      :temporary="$vuetify.breakpoint === 'xs'"
      fixed
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon>mdi-menu</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ $t("menu.title") }}</v-list-item-title>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          @click="(title = item.title), (page = item.page)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" :hide-on-scroll="true" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <page-index v-show="page === 'index'" />
        <page-release-note v-show="page === 'releasenote'" />
        <page-artifact v-show="page === 'artifact'" />
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
import PageIndex from "~/components/PageIndex.vue";
const PageReleaseNote = () => import("~/components/PageReleaseNote.vue");
const PageArtifact = () => import("~/components/PageArtifact.vue");

export default {
  components: { PageIndex, PageReleaseNote, PageArtifact },
  data() {
    return {
      page: "index",
      fixed: false,
      title: this.$t("menu.home"),
      drawer: false,
      clipped: false,
      miniVariant: false,
      items: [
        {
          icon: "mdi-apps",
          page: "index",
          title: this.$t("menu.home"),
        },
        {
          icon: "mdi-chart-bubble",
          page: "releasenote",
          title: this.$t("menu.releasenote"),
        },
        {
          icon: "mdi-chart-bubble",
          page: "artifact",
          title: this.$t("menu.artifact"),
        },
      ],
    };
  },
};
</script>
