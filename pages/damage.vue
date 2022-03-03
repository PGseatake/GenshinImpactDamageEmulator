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
import { Team, TeamMember } from "~/src/team";
import { EnemyNames } from "~/src/enemy";
import { IDamageData } from "~/src/damage";
import { mdiClose, mdiPlaylistPlus } from "@mdi/js";
import DamageDetail from "~/components/damage/DamageDetail.vue";

type TabItem = {
  key: string;
  index: number;
  text: (item: TabItem) => string;
  close: (item: TabItem) => void;
};

@Component({
  name: "PageDamage",
  components: { DamageDetail },
})
export default class PageDamage extends Vue {
  readonly icons = {
    append: mdiPlaylistPlus,
    remove: mdiClose,
  };

  @Watch("append")
  onChangeAppend(value: boolean) {
    if (value) {
      const index = this.$db.damage.length;
      let data = Team.delegate(this.$db.team);
      if (data) {
        this.onAppend(data);
        this.tab = index;
        this.$nextTick(() => (this.append = false));
      }
    }
  }

  get item() {
    return this.$db.damage[this.tab];
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

    let { damage } = this.$db;
    for (let index = 0; index < damage.length; ) {
      let data = damage[index];
      const change = Team.delegate(this.$db.team, data);
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

  onAppend({ team, member }: TeamMember) {
    if (team) {
      let items = this.$db.damage;
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
      this.$appendData(items, data);
      this.updateTabs();
    }
  }

  private updateTabs(select?: string, remove?: TabItem) {
    let items = this.$db.damage;
    const i18n = this.$i18n;
    const text = (item: TabItem) =>
      `${i18n.t("general.data")}${item.index + 1}`;
    const close = (item: TabItem) => {
      const id = items[this.tab].id;
      items.splice(item.index, 1);
      this.updateTabs(id, item);
    };

    // タブの更新
    this.$store.commit("tabs", {
      tab: "damage",
      items: items.map((item, index) => ({
        key: item.id,
        index,
        text,
        close,
      })),
    });
    if (!remove) return;

    // タブインデックスの調整
    let tab = 0;
    const max = items.length;
    if (max) {
      if (select === remove.key) {
        switch (remove.index) {
          case 0: // 丸め込みで先頭のタブ
          case max: // 末尾のタブ
            tab = remove.index - 1;
            break;
          default:
            // タブはそのまま
            return;
        }
      } else {
        // 選択済みの同じタブ
        tab = items.findIndex((val) => val.id === select);
      }
    } else {
      // タブ初期化
      tab = -1;
    }
    this.tab = tab; // TODO: 1回だけではうまくいかない
    this.$nextTick(() => (this.tab = tab));
  }
}
</script>
