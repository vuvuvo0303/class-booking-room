import Loader from "@/components/Loader";
import NotFound from "@/components/NotFound";
import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useRerender from "@/hooks/use-rerender";
import { Activity, Department } from "@/types/department";
import CreateActivity from "./CreateActivity";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import UpdateActivity from "./UpdateActivity";
import { deleteActivity } from "@/lib/api/activity-api";
import { getDepartmentById } from "@/lib/api/department-api";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const DepartmentDetail = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [departmentDetail, setDepartmentDetail] = useState<Department>();
  const [isLoading, setIsLoading] = useState(false);
  const { departmentId } = useParams();
  const { renderKey, rerender } = useRerender();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const departmentResult = await getDepartmentById(parseInt(departmentId!));
      if (departmentResult.error) {
        toast.error("False to retrieve department data");
      } else {
        setDepartmentDetail(departmentResult.data);
      }
      setIsLoading(false);
    };
    if (departmentId) {
      fetchData();
    }
  }, [renderKey]);
  const basePath = "/" + loggedUser.role;
  if (isLoading) return <Loader text="Loading department data..." />;
  if (departmentDetail == null) return <NotFound />;
  return (
    <div className="bg-white">
      <Header
        currentPage={departmentDetail?.name ?? ""}
        breadcrumbItems={[
          { title: "Dashboard", to: basePath },
          { title: "Department", to: basePath + "/department" },
        ]}
      />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">
            Department {departmentDetail?.name}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          <p>
            Created at:{" "}
            {new Date(departmentDetail?.createdAt ?? "").toLocaleString()}
          </p>
          <p>
            Updated at:{" "}
            {new Date(departmentDetail?.updatedAt ?? "").toLocaleString()}
          </p>
        </div>
        <p className="">
          <span className="font-semibold">Number of activities:</span>{" "}
          {departmentDetail?.activites.length}
        </p>
        <div className="p-3">
          <div className="flex justify-between mb-2 items-center">
            <h3 className="text-xl font-semibold">Activities</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="me-1" />  Add activity</Button>
              </DialogTrigger>
              <CreateActivity
                departmentId={departmentDetail!.id}
                rerender={rerender}
              />
            </Dialog>
          </div>
          <div className="flex flex-col gap-2">
            {departmentDetail!.activites?.map(
              (activity: Activity, index: number) => {
                return (
                  <ActivityCard
                    activity={activity}
                    key={index}
                    rerender={rerender}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const ActivityCard = ({
  activity,
  rerender,
}: {
  activity: Activity;
  rerender: () => void;
}) => {
  const handleDeleteSlot = async () => {
    const result = await deleteActivity(activity.id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Slot deleted successfully");
      setTimeout(() => {
        rerender();
      }, 1000);
    }
  };
  return (
    <div className="bg-white py-3 px-5 rounded-lg shadow-sm drop-shadow justify-between flex items-center">
      <div className="font-semibold text-lg">
        {activity.code} - {activity.name}
      </div>
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Update</Button>
          </DialogTrigger>
          <UpdateActivity activity={activity} rerender={rerender} />
        </Dialog>
        <Button
          variant={"destructive"}
          className="p-2 aspect-square rounded-full"
          onClick={handleDeleteSlot}
        >
          <Trash2 size={15} />
        </Button>
      </div>
    </div>
  );
};

export default DepartmentDetail;
