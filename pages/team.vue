<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-data-table
      :headers="headers"
      :items="globals.team"
      :class="tableClass"
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
        <v-equip-detail
          :value.sync="item.member1"
          :items="items"
          @change="onChangeItem(item)"
        />
      </template>
      <template v-slot:[`item.member2`]="{ item }">
        <v-equip-detail
          :value.sync="item.member2"
          :items="items"
          @change="onChangeItem(item)"
        />
      </template>
      <template v-slot:[`item.member3`]="{ item }">
        <v-equip-detail
          :value.sync="item.member3"
          :items="items"
          @change="onChangeItem(item)"
        />
      </template>
      <template v-slot:[`item.member4`]="{ item }">
        <v-equip-detail
          :value.sync="item.member4"
          :items="items"
          @change="onChangeItem(item)"
        />
      </template>
      <template v-slot:[`item.resonance`]="{ item }">
        <v-resonance :items="item.resonance" />
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
      :title="$t('menu.team') + $t('dialog.dismiss')"
      max-width="300px"
      @accept="onRemove"
      @cancel="remove = null"
    >
      <template #enable>
        <div v-text="removeName + $t('dialog.dismiss_text')" />
      </template>
      <template #disable>
        <div v-text="removeName + $t('dialog.dismiss_x_text')" />
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
      min-width: 50px;
      max-width: 70px;
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
import { GlobalEquipData } from "~/src/interface";
import { Members, ITeamData, GlobalTeamData, getMember } from "~/src/team";
import { ElementType } from "~/src/const";

@Component({
  name: "PageTeam",
  components: {
    VSelectName: () => import("~/components/VSelectName.vue"),
    VAppendDialog: () => import("~/components/VAppendDialog.vue"),
    VRemoveDialog: () => import("~/components/VRemoveDialog.vue"),
  },
})
export default class PageTeam extends Vue {
  globals!: GlobalCharaData & GlobalEquipData & GlobalTeamData;
  append = "";
  remove: ITeamData | null = null;

  readonly icons: IReadonlyDict<string> = {
    append: mdiPlaylistPlus,
    remove: mdiDelete,
  };

  readonly headers: ReadonlyArray<DataTableHeader> = [
    {
      text: this.$t("tab.team") as string,
      value: "name",
      sortable: false,
    },
    {
      text: this.$t("tab.member") + "1",
      value: "member1",
      sortable: false,
    },
    {
      text: this.$t("tab.member") + "2",
      value: "member2",
      sortable: false,
    },
    {
      text: this.$t("tab.member") + "3",
      value: "member3",
      sortable: false,
    },
    {
      text: this.$t("tab.member") + "4",
      value: "member4",
      sortable: false,
    },
    {
      text: this.$t("general.resonance") as string,
      value: "resonance",
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
    const { equip, chara } = this.globals;
    for (const e of equip) {
      const c = chara.find((val) => val.id === e.chara);
      if (c) {
        values.push({ id: e.id, name: c.name, comment: e.comment });
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

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get removeName() {
    if (this.remove?.name) {
      return `${this.$t("menu.team")} "${this.remove.name}" `;
    } else {
      return this.$t("menu.team");
    }
  }

  created() {
    this.globals = this.$globals;
    this.$store.commit("setAppendable", true);
  }

  onChangeItem(item: ITeamData) {
    this.updateResonance(item);
  }

  updateResonance(item: ITeamData) {
    let elements: ElementType[] = [];
    for (const key of Members) {
      const { info } = getMember(item[key], this.globals);
      if (info) {
        elements.push(info.element);
      }
    }
    elements.sort();
    item.resonance.splice(0);

    const count = elements.length;
    let first = 0;
    while (first < count) {
      let type = elements[first];
      let last = elements.lastIndexOf(type) + 1;
      // 元素共鳴追加
      if (2 <= last - first) {
        item.resonance.push(elements[first]);
      }
      first = last;
    }
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
      resonance: [],
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
}
</script>
