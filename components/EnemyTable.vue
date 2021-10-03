<template>
  <v-container fluid class="pa-0 pt-2">
    <v-row dense align="end" justify="center" class="ma-0">
      <!-- 敵選択 -->
      <v-col cols="auto">
        <v-select
          v-model="data.name"
          :items="enemies"
          :label="$t('enemy.label')"
          :item-text="getEnemyText"
          :menu-props="{ auto: true, transition: false }"
          item-value="name"
          dense
          hide-details
          @change="onChangeEnemy"
        />
      </v-col>
      <!-- 元素選択 -->
      <v-col v-if="elements" cols="auto">
        <select-element
          :type.sync="data.elem"
          :types="elements"
          :label="$t('general.element')"
          @change="onChangeElement"
        />
      </v-col>
      <!-- レベル -->
      <v-col cols="auto">
        <select-range
          v-model="data.level"
          :label="$t('general.level')"
          :min="1"
          :max="150"
          @change="onChangeData"
        />
      </v-col>
      <!-- 状態選択 -->
      <v-col v-if="phases" cols="auto">
        <v-radio-group
          v-model="data.fixed"
          row
          dense
          mandatory
          hide-details
          class="pa-0"
          @change="onChangeData"
        >
          <template #label>
            <label class="v-label v-label--active phase">{{
              $t("damage.phase")
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
    <v-row dense justify="center" class="ma-0">
      <!-- 耐性表示 -->
      <v-data-table
        :headers="headers"
        :items="items"
        :mobile-breakpoint="0"
        :items-per-page="1000"
        dense
        disable-sort
        fixed-header
        hide-default-footer
      >
        <template #[`item.type`]="{ item }">
          <chip-element v-if="item.type !== 'defence'" :element="item.type" />
          <template v-else>{{ $t("reduct.defence") }}</template>
        </template>
        <template #[`item.value`]="{ item }">
          <template v-if="item.type !== 'defence'">{{
            getValue(item.type)
          }}</template>
        </template>
        <template #[`item.rate`]="{ item }">
          <template v-if="item.type !== 'defence'">{{
            getResist(item.type)
          }}</template>
          <template v-else>{{ $roundRate(defence) }}</template>
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
import { StatusReduct } from "~/src/bonus";
import { ElementType, NoneElementType, ResistTypes } from "~/src/const";
import {
  EnemyList,
  EnemyName,
  EnemyNames,
  IEnemyInfo,
  IEnemyData,
} from "~/src/enemy";
import { Enemy } from "~/src/damage";

type TextValue = {
  name: EnemyName;
  item: IEnemyInfo;
};

@Component({
  name: "EnemyTable",
  inheritAttrs: false,
  components: {
    SelectRange: () => import("~/components/SelectRange.vue"),
    SelectElement: () => import("~/components/SelectElement.vue"),
  },
})
export default class EnemyTable extends Vue {
  @Prop({ required: true }) damage!: string;
  @Prop({ required: true }) reduct!: StatusReduct;
  @Prop({ default: 0 }) defence!: number;

  data: IEnemyData = {
    name: EnemyNames[0],
    elem: ElementType.Pyro,
    level: 1,
    fixed: 0,
  };

  @Emit("change")
  onChange(data: IEnemyData) {}

  readonly headers: ReadonlyArray<DataTableHeader> = [
    {
      text: this.$t("general.element") as string,
      value: "type",
      align: "center",
    },
    {
      text: this.$t("damage.resist") as string,
      value: "value",
      align: "center",
    },
    {
      text: this.$t("general.rate") as string,
      value: "rate",
      align: "center",
    },
  ];

  get enemies(): TextValue[] {
    return EnemyNames.map((val) => ({
      name: val,
      item: EnemyList[val],
    }));
  }

  get elements() {
    return EnemyList[this.data.name].element;
  }

  get phases() {
    const { phase } = EnemyList[this.data.name];
    if (phase) {
      return [{ label: "enemy.normal", fixed: 0 }, ...phase];
    }
    return undefined;
  }

  get items() {
    return ResistTypes.map((val) => ({ type: val }));
  }

  mounted() {
    const item = this.$db.damage.find((val) => val.id === this.damage);
    if (item) {
      this.data.name = item.name;
      this.data.elem = item.elem;
      this.data.level = item.level;
      this.data.fixed = item.fixed;
    }
  }

  getValue(type: ElementType) {
    let enemy = new Enemy(this.data, this.reduct);
    const value = enemy.value(type);
    return isFinite(value) ? `${value}%` : this.$t("damage.immutable");
  }

  getResist(type: ElementType) {
    let enemy = new Enemy(this.data, this.reduct);
    return this.$roundRate(enemy.resist(type) * 100);
  }

  getEnemyText({ name, item }: TextValue) {
    let type: NoneElementType;
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

  onChangeData() {
    this.onChange(this.data);
  }

  onChangeEnemy() {
    const item = EnemyList[this.data.name];
    this.data.elem = item.element ? item.element[0] : "";
    this.data.fixed = 0;
    this.onChange(this.data);
  }

  onChangeElement() {
    this.data.fixed = 0;
    this.onChange(this.data);
  }
}
</script>
