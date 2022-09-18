<template>
  <v-row no-gutters>
    <template v-for="elem in elements">
      <v-col v-if="elem.check" cols="auto" sm="12" :key="elem.type">
        <v-chip :color="elem.color" v-text="elem.text" small />
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { ElementType, ElementTypes } from "~/src/const";

@Component({
  name: "Resonance",
  inheritAttrs: false,
})
export default class Resonance extends Vue {
  @Prop({ required: true }) items!: ElementType[];

  get elements() {
    const items = this.items || [];
    return ElementTypes.map((v) => ({
      type: v,
      text: this.$t("element." + v),
      color: this.$elementBGColor(v),
      check: items.includes(v),
    }));
  }
}
</script>
