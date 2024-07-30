export interface Project {
    name: string;
    startDate: string;
    endDate: string;
    billability_status: string;
    project_hours: string;
    type: string;
    id: string;
    color: string | null;
  }
  
  interface Employee {
    "Employee name": string;
    profile_image: string;
    id: string;
    "Client ready": boolean;
    Specialization: string;
    "Seniority level": string;
    Position: string;
    allProjects: Project[];
  }
  
  const generateRandomDate = (start: number, end: number): string => {
    return new Date(start + Math.random() * (end - start)).getTime().toString();
  };
  
  const getRandomProjectName = (): string => {
    const adjectives = ["Alpha", "Beta", "Gamma", "Delta", "Omega"];
    const nouns = ["Phoenix", "Orion", "Vortex", "Nebula", "Titan"];
  
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
    return `${randomAdjective}-${randomNoun}`;
  };
  
  const getRandomEmployeeName = (): string => {
    const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Emma", "Daniel", "Olivia", "Matthew", "Sophia"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
  
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
    return `${randomFirstName} ${randomLastName}`;
  };
  
  const getRandomProfileImage = (): string => {
    const width = 100; // Width of the image
    const height = 100; // Height of the image
    const randomId = Math.floor(Math.random() * 1000); // Random ID for variety
    return `https://picsum.photos/${width}/${height}?random=${randomId}`;
  };

  const getRandomSpecialization = (): string => {
    const specializations = [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "UI/UX Designer",
      "Data Scientist",
      "DevOps Engineer",
      "Project Manager",
      "Quality Assurance",
      "Business Analyst",
      "Systems Architect"
    ];
    
    return specializations[Math.floor(Math.random() * specializations.length)];
  };
  
  export default function useGetEmployees(year:number){
    const generateRandomProject = (index: number): Project => {
        const startRange = new Date(`${year}-01-01`).getTime();
        const endRange = new Date(`${year}-12-31`).getTime();
        
        const startDate = generateRandomDate(startRange, endRange);
        const endDate = generateRandomDate(Number(startDate), endRange); // Ensure end date is after start date
        
        return {
          name: getRandomProjectName(),
          startDate: startDate,
          endDate: endDate,
          billability_status: "active", // Example status
          project_hours: `${Math.floor(Math.random() * 10) + 1}`, // Random number between 1 and 10
          type: "development", // Example type
          id: `${index}`,
          color: null
        };
      };
      
      const generateEmployee = (index: number): Employee => {
        return {
          "Employee name": getRandomEmployeeName(),
          profile_image: getRandomProfileImage(), // You can add URL or placeholder image if needed
          id: `${index}`,
          "Client ready": Math.random() > 0.5, // Random true or false
          Specialization: getRandomSpecialization(), // Example specialization
          "Seniority level": "Junior", // Example seniority level
          Position: "Position", // Example position
          allProjects: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => generateRandomProject(i + 1))
        };
      };
      
      const generateEmployees = (num: number): Employee[] => {
        return Array.from({ length: num }, (_, i) => generateEmployee(i + 1));
      };
    return{employees: generateEmployees(10)}
  }