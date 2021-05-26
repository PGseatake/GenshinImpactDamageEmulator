export const state = () => ({
    locales: ['en', 'ja'],
    locale: 'ja',
    append: false,
})

export const mutations = {
    toggleSidebar(state) {
        state.sidebar = !state.sidebar
    },

    setLang(state, locale) {
        if (state.locales.includes(locale)) {
            state.locale = locale
        }
    },

    appendData(state, value) {
        state.append = value;
    },
}