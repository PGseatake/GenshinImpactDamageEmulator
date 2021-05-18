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
    <template v-slot:[`item.conste`]="{ item }">
      <v-select-range v-model="item.conste" :min="0" :max="6" />
    </template>
    <template v-slot:[`item.level`]="{ item }">
      <v-ascension-level v-model="item.level" />
    </template>
    <template v-slot:[`item.hp`]="{ item }">
      <v-number-field
        :value.sync="item.hp"
        :precision="0"
        hide-details="auto"
      />
    </template>
    <template v-slot:[`item.atk`]="{ item }">
      <v-number-field
        :value.sync="item.atk"
        :precision="0"
        hide-details="auto"
      />
    </template>
    <template v-slot:[`item.def`]="{ item }">
      <v-number-field
        :value.sync="item.def"
        :precision="0"
        hide-details="auto"
      />
    </template>
    <template v-slot:[`item.special`]="{ item }">
      <v-chara-special :name="item.name" v-bind.sync="item.special" />
    </template>
    <template v-slot:[`item.combat`]="{ item }">
      <v-select-range v-model="item.combat" :min="1" :max="15" />
    </template>
    <template v-slot:[`item.skill`]="{ item }">
      <v-select-range v-model="item.skill" :min="1" :max="15" />
    </template>
    <template v-slot:[`item.burst`]="{ item }">
      <v-select-range v-model="item.burst" :min="1" :max="15" />
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
  .text-start {
    padding: 0 8px;

    // &:nth-of-type(1) {
    //   min-width: 160px;
    //   max-width: 250px;
    // }
    &:nth-of-type(2) {
      min-width: 60px;
      max-width: 80px;
    }
    &:nth-of-type(3) {
      min-width: 60px;
      max-width: 80px;
    }
    &:nth-of-type(4) {
      min-width: 80px;
      max-width: 100px;
    }
    &:nth-of-type(5) {
      min-width: 70px;
      max-width: 90px;
    }
    &:nth-of-type(6) {
      min-width: 70px;
      max-width: 90px;
    }
    &:nth-of-type(7) {
      min-width: 100px;
      max-width: 120px;
    }
    &:nth-of-type(8) {
      min-width: 60px;
      max-width: 80px;
    }
    &:nth-of-type(9) {
      min-width: 60px;
      max-width: 80px;
    }
    &:nth-of-type(10) {
      min-width: 60px;
      max-width: 80px;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { DataTableHeader } from "~/node_modules/vuetify/types";
import { ICharaData } from "~/src/interface";
import { CharaNames } from "~/src/character";

@Component({
  name: "VCharacterData",
  components: {
    VNameComment: () => import("~/components/VNameComment.vue"),
    VNumberField: () => import("~/components/VNumberField.vue"),
    VSelectRange: () => import("~/components/VSelectRange.vue"),
    VAscensionLevel: () => import("~/components/VAscensionLevel.vue"),
    VCharaSpecial: () => import("~/components/VCharaSpecial.vue"),
  },
  inheritAttrs: false,
})
export default class VCharacterData extends Vue {
  @Prop({ required: true }) items!: Array<ICharaData>;

  readonly headers: ReadonlyArray<DataTableHeader> = [
    { text: this.$t("general.name") as string, value: "name" },
    { text: this.$t("general.conste") as string, value: "conste" },
    { text: this.$t("general.level") as string, value: "level" },
    { text: this.$t("bonus.hp") as string, value: "hp", sortable: false },
    { text: this.$t("bonus.atk") as string, value: "atk", sortable: false },
    { text: this.$t("bonus.def") as string, value: "def", sortable: false },
    { text: this.$t("general.special") as string, value: "special" },
    {
      text: this.$t("general.combat") as string,
      value: "combat",
      sortable: false,
    },
    {
      text: this.$t("general.skill") as string,
      value: "skill",
      sortable: false,
    },
    {
      text: this.$t("general.burst") as string,
      value: "burst",
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
    return CharaNames.map((name) => ({
      text: this.$t("chara." + name),
      value: name,
    }));
  }

  deleteItem(item: ICharaData) {
    console.log(item);
  }
}
</script>
