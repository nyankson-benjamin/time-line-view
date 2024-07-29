<script setup lang="ts">
import MonthlyView from './components/timeline/MonthlyView.vue';
import { ref } from 'vue';
import type { TalentPoolTypeTimeline } from './types/types';

const projects = ref([
  {
    name: "Project 1",
    startDate: "1721606400000",
    endDate: "1729555200000",
    billability_status: "string",
    project_hours: "2",
    type: "string",
    changes: [],
    id:"string",
    color:"string"
  }
])
const data = ref<TalentPoolTypeTimeline[]>([
{"Employee name":"Benjamin","profile_image":"", id:"1", "Client ready":true, Specialization:"Frontend", "Seniority level":"Junior","Position":"Position", allProjects:projects.value},
{"Employee name":"Benjamin","profile_image":"", id:"1", "Client ready":true, Specialization:"Frontend", "Seniority level":"Junior","Position":"Position", allProjects:projects.value},
{"Employee name":"Benjamin","profile_image":"", id:"1", "Client ready":true, Specialization:"Frontend", "Seniority level":"Junior","Position":"Position", allProjects:projects.value},
{"Employee name":"Benjamin","profile_image":"", id:"1", "Client ready":true, Specialization:"Frontend", "Seniority level":"Junior","Position":"Position", allProjects:projects.value},
{"Employee name":"Benjamin","profile_image":"", id:"1", "Client ready":true, Specialization:"Frontend", "Seniority level":"Junior","Position":"Position", allProjects:projects.value},
])
</script>

<template>
  <div class="mt-10">
    <MonthlyView :data="data"/>
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
