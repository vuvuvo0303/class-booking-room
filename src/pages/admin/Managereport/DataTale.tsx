import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Report } from "@/types/report";
import { Table, Tag } from "antd";
import DeleteReport from "./DeleteReport";
import { approveReport, denyReport } from "@/lib/api/report-api";
import TextArea from "antd/es/input/TextArea";

const DataTable = ({ data, rerender }: { data: Report[]; rerender: () => void }) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [currentReportId, setCurrentReportId] = useState<number | null>(null); 

  const handleReject = (reportId: number) => {
    setCurrentReportId(reportId);
    setIsRejectModalOpen(true); 
  };

  const handleSubmitRejection = async () => {
    if (!currentReportId || !rejectionReason.trim()) {
      console.error("Rejection reason is required");
      return;
    }
  
    try {
      const { error, success } = await denyReport(currentReportId, rejectionReason); 
      
      if (success) {
        rerender(); 
        setIsRejectModalOpen(false); 
        setRejectionReason(""); 
      } else {
        console.error("Failed to reject report:", error);
      }
    } catch (err) { 
      console.error("API error:", err.response ? err.response.data : err.message);
    }
  };
  
  
  

  const handleApprove = async (reportId: number) => {
    const response = await approveReport(reportId);

    if (response && response.success) {
      rerender(); 
    } else {
      console.error("Failed to approve report:", response.error);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Full Name",
      dataIndex: "studentFullName",
      key: "studentFullName",
    },
    {
      title: "Student Email",
      dataIndex: "studentEmail",
      key: "studentEmail",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <>
          {status === "Pending" ? (
            <Tag color="gold">Pending</Tag>
          ) : status === "Accepted" ? (
            <Tag color="green">Accepted</Tag>
          ) : status === "Denied" ? (
            <Tag color="red">Denied</Tag>
          ) : null}
        </>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createAt: string) => <span>{new Date(createAt).toLocaleDateString()}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (updatedAt: string) => <span>{new Date(updatedAt).toLocaleDateString()}</span>,
    },
    {
      title: "Action",
      width: "150px",
      key: "action",
      render: (record: Report) => (
        <div className="flex gap-2">
          {record.status === "Pending" ? (
            <>
              <Button
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={() => handleApprove(record.id)}
              >
                Accept
              </Button>
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600"
                onClick={() => handleReject(record.id)} // Mở modal reject
              >
                Denny
              </Button>
            </>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>Delete</Button>
              </AlertDialogTrigger>
              <DeleteReport report={record} rerender={rerender} />
            </AlertDialog>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey={"id"} />

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <AlertDialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reject Report</AlertDialogTitle>
            </AlertDialogHeader>
            <div>
              <p>Please provide a reason for rejecting this report:</p>
              <TextArea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason"
                className="mt-2"
                rows={4}
              />
            </div>
            <AlertDialogFooter>
              <Button variant={"ghost"} onClick={() => setIsRejectModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitRejection} disabled={!rejectionReason}>
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default DataTable;
