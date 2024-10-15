import { Button as ShadButton } from "@/components/ui/button";
import { updateRoomSlot } from "@/lib/api/room-api";
import { Slot } from "@/types/slot";
import { Button, Form, FormProps, Modal, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type FieldType = {
  slotTime: Dayjs[];
};

const format = "HH:mm";
const UpdateSlot = ({
  slot,
  rerender,
}: {
  slot: Slot;
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
    const createResult = await updateRoomSlot(
      {
        startTime: values.slotTime[0].toDate().toISOString(),
        endTime: values.slotTime[1].toDate().toISOString(),
      },
      slot.id
    );
    if (createResult.error) {
      toast.error(createResult.error);
    } else {
      toast.error("Create slot successfully!");
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
      <ShadButton
        variant={"outline"}
        onClick={showModal}
        className="p-2 aspect-square rounded-full"
      >
        <PencilLine size={15} />
      </ShadButton>
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
            initialValue={[
              dayjs(new Date(slot.startTime).getTime()),
              dayjs(new Date(slot.endTime).getTime()),
            ]}
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

export default UpdateSlot;
