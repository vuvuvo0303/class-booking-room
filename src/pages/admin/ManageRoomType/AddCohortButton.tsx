import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import useLoading from "@/hooks/use-loading";
import { getAllCohort } from "@/lib/api/cohort-api";
import { addCohort } from "@/lib/api/room-type-api";
import { Cohort } from "@/types/cohort";
import { RoomTypes } from "@/types/room-type";
import { Form, FormProps, Modal, Select } from "antd";
import { LoaderIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
type FieldType = {
  cohortId: number;
};
const AddCohortButton = ({
  roomType,
  rerender,
}: {
  roomType: RoomTypes;
  rerender: () => void;
}) => {
  const { isLoading, setIsLoading, isSubmitting, setIsSubmitting } =
    useLoading();
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
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
    setIsSubmitting(true);
    const addResult = await addCohort(roomType.id, values.cohortId);
    if (addResult.error) {
      toast.error(addResult.error);
    } else {
      setTimeout(() => {
        rerender();
        handleOk();
      }, 500);
    }
    setIsSubmitting(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const cohortResult = await getAllCohort();
      if (cohortResult.error) {
        toast.error(cohortResult.error);
      } else {
        setCohorts(cohortResult.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  if (isLoading) return <Loader />;
  const availableCohort = cohorts.filter(c => !roomType.allowedCohorts.find(cr => cr.id == c.id));
  return (
    <>
      <Button
        variant={"outline"}
        className="text-gray-700 px-1"
        onClick={showModal}
      >
        <Plus />
      </Button>
      <Modal
        title="Create new slot"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={() => <></>}
      >
        <Form
          name="addCohortForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Cohort"
            name="cohortId"
            rules={[{ required: true, message: "Please select cohort to add." }]}
          >
            <Select
              showSearch
              placeholder="Select cohort to add"
              optionFilterProp="label"
              options={availableCohort.map((cohort: Cohort) => ({
                value: cohort.id,
                label: cohort.cohortCode,
              }))}
            />
          </Form.Item>
          <div className="flex gap-2 justify-center">
            <Button variant={"secondary"} type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Form.Item className="m-0">
              <Button variant={"default"} type="submit">
                {isSubmitting ? <LoaderIcon className="animate-spin" /> : "Add"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddCohortButton;
