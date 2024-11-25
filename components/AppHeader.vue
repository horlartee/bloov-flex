<template>
  <nav class="header-container w-full h-16 flex items-center">
    <div class="container mx-auto px-2 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img class="w-12" src="@/assets/icons/app-logo.svg" alt="Logo" />
        <nuxt-icon name="ticket" class="text-2xl" filled />
      </div>
      <div>
        <p class="font-semibold text-lg">Flex-It</p>
      </div>
      <div class="flex items-center space-x-4">
        <span class="cursor-pointer">
          <nuxt-icon name="notification" class="text-2xl" filled />
        </span>
        <span class="cursor-pointer">
          <nuxt-icon name="avatar" class="text-2xl" filled />
        </span>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.header-container {
  background: var(--lillie, linear-gradient(45deg, #e9defa 0%, #fff6eb 100%));
}
</style>
