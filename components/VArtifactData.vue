<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    show-select
    single-select
    hide-default-footer
    class="data-table-padding"
  >
    <template v-slot:[`header.data-table-select`]="{}">
      <v-btn fab x-small>
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </template>
    <template v-slot:[`item.name`]="{ item }">
      <v-name-comment :names="names()" :item="item" />
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
  </v-data-table>
</template>

<style scoped>
.data-table-padding >>> .text-start {
  padding: 0 8px;
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
      width: "120px",
    },
    {
      text: this.$t("general.sub1") as string,
      value: "sub1",
      sortable: false,
      width: "120px",
    },
    {
      text: this.$t("general.sub2") as string,
      value: "sub2",
      sortable: false,
      width: "120px",
    },
    {
      text: this.$t("general.sub3") as string,
      value: "sub3",
      sortable: false,
      width: "120px",
    },
    {
      text: this.$t("general.sub4") as string,
      value: "sub4",
      sortable: false,
      width: "120px",
    },
  ];

  names() {
    return ArtifactList;
  }

  sub() {
    return ArtifactSub;
  }
}
</script>
