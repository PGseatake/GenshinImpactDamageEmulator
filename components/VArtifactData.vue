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
import Vue from "vue";
import { VDataTable } from "vuetify/lib";
import { ArtifactSub } from "~/src/const";
import { ArtifactList } from "~/src/equip";

export default Vue.extend({
  name: "VArtifactData",
  components: {
    VDataTable,
    VNameComment: () => import("~/components/VNameComment.vue"),
    VBonusValue: () => import("~/components/VBonusValue.vue"),
  },
  inheritAttrs: false,
  props: {
    types: { type: Array, required: true },
    items: { type: Array, required: true },
  },
  data() {
    return {
      headers: [
        { text: this.$t("general.name"), value: "name" },
        { text: this.$t("general.star"), value: "star" },
        { text: this.$t("general.level"), value: "level" },
        {
          text: this.$t("general.main"),
          value: "main",
          sortable: false,
          width: "130px",
        },
        {
          text: this.$t("general.sub1"),
          value: "sub1",
          sortable: false,
          width: "130px",
        },
        {
          text: this.$t("general.sub2"),
          value: "sub2",
          sortable: false,
          width: "130px",
        },
        {
          text: this.$t("general.sub3"),
          value: "sub3",
          sortable: false,
          width: "130px",
        },
        {
          text: this.$t("general.sub4"),
          value: "sub4",
          sortable: false,
          width: "130px",
        },
      ],
    };
  },
  methods: {
    names() {
      return ArtifactList;
    },
    sub() {
      return ArtifactSub;
    },
  },
});
</script>
