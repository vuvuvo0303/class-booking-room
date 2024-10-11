import { toast } from "react-toastify";
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

export const getAllRoomType = async () => {
    try {
        const { data } = await axiosClient.get(`/api/room-types`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getRoomTypeById = async (id: number) => {
    try {
        const { data } = await axiosClient.get(`/api/room-type/${id}`);
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}
export const createRoomType = async (formData: {
    name: string,
    // departmentId: number
}) => {
    try {
        const { data } = await axiosClient.post(`/api/room-types`, formData);
        
        toast.success("Add new Room Type Successfully");
        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateRoomType = async (id: number, formData: {
    name: string,
}) => {
    try {
        const { data } = await axiosClient.put(`/api/room-types/${id}`, formData);
        toast.success("Update Room Type Successfully");

        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}
export const deleteRoomType = async (id: number) => {
    try {
        const { data } = await axiosClient.delete(`/api/room-types/${id}`);
        toast.success("Delete Room Type Successfully");

        return { error: null, data: data, success: true };
    } catch (error) {
        return handleApiError(error);
    }
}