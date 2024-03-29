import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import { BonusType, ElementType } from '~/src/const';
import { DirectBonus } from '~/src/special';
import convert from '~/src/convert';
import { Maths } from '~/src/utility';

const utils = {
    install(Vue) {
        Vue.prototype.$db = convert();
        Vue.prototype.$roundRate = Maths.rate;

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

        Vue.prototype.$formatBonus = function(data) {
            if (data) {
                const type = data.type || BonusType.None;
                if (type !== BonusType.None) {
                    const value = data.value;
                    if (DirectBonus.includes(type)) {
                        return `${this.$t("bonus_short." + type)}:${value.toFixed(0)}`;
                    }
                    return `${this.$t("bonus_short." + type)}:${value.toFixed(1)}%`;
                }
            }
            return "";
        }

        Vue.prototype.$starColor = function(star) {
            switch (star) {
                case 5:
                    return "orange darken-3";
                case 4:
                    return "purple darken-2";
            }
            return "blue";
        }

        Vue.prototype.$elementBGColor = function(elem) {
            switch (elem) {
                case ElementType.Pyro:
                    return "red darken-1";
                case ElementType.Hydro:
                    return "blue darken-3";
                case ElementType.Dendro:
                    return "green darken-3";
                case ElementType.Elect:
                    return "deep-purple lighten-1";
                case ElementType.Anemo:
                    return "light-green";
                case ElementType.Cryo:
                    return "light-blue lighten-1";
                case ElementType.Geo:
                    return "yellow darken-3";
                case ElementType.Phys:
                    return "gray darken-2";
            }
            return "indigo darken-4";
        }

        Vue.prototype.$h = function(key, values) {
            const ret = this.$t(key, values);
            if (typeof ret === "string") {
                // HTMLタグの埋め込み禁止
                if (ret.includes("<")) {
                    return "";
                }
                return ret.replace(/\n/g, "<br>");
            }
            return String(ret);
        }
    }
}

Vue.use(utils);
Vue.use(Vuetify)

Vue.config.devtools = true

const opts = {}

export default new Vuetify(opts)