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
      <template #[`item.conste`]="{ item }">
        <select-range-k v-model="item.conste" :items="constes" class="ma-0" />
      </template>
      <template #[`item.level`]="{ item }">
        <ascension-level v-model="item.level" @change="onChangeLevel(item)" />
      </template>
      <template #[`item.hp`]="{ item }">
        <number-field :value.sync="item.hp" :hide-label="true" />
      </template>
      <template #[`item.atk`]="{ item }">
        <number-field :value.sync="item.atk" :hide-label="true" />
      </template>
      <template #[`item.def`]="{ item }">
        <number-field :value.sync="item.def" :hide-label="true" />
      </template>
      <template #[`item.special`]="{ item }">
        <chara-special :name="item.name" v-bind.sync="item.special" />
      </template>
      <template #[`item.combat`]="{ item }">
        <select-range-k v-model="item.combat" :items="talents" class="ma-0" />
      </template>
      <template #[`item.skill`]="{ item }">
        <select-range-k v-model="item.skill" :items="talents" class="ma-0" />
      </template>
      <template #[`item.burst`]="{ item }">
        <select-range-k v-model="item.burst" :items="talents" class="ma-0" />
      </template>
      <template #[`item.action`]="{ item }">
        <v-btn fab x-small class="my-1" @click="onBeforeRemove(item)">
          <v-icon>{{ icons.remove }}</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <dialog-append
      type="chara"
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
      type="chara"
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
    // 星座
    &:nth-of-type(2) {
      min-width: 60px;
      max-width: 80px;
    }
    // Lv
    &:nth-of-type(3) {
      min-width: 60px;
      max-width: 80px;
    }
    // HP
    &:nth-of-type(4) {
      min-width: 80px;
      max-width: 100px;
    }
    // 攻撃力
    &:nth-of-type(5) {
      min-width: 70px;
      max-width: 90px;
    }
    // 防御力
    &:nth-of-type(6) {
      min-width: 70px;
      max-width: 90px;
    }
    // 固有ステータス
    &:nth-of-type(7) {
      min-width: 100px;
      max-width: 120px;
    }
    // 天賦
    &:nth-of-type(8) {
      min-width: 60px;
      max-width: 70px;
    }
    &:nth-of-type(9) {
      min-width: 60px;
      max-width: 70px;
    }
    &:nth-of-type(10) {
      min-width: 60px;
      max-width: 70px;
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
    // 星座
    // &:nth-of-type(2) .v-data-table__mobile-row__cell {}
    // Lv
    // &:nth-of-type(3) .v-data-table__mobile-row__cell {}
    // HP
    &:nth-of-type(4) .v-data-table__mobile-row__cell {
      min-width: 80px;
      max-width: 40%;
    }
    // 攻撃力
    &:nth-of-type(5) .v-data-table__mobile-row__cell {
      min-width: 80px;
      max-width: 40%;
    }
    // 防御力
    &:nth-of-type(6) .v-data-table__mobile-row__cell {
      min-width: 80px;
      max-width: 40%;
    }
    // 固有ステータス
    &:nth-of-type(7) .v-data-table__mobile-row__cell {
      min-width: 110px;
      max-width: 50%;
    }
    // 天賦
    // &:nth-of-type(8) .v-data-table__mobile-row__cell {}
    // &:nth-of-type(9) .v-data-table__mobile-row__cell {}
    // &:nth-of-type(10) .v-data-table__mobile-row__cell {}
  }
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiDelete } from "@mdi/js";
import Chara, { ICharaData, CharaNames, CharaName } from "~/src/character";
import Pagination from "~/src/pagination";
import { MakeRange } from "~/src/utility";

@Component({
  name: "CharaData",
  components: {
    NameComment: () => import("~/components/input/NameComment.vue"),
    NumberField: () => import("~/components/input/NumberField.vue"),
    SelectRangeK: () => import("~/components/input/SelectRangeK.vue"),
    AscensionLevel: () => import("~/components/input/AscensionLevel.vue"),
    CharaSpecial: () => import("~/components/equip/CharaSpecial.vue"),
    DialogAppend: () => import("~/components/dialog/DialogAppend.vue"),
    DialogRemove: () => import("~/components/dialog/DialogRemove.vue"),
  },
  inheritAttrs: false,
})
export default class CharaData extends Vue {
  page = new Pagination();
  items: ICharaData[] = [];
  append: CharaName | "" = "";
  remove: ICharaData | null = null;

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get icons() {
    return { remove: mdiDelete };
  }

  get constes() {
    return MakeRange(0, 6);
  }

  get talents() {
    return MakeRange(1, 15);
  }

  get footer() {
    return this.page.footer(this.$i18n);
  }

  get headers() {
    return [
      { text: this.$t("general.name"), value: "name" },
      { text: this.$t("general.conste"), value: "conste" },
      { text: this.$t("general.level"), value: "level" },
      { text: this.$t("bonus.hp"), value: "hp" },
      { text: this.$t("bonus.atk"), value: "atk" },
      { text: this.$t("bonus.def"), value: "def" },
      { text: this.$t("general.special"), value: "special", sortable: false },
      { text: this.$t("general.combat"), value: "combat", sortable: false },
      { text: this.$t("general.skill"), value: "skill", sortable: false },
      { text: this.$t("general.burst"), value: "burst", sortable: false },
      { text: "", value: "action", sortable: false, width: "50px" },
    ];
  }

  get names() {
    return CharaNames.map((name) => ({
      text: this.$t("chara." + name),
      value: name,
    }));
  }

  get removeName() {
    const name = this.remove?.name;
    return name ? this.$t(`chara.${name}`) : "";
  }

  created() {
    this.items = this.$db.chara;
    this.page.load("chara");
  }

  beforeDestroy() {
    this.page.save();
  }

  onChangeName(item: ICharaData) {
    Chara.reset(item, this.$db.setting.initial.chara);
  }

  onChangeLevel(item: ICharaData) {
    Chara.level(item);
  }

  onAppend() {
    const name = this.append;
    if (name) {
      const data = Chara.create(
        this.$makeUniqueId(),
        name,
        this.$db.setting.initial.chara
      );
      this.$appendData(this.items, data);
      this.append = "";

      this.page.row = this.page.max(this.items.length);
    }
  }

  onBeforeRemove(data: ICharaData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.items, this.remove);
      this.remove = null;
    }
  }

  exists(id: string): boolean {
    return !!this.$db.equip.find((data) => data.chara === id);
  }
}
</script>
