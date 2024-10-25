import { FormProps, useForm } from "antd/es/form/Form";
import anh3d from "../../assets/anh3d.jpg";
import { Form, Select, Button } from "antd";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { getAllDepartments } from "@/lib/api/department-api";
import { toast } from "react-toastify";
import { getAllCohort } from "@/lib/api/cohort-api";
import { Department } from "@/types/department";
import { Cohort } from "@/types/cohort";
import { fillUserInfo } from "@/lib/api/user-api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/AuthStore";
type FieldType = {
  departmentId: number;
  cohortId: number;
};
const FillUserInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [form] = useForm();
  const loggedUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const departmentResult = await getAllDepartments();
      if (departmentResult.error) {
        toast.error("Failed to get departments from server");
      } else {
        setDepartments(departmentResult.data);
      }
      const cohortResult = await getAllCohort();
      if (cohortResult.error) {
        toast.error("Failed to get cohorts from server");
      } else {
        setCohorts(cohortResult.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  if (loggedUser == null || (loggedUser.cohortId != null && loggedUser.departmentId != null)) {
    navigate("/");
  }
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmitting(true);
    const submitResult = await fillUserInfo(
      loggedUser.id,
      values.departmentId,
      values.cohortId
    );
    if (submitResult.error) {
      toast.error("Failed to submit information.");
    } else {
      toast.success("Information submitted successfully.");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    }
    setIsSubmitting(false);
  };
  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${anh3d})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <span className="block text-lg font-bold mb-6">
          Please fill in your information to continue
        </span>
        <div>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Department"
              name="departmentId"
              rules={[
                { required: true, message: "Please select your Department!" },
              ]}
            >
              <Select
                showSearch
                placeholder="Select your department"
                optionFilterProp="label"
                options={departments.map((department: Department) => ({
                  value: department.id,
                  label: department.name,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Cohort"
              name="cohortId"
              rules={[
                { required: true, message: "Please select your Cohort!" },
              ]}
            >
              <Select
                showSearch
                placeholder="Select your cohort"
                optionFilterProp="label"
                options={cohorts.map((cohort: Cohort) => ({
                  value: cohort.id,
                  label: cohort.cohortCode,
                }))}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full" loading={isSubmitting}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FillUserInfo;
