<template>
  <app-modal @close="$emit('close')">
    <template #modal-title>
      <h3 class="leading-6 font-semibold text-black text-center text-xl">
        Add Remarks
      </h3>
    </template>

    <template #modal-content>
      <form class="space-y-6">
        <div class="flex flex-col text-start space-y-1">
          <label class="font-medium text-sm" for="username">Name </label>
          <input
            v-model="form.username"
            class="border border-[#D0D5DD] px-4 w-full h-12 rounded-lg"
            type="text"
            name="username"
            placeholder="Leave empty to stay anonymous"
          />
        </div>

        <div class="flex flex-col text-start space-y-1">
          <label class="font-medium text-sm" for="note">Add Remarks</label>
          <textarea
            v-model="form.note"
            class="border border-[#D0D5DD] px-4 w-full h-20 rounded-lg p-2"
            type="text"
            name="note"
            required
            placeholder="Say something nice...(optional)"
          />
        </div>
      </form>
    </template>
    <template #modal-action-bar>
      <div class="space-y-4">
        <base-button
          @click.enter="makePayment()"
          :class="{
            'bg-gradient-to-l from-[#6A11CB] to-[#2575FC]': !isLoading,
            '!bg-gray-400 !cursor-not-allowed': isLoading,
          }"
          :loading="isLoading"
        >
          <template #title>Proceed</template>
        </base-button>
      </div>
    </template>
  </app-modal>
</template>

<script lang="ts" setup>
const form = reactive({
  username: "",
  note: "",
});

defineProps({
  isLoading: {
    type: Boolean,
  },
});

const emit = defineEmits(["make-payment", "loading", "close"]);

const makePayment = async () => {
  let data = {
    name: form.username,
    note: form.note,
  } as {
    name?: string;
    note?: string;
  };

  if (!form.note) {
    delete data["note"];
  }

  if (!form.username) {
    delete data["name"];
  }

  emit("loading", true);
  emit("make-payment", {});
};
</script>
