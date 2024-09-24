import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import {  Table } from "antd";

const Booking = () => {
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
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: () => <></>,
    },
    
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div>
      <Header currentPage="Bookings History" breadcrumbItems={[{ title: "Admin", to: basePath }]} />
      <div className="flex justify-center">
        <span className="text-4xl font-bold"> Manage Bookings History </span>
      </div>
      <div className="p-3">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>
    </div>
  );
};

export default Booking;
