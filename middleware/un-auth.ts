import { useAuthStore } from "~/store/auth"
export default defineNuxtRouteMiddleware((to:any) => {
    const authStore = useAuthStore()
    const token = authStore.getToken
    const user = authStore.getUser    
    
    const isValidUser = user?.isEmailVerified
    
    if(to.path == "/auth" && token){
        return navigateTo("/")
    }
 
    if(to.path == "/auth/verify" && token && isValidUser){
        return navigateTo("/")
    }

})