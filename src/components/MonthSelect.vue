<template>
    <div>
        <DateSvg @select="openMonthPicker" />
        <input type="month" ref="monthInput" @input="updateMonth" class="-mt-10"
            style="visibility: hidden; width: 1px;" />
    </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue';
const emit = defineEmits(["select"]);
const monthInput = ref<HTMLInputElement | null>(null);
const selectedMonth = ref<string>(new Date().toISOString().substring(0, 7));
import DateSvg from '@/assets/DateSvg.vue';
const openMonthPicker = () => {
    if (monthInput.value) {
        monthInput.value.showPicker();
    }
};

const updateMonth = (event: Event) => {
    const target = event.target as HTMLInputElement;
    selectedMonth.value = target.value;
    emit("select", target.value)

};

</script>
