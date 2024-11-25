<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="relative z-50 block rounded-full overflow-hidden focus:outline-none"
    >
      <span v-html="value.htmlCode"></span>
      <!-- <nuxt-icon name="globe" class="text-2xl text-white" filled /> -->
    </button>
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-1 h-full w-full cursor-default"
    ></button>
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 py-2 w-20 bg-white rounded-lg shadow-xl"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="selectItem(option)"
        class="block cursor-pointer px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white text-center"
        v-html="option.htmlCode"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  options: {
    type: Array,
  },
  value: {},
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
