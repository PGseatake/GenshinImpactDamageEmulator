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
        :value.sync="refMember"
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
        :items="reactionList"
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
import { ElementType, NoneElementType, NoneReactionType } from "~/src/const";
import { ITeamData, IMember, Members, Member, getTeamName } from "~/src/team";

type TextValue = {
  text: string;
  value: IMember;
};

@Component({
  name: "SelectMember",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    AscensionLevel: () => import("~/components/AscensionLevel.vue"),
    SelectElement: () => import("~/components/SelectElement.vue"),
  },
})
export default class SelectMember extends Vue {
  @Prop({ required: true }) damage!: string;
  @Prop({ required: true }) contact!: NoneElementType;
  @Prop({ required: true }) reaction!: NoneReactionType;
  @Prop({ required: true }) reactions!: ReadonlyArray<NoneReactionType>;

  team: ITeamData | null = null;
  member: IMember = { info: null, chara: null, equip: null };

  readonly contacts = [
    "",
    ElementType.Pyro,
    ElementType.Hydro,
    ElementType.Elect,
    ElementType.Cryo,
  ];

  @Emit("change")
  onChange(member: IMember, team: ITeamData | null) {}

  get refMember() {
    return this.member;
  }
  set refMember(member: IMember | null) {
    if (member) {
      this.member.info = member.info;
      this.member.chara = member.chara;
      this.member.equip = member.equip;
    } else {
      this.member.info = null;
      this.member.chara = null;
      this.member.equip = null;
    }
  }

  get refLevel() {
    return this.member?.chara?.level || null;
  }
  set refLevel(value: string | null) {
    if (this.member?.chara && value) {
      this.member.chara.level = value;
    }
  }

  get refContact() {
    return this.contact;
  }
  set refContact(value: NoneElementType) {
    this.$emit("update:contact", value);
  }

  get refReaction() {
    return this.reaction;
  }
  set refReaction(value: NoneReactionType) {
    this.$emit("update:reaction", value);
  }

  get reactionList() {
    return this.reactions.map((val) => ({
      text: this.$t("reaction." + (val || "none")),
      value: val,
    }));
  }

  get teams() {
    const text = this.$t("menu.team");
    let items: { text: string; value: ITeamData }[] = [];
    this.$db.team.forEach((t, i) =>
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
          const member = Member.find(team[key], this.$db);
          if (member.chara) {
            items.push({
              text: this.$t("chara." + member.chara.name) as string,
              value: member,
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

  mounted() {
    const item = this.$db.damage.find((val) => val.id === this.damage);
    if (item) {
      const team = this.$db.team.find((val) => val.id === item.team);
      if (team) {
        this.team = team;

        this.changeMember(
          Members.findIndex((val) => team[val] === item.member)
        );
      }
    }
  }

  changeMember(index = 0) {
    const members = this.members;
    if (0 <= index && index < members.length) {
      const member = members[index].value;
      this.member.info = member.info;
      this.member.chara = member.chara;
      this.member.equip = member.equip;
    } else {
      this.member.info = null;
      this.member.chara = null;
      this.member.equip = null;
    }
  }

  onChangeTeam() {
    this.changeMember();
    this.onChangeMember();
  }

  onChangeMember() {
    this.onChange(this.member, this.team);
  }
}
</script>
