import Loader from "@/components/Loader";
import { getReportById } from "@/lib/api/report-api";
import useAuthStore from "@/store/AuthStore";
import { Report } from "@/types/report";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";

interface DataType {
  key: string;
  id: number;
  title: string;
  description: string;
  roomName: string;
  studentFullName: string;
  studentEmail: string;
  status: string;
  response: string;
  createdAt: string;
  department: string;
  updatedAt: string;
}

const ReportHistory = () => {
  const [data, setData] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loggedUser = useAuthStore((state) => state.user);

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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <>
          {status === "Pending" ? (
            <Tag color="gold">Pending</Tag>
          ) : status === "Accepted" ? (
            <Tag color="green">Accepted</Tag>
          ) : status === "Denied" ? (
            <Tag color="red">Denied</Tag>
          ) : null}
        </>
      ),
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createAt: string) => <span>{new Date(createAt).toLocaleDateString()}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (updatedAt: string) => <span>{new Date(updatedAt).toLocaleDateString()}</span>,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getReportById(loggedUser.id);
      console.log(loggedUser);
      // Ensure `id` is defined or passed as prop.
      setIsLoading(false);
      if (result.error) {
        console.log(result.error);
      } else {
        // Ensure data is an array
        setData(result.data);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <Loader text="Loading reports data..." />;

  return (
    <div className="pt-40">
      <div className="pb-12">
        <span className="text-4xl flex justify-center">Report History</span>
      </div>
      <div className="px-10 drop-shadow-lg pb-16">
        <Table<any> columns={columns} dataSource={data.map((item) => ({ ...item, key: item.id }))} />
      </div>
    </div>
  );
};

export default ReportHistory;
