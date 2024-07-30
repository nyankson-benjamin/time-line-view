<template>
    <div class="project-details flex flex-wrap gap-6">
      <div
        
      >
        <div :style="{ backgroundColor: project?.color }" class="project-header p-4">
          <h2 class="text-xl font-semibold">{{ project?.name }}</h2>
        </div>
        <div class="project-body p-4 bg-gray-50">
          <p class="mb-2"><strong>Start Date:</strong> {{ formatDate(project?.startDate) }}</p>
          <p><strong>End Date:</strong> {{ formatDate(project?.endDate) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  interface Project {
    name: string;
    startDate: string;
    endDate: string;
    id: string;
    color: string;
  }
  
  defineProps<{
    project: Project;
  }>();
  
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };
  </script>
  
