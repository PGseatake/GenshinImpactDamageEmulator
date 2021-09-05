<template>
  <v-row no-gutters>
    <template v-for="elem in elements">
      <v-col v-if="types.includes(elem)" cols="auto" sm="12" :key="elem">
        <v-chip :color="getColor(elem)" v-text="getText(elem)" small />
      </v-col>
    </template>
  </v-row>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { ElementType, ElementTypes } from "~/src/const";

@Component({ name: "Resonance" })
export default class Resonance extends Vue {
  @Prop({ required: true }) items!: ElementType[];

  readonly elements = ElementTypes;

  get types() {
    return this.items ? this.items : [];
  }

  getColor(element: ElementType) {
    return this.$elementBGColor(element);
  }

  getText(element: ElementType) {
    return this.$t("element." + element);
  }
}
</script>
