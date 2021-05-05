<template>
  <v-container>
    <v-list expand>
      <template v-for="(item, key) in items()">
        <v-release-root :key="key" :version="key" :root="item" />
      </template>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "PageReleaseNote",
  components: { VReleaseRoot: () => import("~/components/VReleaseRoot.vue") },
  methods: {
    items() {
      return this.$t("releasenote");
    },
  },
};
</script>
