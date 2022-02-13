export const state = () => ({
    page: "",
    tab: {
        type: "",
        items: [],
        bonus: -1,
        weapon: 0,
        artifact: 0,
        damage: -1,
        howto: 0,
    },
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
    },
    tab(state) {
        return state.tab[state.tab.type];
    },
    tabs(state) {
        return state.tab.items;
    },
    tabable(state) {
        return !!state.tab.items.length;
    },
}

export const mutations = {
    page(state, value) {
        state.page = value;
    },
    tab(state, value) {
        state.tab[state.tab.type] = value;
    },
    tabs(state, payload) {
        state.tab.type = payload.tab || "";
        state.tab.items.splice(0);
        if (payload.items) {
            state.tab.items.push(...payload.items);
        }
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