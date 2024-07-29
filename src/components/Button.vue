<template>
    <button :style="buttonStyle" :class="classes" class="flex items-center justify-center gap-1"
      @click.prevent.stop="handleClick" :disabled="disabled" :data-cy="dataCy">
      <slot name="leadingSlot"></slot>
      {{ buttonLabel }}
      <slot> </slot>
    </button>
  </template>
  
  <script lang="ts" setup>
  import { type PropType, computed } from "vue";
  
  const props = defineProps({
    variant: {
      type: String as PropType<"primary" | "secondary" | "with_border" | "custom">,
      default: "primary"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    buttonLabel: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    dataCy: {
      type: String,
      default: ""
    },
    class: {
      type: String,
      default: ""
    },
    buttonStyle: {
      type: Object,
      default: {}
    }
  });
  
  const emit = defineEmits(["submit"]);
  
  const handleClick = (): void => {
    if (!props.disabled) {
      emit("submit");
    }
  };
  const classes = computed(() => {
    return `button ${props.variant} ${props.disabled ? "disabled" : ""} ${props.class
      }`;
  });
  </script>
  
  <style scoped>
  .button {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
  }
  
  .primary {
    background-color: #dd5928;
    color: #fff;
  }
  
  .primary:hover {
    background: #b5461d;
  }
  
  .secondary {
    color: #dd5928;
  }
  
  .with_border {
    border: 1px solid #D8DAE5;
    color: #696F8C;
  }
  
  .with_border:hover {
    color: #474D66;
    border: 1px solid #8F95B2;
  }
  
  .with_border:active {
    background-color: #C1C4D6;
  }
  
  .disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  </style>
  