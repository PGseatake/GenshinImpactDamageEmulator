<template>
  <v-dialog v-bind="$attrs" v-on="$listeners" v-model="refShow">
    <v-card>
      <v-card-title v-text="$t('dialog.import')" />
      <v-card-text>
        <v-file-input
          v-model="file"
          clearable
          accept="application/json"
          :clear-icon="icons.clear"
          :prepend-icon="icons.file"
        />
        <div v-text="$t('dialog.import_text')" style="text-align: center" />
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          text
          color="secondary"
          v-text="$t('dialog.cancel')"
          @click="refShow = false"
        />
        <v-btn
          text
          color="primary"
          v-text="$t('dialog.ok')"
          :disabled="!file"
          @click="onChange"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { VDialog } from "vuetify/lib";
import { mdiClose, mdiPaperclip } from "@mdi/js";

@Component({
  name: "VImportDialog",
  components: { VDialog },
  inheritAttrs: false,
})
export default class VImportDialog extends Vue {
  @Prop({ required: true }) show!: boolean;

  @Emit("input")
  onInput(value: File | null) {}

  readonly icons = {
    clear: mdiClose,
    file: mdiPaperclip,
  };
  file: File | null = null;

  get refShow() {
    return this.show;
  }
  set refShow(value: boolean) {
    this.$emit("update:show", value);
  }

  onChange() {
    this.refShow = false;
    this.onInput(this.file);
    this.file = null;
  }
}
</script>
