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

export const getDashBoardStaff = async () => {
    try {
      const { data } = await axiosClient.get(`/management/data-staff-dashboard`);
      return { error: null, data: data, success: true };
    } catch (error) {
      return handleApiError(error);
    }
  };
  export const getDashBoardAdmin = async () => {
    try {
      const { data } = await axiosClient.get(`/management/data-admin-dashboard`);
      return { error: null, data: data, success: true };
    } catch (error) {
      return handleApiError(error);
    }
  };