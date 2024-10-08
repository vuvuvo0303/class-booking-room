import Header from "@/components/admin/Header";
import useAuthStore from "@/store/AuthStore";
import DataTable from "./DataTale";
import { useEffect, useState } from "react";
import useRerender from "@/hooks/use-rerender";
import Loader from "@/components/Loader";
import { getAllReports } from "@/lib/api/report-api";
import { Report } from "@/types/report";

const ManageReport = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const { renderKey, rerender } = useRerender();
  const [data, setData] = useState<Report[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getAllReports();
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
      <Header currentPage="Report" breadcrumbItems={[{ title: "Dashboard", to: basePath }]} />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">Manage Report</span>
        </div>
        
        <div className="drop-shadow-md pt-10">
          <DataTable data={data} rerender={rerender} />
        </div>
      </div>
    </div>
  );
};

export default ManageReport;
