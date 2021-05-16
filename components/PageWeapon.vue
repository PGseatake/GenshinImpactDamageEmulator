<template>
  <v-container>
    <v-tabs v-model="tab" centered>
      <v-tab v-for="type of types()" :key="type">{{ $t("tab." + type) }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="type of types()" :key="type">
        <v-weapon-data :type="type" :items="$gideData[type]" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { WeaponTypes } from "~/src/const";

@Component({
  name: "PageWeapon",
  components: { VWeaponData: () => import("~/components/VWeaponData.vue") },
})
export default class PageWeapon extends Vue {
  tab: number = 0;

  types() {
    return WeaponTypes;
  }
}
</script>
