import { Slot } from '@/types/slot';
import { create } from 'zustand'

type BookingState = {
    bookingDate?: Date;
    slots?: Slot[];
    setBookingInfo: (bookingDate: Date, slots: Slot[]) => void;
}
const useAuthStore = create<BookingState>((set) => ({
    bookingDate: undefined,
    slots: [],
    setBookingInfo: (bookingDate: Date, slots: Slot[]) => {
        set({
            bookingDate: bookingDate,
            slots: slots,
        })
    }
}))

export default useAuthStore;