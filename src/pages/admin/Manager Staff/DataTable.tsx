import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { User } from "@/types/user";
import { Avatar, Table, Tag, Modal, Select, Input } from "antd";
import { useState } from "react";
import { changeUserStatus } from "@/lib/api/user-api";
import DeleteStaff from "./DeleteStaff";

const { Option } = Select;

const DataTable = ({ data, rerender }: { data: User[]; rerender: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [status, setStatus] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const showChangeStatusModal = (user: User) => {
    setSelectedUser(user);
    setStatus(user.status); 
    setNote(user.note || ''); 
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    setStatus('');
    setNote('');
  };

  const handleOk = async () => {
    if (selectedUser) {
      try {
        
        await changeUserStatus(selectedUser.id, status, note);
        
        setIsModalVisible(false);
        rerender();
      } catch (error) {
        console.error("Failed to change status:", error);
      }
    }
  };

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
      dataIndex: "isVerify",
      key: "isVerify",
      render: (isVerify: boolean) => (
        <span>
          {isVerify ? (
            <img src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png" width={50}/>
          ) : (
            <img src="https://cdn-icons-png.flaticon.com/128/4847/4847128.png" width={50}/>
          )}
        </span>
      ),
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
      render: (status: string, record: User) => {
        const color = status === "Active" ? "green" : "red";
        return (
          <Tag color={color} onClick={() => showChangeStatusModal(record)} style={{ cursor: "pointer" }}>
            {status.toLocaleUpperCase()}
          </Tag>
        );
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
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <DeleteStaff user={record} rerender={rerender} />
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
      <Modal
        title="Change User Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <label>Status:</label>
          <Select
            style={{ width: "100%" }}
            value={status}
            onChange={(value) => setStatus(value)}
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Note:</label>
          <Input.TextArea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default DataTable;
