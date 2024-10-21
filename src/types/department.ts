export type Department = {
    id: number,
    name: string,
    createdAt: string,
    deletedAt?: string,
    updateAt: string,
    activites: Activity[],
}

export type Activity = {
    createdAt: string,
    deletedAt?: string,
    updatedAt: string,
    id: number,
    name: string,
    code: string,
}