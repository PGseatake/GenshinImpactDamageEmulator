<template>
  <release-node :node="items" :close="true" :root="true" />
</template>

<script>
import ReleaseNode from "./ReleaseNode.vue";
export default {
  components: { ReleaseNode },
  name: "ReleaseRoot",
  props: ["version", "root"],
  data() {
    return {
      items: {
        title: `${this.version.split("_").join(".")} (${this.root.date})`,
        item: this.root.item,
        items: this.root.items,
      },
    };
  },
};
</script>
