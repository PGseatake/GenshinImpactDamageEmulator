import Vue from 'vue';
import Vuetify from 'vuetify/lib'

const utils = {
    install(Vue) {
        Vue.prototype.$globals = {
            chara: [],
            sword: [],
            claymore: [],
            polearm: [],
            bow: [],
            catalyst: [],
            flower: [],
            feather: [],
            sands: [],
            goblet: [],
            circlet: [],
        }

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
    }
}

Vue.use(utils);
Vue.use(Vuetify)

Vue.config.devtools = true