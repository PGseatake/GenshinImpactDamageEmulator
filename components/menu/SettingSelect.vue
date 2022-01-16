<template>
  <v-select
    v-bind="$attrs"
    v-model="value"
    :items="items"
    dense
    single-line
    hide-details
    @change="onChange"
  >
    <template #selection="{ item }">
      {{ $t(`setting.${prop}.${item.text}`) }}
    </template>
    <template #item="{ item }">
      {{ $t(`setting.${prop}.${item.text}`) }}
    </template>
  </v-select>
</template>

<style lang="scss" scoped>
::v-deep .v-select__selection {
  text-align: center;
}
::v-deep .v-select__selections input {
  width: 0.5em;
}
.v-input ::v-deep .v-input__append-inner {
  padding: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { SettingString } from "~/src/setting";

export type ISelectItem = { readonly text: string; readonly value: string };
export type ISelect = {
  readonly prop: string;
  readonly items: ReadonlyArray<ISelectItem>;
  readonly change?: (value: string) => void;
};

@Component({
  name: "SettingSelect",
  inheritAttrs: false,
})
export default class SettingSelect extends Vue {
  @Prop({ required: true }) prop!: keyof SettingString;
  @Prop({ default: [] }) items!: ReadonlyArray<ISelectItem>;
  @Prop({ default: undefined }) change?: (value: string) => void;

  value = "";

  @Emit("change")
  onChange(value: string) {
    this.$db.setting[this.prop] = value;
    if (this.change) {
      this.change(value);
    }
  }

  mounted() {
    this.value = this.$db.setting[this.prop] || "";
  }
}
</script>
