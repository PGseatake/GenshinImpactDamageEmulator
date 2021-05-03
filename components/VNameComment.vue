<template>
  <v-container class="pa-0 mb-1">
    <v-row no-gutters>
      <v-col>
        <v-select
          v-model="item.name"
          :items="items()"
          dense
          hide-details="true"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-text-field
          v-model="item.comment"
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
import { VSelect, VTextField } from "vuetify/lib";

export type NameComment = {
  name: string;
  comment: string;
};

type ArtifactName = {
  text: string;
  value: string;
};

@Component({
  components: { VSelect, VTextField },
})
export default class VNameComment extends Vue {
  @Prop({ required: true }) names!: ReadonlyArray<string>;
  @Prop({ required: true }) item!: NameComment;

  items() {
    return this.names.map(
      (name: string): ArtifactName => {
        return {
          text: this.$t("artifact.name." + name) as string,
          value: name,
        };
      }
    );
  }
}
</script>
