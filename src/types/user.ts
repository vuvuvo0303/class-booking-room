export type User = {
  id: string;
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

export type FaceDescriptor = {
  id: number;
  userId: string;
  descriptor: number[];
  imageURL: string;
}