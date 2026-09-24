export default defineNuxtConfig({
  srcDir: 'src/',
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    sessionPassword: ''
  },
  app: {
    head: {
      title: 'Nuxt Login Test'
    }
  }
})