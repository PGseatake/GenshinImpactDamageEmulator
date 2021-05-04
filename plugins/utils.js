import Vue from 'vue';
import Vuetify from 'vuetify/lib'

// TODO: とりあえず
export let gideData = {
    flower: [{
            id: "aesciugb",
            name: "Adventurer",
            comment: "長めのコメント",
            star: 4,
            level: "12",
            main: { type: "atk", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
        {
            id: "iuynegrxmg",
            name: "Adventurer",
            comment: "test",
            star: 4,
            level: "12",
            main: { type: "atk", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
        {
            id: "7qnhcxf4wg76",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "atk", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
        {
            id: "h7xwg4jr964",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "atk", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
        {
            id: "7nhgxt7g4m",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "atk", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
        {
            id: "n4y7xz3w4ry",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "atk", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
        {
            id: "xv8nh34j6r",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "atk", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
        {
            id: "wxrfnh87",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "atk", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
        {
            id: "wefrx8g",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "atk", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
    ],
    feather: [],
    sands: [],
    goblet: [],
    circlet: []
}

const utils = {
    install(Vue) {
        // TODO: とりあえず
        Vue.prototype.$gideData = gideData;

        Vue.prototype.$isReleaseLeaf = function(obj) {
            return typeof obj === "string";
        };

        Vue.prototype.$uniqueId = function() {
            return Date.now().toString(16) +
                Math.floor(0xFFFF * Math.random()).toString(16);
        }
    }
};

Vue.use(utils);
Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
})

Vue.config.devtools = true