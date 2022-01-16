<template>
  <div>
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
        <v-btn
          fab
          x-small
          class="my-1"
          @click="onRandom(item)"
          @click.middle="onRandom(item, true)"
        >
          <v-icon>{{ icons.random }}</v-icon>
        </v-btn>
        <v-btn fab x-small class="my-1" @click="onBeforeRemove(item)">
          <v-icon>{{ icons.remove }}</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <dialog-append
      :type="type"
      :disabled="!append"
      max-width="300px"
      @accept="onAppend"
      @cancel="append = ''"
    >
      <v-select
        v-model="append"
        :items="names"
        :menu-props="{ auto: true, transition: false }"
      />
    </dialog-append>
    <dialog-remove
      :type="type"
      :item="remove"
      :name="removeName"
      :exists="exists"
      max-width="300px"
      @accept="onRemove"
      @cancel="remove = null"
    />
  </div>
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
import { Vue, Component, Prop } from "vue-property-decorator";
import { mdiDelete, mdiShuffleVariant } from "@mdi/js";
import { AnyBonusType, ArtifactType, BonusType } from "~/src/const";
import { BonusValue } from "~/src/interface";
import {
  IArtifactData,
  ArtifactNames,
  ArtifactName,
  ArtifactMain,
  ArtifactSub,
  SubBonus,
  calcMain,
  calcScore,
  randomSubStep,
} from "~/src/artifact";

function randomRange(max: number): number {
  return Math.floor(Math.random() * max);
}

@Component({
  name: "ArtifactData",
  components: {
    NameComment: () => import("~/components/NameComment.vue"),
    SelectRange: () => import("~/components/SelectRange.vue"),
    BonusValue: () => import("~/components/equip/BonusValue.vue"),
    DialogAppend: () => import("~/components/dialog/DialogAppend.vue"),
    DialogRemove: () => import("~/components/dialog/DialogRemove.vue"),
  },
  inheritAttrs: false,
})
export default class ArtifactData extends Vue {
  @Prop({ required: true }) type!: ArtifactType;

  readonly icons = { remove: mdiDelete, random: mdiShuffleVariant };
  readonly subs = ArtifactSub;

  items: IArtifactData[] = [];
  append: ArtifactName | "" = "";
  remove: IArtifactData | null = null;

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

  get removeName() {
    const name = this.remove?.name;
    return name ? this.$t(`artifact.${this.type}.${name}`) : "";
  }

  created() {
    this.items = this.$db[this.type];
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

  onAppend() {
    const name = this.append;
    if (name) {
      const init = this.$db.setting.initial.artifact;
      const data: IArtifactData = {
        id: this.$makeUniqueId(),
        name: name,
        comment: "",
        star: init.star,
        level: init.level,
        main: {
          type: ArtifactMain[this.type][0],
          value: 0,
        },
        sub1: {
          type: BonusType.None,
          value: 0,
        },
        sub2: {
          type: BonusType.None,
          value: 0,
        },
        sub3: {
          type: BonusType.None,
          value: 0,
        },
        sub4: {
          type: BonusType.None,
          value: 0,
        },
      };
      this.updateMain(data);
      this.$appendData(this.items, data);
      this.append = "";
    }
  }

  onBeforeRemove(data: IArtifactData) {
    this.remove = data;
  }

  onRemove() {
    if (this.remove) {
      this.$removeData(this.items, this.remove);
      this.remove = null;
    }
  }

  onRandom(item: IArtifactData, type?: boolean) {
    switch (item.star) {
      case 3:
      case 4:
      case 5:
        if (type) {
          // 効果の種類も入れ替える
          this.shuffle(item, [
            BonusType.None,
            BonusType.None,
            BonusType.None,
            BonusType.None,
          ]);
        } else {
          // 現在の効果に基づく
          this.shuffle(
            item,
            SubBonus.map((val) => item[val].type)
          );
        }
    }
  }

  shuffle(item: IArtifactData, types: AnyBonusType[]) {
    const { star, level } = item;
    const min = types.reduce(
      (cnt, val) => (val === BonusType.None ? cnt : cnt + 1),
      0
    );
    types.push(item.main.type); // メイン効果と同じものはでない
    types.push(BonusType.None); // ArtifactSub[0]を除去する

    // サブ効果の強化回数
    var max = star - 1; // Lv.0の最大回数
    max -= Math.round(Math.random()); // ランダムで1回少ない
    max += Math.floor(level / 4);
    max = Math.max(min, max);

    const init = Math.min(max, 4);

    // サブ効果のタイプを選択
    const range = ArtifactSub.length;
    for (var i = 0; i < init; ++i) {
      while (types[i] === BonusType.None) {
        const type = ArtifactSub[randomRange(range)];
        if (!types.includes(type)) {
          types[i] = type;
        }
      }
    }

    // 初期値設定
    for (var i = 0; i < init; ++i) {
      const type = types[i];
      let bonus = item[SubBonus[i]];
      bonus.type = type;
      bonus.value = randomSubStep(type, star);
    }
    for (var i = init; i < 4; ++i) {
      let bonus = item[SubBonus[i]];
      bonus.type = BonusType.None;
      bonus.value = 0;
    }

    // 強化値加算
    for (var n = 4; n < max; ++n) {
      const i = randomRange(4);
      item[SubBonus[i]].value += randomSubStep(types[i], star);
    }
  }

  exists(id: string): boolean {
    return !!this.$db.equip.find((data) => data[this.type] === id);
  }
}
</script>
