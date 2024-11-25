<!-- Todo: Refactor Component into one base Select component and use scoped slots -->
<template>
  <div class="relative z-30">
    <button
      @click="isOpen = !isOpen"
      class="relative z-50 block overflow-hidden focus:outline-none"
    >
      <slot name="identifier"></slot>
    </button>
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-1 h-full w-full cursor-default"
    ></button>
    <div
      v-if="isOpen"
      class="absolute left-0 mt-2 py-2 w-20 bg-white rounded-lg shadow-xl"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="selectItem(option)"
        :class="{
          'bg-indigo-500': option.iso3CountryCode === value?.iso3CountryCode,
        }"
        class="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white text-center"
      >
        <nuxt-icon :name="`flags/${option?.iso3CountryCode}`" filled />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { Currency } from "~/types";

defineProps({
  options: {
    type: Array as PropType<Currency[]>,
    required: true,
  },
  value: {
    type: Object as PropType<Currency | null>,
    required: true,
  },
});
const isOpen = ref(false);

const emit = defineEmits(["select"]);

const handleEscape = (e: { key: string }) => {
  if (e.key === "Esc" || e.key === "Escape") {
    isOpen.value = false;
  }
};
document.addEventListener("keydown", handleEscape);

const selectItem = (item: any) => {
  emit("select", item);
  isOpen.value = false;
};
</script>
