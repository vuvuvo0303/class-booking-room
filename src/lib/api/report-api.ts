import { toast } from "react-toastify";
import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.Errors?.ErrorMessage || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const getAllReports = async () => {
  try {
    const { data } = await axiosClient.get(`/api/reports`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const deleteReport = async (id: number) => {
  try {
    const { data } = await axiosClient.delete(`/api/reports/${id}`);
    toast.success("Delete report successfully");
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const updateReport = async (
  id: number,
  formData: {
    status: string;
  }
) => {
  try {
    const { data } = await axiosClient.put(`/api/reports/${id}`, formData);
    toast.success("Updated Report  Successfully");

    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
