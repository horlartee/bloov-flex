<template>
  <main class="px-4 h-screen">
    <header class="py-6">
      <BaseNavbar title />
    </header>
    <div>
      <div
        @click="$router.push(`/${eventInfo?.linkId}`)"
        class="cursor-pointer"
      >
        <nuxt-icon name="arrow-left" class="text-2xl text-black" filled />
      </div>
      <div>
        <span class="text-[#475467] font-semibold">Your balance</span>
        <div class="flex items-center gap-x-2 text-4xl">
          <payment-country-select
            :options="currencyList"
            :value="selectedCurrency"
            @select="selectedCurrency = $event"
          >
            <template #identifier>
              <nuxt-icon
                :name="`flags/${selectedCurrency?.iso3CountryCode}`"
                filled
              />
            </template>
          </payment-country-select>
          <span
            class="bg-gradient-to-r from-primary-bold to-secondary-bold text-transparent bg-clip-text font-semibold"
          >
            <span v-html="selectedCurrency?.htmlCode"></span
            >{{
              totalPaymentAmount
                ? formatCashAmount(totalPaymentAmount?.toString())
                : 0
            }}
          </span>
        </div>

        <div class="max-w-[200px]">
          <p class="text-black text-xs text-left mx-auto">
            You can switch between different currency balances using flag
          </p>
        </div>
      </div>

      <div class="pt-16 space-y-6">
        <span
          class="bg-gradient-to-r from-primary-bold to-secondary-bold text-transparent bg-clip-text text-lg font-semibold"
        >
          Transaction History
        </span>

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left bg-[#f6f6fd] rounded-lg">
            <thead class="text-xs border-b border-gray-300 text-[#475467]">
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Amount</th>
                <th scope="col" class="px-6 py-3">Message</th>
              </tr>
            </thead>

            <tbody class="divide-y">
              <tr
                v-for="(payment, index) in filteredPaymentList"
                :key="payment._id"
                class="border-gray-300"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium whitespace-nowrap text-[#101828] flex items-center gap-x-2"
                >
                  <span
                    class="bg-white border border-[#D0D5DD] h-5 w-5 text-xs flex items-center justify-center rounded"
                  >
                    {{ formatIndex(index) }}
                  </span>
                  {{ payment.sender_name ? payment?.sender_name : "Anonymous" }}
                </th>
                <td class="px-6 py-4 text-[#079455]">
                  <span v-html="selectedCurrency?.htmlCode"></span
                  >{{ formatCashAmount(payment.net.toString()) }}
                </td>
                <td class="px-6 py-4 text-[#101828]">
                  {{ payment?.note ? payment?.note : "__" }}
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-if="!Boolean(filteredPaymentList?.length)"
            class="bg-[#f6f6fd] w-full h-16"
          >
            <div class="flex h-full items-center justify-center text-sm">
              You're yet to receive any payments in {{ selectedCurrency?.code }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { EventPayment, UserEvent } from "@/types/event";
import { useRoute } from "#vue-router";
import { useAuthStore } from "~/store/auth";
import { useEventStore } from "~/store/events";
import { Currency } from "~/types";

const { $toast, $userIsoCode } = useNuxtApp();

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const eventStore = useEventStore();

definePageMeta({
  layout: "auth",
});

// If event is not found, redirect user to home page
const eventInfo = ref<UserEvent | null>(null);

const loadEvent = async () => {
  const user = authStore.getUser;
  try {
    const { data } = await useCustomFetch<{
      message: string;
      response: UserEvent;
    }>(`event/link/${route.params.id}`);

    if (!!data.value) {
      eventInfo.value = data.value?.response;

      if (eventInfo.value?.createdBy._id !== user?._id) {
        $toast.error("You're not authorized to be here");
        router.push(`/${eventInfo.value.linkId}`);
      }
      return;
    }

    $toast.error("There was an issue with fetching the event, try again later");
    router.push("/");
  } catch (error) {
    $toast.error("There was an issue with fetching the event, try again later");
    router.push("/");
  }
};
await loadEvent();

//Payment List
const paymentList = ref<EventPayment>();

const fetchPaymentList = async () => {
  try {
    const response = await eventStore.FETCH_EVENT_PAYMENTS(
      eventInfo.value?._id as string
    );
    if (response?.statusCode === "00") {
      paymentList.value = response.data;
    }
  } catch (error: any) {
    $toast.error(error.message);
  }
};
await fetchPaymentList();

// Retrieve and set default currency based on users' location
let currencyList = reactive<Currency[]>([]);
const selectedCurrency = ref<Currency | null>(null);

const loadAndSetDefaultCurrency = () => {
  const currencies = sessionStorage.getItem("currencyList");
  currencyList = JSON.parse(currencies as string) as Currency[];

  const defaultCurrency = currencyList.find(
    (currency: Currency) => currency.iso3CountryCode === $userIsoCode
  ) as Currency;

  selectedCurrency.value = defaultCurrency;
};
loadAndSetDefaultCurrency();

//Filter payment list
const filteredPaymentList = computed(() => {
  return paymentList.value?.transactions.filter((item) => {
    return item.currency === selectedCurrency.value?._id;
  });
});

const totalPaymentAmount = computed(() => {
  return paymentList.value?.total.find((item) => {
    return item._id === selectedCurrency.value?.code;
  })?.total;
});

const formatIndex = (index: number) => {
  let indexValue = index;
  return ++indexValue;
};
</script>
