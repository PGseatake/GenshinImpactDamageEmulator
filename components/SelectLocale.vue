<template>
  <v-menu offset-y open-on-hover>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="{ ...attrs, ...$attrs }" v-on="on">
        <slot></slot>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group v-model="locale" mandatory>
        <v-list-item
          v-for="(loc, index) in locales"
          :key="index"
          :to="switchLocalePath(loc.code)"
        >
          <v-list-item-title>{{ loc.name }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { LocaleObject } from "nuxt-i18n";

@Component({
  name: "SelectLocale",
  inheritAttrs: false,
})
export default class SelectLocale extends Vue {
  get locales(): LocaleObject[] {
    return this.$i18n.locales as LocaleObject[];
  }

  get locale() {
    return this.locales.findIndex((loc) => loc.code === this.$i18n.locale);
  }
}
</script>
