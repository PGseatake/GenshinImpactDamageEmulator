export const state = () => ({
    page: "",
    append: false,
    popupText: "",
})

export const mutations = {
    setPage(state, value) {
        state.page = value;
    },
    setAppend(state, value) {
        state.append = value;
    },
    setPopupText(state, value) {
        state.popupText = value;
    },
}