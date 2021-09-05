<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-data-table
      :headers="headers"
      :items="globals.equip"
      :class="tableClass"
      :items-per-page="1000"
      fixed-header
      disable-sort
      hide-default-footer
    >
      <template v-slot:[`item.comment`]="{ item }">
        <v-text-field
          v-model="item.comment"
          single-line
          hide-details
          dense
          class="text-caption"
        />
      </template>
      <template v-slot:[`item.chara`]="{ item }">
        <chara-detail :value.sync="item.chara" />
      </template>
      <template v-slot:[`item.weapon`]="{ item }">
        <weapon-detail :chara="item.chara" :value.sync="item.weapon" />
      </template>
      <template v-slot:[`item.flower`]="{ item }">
        <artifact-detail
          :value.sync="item.flower"
          :items="globals.flower"
          type="flower"
        />
      </template>
      <template v-slot:[`item.feather`]="{ item }">
        <artifact-detail
          :value.sync="item.feather"
          :items="globals.feather"
          type="feather"
        />
      </template>
      <template v-slot:[`item.sands`]="{ item }">
        <artifact-detail
          :value.sync="item.sands"
          :items="globals.sands"
          type="sands"
        />
      </template>
      <template v-slot:[`item.goblet`]="{ item }">
        <artifact-detail
          :value.sync="item.goblet"
          :items="globals.goblet"
          type="goblet"
        />
      </template>
      <template v-slot:[`item.circlet`]="{ item }">
        <artifact-detail
          :value.sync="item.circlet"
          :items="globals.circlet"
          type="circlet"
        />
      </template>
      <template v-slot:[`item.remove`]="{ item }">
        <v-btn fab x-small class="my-1" @click="onBeforeRemove(item)">
          <v-icon>{{ icons.remove }}</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <dialog-append
      :disabled="!append"
      title="menu.equipment"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <name-comment
        :items="names"
        :name.sync="append"
        :comment="comment"
        :commentable="false"
        :dense="false"
      />
    </dialog-append>
    <dialog-remove
      :title="$t('menu.equipment') + $t('dialog.remove')"
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
import { Vue, Component } from "vue-property-decorator";
import { DataTableHeader } from "vuetify/types";
import { mdiDelete, mdiPlaylistPlus } from "@mdi/js";
import { GlobalEquipData, IEquipData } from "~/src/interface";
import { ICharaData, GlobalCharaData } from "~/src/character";
import { Members } from "~/src/team";

@Component({
  name: "PageEquipment",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    CharaDetail: () => import("~/components/CharaDetail.vue"),
    WeaponDetail: () => import("~/components/WeaponDetail.vue"),
    ArtifactDetail: () => import("~/components/ArtifactDetail.vue"),
    DialogAppend: () => import("~/components/DialogAppend.vue"),
    DialogRemove: () => import("~/components/DialogRemove.vue"),
  },
})
export default class PageEquipment extends Vue {
  globals: GlobalEquipData & GlobalCharaData = { equip: [], chara: [] };
  append = "";
  remove: IEquipData | null = null;

  readonly icons: IReadonlyDict<string> = {
    append: mdiPlaylistPlus,
    remove: mdiDelete,
  };

  readonly headers: ReadonlyArray<DataTableHeader> = [
    {
      text: this.$t("general.comment") as string,
      value: "comment",
      sortable: false,
    },
    {
      text: this.$t("menu.character") as string,
      value: "chara",
      sortable: false,
    },
    {
      text: this.$t("menu.weapon") as string,
      value: "weapon",
      sortable: false,
    },
    {
      text: this.$t("tab.flower") as string,
      value: "flower",
      sortable: false,
    },
    {
      text: this.$t("tab.feather") as string,
      value: "feather",
      sortable: false,
    },
    {
      text: this.$t("tab.sands") as string,
      value: "sands",
      align: "start",
      sortable: false,
    },
    {
      text: this.$t("tab.goblet") as string,
      value: "goblet",
      sortable: false,
    },
    {
      text: this.$t("tab.circlet") as string,
      value: "circlet",
      sortable: false,
    },
    {
      text: this.$t("dialog.remove") as string,
      value: "remove",
      width: "50px",
      sortable: false,
    },
  ];

  get names() {
    return this.globals.chara.map((chara) => ({
      text: this.$t("chara." + chara.name),
      value: chara.id,
    }));
  }

  get comment() {
    const chara = this.findChara(this.append);
    return chara?.comment || "";
  }

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get removeName() {
    const chara = this.findChara(this.remove?.chara);
    return chara?.name ? this.$t(`chara.${chara.name}`) : "";
  }

  created() {
    this.globals = this.$globals;
    this.$store.commit("setAppendable", true);
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
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
    this.$appendData(this.globals.equip, data);
    this.append = "";
  }

  onBeforeRemove(data: IEquipData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.globals.equip, this.remove);
      this.remove = null;
    }
  }

  exists(id: string): boolean {
    return !!this.$globals.team.find((team) => {
      for (const key of Members) {
        if (team[key] === id) return true;
      }
      return false;
    });
  }

  findChara(id: string | undefined): ICharaData | undefined {
    if (id) {
      return this.globals.chara.find((chara) => chara.id === id);
    }
    return undefined;
  }
}
</script>
