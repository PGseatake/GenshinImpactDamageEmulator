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
          <bonus-table :items="bonus" @change="onChangeBonus" />
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
  params: IStatus[] = Array.from({ length: 4 }, () => ({
    talent: { combat: 0, skill: 0, burst: 0 },
    base: { hp: 0, atk: 0, def: 0 },
    param: {
      hp: 0,
      hp_buf: 0,
      atk: 0,
      atk_buf: 0,
      def: 0,
      def_buf: 0,
      elem: 0,
      en_rec: 0,
      heal_buf: 0,
      cri_dmg: 0,
      cri_rate: 0,
      any_dmg: 0,
      normal_cri: 0,
      heavy_cri: 0,
      skill_cri: 0,
      normal_dmg: 0,
      heavy_dmg: 0,
      plunge_dmg: 0,
      combat_dmg: 0,
      skill_dmg: 0,
      burst_dmg: 0,
      phys_dmg: 0,
      pyro_dmg: 0,
      hydro_dmg: 0,
      dendro_dmg: 0,
      elect_dmg: 0,
      anemo_dmg: 0,
      cryo_dmg: 0,
      geo_dmg: 0,
      elem_dmg: 0,
      burning_dmg: 0,
      vaporize_dmg: 0,
      melt_dmg: 0,
      swirl_dmg: 0,
      echarge_dmg: 0,
      shutter_dmg: 0,
      conduct_dmg: 0,
      overload_dmg: 0,
    },
    flat: {
      normal: 0,
      heavy: 0,
      plunge: 0,
      skill: 0,
      burst: 0,
    },
    reduct: {
      pyro: 0,
      hydro: 0,
      dendro: 0,
      elect: 0,
      anemo: 0,
      cryo: 0,
      geo: 0,
      phys: 0,
      defence: 0,
    },
    enchant: {
      type: "",
      dest: [],
      self: false,
    },
  }));
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
    if (chara) {
      return this.bonuses.filter((val) => val.isMine(chara));
    }
    return [];
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
    let status: Status[] = [];
    for (let [i, m] of this.members.entries()) {
      let s = new Status(this.params[i], this.data.contact);
      s.equip(m, this.db);
      if (m.equip) {
        for (const bonus of this.bonuses) {
          bonus.apply(s, status, 0);
        }
        status.push(s);
      }
    }
    for (let step = 1; step <= 2; ++step) {
      for (let s of status) {
        for (const bonus of this.bonuses) {
          bonus.apply(s, status, step);
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
