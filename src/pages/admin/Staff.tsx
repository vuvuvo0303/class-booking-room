
import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { Button, Space, Table, Tag } from "antd";
import { useState } from "react";

interface User {
  name: string;
  email: string;
  address: string;
  status: boolean;
  role: string;

  is_verified: boolean;
  id: number;
}

const Student = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;

  const [data, setData] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      address: "01/01/2024",
      role: "staff",

      status: true,
      is_verified: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      address: "02/02/2024",
      status: false,
      role: "staff",

      is_verified: false,
    },
  ]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Create Date",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Verify",
      dataIndex: "is_verified",
      key: "is_verified",
      render: (is_verified: boolean) => (
        <span>
          {is_verified ? (
            <img src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png" alt="verified" width="20" />
          ) : (
            <img src="https://cdn-icons-png.flaticon.com/128/4847/4847128.png" alt="not verified" width="20" />
          )}
        </span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "student" ? "green" : role === "staff" ? "blue" : "gold"}>
          {role === "student" ? "Student" : role === "staff" ? "Staff" : "Admin"}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id: number) => (
        <Space>
          <Button type="primary" style={{ backgroundColor: "green" }}>
            Approve
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(id)} className="px-6">
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    const updatedData = data.filter((user) => user.id !== id);
    setData(updatedData);
  };

  return (
    <div>
  <Header
        currentPage="Staff's Request"
        breadcrumbItems={[{ title: "Trang chủ", to: basePath }]}
      />      <div className="flex justify-center">
        <span className="text-4xl py-4 font-bold">Manage Staff's Request</span>
      </div>

      <div className="p-3">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    </div>
  );
};

export default Student;
