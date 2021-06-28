<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-data-table
      :headers="headers"
      :items="globals.team"
      :class="myClass"
      :items-per-page="1000"
      fixed-header
      hide-default-footer
    >
      <template v-slot:[`item.name`]="{ item }">
        <v-text-field
          v-model="item.name"
          single-line
          hide-details
          dense
          class="text-caption"
        />
      </template>
      <template v-slot:[`item.member1`]="{ item }">
        <v-equip-detail :value.sync="item.member1" :items="items" />
      </template>
      <template v-slot:[`item.member2`]="{ item }">
        <v-equip-detail :value.sync="item.member2" :items="items" />
      </template>
      <template v-slot:[`item.member3`]="{ item }">
        <v-equip-detail :value.sync="item.member3" :items="items" />
      </template>
      <template v-slot:[`item.member4`]="{ item }">
        <v-equip-detail :value.sync="item.member4" :items="items" />
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

    <v-append-dialog
      :disabled="!append"
      title="menu.team"
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
    <v-remove-dialog
      :item="remove"
      :name="removeName"
      :title="$t('menu.team') + $t('dialog.dismiss')"
      max-width="300px"
      @accept="onRemove"
      @cancel="remove = null"
    >
      <template #enable>
        <span v-html="removeText" />
      </template>
    </v-remove-dialog>
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

    // 名前
    &:nth-of-type(1) {
      min-width: 150px;
      max-width: 250px;
      vertical-align: middle;
    }
    // メンバー
    &:nth-of-type(2) {
      min-width: 100px;
      max-width: 200px;
    }
    &:nth-of-type(3) {
      min-width: 100px;
      max-width: 200px;
    }
    &:nth-of-type(4) {
      min-width: 100px;
      max-width: 200px;
    }
    &:nth-of-type(5) {
      min-width: 100px;
      max-width: 200px;
    }
    // 元素共鳴
    &:nth-of-type(6) {
      min-width: 60px;
      max-width: 200px;
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
    // メンバー
    &:nth-of-type(2) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 70%;
    }
    &:nth-of-type(3) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 70%;
    }
    &:nth-of-type(4) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 70%;
    }
    &:nth-of-type(5) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 70%;
    }
    // 元素共鳴
    &:nth-of-type(6) .v-data-table__mobile-row__cell {
      min-width: 150px;
      max-width: 70%;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { NameComment } from "~/components/VSelectName.vue";
import { DataTableHeader } from "vuetify/types";
import { mdiDelete, mdiPlaylistPlus } from "@mdi/js";
import { GlobalCharaData } from "~/src/character";
import { GlobalEquipData, GlobalTeamData, ITeamData } from "~/src/interface";

@Component({
  name: "PageTeam",
  components: {
    VSelectName: () => import("~/components/VSelectName.vue"),
    VAppendDialog: () => import("~/components/VAppendDialog.vue"),
    VRemoveDialog: () => import("~/components/VRemoveDialog.vue"),
  },
})
export default class PageTeam extends Vue {
  globals: GlobalCharaData & GlobalEquipData & GlobalTeamData = {
    chara: [],
    equip: [],
    team: [],
  };
  append = "";
  remove: ITeamData | null = null;

  readonly icons: IReadonlyMap<string> = {
    append: mdiPlaylistPlus,
    remove: mdiDelete,
  };

  readonly headers: ReadonlyArray<DataTableHeader> = [
    {
      text: this.$t("general.team") as string,
      value: "name",
      sortable: false,
    },
    {
      text: this.$t("general.member") + "1",
      value: "member1",
      sortable: false,
    },
    {
      text: this.$t("general.member") + "2",
      value: "member2",
      sortable: false,
    },
    {
      text: this.$t("general.member") + "3",
      value: "member3",
      sortable: false,
    },
    {
      text: this.$t("general.member") + "4",
      value: "member4",
      sortable: false,
    },
    {
      text: this.$t("dialog.remove") as string,
      value: "remove",
      width: "50px",
      sortable: false,
    },
  ];

  get items() {
    let values: NameComment[] = [];
    for (const equip of this.globals.equip) {
      const chara = this.globals.chara.find(
        (chara) => chara.id === equip.chara
      );
      if (chara) {
        values.push({ id: equip.id, name: chara.name, comment: equip.comment });
      }
    }
    return values;
  }

  get names() {
    return this.items.map((item) => ({
      text: this.$t("chara." + item.name),
      value: item.id,
    }));
  }

  get comment() {
    const item = this.items.find((item) => item.id === this.append);
    return item?.comment || "";
  }

  get myClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get removeName() {
    return this.remove?.name || "";
  }

  created() {
    this.globals = this.$globals;
  }

  onBeforeAppend() {
    this.$store.commit("setAppend", true);
  }

  onAppend() {
    const data: ITeamData = {
      id: this.$makeUniqueId(),
      name: "",
      member1: this.append,
      member2: "",
      member3: "",
      member4: "",
    };
    this.$appendData(this.globals.team, data);
    this.append = "";
  }

  onBeforeRemove(data: ITeamData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.globals.team, this.remove);
      this.remove = null;
    }
  }

  get removeText() {
    if (this.remove?.name) {
      return `チーム「${this.remove.name}」を解散します。<br>よろしいですか？`;
    } else {
      return `チームを解散します。<br>よろしいですか？`;
    }
  }
}
</script>
