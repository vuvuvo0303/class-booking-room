import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { Button, Space, Table, Tag } from "antd";

const Room = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  const dataSource = [
    {
      key: '1',
      roomNumber: '101',
      roomType: 'Meeting',
      department: 'Finance',
      activity: 'IT',
      slot: '1(7h-9h45)',
      status: 'available',
    },
    {
      key: '2',
      roomNumber: '102',
      roomType: 'Meeting',
      department: 'HR',
      activity: 'IT',
      slot: '1(7h-9h45)',
      status: 'booked',
    },
    {
      key: '3',
      roomNumber: '103',
      roomType: 'Meeting',
      department: 'IT',
      activity: 'Meeting',
      slot: '1(7h-9h45)',
      status: 'under maintenance',
    },
  ];
  
  const columns = [
    {
      title: 'Room Number',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Room Type',
      dataIndex: 'roomType',
      key: 'roomType',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Slot',
      dataIndex: 'slot',
      key: 'slot',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'booked') {
          color = 'volcano';
        } else if (status === 'under maintenance') {
          color = 'geekblue';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button  type="primary">Edit</Button>
          <Button type="primary" danger>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Header currentPage="Rooms" breadcrumbItems={[{ title: "Admin", to: basePath }]} />
      <div className="flex justify-center">
        <span className="text-4xl font-bold">Manage Rooms</span>
      </div>
      <div className="flex justify-end px-5">
        <Button type="primary">Add New room</Button>
      </div>
      <div className="p-3">
        <Table columns={columns} dataSource={dataSource} rowKey="id" />
      </div>
    </div>
  );
};

export default Room;
