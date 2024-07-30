<template>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 6.8125V12.6658C13 13.9992 12.6667 14.6658 11 14.6658H5C3.33333 14.6658 3 13.9992 3 12.6658V6.8125"
        :stroke="fill"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.33398 1.33594H12.6673C14.0007 1.33594 14.6673 2.0026 14.6673 3.33594V4.66927C14.6673 6.0026 14.0007 6.66927 12.6673 6.66927H3.33398C2.00065 6.66927 1.33398 6.0026 1.33398 4.66927V3.33594C1.33398 2.0026 2.00065 1.33594 3.33398 1.33594Z"
        :stroke="fill"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.78711 9.33594H9.21378"
        :stroke="fill"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </template>
  
  <script setup lang="ts">
  defineProps({
    fill: {
      type: String,
      default: "#696F8C"
    }
  });
  </script>
  