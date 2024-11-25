<template>
  <main class="px-4 h-full min-h-screen pb-10">
    <header class="py-6">
      <BaseNavbar title />
    </header>
    <div class="text-xl">
      <div @click="$router.push(`/`)" class="cursor-pointer">
        <nuxt-icon name="arrow-left" class="text-2xl text-black" filled />
      </div>
      <h2 class="py-2 text-stone-600">Event List Overview</h2>
    </div>
    <div class="my-6">
      <div
        v-if="Boolean(userEventList.length)"
        class="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <template :key="event._id" v-for="event in userEventList">
          <NuxtLink :to="`/${event.linkId}`">
            <img
              class="h-auto max-w-full rounded-t-lg"
              :src="event.banner || '/event-banner.jpeg'"
              :alt="event.title"
            />
            <div
              class="flex justify-between pb-4 pt-2 px-3 bg-white rounded-b-lg"
            >
              <p class="text-xl">{{ event.title }}</p>
              <p>
                {{ formatDate(new Date(event.startTime), "DD/MM/YYYY") }}
              </p>
            </div>
          </NuxtLink>
        </template>
      </div>
      <div v-else class="space-y-4 mt-6">
        <p class="text-lg text-left max-w-sm">
          You're yet to create an event, click on the button below to go ahead
          to create one.
        </p>
        <button
          @click="$router.push('/create-event')"
          class="p-4 w-full rounded-sm text-base text-white bg-primary-bold hover:bg-secondary-bold duration-300"
        >
          Create an Event
        </button>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useEventStore } from "~/store/events";
import { UserEvent } from "~/types/event";
import { formatDate } from "@vueuse/core";

const eventStore = useEventStore();
const { $toast } = useNuxtApp();

definePageMeta({
  middleware: "auth",
  layout: "auth",
});

const userEventList = ref<UserEvent[]>([]);

const fetchUserEvents = async () => {
  try {
    const response = await eventStore.FETCH_USER_EVENTS();
    if (response) {
      userEventList.value = response.data;
    }
  } catch (error: any) {
    $toast.error(error.message);
  }
};
await fetchUserEvents();
</script>
