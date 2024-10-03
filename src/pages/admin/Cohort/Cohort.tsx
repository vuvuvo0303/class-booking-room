import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import DataTable from "./DataTable";
import { useEffect, useState } from "react";
import { Cohort as CohortType } from "@/types/cohort";
import { getAllCohort } from "@/lib/api/cohort-api";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddCohort from "./AddCohort";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Loader from "@/components/Loader";

const Cohort = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [data, setData] = useState<CohortType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllCohort();
      setIsLoading(false);
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
  if (isLoading) return <Loader text="Loading cohorts data..."/>;
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              {" "}
              <Plus className="me-1" /> Add Cohort
            </Button>
          </DialogTrigger>
          <AddCohort />
        </Dialog>
      </div>
      <div className="px-3">
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default Cohort;
