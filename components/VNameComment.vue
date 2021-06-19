<template>
  <div class="pb-1">
    <v-select
      v-bind="$attrs"
      v-on="$listeners"
      v-model="refName"
      :items="items"
      :dense="dense"
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

export type TextValue = {
  text: string;
  value: string;
};

@Component({
  name: "VNameComment",
  inheritAttrs: false,
})
export default class VNameComment extends Vue {
  @Prop({ required: true }) items!: ReadonlyArray<TextValue>;
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) comment!: string;
  @Prop({ default: true }) commentable!: boolean;
  @Prop({ default: true }) dense!: boolean;

  get refName() {
    return this.name;
  }
  set refName(name: string) {
    this.$emit("update:name", name);
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
