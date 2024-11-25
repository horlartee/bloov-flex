<template>
  <div class="h-full md:min-h-screen max-w-2xl mx-auto">
    <div class="app-container h-full fixed w-full">
      <section
        class="relative !h-full min-h-screen bg-gradient-to-tr from-primary-lighter to-secondary-lighter"
      >
        <header class="py-4 px-4">
          <BaseNavbar title />
        </header>

        <div
          class="text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div class="w-full max-w-xs mx-auto space-y-6">
            <h1 class="pb-10 text-3xl font-Pinyon">Welcome</h1>
            <button
              @click="router.push('/create-event')"
              class="p-4 w-full rounded-sm text-base text-white bg-primary-bold hover:bg-secondary-bold duration-300"
            >
              Create an Event
            </button>
            <button
              @click="router.push('/my-events')"
              class="p-4 w-full rounded-sm text-base bg-transparent border-2 border-primary-bold hover:bg-primary-bold hover:text-white duration-300"
            >
              See all your created events
            </button>
          </div>
        </div>
      </section>
    </div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

// Page meta
definePageMeta({
  middleware: "auth",
});

// General Variable
const router = useRouter();
</script>

<style scoped>
.app-container {
  background: linear-gradient(
    270deg,
    rgba(106, 17, 203, 0.05) 0%,
    rgba(37, 117, 252, 0.05) 100%
  );
  min-height: 100vh;
  height: 100%;
  max-width: 640px;
  margin: 0 auto;
}
</style>
