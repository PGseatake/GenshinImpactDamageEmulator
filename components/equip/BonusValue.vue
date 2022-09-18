<template>
  <v-row dense>
    <v-col align-self="end" class="pa-0" cols="auto">
      <bonus-select v-model="refType" :items="types" :score="$attrs.score" />
    </v-col>
    <v-col>
      <number-field
        v-bind="$attrs"
        v-on="$listeners"
        :label="label"
        :suffix="suffix"
        :disabled="!editable"
        :precision="precision"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { AnyBonusType, BonusType } from "~/src/const";
import { RateBonus } from "~/src/special";

@Component({
  name: "BonusValue",
  components: {
    BonusSelect: () => import("~/components/equip/BonusSelect.vue"),
    NumberField: () => import("~/components/input/NumberField.vue"),
  },
  inheritAttrs: false,
})
export default class BonusValue extends Vue {
  // @Prop({ required: true }) value!: number;
  @Prop({ required: true }) type!: AnyBonusType;
  @Prop({ required: true }) types!: ReadonlyArray<AnyBonusType>;
  // @Prop({ default: "" }) score!: string;

  get refType() {
    return this.type;
  }
  set refType(value: string) {
    this.$emit("update:type", value);
    this.$emit("update:value", 0);
  }

  get editable() {
    return this.type !== BonusType.None;
  }

  get label() {
    const type = this.type;
    let key = "bonus.none";
    if (this.types.includes(type)) {
      key = "bonus_short." + type;
    }
    return this.$t(key);
  }

  get suffix() {
    return RateBonus.suffix(this.type);
  }

  get precision() {
    return RateBonus.check(this.type) ? 1 : 0;
  }
}
</script>
