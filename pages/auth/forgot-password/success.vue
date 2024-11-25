<template>
<main class="h-full">
    <div class="py-16 w-[90%] mx-auto min-h-screen flex flex-col justify-evenly ">
        <div class="text-center ">
            <div class="bg-white rounded-lg p-4 w-fit mx-auto mb-6 xxs:mb-12">
                <nuxt-icon name="check-circle" class="text-2xl" filled />           
            </div>
            <h1 class="font-bold text-2xl">Password reset</h1>
            <p class="py-1">Your password has been successfully reset. Click below to log in magically.</p>
        </div>
        <div>
            <BaseButtonGradient :loading="false" @click="router.push('/auth')">Log In</BaseButtonGradient>
        </div>
    </div>
</main>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

// General Variable
const router = useRouter()

// define page meta
definePageMeta({
    layout: "auth",
})
</script>