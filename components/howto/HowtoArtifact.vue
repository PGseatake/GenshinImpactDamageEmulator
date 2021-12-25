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
      <v-col v-if="model === 0" class="v-card__text">{{
        $t("howto.artifact.p1_1")
      }}</v-col>
      <v-col v-if="model === 1" class="v-card__text">{{
        $t("howto.artifact.p2_1")
      }}</v-col>
      <v-col v-if="model === 2" class="v-card__text"
        ><v-icon v-text="icons.main" />{{ $t("howto.artifact.p3_1") }}<br />{{
          $t("howto.artifact.p3_2")
        }}</v-col
      >
      <v-col v-if="model === 3" class="v-card__text"
        ><v-icon v-text="icons.sub" />{{ $t("howto.artifact.p4_1") }}<br />{{
          $t("howto.artifact.p4_2")
        }}</v-col
      >
      <v-col v-if="model === 4" class="v-card__text"
        >{{ $t("howto.artifact.p5_1") }}<br />{{
          $t("howto.artifact.p5_2")
        }}</v-col
      >
      <v-col v-if="model === 5" class="v-card__text"
        ><v-icon v-text="icons.rand" />{{ $t("howto.artifact.p6_1") }}<br />{{
          $t("howto.artifact.p6_2")
        }}<br /><v-icon v-text="icons.rand" />{{
          $t("howto.artifact.p6_3")
        }}</v-col
      >
      <v-col v-if="model === 6">
        <v-simple-table dense fixed-header>
          <tbody>
            <tr v-for="(item, i) of items" :key="i">
              <th>{{ $t(item) }}</th>
              <td>{{ $t(`howto.artifact.list${i}`) }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
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
import { mdiMinus, mdiShuffleVariant, mdiWaterPercent } from "@mdi/js";

@Component({ name: "HowtoArtifact" })
export default class HowtoArtifact extends Vue {
  readonly icons = {
    main: mdiWaterPercent,
    sub: mdiMinus,
    rand: mdiShuffleVariant,
  };
  readonly images = [
    { src: require("@/assets/img/howto/artifact/1.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/artifact/2.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/artifact/3.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/artifact/4.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/artifact/5.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/artifact/6.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/artifact/7.jpg"), height: "35vh" },
  ];
  readonly items = [
    "tab.flower",
    "tab.feather",
    "tab.sands",
    "tab.goblet",
    "tab.circlet",
    "general.name",
    "general.comment",
    "general.star",
    "general.level",
    "general.main",
    "general.sub",
  ];
  model = 0;
}
</script>
