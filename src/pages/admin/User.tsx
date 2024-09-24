import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { Space, Table, Switch, Button, Tag } from "antd";
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

const User = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;

  const [data, setData] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      address: "01/01/2024",
      role: "student",  
      status: true,
      is_verified: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      address: "02/02/2024",
      role: "staff",
      status: false,
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
      title: "Update Date",
      dataIndex: "address",
      key: "action",
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
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "10%",
      render: (status: boolean, record: User) => (
        <Switch
          defaultChecked={status}
          onChange={(checked) => handleStatusChange(checked, record.id)}
        />
      ),
    },
    {
      title: "Verify",
      dataIndex: "is_verified",
      key: "is_verified",
      render: (is_verified: boolean) => (
        <span>
          {is_verified ? (
            <img
              src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png"
              alt="verified"
              width="20"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/128/4847/4847128.png"
              alt="not verified"
              width="20"
            />
          )}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id: number) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleStatusChange = (checked: boolean, id: number) => {
    const updatedData = data.map((user) => {
      if (user.id === id) {
        return { ...user, status: checked };
      }
      return user;
    });
    setData(updatedData);
  };

  const handleEdit = (id: number) => {
    console.log("Edit user with ID:", id);
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter((user) => user.id !== id);
    setData(updatedData);
  };

  const handleAddNewAccount = () => {
    console.log("Adding new account...");
  };

  return (
    <div>
      <Header
        currentPage="Account"
        breadcrumbItems={[{ title: "Admin", to: basePath }]}
      />
      <div className="flex justify-center">
        <span className="text-4xl py-4 font-bold">Manage Account</span>
      </div>
      <div className="flex justify-end p-3">
        <Button type="primary" onClick={handleAddNewAccount}>Add New Account</Button>
      </div>
      <div className="p-3">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    </div>
  );
};

export default User;
