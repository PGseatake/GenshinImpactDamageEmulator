<template>
  <v-container>
    <v-character-data :items="$gideData.chara" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "PageCharacter",
  components: {
    VCharacterData: () => import("~/components/VCharacterData.vue"),
  },
})
export default class PageCharacter extends Vue {}
</script>
