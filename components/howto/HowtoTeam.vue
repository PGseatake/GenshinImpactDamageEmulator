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
        ><v-icon v-text="icons.append" />{{ $t("howto.team.p1_1") }}<br />{{
          $t("howto.team.p1_2")
        }}</v-col
      >
      <v-col v-if="model === 1" class="v-card__text">{{
        $t("howto.team.p2_1")
      }}</v-col>
      <v-col v-if="model === 2" class="v-card__text"
        >{{ $t("howto.team.p3_1") }}<br />{{ $t("howto.team.p3_2") }}</v-col
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

@Component({ name: "HowtoTeam" })
export default class HowtoTeam extends Vue {
  readonly icons = {
    append: mdiPlaylistPlus,
  };
  readonly images = [
    { src: require("@/assets/img/howto/team/1.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/team/2.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/team/3.jpg"), height: "60vh" },
  ];
  model = 0;
}
</script>
