<template>
  <v-chip v-bind="$attrs" v-on="$listeners" :color="color">{{ text }}</v-chip>
</template>

<style lang="scss" scoped>
.v-chip.v-size--small {
  height: auto;
}
.v-chip.v-size--default {
  height: auto;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ElementType } from "~/src/const";

@Component({
  name: "ChipElement",
  inheritAttrs: false,
})
export default class ChipElement extends Vue {
  @Prop({ required: true }) element!: ElementType;

  get text() {
    return this.$t("element." + this.element);
  }

  get color() {
    return this.$elementBGColor(this.element);
  }
}
</script>
