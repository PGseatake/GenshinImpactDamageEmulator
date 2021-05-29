<template>
  <div>
    <v-data-table
      v-bind="$attrs"
      v-on="$listeners"
      :headers="headers"
      :items="items"
      :class="myClass"
      fixed-header
      hide-default-footer
    >
      <template v-slot:[`item.name`]="{ item }">
        <v-name-comment
          :names="names"
          :name.sync="item.name"
          :comment.sync="item.comment"
        />
      </template>
      <template v-slot:[`item.conste`]="{ item }">
        <v-select-range v-model="item.conste" :min="0" :max="6" />
      </template>
      <template v-slot:[`item.level`]="{ item }">
        <v-ascension-level v-model="item.level" />
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
      <template v-slot:[`item.delete`]="{ item }">
        <v-btn fab x-small class="my-1" @click="deleteItem(item)">
          <v-icon>{{ icons.delete }}</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog :value="isDialog" :fullscreen="$vuetify.breakpoint.xs" persistent>
      <v-card>
        <v-card-title>キャラ追加</v-card-title>
        <v-card-text>とりま</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" outlined @click="isDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" outlined @click="isDialog = false">
            Append
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import { Vue, Component, Prop } from "vue-property-decorator";
import { DataTableHeader } from "~/node_modules/vuetify/types";
import { CharaNames } from "~/src/character";
import { ICharaData } from "~/src/interface";
import { mdiDelete } from "@mdi/js";

@Component({
  name: "VCharacterData",
  components: {
    VNameComment: () => import("~/components/VNameComment.vue"),
    VNumberField: () => import("~/components/VNumberField.vue"),
    VSelectRange: () => import("~/components/VSelectRange.vue"),
    VAscensionLevel: () => import("~/components/VAscensionLevel.vue"),
    VCharaSpecial: () => import("~/components/VCharaSpecial.vue"),
  },
  inheritAttrs: false,
})
export default class VCharacterData extends Vue {
  @Prop({ required: true }) items!: Array<ICharaData>;
  @Prop({ default: false }) append!: boolean;

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
      text: this.$t("general.delete") as string,
      value: "delete",
      sortable: false,
      width: "50px",
    },
  ];

  readonly icons: IReadonlyMap<string> = {
    delete: mdiDelete,
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

  get isDialog() {
    return this.append;
  }
  set isDialog(value: boolean) {
    this.$store.commit("setAppend", value);
  }

  deleteItem(item: ICharaData) {
    console.log(item);
  }
}
</script>
