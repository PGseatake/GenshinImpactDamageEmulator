<template>
  <v-container fluid>
    <template v-if="item">
      <damage-detail :data="item" :key="item.id" />
    </template>
    <v-row v-else justify="center">
      <v-col cols="auto">
        <v-btn fab small :ripple="false" @click="append = true">
          <v-icon>{{ icons.append }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { ElementType } from "~/src/const";
import { DBTeamTable, Team } from "~/src/team";
import { EnemyNames } from "~/src/enemy";
import { DBDamageTable, IDamageData } from "~/src/damage";
import { mdiClose, mdiPlaylistPlus } from "@mdi/js";

type TabItem = {
  key: string;
  index: number;
  text: (item: TabItem) => string;
  close: (item: TabItem) => void;
};
type DamageItem = {
  team: string;
  member: string;
};

@Component({
  name: "PageDamage",
  components: {
    DamageDetail: () => import("~/components/DamageDetail.vue"),
  },
})
export default class PageDamage extends Vue {
  db: DBTeamTable & DBDamageTable = this.$db;

  readonly icons = {
    append: mdiPlaylistPlus,
    remove: mdiClose,
  };

  @Watch("append")
  onChangeAppend(value: boolean) {
    if (value) {
      const index = this.db.damage.length;
      this.onAppend(this.verify({ team: "", member: "" })!);
      this.tab = index;
      this.$nextTick(() => (this.append = false));
    }
  }

  get item() {
    return this.db.damage[this.tab];
  }

  get tab() {
    return this.$store.getters.tab;
  }
  set tab(value: number) {
    this.$store.commit("tab", value);
  }

  get append() {
    return this.$store.state.append;
  }
  set append(value: boolean) {
    this.$store.commit("append", value);
  }

  created() {
    this.$store.commit("appendable", true);
    this.$store.commit("tabs", {});

    let { damage } = this.db;
    for (let index = 0; index < damage.length; ) {
      let data = damage[index];
      const change = this.verify(data);
      if (change) {
        if (change.team) {
          data.team = change.team;
          data.member = change.member;
          data.contact = "";
          data.reaction = "";

          index++;
        } else {
          damage.splice(index, 1);
        }
      } else {
        index++;
      }
    }

    this.updateTabs();
  }

  private verify(data: DamageItem): DamageItem | undefined {
    const team = data.team;
    if (team) {
      const t = this.db.team.find((val) => val.id === team);
      if (t) {
        let member = "";
        for (const m of new Team(t).member) {
          if (m === data.member) {
            // 変更なし
            return undefined;
          }
          member = member || m;
        }
        // メンバー交代
        return { team, member };
      }
    }

    for (const t of this.db.team) {
      for (const member of new Team(t).member) {
        // チーム交代
        return { team: t.id, member };
      }
    }
    // チームなし
    return { team: "", member: "" };
  }

  onAppend({ team, member }: DamageItem) {
    if (team) {
      const data: IDamageData = {
        id: this.$makeUniqueId(),
        team: team,
        member: member,
        contact: "",
        reaction: "",
        name: EnemyNames[0],
        elem: ElementType.Pyro,
        level: 1,
        fixed: 0,
      };
      this.$appendData(this.db.damage, data);
      this.updateTabs();
    }
  }

  onRemove(item: TabItem) {
    this.db.damage.splice(item.index, 1);
    this.updateTabs();
  }

  private updateTabs() {
    const i18n = this.$i18n;
    const text = (item: TabItem) =>
      `${i18n.t("general.data")}${item.index + 1}`;

    let items: TabItem[] = [];
    this.db.damage.forEach((item, index) =>
      items.push({
        key: item.id,
        index,
        text,
        close: this.onRemove,
      })
    );
    this.$store.commit("tabs", { tab: "damage", items });
  }
}
</script>
