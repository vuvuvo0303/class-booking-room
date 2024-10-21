export type User = {
  id: number;
  fullName: string;
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;
  email: string;
  role: string;
  profileImageURL: string;
  status: string;
  departmentId: number;
  cohortId?: number;
};
