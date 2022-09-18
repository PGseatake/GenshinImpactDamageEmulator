<template>
  <div class="pb-1">
    <v-select
      v-bind="$attrs"
      v-on="$listeners"
      @input="$listeners['update:value']"
      :dense="dense"
      :menu-props="{ auto: true, transition: false }"
      hide-details
    />
    <v-text-field
      :value="$attrs['comment']"
      @input="$listeners['update:comment'] || (() => {})"
      :placeholder="placeholder"
      :disabled="!full"
      :dense="dense"
      :class="commentClass"
      single-line
      hide-details
      height="1.5em"
    />
  </div>
</template>

<style lang="scss" scoped>
::v-deep .v-select__selections input {
  width: 1em;
}
.v-input ::v-deep .v-input__append-inner {
  padding: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "NameComment",
  inheritAttrs: false,
})
export default class NameComment extends Vue {
  // @Prop({ required: true }) items!: ReadonlyArray<TextValue>;
  // @Prop({ required: true }) value!: any;
  // @Prop({ required: true }) comment!: string;
  @Prop({ default: true }) full!: boolean;
  @Prop({ default: true }) dense!: boolean;

  get commentClass() {
    return ["pa-0", this.dense ? "caption" : "body-2"];
  }

  get placeholder() {
    return this.$t("general.comment");
  }
}
</script>
