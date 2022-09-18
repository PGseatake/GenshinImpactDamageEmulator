<template>
  <v-row no-gutters align="end" justify="center">
    <!-- チーム選択 -->
    <v-col cols="auto" class="px-1">
      <v-select
        v-model="team"
        :items="teams"
        :label="$t('menu.team')"
        :menu-props="{ auto: true, transition: false }"
        dense
        hide-details
        class="py-1"
        @change="onChangeTeam"
      />
    </v-col>
    <!-- キャラ選択 -->
    <v-col cols="auto" class="px-1">
      <name-comment
        :items="members"
        :value.sync="member"
        :comment="comment"
        :full="false"
        @change="onChangeMember"
      />
    </v-col>
    <!-- レベル設定 -->
    <v-col v-if="refLevel" cols="auto" class="px-1">
      <div class="py-1" style="width: 60px">
        <ascension-level v-model="refLevel" :label="$t('general.level')" />
      </div>
    </v-col>
    <!-- 元素変化 -->
    <v-col cols="auto" class="pa-1">
      <select-element
        :value="$attrs.contact"
        @input="$listeners['update:contact']"
        :items="contacts"
        :label="$t('damage.contact')"
      />
    </v-col>
    <!-- 元素反応 -->
    <v-col cols="auto" class="pa-1">
      <v-select
        :value="$attrs.reaction"
        @input="$listeners['update:reaction']"
        :items="refReactions"
        :label="$t('damage.reaction')"
        :menu-props="{ auto: true, transition: false }"
        dense
        hide-details
        class="mt-4"
      />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
::v-deep .v-select__selection {
  width: 100%;
  max-width: 100%;
  margin: 0 !important;
}
::v-deep .v-select__selections input {
  width: 0;
}
.v-input ::v-deep .v-input__append-inner {
  padding: 0;
}
</style>

<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import { ContactTypes, AnyReactionType } from "~/src/const";
import { ITeamData, IMember, Team } from "~/src/team";
import Chara from "~/src/character";

@Component({
  name: "SelectMember",
  components: {
    NameComment: () => import("~/components/input/NameComment.vue"),
    AscensionLevel: () => import("~/components/input/AscensionLevel.vue"),
    SelectElement: () => import("~/components/damage/SelectElement.vue"),
  },
  inheritAttrs: false,
})
export default class SelectMember extends Vue {
  @Prop({ required: true }) damage!: string;
  // @Prop({ required: true }) contact!: AnyElementType;
  // @Prop({ required: true }) reaction!: AnyReactionType;
  @Prop({ required: true }) reactions!: ReadonlyArray<AnyReactionType>;

  team: ITeamData | null = null;
  member: IMember | null = null;

  readonly contacts = ["", ...ContactTypes];

  @Emit("change")
  onChange(team: ITeamData, member: IMember) {}

  get refLevel() {
    return this.member?.chara.level || null;
  }
  set refLevel(value: string | null) {
    if (this.member?.chara && value) {
      this.member.chara.level = value;
      Chara.level(this.member.chara);
      this.onChangeMember();
    }
  }

  get refReactions() {
    return this.reactions.map((val) => ({
      text: this.$t("reaction." + (val || "none")),
      value: val,
    }));
  }

  get teams() {
    const i18n = this.$i18n;
    return this.$db.team.map((t, i) => ({
      text: Team.format(t, i, i18n),
      value: t,
    }));
  }

  get members() {
    let items: { id: string; text: string; value: IMember }[] = [];
    const team = this.team;
    if (team) {
      for (const member of new Team(team).members(this.$db)) {
        items.push({
          id: member.id,
          text: String(this.$t("chara." + member.chara.name)),
          value: member,
        });
      }
    }
    return items;
  }

  get comment() {
    return this.member?.equip.comment || "-";
  }

  mounted() {
    const item = this.$db.damage.find((val) => val.id === this.damage);
    if (item) {
      const team = this.$db.team.find((val) => val.id === item.team);
      if (team) {
        this.team = team;
        this.member =
          this.members.find((val) => val.id === item.member)?.value || null;
      }
    }
  }

  onChangeTeam() {
    this.member = this.members[0]?.value || null;
    this.onChangeMember();
  }

  onChangeMember() {
    if (this.team && this.member) {
      this.onChange(this.team, this.member);
    }
  }
}
</script>
