import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {  RoomTypes } from "@/types/room-type";
import { Table } from "antd";
import UpdateRoomTypes from "./UpdateRoomTypes";
import DeleteRoomTypes from "./DeleteRoomTypes";
// import DeleteCohort from "./DeleteCohort";
// import UpdateCohort from "./UpdateCohort";

const DataTable = ({
  data,
  rerender,
}: {
  data: RoomTypes[];
  rerender: () => void;
}) => {
  const columns = [
    {
      title: " Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created at",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt: string) => <span>{new Date(createAt).toLocaleString()}</span>,
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => <span>{new Date(updatedAt).toLocaleString()}</span>,
    },
    
    {
      title: "Action",
      width: "50px",
      key: "action",
      render: ( record: RoomTypes) => (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            <UpdateRoomTypes roomtype={record} rerender={rerender} />
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <DeleteRoomTypes roomtype={record} rerender={rerender} />
          </AlertDialog>
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default DataTable;
