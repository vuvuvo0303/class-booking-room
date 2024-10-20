import { User } from "@/types/user";
import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    console.log(error);
    const errorMessage = error?.response?.data || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data } = await axiosClient.post(`/api/auth/login`, { email: email, password: password });

    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const loginGoogle = async (role: string, accessToken: string) => {
  try {
    const { data } = await axiosClient.post(`/api/auth/login-google`, { role: role, accessToken: accessToken });

    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const checkToken = async () => {
  try {
    const { data }: { data?: User } = await axiosClient.get(`/api/auth/token`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
