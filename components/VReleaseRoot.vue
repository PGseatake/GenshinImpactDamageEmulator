<template>
  <v-release-node
    :title="title()"
    :items="root.items"
    :group="false"
    :open="false"
  />
</template>

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

  title() {
    return `${this.version.split("_").join(".")} (${this.root.date})`;
  }
}
</script>
