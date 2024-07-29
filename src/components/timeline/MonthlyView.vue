<template>
    <div>
        {{ empData }}
        <div class="fixedColumn" @scroll="$emit('handleScroll', $event)">
            <table aria-describedby="table">
                <thead>
                    <tr>
                        <th>
                            <div style="display: flex; gap: 5px; justify-content: start;"
                                class="flex gap-5 justify-center items-center">

                                <div class="border rounded-lg h-20 w-44 flex items-center justify-center gap-2">
                                    <MonthSelect @select="handleSelect($event)" />
                                    <div @click="view.timeLineView = 'yearly'" class="cursor-pointer">
                                        <div class="flex items-center justify-center gap-2">
                                            <p class="flex gap-2 font-bold text-xl N800">
                                                <span>{{ formattedMonthYear?.split(" ")[0]?.slice(0, 3) }}</span>
                                                <span>{{ formattedMonthYear?.split(" ")[1] }}</span>
                                            </p>
                                        </div>
                                        <div class="flex justify-end N600 text-sm">
                                            <p>Month view</p>
                                        </div>
                                    </div>
                                </div>
                                <Button class="h-20" variant="with_border" @submit="prevMonth">
                                    <ArrowLeftIcon />
                                </Button>

                                <Button class="h-20" variant="with_border" @click="nextMonth">
                                    <ArrowRightIcon />
                                </Button>
                            </div>
                        </th>
                        <th v-for="(week, index) in getWeeksInMonth" :key="week.weekNumber + index">
                            <p style="margin: 10px; white-space: nowrap;" class="week-header">W {{ week.weekNumber }}
                            </p>
                            <div style="display: flex; white-space: nowrap;">
                                <div v-for="(day, index) in week.dates"
                                    :style="{ borderLeft: index ? '' : '1px solid #E6E8F0' }"
                                    class="whitespace-nowrap dates" :key="day"
                                    :class="{ 'bg-[#FFF0EA] border-l border-[#DD5928]': moment(day).format('YYYY-MM-DD') === currentDate() }">
                                    {{ getDayInfo(moment(day).format('YYYY-MM-DD'))[1]?.toString()?.slice(0, 2) }} {{
                                        getDayInfo(moment(day).format('YYYY-MM-DD'))[0] }}
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="emp in empData" :key="emp?.id" class="hover:bg-gray-100">
                        <td>
                            <div>
                                <div class="flex gap-3 cursor-pointer" @click="$emit('openPortfolio', emp?.id)">
                                    <ProfileImageComponent :initials="nameToInit(emp.name)" widthSize="5rem"
                                        heightSize="5rem" :imgSrc="emp?.profile_image" text-size="text-lg" />
                                    <div class="text-left">
                                        <p class="N800 font-semibold text-base"> {{ emp.name }}</p>
                                        <p class="N800  text-sm">{{ emp?.seniority_level }}</p>
                                        <p class="N800  text-sm">{{ emp?.specialization }}</p>
                                    </div>
                                </div>

                            </div>
                        </td>
                        <td v-for="(week, index) in getWeeksInMonth" :key="week.weekNumber * index" class="visible">

                            <div v-for="(proj, projInd) in filterProjectsByMonthAndYear(emp?.projects, currentMonth + 1, currentYear)"
                                :key="projInd + emp?.id"
                                :class="({ 'invisible-project': !isProjectVisible(week.dates, proj.startDate, proj.endDate) || areAllWeekendDays(week.dates) })"
                                class="m-2">
                                <div
                                    :style="{ display: 'flex', justifyContent: week.dates?.includes(moment(proj?.endDate).format('YYYY-MM-DD')) ? 'start' : 'end' }">
                                    <div @click="getProjectInfo(proj)" class="cursor-pointer" :style="{
                                        backgroundColor: proj?.color ?? stringToColor(proj.name),
                                        width: `${getProjectStyleForStartWeek(week.dates, proj.startDate, proj.endDate, 'project').width}%`,
                                        marginTop: '10px',
                                        minHeight: '40px', borderRadius: '5px',
                                        color: isColorLight(proj?.color ?? stringToColor(proj.name)) ? '#474D66' : 'white',
                                        marginLeft: week.dates?.includes(moment(proj?.endDate).format('YYYY-MM-DD')) && !week.dates?.includes(moment(proj?.startDate).format('YYYY-MM-DD')) ? '0px' : `${(getProjectStyleForStartWeek(week.dates, proj.startDate, proj.endDate).startIndex + 1) * 38}px`
                                    }">
                                        <div>
                                            <p class="font-semibold text-left text-base text-ellipsis project-name"
                                                style="padding: 5px;" :title="proj?.name">
                                                {{ proj?.name }}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>



    </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { type PropType, computed, ref, } from "vue";
import ArrowRightIcon from "@/assets/ArrowRightIcon.vue";
import ArrowLeftIcon from "@/assets/ArrowLeftIcon.vue";
import ProfileImageComponent from "@/components/Avatar/ProfileImageComponent.vue";
import Button from "@/components/Button.vue"
import { currentDate, nameToInit, stringToColor, getDayInfo, isColorLight } from "@/helpers/util";
import MonthSelect from "@/components/MonthSelect.vue";
import type {ProjectTypeTimeline, TalentPoolTypeTimeline } from "@/types/types";
import useTimeLine from "@/composables/useTimeLine";
import {
    areAllWeekendDays,
    isProjectVisible,
    getProjectStyleForStartWeek,
    filterProjectsByMonthAndYear
} from "@/helpers/timeline";
import { useprojectManagerStore } from "@/stores/projectStore";



const {
    nextMonth,
    prevMonth,
    formattedMonthYear,
    getWeeksInMonth,
    handleSelect,
    currentMonth,
    currentYear,
} = useTimeLine();

const props = defineProps({
    data: {
        type: Array as PropType<TalentPoolTypeTimeline[]>,
        required: true
    },
});

const openModal = ref(false);
const projectId = ref("");
const previousColor = ref("");
const color = ref("");

const view = useprojectManagerStore();
const empData = computed(() => {
    return props.data?.map((emp => {
        return {
            name: emp["Employee name"],
            profile_image: emp?.["profile_image"],
            client_ready: emp?.["Client ready"],
            position: emp?.Position,
            specialization: emp?.Specialization,
            seniority_level: emp?.["Seniority level"],
            projects: emp?.allProjects,
            id: Number(emp?.id),
        };
    }));
});



const getProjectInfo = (proj: ProjectTypeTimeline) => {
    openModal.value = true;
    projectId.value = proj?.id;
    color.value = proj?.color ?? stringToColor(proj?.name);
    previousColor.value = proj?.color ?? stringToColor(proj?.name);
};


</script>

<style scoped>
.fixedColumn {
    max-height: 85vh;
    overflow-y: scroll;
    border: 1px solid #E6E8F0;
    border-radius: 10px;
}

.fixedColumn td:nth-child(1),
.fixedColumn th:nth-child(1) {
    position: sticky;
    left: 0px;
    z-index: 1;

}

.fixedColumn th:nth-child(1) {
    background-color: #FAFBFF;
}

.fixedColumn thead {
    position: sticky;
    top: 0px;
    width: 100%;
    z-index: 2;
    /* Ensure the header is above the content */
    background-color: #FAFBFF;

}

.fixedColumn td:nth-child(1):hover {
    --tw-bg-opacity: 1;
    background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}

.fixedColumn td:nth-child(1) {
    background-color: #fff;
    border-right: 1px solid rgb(240, 239, 239);
}


.invisible-project {
    visibility: hidden;
}

.hiden-project {
    display: none;
}

.dates {
    font-size: 13.33px;
    font-weight: 400;
    line-height: 16px;
    text-align: center;
    border-right: 1px solid #E6E8F0;
    border-top: 1px solid #E6E8F0;
    border-bottom: 1px solid #E6E8F0;
    padding: 8px;
    width: 50px;
}

.week-header {
    font-size: 13.33px;
    font-weight: 400;
    line-height: 16px;
    text-align: center;
}


th,
td {
    padding: 5px;
    text-align: center;
    border: none;
    border-right: 1px solid #E6E8F0;
    border-bottom: 1px solid #E6E8F0;
}

th {
    border-top: 1px solid #E6E8F0;

}

.visible {

    background:
        conic-gradient(from 90deg at 1px 1px, #0000 90deg, #E6E8F0 0) 0 0/50px;
}

.project-name {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
