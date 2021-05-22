<template>
  <v-release-node :title="title" :items="root.items" class="list-item-root" />
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
import { ReleaseNode } from "./VReleaseNode.vue";

@Component({
  name: "VReleaseRoot",
  components: { VReleaseNode: () => import("./VReleaseNode.vue") },
  inheritAttrs: false,
})
export default class VReleaseRoot extends Vue {
  @Prop({ required: true }) version!: string;
  @Prop({ required: true }) root!: ReleaseNode;

  get title() {
    return `${this.version.split("_").join(".")} (${this.root.date})`;
  }
}
</script>
