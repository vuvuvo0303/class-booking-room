import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table } from "antd";
import { Link } from "react-router-dom";
import UpdateDepartment from "./UpdateDepartment";
import DeleteDepartment from "./DeleteDepartment";
import { Department } from "@/types/department";

const DataTable = ({
  data,
  rerender,
}: {
  data: Department[];
  rerender: () => void;
}) => {
  const columns = [
    {
      title: "Department",
      key: "name",
      render: (record: Department) => (
        <Link to={`/admin/department/${record.id}`} className="font-semibold text-blue-500 underline">{record.name}</Link>
      ),
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createAt: string) => (
        <span>{new Date(createAt).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => (
        <span>{new Date(updatedAt).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Action",
      width: "50px",
      key: "action",
      render: (record: Department) => (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            <UpdateDepartment department={record} rerender={rerender} />
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <DeleteDepartment department={record} rerender={rerender} />
          </AlertDialog>
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default DataTable;
