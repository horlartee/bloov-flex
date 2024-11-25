<template>
  <form @submit.prevent="submitForm">
    <div class="mt-5">
      <ReuseInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
        errorMessage="Please enter valid email address"
        v-model="formData.email"
        class="text-base"
      />
    </div>
    <div class="mt-5">
      <ReuseInput
        label="Password"
        type="password"
        placeholder="Create a password"
        required
        errorMessage="Password is required"
        v-model="formData.password"
        class="text-base"
      />
    </div>
    <div
      class="flex items-center justify-between space-x-2 text-xs xxs:text-sm mt-4"
    >
      <div class="flex items-center space-x-1">
        <input
          type="checkbox"
          v-model="formData.rememberMe"
          class="cursor-pointer"
        />
        <p>Remember for 30 days</p>
      </div>
      <p
        @click="router.push('/auth/forgot-password')"
        class="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-bold to-secondary-bold"
      >
        Forgot password?
      </p>
    </div>
    <div class="mt-5">
      <button
        class="w-full py-[11px] font-medium bg-gradient-to-r from-primary-bold to-secondary-bold text-white rounded-md"
      >
        <WhiteLoader v-if="loading" class="h-4 w-4" />
        <span v-else>Sign in</span>
      </button>
      <div class="mt-5">
        <div
          class="flex items-center justify-center space-x-4 py-[10px] w-full rounded-md bg-white border-2 border-gray-300"
        >
          <nuxt-icon name="google" class="text-2xl" filled />
          <p>Sign in with google</p>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import WhiteLoader from "@/components/base/WhiteLoader.vue";
import { reactive, ref } from "vue";
import { SignUp } from "~/types/forms";
import { useAuthStore } from "~/store/auth";
import { useRouter } from "vue-router";

// General Variable
const authStore = useAuthStore();
const router = useRouter();
const { $toast } = useNuxtApp();

// form data
const formData = reactive<SignUp>({
  email: "",
  password: "",
  rememberMe: false,
  fullName: "",
});

// submit form
const loading = ref(false);
async function submitForm() {
  loading.value = true;
  try {
    await authStore.LOGIN(formData);
    $toast.success("Login successful", { timeout: 1500 });
    router.push({ path: "/" });
  } catch (error) {
    if (error?.message === "email not verified") {
      $toast.error("Please verify your account", { timeout: 1500 });
      localStorage.setItem("email", formData.email);
      localStorage.setItem("password", formData.password);
      router.push({ path: "/auth/verify" });
      return;
    }
    $toast.error(error?.message || "Unable to login", { timeout: 1500 });
  }
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}
</script>
