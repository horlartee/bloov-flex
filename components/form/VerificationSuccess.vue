<template>
    <div class="py-16 px-4 min-h-screen flex flex-col justify-evenly ">
        <div class="text-center ">
            <div class="bg-white rounded-lg p-4 w-fit mx-auto mb-6 xxs:mb-12">
                <nuxt-icon name="check-circle" class="text-2xl" filled />
            </div>
            <h1 class="font-bold text-2xl">Email Verified</h1>
            <p class="py-1">Your email password has been successfully verified. Click below to log in.</p>
        </div>
        <div>
            <button @click="goHome" class="w-full py-[11px] font-medium bg-gradient-to-r from-primary-bold to-secondary-bold text-white rounded-md">
            Continue
        </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";

// General Variable
const router = useRouter()

   function goHome(){
        router.replace({path: '/'})
   }
</script>