<template>
  <div class="pb-1">
    <v-select
      v-bind="$attrs"
      v-on="$listeners"
      v-model="refValue"
      :items="items"
      :dense="dense"
      :menu-props="{ auto: true, transition: false }"
      hide-details
    />
    <v-text-field
      v-model="refComment"
      :placeholder="$t('general.comment')"
      :disabled="!commentable"
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

type TextValue = {
  text: string;
  value: string;
};

@Component({
  name: "NameComment",
  inheritAttrs: false,
})
export default class NameComment extends Vue {
  @Prop({ required: true }) items!: ReadonlyArray<TextValue>;
  @Prop({ required: true }) value!: any;
  @Prop({ required: true }) comment!: string;
  @Prop({ default: true }) commentable!: boolean;
  @Prop({ default: true }) dense!: boolean;

  get refValue() {
    return this.value;
  }
  set refValue(value: any) {
    this.$emit("update:value", value);
  }

  get refComment() {
    return this.comment;
  }
  set refComment(comment: string) {
    this.$emit("update:comment", comment);
  }

  get commentClass() {
    return "pa-0 " + (this.dense ? "caption" : "body-2");
  }
}
</script>
