<template>
  <main class="px-4 pb-10 h-full">
    <header class="py-6">
      <BaseNavbar title />
    </header>
    <div class="text-sm">
      <div @click="$router.push('/')" class="cursor-pointer">
        <nuxt-icon name="arrow-left" class="text-2xl text-black" filled />
      </div>
      <h2 class="py-2 text-stone-600">Creating event take less than 3mins</h2>
    </div>
    <div class="my-6">
      <FormCreateEventForm />
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "auth",
});
</script>
