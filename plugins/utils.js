import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import { convert } from '~/src/convert';

const DirectBonus = ["none", "hp", "atk", "def", "elem"];

const utils = {
    install(Vue) {
        Vue.prototype.$globals = convert();
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
    }
}

Vue.use(utils);
Vue.use(Vuetify)

Vue.config.devtools = true