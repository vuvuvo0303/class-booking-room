import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import DataTable from "./DataTable";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Loader from "@/components/Loader";
import useRerender from "@/hooks/use-rerender";
import { Room } from "@/types/room";
import { getAllRoom } from "@/lib/api/room-api";
import AddNewRoom from "./AddNewRoom";

const Rooms = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [data, setData] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { renderKey, rerender } = useRerender();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllRoom ();
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
  if (isLoading) return <Loader text="Loading room data..." />;
  return (
    <div className="bg-white">
      <Header
        currentPage="Rooms"
        breadcrumbItems={[{ title: "Dashboard", to: basePath }]}
      />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">Manage Room</span>
        </div>
        <div className="flex justify-end mb-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="me-1" /> Add Room
              </Button>
            </DialogTrigger>
            <AddNewRoom rerender={rerender} />
          </Dialog>
        </div>
        <div className="drop-shadow-md">
          <DataTable data={data} rerender={rerender}/>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
