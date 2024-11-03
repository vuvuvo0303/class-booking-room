import { Booking } from "@/types/booking";
import { useEffect, useState } from "react";
import picture from "@/assets/face-recognized.png";
import { useParams } from "react-router-dom";
import { Room } from "@/types/room";
import { getRoomById } from "@/lib/api/room-api";
import { toast } from "react-toastify";
import BookingRecognition from "@/components/face/BookingRecognition";
import { VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/date";
import { formatDateToTimeString } from "@/utils/time";
import { checkInBooking, getTodayBookingByRoomId } from "@/lib/api/booking-api";
import useRerender from "@/hooks/use-rerender";
const TestRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState<Room>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const [isCameraTurnOn, setIsCameraTurnOn] = useState(false);
  const { rerender, renderKey } = useRerender();
  const handleCheckIn = async (bookingId: number) => {
    const checkInResult = await checkInBooking(bookingId);
    if (checkInResult.error) {
      toast.error(checkInResult.error);
    } else {
      toast.success("Check in successfully");
      setTimeout(() => {
        rerender();
      }, 1000);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (roomId) {
        const roomResult = await getRoomById(parseInt(roomId));
        if (roomResult.error) {
          toast.error(roomResult.error);
        } else {
          setRoom(roomResult.data);
        }
        const bookingsResult = await getTodayBookingByRoomId(parseInt(roomId));
        if (bookingsResult.error) {
          toast.error(bookingsResult.error);
        } else {
          setBookings(bookingsResult.data);
        }
      }
    };

    fetchData();
  }, [renderKey]);

  return (
    <div>
      <div className="relative">
        <img src={picture} alt="" />
        <h2 className="absolute left-[500px] top-10 text-3xl font-bold bg-white">
          Room {room?.roomName}
        </h2>
        <div className="absolute left-[112px] top-[155px]">
          {isCameraTurnOn ? (
            <BookingRecognition
              bookings={bookings}
              setSelectedBooking={setSelectedBooking}
            />
          ) : (
            <div className="w-[135px] h-[105px] bg-gray-300 rounded flex justify-center items-center">
              <VideoOff />
            </div>
          )}
        </div>
        <Button
          className="absolute left-[120px] bottom-[120px] bg-black hover:bg-gray-700"
          onClick={() => setIsCameraTurnOn(!isCameraTurnOn)}
        >
          Toogle camera
        </Button>
      </div>
      {bookings.length == 0 ? (
        <p>This room doesn't have any booking today</p>
      ) : (
        <div>
          {bookings.map((booking) => {
            return (
              <div
                key={booking.id}
                className={`border p-3 ${
                  selectedBooking?.id == booking.id && "bg-green-200"
                }`}
              >
                <p>Booking Code: {booking.code}</p>
                <p>Student name: {booking.studentFullName}</p>
                <p>Student email: {booking.studentEmail}</p>
                <p>Booked room: {booking.roomName}</p>
                <p>Booked date: {formatDate(new Date(booking.bookingDate))}</p>
                <p>Status: {booking.status}</p>
                <div>
                  Booked slots:
                  {booking.roomSlots.map((slot) => (
                    <div key={slot.id} className="">
                      {`${formatDateToTimeString(
                        new Date(slot.startTime),
                        true
                      )} - ${formatDateToTimeString(
                        new Date(slot.endTime),
                        true
                      )}`}
                    </div>
                  ))}
                </div>
                {selectedBooking?.id == booking.id && (
                  <Button
                    onClick={() => {
                      handleCheckIn(booking.id);
                    }}
                  >
                    Check in
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestRoom;
