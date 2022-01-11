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
import VueI18n from "vue-i18n/types";
import { Store } from "vuex/types";
import { ElementType } from "~/src/const";
import { DBTeamTable, Team } from "~/src/team";
import { EnemyNames } from "~/src/enemy";
import { DBDamageTable, IDamageData } from "~/src/damage";
import { mdiClose, mdiPlaylistPlus } from "@mdi/js";
import DamageDetail from "~/components/damage/DamageDetail.vue";

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

class TabBuilder {
  private i18n: VueI18n;
  private store: Store<any>;
  private items: IDamageData[];

  constructor(app: Vue) {
    this.i18n = app.$i18n;
    this.store = app.$store;
    this.items = app.$db.damage;
  }

  update() {
    const i18n = this.i18n;
    const text = (item: TabItem) =>
      `${i18n.t("general.data")}${item.index + 1}`;

    let items: TabItem[] = [];
    this.items.forEach((item, index) =>
      items.push({
        key: item.id,
        index,
        text,
        close: (item: TabItem) => {
          this.items.splice(item.index, 1);
          this.update();
        },
      })
    );
    this.store.commit("tabs", { tab: "damage", items });
  }
}

@Component({
  name: "PageDamage",
  components: { DamageDetail },
})
export default class PageDamage extends Vue {
  db: DBTeamTable & DBDamageTable = this.$db;
  tabs!: TabBuilder;

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

    this.tabs = new TabBuilder(this);
    this.tabs.update();
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
      this.tabs.update();
    }
  }
}
</script>
