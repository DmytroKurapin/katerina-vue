export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/i18n.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/composition-api',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-i18n'
  ],
  // todo make baseUrl dynamic for dev and prod
  axios: {
    baseURL: 'http://localhost:3000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },
  i18n: {
    locales: [
      {
        code: 'he',
        name: 'עברית',
        dir: 'rtl',
        file: 'he-IL.json'
      },
      {
        code: 'en',
        name: 'English',
        dir: 'ltr',
        file: 'en-US.json'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    vueI18nLoader: true,
    defaultLocale: 'he',
    vueI18n: { fallbackLocale: 'he' }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
    extend() {}
  },
  /*
   ** typescript runtime lint
   */
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
};
