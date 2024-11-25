<template>
  <nav class="w-full flex items-center">
    <div class="container mx-auto flex items-center justify-between">
      <div @click="$router.push('/')" class="flex items-center space-x-4">
        <img class="w-12" src="@/assets/icons/app-logo.svg" alt="Logo" />
      </div>
      <div>
        <p v-if="title" class="font-semibold text-lg">Flex-It</p>
      </div>
      <div class="flex items-center space-x-4">
        <span class="cursor-pointer">
          <nuxt-icon
            name="notification"
            class="text-2xl"
            :class="{
              'text-white': color,
            }"
            filled
          />
        </span>
        <span @click="$router.push('/')" class="cursor-pointer">
          <nuxt-icon
            name="avatar"
            class="text-2xl"
            :class="{
              'text-white': color,
            }"
            filled
          />
        </span>
        <span
          v-if="!isObjectEmpty(authStore.getUser)"
          @click="authStore.LOGOUT()"
          class="cursor-pointer"
        >
          <nuxt-icon
            name="logout"
            class="text-2xl font-extrabold"
            :class="{
              'text-white': color,
            }"
            filled
          />
        </span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

defineProps({
  title: {
    type: Boolean,
    default: false,
  },
  color: {
    type: Boolean,
    default: false,
  },
});
</script>
