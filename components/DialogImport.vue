<template>
  <dialog-file
    width="450px"
    :file="importFile"
    :show.sync="importShow"
    :label="$t('dialog.import')"
    :detail="$t('dialog.import_text')"
    @accept="onImport"
  >
    <template v-slot>
      <v-file-input
        v-model="importFile"
        clearable
        truncate-length="40"
        accept="application/json"
        :clear-icon="icons.clear"
        :prepend-icon="icons.file"
      />
    </template>
  </dialog-file>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import DialogFile from "~/components/DialogFile.vue";

@Component({
  name: "DialogImport",
  components: { DialogFile },
})
export default class DialogImport extends Vue {
  @Prop({ required: true }) reflect!: (json: string | null) => void;
  @Prop({ required: true }) icons!: IDict<string>;

  get importFile(): File | null {
    return this.$store.state.importFile;
  }
  set importFile(value: File | null) {
    this.$store.commit("importFile", value);
  }

  get importShow(): boolean {
    return this.$store.state.importShow;
  }
  set importShow(value: boolean) {
    this.$store.commit("importShow", value);
  }

  onImport() {
    const file = this.importFile;
    if (file) {
      // jsonファイル読み込み
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.reflect(reader.result as string);
        localStorage.setItem("global_data", JSON.stringify(this.$db));
        this.$store.commit("popup", this.$t("popup.import"));
        this.$store.commit("reload");
      };
    }
  }
}
</script>
