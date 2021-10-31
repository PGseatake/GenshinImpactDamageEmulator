export const state = () => ({
    page: "",
    append: false,
    appendable: true,
    popupText: "",
})

export const mutations = {
    setPage(state, value) {
        state.page = value;
    },
    setAppend(state, value) {
        if (state.appendable) {
            state.append = value;
        }
    },
    setAppendable(state, value) {
        state.appendable = value;
    },
    setPopupText(state, value) {
        state.popupText = value;
    },
}