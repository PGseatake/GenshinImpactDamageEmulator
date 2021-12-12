<template>
  <v-container>
    <h2>Genshin Impact Damage Emulator</h2>
    <v-card>
      <v-card-title>使い方</v-card-title>
      <v-card-text class="text--primary">
        <ol>
          <li>
            <v-icon v-text="icons.chara" />キャラクター、<v-icon
              v-text="icons.weapon"
            />武器、<v-icon
              v-text="icons.artifact"
            />聖遺物メニューで各種設定を行います。
          </li>
          <li>
            <v-icon
              v-text="icons.equip"
            />装備メニューでキャラクターの装備を選択します。
          </li>
          <li>
            <v-icon
              v-text="icons.team"
            />チームメニューでチームメンバーを選択します。
          </li>
          <li>
            <v-icon v-text="icons.damage" />ダメージメニューで上部の
            <v-icon
              v-text="icons.append"
            />をクリック、敵キャラ・チームメンバーなどを選んで、ダメージを計算します。
          </li>
        </ol>
      </v-card-text>
      <v-card-text class="text--primary">
        <ul>
          <li>
            <v-icon
              v-text="icons.save"
            />保存ボタンを押してデータを保存してください。
          </li>
          <li>
            <v-icon
              v-text="icons.export"
            />エクスポートボタンを押して、外部ファイルにデータを保存可能です。
          </li>
          <li>
            <v-icon
              v-text="icons.import"
            />インポートボタンを押して、外部ファイルのデータを読み込み可能です。
          </li>
          <li>
            聖遺物の各効果上部の数値は、サブ効果をオリジナルの点数付けしたものです。
          </li>
        </ul>
      </v-card-text>
    </v-card>
    <v-card class="mt-2">
      <v-card-title>アップデート</v-card-title>
      <v-card-text class="text--primary py-0">
        <release-root :version="version" :root="root" :value="true" />
      </v-card-text>
      <v-card-actions>
        <v-btn
          small
          depressed
          to="/releasenote"
          color="blue-grey"
          class="ml-4"
          >{{ $t("menu.releasenote") }}</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-card class="mt-2">
      <v-card-title>注意点</v-card-title>
      <v-card-text class="text--primary">
        <ul>
          <li>当サイトの利用は自己責任でお願いします。</li>
          <li>一部のパラメーターはゲーム内の数値と誤差があります。</li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {
  mdiAccount,
  mdiAccountMultiplePlus,
  mdiCalculatorVariant,
  mdiContentSave,
  mdiExport,
  mdiImport,
  mdiPlaylistPlus,
  mdiRing,
  mdiSword,
  mdiTranslate,
  mdiTshirtCrew,
} from "@mdi/js";
import { LocaleMessageObject } from "vue-i18n/types";

@Component({
  name: "index",
})
export default class PageIndex extends Vue {
  readonly icons = {
    chara: mdiAccount,
    weapon: mdiSword,
    artifact: mdiRing,
    equip: mdiTshirtCrew,
    team: mdiAccountMultiplePlus,
    damage: mdiCalculatorVariant,
    save: mdiContentSave,
    import: mdiImport,
    export: mdiExport,
    locale: mdiTranslate,
    append: mdiPlaylistPlus,
  };

  get version() {
    for (const key in this.$t("releasenote") as LocaleMessageObject) {
      return key;
    }
    return "";
  }

  get root() {
    const obj = this.$t("releasenote") as LocaleMessageObject;
    for (const key in obj) {
      return obj[key];
    }
    return {};
  }

  created() {
    this.$store.commit("appendable", false);
  }
}
</script>
