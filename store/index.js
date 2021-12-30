export const state = () => ({
    page: "",
    append: false,
    appendable: true,
    importFile: null,
    importShow: false,
    exportFile: "GIDE.json",
    exportShow: false,
    popup: "",
    reload: false,
})

export const getters = {
    append(state) {
        return state.append;
    }
}

export const mutations = {
    page(state, value) {
        state.page = value;
    },
    append(state, value) {
        if (state.appendable) {
            state.append = value;
        }
    },
    appendable(state, value) {
        state.appendable = value;
    },
    importFile(state, value) {
        state.importFile = value;
    },
    importShow(state, value) {
        state.importShow = value;
    },
    exportFile(state, value) {
        state.exportFile = value;
    },
    exportShow(state, value) {
        state.exportShow = value;
    },
    popup(state, value) {
        state.popup = value;
    },
    reload(state) {
        state.reload = true;
    },
}