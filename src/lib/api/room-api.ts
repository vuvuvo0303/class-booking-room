import { toast } from "react-toastify";
import { axiosClient } from "./config/axios-client";
import { Slot } from "@/types/slot";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.Errors?.ErrorMessage || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const getAllRoom = async () => {
  try {
    const { data } = await axiosClient.get(`/api/rooms`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRoomById = async (roomId: number) => {
  try {
    const { data } = await axiosClient.get(`/api/rooms/${roomId}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRoomSlots = async (roomId: number) => {
  try {
    const { data } = await axiosClient.get(`/api/rooms/${roomId}/slots`);
    return { error: null, data: data as Slot[], success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createRoom = async (formData: {
  roomName: string;
  capacity: number;
  roomTypeId: number;
  status: string;
}) => {
  try {
    const { data } = await axiosClient.post(`/api/rooms`, formData);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteRoom = async (id: number) => {
  try {
    const { data } = await axiosClient.delete(`/api/rooms/${id}`);
    toast.success("Delete Room  Successfully");

    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateRoom = async (
  id: number,
  formData: {
    roomName: string;
    capacity: number;
    roomTypeId: number;
    status: string;
  }
) => {
  try {
    const { data } = await axiosClient.put(`/api/rooms/${id}`, formData);
    toast.success("Update Room  Successfully");

    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createRoomSlot = async (formData: {
  startTime: string;
  endTime: string
  roomId: number;
}) => {
  try {
    const { data } = await axiosClient.post(`/api/rooms/slots`, formData);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const updateRoomSlot = async (formData: {
  startTime: string;
  endTime: string
}, roomSlotId: number) => {
  try {
    const { data } = await axiosClient.put(`/api/rooms/slots/${roomSlotId}`, formData);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const deleteRoomSlot = async (slotId: number) => {
  try {
    const { data } = await axiosClient.delete(`/api/rooms/slots/${slotId}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};