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

      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click.stop="title = item.title"
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
        <nuxt />
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
export default {
  data() {
    return {
      fixed: false,
      title: this.$t("menu.home"),
      drawer: false,
      clipped: false,
      miniVariant: false,
      items: [
        {
          icon: "mdi-apps",
          title: this.$t("menu.home"),
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: this.$t("menu.releasenote"),
          to: "/releasenote",
        },
        {
          icon: "mdi-chart-bubble",
          title: this.$t("menu.artifact"),
          to: "/artifact",
        },
      ],
    };
  },
};
</script>
