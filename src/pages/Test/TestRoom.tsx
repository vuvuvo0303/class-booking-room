import { Booking } from "@/types/booking";
import { useEffect, useState } from "react";
import picture from "@/assets/face-recognized.png";
import { useParams } from "react-router-dom";
import { Room } from "@/types/room";
import { getRoomBooking, getRoomById } from "@/lib/api/room-api";
import { toast } from "react-toastify";
import { FaceDescriptor, User } from "@/types/user";
import BookingRecognition from "@/components/face/BookingRecognition";
import { getAllFaces, getUserBooking } from "@/lib/api/user-api";
import { VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { areDatesEqual, formatDate } from "@/utils/date";
import { formatDateToTimeString } from "@/utils/time";
const TestRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState<Room>();
  const [faces, setFaces] = useState<FaceDescriptor[]>([]);
  const [isCameraTurnOn, setIsCameraTurnOn] = useState(false);

  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchData = async () => {
      if (roomId) {
        const roomResult = await getRoomById(parseInt(roomId));
        if (roomResult.error) {
          toast.error(roomResult.error);
        } else {
          setRoom(roomResult.data);
        }
      }
      const faceResult = await getAllFaces();
      if (faceResult.error) {
        toast.error(faceResult.error);
      } else {
        setFaces(faceResult.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="relative">
        <img src={picture} alt="" />
        <h2 className="absolute left-[500px] top-10 text-3xl font-bold bg-white">
          Room {room?.roomName}
        </h2>
        <div className="absolute left-[112px] top-[155px]">
          {isCameraTurnOn ? (
            <BookingRecognition setUser={setUser} userDescriptors={faces} />
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
      {user && roomId && <UserInfo user={user} roomId={parseInt(roomId)} />}
    </div>
  );
};

const UserInfo = ({ user, roomId }: { user: User; roomId: number }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const bookingResult = await getUserBooking(user.id);
      if (bookingResult.error) {
        toast.error(bookingResult.error);
      } else {
        setBookings(bookingResult.data ?? []);
      }
    };
    fetchData();
  }, []);
  const acceptedBookings = bookings.filter((booking) => {
    if (
      areDatesEqual(new Date(booking.bookingDate), new Date()) &&
      booking.roomId == roomId &&
      booking.status == "Accepted"
    ) {
      return true;
    }
    return false;
  });
  return (
    <div>
      <p>Name: {user.fullName}</p>
      <p>Email: {user.email}</p>
      {acceptedBookings.length == 0 ? (
        <p>You don't have any accepted booking today in this room</p>
      ) : (
        <div>
          {acceptedBookings.map((booking) => {
            return (
              <div key={booking.id}>
                <p>Booking Code: {booking.code}</p>
                <p>Booked room: {booking.roomName}</p>
                <p>Booked date: {formatDate(new Date(booking.bookingDate))}</p>
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default TestRoom;
