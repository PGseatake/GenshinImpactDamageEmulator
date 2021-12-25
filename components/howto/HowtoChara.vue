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
        ><v-icon v-text="icons.append" />{{ $t("howto.chara.p1_1") }}<br />{{
          $t("howto.chara.p1_2")
        }}</v-col
      >
      <v-col v-if="model === 1" class="v-card__text"
        >{{ $t("howto.chara.p2_1") }}<br />{{ $t("howto.chara.p2_2") }}</v-col
      >
      <v-col v-if="model === 2" class="v-card__text"
        ><v-icon v-text="icons.remove" />{{ $t("howto.chara.p3_1") }}</v-col
      >
      <v-col v-if="model === 3" class="v-card__text"
        >{{ $t("howto.chara.p4_1") }}<br />{{ $t("howto.chara.p4_2") }}</v-col
      >
      <v-col v-if="model === 4">
        <v-simple-table dense fixed-header>
          <tbody>
            <tr v-for="(item, i) of items" :key="i">
              <th>{{ $t(item) }}</th>
              <td>{{ $t(`howto.chara.list${i}`) }}</td>
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
import { mdiDelete, mdiPlaylistPlus } from "@mdi/js";

@Component({ name: "HowtoChara" })
export default class HowtoChara extends Vue {
  readonly icons = {
    append: mdiPlaylistPlus,
    remove: mdiDelete,
  };
  readonly images = [
    { src: require("@/assets/img/howto/chara/1.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/chara/2.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/chara/3.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/chara/4.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/chara/5.jpg"), height: "35vh" },
  ];
  readonly items = [
    "general.name",
    "general.comment",
    "general.conste",
    "general.level",
    "bonus.hp",
    "bonus.atk",
    "bonus.def",
    "general.special",
    "general.combat",
    "general.skill",
    "general.burst",
  ];
  model = 0;
}
</script>
