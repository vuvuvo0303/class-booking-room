import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import useRerender from "@/hooks/use-rerender";
import { Booking } from "@/types/booking";
import { getAllBookingHistory } from "@/lib/api/booking-api";
import DataTable from "./DataTable";

const BookingRequest = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [data, setData] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { renderKey, rerender } = useRerender();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllBookingHistory();
      console.log(result);
      
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
  if (isLoading) return <Loader text="Loading  Booking Request data..." />;
  return (
    <div className="bg-white">
      <Header
        currentPage=" Booking History"
        breadcrumbItems={[{ title: "DashBoard", to: basePath }]}
      />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">Manage Booking History</span>
        </div>
        <div className="flex justify-end mb-3">
        
        </div>
        <div className="drop-shadow-md">
          <DataTable data={data} rerender={rerender}/>
        </div>
      </div>
    </div>
  );
};

export default BookingRequest;
