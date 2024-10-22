import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Activity } from "@/types/department";
import { Report } from "@/types/report";
import { Table } from "antd";
import DeleteActivity from "./DeleteActivity";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateActivity from "./UpdateActivity";

const DataTable = ({ data, rerender }: { data: Report[]; rerender: () => void }) => {
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Activity Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department Name",
      key: "department",
      render: (record: Activity) => <span>{record.department?.name}</span>,
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
      render: (record: Activity) => (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            <UpdateActivity activity={record} rerender={rerender} />
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <DeleteActivity activity={record} rerender={rerender} />
          </AlertDialog>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default DataTable;
