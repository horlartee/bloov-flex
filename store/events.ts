import { defineStore } from "pinia";
import { EventPayment, ResponseObject, UserEvent } from "~/types/event";

export const useEventStore = defineStore("events", {
  state: () => ({}),

  actions: {
    async FETCH_EVENT_PAYMENTS(eventId: string) {
      try {
        const { data, error } = await useCustomFetch<
          ResponseObject<EventPayment>
        >(`/event/payments/${eventId}`);

        if (error.value) {
          throw new Error(error.value.data.message);
        }

        return data.value;
      } catch (error) {
        throw error;
      }
    },

    async FETCH_USER_EVENTS() {
      try {
        const { data, error } = await useCustomFetch<
          ResponseObject<UserEvent[]>
        >(`/user/events`);

        if (error.value) {
          throw new Error(error.value.data.message);
        }

        return data.value;
      } catch (error) {
        throw error;
      }
    },
  },
});
