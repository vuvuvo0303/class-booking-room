import { Slot } from "./slot";

export type Room = {
  id: number;
  roomName: string;
  capacity: number;
  status: string;
  roomTypeId: number;
  roomTypeName: string;
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;
  roomSlots: Slot[];
};
