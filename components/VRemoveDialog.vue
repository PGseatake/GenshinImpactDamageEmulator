<template>
  <div>
    <!-- 削除可 -->
    <v-dialog
      v-bind="$attrs"
      v-on="$listeners"
      :value="show > 0"
      @click:outside="onCancel"
    >
      <v-card>
        <v-card-title v-text="title" />
        <v-card-text>
          <slot><span v-html="text + $t('dialog.remove_html')" /></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="secondary" @click="onCancel">{{
            $t("dialog.cancel")
          }}</v-btn>
          <v-btn text color="primary" @click="onAccept">{{
            $t("dialog.remove")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 削除不可 -->
    <v-dialog
      v-bind="$attrs"
      v-on="$listeners"
      :value="show < 0"
      @click:outside="onCancel"
    >
      <v-card>
        <v-card-title v-text="title" />
        <v-card-text>
          <slot><span v-html="text + $t('dialog.remove_x_html')" /></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="onCancel">{{
            $t("dialog.close")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { IIdentify } from "~/src/interface";

@Component({
  name: "VRemoveDialog",
  inheritAttrs: false,
})
export default class VRemoveDialog extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop({ default: null }) item!: IIdentify | null;
  @Prop({ default: "" }) name!: string;
  @Prop({ default: undefined }) exists?: (id: string) => boolean;

  cacheName = "";

  @Emit("accept")
  onAccept() {
    this.cacheName = this.name;
  }

  @Emit("cancel")
  onCancel() {
    this.cacheName = this.name;
  }

  get text() {
    return this.name || this.cacheName;
  }

  get show() {
    const id = this.item?.id;
    if (id) {
      if (this.exists && this.exists(id)) {
        return -1; // 削除不可
      }
      return 1; // 削除可
    }
    return 0;
  }
}
</script>
