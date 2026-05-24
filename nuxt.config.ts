// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,

  modules: ['@nuxtjs/tailwindcss'],

  css: ['bootstrap/dist/css/bootstrap.min.css'],

  runtimeConfig: {
    public: {
      apiBase: 'https://api.mawtin.net/api/v1'
    }
  },

  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  },

  devServer: {
    port: 3000
  }
})