export const state = () => ({
    locales: ['en', 'ja'],
    locale: 'ja'
})

export const mutations = {
    toggleSidebar(state) {
        state.sidebar = !state.sidebar
    },
    SET_LANG(state, locale) {
        if (state.locales.includes(locale)) {
            state.locale = locale
        }
    }
}
