<template>
  <v-text-field
    v-bind="$attrs"
    v-on="$listeners"
    v-model.number="value"
    type="number"
    min="0"
    :step="step"
  >
    <template v-for="(item, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
  </v-text-field>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { VTextField } from "vuetify/lib";

export type ValueData = {
  value: number;
};

export default Vue.extend({
  name: "VNumberField",
  components: { VTextField },
  inheritAttrs: false,
  props: {
    refer: {
      type: Object as PropType<ValueData>,
      required: true,
    },
    precision: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    value: {
      get(): number {
        return this.refer.value;
      },
      set(value: number) {
        this.refer.value = value;
      },
    },
    step: {
      get(): number {
        return Math.pow(0.1, this.precision);
      },
    },
  },
});
</script>
