import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Loader from "@/components/Loader";
import useRerender from "@/hooks/use-rerender";
import { getAllRoomType } from "@/lib/api/room-type-api";
import DataTable from "./DataTable";
import AddRoomTypes from "./AddRoomType";
import { RoomTypes } from "@/types/room-type";

const ManageRoomTypes = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [data, setData] = useState<RoomTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { renderKey, rerender } = useRerender();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllRoomType ();
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
  if (isLoading) return <Loader text="Loading room types data..." />;
  return (
    <div className="bg-white">
      <Header
        currentPage="Room Types"
        breadcrumbItems={[{ title: "Trang chủ", to: basePath }]}
      />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">Manage Room Types</span>
        </div>
        <div className="flex justify-end mb-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="me-1" /> Add Room Types
              </Button>
            </DialogTrigger>
            <AddRoomTypes rerender={rerender} />
          </Dialog>
        </div>
        <div className="drop-shadow-md">
          <DataTable data={data} rerender={rerender}/>
        </div>
      </div>
    </div>
  );
};

export default ManageRoomTypes;
