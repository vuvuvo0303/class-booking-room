import Header from "@/components/admin/Header";
import { getAllUsers } from "@/lib/api/user-api";
import useAuthStore from "@/store/AuthStore";
import { Space, Table, Switch, Button, Tag } from "antd";
import { useEffect, useState } from "react";
// import Loader from "@/components/Loader";
// import useRerender from "@/hooks/use-rerender";

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
  // const [isLoading, setIsLoading] = useState(false);
  // const { renderKey, rerender } = useRerender();

  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      const result = await getAllUsers();
      console.log(result);

      // setIsLoading(false);
      if (result.error) {
        console.log(result.error);
      } else {
        setData(result.data);
      }
    };
    fetchData();
  }, []);

  // if (isLoading) return <Loader text="Loading Account data..." />;

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created at",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt: string) => <span>{new Date(createAt).toLocaleDateString()}</span>,
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => <span>{new Date(updatedAt).toLocaleDateString()}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "Student" ? "green" : role === "Staff" ? "blue" : "gold"}>
          {role === "Student" ? "Student" : role === "Staff" ? "Staff" : "Admin"}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "10%",
      render: (status: boolean, record: User) => (
        <Switch defaultChecked={status} onChange={(checked) => handleStatusChange(checked, record.id)} />
      ),
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
      <Header currentPage="Account" breadcrumbItems={[{ title: "Admin", to: basePath }]} />
      <div className="flex justify-center">
        <span className="text-4xl py-4 font-bold">Manage Account</span>
      </div>
      <div className="flex justify-end p-3">
        <Button type="primary" onClick={handleAddNewAccount}>
          Add New Account
        </Button>
      </div>
      <div className="p-3">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    </div>
  );
};

export default User;
