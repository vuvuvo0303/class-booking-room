import  { useState } from "react";
import { Table, Modal, Tag, Input } from "antd";
import { Button } from "@/components/ui/button"; 
import { Booking } from "@/types/booking";
import { acceptBooking, denyBooking } from "@/lib/api/booking-api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDateToTimeString } from "@/utils/time";

const DataTable = ({ data, rerender }: { data: Booking[], rerender: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDenyModalVisible, setIsDenyModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Booking | null>(null);
  const [denyReason, setDenyReason] = useState(""); 
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);

  
  const showModal = (student: Booking,) => {
    setSelectedStudent(student); 
    setIsModalVisible(true); 
  };

 
  const handleAccept = async (id: number) => {
    const response = await acceptBooking(id);
    if (response.success) {
      toast.success("Booking accepted!");
      rerender();
    } else {
      toast.error(`Error: ${response.error}`);
    }
  };


  const showDenyModal = (id: number) => {
    setSelectedBookingId(id);
    setIsDenyModalVisible(true);
  };

  
  const handleDeny = async () => {
    if (selectedBookingId && denyReason) {
      const response = await denyBooking(selectedBookingId, denyReason);
      if (response.success) {
        toast.success("Booking denied!");
        setIsDenyModalVisible(false); 
        setDenyReason(""); 
        rerender();
      } else {
        toast.error(`Error: ${response.error}`);
      }
    } else {
      toast.warning("Please enter a reason for denial.");
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedStudent(null); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedStudent(null);
  };

  const handleDenyModalCancel = () => {
    setIsDenyModalVisible(false);
    setDenyReason(""); 
  };


  const columns = [
    {
      title: "Booking Code",
      dataIndex: "code",
      key: "code",
      width: 250, 
    },
    {
      title: "Student Name",
      dataIndex: "studentFullName",
      key: "studentFullName",
      render: (text: string, record: Booking) => (
        <Button variant="link" onClick={() => showModal(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Activity",
      key: "activity",
      width: 300, 
      render: ( record: Booking) => (
        <span>
          {record.activityCode} - {record.activityName}
        </span>
      ),
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
        <Tag color={status === "Pending" ? "orange" : ""}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
        title: "Room Slots",
        key: "roomSlots",
        render: (record: Booking) =>
          record.roomSlots.map((slot) => (
            <Tag
              key={slot.id}
              color="blue"
              className="min-w-[120px] text-center"
            >
              {`${formatDateToTimeString(new Date(slot.startTime), true)} - ${formatDateToTimeString(new Date(slot.endTime), true)}`}
            </Tag>
          )),
      },
      
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(), 
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleDateString(), 
    },
    {
      title: "Action",
      key: "action",
      width: "150px",
      render: ( record: Booking) => (
        <div className="flex gap-2">
          <Button variant="default" className="bg-green-600 text-white" onClick={() => handleAccept(record.id)}>
            Approve
          </Button>
          <Button variant="destructive" onClick={() => showDenyModal(record.id)}>
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id" />

    
      <Modal
        title="Student Information"
        visible={isModalVisible}
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
              <strong>Activity Name:</strong> {selectedStudent.activityName}
            </p>
            <p>
              <strong>Department:</strong> {selectedStudent.departmentName}
            </p>
          </div>
        )}
      </Modal>

      
      <Modal
        title="Deny Booking"
        visible={isDenyModalVisible}
        onOk={handleDeny}
        onCancel={handleDenyModalCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <p>Please enter the reason for denial:</p>
        <Input.TextArea 
          value={denyReason}
          onChange={(e) => setDenyReason(e.target.value)}
          placeholder="Enter reason..."
        />
      </Modal>
    </>
  );
};

export default DataTable;
