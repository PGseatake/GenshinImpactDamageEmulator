<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="auto" style="line-height: 1.7em">
        <h2>G.I.D.E. - Genshin Impact Damage Emulator</h2>
      </v-col>
    </v-row>
    <v-row no-gutters align="center">
      <v-col cols="auto" class="pt-1">
        <h1>{{ $t("subtitle") }}</h1>
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <v-btn icon @click="outerLink('twitter')">
          <v-icon v-text="icons.twitter" color="#1DA1F2" />
        </v-btn>
        <v-btn icon @click="outerLink('github')">
          <v-icon v-text="icons.github" />
        </v-btn>
      </v-col>
    </v-row>
    <!-- アップデート -->
    <v-card>
      <v-card-title class="pb-2">{{ $t("index.update") }}</v-card-title>
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
          style="text-transform: uppercase"
          >{{ $t("menu.releasenote") }}</v-btn
        >
      </v-card-actions>
    </v-card>
    <!-- 使い方 -->
    <v-card class="mt-2">
      <v-card-title class="pb-2">{{ $t("menu.howto") }}</v-card-title>
      <v-card-text class="text--primary">
        <ol>
          <li>
            <v-icon v-text="icons.chara" />{{ $t("menu.character")
            }}<v-icon v-text="icons.weapon" />{{ $t("menu.weapon")
            }}<v-icon v-text="icons.artifact" />{{
              $t("menu.artifact") + $t("index.L1")
            }}
          </li>
          <li><v-icon v-text="icons.equip" />{{ $t("index.L2") }}</li>
          <li><v-icon v-text="icons.team" />{{ $t("index.L3") }}</li>
          <li><v-icon v-text="icons.damage" />{{ $t("index.L4") }}</li>
        </ol>
      </v-card-text>
      <v-card-text class="text--primary py-0">
        <ul>
          <li><v-icon v-text="icons.save" />{{ $t("index.L5") }}</li>
          <li><v-icon v-text="icons.export" />{{ $t("index.L6") }}</li>
          <li><v-icon v-text="icons.import" />{{ $t("index.L7") }}</li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-btn small depressed to="/howto" color="blue-grey" class="ml-4">{{
          $t("index.howto")
        }}</v-btn>
      </v-card-actions>
    </v-card>
    <!-- 注意点  -->
    <v-card class="mt-2">
      <v-card-title class="pb-2">{{ $t("index.caution") }}</v-card-title>
      <v-card-text class="text--primary">
        <ul>
          <li>{{ $t("index.C1") }}</li>
          <li>{{ $t("index.C2") }}</li>
          <li>{{ $t("index.C3") }}</li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style>
h1 {
  font-size: 1.1em;
  color: silver;
}
h2 {
  font-size: 1.5em;
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { LocaleMessageObject } from "vue-i18n/types";
import {
  mdiAccount,
  mdiAccountMultiplePlus,
  mdiCalculatorVariant,
  mdiContentSave,
  mdiExport,
  mdiGithub,
  mdiImport,
  mdiPlaylistPlus,
  mdiRing,
  mdiSword,
  mdiTranslate,
  mdiTshirtCrew,
  mdiTwitter,
} from "@mdi/js";
import ReleaseRoot from "~/components/menu/ReleaseRoot.vue";

@Component({
  name: "PageIndex",
  components: { ReleaseRoot },
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
    twitter: mdiTwitter,
    github: mdiGithub,
  };
  readonly links: IDict<string> = {
    twitter: "https://twitter.com/PGseatake",
    github: "https://github.com/PGseatake/GenshinImpactDamageEmulator",
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
    this.$store.commit("tabs", {});
  }

  outerLink(prop: string) {
    window.open(this.links[prop], "_blank");
  }
}
</script>
