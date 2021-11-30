<template>
  <v-data-table
    v-bind="$attrs"
    v-on="$listeners"
    :headers="headers"
    :items="items"
    :class="tableClass"
    :items-per-page="-1"
    fixed-header
    hide-default-footer
  >
    <template #[`item.name`]="{ item }">
      <name-comment
        :items="names"
        :value.sync="item.name"
        :comment.sync="item.comment"
      />
    </template>
    <template #[`item.star`]="{ item }">
      <select-range
        v-model="item.star"
        :min="3"
        :max="5"
        @change="onChangeStar(item)"
      />
    </template>
    <template #[`item.level`]="{ item }">
      <select-range
        v-model="item.level"
        :min="0"
        :max="item.star * 4"
        @change="onChangeLevel(item)"
      />
    </template>
    <template #[`item.main`]="{ item }">
      <bonus-value
        v-bind.sync="item.main"
        :types="mains"
        :score="getTotal(item)"
        @change="onChangeMain(item)"
      />
    </template>
    <template #[`item.sub1`]="{ item }">
      <bonus-value
        v-bind.sync="item.sub1"
        :types="subs"
        :score="getScore(item, item.sub1)"
      />
    </template>
    <template #[`item.sub2`]="{ item }">
      <bonus-value
        v-bind.sync="item.sub2"
        :types="subs"
        :score="getScore(item, item.sub2)"
      />
    </template>
    <template #[`item.sub3`]="{ item }">
      <bonus-value
        v-bind.sync="item.sub3"
        :types="subs"
        :score="getScore(item, item.sub3)"
      />
    </template>
    <template #[`item.sub4`]="{ item }">
      <bonus-value
        v-bind.sync="item.sub4"
        :types="subs"
        :score="getScore(item, item.sub4)"
      />
    </template>
    <template #[`item.action`]="{ item }">
      <v-btn fab x-small class="my-1" @click="onRemove(item)">
        <v-icon>{{ icons.remove }}</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<style lang="scss" scoped>
.pc-data-table ::v-deep {
  tr:hover {
    background: inherit !important;
  }
  th.text-start {
    padding: 0 6px;
  }
  td.text-start {
    padding: 0 6px;

    // 名前
    &:nth-of-type(1) {
      min-width: 200px;
      max-width: 350px;
    }
    // ☆
    &:nth-of-type(2) {
      min-width: 50px;
      max-width: 80px;
      vertical-align: bottom;
      padding: 0 6px 4px 6px;
    }
    // Lv
    &:nth-of-type(3) {
      min-width: 60px;
      max-width: 80px;
      vertical-align: bottom;
      padding: 0 6px 4px 6px;
    }
    // メイン効果
    &:nth-of-type(4) {
      min-width: 100px;
      max-width: 120px;
    }
    // サブ効果
    &:nth-of-type(5) {
      min-width: 100px;
      max-width: 120px;
    }
    &:nth-of-type(6) {
      min-width: 100px;
      max-width: 120px;
    }
    &:nth-of-type(7) {
      min-width: 100px;
      max-width: 120px;
    }
    &:nth-of-type(8) {
      min-width: 100px;
      max-width: 120px;
    }
  }
}

.mb-data-table ::v-deep {
  td {
    // 名前
    &:nth-of-type(1) .v-data-table__mobile-row__cell {
      min-width: 150;
      max-width: 70%;
    }
    // ☆
    // &:nth-of-type(2) .v-data-table__mobile-row__cell {}
    // Lv
    // &:nth-of-type(3) .v-data-table__mobile-row__cell {}
    // メイン効果
    &:nth-of-type(4) .v-data-table__mobile-row__cell {
      min-width: 110px;
      max-width: 50%;
    }
    // サブ効果
    &:nth-of-type(5) .v-data-table__mobile-row__cell {
      min-width: 110px;
      max-width: 50%;
    }
    &:nth-of-type(6) .v-data-table__mobile-row__cell {
      min-width: 110px;
      max-width: 50%;
    }
    &:nth-of-type(7) .v-data-table__mobile-row__cell {
      min-width: 110px;
      max-width: 50%;
    }
    &:nth-of-type(8) .v-data-table__mobile-row__cell {
      min-width: 110px;
      max-width: 50%;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { mdiDelete } from "@mdi/js";
import { ArtifactType } from "~/src/const";
import { BonusValue } from "~/src/interface";
import {
  IArtifactData,
  ArtifactNames,
  ArtifactMain,
  ArtifactSub,
  SubBonus,
  calcMain,
  calcScore,
} from "~/src/artifact";

@Component({
  name: "ArtifactData",
  components: {
    BonusValue: () => import("~/components/BonusValue.vue"),
    NameComment: () => import("~/components/NameComment.vue"),
    SelectRange: () => import("~/components/SelectRange.vue"),
  },
  inheritAttrs: false,
})
export default class ArtifactData extends Vue {
  @Prop({ required: true }) type!: ArtifactType;
  @Prop({ required: true }) items!: Array<IArtifactData>;

  @Emit("remove")
  onRemove(item: IArtifactData) {}

  readonly icons = {
    remove: mdiDelete,
  };
  readonly subs = ArtifactSub;

  get tableClass() {
    return `${this.$vuetify.breakpoint.xs ? "mb" : "pc"}-data-table px-1`;
  }

  get headers() {
    return [
      { text: this.$t("general.name"), value: "name" },
      { text: this.$t("general.star"), value: "star" },
      { text: this.$t("general.level"), value: "level" },
      { text: this.$t("general.main"), value: "main", sortable: false },
      { text: this.$t("general.sub1"), value: "sub1", sortable: false },
      { text: this.$t("general.sub2"), value: "sub2", sortable: false },
      { text: this.$t("general.sub3"), value: "sub3", sortable: false },
      { text: this.$t("general.sub4"), value: "sub4", sortable: false },
      { text: "", value: "action", sortable: false, width: "80px" },
    ];
  }

  get names() {
    return ArtifactNames.map((name) => ({
      text: this.$t(`artifact.${this.type}.${name}`),
      value: name,
    }));
  }

  get mains() {
    return ArtifactMain[this.type];
  }

  onChangeStar(item: IArtifactData) {
    if (item.star * 4 < item.level) {
      item.level = item.star * 4;
    }
    this.updateMain(item);
  }

  onChangeLevel(item: IArtifactData) {
    this.updateMain(item);
  }

  onChangeMain(item: IArtifactData) {
    this.updateMain(item);
  }

  getScore({ star, level }: IArtifactData, bonus: BonusValue) {
    const score = calcScore(bonus, star, level);
    if (score !== undefined) {
      return score.toString();
    }
    return "";
  }

  getTotal(item: IArtifactData) {
    if (item.star < 4) return "";
    let total = 0;
    let limit = 10 + Math.floor(item.level / 4) * 10;
    for (const sub of SubBonus) {
      const score = calcScore(item[sub], item.star, item.level);
      if (score !== undefined) {
        total += score;
      }
    }
    limit += item.star === 4 ? 20 : 30;
    return `${total}/${limit}`;
  }

  updateMain(item: IArtifactData) {
    item.main.value = calcMain(item.main.type, item.star, item.level);
  }
}
</script>
