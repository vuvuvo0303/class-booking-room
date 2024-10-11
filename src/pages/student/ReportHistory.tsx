import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  id: number;
  title: string;
  description: string; // sửa lại kiểu từ number thành string
  roomName: string;
  studentFullName: string;
  studentEmail: string;
  status: string;
  response: string;
  createAt: string;
  department: string;
  updatedAt: string;
}

const ReportHistory = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Student Name",
      dataIndex: "studentFullName",
      key: "studentFullName",
    },
    {
      title: "Student Email",
      dataIndex: "studentEmail",
      key: "studentEmail",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "active" ? "green" : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
    },
    // {
    //   title: "Created At",
    //   dataIndex: "createAt",
    //   key: "createAt",
    // },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      id: 1,
      title: "Room Booking Issue",
      description: "Cannot book room A",
      roomName: "Room A",
      studentFullName: "John Doe",
      studentEmail: "john@example.com",
      status: "active",
      createAt: "2023-10-10",
      updatedAt: "2023-10-11",
    },
    {
      key: "2",
      id: 2,
      title: "Technical Issue",
      description: "Projector not working",
      roomName: "Room B",
      studentFullName: "Jane Smith",
      studentEmail: "jane@example.com",
      status: "inactive",
      createAt: "2023-10-09",
      updatedAt: "2023-10-10",
    },
    {
      key: "3",
      id: 3,
      title: "Room Maintenance",
      description: "Room C is under maintenance",
      roomName: "Room C",
      studentFullName: "Alice Brown",
      studentEmail: "alice@example.com",
      status: "active",
      createAt: "2023-10-08",
      updatedAt: "2023-10-09",
    },
  ];

  return (
    <div className="pt-40">
      <div className="pb-12">
        <span className="text-4xl flex justify-center">Report History</span>
      </div>
      <div className="px-10 drop-shadow-lg pb-16">
        <Table<DataType> columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ReportHistory;
