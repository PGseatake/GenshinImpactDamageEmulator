// export default function({ isHMR, app, store, route, params, error, redirect }) {
//     const defaultLocale = app.i18n.fallbackLocale

//     if (isHMR) { return }

//     const locale = params.lang || defaultLocale
//     if (!store.state.locales.includes(locale)) {
//         return error({ message: 'This page could not be found.', statusCode: 404 })
//     }

//     store.commit('setLang', locale)
//     app.i18n.locale = store.state.locale

//     if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
//         const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '')
//         const re = new RegExp(toReplace)
//         console.log(route.fullPath.replace(re, '/'));
//         return redirect(
//             route.fullPath.replace(re, '/')
//         )
//     }
// }