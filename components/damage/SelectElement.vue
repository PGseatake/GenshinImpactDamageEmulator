<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    :menu-props="{ auto: true, transition: false }"
    :items="types"
    item-value="type"
    dense
    hide-details
  >
    <template #selection="{ item }">
      <chip-element v-if="item.type" :element="item.type" small />
      <template v-else>{{ item.text }}</template>
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
import { AnyElementType } from "~/src/const";
import ChipElement from "~/components/input/ChipElement.vue";

@Component({
  name: "SelectElement",
  components: { ChipElement },
  inheritAttrs: false,
})
export default class SelectElement extends Vue {
  // @Prop({ required: true }) value!: AnyElementType;
  @Prop({ required: true }) items!: AnyElementType[];

  get types() {
    return this.items.map((v) => ({
      text: this.$t("element." + (v || "none")),
      type: v,
    }));
  }
}
</script>
