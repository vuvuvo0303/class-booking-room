import Loader from "@/components/Loader";
import NotFound from "@/components/NotFound";
import Header from "@/components/admin/Header";
import { Badge } from "@/components/ui/badge";
import { getRoomById, getRoomSlots } from "@/lib/api/room-api";
import useAuthStore from "@/store/AuthStore";
import { Room } from "@/types/room";
import { Slot } from "@/types/slot";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CreateSlot from "./CreateSlot";
import useRerender from "@/hooks/use-rerender";
import SlotCard from "./SlotCard";

const RoomDetail = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [roomDetail, setRoomDetail] = useState<Room>();
  const [roomSlots, setRoomSlots] = useState<Slot[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { roomId } = useParams();
  const { renderKey, rerender } = useRerender();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const roomResult = await getRoomById(parseInt(roomId ?? ""));
      if (roomResult.error) {
        toast.error("False to retrieve room data");
      } else {
        setRoomDetail(roomResult.data);
      }
      const slotResult = await getRoomSlots(parseInt(roomId ?? ""));
      setIsLoading(false);
      if (slotResult.error) {
        toast.success("False to retrieve room data");
      } else {
        setRoomSlots(slotResult.data ?? []);
      }
    };
    fetchData();
  }, [renderKey]);
  const basePath = "/" + loggedUser.role;
  if (isLoading) return <Loader text="Loading room data..." />;
  if (roomDetail == null) return <NotFound />;
  return (
    <div className="bg-white">
      <Header
        currentPage={roomDetail?.roomName ?? ""}
        breadcrumbItems={[
          { title: "Dashboard", to: basePath },
          { title: "Rooms", to: basePath + "/rooms" },
        ]}
      />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">
            Room {roomDetail?.roomName}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          <p>
            Created at: {new Date(roomDetail?.createdAt ?? "").toLocaleString()}
          </p>
          <p>
            Updated at: {new Date(roomDetail?.updatedAt ?? "").toLocaleString()}
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
          {roomSlots?.length} (slot)
        </p>
        <div className="p-3">
          <div className="flex justify-between mb-2 items-center">
            <h3 className="text-xl font-semibold">Slots</h3>
            <CreateSlot roomId={roomDetail.id} rerender={rerender} />
          </div>
          <div className="flex flex-col gap-2">
            {roomSlots?.map((slot: Slot, index: number) => {
              return <SlotCard slot={slot} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
