<template>
  <v-bonus-value
    v-bind="$attrs"
    v-on="$listeners"
    :types="[second]"
    :value.sync="refValue"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { WeaponList } from "~/src/weapon";

@Component({
  name: "VWeaponSecond",
  components: { VBonusValue: () => import("~/components/VBonusValue.vue") },
  inheritAttrs: false,
})
export default class VWeaponSecond extends Vue {
  @Prop({ required: true }) list!: WeaponList;
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) value!: number;

  get second() {
    return this.list[this.name].second;
  }

  get refValue() {
    return this.value;
  }
  set refValue(value: number) {
    this.$emit("update:value", value);
  }

  @Watch("name")
  onChangeName() {
    this.$emit("update:type", this.second);
  }
}
</script>
