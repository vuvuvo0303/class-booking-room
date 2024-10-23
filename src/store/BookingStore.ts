import { Slot } from '@/types/slot';
import { create } from 'zustand'

type BookingState = {
    bookingDate?: Date;
    slots?: Slot[];
    setBookingInfo: (bookingDate: Date, slots: Slot[]) => void;
    clearBookingInfo: () => void;
}
const useBookingStore = create<BookingState>((set) => {
    const localStorageState = localStorage.getItem("bookingState");
    const initialState = localStorageState ? JSON.parse(localStorageState) : {
        bookingDate: undefined,
        slots: [],
    };
    return {
        ...initialState,
        setBookingInfo: (bookingDate: Date, slots: Slot[]) => {
            const newState = {
                bookingDate: bookingDate,
                slots: slots,
            };
            localStorage.setItem("bookingState", JSON.stringify(newState));
            set(newState);
        },
        clearBookingInfo: () => {
            localStorage.removeItem("bookingState");
            set({
                bookingDate: undefined,
                slots: [],
            });
        }
    }
})

export default useBookingStore;