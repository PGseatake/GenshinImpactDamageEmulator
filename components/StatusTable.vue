<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    :class="tableClass"
    :items-per-page="1000"
    dense
    disable-sort
    fixed-header
    hide-default-footer
  >
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
  StatusType,
  StatusBonusType,
  CriticalBonusType,
  CombatBonusType,
} from "~/src/const";
import { TypeToBonus, RateBonus, StatusBase, StatusParam } from "~/src/bonus";

const excludeTypes: ReadonlyArray<BonusType> = [
  StatusBonusType.HpBuf,
  StatusBonusType.AtkBuf,
  StatusBonusType.DefBuf,
  CombatBonusType.Combat,
] as const;

function isBaseBonus(type: BonusType): type is StatusType {
  return (
    type === StatusBonusType.Hp ||
    type === StatusBonusType.Atk ||
    type === StatusBonusType.Def
  );
}

@Component({
  name: "StatusTable",
  inheritAttrs: false,
})
export default class StatusTable extends Vue {
  @Prop({ required: true }) param!: StatusParam;
  @Prop({ required: true }) base!: StatusBase;

  readonly headers = [
    { text: this.$t("general.status"), value: "type" },
    { text: this.$t("general.total"), value: "total", align: "right" },
    { text: this.$t("general.base"), value: "base", align: "right" },
  ];

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get items() {
    return BonusTypes.filter((type) => !excludeTypes.includes(type)).map(
      (type) => {
        let total = this.param[type];
        let base = 0;
        if (isBaseBonus(type)) {
          const x = this.param[TypeToBonus.buffer(type)];
          const b = this.base[type];
          total += b + (x * b) / 100;
          base = b;
        } else {
          switch (type) {
            case CriticalBonusType.Damage:
              base = 50;
              break;
            case CriticalBonusType.Rate:
              base = 5;
              break;
          }
        }
        return { type, total, base };
      }
    );
  }

  formatBonus(type: BonusType, value: number) {
    if (RateBonus.check(type)) {
      return this.$roundRate(value);
    } else {
      return this.$roundFloat(value);
    }
  }
}
</script>
