import Vue from 'vue';
import Vuetify from 'vuetify/lib'

// TODO: とりあえず
export let gideData = {
    sword: [{
            id: "4g94y4hie",
            name: "AquilaFavonia",
            comment: "長めのコメント",
            level: "12",
            rank: 1,
            atk: 23,
            second: { type: "phys_dmg", value: 2.0 },
        },
        {
            id: "iuynegrxmg",
            name: "SummitShaper",
            comment: "test",
            level: "12",
            rank: 1,
            atk: 23,
            second: { type: "atk_buf", value: 3.2 },
        },
    ],
    claymore: [{
            id: "evrtv4xj8t4k",
            name: "SkywardPride",
            comment: "長めのコメント",
            level: "12",
            rank: 1,
            atk: 23,
            second: { type: "en_rec", value: 2.0 },
        },
        {
            id: "wvx74tvf8t4",
            name: "SacrificialGreatsword",
            comment: "test",
            level: "12",
            rank: 5,
            atk: 23,
            second: { type: "en_rec", value: 3.2 },
        },
    ],
    polearm: [{
            id: "wenikfvc497xyb",
            name: "StaffHoma",
            comment: "長めのコメント",
            level: "12",
            rank: 1,
            atk: 23,
            second: { type: "cri_dmg", value: 2.0 },
        },
        {
            id: "iuynegrxmg",
            name: "PrototypeGrudge",
            comment: "test",
            level: "12",
            rank: 5,
            atk: 23,
            second: { type: "en_rec", value: 3.2 },
        },
    ],
    polearm: [{
            id: "wenikfvc497xyb",
            name: "StaffHoma",
            comment: "長めのコメント",
            level: "12",
            rank: 1,
            atk: 23,
            second: { type: "cri_dmg", value: 2.0 },
        },
        {
            id: "iuynegrxmg",
            name: "PrototypeGrudge",
            comment: "test",
            level: "12",
            rank: 5,
            atk: 23,
            second: { type: "en_rec", value: 3.2 },
        },
    ],
    bow: [{
            id: "c84mcb94yx",
            name: "AmosBow",
            comment: "長めのコメント",
            level: "12",
            rank: 1,
            atk: 23,
            second: { type: "atk_buf", value: 2.0 },
        },
        {
            id: "cvn74ytvm7x4y",
            name: "Stringless",
            comment: "test",
            level: "12",
            rank: 5,
            atk: 23,
            second: { type: "elem", value: 32 },
        },
    ],
    catalyst: [{
            id: "gn4ygf7y4bf",
            name: "SkywardAtlas",
            comment: "長めのコメント",
            level: "12",
            rank: 1,
            atk: 23,
            second: { type: "atk_buf", value: 2.0 },
        },
        {
            id: "wexn9f47ybf",
            name: "WineAndSong",
            comment: "test",
            level: "12",
            rank: 5,
            atk: 23,
            second: { type: "en_rec", value: 32 },
        },
    ],
    flower: [{
            id: "aesciugb",
            name: "Adventurer",
            comment: "長めのコメント",
            star: 4,
            level: "12",
            main: { type: "hp", value: 32 },
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
            main: { type: "hp", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
    ],
    feather: [{
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
    ],
    sands: [{
            id: "7nhgxt7g4m",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "atk_buf", value: 32 },
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
            main: { type: "elem", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
    ],
    goblet: [{
            id: "xv8nh34j6r",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "phys_dmg", value: 32 },
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
            main: { type: "pyro_dmg", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
    ],
    circlet: [{
            id: "wefrx8g",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "cri_rate", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
        {
            id: "unygt94gmt",
            name: "Adventurer",
            comment: "",
            star: 4,
            level: "12",
            main: { type: "cri_dmg", value: 32 },
            sub1: { type: "atk_buf", value: 6.5 },
            sub2: { type: "def_buf", value: 12.5 },
            sub3: { type: "elem", value: 12 },
            sub4: { type: "cri_rate", value: 2.5 },
        },
    ]
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