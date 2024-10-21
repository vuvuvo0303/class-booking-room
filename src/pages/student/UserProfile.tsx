import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProfileCarousel from "@/components/carosuel/ProfileUerCarousel";
import useAuthStore from "@/store/AuthStore";
import { Avatar, Button, Form, Image, Input } from "antd";
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
    <div className="">
      <div className="bg-gradient-to-r from-orange-200 to-orange-100 h-20 flex items-center">
        <ProfileCarousel />
      </div>
      <MaxWidthWrapper className="py-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Avatar
              size={90}
              src={
                loggedUser?.profileImageURL || "https://default-avatar-url.com"
              }
              alt="avatar"
            />
            <div className="flex flex-col justify-center gap-2">
              <span className="text-sx font-bold">{loggedUser?.fullName}</span>
              <span className="text-xs">{loggedUser?.email}</span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Form form={form} layout="vertical" className="grid grid-cols-12 gap-x-5">
            <Form.Item label="Full Name" name="name" className="col-span-6">
              <Input className="w-full h-10" disabled />
            </Form.Item>
            <Form.Item label="Email" name="email" className="col-span-6">
              <Input className="w-full h-10" disabled />
            </Form.Item>
            <Form.Item label="Role" name="role" className="col-span-6">
              <Input className="w-full h-10" disabled />
            </Form.Item>
            <Form.Item
              label="Department"
              name="department"
              className="col-span-6"
            >
              <Input className="w-full h-10" disabled />
            </Form.Item>
            <Form.Item
              label="Create Date"
              name="created_at"
              className="col-span-6"
            >
              <Input className="w-full h-10" disabled />
            </Form.Item>
            <Form.Item label="Cohort" name="cohort" className="col-span-6">
              <Input className="w-full h-10" disabled />
            </Form.Item>
            <Form.Item label="Avatar" name="avatar" className="col-span-12">
              <Image
                src={
                  loggedUser?.profileImageURL ||
                  "https://default-avatar-url.com"
                }
                alt="User Avatar"
              />
            </Form.Item>
            <div className="flex">
              <Button className="" type="primary" htmlType="submit">
                Edit
              </Button>
            </div>
          </Form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default UserProfile;
