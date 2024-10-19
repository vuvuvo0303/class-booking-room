import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NotFound from "@/components/NotFound";
import { Badge } from "@/components/ui/badge";
import { getRoomById } from "@/lib/api/room-api";
import { Room } from "@/types/room";
import { Slot } from "@/types/slot";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Calendar from "./Calendar";

const RoomDetail = () => {
  const [roomDetail, setRoomDetail] = useState<Room>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { roomId } = useParams();
  if (roomId == null) {
    return <NotFound />;
  }
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const roomDetailResult = await getRoomById(parseInt(roomId));
      if (roomDetailResult.error) {
        toast.error(roomDetailResult.error);
      } else {
        setRoomDetail(roomDetailResult.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  if (isLoading) return <Loader />;
  if (roomDetail == null) {
    return <NotFound />;
  }
  return (
    <MaxWidthWrapper>
      <div className="bg-white">
        <div className="p-3">
          <div className="flex">
            <span className="text-4xl font-semibold">
              Room {roomDetail?.roomName}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            <p>
              Created at:{" "}
              {new Date(roomDetail?.createdAt ?? "").toLocaleString()}
            </p>
            <p>
              Updated at:{" "}
              {new Date(roomDetail?.updatedAt ?? "").toLocaleString()}
            </p>
          </div>
          <p className="">
            <span className="font-semibold">Type:</span>{" "}
            {roomDetail?.roomTypeName}
          </p>
          <div className="">
            <span className="font-semibold">Status:</span>{" "}
            <Badge>{roomDetail?.status}</Badge>
          </div>
          <p className="">
            <span className="font-semibold">Number of slots:</span>{" "}
            {roomDetail?.roomSlots?.length} (slot)
          </p>
          <div className="mt-2">
            <Calendar slots={roomDetail?.roomSlots}/>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default RoomDetail;
