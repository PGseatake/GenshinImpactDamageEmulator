<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" md="8" lg="9" class="px-2">
      <v-row no-gutters justify="center">
        <!-- 敵（大型の時には左に表示） -->
        <v-col v-if="large" cols="4">
          <enemy-table
            :damage="data.id"
            :reduct="status.reduct"
            :defence="defence"
            @change="onChangeEnemy"
          />
        </v-col>
        <!-- ダメージ -->
        <v-col cols="12" lg="8">
          <!-- メンバー選択 -->
          <select-member
            :damage="data.id"
            :contact.sync="data.contact"
            :reaction.sync="data.reaction"
            :reactions="reactions"
            @change="onChangeMember"
          />
          <v-row dense justify="center" class="ma-0">
            <v-col cols="12">
              <damage-table :data="data" :member="member" :status="status" />
            </v-col>
          </v-row>
        </v-col>
        <!-- ボーナス -->
        <v-col cols="12" class="pa-1">
          <bonus-table
            :items="bonus"
            :status="statues"
            @change="onChangeBonus"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="4" lg="3" class="px-2">
      <v-row dense justify="center" class="ma-0">
        <!-- 敵（小型の時は右に表示） -->
        <v-col v-if="!large" cols="12" sm="6" md="auto">
          <enemy-table
            :damage="data.id"
            :reduct="status.reduct"
            :defence="defence"
            @change="onChangeEnemy"
          />
        </v-col>
        <!-- ステータス -->
        <v-col cols="12" sm="6" md="auto">
          <status-table :param="status.param" :base="status.base" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { DBEquipTable } from "~/src/interface";
import { DBCharaTable } from "~/src/character";
import { DBWeaponTable } from "~/src/weapon";
import { DBArtifactTable } from "~/src/artifact";
import { DBTeamTable, ITeamData, IMember, Team } from "~/src/team";
import { DBBonusTable, BonusBase, BonusBuilder } from "~/src/bonus";
import { Status, IStatus, enumerateReaction } from "~/src/status";
import { IEnemyData } from "~/src/enemy";
import { Enemy, IDamageData } from "~/src/damage";
import { parseLevel } from "~/src/ascension";

@Component({
  name: "DamageDetail",
  components: {
    SelectMember: () => import("~/components/SelectMember.vue"),
    EnemyTable: () => import("~/components/EnemyTable.vue"),
    BonusTable: () => import("~/components/BonusTable.vue"),
    StatusTable: () => import("~/components/StatusTable.vue"),
    DamageTable: () => import("~/components/DamageTable.vue"),
  },
  inheritAttrs: false,
})
export default class DamageDetail extends Vue {
  @Prop({ required: true }) data!: IDamageData;

  db!: DBTeamTable &
    DBEquipTable &
    DBBonusTable &
    DBCharaTable &
    DBWeaponTable &
    DBArtifactTable;
  tab = 0;
  members: IMember[] = Array.from({ length: 4 }, () => ({
    info: null,
    chara: null,
    equip: null,
  }));
  params: IStatus[] = Array.from({ length: 4 }, () => Status.empty());
  statues: Status[] = [];
  bonuses: BonusBase[] = [];

  @Watch("data.contact")
  onChangeContact() {
    this.onChangeBonus();
  }

  get large() {
    return this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl;
  }

  get member() {
    return this.members[this.tab];
  }

  get status() {
    return this.params[this.tab];
  }

  get bonus() {
    const { chara } = this.member;
    return this.bonuses.filter((val) => val.isMine(chara));
  }

  get defence() {
    let enemy = new Enemy(this.data, this.status.reduct);
    return enemy.defence(parseLevel(this.member.chara?.level).level);
  }

  get reactions() {
    return [
      "",
      ...enumerateReaction(this.member.info, this.status.enchant.type),
    ];
  }

  created() {
    this.db = this.$db;
  }

  mounted() {
    const { team, member } = this.data;
    const t = this.db.team.find((val) => val.id === team);
    if (t) {
      this.changeTeam(t);

      for (let [i, m] of this.members.entries()) {
        if (m.equip?.id === member) {
          this.tab = i;
          this.onChangeBonus();
          break;
        }
      }
    }
  }

  private changeTeam(team: ITeamData) {
    let i = 0;
    for (let m of new Team(team).members(this.db)) {
      let member = this.members[i];
      member.info = m.info;
      member.chara = m.chara;
      member.equip = m.equip;
      ++i;
    }
    for (; i < 4; ++i) {
      let member = this.members[i];
      member.info = null;
      member.chara = null;
      member.equip = null;
    }

    let builder = new BonusBuilder(this.$i18n, this.db.bonus);
    let bonus = builder.build(team, this.db);
    this.bonuses.splice(0);
    this.bonuses.push(...bonus);
    this.db.bonus = { ...this.db.bonus, ...builder.output };
  }

  onChangeMember(team: ITeamData, member: IMember) {
    if (this.data.team != team.id) {
      this.data.team = team.id;
      this.changeTeam(team);
    }
    this.data.member = "";
    this.data.reaction = "";

    const equip = member.equip;
    if (equip) {
      this.data.member = equip.id;

      for (let [i, m] of this.members.entries()) {
        if (m.equip?.id === equip.id) {
          this.tab = i;
          this.onChangeBonus();
          break;
        }
      }
    }
  }

  onChangeBonus() {
    this.statues.splice(0);
    this.members.forEach((m, i) => {
      let s = new Status(this.params[i], this.data.contact);
      s.equip(m, this.db);
      if (m.equip) {
        this.statues.push(s);
      }
    });
    for (let step = 0; step <= 2; ++step) {
      for (let s of this.statues) {
        for (const bonus of this.bonuses) {
          bonus.apply(s, this.statues, step);
        }
      }
    }
  }

  onChangeEnemy(data: IEnemyData) {
    this.data.name = data.name;
    this.data.elem = data.elem;
    this.data.level = data.level;
    this.data.fixed = data.fixed;
  }
}
</script>
