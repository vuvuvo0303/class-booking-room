export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    profileImageURL: string,
    status: string,
    departmentId: number,
    cohortId?: number
}