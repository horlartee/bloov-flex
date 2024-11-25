<template>
  <app-modal @close="$emit('close')">
    <template #modal-title>
      <div class="flex flex-col items-center gap-y-4">
        <nuxt-icon name="check-circle" class="text-4xl" filled />
        <h3 class="leading-6 font-semibold text-black text-center text-xl">
          Event Created Successfully
        </h3>
      </div>
    </template>

    <template #modal-content>
      <div class="flex flex-col">
        <p class="text-center">
          Hurray! Your event has been created successfully. Copy the link below
          to share your event
        </p>

        <div
          class="flex items-center justify-center pt-4 w-full"
          @click="copyToClipBoard"
        >
          <nuxt-icon name="copy" class="text-2xl" filled />
          {{ eventLink }}
        </div>
      </div>
    </template>
    <template #modal-action-bar> </template>
  </app-modal>
</template>

<script lang="ts" setup>
import { useClipboard, useBrowserLocation } from "@vueuse/core";

const emit = defineEmits(["close", "copied"]);

const props = defineProps({
  eventLinkId: String,
});

const location = useBrowserLocation();
const eventLink = `${location.value.origin}/${props.eventLinkId}`;

const copyToClipBoard = () => {
  const source = ref(eventLink);
  const { copy, copied } = useClipboard();
  copy(source.value);

  if (copied) {
    emit("copied");
  }
};
</script>
