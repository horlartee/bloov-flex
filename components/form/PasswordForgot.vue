<template>
    <form @submit.prevent="submitForm">
        <div class="mt-5">
            <Input label="Password" type="password" placeholder="Enter new password" required errorMessage="Password must be at least 8 characters" v-model="formData.password" class="text-sm"/>
        </div>
        <div class="mt-5">
            <Input label="Confirm Password" type="password" placeholder="Confirm password" required errorMessage="Password must be at least 8 characters" v-model="formData.confirmPassword" class="text-sm"/>
        </div>
        <div class="text-xs mt-3">
            <div class="flex items-center space-x-2 py-2 duration-300">
                <img v-if="adequateLength" src="/icons/check-green.png" alt="check" class="w-4">
                <img v-else src="/icons/check-gray.png" alt="check" class="w-4">
                <p :class="{
                    'text-green-600': adequateLength
                }">Must be at least 8 characters</p>
            </div>
            <div class="flex items-center space-x-2">
                <img  v-if="hasSpecialChar" src="/icons/check-green.png" alt="check" class="w-4">
                <img v-else src="/icons/check-gray.png" alt="check" class="w-4">
                <p :class="{
                    'text-green-600': hasSpecialChar
                }">Must contain one special character</p>
            </div>
        </div>
         <div class="mt-6">
            <ButtonGradient type="submit" :loading="loading"><span>Reset password</span></ButtonGradient>
        </div>
    </form>
</template>

<script setup lang="ts">
import ButtonGradient from "@/components/base/ButtonGradient.vue";
import Input from "@/components/reuse/Input.vue";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";

// General Variable
const { $toast } = useNuxtApp();
const router = useRouter()

// Form
const formData = reactive({
    password: "",
    confirmPassword: "",
})
const loading = ref(false)
const email = computed(()=> {
    return localStorage.getItem("email")
})

    // submit form
async function submitForm() {
    if(!adequateLength.value || !hasSpecialChar.value){
        $toast.error("Invalid password",{timeout: 1000})
        return
    }
    if(formData.password !== formData.confirmPassword){
        $toast.error("Password doesn't match", {timeout: 1000});
        return
    }
    if (/\s/.test(formData.password)) {
        $toast.error("Password cannot contain space", {timeout: 1000});
        return
    }
    loading.value = true
    try {
        const data = {
            password: formData.password
        }
        console.log(formData)
        localStorage.removeItem("email")
        router.push({path: "/auth/forgot-password/success"})
    } catch (error:any) {
        console.log(error)
        $toast.success(error?.message || "Something went wrong", { timeout: 1500 })
    }
    loading.value = false
}

// Utils
const adequateLength = computed(()=> {
    return formData.password.length >= 8
})

const hasSpecialChar = computed(()=> {
    const re = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return re.test(formData.password)
})
</script>