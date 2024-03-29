<template>
  <div>
    <!--文字列表示用-->
    <v-text-field
      v-if="!editable"
      v-bind="$attrs"
      :value="strValue"
      type="string"
      hide-details="auto"
      :suffix="suffix"
      :class="textClass"
      @focus.capture="focusTxt"
    />
    <!--数値入力用-->
    <v-text-field
      v-if="editable"
      v-bind="$attrs"
      v-on="$listeners"
      v-model="numValue"
      ref="input"
      min="0"
      type="number"
      hide-details="auto"
      :step="step"
      :class="textClass"
      @focus="focusNum"
      @blur="confirm"
      @keyup.enter="enter"
    />
  </div>
</template>

<style lang="scss" scoped>
.hide-label {
  padding-top: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "NumberField",
  inheritAttrs: false,
})
export default class NumberField extends Vue {
  @Prop({ required: true }) value!: number;
  @Prop({ default: "" }) suffix!: string;
  @Prop({ default: 0 }) precision!: number;
  @Prop({ default: false }) hideLabel!: boolean;

  blurable = false;
  editable = false;
  numValue = "0";

  get strValue() {
    const val = this.value.toFixed(this.precision);
    this.numValue = val;
    return val;
  }

  get step() {
    return Math.pow(0.1, this.precision);
  }

  get textClass() {
    return this.hideLabel ? "hide-label" : "";
  }

  // 表示用と入力用のtext-field切り替え
  focusTxt() {
    // 切り替え時にblurが発生するので無視するように調整
    this.blurable = false;
    this.editable = true;
  }
  focusNum() {
    this.blurable = true;
  }

  confirm() {
    if (this.blurable) {
      const val = this.numValue;
      let num = 0;
      if (val.length) {
        num = parseFloat(val);
        if (isNaN(num)) {
          num = this.value;
        }
      }
      this.$emit("update:value", num);
      this.numValue = num.toFixed(this.precision);
      this.editable = false;
    }
  }

  enter() {
    (this.$refs.input as HTMLElement).blur();
  }
}
</script>
