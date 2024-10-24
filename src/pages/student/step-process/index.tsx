import { Button, message, Steps } from "antd";
import { useEffect, useState } from "react";
import FillInformation from "./FillInformation";
import ScanFace from "./ScanFace";
import ConfirmInfo from "./ConfirmInfo";
import Done from "./Done";
import useAuthStore from "@/store/AuthStore";
import useBookingStore from "@/store/BookingStore";
import { useNavigate } from "react-router-dom";
import BookingError from "./BookingError";
import { useForm } from "antd/es/form/Form";
import { getUserFace } from "@/lib/api/user-api";
import { toast } from "react-toastify";
import useRerender from "@/hooks/use-rerender";
import { FaceDescriptor } from "@/types/user";
import { createBooking } from "@/lib/api/booking-api";
const StepProcess = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const bookingSlots = useBookingStore((state) => state.slots);
  const bookingDate = useBookingStore((state) => state.bookingDate);
  const bookingActivity = useBookingStore((state) => state.activity);
  const bookingNote = useBookingStore((state) => state.note);
  const [isError, setIsError] = useState(false);
  const { rerender, renderKey } = useRerender();
  const [userFaceDescriptor, setUserFaceDescriptor] =
    useState<FaceDescriptor>();
  const [form] = useForm();
  const navigate = useNavigate();
  const steps = [
    {
      title: "Fill Information",
      content: <FillInformation form={form} />,
    },
    {
      title: "Scan Your Face",
      content: (
        <ScanFace userFaceDescriptor={userFaceDescriptor} rerender={rerender} />
      ),
    },
    {
      title: "Confirm Your Information",
      content: <ConfirmInfo />,
    },
    {
      title: "Done",
      content: <Done />,
    },
  ];

  const [current, setCurrent] = useState(0);

  const handleSubmitBooking = async () => {
    if (bookingActivity == null || bookingSlots == null) return;
    const request = {
      userId: loggedUser.id,
      activityId: bookingActivity.id,
      description: bookingNote,
      roomSlots: bookingSlots.map((slot) => slot.id),
    };
    const bookingResult = await createBooking(request);
    if (bookingResult.error) {
      toast.error(bookingResult.error);
    } else {
      setCurrent(current + 1);
    }
  };

  const next = () => {
    if (current == 0) {
      form.submit();
      if (form.getFieldValue("activity")) {
        setCurrent(current + 1);
      }
    } else {
      if (current == 2) {
        handleSubmitBooking();
      } else {
        setCurrent(current + 1);
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  useEffect(() => {
    const fetchData = async () => {
      const faceResult = await getUserFace(loggedUser.id);
      if (faceResult.error) {
        if (faceResult.error == "Request failed with status code 404") {
          setUserFaceDescriptor(undefined);
        } else {
          toast.error(faceResult.error);
          setIsError(true);
        }
      } else {
        setUserFaceDescriptor(faceResult.data);
      }
    };
    if (!loggedUser) {
      navigate("/");
    } else {
      fetchData();
    }
  }, [loggedUser, renderKey]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [current]);

  if (!(bookingSlots && bookingSlots.length > 0 && bookingDate)) {
    return <BookingError />;
  }
  if (isError) return <BookingError />;
  return (
    <div className="pb-20 px-5">
      <div className="p-10">
        <Steps current={current} items={items} />
      </div>
      <div>{steps[current].content}</div>
      <div className="p-5 justify-center flex">
        {current > 0 && (
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
            size="large"
          >
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => next()}
            size="large"
            disabled={
              (userFaceDescriptor == null ||
                userFaceDescriptor.descriptor.length == 0) &&
              current == 1
            }
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
            size="large"
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepProcess;
