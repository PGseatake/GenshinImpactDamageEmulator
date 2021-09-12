<template>
  <v-container fluid>
    <v-row no-gutters>
      <!-- 敵 -->
      <v-col cols="12" md="4" xl="3">
        <select-enemy :defence="defence" @update="onChangeEnemy" />
      </v-col>
      <!-- ボーナス -->
      <v-col cols="12" md="8" xl="9">
        <v-container fluid class="pa-0 pb-2">
          <v-row dense align="end">
            <!-- チーム選択 -->
            <v-col cols="auto">
              <v-select
                v-model="team"
                :items="teams"
                :label="$t('menu.team')"
                dense
                hide-details
                class="py-1"
                @change="onChangeTeam"
              />
            </v-col>
            <!-- キャラ選択 -->
            <v-col cols="auto" class="pt-0">
              <name-comment
                :items="members"
                :name.sync="member"
                :comment="comment"
                :commentable="false"
                @change="onChangeMember"
              />
            </v-col>
            <!-- レベル設定 -->
            <v-col cols="auto">
              <div class="py-1" style="width: 60px">
                <ascension-level
                  v-if="member"
                  v-model="member.chara.level"
                  :label="$t('general.level')"
                />
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <bonus-table :items="bonus" :check="true" />
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
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
import { ElementType } from "~/src/const";
import { EnemyNames } from "~/src/enemy";
import { GlobalEquipData } from "~/src/interface";
import { GlobalCharaData } from "~/src/character";
import { GlobalWeaponData } from "~/src/weapon";
import { GlobalArtifactData } from "~/src/artifact";
import { GlobalBonusData, BonusBase, BonusBuilder } from "~/src/bonus";
import { GlobalTeamData, ITeamData, Member, Members } from "~/src/team";
import { getMember, getTeamName } from "~/src/team";
import { EnemyData } from "~/components/SelectEnemy.vue";

@Component({
  name: "PageDamage",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    SelectEnemy: () => import("~/components/SelectEnemy.vue"),
    BonusTable: () => import("~/components/BonusTable.vue"),
  },
})
export default class PageDamage extends Vue {
  globals!: GlobalTeamData &
    GlobalEquipData &
    GlobalCharaData &
    GlobalWeaponData &
    GlobalArtifactData &
    GlobalBonusData;
  team: ITeamData | null = null;
  member: Required<Member> | null = null;
  bonus: BonusBase[] = [];
  tab = 0;
  enemy: EnemyData = {
    name: EnemyNames[0],
    elem: ElementType.Pyro,
    level: 1,
    fixed: 0,
  };

  get teams() {
    const text = this.$t("menu.team");
    const { team } = this.globals;
    let items: { text: string; value: ITeamData }[] = [];
    team.forEach((t, i) =>
      items.push({ text: getTeamName(text, t, i), value: t })
    );
    return items;
  }

  get members() {
    let items: TextValue[] = [];
    if (this.team) {
      const team = this.team;
      if (team) {
        for (const key of Members) {
          const { info, chara, equip } = getMember(team[key], this.globals);
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

  get defence() {
    const enemy = this.enemy.level + 100;
    const chara = this.charaLevel + 100;
    return chara / (enemy + chara);
  }

  get charaLevel() {
    const level = this.member?.chara.level;
    return parseInt(level?.replace("+", "") || "1");
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
    }
  }

  onChangeTeam() {
    const members = this.members;
    if (members.length > 0) {
      this.member = members[0].value;
      this.onChangeMember();
    } else {
      this.member = null;
      this.bonus.splice(0);
    }
  }

  onChangeMember() {
    this.bonus.splice(0);
    const team = this.team;
    const chara = this.member?.chara;
    if (team && chara) {
      let builder = new BonusBuilder(this, this.globals.bonus);
      let bonus = builder.build(team, this.globals);
      this.bonus.push(...bonus.filter((val) => val.isMine(chara)));
      this.globals.bonus = { ...this.globals.bonus, ...builder.output };
    }
  }

  onChangeEnemy(data: EnemyData) {
    this.enemy.name = data.name;
    this.enemy.elem = data.elem;
    this.enemy.level = data.level;
    this.enemy.fixed = data.fixed;
  }
}
</script>
