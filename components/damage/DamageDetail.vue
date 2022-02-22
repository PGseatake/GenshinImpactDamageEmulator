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
            :contact.sync="contact"
            :reaction.sync="reaction"
            :reactions="reactions"
            @change="onChangeMember"
          />
          <v-row dense justify="center" class="ma-0">
            <v-col cols="12">
              <damage-table
                :data="data"
                :member="member"
                :status="status"
                :bonus="extra"
              />
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
import { Vue, Component, Prop } from "vue-property-decorator";
import { AnyContactType, AnyReactionType } from "~/src/const";
import { Team, ITeamData, IMember as IMemberBase } from "~/src/team";
import { BonusBase, BonusBuilder } from "~/src/bonus";
import Status, { IStatus } from "~/src/status";
import Enemy, { IEnemyData } from "~/src/enemy";
import Reaction from "~/src/reaction";
import { IDamageData } from "~/src/damage";
import { parseLevel } from "~/src/ascension";
import { Arrayable } from "~/src/utility";

interface IMember extends IMemberBase {
  index: number;
}

@Component({
  name: "DamageDetail",
  components: {
    EnemyTable: () => import("~/components/damage/EnemyTable.vue"),
    BonusTable: () => import("~/components/damage/BonusTable.vue"),
    StatusTable: () => import("~/components/damage/StatusTable.vue"),
    DamageTable: () => import("~/components/damage/DamageTable.vue"),
    SelectMember: () => import("~/components/damage/SelectMember.vue"),
  },
  inheritAttrs: false,
})
export default class DamageDetail extends Vue {
  @Prop({ required: true }) data!: IDamageData;

  index = 0;
  members: IMember[] = Arrayable.make(4, (_, i) => ({
    info: null,
    chara: null,
    equip: null,
    index: i,
  }));
  params: IStatus[] = Arrayable.make(4, () => Status.empty());
  statues: Status[] = [];
  bonuses: BonusBase[] = [];

  get large() {
    return this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl;
  }

  get member() {
    return this.members[this.index];
  }

  get status() {
    return this.params[this.index];
  }

  get bonus() {
    const { chara } = this.member;
    return this.bonuses.filter((val) => val.isMine(chara));
  }

  get extra() {
    const { chara } = this.member;
    return this.bonuses.filter((val) => val.isExtra(chara));
  }

  get defence() {
    let enemy = new Enemy(this.data, this.status.reduct);
    return enemy.defence(parseLevel(this.member.chara?.level).level);
  }

  get contact() {
    return this.data.contact;
  }
  set contact(value: AnyContactType) {
    this.data.contact = value;
    this.onChangeBonus();
  }

  get reaction() {
    return this.data.reaction;
  }
  set reaction(value: AnyReactionType) {
    this.data.reaction = value;
  }

  get reactions() {
    return [
      "",
      ...Reaction.enumerate(this.member.info, this.status.enchant.type),
    ];
  }

  mounted() {
    const { team, member } = this.data;
    const t = this.$db.team.find((val) => val.id === team);
    if (t) {
      this.changeTeam(t);

      for (let [i, m] of this.members.entries()) {
        if (m.equip?.id === member) {
          this.index = i;
          this.onChangeBonus();
          break;
        }
      }
    }
  }

  private changeTeam(team: ITeamData) {
    let i = 0;
    for (let m of new Team(team).members(this.$db)) {
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

    let builder = new BonusBuilder(this.$i18n, this.$db.bonus);
    this.bonuses.splice(0);
    this.bonuses.push(...builder.build(team, this.$db));
    this.$db.bonus = { ...this.$db.bonus, ...builder.output };
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

      for (let m of this.members) {
        if (m.equip?.id === equip.id) {
          this.index = m.index;
          this.onChangeBonus();
          break;
        }
      }
    }
  }

  onChangeBonus() {
    this.statues.splice(0);
    for (let m of this.members) {
      let s = new Status(this.params[m.index]);
      s.equip(m, this.$db);
      if (m.equip) {
        this.statues.push(s);
      }
    }

    const party = this.statues;
    const contact = this.contact;
    for (let step = 0; step <= 2; ++step) {
      for (let target of this.statues) {
        for (const bonus of this.bonuses) {
          bonus.apply({ step, target, party, contact });
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
