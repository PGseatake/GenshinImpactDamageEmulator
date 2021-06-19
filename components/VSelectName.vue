<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" small outlined class="px-1">{{
        name
      }}</v-btn>
    </template>
    <v-list>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
        :mandatory="required"
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
import { Vue, Component, Prop } from "vue-property-decorator";

type NameComment = {
  id: string;
  name: string;
  comment: string;
};

@Component({
  name: "VSelectName",
  inheritAttrs: false,
})
export default class VSelectName extends Vue {
  @Prop({ required: true }) items!: ReadonlyArray<NameComment>;
  @Prop({ required: true }) group!: string;
  @Prop({ default: "" }) value!: string;
  @Prop({ default: false }) required!: boolean;

  get selectedItem() {
    return this.items.findIndex((item) => item.id === this.value);
  }
  set selectedItem(value: number) {
    if (0 <= value) {
      this.$emit("update:value", this.items[value].id);
    } else {
      this.$emit("update:value", "");
    }
  }

  get name() {
    return this.getName(this.items.find((item) => item.id === this.value));
  }

  getComment(item: NameComment | undefined) {
    return item?.comment || "-";
  }

  getName(item: NameComment | undefined) {
    if (item) {
      return this.$t(this.group + "." + item.name);
    }
    return this.$t("general.none");
  }
}
</script>
