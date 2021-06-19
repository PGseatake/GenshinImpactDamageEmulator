<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-data-table
      :headers="headers"
      :items="globals.equip"
      :class="myClass"
      fixed-header
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
        <v-chara-detail :value.sync="item.chara" :items="globals.chara" />
      </template>
      <!-- <template v-slot:[`item.weapon`]="{ item }"> </template>-->
      <template v-slot:[`item.flower`]="{ item }">
        <v-artifact-detail
          :value.sync="item.flower"
          :items="globals.flower"
          type="flower"
        />
      </template>
      <template v-slot:[`item.feather`]="{ item }">
        <v-artifact-detail
          :value.sync="item.feather"
          :items="globals.feather"
          type="feather"
        />
      </template>
      <template v-slot:[`item.sands`]="{ item }">
        <v-artifact-detail
          :value.sync="item.sands"
          :items="globals.sands"
          type="sands"
        />
      </template>
      <template v-slot:[`item.goblet`]="{ item }">
        <v-artifact-detail
          :value.sync="item.goblet"
          :items="globals.goblet"
          type="goblet"
        />
      </template>
      <template v-slot:[`item.circlet`]="{ item }">
        <v-artifact-detail
          :value.sync="item.circlet"
          :items="globals.circlet"
          type="circlet"
        />
      </template>
      <template v-slot:[`item.remove`]="{ item }">
        <v-btn fab x-small class="my-1" @click="onRemove(item)">
          <v-icon>{{ icons.remove }}</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-btn fab small @click="onBeforeAppend" class="ma-1">
      <v-icon>{{ icons.append }}</v-icon>
    </v-btn>

    <v-append-dialog
      :disabled="!append"
      title="menu.equipment"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <v-name-comment
        :items="names"
        :name.sync="append"
        :comment="comment"
        :commentable="false"
        :dense="false"
      />
    </v-append-dialog>
  </v-container>
</template>

<style lang="scss" scoped>
.v-input {
  padding: 0;
}

.pc-data-table ::v-deep {
  th.text-start {
    padding: 0 6px;
  }
  &:hover {
    background: inherit !important;
  }

  td.text-start {
    padding: 4px 6px;
    vertical-align: top;

    // コメント
    &:nth-of-type(1) {
      min-width: 100px;
      max-width: 150px;
      vertical-align: middle;
    }
    // その他
    &:nth-of-type(n + 2) {
      min-width: 100px;
      max-width: 150px;
    }
    // 削除
    &:nth-of-type(8) {
      min-width: 50px;
      max-width: 50px;
      vertical-align: middle;
    }
  }
}

.mb-data-table ::v-deep {
  td.v-data-table__mobile-row {
    padding: 4px 12px;

    // 名前
    &:nth-of-type(1) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 65%;
    }
    // その他
    &:nth-of-type(n + 1) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 65%;
      text-align: left;
    }
    // 削除
    &:nth-of-type(8) .v-data-table__mobile-row__cell {
      min-width: 50px;
      max-width: 50px;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { DataTableHeader } from "vuetify/types";
import { mdiDelete, mdiPlaylistPlus } from "@mdi/js";
import { GlobalCharaData, GlobalEquipData, IEquipData } from "~/src/interface";

@Component({
  name: "PageEquipment",
  components: {
    VCharaDetail: () => import("~/components/VCharaDetail.vue"),
    VAppendDialog: () => import("~/components/VAppendDialog.vue"),
  },
})
export default class PageEquipment extends Vue {
  globals: GlobalEquipData & GlobalCharaData = { equip: [], chara: [] };
  append = "";

  readonly icons: IReadonlyMap<string> = {
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
    // { text: this.$t("menu.weapon") as string, value: "weapon", sortable: false },
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
    },
  ];

  get names() {
    return this.globals.chara.map((chara) => ({
      text: this.$t("chara." + chara.name),
      value: chara.id,
    }));
  }

  get comment() {
    const chara = this.globals.chara.find((chara) => chara.id === this.append);
    return chara?.comment || "";
  }

  get myClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  created() {
    this.globals = this.$globals;
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

  onRemove(data: IEquipData) {
    this.$removeData(this.globals.equip, data);
  }
}
</script>
