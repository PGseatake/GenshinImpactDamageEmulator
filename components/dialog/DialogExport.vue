<template>
  <dialog-file
    width="450px"
    :file="exportFile"
    :show.sync="exportShow"
    :label="$t('dialog.export')"
    :detail="$t('dialog.export_text')"
    @accept="onExport"
  >
    <template v-slot>
      <v-text-field
        v-model="exportFile"
        clearable
        :clear-icon="icons.clear"
        :prepend-icon="icons.file"
      />
    </template>
  </dialog-file>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import DialogFile from "~/components/dialog/DialogFile.vue";

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

@Component({
  name: "DialogExport",
  components: { DialogFile },
  inheritAttrs: false,
})
export default class DialogExport extends Vue {
  @Prop({ required: true }) icons!: IDict<string>;

  get exportFile(): string | null {
    return this.$store.state.exportFile;
  }
  set exportFile(value: string | null) {
    this.$store.commit("exportFile", value);
  }

  get exportShow(): boolean {
    return this.$store.state.exportShow;
  }
  set exportShow(value: boolean) {
    this.$store.commit("exportShow", value);
  }

  onExport() {
    const file = this.exportFile;
    if (file) {
      let blob = new Blob([JSON.stringify(this.$db)], {
        type: "application/json",
      });
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, file);
      } else {
        let link = document.createElement("a");
        document.body.appendChild(link);
        let url = (URL || webkitURL).createObjectURL(blob);
        link.href = url;
        link.download = file;
        link.click();
        link.remove();
        (URL || webkitURL).revokeObjectURL(url);
        this.$store.commit("popup", this.$t("popup.export"));
      }
    }
  }
}
</script>
