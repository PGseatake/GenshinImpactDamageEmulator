<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    :label="label"
    :items="items"
    :append-icon="icon"
    :single-line="!label"
    :menu-props="{ auto: true, transition: false }"
    dense
    hide-details
    item-text="value"
  />
</template>

<style lang="scss" scoped>
::v-deep .v-select__selection {
  width: 100%;
  margin: 0 !important;
  text-align: center;
}
::v-deep .v-select__selections input {
  width: 0;
}
.v-input ::v-deep .v-input__append-inner {
  padding: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mdiMenuDown } from "@mdi/js";
import * as Ascension from "~/src/ascension";
import { Arrayable } from "~/src/utility";

type LevelText = { value: string };

const LevelTexts = (() => {
  const make = (min: number, max: number) => {
    return Arrayable.make(max - min, (_, i): LevelText => {
      return { value: `${min + i + 1}` };
    });
  };
  let ret: ReturnType<typeof make> = [];
  let min = 0;
  for (const max of Ascension.LevelStep) {
    ret.push(...make(min, max));
    ret.push({ value: `${max}+` });
    min = max;
  }
  ret.push(...make(min, Ascension.LevelMax));
  return ret;
})();

@Component({
  name: "AscensionLevel",
  inheritAttrs: false,
})
export default class AscensionLevel extends Vue {
  @Prop({ default: "" }) label!: string;

  get items() {
    return LevelTexts;
  }

  get icon() {
    return mdiMenuDown;
  }
}
</script>
