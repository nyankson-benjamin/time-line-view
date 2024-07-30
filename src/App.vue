<script setup lang="ts">
import MonthlyView from './components/timeline/MonthlyView.vue';
import { ref } from 'vue';
import type { TalentPoolTypeTimeline } from './types/types';
import useGetEmployees from "@/composables/useGetEmployees"
import ViewsDropdown from './components/dropdown/ViewsDropdown.vue';
import { useViews } from '@/stores/views';
import TimeLineYearlyView from './components/timeline/TimeLineYearlyView.vue';
import UnderContruction from './components/UnderContruction.vue';

const year = ref(new Date().getFullYear())
const view = useViews()
</script>

<template>
  <div class="m-10">
    <div class="flex justify-end my-2">
      <ViewsDropdown />
    </div>
    <MonthlyView :data="useGetEmployees(year).employees as TalentPoolTypeTimeline[] || []" v-model="year"
      v-if="view.timeLineView === 'Month'" />
    <UnderContruction v-if="view.timeLineView === 'Year' || view.timeLineView==='Week'" />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
