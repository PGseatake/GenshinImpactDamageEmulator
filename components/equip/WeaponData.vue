<template>
  <div>
    <v-data-table
      v-bind="$attrs"
      v-on="$listeners"
      :headers="headers"
      :items="items"
      :class="tableClass"
      :page.sync="page.row"
      :items-per-page.sync="page.rows"
      :sort-by.sync="page.sortBy"
      :sort-desc.sync="page.sortDesc"
      :footer-props="footer"
      fixed-header
      multi-sort
    >
      <template #[`item.name`]="{ item }">
        <name-comment
          :items="names"
          :value.sync="item.name"
          :comment.sync="item.comment"
          @change="onChangeName(item)"
        />
      </template>
      <template #[`item.rank`]="{ item }">
        <select-range v-model="item.rank" :min="1" :max="5" />
      </template>
      <template #[`item.level`]="{ item }">
        <ascension-level v-model="item.level" @change="onChangeLevel(item)" />
      </template>
      <template #[`item.atk`]="{ item }">
        <number-field :value.sync="item.atk" :hide-label="true" />
      </template>
      <template #[`item.second`]="{ item }">
        <weapon-second
          :list="list"
          :name="item.name"
          v-bind.sync="item.second"
        />
      </template>
      <template #[`item.action`]="{ item }">
        <v-btn fab x-small class="my-1" @click="onBeforeRemove(item)">
          <v-icon>{{ icons.remove }}</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <dialog-append
      :type="type"
      :disabled="!append"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <v-select
        v-model="append"
        :items="names"
        :menu-props="{ auto: true, transition: false }"
      />
    </dialog-append>
    <dialog-remove
      :type="type"
      :item="remove"
      :name="removeName"
      :exists="exists"
      max-width="300px"
      @accept="onRemove"
      @cancel="remove = null"
    />
  </div>
</template>

<style lang="scss" scoped>
.pc-data-table ::v-deep {
  tr:hover {
    background: inherit !important;
  }
  .text-start {
    padding: 0 6px;

    // 名前
    &:nth-of-type(1) {
      min-width: 200px;
      max-width: 350px;
    }
    // 凸
    &:nth-of-type(2) {
      min-width: 60px;
      max-width: 80px;
    }
    // Lv
    &:nth-of-type(3) {
      min-width: 60px;
      max-width: 80px;
    }
    // 攻撃力
    &:nth-of-type(4) {
      min-width: 70px;
      max-width: 90px;
    }
    // 追加効果
    &:nth-of-type(5) {
      min-width: 100px;
      max-width: 120px;
    }
  }
}

.mb-data-table ::v-deep {
  td {
    // 名前
    &:nth-of-type(1) .v-data-table__mobile-row__cell {
      min-width: 150;
      max-width: 70%;
    }
    // 凸
    // &:nth-of-type(2) .v-data-table__mobile-row__cell {}
    // Lv
    // &:nth-of-type(3) .v-data-table__mobile-row__cell {}
    // 攻撃力
    &:nth-of-type(4) .v-data-table__mobile-row__cell {
      min-width: 80px;
      max-width: 40%;
    }
    // 追加効果
    &:nth-of-type(5) .v-data-table__mobile-row__cell {
      min-width: 110px;
      max-width: 50%;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mdiDelete } from "@mdi/js";
import { WeaponType } from "~/src/const";
import { IWeaponData, WeaponNames, WeaponList, Builder } from "~/src/weapon";
import Pagination from "~/src/pagination";

@Component({
  name: "WeaponData",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    NumberField: () => import("~/components/NumberField.vue"),
    SelectRange: () => import("~/components/SelectRange.vue"),
    AscensionLevel: () => import("~/components/AscensionLevel.vue"),
    WeaponSecond: () => import("~/components/equip/WeaponSecond.vue"),
    DialogAppend: () => import("~/components/dialog/DialogAppend.vue"),
    DialogRemove: () => import("~/components/dialog/DialogRemove.vue"),
  },
  inheritAttrs: false,
})
export default class WeaponData extends Vue {
  @Prop({ required: true }) type!: WeaponType;

  readonly icons = { remove: mdiDelete };

  page = new Pagination();
  items: IWeaponData[] = [];
  append = "";
  remove: IWeaponData | null = null;

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get footer() {
    return this.page.footer(this.$i18n);
  }

  get headers() {
    return [
      { text: this.$t("general.name"), value: "name" },
      { text: this.$t("general.rank"), value: "rank" },
      { text: this.$t("general.level"), value: "level" },
      { text: this.$t("bonus.atk"), value: "atk" },
      { text: this.$t("general.second"), value: "second", sortable: false },
      { text: "", value: "action", sortable: false, width: "50px" },
    ];
  }

  get names() {
    return WeaponNames[this.type].map((name) => ({
      text: this.$t(`weapon.${this.type}.${name}`),
      value: name,
    }));
  }

  get list() {
    return WeaponList[this.type];
  }

  get removeName() {
    const name = this.remove?.name;
    return name ? this.$t(`weapon.${this.type}.${name}`) : "";
  }

  created() {
    this.items = this.$db[this.type];
    this.page.load(this.type);
  }

  beforeDestroy() {
    this.page.save();
  }

  onChangeName(item: IWeaponData) {
    Builder.name(item, this.type, this.$db.setting.initial.weapon);
  }

  onChangeLevel(item: IWeaponData) {
    Builder.level(item, this.type);
  }

  onAppend() {
    const name = this.append;
    if (name) {
      const data = Builder.make(
        this.$makeUniqueId(),
        this.type,
        name,
        this.$db.setting.initial.weapon
      );
      this.$appendData(this.items, data);
      this.append = "";

      this.page.row = this.page.max(this.items.length);
    }
  }

  onBeforeRemove(data: IWeaponData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.items, this.remove);
      this.remove = null;
    }
  }

  exists(id: string): boolean {
    return !!this.$db.equip.find((data) => data.weapon === id);
  }
}
</script>
