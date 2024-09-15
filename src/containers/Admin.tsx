import AdminLayout from "@/layouts/AdminLayout";
import { AdminDashboardPage, AdminUserPage } from "@/pages";
import { Route, Routes } from "react-router-dom";

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboardPage />} />
        <Route path="/user" element={<AdminUserPage />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
