<template>
    <div>
  
      <!-- Modal -->
      <div v-if="open"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 closeModal"
        @click="closeModalOutside">
        <div class="bg-white rounded shadow-md m-10">
          <div class="p-4 w-full gap-5 flex items-center justify-between">
            <h3>{{ title }}</h3>
            <CloseButton @close="$emit('close')"/>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
    
  <script setup lang="ts">
  import CloseButton from "@/components/CloseButton.vue"
  
  const props = defineProps({
    open: {
      type: Boolean,
      defuault: false
    },
    persist: {
      type: Boolean,
      default: false
    },
    title:{
      type:String,
      default:""
    }
  })
  
  const emit = defineEmits(["close"])
  
  
  const closeModal = () => {
    if (!props.persist) {
      emit("close");
    }
  };
  
  const closeModalOutside = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement && event.target.classList.contains('closeModal')) {
      closeModal();
    }
  };
  </script>
    