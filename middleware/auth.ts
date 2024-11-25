import { useAuthStore } from "~/store/auth"
export default defineNuxtRouteMiddleware((to:any) => {
    const authStore = useAuthStore()
    const token = authStore.getToken
    const user = authStore.getUser    
    
    const isValidUser = user?.isEmailVerified
    const guardedRoutes = ["/", "/create-event"]

    if(guardedRoutes.includes(to.path) && !token){
        return navigateTo("/auth")
    }
    if(guardedRoutes.includes(to.path) && token && !isValidUser){
        return navigateTo("/auth/verify")
    }

})