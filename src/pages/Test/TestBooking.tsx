import { getAllRoom } from "@/lib/api/room-api";
import { Room } from "@/types/room";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const TestBooking = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultRoom = await getAllRoom();
        if (resultRoom.error) {
          toast.error(resultRoom.error);
        } else {
          setRooms(
            resultRoom.data.filter((room: Room) => room.status != "Inactive")
          );
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {rooms.map((room: Room) => {
        return (
          <Link key={room.id} to={`/test/scan-room/${room.id}`}>
            <div className="text-blue-500 underline">Go to room {room.roomName}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default TestBooking;
