<template>
  <v-list-group no-action :sub-group="group" :value="open">
    <template v-slot:activator>
      <v-list-item>
        <v-list-item-content class="py-0">
          <v-list-item-title v-text="title" />
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-list-item v-if="typeof items === 'string'" :key="0">
      <v-list-item-content class="py-0">
        <v-list-item-title v-text="items" />
      </v-list-item-content>
    </v-list-item>
    <template v-else v-for="(data, index) in items">
      <v-list-item v-if="typeof data === 'string'" :key="index">
        <v-list-item-content class="py-0">
          <v-list-item-title v-text="data" />
        </v-list-item-content>
      </v-list-item>
      <v-release-node
        v-else
        :key="index"
        :title="data.title"
        :items="data.items"
      />
    </template>
  </v-list-group>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

export type ReleaseLeaf = string | Array<string | ReleaseNode>;
export type ReleaseNode = { [key in string]: ReleaseLeaf };

@Component({ name: "VReleaseNode" })
export default class VReleaseNode extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) items!: string | Array<string | ReleaseNode>;
  @Prop({ default: true }) group!: boolean;
  @Prop({ default: true }) open!: boolean;
}
</script>
