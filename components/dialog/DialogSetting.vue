<template>
  <v-dialog v-bind="$attrs" v-on="$listeners" v-model="refShow">
    <v-card>
      <v-card-title v-text="title" />
      <v-card-text v-html="text" />
      <v-card-text v-if="exists" v-html="subtext" class="text-caption" />
      <v-card-actions>
        <v-spacer />
        <v-btn text color="secondary" @click="refShow = false">{{
          $t("dialog.cancel")
        }}</v-btn>
        <v-btn text color="primary" @click="onAccept">{{
          $t("dialog.ok")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
::v-deep .v-list-item__content {
  padding: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "DialogSetting",
  inheritAttrs: false,
})
export default class DialogSetting extends Vue {
  @Prop({ required: true }) show!: boolean;
  @Prop({ required: true }) group!: string;

  get refShow() {
    return this.show;
  }
  set refShow(value: boolean) {
    this.$emit("update:show", value);
  }

  get title() {
    return this.$t(`setting.${this.group}.title`);
  }

  get text() {
    return this.$t(`setting.${this.group}.text`);
  }

  get exists() {
    return this.$te(`setting.${this.group}.subtext`);
  }

  get subtext() {
    return this.$t(`setting.${this.group}.subtext`);
  }

  @Emit("accept")
  onAccept() {
    this.refShow = false;
  }
}
</script>
