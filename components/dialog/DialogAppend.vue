<template>
  <v-dialog
    v-bind="$attrs"
    v-on="$listeners"
    v-model="show"
    @click:outside="onCancel"
  >
    <v-card>
      <v-card-title v-text="title" />
      <v-card-text>
        <slot />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="secondary" @click="onCancel">{{
          $t("dialog.cancel")
        }}</v-btn>
        <v-btn text color="primary" :disabled="disabled" @click="onAccept">{{
          $t("dialog.append")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "DialogAppend",
  inheritAttrs: false,
})
export default class DialogAppend extends Vue {
  @Prop({ required: true }) type!: string;
  @Prop({ default: false }) disabled!: boolean;

  @Emit("accept")
  onAccept() {
    this.show = false;
  }

  @Emit("cancel")
  onCancel() {
    this.show = false;
  }

  get title() {
    return (this.$t("tab." + this.type) as string) + this.$t("dialog.append");
  }

  get show() {
    return this.$store.state.append === this.type;
  }
  set show(value: boolean) {
    this.$store.commit("append", value);
  }
}
</script>
