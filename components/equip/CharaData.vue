<template>
  <div>
    <v-data-table
      v-bind="$attrs"
      v-on="$listeners"
      :headers="headers"
      :items="items"
      :class="tableClass"
      :items-per-page="-1"
      fixed-header
      hide-default-footer
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
        <select-range v-model="item.conste" :min="0" :max="6" />
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
        <select-range v-model="item.combat" :min="1" :max="15" />
      </template>
      <template #[`item.skill`]="{ item }">
        <select-range v-model="item.skill" :min="1" :max="15" />
      </template>
      <template #[`item.burst`]="{ item }">
        <select-range v-model="item.burst" :min="1" :max="15" />
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
import * as ascension from "~/src/ascension";
import { ICharaData, CharaList, CharaNames, CharaName } from "~/src/character";

@Component({
  name: "CharaData",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    NumberField: () => import("~/components/NumberField.vue"),
    SelectRange: () => import("~/components/SelectRange.vue"),
    AscensionLevel: () => import("~/components/AscensionLevel.vue"),
    CharaSpecial: () => import("~/components/equip/CharaSpecial.vue"),
    DialogAppend: () => import("~/components/dialog/DialogAppend.vue"),
    DialogRemove: () => import("~/components/dialog/DialogRemove.vue"),
  },
  inheritAttrs: false,
})
export default class CharaData extends Vue {
  items: ICharaData[] = [];
  append: CharaName | "" = "";
  remove: ICharaData | null = null;

  readonly icons = { remove: mdiDelete };

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
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
  }

  onChangeName(item: ICharaData) {
    const init = this.$db.setting.initial.chara;
    const { special } = CharaList[item.name];
    item.conste = init.conste;
    item.level = init.level;
    item.special = { type: special, value: 0 };
    item.combat = init.combat;
    item.skill = init.skill;
    item.burst = init.burst;
    this.onChangeLevel(item);
  }

  onChangeLevel(item: ICharaData) {
    const { status, spvalue } = CharaList[item.name];
    const level = item.level;
    item.hp = ascension.calc14(level, status.hp);
    item.atk = ascension.calc14(level, status.atk);
    item.def = ascension.calc14(level, status.def);
    item.special.value = ascension.step8(level, spvalue);
  }

  onAppend() {
    const name = this.append;
    if (name) {
      const init = this.$db.setting.initial.chara;
      const item = CharaList[name];
      const data: ICharaData = {
        id: this.$makeUniqueId(),
        name: name,
        comment: "",
        conste: init.conste,
        level: init.level,
        hp: item.status.hp[0],
        atk: item.status.atk[0],
        def: item.status.def[0],
        special: {
          type: item.special,
          value: item.spvalue[0],
        },
        combat: init.combat,
        skill: init.skill,
        burst: init.burst,
      };
      this.onChangeLevel(data);
      this.$appendData(this.items, data);
      this.append = "";
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
