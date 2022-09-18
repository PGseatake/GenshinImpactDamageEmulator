<template>
  <release-node
    v-bind="$attrs"
    :title="title"
    :items="root.items"
    :group="false"
    class="list-item-root"
  />
</template>

<style lang="scss" scoped>
.list-item-root ::v-deep {
  .v-list-item {
    padding: 0 8px;
  }
}
</style>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import ReleaseNode, { IReleaseNode } from "~/components/menu/ReleaseNode.vue";

@Component({
  name: "ReleaseRoot",
  components: { ReleaseNode },
  inheritAttrs: false,
})
export default class ReleaseRoot extends Vue {
  @Prop({ required: true }) version!: string;
  @Prop({ required: true }) root!: IReleaseNode;

  get title() {
    return `${this.version.split("_").join(".")} (${this.root.date})`;
  }
}
</script>
