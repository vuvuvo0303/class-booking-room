import ProfileCarousel from "@/components/carosuel/ProfileUerCarousel";
import useAuthStore from "@/store/AuthStore";
import { Avatar, Button, Col, Form, Image, Input, Row } from "antd";
import { useEffect } from "react";

const UserProfile = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [form] = Form.useForm();

  useEffect(() => {
    if (loggedUser) {
      form.setFieldsValue({
        name: loggedUser.fullName,
        email: loggedUser.email,
        role: loggedUser.role,
        department: loggedUser.department,
        avatar: loggedUser.profileImageURL,
        created_at: loggedUser.createdAt,
        cohort: loggedUser.updatedAt,
      });
    }
  }, [loggedUser, form]);

  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-orange-200 to-orange-100 h-20 flex items-center">
        <ProfileCarousel/>
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex gap-4">
          <Avatar size={90} src={loggedUser?.profileImageURL || "https://default-avatar-url.com"} alt="avatar" />
          <div className="flex flex-col justify-center gap-2">
            <span className="text-sx font-bold">{loggedUser?.fullName}</span>
            <span className="text-xs">{loggedUser?.email}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12} className="flex justify-center">
              <Form.Item
                label="Full Name"
                name="name"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="w-2/3"
              >
                <Input className="w-full h-10" disabled />
              </Form.Item>
            </Col>
            <Col span={12} className="flex justify-center">
              <Form.Item label="Email" name="email" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} className="w-2/3">
                <Input className="w-full h-10" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12} className="flex justify-center">
              <Form.Item
                label="Role"
                name="role"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="w-2/3"
              >
                <Input className="w-full h-10" disabled />
              </Form.Item>
            </Col>
            <Col span={12} className="flex justify-center">
              <Form.Item
                label="Department"
                name="department"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="w-2/3"
              >
                <Input className="w-full h-10" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12} className="flex justify-center">
              <Form.Item
                label="Create Date"
                name="created_at"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="w-2/3"
              >
                <Input className="w-full h-10" disabled />
              </Form.Item>
            </Col>
            <Col span={12} className="flex justify-center">
              <Form.Item
                label="Cohort"
                name="cohort"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className="w-2/3"
              >
                <Input className="w-full h-10" disabled />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex pl-28 ml-2">
            <Form.Item label="Avatar" name="avatar" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              <Image
                width={100}
                src={loggedUser?.profileImageURL || "https://default-avatar-url.com"}
                alt="User Avatar"
              />
            </Form.Item>
          </div>
          <div className="flex pl-28 ml-2 ">
            <Button className="" type="primary" htmlType="submit" >
              Edit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;
