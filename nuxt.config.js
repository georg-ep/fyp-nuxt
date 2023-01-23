export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'fyp-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/global.scss"],

  googleFonts: {
    download: true,
    families: {
      "Space Grotesk": true,
    },
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vuelidate.js"},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    [
      "@nuxtjs/dotenv",
      { filename: process.env.ENV ? `.env.${process.env.ENV}` : ".env" },
    ],
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    "@nuxtjs/auth"
  ],

  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
    },
    strategies: {
      local: {
        token: {
          type: "Bearer",
          maxAge: 1,
        },
        endpoints: {
          login: {
            url: "/users/auth/",
            method: "POST",
            propertyName: "access",
          },
          user: {
            url: "/users/detail/",
            method: "GET",
            propertyName: false,
            autoFetch: false,
          },
          logout: false,
        },
      },
    }
  },

  router: {
    middleware: ["auth"],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
