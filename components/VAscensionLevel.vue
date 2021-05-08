<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    :items="items()"
    item-text="value"
    dense
    single-line
    hide-details
    class="select-input-auto"
  />
</template>

<style lang="scss" scoped>
::v-deep .v-select__selections {
  input {
    display: none;
  }
}
.v-input ::v-deep .v-input__append-inner {
  padding: 0;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { VSelect } from "vuetify/lib";

const AscensionLvMin = 1;
const AscensionLvMax = 90;
const AscensionLvStep = [20, 40, 50, 60, 70, 80] as const;
const AscensionLvRange = [1, 20, 40, 50, 60, 70, 80, 90] as const;
const AscensionLvItems = (() => {
  const make = (min: number, max: number) => {
    return Array.from({ length: max - min }, (_, i): { value: string } => {
      return { value: `${min + i + 1}` };
    });
  };
  let ret: ReturnType<typeof make> = [];
  let min = 0;
  for (const max of AscensionLvStep) {
    ret.push(...make(min, max));
    ret.push({ value: `${max}+` });
    min = max;
  }
  ret.push(...make(min, AscensionLvMax));
  return ret;
})();

@Component({
  name: "VAscensionLevel",
  components: { VSelect },
  inheritAttrs: false,
})
export default class VAscensionLevel extends Vue {
  items() {
    return AscensionLvItems;
  }
}
</script>
