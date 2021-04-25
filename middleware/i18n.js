export default function ({ isHMR, app, store, route, params, error, redirect }) {
    const defaultLocale = app.i18n.fallbackLocale

    if (isHMR) { return }

    const locale = params.lang || app.i18n.locale || defaultLocale
    if (!store.state.locales.includes(locale)) {
        return error({ message: 'This page could not be found.', statusCode: 404 })
    }

    store.commit('SET_LANG', locale)
    app.i18n.locale = store.state.locale

    if (route.fullPath.indexOf('/' + locale) === 0) {
        const toReplace = '^/' + locale + (route.fullPath.indexOf('/' + locale + '/') === 0 ? '/' : '')
        const re = new RegExp(toReplace)
        return redirect(
            route.fullPath.replace(re, '/')
        )
    }
}
