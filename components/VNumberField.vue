<template>
  <v-text-field
    v-bind="$attrs"
    v-on="$listeners"
    v-model="value"
    type="number"
    min="0"
    :step="step"
    :rules="[rule]"
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
  data() {
    return {
      // TODO: 値削除時に自動で有効な値に変える
      rule: (value: string) => !!value || "Input number.",
    };
  },
  computed: {
    value: {
      get(): string {
        return this.refer.value.toString();
      },
      set(value: string) {
        if (value) {
          this.refer.value = parseFloat(value);
        } else {
          this.refer.value = 0;
          // TODO: 一度は0に変わるが2回削除すると空白になってしまう
        }
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
