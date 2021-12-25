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
        $t("howto.weapon.p1")
      }}</v-col>
      <v-col v-if="model === 1" class="v-card__text">{{
        $t("howto.weapon.p2")
      }}</v-col>
      <v-col v-if="model === 2">
        <v-simple-table dense fixed-header>
          <tbody>
            <tr v-for="(item, i) of items" :key="i">
              <th>{{ $t(item) }}</th>
              <td>{{ $t(`howto.weapon.list${i}`) }}</td>
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

@Component({ name: "HowtoWeapon" })
export default class HowtoWeapon extends Vue {
  readonly images = [
    { src: require("@/assets/img/howto/weapon/1.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/weapon/2.jpg"), height: "60vh" },
    { src: require("@/assets/img/howto/weapon/3.jpg"), height: "35vh" },
  ];
  readonly items = [
    "tab.sword",
    "tab.claymore",
    "tab.polearm",
    "tab.bow",
    "tab.catalyst",
    "general.name",
    "general.comment",
    "general.rank",
    "general.level",
    "bonus.atk",
    "general.second",
  ];
  model = 0;
}
</script>
