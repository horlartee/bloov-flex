<template>
<div>
    <label v-if="label" :for="label">{{label}}</label>
    
    <!-- Password input -->
    <div v-if="type == 'password'" class="input mt-2 bg-white px-3 py-[6px] rounded-md flex items-center passwordCover duration-200 border-2 border-gray-300">
            <input 
            v-model="value"
    :type="showPassword? 'text': 'password'" 
    :id="label || ''" 
    class="w-full caret-secondary-bold focus:text-secondary-bold duration-200 outline-none text-stone-600" :placeholder="placeholder|| ''"
    :class="{
        'border-red-500': error
    }" 
    @blur="checkError()"
    :required="required || false"
    />
    <img @click="togglePassword" :src="showPassword? '/icons/close-eye.png':'/icons/open-eye.png'" alt="" class="h-7 cursor-pointer">
    </div>
    <input 
    v-else
    v-model="value"
    :type="type || 'text'" 
    :id="label || ''" 
    class="input w-full px-4 py-2 caret-secondary-bold focus:text-secondary-bold duration-200 bg-white border-2  border-gray-300 rounded-md outline-none mt-2 text-stone-600" :placeholder="placeholder|| ''"
    :class="{
        'border-red-500': error
    }" 
    @blur="checkError()"
    :required="required || false"
    />

    <!-- Error message -->
    <p v-if="error" class="text-red-500 text-xs duration-200">{{error}}</p>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// props
//
type propType = {
    type: string,
    placeholder: string,
    label: string,
    modelValue: string,
    required: boolean,
    errorMessage: string  
}
const props = defineProps<propType>()
// emits
const emits = defineEmits(["update:modelValue"])
// Value
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

// error
const error = ref("")
function checkError(){
    if( props.type == "email" && !isValidEmail(value.value) && props.required){
        error.value = props.errorMessage || "Please enter a valid email address"
        return
    }else {
        error.value = ""
    }
    if(props.type == "text" && value?.value.length <= 2 && props.required){
        error.value = props.errorMessage || "This field is required"
        return
    }else {
        error.value = ""
    }
    if(props.type == "password" && value?.value.length < 8 && props.required){
        error.value = props.errorMessage || "Password must be at least 8 characters"
        return
    }else {
        error.value = ""
    }
}

//password
const showPassword = ref(false)

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

</script>

<style scoped>
.passwordCover:has(input:focus){
    border: 2px solid transparent;
     background-image: linear-gradient(white, white), 
                    linear-gradient(to right, #296ff9 , #6419cf);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
input::-ms-reveal,
input::-ms-clear {
  display: none;
}
.input:focus{
    border: double 2px  transparent;
      background-image: linear-gradient(white, white), 
                    linear-gradient(to right, #296ff9 , #6419cf);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
</style>