export type CohortPercentage = {
    cohortCode: string;
    percentStudent: number;
  };
  
  export type DashboardData = {
    totalStudent: number;
    totalReport: number;
    totalRoom: number;
    totalBooking: number;
    totalBookinginMonth: number[]; // Mảng 12 phần tử đại diện cho số lượt booking mỗi tháng
    percentUserInCohort: CohortPercentage[]; // Mảng các cohort và phần trăm sinh viên trong mỗi cohort
  };
  