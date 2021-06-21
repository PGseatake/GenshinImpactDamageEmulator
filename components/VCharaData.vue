<template>
  <div>
    <v-data-table
      v-bind="$attrs"
      v-on="$listeners"
      :headers="headers"
      :items="items"
      :class="myClass"
      :items-per-page="1000"
      fixed-header
      hide-default-footer
    >
      <template v-slot:[`item.name`]="{ item }">
        <v-name-comment
          :items="names"
          :name.sync="item.name"
          :comment.sync="item.comment"
          @change="onChangeName(item)"
        />
      </template>
      <template v-slot:[`item.conste`]="{ item }">
        <v-select-range v-model="item.conste" :min="0" :max="6" />
      </template>
      <template v-slot:[`item.level`]="{ item }">
        <v-ascension-level v-model="item.level" @change="onChangeLevel(item)" />
      </template>
      <template v-slot:[`item.hp`]="{ item }">
        <v-number-field :value.sync="item.hp" hide-label="true" />
      </template>
      <template v-slot:[`item.atk`]="{ item }">
        <v-number-field :value.sync="item.atk" hide-label="true" />
      </template>
      <template v-slot:[`item.def`]="{ item }">
        <v-number-field :value.sync="item.def" hide-label="true" />
      </template>
      <template v-slot:[`item.special`]="{ item }">
        <v-chara-special :name="item.name" v-bind.sync="item.special" />
      </template>
      <template v-slot:[`item.combat`]="{ item }">
        <v-select-range v-model="item.combat" :min="1" :max="15" />
      </template>
      <template v-slot:[`item.skill`]="{ item }">
        <v-select-range v-model="item.skill" :min="1" :max="15" />
      </template>
      <template v-slot:[`item.burst`]="{ item }">
        <v-select-range v-model="item.burst" :min="1" :max="15" />
      </template>
      <template v-slot:[`item.remove`]="{ item }">
        <v-btn fab x-small class="my-1" @click="onRemove(item)">
          <v-icon>{{ icons.remove }}</v-icon>
        </v-btn>
      </template>
    </v-data-table>
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
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { DataTableHeader } from "vuetify/types";
import { mdiDelete } from "@mdi/js";
import * as ascension from "~/src/ascension";
import { ICharaData } from "~/src/interface";
import { CharaList, CharaName, CharaNames } from "~/src/character";

@Component({
  name: "VCharacterData",
  components: {
    VNameComment: () => import("~/components/VNameComment.vue"),
    VNumberField: () => import("~/components/VNumberField.vue"),
    VSelectRange: () => import("~/components/VSelectRange.vue"),
    VCharaSpecial: () => import("~/components/VCharaSpecial.vue"),
    VAscensionLevel: () => import("~/components/VAscensionLevel.vue"),
  },
  inheritAttrs: false,
})
export default class VCharacterData extends Vue {
  @Prop({ required: true }) items!: Array<ICharaData>;

  @Emit("remove")
  onRemove(item: ICharaData) {}

  readonly headers: ReadonlyArray<DataTableHeader> = [
    { text: this.$t("general.name") as string, value: "name" },
    { text: this.$t("general.conste") as string, value: "conste" },
    { text: this.$t("general.level") as string, value: "level" },
    { text: this.$t("bonus.hp") as string, value: "hp", sortable: false },
    { text: this.$t("bonus.atk") as string, value: "atk", sortable: false },
    { text: this.$t("bonus.def") as string, value: "def", sortable: false },
    { text: this.$t("general.special") as string, value: "special" },
    {
      text: this.$t("general.combat") as string,
      value: "combat",
      sortable: false,
    },
    {
      text: this.$t("general.skill") as string,
      value: "skill",
      sortable: false,
    },
    {
      text: this.$t("general.burst") as string,
      value: "burst",
      sortable: false,
    },
    {
      text: this.$t("dialog.remove") as string,
      value: "remove",
      sortable: false,
      width: "50px",
    },
  ];

  readonly icons: IReadonlyMap<string> = {
    remove: mdiDelete,
  };

  get myClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get names() {
    return CharaNames.map((name) => ({
      text: this.$t("chara." + name),
      value: name,
    }));
  }

  onChangeName(item: ICharaData) {
    const { special } = CharaList[item.name as CharaName];
    item.conste = 0;
    item.level = "1";
    item.special = { type: special, value: 0 };
    item.combat = 1;
    item.skill = 1;
    item.burst = 1;
    this.onChangeLevel(item);
  }

  onChangeLevel(item: ICharaData) {
    const { status, spvalue } = CharaList[item.name as CharaName];
    const level = item.level;
    item.hp = ascension.calc14(level, status.hp);
    item.atk = ascension.calc14(level, status.atk);
    item.def = ascension.calc14(level, status.def);
    item.special.value = ascension.calc8(level, spvalue);
  }
}
</script>
