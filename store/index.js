export const state = () => ({
    data: {
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
    },
    page: "",
    append: false,
})

export const mutations = {
    setData(state, data) {
        state.data = data;
    },
    appendData(state, { type, data }) {
        state.data[type].push(data);
    },
    deleteData(state, { type, id }) {
        const idx = state.data[type].findIndex((val) => val.id === id);
        if (0 <= idx) {
            state.data[type].splice(idx, 1);
        }
    },
    setPage(state, value) {
        state.page = value;
    },
    setAppend(state, value) {
        state.append = value;
    },
}