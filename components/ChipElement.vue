<template>
  <v-chip v-bind="$attrs" v-on="$listeners" :color="$elementBGColor(element)">{{
    $t("element." + element)
  }}</v-chip>
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
}
</script>
