import { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-[#F5F5F5] h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
