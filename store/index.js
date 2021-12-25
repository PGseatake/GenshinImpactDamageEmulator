export const state = () => ({
    page: "",
    append: false,
    appendable: true,
    popupText: "",
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
    popupText(state, value) {
        state.popupText = value;
    },
}
