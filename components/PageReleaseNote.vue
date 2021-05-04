<template>
  <v-list expand>
    <template v-for="(item, key) in items">
      <release-root :key="key" :version="key" :root="item" />
    </template>
  </v-list>
</template>

<script>
const ReleaseRoot = () => import("~/components/ReleaseRoot.vue");

export default {
  name: "VPageReleaseNote",
  components: { ReleaseRoot },
  data() {
    return {
      items: this.$t("releasenote"),
    };
  },
};
</script>
