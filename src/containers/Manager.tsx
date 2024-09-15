import AdminLayout from "@/layouts/AdminLayout";
import {
  AdminBookingDetailPage,
  AdminBookingPage,
  AdminDashboardPage,
  AdminGroupPage,
  AdminRoomPage,
  AdminSlotPage,
  AdminStudentDetailPage,
  AdminStudentPage,
  AdminTeamDetailPage,
  AdminTeamPage,
  AdminUserPage,
} from "@/pages";
import { Route, Routes } from "react-router-dom";

const Manager = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboardPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/group" element={<AdminGroupPage />} />
        <Route path="/room" element={<AdminRoomPage />} />
        <Route path="/slot" element={<AdminSlotPage />} />
        <Route
          path="/student/:studentId"
          element={<AdminStudentDetailPage />}
        />
        <Route path="/student" element={<AdminStudentPage />} />
        <Route path="/team" element={<AdminTeamPage />} />
        <Route path="/team/:teamId" element={<AdminTeamDetailPage />} />
        <Route path="/booking" element={<AdminBookingPage />} />
        <Route
          path="/booking/:bookingId"
          element={<AdminBookingDetailPage />}
        />
      </Routes>
    </AdminLayout>
  );
};

export default Manager;
