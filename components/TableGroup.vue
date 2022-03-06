<template>
  <td
    :colspan="headers.length"
    class="v-row-group__header text-subtitle-2 text-center"
  >
    <v-icon size="20" @click="toggle">
      {{ isOpen ? icons.close : icons.open }}
    </v-icon>
    {{ text }}
  </td>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";

@Component({
  name: "TableGroup",
  inheritAttrs: false,
})
export default class TableGroup extends Vue {
  @Prop({ required: true }) headers!: any[];
  @Prop({ required: true }) isOpen!: boolean;
  @Prop({ required: true }) toggle!: () => void;
  @Prop({ required: true }) text!: string;

  readonly icons = { open: mdiChevronDown, close: mdiChevronUp };
}
</script>
