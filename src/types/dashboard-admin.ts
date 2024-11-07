export type CohortPercentage = {
    cohortCode: string;
    percentStudent: number;
  };
  
  export type DashboardAdmin = {
    totalStudent: number;
    totalManager: number;
    totalRoom: number;
    totalBooking: number;
    totalBookinginMonth: number[]; // Array of bookings per month
    percentStudentInCohort: CohortPercentage[]; // Array of cohort percentages
  };
  