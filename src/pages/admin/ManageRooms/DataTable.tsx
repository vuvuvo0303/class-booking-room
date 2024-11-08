import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Room } from "@/types/room";
import { Image, Table, Tag } from "antd";
import DeleteRoom from "./DeleteRoom";
import UpdateRoom from "./UpdateRooms";
import { Link } from "react-router-dom";

const DataTable = ({
  data,
  rerender,
}: {
  data: Room[];
  rerender: () => void;
}) => {
  const columns = [
    {
      title: "Room Name",
      key: "roomName",
      render: (record: Room) => (
        <Link to={`${record.id}`} className="font-semibold text-blue-500 underline">{record.roomName}</Link>
      ),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Room Type",
      key: "roomTypeName",
      render: (record: Room) => (
       <span>{record.roomType.name}</span>
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Inactive"
            ? "red"
            : status === "repairing"
            ? "orange"
            : "green";
        return <Tag color={color}>{status.toLocaleUpperCase()}</Tag>;
      },
    },
    {
      title: "Room Image",
      dataIndex: "picture",
      key: "picture",
      render:(picture:string) => <Image src={picture} width={150}/>
    },
    {
      title: "Action",
      width: "50px",
      key: "action",
      render: (record: Room) => (
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
