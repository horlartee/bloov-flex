<template>
  <form @submit.prevent="submitForm">
    <div>
      <ReuseInput
        label="Name*"
        type="text"
        placeholder="Enter your name"
        required
        errorMessage="Please enter your name"
        v-model="formData.fullName"
        class="text-base"
      />
    </div>
    <div class="mt-5">
      <ReuseInput
        label="Email*"
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
        label="Password*"
        type="password"
        placeholder="Create a password"
        required
        errorMessage="Password must be at least 8 characters"
        v-model="formData.password"
        class="text-base"
      />
      <p
        v-if="formData.password == ''"
        class="text-stone-500 text-xs duration-300"
      >
        Must be at least 8 characters.
      </p>
    </div>
    <div class="flex items-center space-x-2 text-xs mt-4">
      <input type="checkbox" v-model="formData.terms" class="cursor-pointer" />
      <p class="">Accept terms and conditions</p>
    </div>
    <div class="mt-5">
      <button
        class="w-full py-[11px] font-medium bg-gradient-to-r from-primary-bold to-secondary-bold text-white rounded-md"
      >
        <WhiteLoader v-if="loading" class="h-5 w-5" />
        <span v-else>Get Started</span>
      </button>
      <div class="mt-5">
        <div
          class="flex items-center justify-center space-x-4 py-[10px] w-full rounded-md bg-white border-2 border-gray-300"
        >
          <nuxt-icon name="google" class="text-2xl" filled />
          <p>Sign up with google</p>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import WhiteLoader from "@/components/base/WhiteLoader.vue";
import { reactive, ref } from "vue";
import { SignUp } from "@/types/forms";
import { useAuthStore } from "@/store/auth";
const { $toast } = useNuxtApp();
import { useRouter } from "vue-router";

// General Variable
const authstore = useAuthStore();
const router = useRouter();

// form data
const formData = reactive<SignUp>({
  fullName: "",
  email: "",
  password: "",
  terms: false,
});

// submit form
const loading = ref(false);
async function submitForm() {
  if (formIsInvalid()) {
    return;
  }
  loading.value = true;
  try {
    await authstore.SIGN_UP(formData);
    $toast.success("Account created successfully", { timeout: 1500 });
    localStorage.setItem("password", formData.password);
    router.push({ path: "auth/verify" });
  } catch (error) {
    $toast.error(error.message || "Unable to create account", {
      timeout: 1500,
    });
  }
  loading.value = false;
}
function formIsInvalid() {
  if (formData.fullName == "" || formData?.fullName?.length <= 2) {
    $toast.error("Please enter your name", { timeout: 1500 });
    return true;
  } else if (formData.email == "" || !isValidEmail(formData.email)) {
    $toast.error("Please enter valid email address", { timeout: 1500 });
    return true;
  } else if (formData.password == "" || formData?.password?.length <= 7) {
    $toast.error("Please enter strong password", { timeout: 1500 });
    return true;
  } else if (formData.terms == false) {
    $toast.error("Please accept terms and conditions", { timeout: 1500 });
    return true;
  } else {
    return false;
  }
}
</script>
