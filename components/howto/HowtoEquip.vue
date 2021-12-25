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
        ><v-icon v-text="icons.append" />{{ $t("howto.equip.p1_1") }}<br />{{
          $t("howto.equip.p1_2")
        }}</v-col
      >
      <v-col v-if="model === 1" class="v-card__text"
        >{{ $t("howto.equip.p2_1") }}<br />{{ $t("howto.equip.p2_2") }}</v-col
      >
      <v-col v-if="model === 2" class="v-card__text"
        >{{ $t("howto.equip.p3_1") }}<br />{{ $t("howto.equip.p3_2") }}</v-col
      >
      <v-col v-if="model === 3" class="v-card__text"
        >{{ $t("howto.equip.p4_1") }}<br />{{ $t("howto.equip.p4_2") }}</v-col
      >
      <v-col v-if="model === 4" class="v-card__text"
        >{{ $t("howto.equip.p5_1") }}<br />{{ $t("howto.equip.p5_2") }}</v-col
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
import { mdiPlaylistPlus } from "@mdi/js";

@Component({ name: "HowtoEquip" })
export default class HowtoEquip extends Vue {
  readonly icons = {
    append: mdiPlaylistPlus,
  };
  readonly images = [
    { src: require("@/assets/img/howto/equip/1.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/equip/2.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/equip/3.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/equip/4.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/equip/5.jpg"), height: "60vh" },
  ];
  model = 0;
}
</script>
