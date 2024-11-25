<template>
  <div class="pay-container">
    <div class="space-y-12 relative w-full">
      <div class="flex items-center justify-between relative w-full">
        <span
          class="cursor-pointer"
          @click="$router.push(`/${$route.params.id}`)"
        >
          <nuxt-icon name="arrow-left" class="text-2xl text-white" filled />
        </span>
      </div>
      <!-- Input -->
      <div class="flex">
        <div
          class="text-5xl mx-auto flex gap-x-1 items-center container justify-center"
        >
          <currency-select
            class="bg-[#031E66] rounded-lg py-1 px-3 text-white text-xl"
            :value="selectedCurrency"
            :options="currencyList"
            @select="setCurrencyAndLocation($event)"
          ></currency-select>

          <div v-if="!Boolean(formattedCashAmount)" class="!text-[#a9a9a9]">
            {{ formatCashAmount(defaultAmountsList[1]) }}
          </div>

          <div v-else class="text-white">
            {{ formattedCashAmount }}
          </div>
        </div>
      </div>

      <!-- Fixed amount selectors -->
      <div class="flex items-center justify-evenly pb-10">
        <div
          v-for="(amount, index) in defaultAmountsList"
          :key="index"
          @click="formattedCashAmount = amount"
          class="bg-white font-semibold cursor-pointer text-[#6a11cb] rounded-2xl p-2"
        >
          <span v-html="selectedCurrency?.htmlCode"></span>
          {{ formatCashAmount(amount) }}
        </div>
      </div>

      <div class="text-white text-sm text-center mx-auto">
        <p>
          &#128161; You can switch between different currencies using the
          currency icon
        </p>
      </div>

      <!-- Keypad -->
      <div
        class="text-white grid grid-cols-3 place-items-center gap-6 text-2xl"
      >
        <button class="ripple" @click="setKeypadNumber($event, '1')">1</button>
        <button class="ripple" @click="setKeypadNumber($event, '2')">2</button>
        <button class="ripple" @click="setKeypadNumber($event, '3')">3</button>
        <button class="ripple" @click="setKeypadNumber($event, '4')">4</button>
        <button class="ripple" @click="setKeypadNumber($event, '5')">5</button>
        <button class="ripple" @click="setKeypadNumber($event, '6')">6</button>
        <button class="ripple" @click="setKeypadNumber($event, '7')">7</button>
        <button class="ripple" @click="setKeypadNumber($event, '8')">8</button>
        <button class="ripple" @click="setKeypadNumber($event, '9')">9</button>
        <button class="ripple" @click="setKeypadNumber($event, '.')">
          <nuxt-icon name="asterisk" class="text-xl" filled />
        </button>
        <button class="ripple" @click="setKeypadNumber($event, '0')">0</button>
        <button class="ripple !w-14 !h-14" @click.prevent="deleteCharacter">
          <nuxt-icon name="delete" class="text-4xl" filled />
        </button>
      </div>

      <!-- Payment button -->
      <button
        @click="initiatePayment"
        class="bg-white text-[#00237B] font-semibold rounded-lg border border-white w-full p-3"
      >
        Show love with <span v-html="selectedCurrency?.htmlCode"></span>
      </button>

      <!-- Vector doodles -->
      <div>
        <span class="absolute top-14 left-5">
          <nuxt-icon name="doodles/doodle-1" class="text-5xl" filled />
        </span>

        <!-- <span class="absolute top-56 left-0">
          <nuxt-icon name="doodles/doodle-2" class="text-5xl" filled />
        </span> -->

        <span class="absolute top-60 left-[50%]">
          <nuxt-icon name="doodles/doodle-3" class="text-5xl" filled />
        </span>

        <!-- <span class="absolute top-44 right-0 z-10">
          <nuxt-icon name="doodles/doodle-4" class="text-6xl" filled />
        </span> -->
      </div>
    </div>

    <!-- Finish payment modal -->
    <payment-next-step-modal
      v-if="isModalOpen"
      :is-loading="isLoading"
      @make-payment="makePayment"
      @loading="isLoading = $event"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { UserEvent } from "@/types/event";
import { useRoute } from "#vue-router";
import { Currency } from "@/types/index";

const { $toast, $userIsoCode } = useNuxtApp();

const route = useRoute();
const router = useRouter();

// If event is not found, redirect user to home page
const eventInfo = ref<UserEvent | null>(null);

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
  router.push("/");
};

await loadEvent();

//Fetch and set default currency
//Also set default amount selections based on user location
let defaultAmountsList = reactive<string[]>([]);
const selectedCurrency = ref<Currency>();

let currencyList = reactive<Currency[]>([]);

const loadCurrencies = () => {
  const currencies = sessionStorage.getItem("currencyList");
  currencyList = JSON.parse(currencies as string) as Currency[];
};

await loadCurrencies();

const setDefaultCurrency = () => {
  // const userIsoCode = inject("userIsoCode") as string;
  const defaultCurrency = currencyList.find(
    (currency: Currency) => currency.iso3CountryCode === $userIsoCode
  );

  selectedCurrency.value = defaultCurrency;
  defaultAmountsList = getAmountsByLocation($userIsoCode as string);
};
setDefaultCurrency();

const setCurrencyAndLocation = (item: Currency) => {
  selectedCurrency.value = item;
  defaultAmountsList = getAmountsByLocation(item.iso3CountryCode);
};

//set and format payment amount on user input
const cashAmount = ref("");

const formattedCashAmount = computed({
  get() {
    return cashAmount.value;
  },
  set(newValue) {
    cashAmount.value = formatCashAmount(newValue);
  },
});

const setKeypadNumber = (e: Event, value: string) => {
  e.preventDefault();

  formattedCashAmount.value += value;
};

const deleteCharacter = () => {
  if (formattedCashAmount.value.length > 0) {
    // Remove the last character from the input field
    formattedCashAmount.value = formattedCashAmount.value.substring(
      0,
      formattedCashAmount.value.length - 1
    );
  }
};

// Initiate Payment and modals
const isModalOpen = ref(false);
const isLoading = ref(false);

const initiatePayment = async () => {
  if (!Boolean(formattedCashAmount.value)) {
    return $toast.error("Please input an amount to proceed");
  }

  isModalOpen.value = true;
};

const makePayment = async (value: {
  name: string;
  note: string;
  // email: string;
}) => {
  const { data } = await useCustomFetch<{
    statusCode: string;
    data: string;
  }>(`payment`, {
    method: "POST",
    body: {
      amount: stripStringCommas(formattedCashAmount.value),
      name: value.name,
      note: value.note,
      event: eventInfo.value?._id,
      // email: value.email,
      currency: selectedCurrency.value?._id,
    },
  });

  if (data.value && data.value.statusCode === "00") {
    isLoading.value = false;
    $toast.success("Redirecting you to make your payment", { timeout: 500 });
    formattedCashAmount.value = "";
    localStorage.setItem("eventLinkId", eventInfo.value?.linkId as string);
    window.open(data.value.data, "_self");
    return;
  }
  $toast.error("An error occurred, please try again later");
  isLoading.value = false;
};
</script>

<style scoped>
.pay-container {
  background: var(--LIn, linear-gradient(270deg, #6a11cb 0%, #2575fc 100%));
  min-height: 100vh;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  padding: 10px 10px;
  overflow: hidden;
}

.ripple {
  background-position: center;
  transition: background 0.8s;
}
.ripple:active {
  background: #6a11cb radial-gradient(circle, transparent 1%, #6a11cb 1%)
    center/15000%;
}
.ripple:active {
  background-color: #6a11cb;
  background-size: 100%;
  transition: background 0s;
}

button.ripple {
  border: none;
  border-radius: 999px;
  height: 40px;
  width: 40px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}
</style>
