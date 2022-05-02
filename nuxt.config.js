export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-bulat-graduate-work',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~assets/scss/style.scss'
  ],

  plugins: [
    '~/plugins/formatters',
    '~/plugins/axios',
    '~/plugins/event-bus',
    '~/plugins/vuelidate',
    { src: '~/plugins/context-menu', mode: 'client' }
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: [
      '~/assets/scss/_mixins.scss',
      '~/assets/scss/_style_resources.scss'
    ]
  },

  axios: {
    credentials: true,
    baseURL: 'http://localhost:8080'
  },

  router: {

  },

  server: {
    // host: '0.0.0.0',
    port: 4000
  },

  build: {
  }
}
