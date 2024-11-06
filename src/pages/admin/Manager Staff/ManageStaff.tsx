import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { useEffect, useState } from "react";
import useRerender from "@/hooks/use-rerender";
import Loader from "@/components/Loader";
import { User } from "@/types/user";
import { getAllManagers } from "@/lib/api/user-api";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "./DataTable";

const Managesatff = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const { renderKey, rerender } = useRerender();
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllManagers();
      setIsLoading(false);
      if (result.error) {
        console.log(result.error);
      } else {
        setData(result.data);
      }
    };
    fetchData();
  }, [renderKey]);
  if (isLoading) return <Loader text="Loading reports data..." />;

  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header currentPage="Manage Staff" breadcrumbItems={[{ title: "Dashboard", to: basePath }]} />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">Manage Staff</span>
        </div>
        <div className="flex justify-end mb-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="me-1" /> Add Staff
              </Button>
            </DialogTrigger>
            {/* <AddAccount rerender={rerender} /> */}
          </Dialog>
        </div>
        <div className="drop-shadow-md pt-10">
          <DataTable data={data} rerender={rerender} />
        </div>
      </div>
    </div>
  );
};

export default Managesatff;
