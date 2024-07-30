<template>
  <svg
    :width="width"
    :height="height"
    :fill="color"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect :width="width" :height="height" rx="9" fill="#D8DAE5" />
    <circle cx="9" cy="5" r="1" fill="#474D66" />
    <circle cx="9" cy="9" r="1" fill="#474D66" />
    <circle cx="9" cy="13" r="1" fill="#474D66" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: Number,
    default: 18
  },
  height: {
    type: Number,
    default: 18
  },
  color: {
    type: String,
    default: "none"
  }
});
</script>
