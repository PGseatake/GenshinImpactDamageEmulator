export const state = () => ({
    data: {
        chara: [],
        sword: [],
        claymore: [],
        polearm: [],
        polearm: [],
        bow: [],
        catalyst: [],
        flower: [],
        feather: [],
        sands: [],
        goblet: [],
        circlet: [],
    },
    page: "",
    append: false,
})

export const mutations = {
    setData(state, data) {
        state.data = data;
    },

    setPage(state, value) {
        state.page = value;
    },

    setAppend(state, value) {
        state.append = value;
    },
}