<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    v-model="refType"
    :items="items"
    :item-text="getElementText"
    item-value="type"
    dense
    hide-details
    class="ma-0"
  >
    <template #selection="{ item }">
      <chip-element v-if="item.type" :element="item.type" small />
      <template v-else>{{ $t("element.none") }}</template>
    </template>
  </v-select>
</template>

<style lang="scss" scoped>
::v-deep .v-select__selection {
  width: 100%;
  max-width: 100%;
  margin: 0 !important;
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
import { NoneElementType } from "~/src/const";

@Component({
  name: "SelectElement",
  inheritAttrs: false,
})
export default class SelectElement extends Vue {
  @Prop({ required: true }) type!: NoneElementType;
  @Prop({ required: true }) types!: NoneElementType[];

  get items() {
    return this.types.map((val) => ({ type: val }));
  }

  get refType() {
    return this.type;
  }
  set refType(value: NoneElementType) {
    this.$emit("update:type", value);
  }

  getElementText({ type }: { type: NoneElementType }) {
    return this.$t("element." + (type || "none"));
  }
}
</script>
