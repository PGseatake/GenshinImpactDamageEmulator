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
import Vue from "vue";
import { VTextField } from "vuetify/lib";

export default Vue.extend({
  name: "VNumberField",
  components: { VTextField },
  inheritAttrs: false,
  props: {
    precision: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      // TODO: 値削除時に自動で有効な値に変える
      rule: (value: string) => !!value || "Input number.",
    };
  },
  computed: {
    step: {
      get(): number {
        return Math.pow(0.1, this.precision);
      },
    },
  },
});
</script>
