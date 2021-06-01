<template>
  <v-dialog
    v-bind="$attrs"
    v-on="$listeners"
    v-model="show"
    @click:outside="onCancel"
  >
    <v-card>
      <v-card-title
        >{{ $t("tab." + type) }}{{ $t("dialog.append") }}</v-card-title
      >
      <v-card-text>
        <v-select v-model="value" :items="items" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click="onCancel">{{
          $t("dialog.cancel")
        }}</v-btn>
        <v-btn text color="primary" :disabled="!value" @click="onAccept">{{
          $t("dialog.append")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

type TextValue = { text: string; value: string };

@Component({
  name: "VAppendDIalog",
  inheritAttrs: false,
})
export default class VAppendDIalog extends Vue {
  @Prop({ required: true }) type!: string;
  @Prop({ required: true }) items!: Array<TextValue>;

  @Emit("append")
  onAppend(value: string) {}

  value: string = "";

  get show() {
    return this.$store.state.append;
  }
  set show(value: boolean) {
    this.$store.commit("setAppend", value);
  }

  onCancel() {
    this.value = "";
    this.show = false;
  }

  onAccept() {
    this.onAppend(this.value);
    this.value = "";
    this.show = false;
  }
}
</script>
