<template>
  <v-container>
    <v-list expand :class="$vuetify.breakpoint.xs ? '' : 'px-2'">
      <template v-for="(item, key) in items()">
        <release-root :key="key" :version="key" :root="item" />
      </template>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "PageReleaseNote",
  components: {
    ReleaseRoot: () => import("~/components/ReleaseRoot.vue"),
  },
})
export default class PageReleaseNote extends Vue {
  created() {
    this.$store.commit("setAppendable", false);
  }
  items() {
    return this.$t("releasenote");
  }
}
</script>
