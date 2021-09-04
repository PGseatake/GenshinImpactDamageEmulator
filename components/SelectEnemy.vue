<template>
  <v-container fluid>
    <v-row dense class="pt-2 align-end">
      <!-- 敵選択 -->
      <v-col cols="auto" class="pb-4">
        <v-select
          v-model="name"
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
      <v-col v-if="elements" cols="auto" class="pb-4">
        <v-select
          v-model="element"
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
      <v-col cols="auto" class="pb-4">
        <v-select-range
          v-model="level"
          :label="$t('general.level')"
          :min="1"
          :max="100"
        />
      </v-col>
      <!-- 状態選択 -->
      <v-col v-if="phases" cols="auto" class="pb-4">
        <v-radio-group
          v-model="fixed"
          row
          dense
          mandatory
          hide-details
          class="pa-0 ma-0"
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
    <v-row no-gutters>
      <v-data-table
        :headers="headers"
        :items="items"
        dense
        fixed-header
        hide-default-footer
      >
        <template #[`item.element`]="{ item }">
          <chip-element :element="item.element" />
        </template>
        <template #[`item.regist`]="{ item }">{{
          isFinite(item.regist) ? `${item.regist}%` : $t("general.immutable")
        }}</template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
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
import { Vue, Component } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";
import { ElementType, ElementTypes } from "~/src/const";
import { EnemyList, EnemyName, EnemyNames, IEnemy } from "~/src/enemy";

type Enemy = {
  name: EnemyName;
  item: IEnemy;
};

@Component({
  name: "SelectEnemy",
  inheritAttrs: false,
})
export default class SelectEnemy extends Vue {
  name = EnemyNames[0];
  element: ElementType | "" = ElementType.Pyro;
  level = 1;
  fixed = 0;

  readonly headers: ReadonlyArray<DataTableHeader> = [
    {
      text: this.$t("general.element") as string,
      value: "element",
      align: "center",
    },
    {
      text: this.$t("general.regist") as string,
      value: "regist",
      align: "center",
    },
    { text: this.$t("general.rate") as string, value: "" },
  ];

  get enemies(): Enemy[] {
    return EnemyNames.map((val) => ({
      name: val,
      item: EnemyList[val],
    }));
  }

  get elements() {
    return EnemyList[this.name].element?.map((val) => ({ type: val }));
  }

  get phases() {
    const { phase } = EnemyList[this.name];
    if (phase) {
      return [{ label: "enemy.normal", fixed: 0 }, ...phase];
    }
    return undefined;
  }

  get items() {
    const enemy = EnemyList[this.name];
    return ElementTypes.map((val) => ({
      element: val,
      regist:
        enemy.resist[val] +
        this.fixed +
        ((val === this.element && enemy.value) || 0),
    }));
  }

  getEnemyText({ name, item }: Enemy) {
    let type: ElementType | "";
    if (this.name === name) {
      type = this.element;
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

  onChangeEnemy() {
    const item = EnemyList[this.name];
    this.element = item.element ? item.element[0] : "";
    this.fixed = 0;
  }

  onChangeElement() {
    this.fixed = 0;
  }
}
</script>
