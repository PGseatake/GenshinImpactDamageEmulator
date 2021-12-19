<template>
  <v-container fluid>
    <v-tabs v-model="tab" centered center-active show-arrows>
      <v-tab v-for="(item, index) of db.damage" :key="item.id">
        {{ `${$t("general.data")}${index + 1}` }}
        <v-btn icon tile x-small @click.stop="onRemove(index)">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </v-tab>
    </v-tabs>
    <damage-detail v-if="exists" :data="item" :key="item.id" />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { ElementType } from "~/src/const";
import { DBTeamTable, Team } from "~/src/team";
import { EnemyNames } from "~/src/enemy";
import { DBDamageTable, IDamageData } from "~/src/damage";
import { mdiClose } from "@mdi/js";

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
  tab = 0;

  readonly icon = mdiClose;

  @Watch("append")
  onChangeAppend(value: boolean) {
    if (value) {
      const index = this.db.damage.length;
      this.onAppend(this.verify({ team: "", member: "" })!);
      this.$nextTick(() => {
        this.append = false;
        this.tab = index;
      });
    }
  }

  get exists() {
    return !!this.db.damage.length;
  }

  get item() {
    return this.db.damage[this.tab];
  }

  get append() {
    return this.$store.state.append;
  }
  set append(value: boolean) {
    this.$store.commit("append", value);
  }

  created() {
    this.$store.commit("appendable", true);

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
    }
  }

  onRemove(index: number) {
    this.db.damage.splice(index, 1);
    const max = this.db.damage.length;
    if (this.tab >= max) {
      this.tab = max - 1;
    }
  }
}
</script>
