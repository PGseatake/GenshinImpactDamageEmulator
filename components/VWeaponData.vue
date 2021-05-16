<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    hide-default-footer
  >
    <template v-slot:[`item.name`]="{ item }">
      <v-name-comment
        :names="names()"
        :name.sync="item.name"
        :comment.sync="item.comment"
      />
    </template>
    <template v-slot:[`item.rank`]="{ item }">
      <v-select-range v-model="item.rank" :min="1" :max="5" />
    </template>
    <template v-slot:[`item.level`]="{ item }">
      <v-ascension-level v-model="item.level" />
    </template>
    <template v-slot:[`item.atk`]="{ item }">
      <v-number-field
        :value.sync="item.atk"
        :precision="0"
        hide-details="auto"
      />
    </template>
    <template v-slot:[`item.second`]="{ item }">
      <v-weapon-second
        :list="list()"
        :name="item.name"
        v-bind.sync="item.second"
      />
    </template>
    <template v-slot:[`item.delete`]="{ item }">
      <v-btn fab x-small @click="deleteItem(item)">
        <v-icon> mdi-delete </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<style lang="scss" scoped>
.v-data-table ::v-deep {
  table {
    table-layout: auto;
  }
  td.text-start {
    padding: 0 8px;

    &:nth-of-type(1) {
      min-width: 160px;
      max-width: 250px;
    }
    &:nth-of-type(2) {
      min-width: 60px;
      max-width: 80px;
    }
    &:nth-of-type(3) {
      min-width: 60px;
      max-width: 80px;
    }
    &:nth-of-type(4) {
      min-width: 40px;
      max-width: 60px;
    }
    &:nth-of-type(5) {
      min-width: 70px;
      max-width: 90px;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { WeaponType } from "~/src/const";
import { WeaponNames, WeaponList } from "~/src/weapon";
import { IWeaponData } from "~/src/interface";
import { DataTableHeader } from "~/node_modules/vuetify/types";

@Component({
  name: "VWeaponData",
  components: {
    VNameComment: () => import("~/components/VNameComment.vue"),
    VNumberField: () => import("~/components/VNumberField.vue"),
    VSelectRange: () => import("~/components/VSelectRange.vue"),
    VAscensionLevel: () => import("~/components/VAscensionLevel.vue"),
    VWeaponSecond: () => import("~/components/VWeaponSecond.vue"),
  },
  inheritAttrs: false,
})
export default class VWeaponData extends Vue {
  @Prop({ required: true }) type!: WeaponType;
  @Prop({ required: true }) items!: Array<IWeaponData>;

  readonly headers: ReadonlyArray<DataTableHeader> = [
    { text: this.$t("general.name") as string, value: "name" },
    { text: this.$t("general.level") as string, value: "level" },
    { text: this.$t("general.rank") as string, value: "rank" },
    { text: this.$t("bonus.atk") as string, value: "atk" },
    {
      text: this.$t("general.second") as string,
      value: "second",
      sortable: false,
    },
    {
      text: this.$t("general.delete") as string,
      value: "delete",
      sortable: false,
      width: "50px",
    },
  ];

  names() {
    return WeaponNames[this.type].map((name) => ({
      text: this.$t(["weapon", this.type, name].join(".")),
      value: name,
    }));
  }

  list() {
    return WeaponList[this.type];
  }

  deleteItem(item: IWeaponData) {
    console.log(item);
  }
}
</script>
