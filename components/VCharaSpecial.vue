<template>
  <v-bonus-value
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
  name: "VCharaSpecial",
  components: { VBonusValue: () => import("~/components/VBonusValue.vue") },
  inheritAttrs: false,
})
export default class VCharaSpecial extends Vue {
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
