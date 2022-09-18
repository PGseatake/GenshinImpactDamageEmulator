<template>
  <v-menu offset-y max-height="300px">
    <template #activator="{ attrs, on }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        small
        outlined
        class="px-1 name_button"
        v-text="name"
      />
    </template>
    <v-list>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
        :mandatory="mandatory"
      >
        <v-list-item
          v-for="item in selectItems"
          :key="item.id"
          link
          dense
          two-line
        >
          <v-list-item-content class="pa-0">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<style lang="scss" scoped>
.name_button {
  white-space: normal;
  font-kerning: normal;
  letter-spacing: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

export type SelectItem = {
  id: string;
  name: string;
  comment: string;
  title?: string;
  subtitle?: string;
};

@Component({
  name: "SelectName",
  inheritAttrs: false,
})
export default class SelectName extends Vue {
  @Prop({ required: true }) items!: ReadonlyArray<SelectItem>;
  @Prop({ required: true }) group!: string;
  @Prop({ default: "" }) value!: string;
  @Prop({ default: false }) mandatory!: boolean;

  @Emit("change")
  onChange() {}

  get selectedItem() {
    const value = this.value;
    return this.items.findIndex((v) => v.id === value);
  }
  set selectedItem(value: number) {
    this.$emit("update:value", this.items[value]?.id || "");
    this.onChange();
  }

  get selectItems() {
    const group = this.group;
    const i18n = this.$i18n;
    return this.items.map((v) => ({
      ...v,
      title: i18n.t(group + "." + v.name),
      subtitle: v.comment || "-",
    }));
  }

  get name() {
    const value = this.value;
    return (
      this.selectItems.find((v) => v.id === value)?.title ||
      this.$t("general.none")
    );
  }
}
</script>
