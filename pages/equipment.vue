<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-data-table
      :headers="headers"
      :items="items"
      :class="tableClass"
      :items-per-page="-1"
      fixed-header
      disable-sort
      hide-default-footer
    >
      <template #[`item.comment`]="{ item }">
        <v-text-field
          v-model="item.comment"
          single-line
          hide-details
          dense
          class="text-caption"
        />
      </template>
      <template #[`item.chara`]="{ item }">
        <chara-detail :value.sync="item.chara" />
      </template>
      <template #[`item.weapon`]="{ item }">
        <weapon-detail :chara="item.chara" :value.sync="item.weapon" />
      </template>
      <template #[`item.flower`]="{ item }">
        <artifact-detail
          :value.sync="item.flower"
          :items="$db.flower"
          type="flower"
        />
      </template>
      <template #[`item.feather`]="{ item }">
        <artifact-detail
          :value.sync="item.feather"
          :items="$db.feather"
          type="feather"
        />
      </template>
      <template #[`item.sands`]="{ item }">
        <artifact-detail
          :value.sync="item.sands"
          :items="$db.sands"
          type="sands"
        />
      </template>
      <template #[`item.goblet`]="{ item }">
        <artifact-detail
          :value.sync="item.goblet"
          :items="$db.goblet"
          type="goblet"
        />
      </template>
      <template #[`item.circlet`]="{ item }">
        <artifact-detail
          :value.sync="item.circlet"
          :items="$db.circlet"
          type="circlet"
        />
      </template>
      <template #[`item.action`]="{ item }">
        <v-btn fab x-small class="my-1" @click="onBeforeRemove(item)">
          <v-icon>{{ icons.remove }}</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <dialog-append
      type="equip"
      :disabled="!append"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <name-comment
        :items="names"
        :value.sync="append"
        :comment="comment"
        :commentable="false"
        :dense="false"
      />
    </dialog-append>
    <dialog-remove
      type="equip"
      :item="remove"
      :name="removeName"
      :exists="exists"
      max-width="300px"
      @accept="onRemove"
      @cancel="remove = null"
    />
  </v-container>
</template>

<style lang="scss" scoped>
.v-input {
  padding: 0;
}

.pc-data-table ::v-deep {
  tr:hover {
    background: inherit !important;
  }
  th.text-start {
    padding: 0 6px;
  }
  td.text-start {
    padding: 4px 6px;
    vertical-align: top;

    // コメント
    &:nth-of-type(1) {
      min-width: 120px;
      max-width: 200px;
      vertical-align: middle;
    }
    // キャラクター
    &:nth-of-type(2) {
      min-width: 80px;
      max-width: 200px;
    }
    // 武器
    &:nth-of-type(3) {
      min-width: 80px;
      max-width: 200px;
    }
    // 聖遺物
    &:nth-of-type(4) {
      min-width: 100px;
      max-width: 200px;
    }
    &:nth-of-type(5) {
      min-width: 100px;
      max-width: 200px;
    }
    &:nth-of-type(6) {
      min-width: 100px;
      max-width: 200px;
    }
    &:nth-of-type(7) {
      min-width: 100px;
      max-width: 200px;
    }
    &:nth-of-type(8) {
      min-width: 100px;
      max-width: 200px;
    }
  }
}

.mb-data-table ::v-deep {
  td.v-data-table__mobile-row {
    padding: 4px 12px;

    // コメント
    &:nth-of-type(1) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 65%;
    }
    // キャラクター
    &:nth-of-type(2) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 65%;
    }
    // 武器
    &:nth-of-type(3) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 65%;
    }
    // 聖遺物
    &:nth-of-type(4) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 65%;
    }
    &:nth-of-type(5) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 65%;
    }
    &:nth-of-type(6) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 65%;
    }
    &:nth-of-type(7) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 65%;
    }
    &:nth-of-type(8) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 65%;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mdiDelete, mdiPlaylistPlus } from "@mdi/js";
import { IEquipData } from "~/src/interface";
import { ICharaData } from "~/src/character";
import { Team } from "~/src/team";

@Component({
  name: "PageEquipment",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    CharaDetail: () => import("~/components/equip/CharaDetail.vue"),
    WeaponDetail: () => import("~/components/equip/WeaponDetail.vue"),
    ArtifactDetail: () => import("~/components/equip/ArtifactDetail.vue"),
    DialogAppend: () => import("~/components/dialog/DialogAppend.vue"),
    DialogRemove: () => import("~/components/dialog/DialogRemove.vue"),
  },
})
export default class PageEquipment extends Vue {
  items: IEquipData[] = [];
  append = "";
  remove: IEquipData | null = null;

  readonly icons = {
    append: mdiPlaylistPlus,
    remove: mdiDelete,
  };

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get headers() {
    return [
      { text: this.$t("general.comment"), value: "comment" },
      { text: this.$t("menu.character"), value: "chara" },
      { text: this.$t("menu.weapon"), value: "weapon" },
      { text: this.$t("tab.flower"), value: "flower" },
      { text: this.$t("tab.feather"), value: "feather" },
      { text: this.$t("tab.sands"), value: "sands" },
      { text: this.$t("tab.goblet"), value: "goblet" },
      { text: this.$t("tab.circlet"), value: "circlet" },
      { text: "", value: "action", width: "50px" },
    ];
  }

  get names() {
    return this.$db.chara.map((chara) => ({
      text: this.$t("chara." + chara.name),
      value: chara.id,
    }));
  }

  get comment() {
    const chara = this.findChara(this.append);
    return chara?.comment || "";
  }

  get removeName() {
    const chara = this.findChara(this.remove?.chara);
    return chara?.name ? this.$t("chara." + chara.name) : "";
  }

  get storeAppend() {
    return this.$store.getters.append;
  }

  @Watch("storeAppend")
  onChangeAppend(value: any) {
    if (value === true) {
      this.$store.commit("append", "equip");
    }
  }

  created() {
    this.items = this.$db.equip;
    this.$store.commit("appendable", true);
    this.$store.commit("tabs", {});
  }

  onBeforeAppend() {
    this.$store.commit("append", "equip");
  }

  onAppend() {
    const data: IEquipData = {
      id: this.$makeUniqueId(),
      comment: "",
      chara: this.append,
      weapon: "",
      flower: "",
      feather: "",
      sands: "",
      goblet: "",
      circlet: "",
    };
    this.$appendData(this.items, data);
    this.append = "";
  }

  onBeforeRemove(data: IEquipData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.items, this.remove);
      this.remove = null;
    }
  }

  exists(id: string): boolean {
    return !!this.$db.team.find((team) => {
      for (const member of new Team(team).member) {
        if (member === id) return true;
      }
      return false;
    });
  }

  findChara(id?: string): ICharaData | undefined {
    if (id) {
      return this.$db.chara.find((chara) => chara.id === id);
    }
    return undefined;
  }
}
</script>
