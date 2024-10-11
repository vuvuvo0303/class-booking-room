import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Report } from "@/types/report";
import { Table } from "antd";
import DeleteReport from "./DeleteReport";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateReport } from "@/lib/api/report-api";

const DataTable = ({ data, rerender }: { data: Report[]; rerender: () => void }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Full Name",
      dataIndex: "studentFullName",
      key: "studentFullName",
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
      render: (status: string, record: Report) => {
        return (
          <Select
            value={status}
            onValueChange={async (newValue) => {
              try {
                
                await updateReport(record.id, { status: newValue });
              
                rerender();
              } catch (error) {
                console.error("Failed to update report status:", error);
              }
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">
                <span className="text-orange-500">Pending</span>
              </SelectItem>
              <SelectItem value="Reject">
                <span className="text-red-600">Reject</span>
              </SelectItem>
              <SelectItem value="Approved">
                <span className="text-green-400">Approved</span>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createAt",
      render: (createAt: string) => <span>{new Date(createAt).toLocaleDateString()}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (updatedAt: string) => <span>{new Date(updatedAt).toLocaleDateString()}</span>,
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
