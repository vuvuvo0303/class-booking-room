import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Room } from "@/types/room";
import {  Table, Tag } from "antd";
import DeleteRoom from "./DeleteRoom";
import UpdateRoom from "./UpdateRooms";
// import DeleteCohort from "./DeleteCohort";
// import UpdateCohort from "./UpdateCohort";

const DataTable = ({
  data,
  rerender,
}: {
  data: Room[];
  rerender: () => void;
}) => {

  const columns = [
    {
      title: 'Room Name',
      dataIndex: 'roomName',
      key: 'roomName',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Room Type',
      dataIndex: 'roomTypeName',
      key: 'roomTypeName',
    },
    {
      title: "Created at",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt: string) => (
        <span>{new Date(createAt).toLocaleString()}</span>
      ),
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => (
        <span>{new Date(updatedAt).toLocaleString()}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'inactive') {
          color = 'red'; 
        } else if (status === 'repairing') {
          color = 'orange'; 
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    
    {
      title: "Action",
      width: "50px",
      key: "action",
      render: ( record: Room) => (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            <UpdateRoom room={record} rerender={rerender} />
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <DeleteRoom room={record} rerender={rerender} />
          </AlertDialog>
        </div>
      ),
    },
    
  ];
  return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default DataTable;
