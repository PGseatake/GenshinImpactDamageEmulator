import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
    app.i18n = new VueI18n({
        locale: store.state.locale,
        fallbackLocale: 'ja',
        messages: {
            ja: { ...require('~/locales/ja/message.json'), ...require('~/locales/ja/releasenote.json') },
            en: { ...require('~/locales/en/message.json'), ...require('~/locales/ja/releasenote.json') },
        }
    })
}
