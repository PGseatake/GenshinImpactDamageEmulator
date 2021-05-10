<template>
  <v-container class="pa-0 mb-1">
    <v-row no-gutters>
      <v-col>
        <v-select v-model="refName" :items="names" dense hide-details="true" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="refComment"
          :placeholder="$t('general.comment')"
          dense
          single-line
          class="caption"
          height="1.5em"
          hide-details="true"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

export type TextValue = {
  text: string;
  value: string;
};

@Component({ name: "VNameComment" })
export default class VNameComment extends Vue {
  @Prop({ required: true }) names!: ReadonlyArray<TextValue>;
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) comment!: string;

  get refName() {
    return this.name;
  }
  set refName(name: string) {
    this.$emit("update:name", name);
  }

  get refComment() {
    return this.comment;
  }
  set refComment(comment: string) {
    this.$emit("update:comment", comment);
  }
}
</script>
