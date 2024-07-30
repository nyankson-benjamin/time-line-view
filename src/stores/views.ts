import { defineStore } from "pinia";

export const useViews = defineStore({
    id: "timeline",
    state: () => ({
      staffListType:"table" as "table" | "list",
      timeLineView:"Month" as "Month" | "Year" | "Week"
    }),

    persist: true
  });