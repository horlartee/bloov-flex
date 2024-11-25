<template>
    <main class="pt-10 h-screen">
            <img class="w-12 h-8 mx-auto" src="@/assets/icons/app-logo.svg" alt="Logo" />
            <div class="mt-8 text-center">
                <h1 class="font-bold text-2xl">{{isSignup?"Create an account": "Log in to your account"}}</h1>
                <p class="py-2">{{isSignup?"Create events in seconds.": "Welcome back! Please enter your details."}}</p>
            </div>
            <div class="pt-10 pb-16 w-[90%] mx-auto">
            <FormSignup v-if="isSignup"/>
            <FormLoginForm v-else/>

            <div class="mt-8 text-center">
                <p class="text-sm">{{isSignup?"Already have an account?" :"Don’t have an account?"}} <span class="cursor-pointer font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-bold to-secondary-bold" @click="toggleForm">{{isSignup?"Log in": "Sign up"}}</span></p>
            </div>
            </div>
    </main>
</template>

<script setup lang="ts">
// Imports packages
import { ref, computed } from "vue";

// defines the page meta
definePageMeta({
    layout: "auth",
    middleware: ["un-auth"]
})

// Determine which auth form to show
const formVisible = ref("signup");
const isSignup = computed(()=> formVisible.value == "login");
function toggleForm(){
    formVisible.value = formVisible.value == "signup" ? "login" : "signup";
}


</script>