<template>
  <span>
    <!--文字列表示用-->
    <v-text-field
      v-if="!editable"
      v-bind="$attrs"
      v-on="$listeners"
      v-model="strValue"
      type="string"
      :suffix="suffix"
      @focus.capture="focus1"
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
      :step="step"
      @focus="focus2"
      @blur="display"
      @keyup.enter="enter"
    />
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib";

@Component({
  name: "VNumberField",
  components: { VTextField },
  inheritAttrs: false,
})
export default class VNumberField extends Vue {
  @Prop({ required: true }) value!: number;
  @Prop({ default: "" }) suffix!: string;
  @Prop({ default: 1 }) precision!: number;

  blurable: boolean = false;
  editable: boolean = false;
  numValue: string = "0.0";

  get step() {
    return Math.pow(0.1, this.precision);
  }

  get strValue() {
    this.numValue = this.value.toFixed(this.precision);
    return this.numValue;
  }
  set strValue(_: string) {}

  // 表示用と入力用のtext-field切り替え
  focus1() {
    // 切り替え時にblurが発生するので無視するように調整
    this.blurable = false;
    this.editable = true;
  }

  focus2() {
    this.blurable = true;
  }

  display() {
    if (this.blurable) {
      const val = this.numValue;
      let num = 0;
      if (val.length !== 0) {
        num = parseFloat(val);
        if (isNaN(num)) {
          num = 0;
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
