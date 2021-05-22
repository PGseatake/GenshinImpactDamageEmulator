<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    :items="items"
    item-text="value"
    dense
    single-line
    hide-details
    type="number"
  />
</template>

<style lang="scss" scoped>
::v-deep .v-select__selections input {
  width: 0;
}
.v-input ::v-deep .v-input__append-inner {
  padding: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { VSelect } from "vuetify/lib";

@Component({
  name: "VSelectRange",
  components: { VSelect },
  inheritAttrs: false,
})
export default class VSelectRange extends Vue {
  @Prop({ required: true }) min!: number;
  @Prop({ required: true }) max!: number;

  get items() {
    const min = this.min;
    const max = this.max;
    return Array.from({ length: max - min + 1 }, (_, i): { value: number } => ({
      value: min + i,
    }));
  }
}
</script>
