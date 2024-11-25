<template>
    <button v-bind="$attrs" class="w-full py-[11px] font-medium bg-gradient-to-r from-primary-bold to-secondary-bold text-white rounded-md">
        <WhiteLoader v-if="loading" class="h-5 w-5" />
        <span v-else>
            <slot></slot>
        </span>
    </button>
</template>

<script setup lang="ts">
import WhiteLoader from "@/components/base/WhiteLoader.vue"
defineProps<{
    loading: boolean
}>()

</script>