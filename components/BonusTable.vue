<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    :class="tableClass"
    :items-per-page="1000"
    :show-select="check"
    group-by="group"
    dense
    fixed-header
    disable-sort
    hide-default-footer
  >
    <template #[`group.header`]="{ group, headers }">
      <td
        :colspan="headers.length"
        class="v-row-group__header text-subtitle-2 text-center"
      >
        {{ $t(group) }}
      </td>
    </template>
    <template #[`header.data-table-select`]="{}">
      <v-simple-checkbox
        :key="-1"
        :value="isSelectAll"
        :ripple="false"
        hide-details
        @input="selectAll($event)"
      />
    </template>
    <template #[`item.data-table-select`]="{ index, item }">
      <v-simple-checkbox
        :key="index"
        :value="item.checked"
        :ripple="false"
        hide-details
        @input="select(item, $event)"
      />
    </template>
    <template #[`item.source`]="{ item }">{{ $t(item.source) }}</template>
    <template #[`item.stack`]="{ item }">
      <template v-if="item.stack">
        <select-range
          :min="1"
          :max="item.stack"
          :suffix="`/${item.stack}`"
          :value="item.stacks"
          @input="selectRange(item, $event)"
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
  td.text-start {
    align-self: center;
    vertical-align: middle;
  }
}

.mb-data-table ::v-deep {
  td.v-data-table__mobile-row {
    padding: 0 12px;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";
import { BonusBase } from "~/src/bonus";

@Component({
  name: "BonusTable",
  inheritAttrs: false,
  components: {
    SelectRange: () => import("~/components/SelectRange.vue"),
  },
})
export default class BonusTable extends Vue {
  @Prop({ required: true }) items!: Array<BonusBase>;
  @Prop({ default: false }) check!: boolean;

  readonly headers: ReadonlyArray<DataTableHeader> = [
    { text: this.$t("tab.source") as string, value: "source" },
    { text: this.$t("tab.condition") as string, value: "condition" },
    { text: this.$t("tab.stack") as string, value: "stack", align: "center" },
    { text: this.$t("tab.times") as string, value: "times", align: "center" },
  ];

  @Emit("change")
  onChange() {}

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get isSelectAll() {
    for (const item of this.items) {
      if (!item.checked) return false;
    }
    return true;
  }

  selectAll(value: boolean) {
    for (const item of this.items) {
      item.checked = value;
    }
    this.onChange();
  }

  select(item: BonusBase, value: boolean) {
    item.checked = value;
    this.onChange();
  }

  selectRange(item: BonusBase, value: number) {
    item.stacks = value;
    this.onChange();
  }

  formatTimes(value: number) {
    return value ? `${value}${this.$t("general.sec")}` : "-";
  }
}
</script>
