import React, { useEffect } from "react";
import { Input , Form, Select } from "antd";
import fillinfo from "../../../assets/fillinfo.png";
import useAuthStore from "@/store/AuthStore";

const { TextArea } = Input;
const { Option } = Select;

const FillInformation: React.FC = () => {
  const [form] = Form.useForm();
  const loggedUser = useAuthStore((state) => state.user);

  
  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

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
        backgroundImage: `url(${fillinfo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Fill Your Information</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ name: "", email: "", cohort: "", department: "" }}
        >
          <div className="flex flex-wrap -mx-2">
            
            <div className="w-full md:w-1/2 px-2">
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Please enter your full name" }]}
              >
                <Input placeholder="Enter your full name" className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter your email" className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>

            
            <div className="w-full md:w-1/2 px-2">
              <Form.Item
                label="Cohort"
                name="cohort"
                rules={[{ required: true, message: "Please select your cohort" }]}
              >
                <Select placeholder="Select cohort" className=" h-9">
                  <Option value="Cohort 1">Cohort 1</Option>
                  <Option value="Cohort 2">Cohort 2</Option>
                  <Option value="Cohort 3">Cohort 3</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <Form.Item
                label="Activity"
                name="activity"
                rules={[{ required: true, message: "Please select an activity" }]}
              >
                <Select placeholder="Select activity" className="h-9">
                  <Option value="Lecture">Lecture</Option>
                  <Option value="Lab">Lab</Option>
                  <Option value="Seminar">Seminar</Option>
                </Select>
              </Form.Item>
            </div>

            
            <div className="w-full md:w-1/2 px-2">
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: "Please enter your department" }]}
              >
                <Input placeholder="Enter your department" className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <Form.Item
                label="Room Name"
                name="roomName"
                rules={[{ required: true, message: "Please enter the room name" }]}
              >
                <Input placeholder="Enter room name" className="py-2 px-4 rounded-md" />
              </Form.Item>
            </div>

            <div className="w-full md:w-1/2 px-2">
              <Form.Item
                label="Room Type"
                name="roomType"
                rules={[{ required: true, message: "Please select room type" }]}
              >
                <Select placeholder="Select room type" className="h-9">
                  <Option value="Classroom">Classroom</Option>
                  <Option value="Auditorium">Auditorium</Option>
                  <Option value="Lab">Lab</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <Form.Item
                label="Slot"
                name="slot"
                rules={[{ required: true, message: "Please select the time slot" }]}
              >
                <Select placeholder="Select time slot" className="h-9">
                  <Option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</Option>
                  <Option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</Option>
                  <Option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="w-full px-2">
              <Form.Item
                label="Note"
                name="note"
                rules={[{ required: false }]}
              >
                <TextArea placeholder="Enter any notes" className="py-2 px-4 rounded-md" rows={4} />
              </Form.Item>
            </div>
          </div>

          
        </Form>
      </div>
    </div>
  );
};

export default FillInformation;
