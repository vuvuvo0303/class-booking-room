import NotFound from "@/components/NotFound";
import AdminLayout from "@/layouts/AdminLayout";
import {
  AdminBookingDetailPage,
  AdminBookingPage,
  AdminCohortPage,
  AdminDashboardPage,
  AdminGroupPage,
  AdminRoomDetailPage,
  AdminRoomPage,
  AdminSlotPage,
  AdminStaffPage,
  AdminStudentDetailPage,
  AdminStudentPage,
  AdminUserPage,
} from "@/pages";
import ManageReport from "@/pages/admin/Managereport/Report";
import ManageRoomTypes from "@/pages/admin/ManageRoomType/ManageRoomTypes";
import useAuthStore from "@/store/AuthStore";
import { Route, Routes } from "react-router-dom";

const Admin = () => {
  const loggedUser = useAuthStore((state) => state.user);
  if (loggedUser == null || loggedUser.role != "Admin") {
    return <NotFound />;
  }
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboardPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/user" element={<AdminUserPage />} />
        <Route path="/group" element={<AdminGroupPage />} />
        <Route path="/rooms" element={<AdminRoomPage />} />
        <Route path="/rooms/:roomId" element={<AdminRoomDetailPage />} />
        <Route path="/room-types" element={<ManageRoomTypes />} />
        <Route path="/slot" element={<AdminSlotPage />} />
        <Route path="/cohort" element={<AdminCohortPage />} />
        <Route path="/report" element={<ManageReport />} />
        <Route
          path="/student/:studentId"
          element={<AdminStudentDetailPage />}
        />
        <Route path="/student/:studentId" element={<AdminStudentDetailPage />} />
        <Route path="/student" element={<AdminStudentPage />} />
        <Route path="/booking" element={<AdminBookingPage />} />
        <Route path="/booking/:bookingId" element={<AdminBookingDetailPage />} />
        <Route path="/staff" element={<AdminStaffPage />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
