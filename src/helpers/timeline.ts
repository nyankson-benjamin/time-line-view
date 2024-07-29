import moment, { type Moment } from "moment";
import type { ProjectTypeTimeline } from "@/types/types";


export const getDayInfo = (dateStr: string) => {
    return [(new Date(dateStr)).getDate(), (new Date(dateStr)).toLocaleString("en-US", { weekday: "long" })];
  };

export const startIsInCurrentWeek = (
  weekDates: string[],
  projectStart: Moment
) => {
  const isInWeek = weekDates.some((date) => {
    const weekDate = moment(date);
    return weekDate.isSame(projectStart, "day");
  });
  return isInWeek;
};

export const endIsInCurrentWeek = (weekDates: string[], projectEnd: Moment) => {
  const isInWeek = weekDates.some((date) => {
    const weekDate = moment(date);
    return weekDate.isSame(projectEnd, "day");
  });
  return isInWeek;
};

export const areAllWeekendDays = (week: string[]) => {
  return week.every(
    (day) =>
      getDayInfo(moment(day).format("YYYY-MM-DD"))[1] === "Sunday" ||
      getDayInfo(moment(day).format("YYYY-MM-DD"))[1] === "Saturday"
  );
};

export const isProjectVisible = (
  weekDates: string[],
  startDate: string,
  endDate: string
) => {
  const projectStart = moment(startDate, "YYYY-MM-DD");
  const projectEnd = moment(endDate, "YYYY-MM-DD");
  return weekDates.some((date) => {
    const weekDate = moment(date, "YYYY-MM-DD");
    return weekDate.isBetween(projectStart, projectEnd, null, "[]");
  });
};


export const getBillabilityTitle = (status: string, reliable: boolean) => {
  return !reliable ? status + " (Not reliable)" : status;
};

export const getHourTitle = (hour: number, reliable: boolean) => {
  const hr = hour > 1 ? hour + "hrs/day" : hour + "hr/day";
  return !reliable ? hr + " (Not reliable)" : `${hr}`;
};

export const allDaysAreWeekends = (weekDates: string[], startDate: string) => {
  return areAllWeekendDays(weekDates) ||
      getDayInfo(moment(startDate).format("YYYY-MM-DD"))[1] === "Saturday" ||
      getDayInfo(moment(startDate).format("YYYY-MM-DD"))[1] === "Sunday";
};

export const getProjectStyleForStartWeek = (
  weekDates: string[],
  startDate: string,
  endDate: string,
  type = "project" as "project" | "leave"
) => {
  const projectStart = moment(startDate);
  const projectEnd = moment(endDate);
  const startIndex = weekDates.indexOf(startDate);
  const endIndex = weekDates.indexOf(endDate);

  if (
    startIsInCurrentWeek(weekDates, projectStart) &&
    endIsInCurrentWeek(weekDates, projectEnd)
  ) {
    return {
      startIndex: type === "leave" ? startIndex : -1,
      width:
        type === "leave" ? `${(endIndex + 1) * 9}` : `${(endIndex + 1) * 10}`
    };
  } else if (startIsInCurrentWeek(weekDates, projectStart)) {
    return {
      startIndex,
      width: allDaysAreWeekends(weekDates, startDate) ? "0" : "100"
    };
  } else if (endIsInCurrentWeek(weekDates, projectEnd)) {
    return {
      startIndex,
      width: `${(endIndex + 1) * 14}`
    };
  } else {
    return {
      startIndex,
      width: "100"
    };
  }
};

export const formattedWeekDates = (weekDates: string[]) => {
  return weekDates.map((date) => moment(date).format("YYYY-MM-DD"));
};

export function filterProjectsByMonthAndYear(projects: ProjectTypeTimeline[], month: number, year: number): ProjectTypeTimeline[] {
  return projects?.filter(project => {
    // Parse start and end dates using Moment.js
    const startDate = moment(project.startDate);
    const endDate = moment(project.endDate);

    // Calculate the range of months and years the project spans
    const startMonth = startDate.month();
    const startYear = startDate.year();
    const endMonth = endDate.month();
    const endYear = endDate.year();

    // Check if the project spans across the specified month and year
    if (startYear === year && endYear === year) {
      // If project starts and ends within the same year
      return (startMonth <= month - 1 && endMonth >= month - 1);
    } else if (startYear === year && endYear > year) {
      // If project starts within the year and ends in a later year
      return startMonth <= month - 1;
    } else if (startYear < year && endYear === year) {
      // If project starts in a previous year and ends within the year
      return endMonth >= month - 1;
    } else {
      // If project spans across multiple years
      return (startYear < year && endYear > year) || (startYear === year && endYear > year && startMonth <= month - 1) || (startYear < year && endYear === year && endMonth >= month - 1);
    }
  });
}

export function filterProjectsByYear(projects: ProjectTypeTimeline[], year: number): ProjectTypeTimeline[] {
  return projects.filter(project => {
    // Parse start and end dates using Moment.js
    const startDate = moment(project.startDate);
    const endDate = moment(project.endDate);

    // Extract years from start and end dates
    const startYear = startDate.year();
    const endYear = endDate.year();

    // Check if the project spans across the specified year
    return startYear === year || endYear === year || (startYear < year && endYear > year);
  });
}

