<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" md="8" lg="9" class="px-2">
      <v-row no-gutters justify="center">
        <!-- 敵 -->
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
        <v-col cols="auto" class="pa-1">
          <bonus-table :items="bonus" :check="true" @change="onChangeBonus" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="4" lg="3" class="px-2">
      <v-row dense justify="center" class="ma-0">
        <!-- 敵 -->
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
import { ExtraBonusType } from "~/src/const";
import { DBEquipTable } from "~/src/interface";
import { DBCharaTable, ICharaData } from "~/src/character";
import { DBWeaponTable } from "~/src/weapon";
import { DBArtifactTable } from "~/src/artifact";
import { DBTeamTable, ITeamData, IMember, Member } from "~/src/team";
import {
  DBBonusTable,
  BonusBase,
  BonusBuilder,
  Status,
  IStatus,
  StatusEnchant,
  enumerateReaction,
} from "~/src/bonus";
import { IEnemyData } from "~/src/enemy";
import { Enemy, IDamageData } from "~/src/damage";

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
  member: IMember = {
    info: null,
    chara: null,
    equip: null,
  };
  bonus: BonusBase[] = [];
  status: IStatus = {
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
      contact: 0,
    },
    enchant: {
      type: "",
      dest: [],
      self: false,
    },
  };

  get large() {
    return this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl;
  }

  get defence() {
    let enemy = new Enemy(this.data, this.status.reduct);
    return enemy.defence(
      parseInt(this.member.chara?.level?.replace("+", "") || "1")
    );
  }

  get reactions() {
    let part: { enchant: StatusEnchant } = {
      enchant: { type: "", dest: [], self: false },
    };
    let status = new Status(part as IStatus);
    for (const bonus of this.bonus) {
      if (bonus.extra === ExtraBonusType.Enchant) {
        bonus.apply(status);
      }
    }
    return ["", ...enumerateReaction(this.member.info, status.enchant.type)];
  }

  created() {
    this.db = this.$db;
  }

  mounted() {
    const { team, member } = this.data;
    const t = this.db.team.find((val) => val.id === team);
    if (t) {
      const m = Member.find(member, this.db);
      if (m.chara) {
        this.member.info = m.info;
        this.member.chara = m.chara;
        this.member.equip = m.equip;

        this.rebuildBonus(t, m.chara);
        this.onChangeBonus();
      }
    }
  }

  private rebuildBonus(team: ITeamData, chara: ICharaData) {
    let builder = new BonusBuilder(this.$i18n, this.db.bonus);
    let bonus = builder.build(team, this.db);
    this.bonus.push(...bonus.filter((val) => val.isMine(chara)));
    this.db.bonus = { ...this.db.bonus, ...builder.output };
  }

  onChangeMember(member: IMember, team: ITeamData | null) {
    this.member.info = member.info;
    this.member.chara = member.chara;
    this.member.equip = member.equip;
    this.data.team = team?.id || "";
    this.data.member = member.equip?.id || "";
    this.data.contact = "";
    this.data.reaction = "";
    this.bonus.splice(0);

    const chara = member.chara;
    if (team && chara) {
      this.rebuildBonus(team, chara);
    }
    this.onChangeBonus();
  }

  onChangeBonus() {
    let status = new Status(this.status);
    status.equip(new Member(this.member), this.db);
    for (const bonus of this.bonus) {
      if (bonus.extra !== ExtraBonusType.Flat) {
        bonus.apply(status);
      }
    }
    // 固定割合ボーナスの適用は後回し
    for (const bonus of this.bonus) {
      if (bonus.extra === ExtraBonusType.Flat) {
        bonus.apply(status);
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
