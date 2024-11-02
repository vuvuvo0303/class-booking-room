import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NotFound from "@/components/NotFound";
import { Badge } from "@/components/ui/badge";
import { getRoomById } from "@/lib/api/room-api";
import { Room } from "@/types/room";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Calendar from "./Calendar";
import { cn } from "@/lib/utils";
import { getRandomColor } from "@/utils/color";
import { RoomTypes } from "@/types/room-type";
import { getRoomTypeById } from "@/lib/api/room-type-api";
import SomethingWentWrong from "@/components/SomethingWentWrong";

const RoomDetail = () => {
  const [roomDetail, setRoomDetail] = useState<Room>();
  const [roomType, setRoomType] = useState<RoomTypes>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const handleError = () => {
    setImgSrc(
      "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/nhung-tien-ich-tai-dh-fpt-hcm-3-650x433.jpeg"
    );
  };
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
        setImgSrc(roomDetailResult.data.picture);
        const roomTypeResult = await getRoomTypeById(
          roomDetailResult.data.roomType.id
        );
        if (roomTypeResult.error) {
          toast.error(roomTypeResult.error);
        } else {
          setRoomType(roomTypeResult.data);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  if (isLoading) return <Loader />;
  if (!isLoading && roomDetail == null) {
    return <NotFound />;
  }
  if (!isLoading && roomType == null) {
    return <SomethingWentWrong />;
  }
  return (
    <MaxWidthWrapper>
      <div className="bg-white">
        <div className="p-3">
          <img
            src={imgSrc}
            className="h-[200px] w-full rounded-lg object-cover"
            alt=""
            onError={handleError}
          />
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
            {roomDetail?.roomType.name}
          </p>
          <p className="">
            <span className="font-semibold">Capacity:</span>{" "}
            {roomDetail?.capacity}
          </p>
          <div className="flex gap-2">
            <span className="font-semibold">Allowed cohort:</span>{" "}
            <div className="flex gap-2">
              {roomType?.allowedCohorts.map((cohort) => {
                const color = getRandomColor(cohort.cohortCode);
                return (
                  <Badge
                    className={cn(`bg-${color}-500 hover:bg-${color}-300`)}
                    key={`allowed-cohort-${cohort.id}`}
                  >
                    {cohort.cohortCode}
                  </Badge>
                );
              })}
              {roomType?.allowedCohorts.length == 0 && "None"}
            </div>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Allowed activity:</span>{" "}
            <div className="">
              {roomType?.allowedActivities.map((activity) => {
                return (
                  <p key={`allowed-activity-${activity.id}`}>
                    {activity.code} - {activity.name}
                  </p>
                );
              })}
              {roomType?.allowedActivities.length == 0 && "None"}
            </div>
          </div>
          <div className="">
            <span className="font-semibold">Status:</span>{" "}
            <Badge>{roomDetail?.status}</Badge>
          </div>
          <p className="">
            <span className="font-semibold">Number of slots:</span>{" "}
            {roomDetail?.roomSlots?.length} (slot)
          </p>

          <div className="mt-2">
            {roomDetail && (
              <Calendar
                slots={roomDetail.roomSlots}
                allowedCohorts={roomType!.allowedCohorts}
                room={roomDetail}
              />
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default RoomDetail;
