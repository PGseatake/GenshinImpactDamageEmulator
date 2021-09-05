<template>
  <v-container class="pa-0">
    <v-row no-gutters align="end">
      <v-col :cols="cols" class="pa-0">
        <v-badge
          :value="!!conste"
          :content="conste"
          :color="color"
          left
          offset-y="18px"
        >
          <select-name
            v-bind="$attrs"
            v-on="$listeners"
            :items="items"
            :mandatory="true"
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
import { Vue, Component } from "vue-property-decorator";
import { ElementType } from "~/src/const";
import { CharaList } from "~/src/character";

@Component({
  name: "CharaDetail",
  components: {
    SelectName: () => import("~/components/SelectName.vue"),
  },
  inheritAttrs: false,
})
export default class CharaDetail extends Vue {
  get cols() {
    return this.$vuetify.breakpoint.xs ? "auto" : "12";
  }

  get items() {
    return this.$globals.chara;
  }

  get item() {
    return this.items.find((item) => item.id === this.$attrs.value);
  }

  get comment() {
    return this.item?.comment || "-";
  }

  get conste() {
    return this.item?.conste;
  }

  get color() {
    if (this.item) {
      return this.$elementBGColor(CharaList[this.item.name].element);
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
