import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import { getActivitiesByDepartmentId } from "@/lib/api/activity-api";
import { getAvailableRooms } from "@/lib/api/room-api";
import useAuthStore from "@/store/AuthStore";
import useBookingStore from "@/store/BookingStore";
import { Activity } from "@/types/department";
import { Room } from "@/types/room";
import { formatDateToTimeString } from "@/utils/time";
import { Button, DatePicker, Form, Input, Select, Tag, TimePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingListRoom = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [rooms, setRooms] = useState<Room[]>();
  const loggedUser = useAuthStore((state) => state.user);
  const setActivity = useBookingStore((state) => state.setActivity);
  const setBookingDate = useBookingStore((state) => state.setBookingDate);
  const [form] = Form.useForm();

  const onChangeActivity = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        if (loggedUser?.departmentId) {
          const result = await getActivitiesByDepartmentId(
            loggedUser.departmentId
          );
          if (result.error) {
            toast.error(result.error);
          } else {
            setActivities(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
      setIsLoading(false);
    };

    fetchInitialData();
  }, [loggedUser?.departmentId]);

  const onSearchRooms = async () => {
    try {
      setIsLoading(true);
      const values = form.getFieldsValue();
      const { activity, time, date } = values;
      setActivity(activities.find((a) => a.id == activity)!);
      setBookingDate(new Date(dayjs(date).toISOString()));
      if (!activity || !time || !date) {
        toast.error("Please fill in all fields.");
        setIsLoading(false);
        return;
      }

      // const startTime = dayjs(date)
      //   .set("hour", time[0].hour())
      //   .set("minute", time[0].minute())
      //   .format("YYYY-MM-DDTHH:mm:ss");
      // const endTime = dayjs(date)
      //   .set("hour", time[1].hour())
      //   .set("minute", time[1].minute())
      //   .format("YYYY-MM-DDTHH:mm:ss");
      const startTime = dayjs(time[0]).toISOString();
      const endTime = dayjs(time[1]).toISOString();
      const bookingDate = dayjs(date).format("YYYY-MM-DD");

      const resultRoom = await getAvailableRooms({
        activityId: activity,
        cohortId: loggedUser?.departmentId || 0,
        startTime,
        endTime,
        bookingDate,
      });
      if (resultRoom.error) {
        toast.error(resultRoom.error);
      } else {
        setRooms(resultRoom.data);
      }
    } catch (error) {
      console.error("Error searching rooms:", error);
      toast.error("Error searching rooms");
    }
    setIsLoading(false);
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-center py-6">
        <div className="p-6 bg-white rounded-md shadow-2xl mx-4">
          <span className="text-2xl font-bold">
            Fill in booking information
          </span>
          <div className="pt-6">
            <Form
              form={form}
              layout="vertical"
              className="grid grid-cols-12 gap-3 w-[450px]"
              onFinish={onSearchRooms}
            >
              <Form.Item label="Department" className="col-span-6">
                <Input value={loggedUser?.departmentName || "N/A"} disabled />
              </Form.Item>
              <Form.Item
                name="activity"
                label="Activity"
                className="col-span-6"
              >
                <Select
                  showSearch
                  placeholder="Select an activity"
                  optionFilterProp="label"
                  onChange={onChangeActivity}
                  options={activities.map((activity) => ({
                    value: activity.id,
                    label: `${activity.code} - ${activity.name}`,
                  }))}
                />
              </Form.Item>
              <Form.Item name="time" label="Time" className="col-span-6">
                <TimePicker.RangePicker format="HH:mm" minuteStep={15} />
              </Form.Item>
              <Form.Item name="date" label="Date" className="col-span-6">
                <DatePicker className="w-full" format={"DD/MM/YYYY"} />
              </Form.Item>
              <Form.Item className="col-span-12">
                <Button block type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <MaxWidthWrapper className="p-5 gap-2 grid grid-cols-12">
        {rooms?.map((room: Room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </MaxWidthWrapper>
      {
        rooms && rooms.length == 0 && (
          <p className="text-xl text-red-500 text-center">No room is available</p>
        )
      }
    </div>
  );
};

const RoomCard = ({ room }: { room: Room }) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState<string>(room.picture ?? "");
  const setRoom = useBookingStore((state) => state.setRoom);
  const handleError = () => {
    setImgSrc(
      "https://daihoc.fpt.edu.vn/wp-content/uploads/2023/08/nhung-tien-ich-tai-dh-fpt-hcm-3-650x433.jpeg"
    );
  };
  const handleSelectRoom = () => {
    setRoom(room);
    navigate("/step-process");
  };
  return (
    <Card className="col-span-3 drop-shadow-lg">
      <img
        className="rounded-lg h-[180px] w-full object-cover"
        onError={handleError}
        src={imgSrc}
      />
      <div className="flex flex-col gap-3 p-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">Room Name:</span>
          <span className="text-black">{room.roomName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">Room Type:</span>
          <span className="text-black">{room.roomType.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-semibold text-black">Available slots:</div>
          <div className="flex flex-col gap-1">
            {room.roomSlots.map((slot) => (
              <div
                key={`slot-${slot.id}`}
                className="bg-blue-300 border border-blue-500 rounded p-1"
              >
                {formatDateToTimeString(new Date(slot.startTime), true)}-
                {formatDateToTimeString(new Date(slot.endTime), true)}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">Status :</span>
          <span className="text-black">
            <Tag color="success">{room.status}</Tag>
          </span>
        </div>
        <Button className="w-full" onClick={handleSelectRoom}>
          Book this room
        </Button>
      </div>
    </Card>
  );
};
export default BookingListRoom;
