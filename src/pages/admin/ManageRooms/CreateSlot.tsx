import { createRoomSlot } from "@/lib/api/room-api";
import { Button, Form, FormProps, Modal, TimePicker } from "antd";
import { Dayjs } from "dayjs";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type FieldType = {
  slotTime: Dayjs[];
};

const format = "HH:mm";
const CreateSlot = ({
  roomId,
  rerender,
}: {
  roomId: number;
  rerender: () => void;
}) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    const createResult = await createRoomSlot({
      startTime: values.slotTime[0].toDate().toISOString(),
      endTime: values.slotTime[1].toDate().toISOString(),
      roomId: roomId,
    });
    if (createResult.error) {
      toast.error(createResult.error);
    } else {
      toast.success("Create slot successfully!");
      setTimeout(() => {
        rerender();
      }, 1000);
    }
    handleOk();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<CirclePlus width={15} height={15} className="m-0" />}
        onClick={showModal}
        className="flex items-center"
      >
        Create new slot
      </Button>
      <Modal
        title="Create new slot"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={() => <></>}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Slot time"
            name="slotTime"
            rules={[{ required: true, message: "" }]}
          >
            <TimePicker.RangePicker minuteStep={15} format={format} />
          </Form.Item>
          <div className="flex gap-2 justify-center">
            <Button type="default" htmlType="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Form.Item className="m-0">
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateSlot;
