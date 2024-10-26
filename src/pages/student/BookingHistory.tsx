import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { getBookingById } from "@/lib/api/booking-api";
import useAuthStore from "@/store/AuthStore";
import { Booking } from "@/types/booking";
import { formatDateToTimeString } from "@/utils/time";
import { Modal, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";

const BookingHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loggedUser = useAuthStore((state) => state.user);
  const [selectedStudent, setSelectedStudent] = useState<Booking | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<Booking[]>([]);

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

  if (isLoading) return <Loader text="Loading Booking data..." />;

  const columns: TableProps<Booking>["columns"] = [
    {
      title: "Full Name",
      dataIndex: "studentFullName",
      key: "studentFullName",
      render: (text: string, record: Booking) => (
        <Button
          variant="link"
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
        <Tag color={status === "Accepted" ? "green" : status === "Denied" ? "red" : "orange"}>
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
          <Button onClick={() => {}}>Cancel</Button>
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
    </div>
  );
};

export default BookingHistory;
