import { toast } from "react-toastify";
import { axiosClient } from "./config/axios-client";
import { Slot } from "@/types/slot";
import uploadFile from "@/utils/upload";

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.Errors?.ErrorMessage || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};

export const getAllRoom = async (searchParams?: {
  searchValue?: string;
  roomTypeId?: number;
  status?: string;
  minCapacity?: number;
  maxCapacity?: number;
}) => {
  try {
    const query = new URLSearchParams(searchParams as any).toString(); // Chuyển searchParams thành query string
    const { data } = await axiosClient.get(`/api/rooms?${query}`); // Gửi request với query string
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
  picture: FileList | string;
}) => {
  try {
    let avatarUrl = formData.picture;

    
    if (formData.picture instanceof FileList && formData.picture.length > 0) {
  
      avatarUrl = await uploadFile(formData.picture[0]);
    }

    
    const roomData = {
      roomName: formData.roomName,
      capacity: formData.capacity,
      roomTypeId: formData.roomTypeId,
      status: formData.status,
      picture: avatarUrl, 
    };

    
    const { data } = await axiosClient.post(`/api/rooms`, roomData);
    toast.success("Create Room Successfully")
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
    picture?: File | string; 
  }
) => {
  try {
    let pictureUrl = formData.picture;

    
    if (formData.picture && formData.picture instanceof File) {
      pictureUrl = await uploadFile(formData.picture); 
    }

  
    const updatedData = {
      roomName: formData.roomName,
      capacity: formData.capacity,
      roomTypeId: formData.roomTypeId,
      status: formData.status,
      picture: pictureUrl, 
    };

    
    const { data } = await axiosClient.put(`/api/rooms/${id}`, updatedData);
    toast.success("Update Room Successfully");

    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createRoomSlot = async (formData: { startTime: string; endTime: string; roomId: number }) => {
  try {
    const { data } = await axiosClient.post(`/api/rooms/slots`, formData);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
export const updateRoomSlot = async (
  formData: {
    startTime: string;
    endTime: string;
  },
  roomSlotId: number
) => {
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
