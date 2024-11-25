<template>
  <main>
    <!-- <section class="> -->
    <form
      @submit.prevent="handleOTP"
      class="py-16 px-4 min-h-screen flex flex-col justify-evenly"
    >
      <div>
        <div class="bg-white rounded-lg p-4 w-fit mx-auto">
          <nuxt-icon name="mailbox" class="text-2xl" filled />
        </div>
        <div class="text-center pt-8">
          <h2 class="font-bold text-2xl">Check your mail</h2>
          <p class="py-1">We sent a verification code to {{ email }}</p>
        </div>
        <div class="my-6 mx-auto w-fit">
          <v-otp-input
            ref="otpInput"
            v-model:value="otp"
            input-classes="otp-input"
            separator=""
            class="!outline-none !rounded-md !text-2xl !font-bold"
            :num-inputs="4"
            :should-auto-focus="true"
            input-type="number"
            :conditionalClass="['one', 'two', 'three', 'four']"
            :placeholder="['_', '_', '_', '_']"
          />
        </div>
      </div>
      <div class="w-[90%] xxs:w-[80%] mx-auto">
        <button
          class="w-full py-[11px] font-medium bg-gradient-to-r from-primary-bold to-secondary-bold text-white rounded-md"
        >
          <WhiteLoader v-if="loading" class="h-5 w-5" />
          <span v-else>Verify email</span>
        </button>
        <p class="text-center py-6 text-xs xxs:text-sm">
          Didn’t receive the email?
          <span
            class="bg-gradient-to-r from-primary-bold to-secondary-bold text-transparent font-semibold bg-clip-text cursor-pointer"
            >Click to resend</span
          >
        </p>
      </div>
    </form>

    <!-- </section> -->
  </main>
</template>
<script setup lang="ts">
import WhiteLoader from "@/components/base/WhiteLoader.vue";
import { ref, computed, onMounted } from "vue";
import VOtpInput from "vue3-otp-input";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { EmailVerification, Login } from "@/types/forms";

// General Variable
const { $toast } = useNuxtApp();
const router = useRouter();
const authStore = useAuthStore();

// defines the page meta
definePageMeta({
  layout: "auth",
  middleware: ["un-auth"],
});

// Get User Details
const email = computed(() => {
  return localStorage.getItem("email");
});
const OTPToken = computed(() => {
  return localStorage.getItem("OTPToken");
});

// OTP
const otp = ref("");
const loading = ref(false);
async function handleOTP() {
  loading.value = true;
  try {
    if (otp.value.length !== 4 || isNaN(Number(otp.value))) {
      throw new Error("Invalid OTP");
    }
    if (!email.value) {
      throw new Error("Invalid email");
    }
    const data = <EmailVerification>{
      OTPCode: otp.value,
      OTPToken: OTPToken.value,
      email: email.value,
    };
    await authStore.VERIFY_ACCOUNT(data);
    await login();
    localStorage.removeItem("OTPToken");
    localStorage.removeItem("email");
    router.push({ path: "/auth/verification-status" });
  } catch (error: any) {
    console.log(error);
    $toast.error(error?.message || "Unable to verify account", {
      timeout: 1500,
    });
  }
  loading.value = false;
}
async function setOTP() {
  const otpInput: string = await navigator.clipboard.readText();
  if (otpInput?.length === 4 && !isNaN(Number(otpInput))) {
    otp.value = otpInput;
  }
}
async function login() {
  try {
    const data = <Login>{
      email: email.value,
      password: localStorage.getItem("password"),
      rememberMe: false,
    };
    await authStore.LOGIN(data);
  } catch (error: any) {
    $toast.info(error?.message || "You will be redirected to loin page", {
      timeout: 1500,
    });
    router.push({ path: "/auth" });
  }
}

onMounted(() => {
  document.addEventListener("focusin", setOTP);
  if (!email.value && !OTPToken.value) {
    router.push("/auth");
  }
});
</script>

<style>
.otp-input {
  aspect-ratio: 1;
  width: 50px;
  padding: 5px;
  margin: 0 10px;
  border: double 2px transparent;
  border-radius: 6px;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, #296ff9, #6419cf);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  outline: none;
  text-align: center;
  position: relative;
}

.otp-input[type="number"]::-webkit-inner-spin-button,
.otp-input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.otp-input::placeholder {
  background: linear-gradient(to right, #296ff9, #6419cf);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.otp-input:not(:placeholder-shown) {
  background: linear-gradient(to right, #296ff9, #6419cf),
    linear-gradient(white, white);
  background-origin: border-box;
  -webkit-background-clip: text, padding-box, border-box;
  background-clip: text, padding-box, border-box;
  -webkit-text-fill-color: transparent;
}
</style>
