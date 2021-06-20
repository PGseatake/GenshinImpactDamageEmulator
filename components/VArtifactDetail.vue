<template>
  <v-container class="pa-0">
    <v-row no-gutters align="end">
      <v-col :cols="cols" class="pa-0">
        <v-select-name
          :value.sync="refValue"
          :items="items"
          :group="'artifact.' + type"
        />
      </v-col>
      <v-col :cols="cols" class="px-1 py-0 detail" v-text="comment" />
    </v-row>
    <v-row no-gutters>
      <v-col :cols="cols" class="px-1 py-0 detail" v-text="level" />
      <v-col v-if="main" :cols="cols" class="px-1 py-0 detail" v-text="main" />
      <v-col v-if="sub1" :cols="cols" class="px-1 py-0 detail" v-text="sub1" />
      <v-col v-if="sub2" :cols="cols" class="px-1 py-0 detail" v-text="sub2" />
      <v-col v-if="sub3" :cols="cols" class="px-1 py-0 detail" v-text="sub3" />
      <v-col v-if="sub4" :cols="cols" class="px-1 py-0 detail" v-text="sub4" />
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
import { ArtifactType } from "~/src/const";
import { IArtifactData } from "~/src/interface";

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

  get cols() {
    return this.$vuetify.breakpoint.xs ? "auto" : "12";
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
    return this.$formatBonus(this, this.item?.main);
  }

  get sub1() {
    return this.$formatBonus(this, this.item?.sub1);
  }

  get sub2() {
    return this.$formatBonus(this, this.item?.sub2);
  }

  get sub3() {
    return this.$formatBonus(this, this.item?.sub3);
  }

  get sub4() {
    return this.$formatBonus(this, this.item?.sub4);
  }
}
</script>
