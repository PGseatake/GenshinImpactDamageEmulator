<template>
  <v-container :fluid="$vuetify.breakpoint.md || $vuetify.breakpoint.sm">
    <select-enemy />
    <v-row dense align="center" style="max-width: 500px">
      <v-col>
        <v-select
          v-model="team"
          :items="teams"
          :label="$t('menu.team')"
          dense
          hide-details
          @change="onChangeTeam"
        />
      </v-col>
      <v-col>
        <name-comment
          :items="members"
          :name.sync="member"
          :comment="comment"
          :commentable="false"
          @change="onChangeMember"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <!-- 敵 -->
        <v-tabs v-model="tab" centered center-active show-arrows>
          <!-- <v-tab v-for="(items, key) in teams" :key="key">{{ key }}</v-tab> -->
        </v-tabs>
      </v-col>
    </v-row>
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
  }
}

.mb-data-table ::v-deep {
  td.v-data-table__mobile-row {
    padding: 4px 12px;
  }
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TextValue } from "~/src/types";
import { GlobalCharaData } from "~/src/character";
import { GlobalEquipData } from "~/src/interface";
import { GlobalTeamData, Member, Members } from "~/src/team";
import { getMember, getTeamName } from "~/src/team";

@Component({
  name: "PageDamage",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    SelectEnemy: () => import("~/components/SelectEnemy.vue"),
  },
})
export default class PageDamage extends Vue {
  globals!: GlobalCharaData & GlobalEquipData & GlobalTeamData;
  team = "";
  member: Required<Member> | null = null;
  tab = 0;

  get teams() {
    const text = this.$t("menu.team");
    const { team } = this.globals;
    let items: { text: string; value: string }[] = [];
    team.forEach((t, i) =>
      items.push({ text: getTeamName(text, t, i), value: t.id })
    );
    return items;
  }

  get members() {
    let items: TextValue[] = [];
    if (this.team) {
      const { team } = this.globals;
      const t = team.find((val) => val.id === this.team);
      if (t) {
        for (const key of Members) {
          const { info, chara, equip } = getMember(t[key], this.globals);
          if (info && chara && equip) {
            items.push({
              text: this.$t("chara." + chara.name) as string,
              value: { info, chara, equip },
            });
          }
        }
      }
    }
    return items;
  }

  get comment() {
    return this.member?.chara?.comment || "-";
  }

  created() {
    this.globals = this.$globals;
    this.$store.commit("setAppendable", false);
  }

  mounted() {
    const teams = this.teams;
    if (teams.length > 0) {
      this.team = teams[0].value;
      this.onChangeTeam();
    } else {
      this.team = "";
    }
  }

  onChangeTeam() {
    const members = this.members;
    if (members.length > 0) {
      this.member = members[0].value;
      this.onChangeMember();
    } else {
      this.member = null;
    }
  }

  onChangeMember() {
    console.log(this.member);
  }
}
</script>
