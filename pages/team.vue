<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <v-data-table
      :headers="headers"
      :items="items"
      :class="tableClass"
      :page.sync="page.row"
      :items-per-page.sync="page.rows"
      :sort-by.sync="page.sortBy"
      :sort-desc.sync="page.sortDesc"
      :footer-props="footer"
      fixed-header
      disable-sort
    >
      <template #[`item.name`]="{ item }">
        <v-text-field
          v-model="item.name"
          single-line
          hide-details
          dense
          class="text-caption"
        />
      </template>
      <template #[`item.member1`]="{ item }">
        <equip-detail
          :value.sync="item.member1"
          :items="members"
          @change="onChangeItem(item)"
        />
      </template>
      <template #[`item.member2`]="{ item }">
        <equip-detail
          :value.sync="item.member2"
          :items="members"
          @change="onChangeItem(item)"
        />
      </template>
      <template #[`item.member3`]="{ item }">
        <equip-detail
          :value.sync="item.member3"
          :items="members"
          @change="onChangeItem(item)"
        />
      </template>
      <template #[`item.member4`]="{ item }">
        <equip-detail
          :value.sync="item.member4"
          :items="members"
          @change="onChangeItem(item)"
        />
      </template>
      <template #[`item.resonance`]="{ item }">
        <resonance :items="item.resonance" />
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
      :disabled="!append"
      type="team"
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
      :item="remove"
      :title="$t('tab.team') + $t('dialog.dismiss')"
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
    </dialog-remove>
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
import { Vue, Component, Watch } from "vue-property-decorator";
import { mdiDelete, mdiPlaylistPlus } from "@mdi/js";
import { Team, ITeamData } from "~/src/team";
import { SelectItem } from "~/components/SelectName.vue";
import Pagination from "~/src/pagination";

@Component({
  name: "PageTeam",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    Resonance: () => import("~/components/equip/Resonance.vue"),
    EquipDetail: () => import("~/components/equip/EquipDetail.vue"),
    DialogAppend: () => import("~/components/dialog/DialogAppend.vue"),
    DialogRemove: () => import("~/components/dialog/DialogRemove.vue"),
  },
})
export default class PageTeam extends Vue {
  page = new Pagination();
  items: ITeamData[] = [];
  append = "";
  remove: ITeamData | null = null;

  readonly icons = {
    append: mdiPlaylistPlus,
    remove: mdiDelete,
  };

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get footer() {
    return this.page.footer(this.$i18n);
  }

  get headers() {
    return [
      { text: this.$t("tab.team"), value: "name" },
      { text: this.$t("tab.member") + "1", value: "member1" },
      { text: this.$t("tab.member") + "2", value: "member2" },
      { text: this.$t("tab.member") + "3", value: "member3" },
      { text: this.$t("tab.member") + "4", value: "member4" },
      { text: this.$t("general.resonance"), value: "resonance" },
      { text: "", value: "action", width: "50px" },
    ];
  }

  get members() {
    let values: SelectItem[] = [];
    const { equip, chara } = this.$db;
    for (const e of equip) {
      const c = chara.find((val) => val.id === e.chara);
      if (c) {
        values.push({ id: e.id, name: c.name, comment: e.comment });
      }
    }
    return values;
  }

  get names() {
    return this.members.map((item) => ({
      text: this.$t("chara." + item.name),
      value: item.id,
    }));
  }

  get comment() {
    const item = this.members.find((item) => item.id === this.append);
    return item?.comment || "";
  }

  get removeName() {
    if (this.remove?.name) {
      return `${this.$t("menu.team")} "${this.remove.name}" `;
    } else {
      return this.$t("menu.team");
    }
  }

  get storeAppend() {
    return this.$store.getters.append;
  }

  @Watch("storeAppend")
  onChangeAppend(value: any) {
    if (value === true) {
      this.$store.commit("append", "team");
    }
  }

  created() {
    this.items = this.$db.team;
    this.$store.commit("appendable", true);
    this.$store.commit("tabs", {});
    this.page.load("team");
  }

  beforeDestroy() {
    this.page.save();
  }

  onChangeItem(item: ITeamData) {
    Team.resonance(item, this.$db);
  }

  onBeforeAppend() {
    this.$store.commit("append", "team");
  }

  onAppend() {
    const data = Team.create(this.$makeUniqueId(), this.append);
    this.$appendData(this.items, data);
    this.append = "";

    this.page.row = this.page.max(this.items.length);
  }

  onBeforeRemove(data: ITeamData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.items, this.remove);
      this.remove = null;
    }
  }
}
</script>
