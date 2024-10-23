import React, { useEffect } from "react";
import { Form } from "antd";
import confirminfo from "../../../assets/confirminfo.png";
import useAuthStore from "@/store/AuthStore";
import useBookingStore from "@/store/BookingStore";
import { Slot } from "@/types/slot";
import { formatDateToTimeString } from "@/utils/time";
import { formatDate } from "@/utils/date";

const ConfirmInfo: React.FC = () => {
  const bookingSlots = useBookingStore((state) => state.slots);
  const bookingDate = useBookingStore((state) => state.bookingDate);
  const room = useBookingStore((state) => state.room);
  const activity = useBookingStore((state) => state.activity);
  const note = useBookingStore((state) => state.note);
  const logggedUser = useAuthStore((state) => state.user);
  const [form] = Form.useForm();
  const loggedUser = useAuthStore((state) => state.user);

  useEffect(() => {
    if (loggedUser) {
      form.setFieldsValue({
        fullName: loggedUser.fullName,
        email: loggedUser.email,
        role: loggedUser.role,
        department: loggedUser.department,
        cohort: loggedUser.cohort,
      });
    }
  }, [loggedUser, form]);

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${confirminfo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Confirm your booking information
        </h2>

        <Form
          form={form}
          layout="vertical"
          initialValues={{ name: "", email: "", cohort: "", department: "" }}
        >
          <div className="grid grid-cols-2 -mx-2 gap-y-2">
            <div className="w-full px-2 mb-3">
              <div className="font-semibold">Full name</div>
              <div>{logggedUser.fullName}</div>
            </div>
            <div className="w-full px-2 mb-3">
              <div className="font-semibold">Email</div>
              <div>{logggedUser.email}</div>
            </div>
            <div className="w-ful px-2 mb-3">
              <div className="font-semibold">Cohort</div>
              <div>{logggedUser.cohortCode}</div>
            </div>
            <div className="w-full px-2 mb-3">
              <div className="font-semibold">Department</div>
              <div>{logggedUser.departmentName}</div>
            </div>
            <div className="w-full px-2 mb-3">
              <div className="font-semibold">Room Name</div>
              <div>{room?.roomName}</div>
            </div>
            <div className="w-full px-2 mb-3">
              <div className="font-semibold">Room Type</div>
              <div>{room?.roomType.name}</div>
            </div>
            <div className="w-full px-2">
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
            <div className="w-full px-2 mb-3">
              <div className="font-semibold">Date</div>
              <div>{bookingDate && formatDate(new Date(bookingDate))}</div>
            </div>
            <div className="w-full px-2 mb-3">
              <div className="font-semibold">Activity</div>
              <div>{activity?.name}</div>
            </div>
            {note && (
              <div className="w-full px-2 mb-3">
                <div className="font-semibold">Note</div>
                <div>{note}</div>
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmInfo;
