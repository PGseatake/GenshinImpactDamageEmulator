export const state = () => ({
    page: "",
    append: false,
})

export const mutations = {
    toggleSidebar(state) {
        state.sidebar = !state.sidebar
    },

    appendData(state, value) {
        state.append = value;
    },
}