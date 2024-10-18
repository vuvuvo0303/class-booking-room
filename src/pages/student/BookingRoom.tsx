import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RoomCard from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { getAllRoom } from "@/lib/api/room-api";
import { getAllRoomType } from "@/lib/api/room-type-api";
import useAuthStore from "@/store/AuthStore";
import { Room } from "@/types/room";
import { RoomTypes } from "@/types/room-type";
import { Card, Image, Input, Select, Tag } from "antd";
import { SearchProps } from "antd/es/input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookingRoom = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomTypes[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { Search } = Input;

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const resultRoom = await getAllRoom();
      if (resultRoom.error) {
        toast.error(resultRoom.error);
      } else {
        setRooms(resultRoom.data);
      }
      const roomTypeResult = await getAllRoomType();
      if (roomTypeResult.error) {
        toast.error(roomTypeResult.error);
      } else {
        setRoomTypes(roomTypeResult.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const roomTypeOptions = roomTypes.map((x) => {
    return { value: x.id, label: x.name };
  });
  if (isLoading) return <Loader />;
  return (
    <div className="py-20">
      <div className="w-screen bg-blue-900 rounded-md py-9">
        <div className="flex justify-center gap-8">
          <span className="text-6xl">Hello!!</span>
          <span className="text-6xl">{loggedUser?.fullName || "Guest"}</span>
        </div>
        <div className="flex items-center justify-center gap-10 pt-8">
          <div className="w-1/4">
            <div>
              <label
                htmlFor="roomSearch"
                className="block text-lg font-medium text-white mb-2"
              >
                Room Name
              </label>
            </div>
            <Search
              id="roomSearch"
              placeholder="Search Room Name"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div>

          <div>
            <label
              htmlFor="statusSelect"
              className="block text-lg font-medium text-white mb-2"
            >
              Status
            </label>
            <Select
              id="statusSelect"
              className="w-[150px]"
              placeholder="Select a status"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "1", label: "Open" },
                { value: "2", label: "Close" },
                { value: "3", label: "Repairing" },
              ]}
            />
          </div>
          <div>
            <label
              htmlFor="statusSelect"
              className="block text-lg font-medium text-white mb-2"
            >
              Room Types
            </label>
            <Select
              id="statusSelect"
              className="w-[170px]"
              placeholder="Select a Room Type"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={roomTypeOptions}
            />
          </div>
          <div>
            <label
              htmlFor="statusSelect"
              className="block text-lg font-medium text-white mb-2"
            >
              Capacity
            </label>
            <Select
              id="statusSelect"
              className="w-[150px]"
              placeholder="Select a Capacity"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "1", label: "Open" },
                { value: "2", label: "Close" },
                { value: "3", label: "Repairing" },
              ]}
            />
          </div>
        </div>
      </div>
      <MaxWidthWrapper className="p-5 gap-2 grid grid-cols-12">
        {rooms.map((room: Room) => {
          return <RoomCard room={room} key={room.id} />;
        })}
      </MaxWidthWrapper>
    </div>
  );
};

export default BookingRoom;
