import moment from "moment";
import { computed, ref } from "vue";

export default function useTimeLine() {
  const currentMonth = ref(new Date().getMonth());
  const currentYear = ref(new Date().getFullYear());
  const nextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0;
      currentYear.value += 1;
    } else {
      currentMonth.value += 1;
    }
  };

  const prevMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11;
      currentYear.value -= 1;
    } else {
      currentMonth.value -= 1;
    }
  };

  const formattedMonthYear = computed(() => {
    return moment({
      year: currentYear.value,
      month: currentMonth.value
    }).format("MMMM YYYY");
  });

  const getWeekNumber = (d: Date) => {
    const date = new Date(d?.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    const week1 = new Date(date.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((date?.getTime() - week1?.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  };

  function pad(num: number) {
    return num < 10 ? "0" + num : num;
  }
  function getFormattedDate(date: Date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}`;
  }
  const getWeeksInMonth = computed(() => {
    const weeks = [];
    let currentWeek = [];
    const year = currentYear.value;
    const month = currentMonth.value;
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();



    for (let day = 1; day <= lastDayOfMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = (date.getDay() + 6) % 7; // Adjust day of week to start with Monday

      currentWeek.push(date);

      if (dayOfWeek === 6 || day === lastDayOfMonth) {
        // If Saturday or last day of month
        weeks.push({
          weekNumber: getWeekNumber(currentWeek[0]),
          dates: currentWeek.map(getFormattedDate)
        });
        currentWeek = [];
      }
    }

    return weeks;
  });

  const handleSelect = (event: string) => {
    if (event) {
        currentYear.value = Number(event?.split("-")[0]);
        if (event?.split("-")[1]?.startsWith("0")) {
            currentMonth.value = Number(event?.split("-")[1][1]) - 1;
        }

        else {
            currentMonth.value = Number(event?.split("-")[1]) - 1;
        }
    }
};

  return {
    nextMonth,
    prevMonth,
    formattedMonthYear,
    getWeeksInMonth,
    handleSelect,
    currentMonth,
    currentYear,
    getWeekNumber,
    pad,
    getFormattedDate,
  };
}
