<template>
  <div
    class="fixed z-50 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-4 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block w-96 p-4 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="document"
      >
        <div @click="$emit('close')" class="absolute right-4 cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#667085"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="px-2 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="text-center sm:mt-0 sm:text-left">
            <!-- Modal title -->
            <slot name="modal-title"> </slot>
            <div class="mt-4 w-full">
              <!-- Modal content -->
              <slot name="modal-content"> </slot>
            </div>
          </div>
        </div>
        <div class="px-2 py-3 sm:px-6">
          <slot name="modal-action-bar"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>
