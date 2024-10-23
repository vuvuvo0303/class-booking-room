import { useEffect, useState } from "react";
import { Input, Form, Select, FormInstance } from "antd";
import fillinfo from "../../../assets/fillinfo.png";
import useBookingStore from "@/store/BookingStore";
import useAuthStore from "@/store/AuthStore";
import { getActivitiesByDepartmentId } from "@/lib/api/activity-api";
import { toast } from "react-toastify";
import { Activity } from "@/types/department";
import { Slot } from "@/types/slot";
import { formatDateToTimeString } from "@/utils/time";
import { formatDate } from "@/utils/date";

const { TextArea } = Input;
const { Option } = Select;

const FillInformation = ({ form }: { form: FormInstance }) => {
  const bookingSlots = useBookingStore((state) => state.slots);
  const bookingDate = useBookingStore((state) => state.bookingDate);
  const [activities, setActivities] = useState<Activity[]>([]);
  const room = useBookingStore((state) => state.room);
  const logggedUser = useAuthStore((state) => state.user);
  const setActivity = useBookingStore((state) => state.setActivity);
  const setNote = useBookingStore((state) => state.setNote);
  const onFinish = (values: any) => {
    setNote(values.note ?? "");
    const act = activities.find(a => a.id == values.activity);
    if (act != null) {
      setActivity(act)
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (logggedUser == null) {
        return;
      }
      const activitiesResult = await getActivitiesByDepartmentId(
        logggedUser.departmentId
      );
      if (activitiesResult.error) {
        toast.error(activitiesResult.error);
      } else {
        setActivities(activitiesResult.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="flex justify-center items-center min-h-screen p-5"
      style={{
        backgroundImage: `url(${fillinfo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Fill Your Information
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ name: "", email: "", cohort: "", department: "" }}
        >
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="font-semibold">Full name</div>
              <div>{logggedUser.fullName}</div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="font-semibold">Email</div>
              <div>{logggedUser.email}</div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="font-semibold">Cohort</div>
              <div>{logggedUser.cohortCode}</div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="font-semibold">Department</div>
              <div>{logggedUser.departmentName}</div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="font-semibold">Room Name</div>
              <div>{room?.roomName}</div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="font-semibold">Room Type</div>
              <div>{room?.roomType.name}</div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="font-semibold mb-1">Slots</div>
              <div className="flex gap-2">
                {bookingSlots?.map((slot: Slot) => {
                  return (
                    <button
                      key={`booking-slot-${slot.id}`}
                      className="outline-green-500 outline bg-white-green-500 bg-green-200 hover:bg-green-100 px-2 py-1 rounded-md font-semibold"
                    >
                      {formatDateToTimeString(new Date(slot.startTime), true)} -{" "}
                      {formatDateToTimeString(new Date(slot.endTime), true)}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="font-semibold">Date</div>
              <div>{bookingDate && formatDate(new Date(bookingDate))}</div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <Form.Item
                label="Activity"
                name="activity"
                rules={[
                  { required: true, message: "Please select an activity" },
                ]}
              >
                <Select placeholder="Select activity" className="h-9">
                  {activities.map((activity) => (
                    <Option value={activity.id} key={activity.id}>
                      {activity.code} - {activity.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="w-full px-2">
              <Form.Item label="Note" name="note" rules={[{ required: false }]}>
                <TextArea
                  placeholder="Enter any notes"
                  className="py-2 px-4 rounded-md"
                  rows={4}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FillInformation;
