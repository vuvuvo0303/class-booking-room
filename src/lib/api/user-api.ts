import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
    try {
        const errorMessage = error.Errors?.ErrorMessage || 'An unexpected error occurred.';
        const data = null;
        return { error: errorMessage, data };
    } catch (err) {
        throw new Error('An unexpected error occurred.');
    }
};

export const getAllUsers = async () => {
    try {
        const { data } = await axiosClient.get(`/api/user`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getUserById = async (id: string) => {
    try {
        const { data } = await axiosClient.get(`/api/user/${id}`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}
// export const createUser = async (formData: {
//     name: string,
// }) => {
//     try {
//         const { data } = await axiosClient.post(`/api/user`, formData);
//         return { error: null, data: data, success: true };
//     } catch (error) {
//         return handleApiError(error);
//     }
// }

export const updateUser = async (id: string, formData: {
    firstName: string,
    lastName: string,
    role: string,
    profileImageURL: string,
    status: string,
    departmentId: number,
    cohortId: number
}) => {
    try {
        const { data } = await axiosClient.put(`/api/user/${id}`, formData);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}
export const deleteUser = async (id: string) => {
    try {
        const { data } = await axiosClient.delete(`/api/user/${id}`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}