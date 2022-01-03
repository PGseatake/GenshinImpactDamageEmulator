<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <chara-data />

    <v-btn fab small @click.stop="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mdiPlaylistPlus } from "@mdi/js";
import CharaData from "~/components/CharaData.vue";

@Component({
  name: "PageCharacter",
  components: { CharaData },
})
export default class PageCharacter extends Vue {
  readonly icons = { append: mdiPlaylistPlus };

  get append() {
    return this.$store.getters.append;
  }

  @Watch("append")
  onChangeAppend(value: any) {
    if (value === true) {
      this.$store.commit("append", "chara");
    }
  }

  created() {
    this.$store.commit("appendable", true);
    this.$store.commit("tabs", {});
  }

  onBeforeAppend() {
    this.$store.commit("append", "chara");
  }
}
</script>
