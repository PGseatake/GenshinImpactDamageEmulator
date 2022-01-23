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
import { ArtifactType, BonusType } from "~/src/const";
import { BonusValue } from "~/src/interface";
import {
  IArtifactData,
  ArtifactNames,
  ArtifactName,
  ArtifactMain,
  ArtifactSub,
  SubBonus,
  calcScore,
  Builder,
} from "~/src/artifact";

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
    Builder.star(item);
  }

  onChangeLevel(item: IArtifactData) {
    Builder.main(item);
  }

  onChangeMain(item: IArtifactData) {
    Builder.main(item);
  }

  getScore({ star, level }: IArtifactData, bonus: BonusValue) {
    const score = calcScore(bonus, star, level);
    if (score !== undefined) {
      return score.toString();
    }
    return "";
  }

  getTotal(item: IArtifactData) {
    return Builder.score(item);
  }

  onAppend() {
    const name = this.append;
    if (name) {
      const data = Builder.make(
        this.$makeUniqueId(),
        this.type,
        name,
        this.$db.setting.initial.artifact
      );
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
    if (type) {
      // 効果の種類も入れ替える
      Builder.shuffle(item, [
        BonusType.None,
        BonusType.None,
        BonusType.None,
        BonusType.None,
      ]);
    } else {
      // 現在の効果に基づく
      Builder.shuffle(
        item,
        SubBonus.map((val) => item[val].type)
      );
    }
  }

  exists(id: string): boolean {
    return !!this.$db.equip.find((data) => data[this.type] === id);
  }
}
</script>
