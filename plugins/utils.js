import Vue from 'vue';
import Vuetify from 'vuetify/lib'
//import '@mdi/font/css/materialdesignicons.css'

const utils = {
    install(Vue) {
        Vue.prototype.$uniqueId = function() {
            return Date.now().toString(16) +
                Math.floor(0xFFFF * Math.random()).toString(16);
        }
    }
};

Vue.use(utils);
Vue.use(Vuetify)

// export default new Vuetify({
//     icons: {
//         iconfont: 'mdi',
//     },
// })

Vue.config.devtools = true