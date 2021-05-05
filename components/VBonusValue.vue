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
        v-model="bonus.value"
        :label="label"
        :precision="precision"
        :disabled="!editable"
        :suffix="suffix"
        hide-details="auto"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
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
  @Prop({ required: true }) bonus!: BonusValue;

  selectedItem: number = 0;

  get icon(): string {
    return BonusDisplayInfo[this.bonus.type].icon!;
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
    return BonusDisplayInfo[this.bonus.type].suffix ? 1 : 0;
  }

  get editable() {
    return this.bonus.type !== BonusType.None;
  }

  get suffix() {
    return BonusDisplayInfo[this.bonus.type].suffix ?? "";
  }

  mounted() {
    this.selectedItem = this.types.indexOf(this.bonus.type);
  }

  change(index: number) {
    this.selectedItem = index;
    this.$set(this.bonus, "type", this.types[index]);
    this.$set(this.bonus, "value", "0");
  }
}
</script>
