<template>
  <v-row dense>
    <v-col align-self="center" md="auto" class="pa-0">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            :disabled="!selectable"
            fab
            dark
            x-small
          >
            <v-icon dark> {{ icon }} </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(type, index) in types"
            :key="index"
            :disabled="!selectable"
            link
            dense
            @click="change(index)"
          >
            <v-list-item-title>{{ $t("bonus." + type) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
    <v-col>
      <v-number-field
        :value.sync="refValue"
        :label="label"
        :suffix="suffix"
        :disabled="!editable"
        :precision="precision"
        hide-details="auto"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { BonusType, BonusDisplayInfo, BonusDisplayType } from "~/src/const";
// import {
//   mdiMinus,
//   mdiWaterOutline,
//   mdiWaterPercent,
//   mdiSword,
//   mdiSwordCross,
//   mdiShieldOutline,
//   mdiShieldHalfFull,
//   mdiGoogleCirclesExtended,
//   mdiRestore,
//   mdiStarFourPoints,
// } from "@mdi/js";

export type BonusValue = {
  type: BonusDisplayType;
  value: number;
};

@Component({
  name: "VBonusValue",
  components: { VNumberField: () => import("./VNumberField.vue") },
})
export default class VBonusValue extends Vue {
  @Prop({ required: true }) types!: ReadonlyArray<BonusDisplayType>;
  @Prop({ required: true }) type!: BonusDisplayType;
  @Prop({ required: true }) value!: number;

  selectedItem: number = 0;

  get icon(): string {
    return BonusDisplayInfo[this.type].icon!;
  }

  get label() {
    const idx = this.selectedItem;
    if (idx < 0) {
      return this.$t("bonus.none");
    }
    return this.$t("bonus." + this.types[idx]);
  }

  get selectable() {
    return 1 < this.types.length;
  }

  get precision() {
    return BonusDisplayInfo[this.type].suffix ? 1 : 0;
  }

  get editable() {
    return this.type !== BonusType.None;
  }

  get suffix() {
    return BonusDisplayInfo[this.type].suffix ?? "";
  }

  get refValue() {
    return this.value;
  }
  set refValue(num: number) {
    this.$emit("update:value", num);
  }

  mounted() {
    this.selectedItem = this.types.indexOf(this.type);
  }

  @Watch("type")
  onChangeType() {
    this.selectedItem = this.types.indexOf(this.type);
  }

  change(index: number) {
    this.selectedItem = index;
    this.$emit("update:type", this.types[index]);
    this.$emit("update:value", 0);
  }
}
</script>
