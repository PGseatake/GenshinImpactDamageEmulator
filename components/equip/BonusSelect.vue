<template>
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
          :disabled="disabled"
          fab
          x-small
          class="my-1"
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </v-badge>
    </template>
    <v-list>
      <v-list-item-group v-model="type" color="primary" mandatory>
        <v-list-item
          v-for="item in types"
          :key="item.type"
          :disabled="disabled"
          link
          dense
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
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
import { StatusBonusType, ElementBonusType } from "~/src/const";

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
  name: "BonusSelect",
  inheritAttrs: false,
})
export default class BonusSelect extends Vue {
  @Prop({ required: true }) value!: DisplayBonusType;
  @Prop({ required: true }) items!: ReadonlyArray<DisplayBonusType>;
  @Prop({ default: "" }) score!: string;

  get types() {
    const i18n = this.$i18n;
    return this.items.map((v) => ({
      type: v,
      text: i18n.t("bonus." + v),
    }));
  }

  get type() {
    return this.items.indexOf(this.value);
  }
  set type(value: number) {
    this.$emit("input", this.items[value]);
  }

  get disabled() {
    return this.items.length <= 1;
  }

  get icon() {
    return BonusIcons[this.value];
  }
}
</script>
