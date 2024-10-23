import { Button } from "@/components/ui/button";
import { sendVerificationEmail } from "@/lib/api/user-api";
import { User } from "@/types/user";
import { Avatar, Table, Tag } from "antd";
import { useState } from "react";

const DataTable = ({ data, rerender }: { data: User[]; rerender: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = async (record: User) => {
    setLoading(true);
    try {
      await sendVerificationEmail(record.id);
      console.log(`Verification email sent to user with ID: ${record.id}`);
      setLoading(false);
      rerender();
    } catch (error) {
      console.error("Failed to send verification email:", error);
      setLoading(false);
    }
  };

  const handleReject = (record: User) => {
    setLoading(true);
    console.log(`Rejected user with ID: ${record.id}`);
    setLoading(false);
    rerender();
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
      render: (status: string) => {
        const color = status === "Active" ? "green" : "red";
        return <Tag color={color}>{status.toLocaleUpperCase()}</Tag>;
      },
    },

    {
      title: "Action",
      width: "150px",
      key: "action",
      render: (record: User) => (
        <div className="flex gap-2">
          <Button className="bg-green-500" onClick={() => handleApprove(record)} disabled={loading}>
            Approve
          </Button>
          <Button className="bg-red-500" onClick={() => handleReject(record)} disabled={loading}>
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey={"id"} />;
};

export default DataTable;
