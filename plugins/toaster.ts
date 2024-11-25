import Toaster, { useToast, PluginOptions } from "vue-toastification";

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {};
  nuxtApp.vueApp.use(Toaster, options);
  return {
    provide: {
      toast: useToast(),
    },
  };
});
