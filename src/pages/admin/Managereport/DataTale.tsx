import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Report } from "@/types/report";

import { Table, Tag } from "antd";
import DeleteReport from "./DeleteReport";

const DataTable = ({ data, rerender }: { data: Report[]; rerender: () => void }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Student First Name",
      dataIndex: "studentFirstName",
      key: "studentFirstName",
    },
    {
      title: "Student Last Name",
      dataIndex: "studentLastName",
      key: "studentLastName",
    },
    {
      title: "Student Email",
      dataIndex: "studentEmail",
      key: "studentEmail",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "Pending" ? "orange" : status === "Reject" ? "red" : "green";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createAt",
      render: (createAt: string) => <span>{new Date(createAt).toLocaleString()}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (updatedAt: string) => <span>{new Date(updatedAt).toLocaleString()}</span>,
    },
    {
      title: "Action",
      width: "50px",
      key: "action",
      render: (record: Report) => (
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <DeleteReport report={record} rerender={rerender} />
          </AlertDialog>
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default DataTable;
