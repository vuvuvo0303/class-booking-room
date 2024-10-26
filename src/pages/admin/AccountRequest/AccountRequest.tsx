
import useAuthStore from "@/store/AuthStore";
import { useEffect, useState } from "react";
import useRerender from "@/hooks/use-rerender";
import Loader from "@/components/Loader";
import { User } from "@/types/user";
import DataTable from "./DataTable";
import {  getUnverifiedUsers } from "@/lib/api/user-api";
import Header from '@/components/admin/Header'

const AccountRequest = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const { renderKey, rerender } = useRerender();
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await getUnverifiedUsers();
      setIsLoading(false);
      if (result.error) {
        console.log(result.error);
      } else {
        setData(result.data);
      }
    };
    fetchData();
  }, [renderKey]);
  if (isLoading) return <Loader text="Loading Account Request data..." />;

  const basePath = "/" + loggedUser.role;
  return (
    <div>
      <Header currentPage="Account Request" breadcrumbItems={[{ title: "Dashboard", to: basePath }]} />
      <div className="p-3">
        <div className="flex">
          <span className="text-4xl font-semibold">Manage Account Request</span>
        </div>
        <div className="flex justify-end mb-3">
         
        </div>
        <div className="drop-shadow-md pt-10">
          <DataTable data={data} rerender={rerender} />
        </div>
      </div>
    </div>
  );
};

export default AccountRequest;
