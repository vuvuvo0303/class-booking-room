import React, { useEffect } from "react";
import { Input, Form } from "antd";
import confirminfo from "../../../assets/confirminfo.png";
import useAuthStore from "@/store/AuthStore";

const { TextArea } = Input;

const ConfirmInfo: React.FC = () => {
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
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Confirm your booking information</h2>

        <Form form={form} layout="vertical" initialValues={{ name: "", email: "", cohort: "", department: "" }}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <Form.Item label="Full Name" name="fullName">
                <Input readOnly className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <Form.Item label="Email" name="email">
                <Input readOnly className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>

            <div className="w-full md:w-1/2 px-2">
              <Form.Item label="Cohort" name="cohort">
                <Input readOnly className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <Form.Item label="Activity" name="activity">
                <Input readOnly className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>

            <div className="w-full md:w-1/2 px-2">
              <Form.Item label="Department" name="department">
                <Input readOnly className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <Form.Item label="Room Name" name="roomName">
                <Input readOnly className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>

            <div className="w-full md:w-1/2 px-2">
              <Form.Item label="Room Type" name="roomType">
                <Input readOnly className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <Form.Item label="Slot" name="slot">
                <Input readOnly className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>

            <div className="w-full px-2">
              <Form.Item label="Note" name="note">
                <TextArea readOnly className="py-2 px-4 rounded-md" rows={4} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmInfo;
