<template>
  <v-container>
    <v-list expand>
      <template v-for="(item, key) in items()">
        <v-release-root :key="key" :version="key" :root="item" />
      </template>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "PageReleaseNote",
  components: { VReleaseRoot: () => import("~/components/VReleaseRoot.vue") },
})
export default class PageReleaseNote extends Vue {
  items() {
    return this.$t("releasenote");
  }
}
</script>
