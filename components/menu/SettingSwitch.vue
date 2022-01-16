<template>
  <v-switch
    v-bind="$attrs"
    v-model="value"
    :input-value="value"
    dense
    inset
    single-line
    hide-details
    @change="onChange"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { SettingBoolean } from "~/src/convert";

export type ISwitch = {
  readonly prop: string;
  readonly change?: (value: boolean) => void;
};

@Component({
  name: "SettingSwitch",
  inheritAttrs: false,
})
export default class SettingSwitch extends Vue {
  @Prop({ required: true }) prop!: keyof SettingBoolean;
  @Prop({ default: undefined }) change?: (value: boolean) => void;

  value = false;

  @Emit("change")
  onChange(value: boolean) {
    this.$db.setting[this.prop] = value;
    if (this.change) {
      this.change(value);
    }
  }

  mounted() {
    this.value = this.$db.setting[this.prop] || false;
  }
}
</script>
