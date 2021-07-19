<template>
  <v-container>
    <h2>Genshin Impact Damage Emulator</h2>
    <h3>使い方</h3>
    <ol>
      <li>[キャラクター]～[武器]タブで各種値を設定します。</li>
      <li>[装備]タブでキャラクターの装備を選択します。</li>
      <li>[チーム]タブでチームメンバー選びます。</li>
      <li>
        [ダメージ]タブで敵キャラ/レベル・メンバーを選んで、ダメージを算出します。
      </li>
    </ol>
    <ul>
      <li>「保存」ボタンを押してデータを保存してください。</li>
      <li>
        「エクスポート」ボタンを押して、外部ファイルにデータを保存可能です。
      </li>
      <li>
        「インポート」ボタンを押して、外部ファイルのデータを読み込み可能です。
      </li>
      <li>
        聖遺物の名前の下の数値は、サブ効果をオリジナルの点数付けしたものです。
      </li>
    </ul>
    <h3>注意点</h3>
    <ul>
      <li>このページの利用は自己責任でお願いします。</li>
      <li>外部とのデータ送受信はありません。</li>
      <li>一部のパラメーターは、ゲーム内の数値と若干の誤差があります。</li>
    </ul>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "index",
})
export default class PageIndex extends Vue {
  created() {
    this.$store.commit("setAppendable", false);
  }
}
</script>
