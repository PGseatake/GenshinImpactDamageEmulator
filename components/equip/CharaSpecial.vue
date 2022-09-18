<template>
  <bonus-value v-bind="$attrs" v-on="$listeners" :types="[special]" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { CharaName, CharaList } from "~/src/character";
import BonusValue from "~/components/equip/BonusValue.vue";

@Component({
  name: "CharaSpecial",
  components: { BonusValue },
  inheritAttrs: false,
})
export default class CharaSpecial extends Vue {
  // @Prop({ required: true }) value!: number;
  @Prop({ required: true }) name!: CharaName;

  @Watch("name")
  onChangeName() {
    this.$emit("update:type", this.special);
  }

  get special() {
    return CharaList[this.name].special;
  }
}
</script>
