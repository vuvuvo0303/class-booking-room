import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { Button } from "antd";
import DataTable from "./DataTable";
import { useEffect, useState } from "react";
import { Cohort as CohortType } from "@/types/cohort";
import { getAllCohort } from "@/lib/api/cohort-api";

const Cohort = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [data, setData] = useState<CohortType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCohort();
      if (result.error) {
        console.log(result.error);
      } else {
        setData(result.data);
        console.log(result.data);
      }
    };
    fetchData();
  }, []);

  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header
        currentPage="Slot"
        breadcrumbItems={[{ title: "Trang chủ", to: basePath }]}
      />
      <div className="flex justify-center py-3">
        <span className="text-4xl font-bold">Manage Cohorts</span>
      </div>
      <div className="flex justify-end p-3">
        <Button type="primary">Add Cohort</Button>
      </div>
      <div className="px-3">
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default Cohort;
