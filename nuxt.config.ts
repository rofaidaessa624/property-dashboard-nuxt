export default defineNuxtConfig({
  devtools: { enabled: false }, // 🔥 تعطيل DevTools
  
  ssr: false,
  
  modules: ['@nuxtjs/tailwindcss'],
  
  css: ['bootstrap/dist/css/bootstrap.min.css'],
  
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api/v1'
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
  },
  
  compatibilityDate: '2024-01-01'
})