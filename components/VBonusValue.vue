<template>
  <v-row dense>
    <v-col md="auto">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            fab
            dark
            x-small
            :disabled="!selectable"
          >
            <v-icon dark> {{ icon }} </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(type, index) in types"
            :key="index"
            :disabled="!selectable"
            dense
            link
            @click="selected = index"
          >
            <v-list-item-title>{{ $t("bonus." + type) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
    <v-col>
      <v-number-field
        :refer="bonus"
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
import { mdiMinus } from "@mdi/js";
const VNumberField = () => import("./VNumberField.vue");

export type BonusValue = {
  type: BonusDisplayType;
  value: number;
};

@Component({
  components: { VNumberField },
})
export default class VBonusValue extends Vue {
  @Prop({ required: true }) types!: ReadonlyArray<BonusDisplayType>;
  @Prop({ required: true }) bonus!: BonusValue;

  selectedItem: number = 0;

  get selected() {
    return this.selectedItem;
  }
  set selected(num: number) {
    const types = this.types;
    if (0 <= num && num < types.length) {
      this.selectedItem = num;
      this.bonus.type = types[num];
    } else {
      this.selectedItem = -1;
      this.bonus.type = BonusType.None;
    }
    this.bonus.value = 0;
  }

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
    const types = this.types;
    if (types.length <= 1) {
      this.bonus.type = types[0];
      this.selectedItem = 0;
    } else {
      const idx = types.indexOf(this.bonus.type);
      if (idx < 0) {
        this.bonus.type = BonusType.None;
      }
      this.selectedItem = idx;
    }
  }
}
</script>
