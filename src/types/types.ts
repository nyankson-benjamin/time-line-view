export interface ProjectChanges{
    projectHoursChanges: {
      change:string
      timeRecorded:string
      timeEnded:string
    }[]
    billabilityStatusChanges: {
      change:string
      timeRecorded:string
      timeEnded:string
    }[]
  }

  export interface ProjectTypeTimeline{
    name: string;
    startDate: string;
    endDate: string;
    id:string,
    color:string
  }
  export interface TalentPoolType {
    name: string;
    profile_image: string;
    client_ready: boolean;
    position: string;
    specialization: string;
    seniority_level: string;
    projects: ProjectTypeTimeline[];
    id: number;
    leaves:ProjectTypeTimeline[];
  }

  export interface TalentPoolTypeTimeline {
    "Employee name": string,
    "profile_image": string,
    "Client ready": boolean,
    Specialization: string,
    Position: string,
    "Seniority level": string,
    id: string
    allProjects: ProjectTypeTimeline[],
    }