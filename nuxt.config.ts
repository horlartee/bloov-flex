// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Ibloov Flex-It",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          // crossorigin:true
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  },

  modules: ["nuxt-icons", "@pinia/nuxt"],
  components: true,
  css: ["~/assets/css/main.css", "vue-toastification/dist/index.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_ENDPOINT_URL,
    },
  },

  devServer: {
    port: 3000,
  },

  compatibilityDate: "2024-11-25",
});