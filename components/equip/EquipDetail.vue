<template>
  <div>
    <select-name
      v-bind="$attrs"
      v-on="$listeners"
      :items="items"
      hide-details
      group="chara"
    />
    <v-text-field
      :value="comment"
      dense
      disabled
      single-line
      hide-details
      height="1.5em"
      placeholder="-"
      class="pa-0 caption"
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

div.detail {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  line-height: 1.2em;
  letter-spacing: 0.0333333333em;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { SelectItem } from "~/components/input/SelectName.vue";

@Component({
  name: "EquipDetail",
  components: {
    SelectName: () => import("~/components/input/SelectName.vue"),
  },
  inheritAttrs: false,
})
export default class EquipDetail extends Vue {
  // @Prop({ required: true }) value!: string;
  @Prop({ required: true }) items!: ReadonlyArray<SelectItem>;

  get item() {
    const value = this.$attrs.value;
    return this.items.find((item) => item.id === value);
  }

  get comment() {
    return this.item?.comment || "-";
  }
}
</script>
