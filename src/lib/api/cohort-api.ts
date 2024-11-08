import { toast } from "react-toastify";
import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.Errors?.ErrorMessage || "An unexpected error occurred.";
    toast.error(errorMessage);
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const getAllCohort = async () => {
  try {
    const { data } = await axiosClient.get(`/api/cohorts`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCohortById = async (id: number) => {
  try {
    const { data } = await axiosClient.get(`/api/cohorts/${id}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const createCohort = async (formData: { cohortCode: string }) => {
  try {
    const { data } = await axiosClient.post(`/api/cohorts`, formData);
    toast.success("Create Cohort successfully");
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateCohort = async (
  id: number,
  formData: {
    cohortCode: string;
  }
) => {
  try {
    const { data } = await axiosClient.put(`/api/cohorts/${id}`, formData);
    toast.success("Update Cohort Successfully");
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const deleteCohort = async (id: number) => {
  try {
    const { data } = await axiosClient.delete(`/api/cohorts/${id}`);
    toast.success("Delete Cohort successfully");
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
