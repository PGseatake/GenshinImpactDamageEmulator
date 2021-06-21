<template>
  <v-container class="pa-0">
    <v-row no-gutters align="end">
      <v-col :cols="cols" class="pa-0">
        <v-badge
          :value="!!conste"
          :color="color"
          :content="conste"
          left
          offset-y="18px"
        >
          <v-select-name
            :required="true"
            :value.sync="refValue"
            :items="items"
            group="chara"
          />
        </v-badge>
      </v-col>
      <v-col :cols="cols" class="px-1 py-0 detail" v-text="comment" />
    </v-row>
    <v-row no-gutters>
      <v-col :cols="cols" class="px-1 py-0 detail" v-text="level" />
      <v-col :cols="cols" class="px-1 py-0 detail" v-text="hp" />
      <v-col :cols="cols" class="px-1 py-0 detail" v-text="atk" />
      <v-col :cols="cols" class="px-1 py-0 detail" v-text="def" />
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
div.detail {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  line-height: 1.2em;
  letter-spacing: 0.0333333333em;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { CharaList, CharaName } from "~/src/character";
import { ElementType } from "~/src/const";
import { ICharaData } from "~/src/interface";

@Component({
  name: "VCharaDetail",
  components: {
    VSelectName: () => import("~/components/VSelectName.vue"),
  },
  inheritAttrs: false,
})
export default class VCharaDetail extends Vue {
  @Prop({ required: true }) items!: ReadonlyArray<ICharaData>;
  @Prop({ default: "" }) value!: string;

  get refValue() {
    return this.value;
  }
  set refValue(value: string) {
    this.$emit("update:value", value);
  }

  get cols() {
    return this.$vuetify.breakpoint.xs ? "auto" : "12";
  }

  get item() {
    return this.items.find((item) => item.id === this.value);
  }

  get comment() {
    return this.item?.comment || "-";
  }

  get conste() {
    return this.item?.conste;
  }

  get color() {
    const item = this.item;
    console.log(item);
    if (item) {
      return this.$elementBGColor(CharaList[item.name as CharaName].element);
    }
    return this.$elementBGColor(ElementType.Phys);
  }

  get level() {
    return `Lv.${this.item?.level || 0}`;
  }

  get hp() {
    return `HP:${this.item?.hp || 0}`;
  }

  get atk() {
    return `${this.$t("bonus.atk")}:${this.item?.atk || 0}`;
  }

  get def() {
    return `${this.$t("bonus.def")}:${this.item?.def || 0}`;
  }
}
</script>
