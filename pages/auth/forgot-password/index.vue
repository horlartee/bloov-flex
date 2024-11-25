<template>
    <main class="py-10 min-h-screen">
        <section class="w-[90%] mx-auto">

        <div @click="goBack" class="cursor-pointer">
            <nuxt-icon name="arrow-left" class="text-lg" filled />
        </div>
        <div>
        <div class="bg-white rounded-lg p-4 w-fit mx-auto mt-8 xxs:mt-12">
            <nuxt-icon v-if="isPassword" name="lock" class="text-2xl text-[#344054]" filled  />
            <nuxt-icon v-else name="key" class="text-2xl text-[#344054]" filled  />
        </div>
        <div class="text-center pt-8">
            <h2 v-if="isPassword" class="font-bold text-2xl">Set new password</h2>
            <h2 v-else class="font-bold text-2xl">Forgot password?</h2>
            <p v-if="isPassword" class="py-1">Your new password must be different to previously used passwords.</p>
            <p v-else class="py-1">No worries, we’ll send you reset instructions.</p>
        </div>

        </div>
        <FormPasswordForgot v-if="isPassword"/>
        <form v-else class="mt-6 xxs:mt-12" @submit.prevent="submitForm">
        <div >
            <ReuseInput label="Email" type="email" placeholder="Enter your email" required errorMessage="Please enter valid email address" v-model="email" class="text-sm" />
        </div>
        <div class="mt-6">
            <BaseButtonGradient type="submit" :loading="false"><span>Reset password</span></BaseButtonGradient>
        </div>
        </form>
        </section>

    </main>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {useRouter, useRoute} from "vue-router"

definePageMeta({
    layout: 'auth',
})


// General Variable
const router = useRouter()
const route = useRoute()
const { $toast } = useNuxtApp();

const isPassword = computed(()=> {
    return route.query?.password
})

// Form
const email = ref("")

function submitForm(){
    if(!isValidEmail(email.value)){
        $toast.error("Invalid email",{timeout: 1000})
        return
    }
    localStorage.setItem("email", email.value)
    router.push({query: {password:"password"}})
}
function goBack(){
    if(isPassword.value){
        router.push({query: {}})
        return
    }
    router.back()
}

</script>

