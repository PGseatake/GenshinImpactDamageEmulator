<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col cols="12" md="8" lg="9" class="px-2">
        <v-row no-gutters justify="center">
          <!-- 敵 -->
          <v-col v-if="large" cols="4">
            <enemy-table
              :reduct="status.reduct"
              :defence="defence"
              @change="onChangeEnemy"
            />
          </v-col>
          <!-- ダメージ -->
          <v-col cols="12" lg="8">
            <!-- メンバー選択 -->
            <select-member
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
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ElementType, ExtraBonusType } from "~/src/const";
import { DBEquipTable } from "~/src/interface";
import { DBCharaTable } from "~/src/character";
import { DBWeaponTable } from "~/src/weapon";
import { DBArtifactTable } from "~/src/artifact";
import { DBTeamTable, ITeamData, IMember, Members, Member } from "~/src/team";
import {
  DBBonusTable,
  BonusBase,
  BonusBuilder,
  Status,
  IStatus,
  StatusEnchant,
  enumerateReaction,
} from "~/src/bonus";
import { EnemyNames, IEnemyData } from "~/src/enemy";
import { Enemy, IDamageData } from "~/src/damage";

@Component({
  name: "PageDamage",
  components: {
    SelectMember: () => import("~/components/SelectMember.vue"),
    EnemyTable: () => import("~/components/EnemyTable.vue"),
    BonusTable: () => import("~/components/BonusTable.vue"),
    StatusTable: () => import("~/components/StatusTable.vue"),
    DamageTable: () => import("~/components/DamageTable.vue"),
  },
})
export default class PageDamage extends Vue {
  db!: DBTeamTable &
    DBEquipTable &
    DBCharaTable &
    DBWeaponTable &
    DBArtifactTable &
    DBBonusTable;
  member: IMember = {
    info: null,
    chara: null,
    equip: null,
  };
  data: IDamageData = {
    id: "",
    team: "",
    member: 0,
    name: EnemyNames[0],
    elem: ElementType.Pyro,
    level: 1,
    fixed: 0,
    contact: "",
    reaction: "",
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
    let data: { enchant: StatusEnchant } = {
      enchant: { type: "", dest: [], self: false },
    };
    let status = new Status(data as IStatus);
    for (const bonus of this.bonus) {
      if (bonus.extra === ExtraBonusType.Enchant) {
        bonus.apply(status);
      }
    }
    return ["", ...enumerateReaction(this.member.info, status.enchant.type)];
  }

  created() {
    this.db = this.$db;
    this.$store.commit("setAppendable", false);
  }

  mounted() {
    const { team } = this.db;
    if (team.length > 0) {
      let t = team[0];
      for (const key of Members) {
        const member = Member.find(t[key], this.db);
        if (member.chara) {
          this.onChangeMember(member, t);
          break;
        }
      }
    }
  }

  onChangeMember(member: IMember, team: ITeamData | null) {
    this.member.info = member.info;
    this.member.chara = member.chara;
    this.member.equip = member.equip;

    this.data.team = team?.id || "";
    this.data.member = 0; // TODO: 1~4
    this.data.contact = "";
    this.data.reaction = "";
    this.bonus.splice(0);

    const chara = member.chara;
    if (team && chara) {
      let builder = new BonusBuilder(this.$i18n, this.db.bonus);
      let bonus = builder.build(team, this.db);
      this.bonus.push(...bonus.filter((val) => val.isMine(chara)));
      this.db.bonus = { ...this.db.bonus, ...builder.output };
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
