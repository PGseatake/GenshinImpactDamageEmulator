<template>
  <v-snackbar app v-model="show" timeout="3000" content-class="text-center">{{
    text
  }}</v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";

@Component({
  name: "PopupBar",
  inheritAttrs: false,
})
export default class PopupBar extends Vue {
  show = false;
  text = "";

  get storePopup() {
    return this.$store.state.popup;
  }

  @Watch("storePopup")
  onChangeStorePopup(value: string) {
    if (value) {
      this.text = this.$t("popup." + value) as string;
      this.show = true;
      this.$nextTick(() => this.$store.commit("popup", ""));
    }
  }
}
</script>
