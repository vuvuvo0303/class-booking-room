import { useState } from "react";
import { Table, Modal, Tag } from "antd";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking";
import "react-toastify/dist/ReactToastify.css";
import { formatDateToTimeString } from "@/utils/time";
import { formatDate } from "@/utils/date";

const DataTable = ({ data }: { data: Booking[]; rerender: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Booking | null>(null);

  const showModal = (student: Booking) => {
    setSelectedStudent(student);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedStudent(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedStudent(null);
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
      render: (record: Booking) => (
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
        <Tag
          color={
            status === "Accepted"
              ? "green"
              : status === "Denied"
              ? "red"
              : "default"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Booking date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (date: string) => formatDate(new Date(date)),
    },
    {
      title: "Room Slots",
      key: "roomSlots",
      render: (record: Booking) =>
        record.roomSlots.map((slot) => (
          <Tag key={slot.id} color="blue" className="min-w-[120px] text-center">
            {`${formatDateToTimeString(
              new Date(slot.startTime),
              true
            )} - ${formatDateToTimeString(new Date(slot.endTime), true)}`}
          </Tag>
        )),
    },
    { title: "Respone", dataIndex: "response", Key: "response" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formatDate(new Date(date)),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => formatDate(new Date(date)),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 400 }}
      />

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
    </>
  );
};

export default DataTable;
