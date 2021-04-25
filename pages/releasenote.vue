<template>
  <v-list expand>
    <template v-for="(item, key) in items">
      <release-root :key="key" :version="key" :root="item" />
    </template>
  </v-list>
</template>

<script>
import ReleaseRoot from "~/components/ReleaseRoot.vue";
export default {
  components: { ReleaseRoot },
  data() {
    return {
      items: this.$t("releasenote"),
    };
  },
};
</script>
