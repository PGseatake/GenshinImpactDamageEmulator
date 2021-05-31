<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-character-data :items="charas" :append="append" />

    <v-btn fab small @click="onAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiPlaylistPlus } from "@mdi/js";

@Component({
  name: "PageCharacter",
  components: {
    VCharacterData: () => import("~/components/VCharacterData.vue"),
  },
})
export default class PageCharacter extends Vue {
  readonly icons: IReadonlyMap<string> = {
    append: mdiPlaylistPlus,
  };

  get charas() {
    return this.$store.state.data.chara;
  }

  get append() {
    return this.$store.state.append;
  }

  onAppend() {
    this.$store.commit("setAppend", true);
  }
}
</script>
