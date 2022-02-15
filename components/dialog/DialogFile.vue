<template>
  <v-dialog v-bind="$attrs" v-on="$listeners" v-model="refShow">
    <v-card>
      <v-card-title v-text="label" />
      <v-card-text>
        <slot />
        <div v-text="detail" :style="textStyle" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          text
          color="secondary"
          v-text="$t('dialog.cancel')"
          @click="refShow = false"
        />
        <v-btn
          text
          color="primary"
          v-text="$t('dialog.ok')"
          :disabled="!file"
          @click="onChange"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "DialogFile",
  inheritAttrs: false,
})
export default class DialogFile extends Vue {
  @Prop({ required: true }) show!: boolean;
  @Prop({ required: true }) file!: string | File | null;
  @Prop({ default: "" }) label!: string;
  @Prop({ default: "" }) detail!: string;

  @Emit("accept")
  onAccept() {}

  get refShow() {
    return this.show;
  }
  set refShow(value: boolean) {
    this.$emit("update:show", value);
  }

  get textStyle() {
    if (this.$vuetify.breakpoint.xs) {
      return "";
    }
    return "text-align: center";
  }

  onChange() {
    this.refShow = false;
    this.onAccept();
  }
}
</script>
