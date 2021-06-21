<template>
  <v-container class="pa-0">
    <v-row no-gutters align="end">
      <v-col :cols="cols" class="pa-0">
        <v-badge
          :value="!!rank"
          :color="color"
          :content="rank"
          left
          offset-y="18px"
        >
          <v-select-name
            :value.sync="refValue"
            :items="$globals[type]"
            :group="'weapon.' + type"
          />
        </v-badge>
      </v-col>
      <v-col :cols="cols" class="px-1 py-0 detail" v-text="comment" />
    </v-row>
    <v-row no-gutters>
      <v-col
        v-if="level"
        :cols="cols"
        class="px-1 py-0 detail"
        v-text="level"
      />
      <v-col v-if="atk" :cols="cols" class="px-1 py-0 detail" v-text="atk" />
      <v-col
        v-if="second"
        :cols="cols"
        class="px-1 py-0 detail"
        v-text="second"
      />
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
import { WeaponList } from "~/src/weapon";

@Component({
  name: "VWeaponDetail",
  components: {
    VSelectName: () => import("~/components/VSelectName.vue"),
  },
  inheritAttrs: false,
})
export default class VWeaponDetail extends Vue {
  @Prop({ required: true }) chara!: string;
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

  get type() {
    const chara = this.$globals.chara.find((item) => item.id === this.chara);
    return CharaList[chara!.name as CharaName].weapon;
  }

  get items() {
    return this.$globals[this.type];
  }

  get item() {
    return this.items.find((item) => item.id === this.value);
  }

  get comment() {
    return this.item?.comment || "-";
  }

  get level() {
    return this.item ? `Lv.${this.item.level}` : undefined;
  }

  get rank() {
    return this.item?.rank;
  }

  get color() {
    return this.item
      ? this.$starColor(WeaponList[this.type][this.item.name].star)
      : undefined;
  }

  get atk() {
    return this.item ? `${this.$t("bonus.atk")}:${this.item.rank}` : undefined;
  }

  get second() {
    return this.$formatBonus(this, this.item?.second);
  }
}
</script>
