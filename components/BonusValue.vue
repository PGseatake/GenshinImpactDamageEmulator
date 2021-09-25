<template>
  <v-row dense>
    <v-col :align-self="align" class="pa-0" cols="auto">
      <v-menu offset-y>
        <template #activator="{ attrs, on }">
          <v-badge
            :value="!!score"
            :content="score"
            left
            offset-x="12"
            offset-y="12"
            color="cyan darken-1"
          >
            <v-btn
              v-bind="attrs"
              v-on="on"
              :disabled="!selectable"
              fab
              x-small
              class="my-1"
            >
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
          </v-badge>
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
      <number-field
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
import { BonusType, StatusBonusType, ElementBonusType } from "~/src/const";
import { RateBonus } from "~/src/bonus";

type DisplayBonusType = "none" | StatusBonusType | ElementBonusType;

const BonusIcons: Record<DisplayBonusType, string> = {
  none: mdiMinus,
  hp: mdiWaterOutline,
  hp_buf: mdiWaterPercent,
  atk: mdiSword,
  atk_buf: mdiSwordCross,
  def: mdiShieldOutline,
  def_buf: mdiShieldHalfFull,
  elem: mdiGoogleCirclesExtended,
  en_rec: mdiRestore,
  heal_buf: mdiRestore,
  cri_dmg: mdiStarFourPoints,
  cri_rate: mdiStarFourPoints,
  pyro_dmg: mdiAlphaPCircleOutline,
  hydro_dmg: mdiAlphaHCircleOutline,
  dendro_dmg: mdiAlphaDCircleOutline,
  elect_dmg: mdiAlphaECircleOutline,
  anemo_dmg: mdiAlphaACircleOutline,
  cryo_dmg: mdiAlphaCCircleOutline,
  geo_dmg: mdiAlphaGCircleOutline,
  phys_dmg: mdiBoxingGlove,
} as const;

@Component({
  name: "BonusValue",
  components: {
    NumberField: () => import("~/components/NumberField.vue"),
  },
})
export default class BonusValue extends Vue {
  @Prop({ required: true }) types!: ReadonlyArray<DisplayBonusType>;
  @Prop({ required: true }) type!: DisplayBonusType;
  @Prop({ required: true }) value!: number;
  @Prop({ default: "" }) score!: string;

  @Emit("change")
  onChange() {}

  get refValue() {
    return this.value;
  }
  set refValue(value: number) {
    this.$emit("update:value", value);
    this.onChange();
  }

  get selectedItem() {
    return this.types.indexOf(this.type);
  }
  set selectedItem(value: number) {
    this.$emit("update:type", this.types[value]);
    this.$emit("update:value", 0);
    this.onChange();
  }

  get selectable() {
    return 1 < this.types.length;
  }

  get editable() {
    return this.type !== BonusType.None;
  }

  get icon() {
    return BonusIcons[this.type];
  }

  get label() {
    if (this.types.includes(this.type)) {
      return this.$t("bonus." + this.type);
    }
    return this.$t("bonus.none");
  }

  get suffix() {
    return RateBonus.suffix(this.type);
  }

  get precision() {
    return RateBonus.check(this.type) ? 1 : 0;
  }

  get align() {
    return this.score ? "end" : "center";
  }
}
</script>
