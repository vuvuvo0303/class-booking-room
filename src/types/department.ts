export type Department = {
    id: number,
    name: string,
    createdAt: string,
    deletedAt?: string,
    updateAt: string,
    activites: Activity[],
}

export type Activity = {
    id: number,
    code: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    deletedAt?: string | null,
    isDeleted: boolean,
    department: Department,
}