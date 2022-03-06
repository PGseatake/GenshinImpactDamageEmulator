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
    disable-sort
    fixed-header
    hide-default-footer
  >
    <template #[`group.header`]="{ group, headers, isOpen, toggle }">
      <table-group
        :headers="headers"
        :isOpen="isOpen"
        :toggle="toggle"
        :text="$t(`bonus.${group}`)"
      />
    </template>
    <template #[`item.type`]="{ item }">
      <template>{{ $t("bonus." + item.type) }}</template>
    </template>
    <template #[`item.total`]="{ item }">
      <template>{{ formatBonus(item.type, item.total) }}</template>
    </template>
    <template #[`item.base`]="{ item }">
      <template>{{
        item.base ? formatBonus(item.type, item.base) : "-"
      }}</template>
    </template>
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
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  BonusType,
  BonusTypes,
  StatusBonusType,
  CombatBonusType,
} from "~/src/const";
import { StatusBase, StatusParam } from "~/src/interface";
import { RateBonus } from "~/src/special";
import Status from "~/src/status";
import TableGroup from "~/components/TableGroup.vue";

const excludeTypes: ReadonlyArray<BonusType> = [
  StatusBonusType.HpBuf,
  StatusBonusType.AtkBuf,
  StatusBonusType.DefBuf,
  CombatBonusType.Combat,
] as const;

@Component({
  name: "StatusTable",
  inheritAttrs: false,
  components: { TableGroup },
})
export default class StatusTable extends Vue {
  @Prop({ required: true }) param!: StatusParam;
  @Prop({ required: true }) base!: StatusBase;

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get headers() {
    return [
      { text: "", value: "type" },
      { text: this.$t("general.total"), value: "total", align: "right" },
      { text: this.$t("general.base"), value: "base", align: "right" },
    ];
  }

  get items() {
    return BonusTypes.filter((type) => !excludeTypes.includes(type)).map(
      (type) => Status.part(type, this.param, this.base)
    );
  }

  formatBonus(type: BonusType, value: number) {
    return RateBonus.round(value, type);
  }
}
</script>
