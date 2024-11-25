import { defineStore } from "pinia";
import { AuthStateType } from "~/types/auth";
import { SignUp, EmailVerification, Login } from "~/types/forms";
import { User } from "~/types/auth";
import { useRouter } from "nuxt/app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: useCookie<User | null>("user").value,
    token: useCookie<string | null>("token").value,
  }),
  getters: {
    isAuthenticated(state: AuthStateType): boolean {
      return !!state.user;
    },
    getUser(state: AuthStateType) {
      return state.user;
    },
    getToken(state: AuthStateType): string | null {
      return state.token;
    },
  },
  actions: {
    async SIGN_UP(payload: SignUp): Promise<User | undefined> {
      try {
        const res = await useCustomFetch<{
          message: string;
          response: any;
        }>("/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        localStorage.setItem("OTPToken", res?.data?.value?.response?.OTPToken);
        localStorage.setItem("email", res?.data?.value?.response?.user?.email);
        return res?.data?.value?.response;
      } catch (error) {
        throw error;
      }
    },
    async VERIFY_ACCOUNT(
      payload: EmailVerification
    ): Promise<User | undefined> {
      try {
        const res = await useCustomFetch<{
          message: string;
          response: User | undefined;
        }>("/auth/verify-account", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        return res?.data?.value?.response;
      } catch (error) {
        throw error;
      }
    },
    async LOGIN(payload: Login): Promise<User | undefined> {
      try {
        const { data, error } = await useCustomFetch<{
          message: string;
          response: any | undefined;
        }>("/auth/login", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (error?.value?.statusCode == 417) {
          throw new Error("email not verified");
        }

        if (error.value) {
          throw new Error(error.value.data.message);
        }

        this.SAVE_USER_DATA({
          user: data?.value?.response?.user,
          token: data?.value?.response?.token,
        });
        return data?.value?.response?.user;
      } catch (error) {
        throw error;
      }
    },
    SAVE_USER_DATA(payload: { user: User; token: string }) {
      // save token
      const userToken = useCookie<string>("token");
      userToken.value = payload?.token;
      this.token = payload?.token;
      // save user
      const user = useCookie<User>("user");
      user.value = payload?.user;
      this.user = payload?.user;
    },
    async LOGOUT() {
      const { $toast } = useNuxtApp();
      const token = useCookie<string | null>("token");
      const user = useCookie<User | null>("user");
      token.value = null;
      user.value = null;
      this.user = null;
      this.token = null;
      $toast.info("Log out successful");
      useRouter().push("/auth");
    },
  },
});
