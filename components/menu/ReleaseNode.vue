<template>
  <v-list-group
    v-bind="$attrs"
    :sub-group="group"
    :append-icon="appendIcon"
    :prepend-icon="prependIcon"
    no-action
  >
    <template #activator>
      <v-list-item :dense="group">
        <v-list-item-content class="py-0">
          <v-list-item-title v-text="title" />
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-list-item
      v-if="typeof items === 'string'"
      :key="0"
      dense
      class="list-item-node"
    >
      <v-list-item-content class="py-1">
        <v-list-item-title v-text="items" class="pr-4 text-wrap" />
      </v-list-item-content>
    </v-list-item>
    <template v-else v-for="(data, index) in items">
      <v-list-item
        v-if="typeof data === 'string'"
        :key="index"
        dense
        class="list-item-node"
      >
        <v-list-item-content class="py-1">
          <v-list-item-title v-text="data" class="pr-4 text-wrap" />
        </v-list-item-content>
      </v-list-item>
      <release-node
        v-else
        :key="index"
        :value="true"
        :group="true"
        :title="data.title"
        :items="data.items"
        class="list-item-node"
      />
    </template>
  </v-list-group>
</template>

<style lang="scss" scoped>
.list-item-node {
  min-height: 24px;
}
.list-item-node ::v-deep {
  .v-list-item {
    min-height: 24px;
    padding: 0 8px;
  }
}
</style>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { mdiChevronDown, mdiMenuDown } from "@mdi/js";

export type IReleaseLeaf = string | ReadonlyArray<string | IReleaseNode>;
export type IReleaseNode = { readonly [key in string]: IReleaseLeaf };

@Component({
  name: "ReleaseNode",
  inheritAttrs: false,
})
export default class ReleaseNode extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) items!: IReleaseLeaf;
  @Prop({ default: false }) group!: boolean;

  get appendIcon() {
    return this.group ? "" : mdiChevronDown;
  }

  get prependIcon() {
    return this.group ? mdiMenuDown : "";
  }
}
</script>
