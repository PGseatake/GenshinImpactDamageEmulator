<template>
  <v-menu offset-y open-on-hover max-height="300px">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="{ ...attrs, ...$attrs }" v-on="on">
        <slot></slot>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group v-model="locale" mandatory>
        <v-list-item
          v-for="loc of locales"
          :key="loc.code"
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

@Component({
  name: "SelectLocale",
  inheritAttrs: false,
})
export default class SelectLocale extends Vue {
  get locales() {
    return this.$i18n.locales;
  }

  get locale() {
    return this.locales.findIndex((loc) => loc.code === this.$i18n.locale);
  }
}
</script>
