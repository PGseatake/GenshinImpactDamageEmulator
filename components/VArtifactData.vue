<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    hide-default-footer
  >
    <template v-slot:[`item.name`]="{ item }">
      <v-name-comment :names="names()" :item="item" />
    </template>
    <template v-slot:[`item.star`]="{ item }">
      <v-select-range v-model="item.star" :min="3" :max="5" />
    </template>
    <template v-slot:[`item.level`]="{ item }">
      <v-ascension-level v-model="item.level" />
    </template>
    <template v-slot:[`item.main`]="{ item }">
      <v-bonus-value :types="types" :bonus="item.main" />
    </template>
    <template v-slot:[`item.sub1`]="{ item }">
      <v-bonus-value :types="sub()" :bonus="item.sub1" />
    </template>
    <template v-slot:[`item.sub2`]="{ item }">
      <v-bonus-value :types="sub()" :bonus="item.sub2" />
    </template>
    <template v-slot:[`item.sub3`]="{ item }">
      <v-bonus-value :types="sub()" :bonus="item.sub3" />
    </template>
    <template v-slot:[`item.sub4`]="{ item }">
      <v-bonus-value :types="sub()" :bonus="item.sub4" />
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
  }
  td.text-start:nth-of-type(1) {
    min-width: 160px;
    max-width: 250px;
  }
  td.text-start:nth-of-type(2) {
    min-width: 60px;
    max-width: 80px;
  }
  td.text-start:nth-of-type(3) {
    min-width: 60px;
    max-width: 80px;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { AnyBonusType, ArtifactSub } from "~/src/const";
import { IArtifactData } from "~/src/interface";
import { ArtifactList } from "~/src/equip";
import { DataTableHeader } from "~/node_modules/vuetify/types";

@Component({
  name: "VArtifactData",
  components: {
    VNameComment: () => import("~/components/VNameComment.vue"),
    VSelectRange: () => import("~/components/VSelectRange.vue"),
    VAscensionLevel: () => import("~/components/VAscensionLevel.vue"),
    VBonusValue: () => import("~/components/VBonusValue.vue"),
  },
  inheritAttrs: false,
})
export default class VArtifactData extends Vue {
  @Prop({ required: true }) types!: ReadonlyArray<AnyBonusType>;
  @Prop({ required: true }) items!: Array<IArtifactData>;

  readonly headers: ReadonlyArray<DataTableHeader> = [
    { text: this.$t("general.name") as string, value: "name" },
    { text: this.$t("general.star") as string, value: "star" },
    { text: this.$t("general.level") as string, value: "level" },
    {
      text: this.$t("general.main") as string,
      value: "main",
      sortable: false,
      width: "105px",
    },
    {
      text: this.$t("general.sub1") as string,
      value: "sub1",
      sortable: false,
      width: "105px",
    },
    {
      text: this.$t("general.sub2") as string,
      value: "sub2",
      sortable: false,
      width: "105px",
    },
    {
      text: this.$t("general.sub3") as string,
      value: "sub3",
      sortable: false,
      width: "105px",
    },
    {
      text: this.$t("general.sub4") as string,
      value: "sub4",
      sortable: false,
      width: "105px",
    },
    {
      text: this.$t("general.delete") as string,
      value: "delete",
      sortable: false,
      width: "50px",
    },
  ];

  names() {
    return ArtifactList;
  }

  sub() {
    return ArtifactSub;
  }

  deleteItem(item: IArtifactData) {
    console.log(item);
  }
}
</script>
