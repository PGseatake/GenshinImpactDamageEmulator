import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import { BonusType, ElementType } from '~/src/const';
import { DirectBonus } from '~/src/bonus';
import convert from '~/src/convert';

export function roundFloat(value) {
    if (value < 100) {
        if (value < 1) {
            return (Math.round(value * 100) / 100).toFixed(2);
        }
        return (Math.round(value * 10) / 10).toFixed(1);
    }
    return Math.round(value).toFixed();
}

export function roundRate(value) {
    return roundFloat(value) + "%";
}

const utils = {
    install(Vue) {
        Vue.prototype.$db = convert();

        Vue.prototype.$makeUniqueId = () => {
            return Date.now().toString(16) +
                Math.floor(0xFFFF * Math.random()).toString(16);
        }

        Vue.prototype.$appendData = (data, item) => {
            data.push(item);
        }

        Vue.prototype.$removeData = (data, item) => {
            const idx = data.findIndex((val) => val.id === item.id);
            if (0 <= idx) {
                data.splice(idx, 1);
            }
        }

        Vue.prototype.$formatBonus = (i18n, data) => {
            if (data) {
                const type = data.type || BonusType.None;
                if (type !== BonusType.None) {
                    const value = data.value;
                    if (DirectBonus.includes(type)) {
                        return `${i18n.t("bonus_short." + type)}:${value.toFixed(0)}`;
                    }
                    return `${i18n.t("bonus_short." + type)}:${value.toFixed(1)}%`;
                }
            }
            return "";
        }

        Vue.prototype.$starColor = (star) => {
            switch (star) {
                case 5:
                    return "amber darken-4";
                case 4:
                    return "purple darken-1";
            }
            return "blue darken-1";
        }

        Vue.prototype.$elementBGColor = (elem) => {
            switch (elem) {
                case ElementType.Pyro:
                    return "red darken-1";
                case ElementType.Hydro:
                    return "indigo darken-1";
                case ElementType.Dendro:
                    return "green darken-2";
                case ElementType.Elect:
                    return "purple darken-1";
                case ElementType.Anemo:
                    return "light-green darken-1";
                case ElementType.Cryo:
                    return "light-blue darken-1";
                case ElementType.Geo:
                    return "yellow darken-3";
                case ElementType.Phys:
                    return "gray darken-3";
            }
            return "indigo darken-4";
        }

        Vue.prototype.$roundFloat = roundFloat;
        Vue.prototype.$roundRate = roundRate;
    }
}

Vue.use(utils);
Vue.use(Vuetify)

Vue.config.devtools = true

const opts = {}

export default new Vuetify(opts)