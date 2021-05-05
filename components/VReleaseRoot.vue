<template>
  <v-release-node
    :title="title"
    :items="root.items"
    :group="false"
    :open="false"
  />
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { ReleaseNode } from "./VReleaseNode.vue";

export default Vue.extend({
  name: "VReleaseRoot",
  components: { VReleaseNode: () => import("./VReleaseNode.vue") },
  inheritAttrs: false,
  props: {
    version: { type: String, required: true },
    root: { type: Object as PropType<ReleaseNode>, required: true },
  },
  data() {
    return {
      title: `${this.version.split("_").join(".")} (${this.root.date})`,
    };
  },
});
</script>
