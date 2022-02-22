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
        :commentable="false"
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
        :type.sync="refContact"
        :types="contacts"
        :label="$t('damage.contact')"
      />
    </v-col>
    <!-- 元素反応 -->
    <v-col cols="auto" class="pa-1">
      <v-select
        v-model="refReaction"
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
import { ContactTypes, AnyElementType, AnyReactionType } from "~/src/const";
import { ITeamData, IMember, Team } from "~/src/team";
import Chara from "~/src/character";

@Component({
  name: "SelectMember",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    AscensionLevel: () => import("~/components/AscensionLevel.vue"),
    SelectElement: () => import("~/components/damage/SelectElement.vue"),
  },
  inheritAttrs: false,
})
export default class SelectMember extends Vue {
  @Prop({ required: true }) damage!: string;
  @Prop({ required: true }) contact!: AnyElementType;
  @Prop({ required: true }) reaction!: AnyReactionType;
  @Prop({ required: true }) reactions!: ReadonlyArray<AnyReactionType>;

  team: ITeamData | null = null;
  member: IMember | null = null;

  readonly contacts = ["", ...ContactTypes];

  @Emit("change")
  onChange(team: ITeamData, member: IMember) {}

  get refLevel() {
    return this.member?.chara?.level || null;
  }
  set refLevel(value: string | null) {
    if (this.member?.chara && value) {
      this.member.chara.level = value;
      Chara.level(this.member.chara);
      this.onChangeMember();
    }
  }

  get refContact() {
    return this.contact;
  }
  set refContact(value: AnyElementType) {
    this.$emit("update:contact", value);
  }

  get refReaction() {
    return this.reaction;
  }
  set refReaction(value: AnyReactionType) {
    this.$emit("update:reaction", value);
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
    let items: { text: string; value: IMember }[] = [];
    const team = this.team;
    if (team) {
      for (const member of new Team(team).members(this.$db)) {
        items.push({
          text: String(this.$t("chara." + member.chara.name)),
          value: member,
        });
      }
    }
    return items;
  }

  get comment() {
    return this.member?.equip?.comment || "-";
  }

  mounted() {
    const item = this.$db.damage.find((val) => val.id === this.damage);
    if (item) {
      const team = this.$db.team.find((val) => val.id === item.team);
      if (team) {
        this.team = team;

        const index = new Team(team).index(item.member);
        if (index >= 0) {
          this.member = this.members[index]?.value || null;
        }
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
