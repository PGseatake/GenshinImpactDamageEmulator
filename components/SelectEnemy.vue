<template>
  <v-container fluid class="pa-2 pb-4">
    <v-row dense align="end" justify="center">
      <!-- 敵選択 -->
      <v-col cols="auto" class="my-2">
        <v-select
          v-model="data.name"
          :items="enemies"
          :label="$t('enemy.label')"
          :item-text="getEnemyText"
          item-value="name"
          dense
          hide-details
          class="ma-0"
          @change="onChangeEnemy"
        />
      </v-col>
      <!-- 元素選択 -->
      <v-col v-if="elements" cols="auto" class="my-2">
        <v-select
          v-model="data.elem"
          :items="elements"
          :label="$t('general.element')"
          :item-text="getElementText"
          item-value="type"
          dense
          small-chips
          hide-details
          class="ma-0 element"
          @change="onChangeElement"
        >
          <template #selection="{ item }">
            <chip-element :element="item.type" small />
          </template>
        </v-select>
      </v-col>
      <!-- レベル -->
      <v-col cols="auto" class="my-2">
        <select-range
          v-model="data.level"
          :label="$t('general.level')"
          :min="1"
          :max="150"
          @change="onChangeData"
        />
      </v-col>
      <!-- 状態選択 -->
      <v-col v-if="phases" cols="auto" class="my-2">
        <v-radio-group
          v-model="data.fixed"
          row
          dense
          mandatory
          hide-details
          class="pa-0 ma-0"
          @change="onChangeData"
        >
          <template #label>
            <label class="v-label v-label--active phase">{{
              $t("general.phase")
            }}</label>
          </template>
          <v-radio
            v-for="phase in phases"
            :key="phase.label"
            :label="$t(phase.label)"
            :value="phase.fixed"
            :ripple="false"
            class="mr-2"
          />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center">
      <!-- 耐性表示 -->
      <v-data-table
        :headers="headers"
        :items="items"
        :mobile-breakpoint="0"
        dense
        fixed-header
        hide-default-footer
      >
        <template #[`item.type`]="{ item }">
          <chip-element v-if="item.type !== 'defence'" :element="item.type" />
          <template v-else>{{ $t("reduct.defence") }}</template>
        </template>
        <template #[`item.value`]="{ item }">
          <template v-if="item.type !== 'defence'">{{
            isFinite(item.value) ? `${item.value}%` : $t("general.immutable")
          }}</template>
        </template>
        <template #[`item.rate`]="{ item }">
          <template v-if="item.type !== 'defence'">{{
            $roundRate(calcRate(item) * 100)
          }}</template>
          <template v-else>{{ $roundRate(defence * 100) }}</template>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.v-data-table ::v-deep {
  tr:hover {
    background: inherit !important;
  }
}

::v-deep .v-select__selection {
  width: 100%;
  max-width: 100%;
  margin: 0 !important;
  text-align: right;
}
::v-deep .v-select__selections input {
  width: 0;
}
.v-input ::v-deep .v-input__append-inner {
  padding: 0;
}

::v-deep .v-input--selection-controls__input {
  margin: 0;
}
.phase {
  width: 50px;
  position: absolute;
  transform: translateY(-25px) scale(0.75);
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";
import { ElementType, ElementTypes, ResistType } from "~/src/const";
import { EnemyList, EnemyName, EnemyNames, IEnemy } from "~/src/enemy";

export type EnemyData = {
  name: EnemyName;
  elem: ElementType | "";
  level: number;
  fixed: number;
};

type TextValue = {
  name: EnemyName;
  item: IEnemy;
};
type Resist = {
  type: ResistType;
  value?: number;
};

@Component({
  name: "SelectEnemy",
  inheritAttrs: false,
  components: {
    SelectRange: () => import("~/components/SelectRange.vue"),
  },
})
export default class SelectEnemy extends Vue {
  @Prop({ default: 0 }) defence!: number;

  data: EnemyData = {
    name: EnemyNames[0],
    elem: ElementType.Pyro,
    level: 1,
    fixed: 0,
  };

  @Emit("update")
  onUpdate(data: EnemyData) {}

  readonly headers: ReadonlyArray<DataTableHeader> = [
    {
      text: this.$t("general.element") as string,
      value: "type",
      align: "center",
      sortable: false,
    },
    {
      text: this.$t("general.resist") as string,
      value: "value",
      align: "center",
      sortable: false,
    },
    {
      text: this.$t("general.rate") as string,
      value: "rate",
      align: "center",
      sortable: false,
    },
  ];

  get enemies(): TextValue[] {
    return EnemyNames.map((val) => ({
      name: val,
      item: EnemyList[val],
    }));
  }

  get elements() {
    return EnemyList[this.data.name].element?.map((val) => ({ type: val }));
  }

  get phases() {
    const { phase } = EnemyList[this.data.name];
    if (phase) {
      return [{ label: "enemy.normal", fixed: 0 }, ...phase];
    }
    return undefined;
  }

  get items() {
    const enemy = EnemyList[this.data.name];
    let items = ElementTypes.map(
      (val): Resist => ({
        type: val,
        value:
          enemy.resist[val] +
          this.data.fixed +
          ((val === this.data.elem && enemy.value) || 0),
      })
    );
    items.push({ type: ResistType.Defence }); // 防御力を別枠で追加
    return items;
  }

  calcRate({ type, value }: Required<Resist>) {
    const rate = value; //- this.reduct[type];
    if (rate < 0) {
      return (100 - rate / 2) / 100;
    } else if (75 <= rate) {
      return 100 / (rate * 4 + 100);
    } else {
      return (100 - rate) / 100;
    }
  }

  getEnemyText({ name, item }: TextValue) {
    let type: ElementType | "";
    if (this.data.name === name) {
      type = this.data.elem;
    } else {
      type = item.element ? item.element[0] : "";
    }
    let text = "enemy." + name;
    if (type) {
      if (item.unique) {
        return this.$t(`${text}.${type}`);
      }
      return this.$t(text, [this.$t("element." + type)]);
    }
    return this.$t(text);
  }

  getElementText({ type }: { type: ElementType }) {
    return this.$t("element." + type);
  }

  onChangeData() {
    this.onUpdate(this.data);
  }

  onChangeEnemy() {
    const item = EnemyList[this.data.name];
    this.data.elem = item.element ? item.element[0] : "";
    this.data.fixed = 0;
    this.onUpdate(this.data);
  }

  onChangeElement() {
    this.data.fixed = 0;
    this.onUpdate(this.data);
  }
}
</script>
