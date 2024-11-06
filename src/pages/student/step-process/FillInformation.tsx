import { Input, Form, FormInstance, Checkbox } from "antd";
import fillinfo from "../../../assets/fillinfo.png";
import useBookingStore from "@/store/BookingStore";
import useAuthStore from "@/store/AuthStore";
import { formatDateToTimeString } from "@/utils/time";
import { formatDate } from "@/utils/date";
import { Slot } from "@/types/slot";

const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

const FillInformation = ({ form }: { form: FormInstance }) => {
  const activity = useBookingStore((state) => state.activity);
  const bookingDate = useBookingStore((state) => state.bookingDate);
  const setSlots = useBookingStore((state) => state.setSlots);
  const room = useBookingStore((state) => state.room);
  const logggedUser = useAuthStore((state) => state.user);
  const setNote = useBookingStore((state) => state.setNote);
  const onFinish = (values: any) => {
    setNote(values.note ?? "");
    setSlots(
      room?.roomSlots.filter((s: Slot) =>
        values.slots.find((x: number) => x == s.id)
      ) ?? []
    );
  };

  if (!logggedUser) return;

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
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="font-semibold">Activity</div>
              <div>
                {activity?.code} - {activity?.name}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <div className="font-semibold mb-1">Slots</div>
              <Form.Item
                name="slots"
                rules={[
                  {
                    required: true,
                    message: "At least one slot must be selected!",
                  },
                  {
                    validator: (_, value) =>
                      value && value.length > 3
                        ? Promise.reject(
                            new Error("You cannot select more than 3 slots!")
                          )
                        : Promise.resolve(),
                  },
                ]}
              >
                <CheckboxGroup
                  options={room?.roomSlots.map((s) => ({
                    label:
                      formatDateToTimeString(new Date(s.startTime), true) +
                      " - " +
                      formatDateToTimeString(new Date(s.endTime), true),
                    value: s.id,
                  }))}
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-3">
              <div className="font-semibold">Date</div>
              <div>{bookingDate && formatDate(new Date(bookingDate))}</div>
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
