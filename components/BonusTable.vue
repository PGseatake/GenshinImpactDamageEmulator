<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :class="tableClass"
    :items-per-page="1000"
    :group-by="group ? 'group' : undefined"
    dense
    fixed-header
    disable-sort
    hide-default-footer
  >
    <template #[`group.header`]="{ group, headers }">
      <td
        :colspan="headers.length"
        class="v-row-group__header text-subtitle-2"
        style="vertical-align: middle; text-align: center"
      >
        {{ $t(group) }}
      </td>
    </template>
    <template #[`item.source`]="{ item }">{{ $t(item.source) }}</template>
    <template #[`item.stack`]="{ item }">
      <template v-if="item.stack">
        <select-range
          :min="0"
          :max="item.stack"
          :suffix="`/${item.stack}`"
          :value="item.stacks"
          @input="item.stacks = $event"
        />
      </template>
      <template v-else>-</template>
    </template>
    <template #[`item.times`]="{ item }">{{
      formatTimes(item.times)
    }}</template>
  </v-data-table>
</template>

<style lang="scss" scoped>
.pc-data-table ::v-deep {
  tr:hover {
    background: inherit !important;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";
import { BonusBase } from "~/src/bonus";

@Component({
  name: "BonusTable",
  components: {
    SelectRange: () => import("~/components/SelectRange.vue"),
  },
})
export default class BonusTable extends Vue {
  @Prop({ required: true }) items!: Array<BonusBase>;
  @Prop({ default: false }) group!: boolean;

  readonly headers: ReadonlyArray<DataTableHeader> = [
    { text: this.$t("tab.source") as string, value: "source" },
    { text: this.$t("tab.condition") as string, value: "condition" },
    { text: this.$t("tab.stack") as string, value: "stack", align: "center" },
    { text: this.$t("tab.times") as string, value: "times", align: "center" },
  ];

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  formatTimes(value: number) {
    return value ? `${value}${this.$t("general.sec")}` : "-";
  }
}
</script>
