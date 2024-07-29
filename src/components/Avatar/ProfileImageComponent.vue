<template>
    <div>
      <img
        v-if="imgSrc && imgSrc !== 'null'"
        :style="{ width: widthSize, height: heightSize, border }"
        class="rounded-full min-w-[3rem] min-h-[3rem]"
        data-cy="roundedFull"
        :src="imgSrc"
        :alt="name"
      />
  
      <div
        v-else
        :style="{ width: widthSize, height: heightSize }"
        class="
          after:relative
          inline-flex
          items-center
          justify-center
          overflow-hidden
          bg-gray-100
          rounded-full
          dark:bg-gray-600
        "
      >
        <span
          :class="textSize"
          class="font-medium text-gray-600 dark:text-gray-300 uppercase"
          >{{ initials }}</span
        >
      </div>

    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    imgSrc: {
      type: String
    },
    initials: {
      type: String,
      default: "N/A"
    },
    widthSize: {
      type: String,
      default: "3rem"
    },
    heightSize: {
      type: String,
      default: "3rem"
    },
    textSize: {
      type: String,
      default: "text-xl"
    },
    border: {
      type: String,
      default: "4px solid white"
    },
    deactivated: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: "Profile Image"
    }
  });
  </script>
  
  <style scoped>
  img {
    border-radius: 50%;
  }
  
  .deactivated {
    position: absolute;
    top: 10rem;
  }
  </style>
  