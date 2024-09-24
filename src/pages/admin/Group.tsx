import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { Button, Space, Table } from "antd";

const Group = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
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
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Slot",
      key: "slot",
      dataIndex: "slot",
      render: (slot:string) => <><span>{slot}</span></>,
    },
    {
      title: "Activity",
      key: "activity",
      dataIndex: "activity",
      render: (activity:string) => <><span>{activity}</span></>,
    },
    {
      title: "Department",
      key: "department",
      dataIndex: "department",
      render: (department:string) => <><span>{department}</span></>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="primary">Approve</Button>
          <Button type="primary" danger>
            Reject
          </Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      email:"kkkk@gmail.com",
      room: "NVH615",
      slot: "1(7h-9h15)",
      activity:"meeting",
      department:"IT",
    },
  
  ];
  return (
    <div>
      <Header currentPage="Group" breadcrumbItems={[{ title: "Trang chủ", to: basePath }]} />
      <div className="flex justify-center py-3">
        <span className="text-4xl font-bold">Manage Bookings Request</span>
      </div>
      <div className="p-3">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Group;
