import { Activity } from '@/types/department';
import { Room } from '@/types/room';
import { Slot } from '@/types/slot';
import { create } from 'zustand'

type BookingState = {
    bookingDate?: Date;
    slots?: Slot[];
    room?: Room;
    activity?: Activity;
    note: string;
    setBookingDate: (bookingDate: Date) => void;
    setSlots: (slot: Slot[]) => void;
    setRoom: (room: Room) => void;
    setActivity: (activity: Activity) => void;
    setNote: (note: string) => void;
    clearBookingInfo: () => void;
}
const useBookingStore = create<BookingState>((set) => {
    const localStorageState = localStorage.getItem("bookingState");
    const initialState = localStorageState ? JSON.parse(localStorageState) : {
        bookingDate: undefined,
        slots: [],
        room: undefined,
        note: "",
        activity: undefined
    };
    return {
        ...initialState,
        setBookingDate: (bookingDate: Date) => {
            set((prev) => {
                const newState = {
                    ...prev, bookingDate: bookingDate
                };
                localStorage.setItem("bookingState", JSON.stringify(newState));
                return newState
            });
        },
        setRoom: (room: Room) => {
            set((prev) => {
                const newState = {
                    ...prev, room: room
                };
                localStorage.setItem("bookingState", JSON.stringify(newState));
                return newState
            });
        },
        setSlots: (slots: Slot[]) => {
            set((prev) => {
                const newState = {
                    ...prev, slots: slots
                };
                localStorage.setItem("bookingState", JSON.stringify(newState));
                return newState
            });
        },
        setActivity: (activity: Activity) => {
            set((prev) => {
                const newState = {
                    ...prev, activity: activity
                };
                localStorage.setItem("bookingState", JSON.stringify(newState));
                return newState
            });
        },
        setNote: (note: string) => {
            set((prev) => {
                const newState = { ...prev, note: note };
                localStorage.setItem("bookingState", JSON.stringify(newState));
                return newState
            });
        },
        clearBookingInfo: () => {
            localStorage.removeItem("bookingState");
            set({
                bookingDate: undefined,
                slots: [],
                room: undefined,
                note: "",
                activity: undefined
            });
        }
    }
})

export default useBookingStore;