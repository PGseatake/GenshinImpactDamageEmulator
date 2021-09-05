<template>
  <bonus-value
    v-bind="$attrs"
    v-on="$listeners"
    :types="[special]"
    :value.sync="refValue"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { CharaName, CharaList } from "~/src/character";

@Component({
  name: "CharaSpecial",
  inheritAttrs: false,
})
export default class CharaSpecial extends Vue {
  @Prop({ required: true }) name!: CharaName;
  @Prop({ required: true }) value!: number;

  @Watch("name")
  onChangeName() {
    this.$emit("update:type", this.special);
  }

  get refValue() {
    return this.value;
  }
  set refValue(value: number) {
    this.$emit("update:value", value);
  }

  get special() {
    return CharaList[this.name].special;
  }
}
</script>
