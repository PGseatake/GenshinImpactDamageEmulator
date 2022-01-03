import colors from 'vuetify/es5/util/colors';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    headAttrs: { prefix: "og: http://ogp.me/ns#" },
    titleTemplate: '%s',
    title: '原神 ダメージエミュレーター',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-site-verification', content: 'KlYYIXpwQoIznlz7DbJGnuS-q56mYN0JBxOpURUrRLU' },
      { name: 'msvalidate.01', content: '2434296E4CC211BBCF7B8E71F6A60AB7' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/utils.js',
  ],

  publicRuntimeConfig: {
    HOSTNAME: process.env.HOSTNAME || 'http://localhost:3000',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-i18n', {
      baseUrl: (process.env.HOSTNAME || 'http://localhost:3000') + '/GenshinImpactDamageEmulator',
      detectBrowserLanguage: false,
      locales: [
        { code: 'ja', name: '日本語', iso: 'ja-JP', file: 'ja.json' },
        { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' }
      ],
      defaultLocale: 'ja',
      langDir: 'locales/',
      strategy: 'prefix_and_default',
      vueI18n: {
        fallbackLocale: 'ja'
      },
      vueI18nLoader: true,
      lazy: true,
      seo: false,
    }],
    // ['@nuxtjs/sitemap', {
    //   path: '/sitemap.xml',
    //   hostname: process.env.HOSTNAME || 'http://localhost:3000',
    //   i18n: true,
    //   defaults: {
    //     lastmod: new Date(),
    //   }
    // }],
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    // defaultAssets: {
    //   icons: false,
    // },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.lighten2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten2,
          warning: colors.amber.base,
          error: colors.deepOrange.accent3,
          success: colors.green.accent3
        }
      }
    }
  },

  typescript: {
    ignoreNotFoundWarnings: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },
  },

  router: {
    base: '/GenshinImpactDamageEmulator/',
    middleware: 'route'
  },

  generate: {
  }
};
