import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { Button, Space, Table } from "antd";

const Slot = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  const columns = [
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (room:string) => <span>{room}</span>,
    },
    {
      title: "Room Type",
      dataIndex: "roomtype",
      key: "roomtype",
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      render: (slots: string[]) => slots.join(' , '), 
    },

    {
      title: "Action",
      width:"50px",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>Delete</Button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      room: "NVH615",
      roomtype:"meeting",
      slot: ["1(7h-9h15)","2(9h30-11h45)"],
      
    },
  ];
  return (
    <div>
      <Header currentPage="Slot" breadcrumbItems={[{ title: "Trang chủ", to: basePath }]} />
      <div className="flex justify-center py-3">
        <span className="text-4xl font-bold">Manage Slots of Rooms</span>
      </div>
      <div className="flex justify-end p-3">
        <Button type="primary">Add New slot</Button>
      </div>
      <div className="px-3">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Slot;
