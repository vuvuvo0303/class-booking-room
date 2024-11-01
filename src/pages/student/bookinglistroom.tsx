import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RoomCard from "@/components/RoomCard";
import { getActivitiesByDepartmentId } from "@/lib/api/activity-api";
import { getAllRoom, } from "@/lib/api/room-api";
import useAuthStore from "@/store/AuthStore";
import { Activity } from "@/types/department";
import { Room } from "@/types/room";
import { Button, DatePicker, DatePickerProps, Form, Input, Select, TimePicker } from "antd";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookingListRoom = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]); // State cho danh sách hoạt động
  const [rooms, setRooms] = useState<Room[]>([]);
  const loggedUser = useAuthStore((state) => state.user);

  const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangeActivity = (value: string) => {
    console.log(`selected ${value}`);
  };

  // Fetch rooms on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resultRoom = await getAllRoom();
        if (resultRoom.error) {
          toast.error(resultRoom.error);
        } else {
          setRooms(resultRoom.data.filter((room: Room) => room.status !== "Inactive"));
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
    const fetchActivities = async () => {
      if (loggedUser?.departmentId) {
        const result = await getActivitiesByDepartmentId(loggedUser.departmentId);
        if (result.error) {
          toast.error(result.error);
        } else {
          setActivities(result.data);
        }
      }
    };

    fetchActivities();
  }, [loggedUser?.departmentId]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-center py-6">
        <div className="p-6 bg-white rounded-md shadow-2xl mx-4">
          <span className="text-2xl font-bold">Classroom Suggestions</span>
          <div className="pt-6">
            <Form layout="vertical">
              <Form.Item label="Department">
                <Input value={loggedUser?.departmentName || "N/A"} disabled />
              </Form.Item>
              <Form.Item name="activity" label="Activity">
                <Select
                  showSearch
                  placeholder="Select an activity"
                  optionFilterProp="label"
                  onChange={onChangeActivity}
                  options={activities.map((activity) => ({
                    value: activity.id,
                    label: activity.name,
                  }))}
                />
              </Form.Item>
              <Form.Item name="time" label="Time">
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
              <Form.Item name="date" label="Date">
                <DatePicker onChange={onChange} className="w-[260px]" />
              </Form.Item>
              <Button block type="primary" htmlType="submit">
                Search
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <MaxWidthWrapper className="p-5 gap-2 grid grid-cols-12">
        {rooms.map((room: Room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </MaxWidthWrapper>
    </div>
  );
};

export default BookingListRoom;
