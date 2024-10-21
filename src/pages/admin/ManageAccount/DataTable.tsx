import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { User } from "@/types/user";
import { Avatar, Table, Tag } from "antd";
import DeleteAccount from "./DeleteAccount";
// import DeleteRoom from "./DeleteRoom";
// import UpdateRoom from "./UpdateRooms";

const DataTable = ({ data, rerender }: { data: User[]; rerender: () => void }) => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const color = role === "Admin" ? "purple" : role === "Student" ? "green" : role === "Manager" ? "blue" : "gray";

        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "Avatar",
      dataIndex: "profileImageURL",
      key: "profileImageURL",
      render: (profileImageURL: string) => (
        <Avatar
          size={64}
          src={
            profileImageURL
              ? profileImageURL
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwxmBA5XRkeckeFH0uisSQcSoyOgVybXzN5A&s"
          }
        />
      ),
    },
    {
      title: "Verify",
      dataIndex: "is_Verify",
      key: "is_Verify",
    },
    {
      title: "Created at",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt: string) => <span>{new Date(createAt).toLocaleDateString()}</span>,
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string) => <span>{new Date(updatedAt).toLocaleDateString()}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "Active" ? "green" : "red";
        return <Tag color={color}>{status.toLocaleUpperCase()}</Tag>;
      },
    },

    {
      title: "Action",
      width: "50px",
      key: "action",
      render: (record: User) => (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            {/* <UpdateAccount ={record} rerender={rerender} /> */}
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <DeleteAccount user={record} rerender={rerender} />
          </AlertDialog>
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default DataTable;
