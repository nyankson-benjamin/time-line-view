<template>
    <div>
        <Button :button-label="views.timeLineView" class="w-32" variant="with_border" @submit="open=!open" />
        <div class="z-40
          transition-opacity
          bg-[#ffffff] rounded-md shadow-md
          mr-5
          whitespace-nowrap
          text-left
          border
          w-32
          absolute" v-if="open">
            <div v-for="view in ['Week', 'Month', 'Year']" :key="view" class="cursor-pointer">
                <div @click="handleSelectView(view as view)" class="hover:bg-slate-200 w-full p-2">
                    {{ view }} view

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';
const open = ref(false)
const currentView = ref("Month")
import { useViews } from '@/stores/views';

type view = "Month" |"Year" | "Week"

const views = useViews();
const handleSelectView = (view:view)=>{
    currentView.value=view;
    open.value=false;
views.timeLineView=view
}
</script>

