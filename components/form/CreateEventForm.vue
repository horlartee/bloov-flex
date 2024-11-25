<template>
  <form @submit.prevent="handleCreateEvent" class="text-sm">
    <div>
      <ReuseInput
        label="Event Name"
        type="text"
        placeholder="Enter your event name"
        required
        errorMessage="Please enter valid event name"
        v-model="formData.title"
        class="text-base"
      />
    </div>
    <div class="mt-6 text-sm">
      <label for="banner">Your Banner</label>
      <input
        type="file"
        name="banner"
        id="banner"
        class="hidden text-base"
        ref="bannerFile"
        accept="image/*"
        @change="addBanner($event)"
      />
      <div
        class="relative bg-white rounded-md border-2 border-gray-300 overflow-hidden"
      >
        <div v-if="formData.banner" class="w-full h-[12.5rem]">
          <div
            class="absolute inset-0 bg-black/30 flex items-center justify-center"
          >
            <button
              class="bg-white rounded-full p-4 font-semibold text-[10px]"
              @click="clearUploadedFile"
            >
              <nuxt-icon name="close" class="text-lg" filled />
            </button>
          </div>
          <img
            :src="formData.banner"
            class="w-full h-full object-cover rounded-md"
          />
        </div>

        <div
          v-else
          @click="bannerFile.click()"
          @dragenter.prevent
          @dragleave.prevent
          @drop.prevent="addBanner"
          @dragover.prevent
          class="cursor-pointer text-xs mt-2 py-7 px-2 min-h-[12.5rem] h-full flex flex-col items-center justify-center"
        >
          <div
            v-if="isImageUploading"
            class="flex flex-col items-center space-y-4"
          >
            <BaseWhiteLoader class="text-blue-500 w-28 h-24" />
            <span>Please wait while your banner is being uploaded...</span>
          </div>
          <div v-else class="h-full">
            <div
              class="p-3 border border-gray-200 rounded-md mb-2 w-fit mx-auto"
            >
              <nuxt-icon name="cloud-upload" class="text-xl" filled />
            </div>
            <div class="text-stone-600 mt-2 text-center text-sm">
              <p>
                <span
                  class="bg-gradient-to-r from-primary-bold to-secondary-bold text-transparent bg-clip-text font-bold"
                  >Click to upload</span
                >
                or drag and drop
              </p>
              <p class="pt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 text-sm">
      <label for="details">Event Details</label>
      <textarea
        v-model="formData.description"
        name="details"
        id="details"
        rows="6"
        class="custome-input-border border-2 border-gray-300 rounded-md block w-full mt-2 p-4 outline-none focus:text-secondary-bold text-stone-600 text-base"
        placeholder="Enter your description"
      ></textarea>
    </div>
    <div class="text-sm mt-6">
      <label for="startDate">Start Date</label>
      <div
        class="custome-div-input mt-2 flex items-center space-x-2 bg-white border-2 border-gray-300 rounded-md pr-2"
      >
        <VueDatePicker
          v-model="formData.startTime"
          text-input
          class="datepicker"
          placeholder="start date"
          style="--dp-input-padding: 6px 2px 6px 0px"
        >
        </VueDatePicker>
        <nuxt-icon name="calendar/calendar-gradient" class="text-xl" filled />
      </div>
    </div>
    <div class="text-sm mt-6">
      <label for="startDate">End Date</label>
      <div
        class="custome-div-input mt-2 flex items-center space-x-2 bg-white border-2 border-gray-300 rounded-md pr-2"
      >
        <VueDatePicker
          v-model="formData.endTime"
          text-input
          class="datepicker"
          placeholder="end date"
          style="--dp-input-padding: 6px 2px 6px 0px"
        >
        </VueDatePicker>
        <nuxt-icon name="calendar/calendar-gradient" class="text-xl" filled />
      </div>
    </div>

    <div class="mt-5">
      <BaseButtonGradient
        @click.prevent="handleCreateEvent"
        class="mt-6"
        type="submit"
        :loading="loading"
        >Create Event</BaseButtonGradient
      >
    </div>
    <CreateEventSuccessModal
      v-if="createSuccessModal"
      :event-link-id="newCreatedEvent?.linkId"
      @close="createSuccessModal = false"
      @copied="copiedToClipBoard"
    />
  </form>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { reactive, ref } from "vue";
import { useRouter } from "#vue-router";
import { UserEvent } from "~/types/event";

// General Variables
const { $toast } = useNuxtApp();
const router = useRouter();

// form data
const formData = reactive({
  title: "",
  description: "",
  startTime: null,
  endTime: null,
  banner: "",
}) as {
  title: string;
  description: string;
  startTime: null | Date;
  endTime: null | Date;
  banner?: string;
};
const loading = ref(false);

// file
const bannerFile = ref<any>(null);
const isImageUploading = ref(false);

async function addBanner(event: any) {
  isImageUploading.value = true;
  const imageInfo = {
    file: bannerFile.value.files[0] || event.dataTransfer.files[0],
    fileType: "event_banner",
    meta: {},
  };

  const imageFile = createFormData(imageInfo);

  try {
    const { data, error } = await useCustomFetch<{ response: { url: string } }>(
      "/file/upload",
      { method: "POST", body: imageFile }
    );

    if (error.value) {
      isImageUploading.value = false;
      return $toast.error("Failed to upload image, please try again.");
    }
    isImageUploading.value = false;
    formData.banner = data?.value?.response.url;
  } catch (error) {
    isImageUploading.value = false;
    $toast.error("Failed to upload image, please try again.");
  }
}

function clearUploadedFile() {
  formData.banner = "";
  bannerFile.value = null;
}

const createSuccessModal = ref(false);
const newCreatedEvent = ref<UserEvent>();
async function handleCreateEvent() {
  if (!isObjectFieldsEmpty(formData)) {
    return $toast.error("Please fill in all fields");
  }

  loading.value = true;

  try {
    const { data, error } = await useCustomFetch<{ response: UserEvent }>(
      "/event",
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    );

    if (error.value) {
      loading.value = false;
      return $toast.error(
        "An error occurred while creating your event, please try again."
      );
    }
    newCreatedEvent.value = data.value?.response;
    createSuccessModal.value = true;
    loading.value = false;
    formData.banner = "";
    formData.title = "";
    formData.startTime = null;
    formData.endTime = null;
    formData.description = "";
  } catch (error) {
    loading.value = false;
    $toast.error(
      "An error occurred while creating your event, please try again."
    );
  }
}

const copiedToClipBoard = () => {
  $toast.success("Event link has been successfully copied");
  router.push("/");
};
</script>

<style>
.dp__input_icon {
  display: none !important;
}
.dp__input {
  border: none !important;
  padding: 6px 12px;
}

.custome-div-input:has(.dp__input_focus) {
  border: double 2px transparent;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, #296ff9, #6419cf);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.custome-input-border:focus {
  border: double 2px transparent;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, #296ff9, #6419cf);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
textarea {
  resize: none;
}
</style>
