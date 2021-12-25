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
        ><v-icon v-text="icons.append" />{{ $t("howto.damage.p1_1") }}<br />{{
          $t("howto.damage.p1_2")
        }}</v-col
      >
      <v-col v-if="model === 1" class="v-card__text"
        >{{ $t("howto.damage.p2_1") }}<br />{{ $t("howto.damage.p2_2")
        }}<br />{{ $t("howto.damage.p2_3") }}</v-col
      >
      <v-col v-if="model === 2" class="v-card__text">{{
        $t("howto.damage.p3_1")
      }}</v-col>
      <v-col v-if="model === 3" class="v-card__text"
        >{{ $t("howto.damage.p4_1") }}
      </v-col>
      <v-col v-if="model === 4" class="v-card__text"
        >{{ $t("howto.damage.p5_1") }}<br />
        {{ $t("howto.damage.p5_2") }}
      </v-col>
      <v-col v-if="model === 5" class="v-card__text"
        >{{ $t("howto.damage.p6_1") }}<br />
        {{ $t("howto.damage.p6_2") }}
      </v-col>
      <v-col v-if="model === 6" class="v-card__text"
        >{{ $t("howto.damage.p7_1") }}
      </v-col>
      <v-col v-if="model === 7" class="v-card__text"
        >{{ $t("howto.damage.p8_1") }}<br />
        {{ $t("howto.damage.p8_2") }}<br />
        {{ $t("howto.damage.p8_3") }}
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
import { mdiPlaylistPlus } from "@mdi/js";

@Component({ name: "HowtoDamage" })
export default class HowtoDamage extends Vue {
  readonly icons = {
    append: mdiPlaylistPlus,
  };
  readonly images = [
    { src: require("@/assets/img/howto/damage/1.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/damage/2.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/damage/3.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/damage/4.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/damage/5.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/damage/6.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/damage/7.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/damage/8.jpg"), height: "60vh" },
  ];
  model = 0;
}
</script>
