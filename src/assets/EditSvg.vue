<template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.33203 1.33203H5.9987C2.66536 1.33203 1.33203 2.66536 1.33203 5.9987V9.9987C1.33203 13.332 2.66536 14.6654 5.9987 14.6654H9.9987C13.332 14.6654 14.6654 13.332 14.6654 9.9987V8.66536"
        :stroke="fill"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.6933 2.01155L5.43992 7.26488C5.23992 7.46488 5.03992 7.85822 4.99992 8.14488L4.71325 10.1515C4.60659 10.8782 5.11992 11.3849 5.84659 11.2849L7.85325 10.9982C8.13325 10.9582 8.52659 10.7582 8.73325 10.5582L13.9866 5.30488C14.8933 4.39822 15.3199 3.34488 13.9866 2.01155C12.6533 0.678215 11.5999 1.10488 10.6933 2.01155Z"
        :stroke="fill"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.94141 2.76562C10.3881 4.35896 11.6347 5.60562 13.2347 6.05896"
        :stroke="fill"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </template>
  
  <script setup lang="ts">
  defineProps({
    width: {
      type: String,
      default: "16"
    },
    height: {
      type: String,
      default: "16"
    },
    fill: {
      type: String,
      default: "#8F95B2"
    }
  });
  </script>
  