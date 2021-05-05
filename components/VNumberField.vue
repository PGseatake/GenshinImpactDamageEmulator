<template>
  <v-text-field
    v-bind="$attrs"
    v-on="$listeners"
    :step="step"
    :rules="[rule]"
    min="0"
    type="number"
  >
    <template v-for="(item, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { VTextField } from "vuetify/lib";

@Component({
  name: "VNumberField",
  components: { VTextField },
  inheritAttrs: false,
})
export default class VNumberField extends Vue {
  @Prop({ default: 1 }) precision!: number;

  rule(value: string): boolean | string {
    return !!value || "Input number.";
  }

  get step(): number {
    return Math.pow(0.1, this.precision);
  }
}
</script>
