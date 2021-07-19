import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import { BonusType, ElementType } from '~/src/const';
import { convert } from '~/src/convert';

const DirectBonus = ["none", "hp", "atk", "def", "elem"];

const utils = {
    install(Vue) {
        Vue.prototype.$globals = convert();
        Vue.prototype.$bonuses = [];

        Vue.prototype.$makeUniqueId = function() {
            return Date.now().toString(16) +
                Math.floor(0xFFFF * Math.random()).toString(16);
        }

        Vue.prototype.$appendData = function(data, item) {
            data.push(item);
        }

        Vue.prototype.$removeData = function(data, item) {
            const idx = data.findIndex((val) => val.id === item.id);
            if (0 <= idx) {
                data.splice(idx, 1);
            }
        }

        Vue.prototype.$formatBonus = function(vm, data) {
            if (data) {
                const type = data.type || BonusType.None;
                if (type !== BonusType.None) {
                    const value = data.value;
                    if (DirectBonus.includes(type)) {
                        return `${vm.$t("bonus_short." + type)}:${value.toFixed(0)}`;
                    }
                    return `${vm.$t("bonus_short." + type)}:${value.toFixed(1)}%`;
                }
            }
            return "";
        }

        Vue.prototype.$starColor = function(star) {
            switch (star) {
                case 5:
                    return "amber darken-4";
                case 4:
                    return "purple darken-1";
            }
            return "blue darken-1";
        }

        Vue.prototype.$elementBGColor = function(elem) {
            switch (elem) {
                case ElementType.Pyro:
                    return "red darken-1";
                case ElementType.Hydro:
                    return "indigo darken-1";
                case ElementType.Dendro:
                    return "light green-2";
                case ElementType.Elect:
                    return "purple darken-1";
                case ElementType.Anemo:
                    return "green darken-1";
                case ElementType.Cryo:
                    return "light-blue darken-1";
                case ElementType.Geo:
                    return "yellow darken-3";
                case ElementType.Phys:
                    return "gray darken-3";
            }
            return "indigo darken-4";
        }

        Vue.prototype.$roundRate = function(value) {
            if (value < 100) {
                return (Math.round(value * 10) / 10).toFixed(1) + "%";
            }
            return Math.round(value).toFixed() + "%";
        }

        Vue.prototype.$roundFloat = function(value) {
            if (value < 100) {
                return (Math.round(value * 10) / 10).toFixed(1);
            }
            return Math.round(value).toFixed();
        }
    }
}

Vue.use(utils);
Vue.use(Vuetify)

Vue.config.devtools = true