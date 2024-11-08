import { Booking } from "@/types/booking";
import { axiosClient } from "./config/axios-client";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error?.message || error?.response?.data.error || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const createBooking = async (request: {
  userId: string;
  activityId: number;
  description: string;
  roomSlots: number[];
  bookingDate: Date;
}) => {
  try {
    const { data } = await axiosClient.post(`/api/bookings`, { ...request, status: "Pending" });
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const getAllBookingRequest = async () => {
  try {
    const { data } = await axiosClient.get(`/api/bookings?PageSize=999`);
    const bookingRequest = data.filter((booking: Booking) => booking.status === "Pending");
    return { error: null, data: bookingRequest, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const getAllBookingHistory = async () => {
  try {
    const { data } = await axiosClient.get(`/api/bookings?PageSize=999`);


    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const cancelBooking = async (id: number) => {
  try {
    const { data } = await axiosClient.put(`/api/bookings/${id}/cancel`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const acceptBooking = async (id: number) => {
  try {
    const { data } = await axiosClient.put(`/api/bookings/${id}/accept`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const denyBooking = async (id: number, reason: string) => {
  try {
    const { data } = await axiosClient.put(`/api/bookings/${id}/deny`, reason, {
      headers: { "Content-Type": "application/json" },
    });
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const checkInBooking = async (id: number) => {
  try {
    const { data } = await axiosClient.put(`/api/bookings/${id}/check-in`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getBookingById = async (id: number) => {
  try {
    const { data } = await axiosClient.get(`/api/users/${id}/bookings`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTodayBookingByRoomId = async (roomId: number) => {
  try {
    const { data } = await axiosClient.get(`/api/rooms/${roomId}/today-bookings`);
    const bookingRequest = data.filter((booking: Booking) => booking.status === "Accepted");

    return { error: null, data: bookingRequest, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
