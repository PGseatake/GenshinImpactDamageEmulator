import Vue from 'vue';
import Vuetify from 'vuetify/lib'

const utils = {
    install(Vue) {
        Vue.prototype.$makeUniqueId = function() {
            return Date.now().toString(16) +
                Math.floor(0xFFFF * Math.random()).toString(16);
        }
    }
};

Vue.use(utils);
Vue.use(Vuetify)

Vue.config.devtools = true