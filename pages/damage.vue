<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col cols="12" md="8" xl="9" class="px-2">
        <!-- ボーナス -->
        <v-row no-gutters align="end" justify="center">
          <!-- チーム選択 -->
          <v-col cols="auto" class="px-1">
            <v-select
              v-model="team"
              :items="teams"
              :label="$t('menu.team')"
              dense
              hide-details
              class="slim py-1"
              @change="onChangeTeam"
            />
          </v-col>
          <!-- キャラ選択 -->
          <v-col cols="auto" class="px-1">
            <name-comment
              :items="members"
              :name.sync="member"
              :comment="comment"
              :commentable="false"
              @change="onChangeMember"
            />
          </v-col>
          <!-- レベル設定 -->
          <v-col cols="auto" class="px-1">
            <div class="py-1" style="width: 60px">
              <ascension-level
                v-if="member.chara"
                v-model="member.chara.level"
                :label="$t('general.level')"
              />
            </div>
          </v-col>
        </v-row>
        <v-row dense justify="center" class="ma-0">
          <v-col cols="12" md="auto">
            <bonus-table :items="bonus" :check="true" @change="onChangeBonus" />
          </v-col>
        </v-row>
        <!-- ダメージ -->
        <v-row dense justify="center" class="ma-0">
          <v-col cols="12" md="auto">
            <v-row dense align="end" justify="end">
              <!-- 元素変化 -->
              <v-col cols="auto" class="px-1 pt-5 pb-3">
                <select-element
                  :type.sync="contact"
                  :types="contacts"
                  :label="$t('general.contact')"
                />
              </v-col>
              <!-- 元素反応 -->
              <v-col cols="auto" class="px-1 pt-5 pb-3">
                <v-select
                  v-model="reaction"
                  :items="reactions"
                  :label="$t('general.reaction')"
                  dense
                  hide-details
                  class="slim ma-0"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <damage-table
                v-bind="member"
                :enemy="enemy"
                :status="data"
                :contact="contact"
                :reaction="reaction"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="px-2">
        <!-- 敵 -->
        <v-row dense justify="center">
          <v-col cols="auto">
            <enemy-table
              :reduct="data.reduct"
              :defence="defence"
              @change="onChangeEnemy"
            />
          </v-col>
          <!-- ステータス -->
          <v-col cols="12" sm="auto">
            <status-table :param="data.param" :base="data.base" />
          </v-col>
        </v-row>
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

.slim ::v-deep .v-select__selection {
  width: 100%;
  max-width: 100%;
  margin: 0 !important;
}
.slim ::v-deep .v-select__selections input {
  width: 0;
}
.slim ::v-deep .v-input__append-inner {
  padding: 0;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { TextValue } from "~/src/types";
import {
  ElementType,
  ExtraBonusType,
  NoneElementType,
  NoneReactionType,
} from "~/src/const";
import { GlobalEquipData } from "~/src/interface";
import { GlobalCharaData } from "~/src/character";
import { GlobalWeaponData } from "~/src/weapon";
import { GlobalArtifactData } from "~/src/artifact";
import {
  GlobalTeamData,
  ITeamData,
  Member,
  Members,
  getMember,
  getTeamName,
} from "~/src/team";
import {
  GlobalBonusData,
  BonusBase,
  BonusBuilder,
  Status,
  IStatus,
  StatusEnchant,
  Reaction,
} from "~/src/bonus";
import { EnemyNames } from "~/src/enemy";
import { Enemy, EnemyData } from "~/components/EnemyTable.vue";

@Component({
  name: "PageDamage",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    AscensionLevel: () => import("~/components/AscensionLevel.vue"),
    SelectElement: () => import("~/components/SelectElement.vue"),
    EnemyTable: () => import("~/components/EnemyTable.vue"),
    BonusTable: () => import("~/components/BonusTable.vue"),
    StatusTable: () => import("~/components/StatusTable.vue"),
    DamageTable: () => import("~/components/DamageTable.vue"),
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
  member: Member = { info: null, chara: null, equip: null };
  bonus: BonusBase[] = [];
  enemy: EnemyData = {
    name: EnemyNames[0],
    elem: ElementType.Pyro,
    level: 1,
    fixed: 0,
  };
  data: IStatus = {
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
  contact: NoneElementType = "";
  reaction: NoneReactionType = "";

  status!: Status;

  readonly contacts = [
    "",
    ElementType.Pyro,
    ElementType.Hydro,
    ElementType.Elect,
    ElementType.Cryo,
  ];

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
    return this.member.chara?.comment || "-";
  }

  get defence() {
    let enemy = new Enemy(this.enemy, this.data.reduct);
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
    const list = Reaction.list(this.member.info, status.enchant.type);
    let items = [{ text: this.$t("reaction.none"), value: "" }];
    items.push(
      ...list.map((val) => ({ text: this.$t("reaction." + val), value: val }))
    );
    return items;
  }

  created() {
    this.globals = this.$globals;
    this.$store.commit("setAppendable", false);
    this.status = new Status(this.data);
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
      const { info, chara, equip } = members[0].value;
      this.member.info = info;
      this.member.chara = chara;
      this.member.equip = equip;
    } else {
      this.member.info = null;
      this.member.chara = null;
      this.member.equip = null;
    }
    this.onChangeMember();
  }

  onChangeMember() {
    this.bonus.splice(0);
    this.contact = "";
    this.reaction = "";

    const team = this.team;
    const chara = this.member.chara;
    if (team && chara) {
      let builder = new BonusBuilder(this, this.globals.bonus);
      let bonus = builder.build(team, this.globals);
      this.bonus.push(...bonus.filter((val) => val.isMine(chara)));
      this.globals.bonus = { ...this.globals.bonus, ...builder.output };
    }
    this.onChangeBonus();
  }

  onChangeBonus() {
    this.status.equip(this.member, this.globals);
    for (const bonus of this.bonus) {
      if (bonus.extra !== ExtraBonusType.Flat) {
        bonus.apply(this.status);
      }
    }
    // 固定割合ボーナスの適用は後回し
    for (const bonus of this.bonus) {
      if (bonus.extra === ExtraBonusType.Flat) {
        bonus.apply(this.status);
      }
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
