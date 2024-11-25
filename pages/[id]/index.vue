<template>
  <div class="app-container h-full">
    <BaseNavbar title class="p-4 md:p-6" />

    <div class="space-y-8 py-8 px-6">
      <!-- Image -->
      <div class="image-container relative">
        <img
          :src="eventBanner"
          alt="Event banner"
          class="aspect-auto min-h-[300px]"
        />
        <div
          @click="$router.push('/')"
          class="icon-container absolute top-8 left-4"
        >
          <nuxt-icon name="arrow-left" class="text-lg text-white" filled />
        </div>
        <div @click="shareEvent" class="icon-container absolute top-8 right-4">
          <nuxt-icon name="share" class="text-lg" filled />
        </div>
      </div>

      <div class="space-y-10">
        <!-- Title and Description -->
        <div class="space-y-4">
          <h2
            class="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-[#6A11CB] from-[#2575FC]"
          >
            {{ eventInfo?.title }}
          </h2>
          <p class="text-[#475467] text-base">
            {{ eventInfo?.description }}
          </p>
          <p class="text-[#475467]">
            Hosted by
            <span
              class="text-transparent bg-clip-text bg-gradient-to-l from-[#6A11CB] to-[#2575FC]"
              >{{ eventInfo?.createdBy.fullName }}</span
            >
          </p>
        </div>

        <!-- Calendar -->
        <div>
          <div
            class="bg-gradient-to-l from-[#6A11CB] to-[#2575FC] rounded-lg p-4 w-full flex items-center gap-x-6"
          >
            <nuxt-icon
              name="calendar/calendar-regular"
              class="text-3xl text-white"
              filled
            />
            <div class="flex flex-col text-white">
              <span class="font-medium">{{ formattedEventDate }}</span>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <button
            v-if="isUserCurrentEventOwner"
            @click="$router.push(`/${$route.params.id}/event-dashboard`)"
            class="text-center block mt-4 bg-slate-200 w-full p-4 rounded-lg"
          >
            View Event Payment Dashboard
          </button>

          <button
            @click="$router.push(`/${$route.params.id}/pay`)"
            class="bg-gradient-to-l from-[#6A11CB] to-[#2575FC] rounded-lg p-4 w-full text-white text-lg font-semibold border border-[#6A11CB] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserEvent } from "@/types/event";
import { formatDate } from "@vueuse/core";
import { useClipboard, useBrowserLocation } from "@vueuse/core";
import { useAuthStore } from "~/store/auth";

const route = useRoute();
const router = useRouter();
const { $toast } = useNuxtApp();
const authStore = useAuthStore();

const eventInfo = ref<UserEvent | null>(null);

const eventBanner = computed(() =>
  eventInfo.value?.banner ? eventInfo.value?.banner : "/event-banner.jpeg"
);

const loadEvent = async () => {
  const { data } = await useCustomFetch<{
    message: string;
    response: UserEvent;
  }>(`event/link/${route.params.id}`);

  if (!!data.value) {
    eventInfo.value = data.value?.response;
    return;
  }

  $toast.error("There was an issue with fetching the event, try again later");
  router.go(-1);
};
await loadEvent();

const formattedEventDate = computed(() =>
  formatDate(
    new Date(eventInfo.value?.startTime as string),
    "dddd D MMMM, YYYY"
  )
);

const shareEvent = () => {
  const location = useBrowserLocation();
  const eventLink = `${location.value.origin}/${eventInfo.value?.linkId}`;
  const source = ref(eventLink);
  const { copy, copied } = useClipboard();
  copy(source.value);

  if (copied) {
    $toast.success("Event link copied successfully");
  }
};

const isUserCurrentEventOwner = computed(() => {
  return eventInfo.value?.createdBy._id === authStore.user?._id;
});
</script>

<style scoped>
.app-container {
  background: linear-gradient(
    270deg,
    rgba(106, 17, 203, 0.05) 0%,
    rgba(37, 117, 252, 0.05) 100%
  );
  min-height: 100vh;
  height: 100%;
  max-width: 640px;
  margin: 0 auto;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  cursor: pointer;
}
</style>
