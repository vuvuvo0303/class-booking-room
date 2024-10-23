import { Button, message, Steps, theme } from "antd";
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
const StepProcess = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const bookingSlots = useBookingStore((state) => state.slots);
  const bookingDate = useBookingStore((state) => state.bookingDate);

  const [form] = useForm();
  const navigate = useNavigate();
  const steps = [
    {
      title: "Fill Information",
      content: <FillInformation form={form} />,
    },
    {
      title: "Scan Your Face",
      content: <ScanFace />,
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

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current == 0) {
      form.submit();
      if (form.getFieldValue("activity")) {
        setCurrent(current + 1);
      }
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  useEffect(() => {
    if (!loggedUser) {
      navigate("/");
    }
  }, [loggedUser]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (!(bookingSlots && bookingSlots.length > 0 && bookingDate)) {
    return <BookingError />;
  }
  return (
    <div className="pb-20 px-5">
      <div className="px-10">
        <Steps current={current} items={items} />
      </div>
      <div style={contentStyle}>{steps[current].content}</div>
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
          <Button type="primary" onClick={() => next()} size="large">
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
