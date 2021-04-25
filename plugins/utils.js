import Vue from 'vue';

const utils = {
    install(Vue) {
        Vue.prototype.$isReleaseLeaf = function(obj) {
            return typeof obj === "string";
        };
    }
};

Vue.use(utils);