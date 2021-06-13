<template>
  <v-row dense>
    <v-col align-self="center" class="pa-0" cols="auto">
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
          <v-list-item-group v-model="selectedItem" color="primary" mandatory>
            <v-list-item
              v-for="(type, index) in types"
              :key="index"
              :disabled="!selectable"
              link
              dense
            >
              <v-list-item-title>{{ $t("bonus." + type) }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
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
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import {
  mdiAlphaACircleOutline,
  mdiAlphaCCircleOutline,
  mdiAlphaDCircleOutline,
  mdiAlphaECircleOutline,
  mdiAlphaGCircleOutline,
  mdiAlphaHCircleOutline,
  mdiAlphaPCircleOutline,
  mdiBoxingGlove,
  mdiGoogleCirclesExtended,
  mdiMinus,
  mdiRestore,
  mdiShieldHalfFull,
  mdiShieldOutline,
  mdiStarFourPoints,
  mdiSword,
  mdiSwordCross,
  mdiWaterOutline,
  mdiWaterPercent,
} from "@mdi/js";
import { BonusType, BonusDisplayType } from "~/src/const";

type BonusDisplayInfo = {
  icon: string;
  suffix?: string;
};

const BonusDisplayInfo: ReadonlyRecord<BonusDisplayType, BonusDisplayInfo> = {
  none: { icon: mdiMinus },
  hp: { icon: mdiWaterOutline },
  hp_buf: { icon: mdiWaterPercent, suffix: "%" },
  atk: { icon: mdiSword },
  atk_buf: { icon: mdiSwordCross, suffix: "%" },
  def: { icon: mdiShieldOutline },
  def_buf: { icon: mdiShieldHalfFull, suffix: "%" },
  elem: { icon: mdiGoogleCirclesExtended },
  en_rec: { icon: mdiRestore, suffix: "%" },
  heal_buf: { icon: mdiRestore, suffix: "%" },
  cri_dmg: { icon: mdiStarFourPoints, suffix: "%" },
  cri_rate: { icon: mdiStarFourPoints, suffix: "%" },
  pyro_dmg: { icon: mdiAlphaPCircleOutline, suffix: "%" },
  hydro_dmg: { icon: mdiAlphaHCircleOutline, suffix: "%" },
  dendro_dmg: { icon: mdiAlphaDCircleOutline, suffix: "%" },
  elect_dmg: { icon: mdiAlphaECircleOutline, suffix: "%" },
  anemo_dmg: { icon: mdiAlphaACircleOutline, suffix: "%" },
  cryo_dmg: { icon: mdiAlphaCCircleOutline, suffix: "%" },
  geo_dmg: { icon: mdiAlphaGCircleOutline, suffix: "%" },
  phys_dmg: { icon: mdiBoxingGlove, suffix: "%" },
};

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

  @Emit("change")
  onChange() {}

  get selectable() {
    return 1 < this.types.length;
  }

  get editable() {
    return this.type !== BonusType.None;
  }

  get icon() {
    return BonusDisplayInfo[this.type].icon!;
  }

  get label() {
    if (this.types.indexOf(this.type) < 0) {
      return this.$t("bonus.none");
    }
    return this.$t("bonus." + this.type);
  }

  get suffix() {
    return BonusDisplayInfo[this.type].suffix ?? "";
  }

  get precision() {
    return BonusDisplayInfo[this.type].suffix ? 1 : 0;
  }

  get refValue() {
    return this.value;
  }
  set refValue(num: number) {
    this.$emit("update:value", num);
    this.onChange();
  }

  get selectedItem() {
    return this.types.indexOf(this.type);
  }
  set selectedItem(item: number) {
    this.$emit("update:type", this.types[item]);
    this.$emit("update:value", 0);
    this.onChange();
  }
}
</script>
