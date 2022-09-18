<template functional>
  <v-select
    v-bind="data.attrs"
    v-on="listeners"
    :label="props.label"
    :append-icon="props.icon"
    :single-line="!props.label"
    :menu-props="{ auto: true, transition: false }"
    dense
    hide-details
    item-text="value"
    type="number"
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

<script>
import { mdiMenuDown } from "@mdi/js";

export default {
  functional: true,
  name: "SelectRangeK",
  props: {
    // items: { type: Array, required: true },
    label: { type: String, default: "" },
    icon: { type: String, default: mdiMenuDown },
  },
};
</script>
