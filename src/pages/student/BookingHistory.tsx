import Loader from "@/components/Loader";
import { cancelBooking, getBookingById } from "@/lib/api/booking-api";
import { postReport } from "@/lib/api/report-api";
import useAuthStore from "@/store/AuthStore";
import { Booking } from "@/types/booking";
import { formatDateToTimeString } from "@/utils/time";
import { Button, Modal, Space, Table, Tag, Input } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookingHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState<number | null>(null);
  const loggedUser = useAuthStore((state) => state.user);
  const [selectedStudent, setSelectedStudent] = useState<Booking | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false); 
  const [reportTitle, setReportTitle] = useState(""); 
  const [reportContent, setReportContent] = useState("");
  const [data, setData] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null); 

  const handleCancelBooking = async (id: number) => {
    setLoadingCancel(id);
    const response = await cancelBooking(id);
    setLoadingCancel(null);

    if (!response.error) {
      toast.success("Cancel Booking Successfully!");
      fetchData();
    } else {
      toast.error(`Error: ${response.error}`);
    }
  };

  const handleReportBooking = (id: number) => {
    setSelectedBookingId(id); 
    setOpenReportModal(true);
  };

  const submitReport = async () => {
    if (!reportTitle.trim()) {
      toast.error("Please enter a title for the report.");
      return;
    }

    if (!reportContent.trim()) {
      toast.error("Please enter report details before submitting.");
      return;
    }


    const booking = data.find((item) => item.id === selectedBookingId);
    const roomId = booking ? booking.roomId : null;

    if (roomId === null) {
      toast.error("Unable to find room ID for the selected booking.");
      return;
    }

    const reportData = {
      creatorId: loggedUser.id,
      roomId: roomId,
      title: reportTitle,
      description: reportContent,
    };

    const response = await postReport(reportData);

    if (response.error) {
      toast.error(`Error: ${response.error}`);
    } else {
      toast.success("Report submitted successfully!");
      setOpenReportModal(false);
      setReportTitle(""); 
      setReportContent("");
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getBookingById(loggedUser.id);
    setIsLoading(false);
    if (result.error) {
      console.error(result.error);
    } else {
      setData(result.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loggedUser.id]);

  if (isLoading) return <Loader />;

  const columns: TableProps<Booking>["columns"] = [
    {
      title: "Full Name",
      dataIndex: "studentFullName",
      key: "studentFullName",
      render: (text: string, record: Booking) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedStudent(record);
            setOpenModal(true);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: "Activity",
      dataIndex: "activityName",
      key: "activityName",
      render: (activityName: string) => <span>{activityName}</span>,
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      render: (bookingDate: string) => <span>{new Date(bookingDate).toLocaleDateString()}</span>,
    },
    {
      title: "Response",
      dataIndex: "response",
      key: "response",
    },
    {
      title: "Note",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Accepted" ? "green" : status === "Denied" ? "red" : status === "Cancelled" ? "pink" : "orange"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Room Slots",
      key: "roomSlots",
      render: (record: Booking) =>
        record.roomSlots.map((slot) => (
          <Tag key={slot.id} color="blue" className="min-w-[120px] text-center">
            {`${formatDateToTimeString(new Date(slot.startTime), true)} - ${formatDateToTimeString(
              new Date(slot.endTime),
              true
            )}`}
          </Tag>
        )),
    },
    {
      title: "Action",
      key: "action",
      render: (record: Booking) => (
        <Space size="middle">
          {record.status !== "Cancelled" && record.status !== "Checked-in" && (
            <Button
              style={{ backgroundColor: "orange", color: "white" }}
              onClick={() => handleCancelBooking(record.id)}
              loading={loadingCancel === record.id}
              disabled={loadingCancel !== null}
            >
              Cancel
            </Button>
          )}
          {record.status === "Checked-in" && (
            <Button
              style={{ backgroundColor: "pink", color: "black" }}
              onClick={() => handleReportBooking(record.id)}
            >
              Report
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    setOpenModal(false);
    setSelectedStudent(null);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="pt-40">
      <div className="pb-12">
        <span className="text-4xl flex justify-center">Booking History</span>
      </div>
      <div className="px-10 drop-shadow-lg pb-16">
        <Table<Booking> columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Student Information"
        visible={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {selectedStudent && (
          <div>
            <p>
              <strong>Student Name:</strong> {selectedStudent.studentFullName}
            </p>
            <p>
              <strong>Student Email:</strong> {selectedStudent.studentEmail}
            </p>
            <p>
              <strong>Cohort Code:</strong> {selectedStudent.cohortCode}
            </p>
            <p>
              <strong>Department:</strong> {selectedStudent.departmentName}
            </p>
          </div>
        )}
      </Modal>
      <Modal
        title="Report Room"
        visible={openReportModal}
        onOk={submitReport}
        onCancel={() => setOpenReportModal(false)}
        okText="Submit"
        cancelText="Cancel"
      >
        <Input
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
          placeholder="Enter report title"
          style={{ marginBottom: 16 }}
        />
        <Input.TextArea
          rows={4}
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          placeholder="Enter your report details here"
        />
      </Modal>
    </div>
  );
};

export default BookingHistory;
