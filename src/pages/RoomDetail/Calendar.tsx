import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/AuthStore";
import { Slot } from "@/types/slot";
import { areDatesEqual, formatDate } from "@/utils/date";
import { formatDateToTimeString } from "@/utils/time";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Calendar = ({ slots }: { slots: Slot[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
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
  };
  const handleSelectDate = (date: Date) => {
    if (areDatesEqual(date, new Date()) < 0) return;
    setSelectedDate(date);
  };
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
                return (
                  <Button
                    key={`slot-${slot.id}`}
                    className={`w-full ${
                      selectedSlots.find((s) => s.id == slot.id) &&
                      selectedDate?.getTime() == day.getTime() &&
                      "bg-green-500 hover:bg-green-300"
                    }`}
                    variant={"outline"}
                    onClick={() => {
                      handleSelectSlot(slot);
                    }}
                    disabled={areDatesEqual(day, new Date()) < 0}
                  >
                    {formatDateToTimeString(new Date(slot.startTime), true)} -{" "}
                    {formatDateToTimeString(new Date(slot.endTime), true)}
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
      {loggedUser && selectedDate && (
        <div className="bg-white p-5 rounded-md drop-shadow-lg mt-5 w-[400px]">
          <div className="text-2xl font-semibold">Booking Information</div>
          <div>
            <span className="font-semibold">Date: </span>
            {formatDate(selectedDate)}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="font-semibold">Slot: </span>
            {selectedSlots.map((slot: Slot) => {
              return (
                <button
                  key={`booking-slot-${slot.id}`}
                  className="bg-green-500 hover:bg-green-400 px-2 py-1 rounded-md"
                  onClick={() => handleSelectSlot(slot)}
                >
                  {formatDateToTimeString(new Date(slot.startTime), true)} -{" "}
                  {formatDateToTimeString(new Date(slot.endTime), true)}
                </button>
              );
            })}
          </div>
          <div className="mt-5">
            <Button className="w-full">Submit</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;