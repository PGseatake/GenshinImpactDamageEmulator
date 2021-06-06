export const state = () => ({
    page: "",
    append: false,
})

export const mutations = {
    setPage(state, value) {
        state.page = value;
    },
    setAppend(state, value) {
        state.append = value;
    },
}