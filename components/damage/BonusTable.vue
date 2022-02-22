<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    :class="tableClass"
    :items-per-page="-1"
    group-by="group"
    dense
    show-select
    disable-sort
    fixed-header
    hide-default-footer
  >
    <template #[`group.header`]="{ group, headers, isOpen, toggle }">
      <td
        :colspan="headers.length"
        class="v-row-group__header text-subtitle-2 text-center"
      >
        <v-icon size="20" @click="toggle"
          >{{ isOpen ? icons.close : icons.open }}
        </v-icon>
        {{ $t(group) }}
      </td>
    </template>
    <template #[`header.data-table-select`]="{}">
      <v-simple-checkbox
        :key="-1"
        :value="isSelectAll"
        :ripple="false"
        :on-icon="icons.on"
        :off-icon="icons.off"
        hide-details
        @input="selectAll($event)"
      />
    </template>
    <template #[`item.data-table-select`]="{ index, item }">
      <v-simple-checkbox
        :key="index"
        :value="item.checked"
        :ripple="false"
        :on-icon="icons.on"
        :off-icon="icons.off"
        hide-details
        @input="select(item, $event)"
      />
    </template>
    <template #[`item.source`]="{ item }">{{ $t(item.source) }}</template>
    <template #[`item.condition`]="{ item }">{{
      formatCondition(item)
    }}</template>
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
  th.text-start {
    padding: 0 6px;
  }
  td.text-start {
    padding: 4px 6px;
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
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiChevronDown,
  mdiChevronUp,
} from "@mdi/js";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { BonusBase } from "~/src/bonus";
import Status from "~/src/status";

@Component({
  name: "BonusTable",
  components: {
    SelectRange: () => import("~/components/SelectRange.vue"),
  },
  inheritAttrs: false,
})
export default class BonusTable extends Vue {
  @Prop({ required: true }) items!: BonusBase[];
  @Prop({ required: true }) status!: Status[];

  readonly icons = {
    on: mdiCheckboxMarked,
    off: mdiCheckboxBlankOutline,
    open: mdiChevronDown,
    close: mdiChevronUp,
  };

  @Emit("change")
  onChange() {}

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get headers() {
    return [
      { text: this.$t("tab.source"), value: "source" },
      { text: this.$t("tab.condition"), value: "condition" },
      { text: this.$t("tab.stack"), value: "stack", align: "center" },
      { text: this.$t("tab.times"), value: "times", align: "center" },
    ];
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

  formatCondition(item: BonusBase) {
    return item.condition(this.status);
  }

  formatTimes(value: number) {
    return value ? `${value}${this.$t("general.sec")}` : "-";
  }
}
</script>
