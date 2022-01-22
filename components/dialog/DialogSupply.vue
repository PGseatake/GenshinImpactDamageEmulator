<template>
  <v-dialog v-bind="$attrs" v-on="$listeners" v-model="refShow" persistent>
    <v-card>
      <v-card-title>{{ $t("setting.supply.title") }}</v-card-title>
      <v-card-text v-html="$t('setting.supply.text')" class="pb-3" />
      <v-card-text class="d-flex justify-center pb-2">
        <v-list dense class="pa-0" width="250px">
          <template v-for="item of items">
            <v-list-item dense :key="item.type">
              <v-list-item-content
                v-text="$t('tab.' + item.type)"
                class="py-1"
              />
              <v-list-item-action class="ma-0">
                <v-checkbox v-model="item.check" />
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="secondary" @click="onCancel">{{
          $t("dialog.cancel")
        }}</v-btn>
        <v-btn text color="primary" :disabled="disabled" @click="onAccept">{{
          $t("setting.exec")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import {
  ArtifactType,
  ArtifactTypes,
  isArtifactType,
  isWeaponType,
  WeaponType,
  WeaponTypes,
} from "~/src/const";
import { Builder as WeaponBuilder, WeaponNames } from "~/src/weapon";
import { Builder as ArtifactBuilder, ArtifactNames } from "~/src/artifact";
import {
  Builder as CharaBuilder,
  CharaList,
  CharaNames,
  ICharaData,
} from "~/src/character";
import { Database } from "~/src/convert";
import { Builder, ITeamData, Members } from "~/src/team";

@Component({
  name: "DialogSupply",
  inheritAttrs: false,
})
export default class DialogSupply extends Vue {
  @Prop({ required: true }) show!: boolean;

  items = [
    { type: "chara", check: false },
    { type: WeaponType.Sword, check: false },
    { type: WeaponType.Claymore, check: false },
    { type: WeaponType.Polearm, check: false },
    { type: WeaponType.Bow, check: false },
    { type: WeaponType.Catalyst, check: false },
    { type: ArtifactType.Flower, check: false },
    { type: ArtifactType.Feather, check: false },
    { type: ArtifactType.Sands, check: false },
    { type: ArtifactType.Goblet, check: false },
    { type: ArtifactType.Circlet, check: false },
  ];

  get refShow() {
    return this.show;
  }
  set refShow(value: boolean) {
    this.$emit("update:show", value);
  }

  get disabled() {
    return !this.items.some((item) => item.check);
  }

  created() {
    if (this.$config.DEBUG) {
      this.items.push({ type: "equip", check: false });
    }
  }

  @Emit("accept")
  onAccept() {
    if (this.items.some((item) => item.type === "equip" && item.check)) {
      Database.reset(this.$db);
    }
    for (const { type, check } of this.items) {
      if (check) {
        if (isWeaponType(type)) {
          this.supplyWeapon(type);
        } else if (isArtifactType(type)) {
          this.supplyArtifact(type);
        } else {
          if (type === "chara") {
            this.supplyChara();
          } else {
            if (this.items[0].check) {
              this.supplyEquip();
              this.supplyTeam();
            }
          }
        }
      }
    }
    this.reset();
  }

  onCancel() {
    this.reset();
  }

  private reset() {
    for (let item of this.items) {
      item.check = false;
    }
    this.refShow = false;
  }

  private supplyWeapon(type: WeaponType) {
    let list = this.$db[type];
    const init = this.$db.setting.initial.weapon;
    const exists = new Set(list.map((item) => item.name));
    for (const name of WeaponNames[type]) {
      if (!exists.has(name)) {
        list.push(WeaponBuilder.make(this.$makeUniqueId(), type, name, init));
      }
    }
  }

  private supplyArtifact(type: ArtifactType) {
    let list = this.$db[type];
    const init = this.$db.setting.initial.artifact;
    const exists = new Set(list.map((item) => item.name));
    for (const name of ArtifactNames) {
      if (!exists.has(name)) {
        list.push(ArtifactBuilder.make(this.$makeUniqueId(), type, name, init));
      }
    }
  }

  private supplyChara() {
    let list = this.$db.chara;
    const init = this.$db.setting.initial.chara;
    const exists = new Set(list.map((item) => item.name));
    for (const name of CharaNames) {
      if (!exists.has(name)) {
        list.push(CharaBuilder.make(this.$makeUniqueId(), name, init));
      }
    }
  }

  private supplyEquip() {
    let indices = {
      sword: 0,
      claymore: 0,
      polearm: 0,
      bow: 0,
      catalyst: 0,
      flower: 0,
      feather: 0,
      sands: 0,
      goblet: 0,
      circlet: 0,
    };
    let charas: Record<WeaponType, ICharaData[]> = {
      sword: [],
      claymore: [],
      polearm: [],
      bow: [],
      catalyst: [],
    };
    // 武器種毎のキャラリスト
    for (const item of this.$db.chara) {
      const { weapon } = CharaList[item.name];
      charas[weapon].push(item);
    }
    for (const wtype of WeaponTypes) {
      const chara = charas[wtype];
      if (chara.length) {
        for (const weapon of this.$db[wtype]) {
          // 武器装備
          let widx = indices[wtype];
          if (chara.length === widx) {
            widx = 0;
          }
          let data = Builder.equip(this.$makeUniqueId(), chara[widx].id);
          data.weapon = weapon.id;
          indices[wtype] = ++widx;

          // 聖遺物装備
          for (const atype of ArtifactTypes) {
            const artifacts = this.$db[atype];
            if (artifacts.length) {
              let aidx = indices[atype];
              if (artifacts.length === aidx) {
                aidx = 0;
              }
              data[atype] = artifacts[aidx].id;
              indices[atype] = ++aidx;
            }
          }

          this.$db.equip.push(data);
        }
      }
    }
  }

  private supplyTeam() {
    const items = this.$db.equip;
    if (items.length) {
      const max = Members.length;
      let idx = 0;
      let data: ITeamData = Builder.team("", "");
      for (const item of items) {
        if (idx === max) {
          Builder.resonance(data, this.$db);
          this.$db.team.push(data);
          idx = 0;
        }
        if (idx === 0) {
          data = Builder.team(this.$makeUniqueId(), item.id);
        } else {
          data[Members[idx]] = item.id;
        }
        ++idx;
      }
      Builder.resonance(data, this.$db);
      this.$db.team.push(data);
    }
  }
}
</script>
