import { Button } from "@/components/ui/button";
import { getRoomBooking } from "@/lib/api/room-api";
import useAuthStore from "@/store/AuthStore";
import useBookingStore from "@/store/BookingStore";
import { Booking } from "@/types/booking";
import { Room } from "@/types/room";
import { Slot } from "@/types/slot";
import { areDatesEqual, formatDate, isDateNotInPast } from "@/utils/date";
import { formatDateToTimeString } from "@/utils/time";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function isOneHourInAdvance(targetTime: Date) {
  const now = new Date();
  const differenceInMilliseconds = now.getTime() - targetTime.getTime();
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / millisecondsInADay
  );
  targetTime.setTime(targetTime.getTime() + differenceInDays * millisecondsInADay + 7 * 1000 * 60 * 60);
  now.setTime(now.getTime());
  console.log(targetTime + " and " +  now)
  return targetTime.getTime() >= now.getTime();
}

const Calendar = ({
  slots,
  allowedCohorts,
  room,
}: {
  slots: Slot[];
  allowedCohorts: { id: number; cohortCode: string }[];
  room: Room;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();
  const setBookingInfo = useBookingStore((state) => state.setBookingInfo);
  const loggedUser = useAuthStore((state) => state.user);
  function getWeekDates(date: Date) {
    const startDate = new Date(date);
    const weekDates = [];

    const firstDayOfWeek = startDate.getDate() - startDate.getDay();

    for (let i = 0; i < 7; i++) {
      const firstDate = new Date(startDate);
      const currentDate = new Date(firstDate.setDate(firstDayOfWeek + i));
      weekDates.push(currentDate);
    }

    return weekDates;
  }

  const weekDays = getWeekDates(new Date(currentDate));

  const handleWeekView = () => {
    setCurrentDate(new Date());
  };

  const handlePreviousWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  const handleSelectSlot = (slot: Slot) => {
    if (!selectedSlots.find((s) => s.id == slot.id)) {
      setSelectedSlots([...selectedSlots, slot]);
    } else {
      setSelectedSlots(selectedSlots.filter((s) => s.id != slot.id));
    }
    setError(undefined);
  };
  const handleSelectDate = (date: Date) => {
    if (!isDateNotInPast(date)) return;
    setSelectedDate(date);
  };

  var isAllowed = false;
  if (
    loggedUser &&
    allowedCohorts.find((cohort) => cohort.id == loggedUser.cohortId)
  ) {
    isAllowed = true;
  }
  const handleContinue = () => {
    if (selectedSlots.length == 0) {
      setError("Please select at least 1 slot.");
      return;
    }
    if (selectedSlots.length > 3) {
      setError("You cannot book more than 3 slots per booking.");
      return;
    }
    if (selectedDate) {
      setBookingInfo(selectedDate, selectedSlots, room);
      navigate("/step-process");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const bookingResult = await getRoomBooking(room.id);
      if (bookingResult.error) {
        toast.error(bookingResult.error);
      } else {
        setBookings(
          bookingResult.data?.filter(
            (booking) => booking.status == "Accepted"
          ) ?? []
        );
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold">Week Calendar</h2>
      <div className="flex justify-center items-center gap-2">
        <Button onClick={handlePreviousWeek} variant={"ghost"}>
          <ChevronLeft />
        </Button>
        <Button onClick={handleWeekView} variant={"ghost"}>
          View This Week
        </Button>
        <Button onClick={handleNextWeek} variant={"ghost"}>
          <ChevronRight />
        </Button>
      </div>
      <div className="flex mt-2 gap-2 overflow-auto w-full pb-6 pt-2">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`text-center w-40 rounded border border-gray-300 p-3 drop-shadow-sm flex-shrink-0 cursor-pointer ${
              selectedDate?.getTime() == day.getTime() &&
              "outline outline-2 outline-green-500"
            }`}
            onClick={() => handleSelectDate(day)}
          >
            <div className="font-bold">
              {day.toLocaleDateString("en-US", { weekday: "long" })}
            </div>
            <p>{formatDate(day)}</p>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              {slots.map((slot: Slot) => {
                var isBooked = false;
                for (const booking of bookings) {
                  if (areDatesEqual(new Date(booking.bookingDate), day)) {
                    for (const bookingSlot of booking.roomSlots) {
                      if (bookingSlot.id == slot.id) {
                        isBooked = true;
                        break;
                      }
                    }
                  }
                  if (isBooked) {
                    break;
                  }
                }
                var isToday = areDatesEqual(new Date(), day);
                var canBook =
                  isDateNotInPast(day) &&
                  ((isOneHourInAdvance(new Date(slot.startTime)) && isToday) ||
                    !isToday);
                return (
                  <Button
                    key={`slot-${slot.id}`}
                    className={`w-full ${
                      selectedSlots.find((s) => s.id == slot.id) &&
                      selectedDate?.getTime() == day.getTime() &&
                      "bg-green-500 hover:bg-green-300"
                    } ${isBooked && "outline outline-red-500"}`}
                    variant={"outline"}
                    onClick={() => {
                      handleSelectSlot(slot);
                    }}
                    disabled={!canBook || isBooked}
                  >
                    {canBook ? (
                      <>
                        {formatDateToTimeString(new Date(slot.startTime), true)}{" "}
                        - {formatDateToTimeString(new Date(slot.endTime), true)}
                      </>
                    ) : (
                      "--"
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {!loggedUser && (
        <div className="text-2xl mt-2 text-red-500">
          You need to login to book this room
        </div>
      )}
      {loggedUser && !isAllowed && (
        <div className="text-2xl mt-2 text-red-500">
          You don't have permission to book this room
        </div>
      )}
      {loggedUser && isAllowed && selectedDate && (
        <div className="bg-white p-5 rounded-md drop-shadow-lg mt-5 w-[400px]">
          <div className="text-2xl font-semibold">Booking Information</div>
          <div>
            <span className="font-semibold">Date: </span>
            {formatDate(selectedDate)}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="font-semibold">Slot: </span>
            {selectedSlots.map((slot: Slot) => {
              return (
                <button
                  key={`booking-slot-${slot.id}`}
                  className="outline-green-500 outline bg-white-green-500 bg-green-200 hover:bg-green-100 px-2 py-1 rounded-md font-semibold"
                  onClick={() => handleSelectSlot(slot)}
                >
                  {formatDateToTimeString(new Date(slot.startTime), true)} -{" "}
                  {formatDateToTimeString(new Date(slot.endTime), true)}
                </button>
              );
            })}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-5">
            <Button className="w-full" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
