<template>
  <v-container>
    <v-row>
      <v-carousel
        v-model="model"
        :height="images[model].height"
        :continuous="false"
        class="pa-2"
      >
        <v-carousel-item v-for="(image, i) of images" :key="i">
          <v-img contain v-bind="image" />
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row>
      <v-col v-if="model === 0" class="v-card__text"
        >{{ $t("howto.bonus.p1_1") }}<br />{{ $t("howto.bonus.p1_2") }}<br />{{
          $t("howto.bonus.p1_3")
        }}</v-col
      >
      <v-col v-if="model === 1" class="v-card__text"
        ><v-icon v-text="icons.check" />{{ $t("howto.bonus.p2_1") }}<br />{{
          $t("howto.bonus.p2_2")
        }}</v-col
      >
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.v-data-table ::v-deep {
  th {
    height: 28px !important;
  }
  td {
    height: 28px !important;
  }
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiCheckboxMarked } from "@mdi/js";

@Component({ name: "HowtoBonus" })
export default class HowtoBonus extends Vue {
  readonly icons = {
    check: mdiCheckboxMarked,
  };
  readonly images = [
    { src: require("@/assets/img/howto/bonus/1.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/bonus/2.jpg"), height: "60vh" },
  ];
  model = 0;
}
</script>
