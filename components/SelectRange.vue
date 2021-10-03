<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    :items="items"
    :label="label"
    :append-icon="icon"
    :single-line="!label"
    :menu-props="{ auto: true, transition: false }"
    dense
    hide-details
    item-text="value"
    type="number"
    :class="selectClass"
  />
</template>

<style lang="scss" scoped>
::v-deep .v-select__selection {
  width: 100%;
  margin: 0 !important;
  text-align: center;
}
::v-deep .v-select__selections input {
  width: 0;
}
.v-input ::v-deep .v-input__append-inner {
  padding: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mdiMenuDown } from "@mdi/js";

@Component({
  name: "SelectRange",
  inheritAttrs: false,
})
export default class SelectRange extends Vue {
  @Prop({ required: true }) min!: number;
  @Prop({ required: true }) max!: number;
  @Prop({ default: undefined }) label: string | undefined;

  readonly icon = mdiMenuDown;

  get items() {
    const min = this.min;
    const max = this.max;
    return Array.from({ length: max - min + 1 }, (_, i): { value: number } => ({
      value: min + i,
    }));
  }

  get selectClass() {
    return !this.label ? "ma-0" : "";
  }
}
</script>
