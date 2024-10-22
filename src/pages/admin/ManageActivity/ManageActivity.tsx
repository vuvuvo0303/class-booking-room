import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { useEffect, useState } from "react";
import useRerender from "@/hooks/use-rerender";
import Loader from "@/components/Loader";
import { Report } from "@/types/report";
import { getAllActivity } from "@/lib/api/activity-api";
import DataTable from "./DataTable";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Activity } from "@/types/department";
import AddActivity from "./AddActivity";

const ManageActivity = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const { renderKey, rerender } = useRerender();
  const [data, setData] = useState<Activity[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllActivity();
      setIsLoading(false);
      if (result.error) {
        console.log(result.error);
      } else {
        setData(result.data);
      }
    };
    fetchData();
  }, [renderKey]);
  if (isLoading) return <Loader text="Loading Activity data..." />;

  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header currentPage="Activity" breadcrumbItems={[{ title: "Dashboard", to: basePath }]} />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">Manage Activity</span>
        </div>
        <div className="flex justify-end mb-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="me-1" /> Add Activity
              </Button>
            </DialogTrigger>
            <AddActivity rerender={rerender} />
          </Dialog>
        </div>
        <div className="drop-shadow-md pt-10">
          <DataTable data={data} rerender={rerender} />
        </div>
      </div>
    </div>
  );
};

export default ManageActivity;
