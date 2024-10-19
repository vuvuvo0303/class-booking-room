import { useForm } from "antd/es/form/Form";
import anh3d from "../../assets/anh3d.jpg";
import { Form, Select, Button } from "antd";

const FillUserInfo = () => {
  const [form] = useForm();

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${anh3d})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <span className="block text-lg font-bold mb-6">Fill Your Information in here</span>
        <div>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: "Please select your Department!" }]}
            >
              <Select
                showSearch
                placeholder="Select a department"
                optionFilterProp="label"
                options={[
                  { value: "SE", label: "SE" },
                  { value: "MC", label: "MC" },
                  { value: "IB", label: "IB" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Cohort"
              name="cohort"
              rules={[{ required: true, message: "Please select your Cohort!" }]}
            >
              <Select
                showSearch
                placeholder="Select a cohort"
                optionFilterProp="label"
                options={[
                  { value: "K17", label: "K17" },
                  { value: "K18", label: "K18" },
                  { value: "K19", label: "K19" },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FillUserInfo;
