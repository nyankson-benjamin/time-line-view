<template>
    <div>
      <div class="color-container">
        <div @click="triggerColorPicker">
        </div>
        <div class="flex justify-center rounded-lg">
          <input ref="colorInput" type="color" class="rounded-lg" v-model="color" id="color" @change="updateColor" style="width: 90%; height: 100px;" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  
  const props = defineProps({
    modelValue: {
    type: String,
    default: "#000000"
  },
  })
  const emit = defineEmits(['color', 'update:modelValue']);
  const color = ref(props.modelValue);
  const colorInput = ref<HTMLElement | null>(null);
  
  const triggerColorPicker = () => {
    if (colorInput.value) {
      colorInput.value.click();
    }
  };
  
  const updateColor = (event:Event) => {
    color.value = (event.target as HTMLInputElement).value;
  };
  
  watch(color, (val) => {
    emit('update:modelValue', val);
  });

  </script>