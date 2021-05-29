export const state = () => ({
    page: "",
    append: false,
})

export const mutations = {
    toggleSidebar(state) {
        state.sidebar = !state.sidebar
    },

    setPage(state, value) {
        state.page = value;
    },

    setAppend(state, value) {
        state.append = value;
    },
}