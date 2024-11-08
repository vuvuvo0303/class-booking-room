import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RoomTypes } from "@/types/room-type";
import { Table } from "antd";
import UpdateRoomTypes from "./UpdateRoomTypes";
import DeleteRoomTypes from "./DeleteRoomTypes";
import { Link } from "react-router-dom";
import { getRandomColor } from "@/utils/color";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
// import DeleteCohort from "./DeleteCohort";
// import UpdateCohort from "./UpdateCohort";

const DataTable = ({ data, rerender }: { data: RoomTypes[]; rerender: () => void }) => {
  const columns = [
    {
      title: " Name",
      key: "name",
      render: (record: RoomTypes) => (
        <Link to={`${record.id}`} className="font-semibold text-blue-500 underline">
          {record.name}
        </Link>
      ),
    },
    {
      title: "Allowed cohorts",
      key: "allowedCohorts",
      render: (record: RoomTypes) => (
        <div className="flex gap-1">
          {record.allowedCohorts.map((cohort) => {
            const color = getRandomColor(cohort.cohortCode);
            return (
              <Badge
                className={cn(`bg-${color}-500 hover:bg-${color}-300`)}
                key={`roomtype-cohort-${record.id}-${cohort.id}`}
              >
                {cohort.cohortCode}
              </Badge>
            );
          })}
          {record.allowedCohorts.length == 0 && "None"}
        </div>
      ),
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createAt: string) => <span>{new Date(createAt).toLocaleDateString()}</span>,
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => <span>{new Date(updatedAt).toLocaleDateString()}</span>,
    },

    {
      title: "Action",
      width: "50px",
      key: "action",
      render: (record: RoomTypes) => (
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
