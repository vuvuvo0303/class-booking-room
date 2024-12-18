import NotFound from "@/components/NotFound";
import AdminLayout from "@/layouts/AdminLayout";
import {
  AdminBookingDetailPage,
  AdminCohortPage,
  AdminDashboardPage,
  AdminDepartment,
  AdminDepartmentDetail,
  AdminRoomDetailPage,
  AdminRoomPage,
  AdminRoomTypeDetail,
  AdminSlotPage,
  AdminStaffPage,
  AdminStudentDetailPage,
  AdminStudentPage,
  AdminUserPage,
} from "@/pages";
import AccountRequest from "@/pages/admin/AccountRequest/AccountRequest";
import Booking from "@/pages/admin/BookingHistory/Booking";
import BookingRequest from "@/pages/admin/ManageBookingRequest/BookingRequest";
import ManageStaff from "@/pages/admin/Manager Staff/ManageStaff";
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
        <Route path="/dashboard-admin" element={<AdminDashboardPage />} />
        <Route path="/user" element={<AdminUserPage />} />
        <Route path="/manage-staff" element={<ManageStaff />} />
        <Route path="/rooms" element={<AdminRoomPage />} />
        <Route path="/rooms/:roomId" element={<AdminRoomDetailPage />} />
        <Route path="/room-types" element={<ManageRoomTypes />} />
        <Route path="/room-types/:roomTypeId" element={<AdminRoomTypeDetail />} />
        <Route path="/slot" element={<AdminSlotPage />} />
        <Route path="/cohort" element={<AdminCohortPage />} />
        <Route path="/bookings-request" element={<BookingRequest />} />
        <Route path="/account-request" element={<AccountRequest />} />
        <Route path="/report" element={<ManageReport />} />
        <Route path="/department" element={<AdminDepartment />} />
        <Route path="/department/:departmentId" element={<AdminDepartmentDetail />} />
        <Route
          path="/student/:studentId"
          element={<AdminStudentDetailPage />}
        />
        <Route path="/student/:studentId" element={<AdminStudentDetailPage />} />
        <Route path="/student" element={<AdminStudentPage />} />
        <Route path="/booking-history" element={<Booking />} />
        <Route path="/booking/:bookingId" element={<AdminBookingDetailPage />} />
        <Route path="/staff-request" element={<AdminStaffPage />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
