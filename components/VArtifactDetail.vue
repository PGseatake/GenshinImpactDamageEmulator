<template>
  <v-container class="pa-0">
    <v-row no-gutters align="end">
      <v-col cols="auto" class="pa-0">
        <v-select-name
          :value.sync="refValue"
          :items="items"
          :group="'artifact.' + type"
        />
      </v-col>
      <v-col cols="auto" class="px-2 py-0 detail" v-text="comment" />
    </v-row>
    <v-row no-gutters>
      <v-col cols="auto" class="px-1 py-0 detail" v-text="level" />
      <v-col v-if="main" cols="auto" class="px-1 py-0 detail" v-text="main" />
      <v-col v-if="sub1" cols="auto" class="px-1 py-0 detail" v-text="sub1" />
      <v-col v-if="sub2" cols="auto" class="px-1 py-0 detail" v-text="sub2" />
      <v-col v-if="sub3" cols="auto" class="px-1 py-0 detail" v-text="sub3" />
      <v-col v-if="sub4" cols="auto" class="px-1 py-0 detail" v-text="sub4" />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
div.detail {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  line-height: 1.2em;
  letter-spacing: 0.0333333333em;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ArtifactType, BonusType } from "~/src/const";
import { IArtifactData, IBonusValueData } from "~/src/interface";

const DirectBonus = ["none", "hp", "atk", "def", "elem"];

@Component({
  name: "VArtifactDetail",
  components: {
    VSelectName: () => import("~/components/VSelectName.vue"),
  },
  inheritAttrs: false,
})
export default class VArtifactDetail extends Vue {
  @Prop({ required: true }) type!: ArtifactType;
  @Prop({ required: true }) items!: ReadonlyArray<IArtifactData>;
  @Prop({ default: "" }) value!: string;

  get refValue() {
    return this.value;
  }
  set refValue(value: string) {
    this.$emit("update:value", value);
  }

  get item() {
    return this.items.find((item) => item.id === this.value);
  }

  get comment() {
    return this.item?.comment || "-";
  }

  get level() {
    return `Lv.${this.item?.level || 0}`;
  }

  get main() {
    return this.format(this.item?.main);
  }

  get sub1() {
    return this.format(this.item?.sub1);
  }

  get sub2() {
    return this.format(this.item?.sub2);
  }

  get sub3() {
    return this.format(this.item?.sub3);
  }

  get sub4() {
    return this.format(this.item?.sub4);
  }

  format(data: IBonusValueData | undefined) {
    if (data) {
      const type = data.type || BonusType.None;
      const value = data.value;
      const direct = DirectBonus.includes(type);
      if (direct) {
        return `${this.$t("bonus_short." + type)}:${value.toFixed(0)}`;
      }
      return `${this.$t("bonus_short." + type)}:${value.toFixed(1)}%`;
    }
    return "";
  }
}
</script>
