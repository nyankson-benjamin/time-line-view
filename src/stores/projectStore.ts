import { defineStore } from "pinia";

export const useprojectManagerStore = defineStore({
    id: "timeline",
    state: () => ({
      staffListType:"table" as "table" | "list",
      timeLineView:"monthly" as "monthly" | "yearly"
    }),

    persist: true
  });