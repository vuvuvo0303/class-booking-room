import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cohort } from "@/types/cohort";
import { getRandomColor } from "@/utils/color";
import { Table } from "antd";

const columns = [
  {
    title: "Cohort Code",
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
    dataIndex: "createAt",
    key: "createAt",
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
    render: () => (
      <div className="flex gap-2">
        <Button>Edit</Button>
        <Button variant={"destructive"}>Delete</Button>
      </div>
    ),
  },
];
const DataTable = ({ data }: { data: Cohort[] }) => {
  return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default DataTable;
