<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-footer
    show-select
  >
    <template v-slot:[`item.calories`]="{ item }">
      <v-bonus-value :items="items" :bonus="item.calories" />
    </template>
  </v-data-table>
</template>

<script>
import VBonusValue from "~/components/VBonusValue.vue";
import { ArtifactMain } from "~/src/const";

export default {
  components: { VBonusValue },
  data() {
    return {
      selectedItem: 1,
      items: ArtifactMain.sands,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories", sortable: false },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
      desserts: [
        {
          id: "aesciugb",
          name: "Frozen Yogurt",
          calories: { type: "atk_buf", value: 2.5 },
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          id: "cernj7xgy",
          name: "Frozen Yogurt",
          calories: { type: "def_buf", value: 3.4 },
          fat: 8.0,
          carbs: 21,
          protein: 6.0,
          iron: "11%",
        },
        {
          id: "ecgrnj9",
          name: "Frozen Yogurt",
          calories: { type: "none", value: 0 },
          fat: 8.0,
          carbs: 21,
          protein: 6.0,
          iron: "11%",
        },
      ],
    };
  },
};
</script>
