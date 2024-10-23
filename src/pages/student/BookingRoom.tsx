import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RoomCard from "@/components/RoomCard";
import { getAllRoom } from "@/lib/api/room-api";
import { getAllRoomType } from "@/lib/api/room-type-api";
import useAuthStore from "@/store/AuthStore";
import { Room } from "@/types/room";
import { RoomTypes } from "@/types/room-type";
import { Input, Select, InputNumber } from "antd"; 
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookingRoom = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomTypes[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  // Thêm state cho Min/Max Capacity
  const [minCapacity, setMinCapacity] = useState<number | undefined>(undefined);
  const [maxCapacity, setMaxCapacity] = useState<number | undefined>(undefined);

  const [selectedRoomType, setSelectedRoomType] = useState<number | null>(null); 
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);

  const { Search } = Input;

  const onSearch = async (searchValue: string) => {
    const searchParams: any = {};

    if (searchValue) searchParams.searchValue = searchValue;
    if (selectedRoomType !== null) searchParams.roomTypeId = selectedRoomType;
    if (selectedStatus !== undefined) searchParams.status = selectedStatus; 
    if (minCapacity !== undefined) searchParams.minCapacity = minCapacity; 
    if (maxCapacity !== undefined) searchParams.maxCapacity = maxCapacity; 

    console.log("Search Params:", searchParams); 

    setIsLoading(true);
    try {
      const resultRoom = await getAllRoom(searchParams);
      if (resultRoom.error) {
        toast.error(resultRoom.error);
      } else {
        console.log("Search Results:", resultRoom.data); 
        setRooms(resultRoom.data);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Error fetching rooms");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resultRoom = await getAllRoom();
        if (resultRoom.error) {
          toast.error(resultRoom.error);
        } else {
          setRooms(resultRoom.data.filter((room: Room) => room.status != "Inactive"));
        }
        const roomTypeResult = await getAllRoomType();
        if (roomTypeResult.error) {
          toast.error(roomTypeResult.error);
        } else {
          
          setRoomTypes([{ id: null, name: "All" }, ...roomTypeResult.data]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  
  useEffect(() => {
    onSearch("");
  }, [selectedStatus, selectedRoomType, minCapacity, maxCapacity]);

  
  const roomTypeOptions = roomTypes.map((x) => {
    return { value: x.id, label: x.name };
  });

  if (isLoading) return <Loader />;

  return (
    <div className="pb-10">
      <div className="w-screen bg-blue-900 rounded-md py-9">
        <div className="flex justify-center gap-8">
          <span className="text-6xl">Hello!!</span>
          <span className="text-6xl">{loggedUser?.fullName || "Guest"}</span>
        </div>
        <div className="flex items-center justify-center gap-10 pt-8">
          <div className="w-1/4">
            <div>
              <label htmlFor="roomSearch" className="block text-lg font-medium text-white mb-2">
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
            <label htmlFor="statusSelect" className="block text-lg font-medium text-white mb-2">
              Status
            </label>
            <Select
              id="statusSelect"
              className="w-[150px]"
              placeholder="Select a status"
              value={selectedStatus}
              onChange={(value) => {
                console.log("Selected status:", value);
                setSelectedStatus(value);
              }}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={[
                { value: "Active", label: "Active" },
                { value: "Repairing", label: "Repairing" },
              ]}
            />
          </div>

          <div>
            <label htmlFor="roomTypeSelect" className="block text-lg font-medium text-white mb-2">
              Room Types
            </label>
            <Select
              id="roomTypeSelect"
              className="w-[170px]"
              placeholder="Select a Room Type"
              value={selectedRoomType === null ? null : selectedRoomType}
              onChange={(value) => {
                console.log("Selected Room Type:", value);
                setSelectedRoomType(value === null ? null : value); 
              }}
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              options={roomTypeOptions}
            />
          </div>

          <div>
            <label htmlFor="minCapacity" className="block text-lg font-medium text-white mb-2">
              Min Capacity
            </label>
            <InputNumber
              id="minCapacity"
              className="w-[150px]"
              placeholder="Min Capacity"
              value={minCapacity}
              onChange={(value) => setMinCapacity(value)}
            />
          </div>

          <div>
            <label htmlFor="maxCapacity" className="block text-lg font-medium text-white mb-2">
              Max Capacity
            </label>
            <InputNumber
              id="maxCapacity"
              className="w-[150px]"
              placeholder="Max Capacity"
              value={maxCapacity}
              onChange={(value) => setMaxCapacity(value)} 
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
