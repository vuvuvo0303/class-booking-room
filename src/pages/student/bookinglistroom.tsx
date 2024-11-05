import Loader from "@/components/Loader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RoomCard from "@/components/RoomCard";
import { getActivitiesByDepartmentId } from "@/lib/api/activity-api";
import { getAvailableRooms } from "@/lib/api/room-api"; 
import useAuthStore from "@/store/AuthStore";
import { Activity } from "@/types/department";
import { Room } from "@/types/room";
import { Button, DatePicker, Form, Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookingListRoom = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const loggedUser = useAuthStore((state) => state.user);

  const [form] = Form.useForm();

  const onChangeActivity = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        if (loggedUser?.departmentId) {
          const result = await getActivitiesByDepartmentId(loggedUser.departmentId);
          if (result.error) {
            toast.error(result.error);
          } else {
            setActivities(result.data);
          }
        }

        const defaultParams = {
          activityId: 1,              
          cohortId: loggedUser?.departmentId || 0,
          startTime: dayjs().format("YYYY-MM-DDT08:00:00"),
          endTime: dayjs().format("YYYY-MM-DDT10:00:00"),
          bookingDate: dayjs().format("YYYY-MM-DD"),
        };
        const resultRoom = await getAvailableRooms(defaultParams);
        if (resultRoom.error) {
          toast.error(resultRoom.error);
        } else {
          setRooms(resultRoom.data);
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

      if (!activity || !time || !date) {
        toast.error("Please fill in all fields.");
        setIsLoading(false);
        return;
      }

      const startTime = dayjs(date).set('hour', time[0].hour()).set('minute', time[0].minute()).format("YYYY-MM-DDTHH:mm:ss");
      const endTime = dayjs(date).set('hour', time[1].hour()).set('minute', time[1].minute()).format("YYYY-MM-DDTHH:mm:ss");
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
          <span className="text-2xl font-bold">Fill in booking information</span>
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
              <Form.Item name="activity" label="Activity" className="col-span-6">
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
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
              <Form.Item name="date" label="Date" className="col-span-6">
                <DatePicker className="w-full" />
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
        {rooms.map((room: Room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </MaxWidthWrapper>
    </div>
  );
};

export default BookingListRoom;
