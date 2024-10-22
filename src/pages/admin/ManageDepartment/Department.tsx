import Loader from "@/components/Loader";
import Header from "@/components/admin/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import useRerender from "@/hooks/use-rerender";
import { getAllDepartments } from "@/lib/api/department-api";
import useAuthStore from "@/store/AuthStore";
import { Department } from "@/types/department";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AddNewDepartment from "./AddNewDepartment";
import DataTable from "./DataTable";

const DepartmentPage = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [data, setData] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { renderKey, rerender } = useRerender();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllDepartments();
      setIsLoading(false);
      if (result.error) {
        console.log(result.error);
      } else {
        setData(result.data);
      }
    };
    fetchData();
  }, [renderKey]);
  const basePath = "/" + loggedUser.role;
  if (isLoading) return <Loader text="Loading department data..." />;
  return (
    <div className="bg-white">
      <Header
        currentPage="Department"
        breadcrumbItems={[{ title: "Dashboard", to: basePath }]}
      />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">Manage Department</span>
        </div>
        <div className="flex justify-end mb-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="me-1" /> Add Department
              </Button>
            </DialogTrigger>
            <AddNewDepartment rerender={rerender} />
          </Dialog>
        </div>
        <div className="drop-shadow-md">
          <DataTable data={data} rerender={rerender} />
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
