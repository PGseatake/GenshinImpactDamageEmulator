<template>
  <v-container>
    <v-list expand :class="$vuetify.breakpoint.xs ? '' : 'px-2'">
      <template v-for="(item, key) in items">
        <release-root
          :key="key"
          :version="key"
          :root="item"
          :value="key === root"
        />
      </template>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { LocaleMessages } from "vue-i18n/types";

@Component({
  name: "PageReleaseNote",
  components: {
    ReleaseRoot: () => import("~/components/ReleaseRoot.vue"),
  },
})
export default class PageReleaseNote extends Vue {
  created() {
    this.$store.commit("appendable", false);
    this.$store.commit("tabs", {});
  }

  get items() {
    return this.$t("releasenote");
  }

  get root() {
    for (let key in this.$t("releasenote") as LocaleMessages) {
      return key;
    }
    return "";
  }
}
</script>
