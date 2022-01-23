<template>
  <v-dialog v-bind="$attrs" v-on="$listeners" v-model="refShow" persistent>
    <v-card>
      <v-card-title v-if="title">{{
        $t("setting.initial." + title)
      }}</v-card-title>
      <v-card-text>
        <v-list dense class="pa-0">
          <template v-for="(item, i) of items">
            <!-- カテゴリヘッダ -->
            <template v-if="item.type === 'header'">
              <v-divider v-if="i" :key="'div.' + item.text" />
              <v-subheader v-text="$t(item.text)" :key="'sub.' + item.text" />
            </template>
            <!-- カテゴリアイテム -->
            <v-list-item v-else dense :key="item.text + i">
              <v-list-item-content v-text="$t(item.text)" />
              <v-list-item-action class="my-0" style="width: 60px">
                <!-- SelectRangeタイプ -->
                <select-range
                  v-if="item.type === 'range'"
                  v-model="item.value"
                  :min="item.min"
                  :max="item.max"
                />
                <!-- AscensionLevelタイプ -->
                <ascension-level
                  v-else-if="item.type === 'level'"
                  v-model="item.value"
                />
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="secondary" @click="onCancel">{{
          $t("dialog.cancel")
        }}</v-btn>
        <v-btn text color="primary" @click="onAccept">{{
          $t("dialog.save")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

export type IHeader = {
  readonly type: "header";
  readonly text: string;
  value?: undefined;
};
export type IRange = {
  readonly type: "range";
  readonly text: string;
  value: number;
  readonly min: number;
  readonly max: number;
};
export type ILevel = {
  readonly type: "level";
  readonly text: string;
  value: string;
};

export type ListItem = IHeader | IRange | ILevel;

@Component({
  name: "DialogInitial",
  inheritAttrs: false,
})
export default class DialogInitial extends Vue {
  @Prop({ required: true }) show!: boolean;
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) items!: ListItem[];

  get refShow() {
    return this.show;
  }
  set refShow(value: boolean) {
    this.$emit("update:show", value);
  }

  get itemClass() {
    return this.$vuetify.breakpoint.xs ? "my-1 ml-4" : "my-1 ml-12";
  }

  @Emit("accept")
  onAccept() {
    this.refShow = false;
  }

  onCancel() {
    this.refShow = false;
  }
}
</script>
