<template>
  <v-menu offset-y>
    <template #activator="{ attrs, on }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        small
        outlined
        class="px-1"
        v-text="name"
      />
    </template>
    <v-list>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
        :mandatory="mandatory"
      >
        <v-list-item v-for="item in items" :key="item.id" link dense two-line>
          <v-list-item-content class="pa-0">
            <v-list-item-title>{{ getName(item) }}</v-list-item-title>
            <v-list-item-subtitle>{{ getComment(item) }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

export type SelectItem = {
  id: string;
  name: string;
  comment: string;
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
    return this.items.findIndex((item) => item.id === this.value);
  }
  set selectedItem(value: number) {
    if (0 <= value) {
      this.$emit("update:value", this.items[value].id);
    } else {
      this.$emit("update:value", "");
    }
    this.onChange();
  }

  get name() {
    return this.getName(this.items.find((item) => item.id === this.value));
  }

  getComment(item?: SelectItem) {
    return item?.comment || "-";
  }

  getName(item?: SelectItem) {
    if (item) {
      return this.$t(this.group + "." + item.name);
    }
    return this.$t("general.none");
  }
}
</script>
