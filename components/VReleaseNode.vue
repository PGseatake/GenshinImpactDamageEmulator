<template>
  <v-list-group no-action :sub-group="group" :value="open">
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title v-text="title" />
      </v-list-item-content>
    </template>
    <v-list-item v-if="item" :key="0">
      <v-list-item-content>
        <v-list-item-title v-text="item" />
      </v-list-item-content>
    </v-list-item>
    <template v-else v-for="(data, idx) in items">
      <v-list-item v-if="$isReleaseLeaf(data)" :key="idx">
        <v-list-item-content>
          <v-list-item-title v-text="data" />
        </v-list-item-content>
      </v-list-item>
      <release-node v-else :key="idx" :node="data" />
    </template>
  </v-list-group>
</template>

<script>
export default {
  name: "ReleaseNode",
  props: ["node", "close", "root"],
  data() {
    return {
      group: !this.root,
      open: !this.close,
      item: undefined,
      ...this.node,
    };
  },
};
</script>
