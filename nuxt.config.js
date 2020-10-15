import { createSEOMeta } from './utils/seo';
import appConfig from './config';

export default {
  mode: 'universal',
  head: {
    title: 'יקטרינה קורפין',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...createSEOMeta({
        title: 'יקטרינה קורפין',
        description: 'הזמנות חתונה, בר ובת מצווה',
        image: '/logo.png',
        url: ''
      })
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
  plugins: ['@/plugins/i18n.js', '@/plugins/directives.js', '@/plugins/toKebabCase.js', '@/plugins/sanitize.js'],
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
  modules: ['@nuxtjs/axios', 'nuxt-i18n', 'v-sanitize/nuxt'],
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
  publicRuntimeConfig: {
    baseURL: appConfig.base
  },
  generate: {
    // When generated files are produced, async functions or serverPrefetches don't correctly populate the Nuxt context
    // change interval according to the size of the project
    interval: 1000
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
  },
  /*
   ** environment variables client side
   */
  env: {
    ...appConfig
  }
};
