<template>
    <div class="flex justify-end">
      <!-- div for dropdown svg -->
      <div class="relative  cursor-pointer ">
        <div  @click="showdropDown = !showdropDown" class="p-1">
          <div class="bg-slate-50 rounded-full">
            <Elipsis />
          </div>

        </div>
        <!-- div for the dropdown -->
        <div class="absolute z-50 min-w-[10rem] -ml-32"
          v-if="showdropDown">
          <ul class="flex flex-col rounded-lg bg-[#ffffff] shadow-lg ">
            <li v-for="option of optionsList" :key="option">
              <div class="
                  flex
                  content-center
                  px-4
                  py-3
                  cursor-pointer
                  hover:bg-slate-200 w-full
                " @mouseover="activeOption = option" @mouseleave="activeOption = 0" @click="
          [
            $emit('selectedOption', option, item),
            (showdropDown = !showdropDown)
          ]
          ">
                <div class="flex flex-row gap-1">
                  <div v-if="option.icon" class="flex items-center">
                    <component :is="option" :key="option" />
                  </div>
                  <div class="">
                    <p>{{ option }}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { type Component, type PropType, ref, watch } from "vue";
  import Elipsis from "@/assets/ElipsSvg.vue";
  
  defineProps({
    optionsList: {
      type: Array as PropType<any[]>,
    },
item:{
  type:Object
}
  });
  
  const showdropDown = ref(false);
  const activeOption = ref(0);
  
  watch(showdropDown, () => {
    if (showdropDown.value) {
      const stopInterval = setInterval(() => {
        if (!activeOption.value) {
          showdropDown.value = false;
          clearInterval(stopInterval);
        }
      }, 2000);
    } else {
      activeOption.value = 0;
    }
  });
  </script>
  