<template>
  <div>
    <v-data-table
      v-bind="$attrs"
      v-on="$listeners"
      :headers="headers"
      :items="items"
      :class="myClass"
      fixed-header
      hide-default-footer
    >
      <template v-slot:[`item.name`]="{ item }">
        <v-name-comment
          :items="names"
          :name.sync="item.name"
          :comment.sync="item.comment"
          @change="onChangeName(item)"
        />
      </template>
      <template v-slot:[`item.rank`]="{ item }">
        <v-select-range v-model="item.rank" :min="1" :max="5" />
      </template>
      <template v-slot:[`item.level`]="{ item }">
        <v-ascension-level v-model="item.level" @change="onChangeLevel(item)" />
      </template>
      <template v-slot:[`item.atk`]="{ item }">
        <v-number-field :value.sync="item.atk" hide-label="true" />
      </template>
      <template v-slot:[`item.second`]="{ item }">
        <v-weapon-second
          :list="list"
          :name="item.name"
          v-bind.sync="item.second"
        />
      </template>
      <template v-slot:[`item.remove`]="{ item }">
        <v-btn fab x-small class="my-1" @click="onRemove(item)">
          <v-icon>{{ icons.remove }}</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style lang="scss" scoped>
.pc-data-table ::v-deep {
  tr:hover {
    background: inherit !important;
  }
  .text-start {
    padding: 0 6px;

    // 名前
    &:nth-of-type(1) {
      min-width: 200px;
      max-width: 350px;
    }
    // 凸
    &:nth-of-type(2) {
      min-width: 60px;
      max-width: 80px;
    }
    // Lv
    &:nth-of-type(3) {
      min-width: 60px;
      max-width: 80px;
    }
    // 攻撃力
    &:nth-of-type(4) {
      min-width: 70px;
      max-width: 90px;
    }
    // 追加効果
    &:nth-of-type(5) {
      min-width: 100px;
      max-width: 120px;
    }
  }
}

.mb-data-table ::v-deep {
  td {
    // 名前
    &:nth-of-type(1) .v-data-table__mobile-row__cell {
      min-width: 150;
      max-width: 70%;
    }
    // 凸
    // &:nth-of-type(2) .v-data-table__mobile-row__cell {}
    // Lv
    // &:nth-of-type(3) .v-data-table__mobile-row__cell {}
    // 攻撃力
    &:nth-of-type(4) .v-data-table__mobile-row__cell {
      min-width: 80px;
      max-width: 40%;
    }
    // 追加効果
    &:nth-of-type(5) .v-data-table__mobile-row__cell {
      min-width: 110px;
      max-width: 50%;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { DataTableHeader } from "vuetify/types";
import { mdiDelete } from "@mdi/js";
import * as ascension from "~/src/ascension";
import { IWeaponData } from "~/src/interface";
import { WeaponType } from "~/src/const";
import { WeaponNames, WeaponList } from "~/src/weapon";

@Component({
  name: "VWeaponData",
  components: {
    VNameComment: () => import("~/components/VNameComment.vue"),
    VNumberField: () => import("~/components/VNumberField.vue"),
    VSelectRange: () => import("~/components/VSelectRange.vue"),
    VWeaponSecond: () => import("~/components/VWeaponSecond.vue"),
    VAscensionLevel: () => import("~/components/VAscensionLevel.vue"),
  },
  inheritAttrs: false,
})
export default class VWeaponData extends Vue {
  @Prop({ required: true }) type!: WeaponType;
  @Prop({ required: true }) items!: Array<IWeaponData>;

  @Emit("remove")
  onRemove(item: IWeaponData) {}

  readonly headers: ReadonlyArray<DataTableHeader> = [
    { text: this.$t("general.name") as string, value: "name" },
    { text: this.$t("general.rank") as string, value: "rank" },
    { text: this.$t("general.level") as string, value: "level" },
    { text: this.$t("bonus.atk") as string, value: "atk" },
    {
      text: this.$t("general.second") as string,
      value: "second",
      sortable: false,
    },
    {
      text: this.$t("dialog.remove") as string,
      value: "remove",
      sortable: false,
      width: "50px",
    },
  ];

  readonly icons = {
    remove: mdiDelete,
  };

  get myClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get names() {
    return WeaponNames[this.type].map((name) => ({
      text: this.$t(["weapon", this.type, name].join(".")),
      value: name,
    }));
  }

  get list() {
    return WeaponList[this.type];
  }

  onChangeName(item: IWeaponData) {
    const weapon = WeaponList[this.type][item.name];
    item.rank = 0;
    item.level = "1";
    item.second = { type: weapon.second, value: 0 };
    this.onChangeLevel(item);
  }

  onChangeLevel(item: IWeaponData) {
    const weapon = WeaponList[this.type][item.name];
    item.atk = ascension.calc14(item.level, weapon.atk);
    item.second.value = ascension.calc8(item.level, weapon.secval);
  }
}
</script>
