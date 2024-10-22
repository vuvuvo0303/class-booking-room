import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cohort } from "@/types/cohort";
import { getRandomColor } from "@/utils/color";
import { Table } from "antd";
import DeleteCohort from "./DeleteCohort";
import UpdateCohort from "./UpdateCohort";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const DataTable = ({
  data,
  rerender,
}: {
  data: Cohort[];
  rerender: () => void;
}) => {
  const columns = [
    {
      title: "Cohort code",
      dataIndex: "cohortCode",
      key: "cohortCode",
      render: (cohortCode: string) => {
        const color = getRandomColor(cohortCode);
        return (
          <Badge className={cn(`bg-${color}-500 hover:bg-${color}-300`)}>
            {cohortCode}
          </Badge>
        );
      },
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
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
      title: "Action",
      width: "50px",
      key: "action",
      render: (_: any, record: Cohort) => (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            <UpdateCohort cohort={record} rerender={rerender} />
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <DeleteCohort cohort={record} rerender={rerender} />
          </AlertDialog>
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default DataTable;
