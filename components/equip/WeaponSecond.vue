<template>
  <bonus-value
    v-bind="$attrs"
    v-on="$listeners"
    :types="[second]"
    :value.sync="refValue"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { WeaponList } from "~/src/weapon";
import BonusValue from "~/components/equip/BonusValue.vue";

@Component({
  name: "WeaponSecond",
  components: { BonusValue },
  inheritAttrs: false,
})
export default class WeaponSecond extends Vue {
  @Prop({ required: true }) list!: WeaponList;
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) value!: number;

  @Watch("name")
  onChangeName() {
    this.$emit("update:type", this.second);
  }

  get refValue() {
    return this.value;
  }
  set refValue(value: number) {
    this.$emit("update:value", value);
  }

  get second() {
    return this.list[this.name].second;
  }
}
</script>
