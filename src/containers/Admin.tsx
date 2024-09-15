import NotFound from "@/components/NotFound";
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
import useAuthStore from "@/store/AuthStore";
import { Route, Routes } from "react-router-dom";

const Admin = () => {
  const loggedUser = useAuthStore((state) => state.user);
  if (loggedUser == null || loggedUser.role != "admin") {
    return <NotFound />;
  }
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboardPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/user" element={<AdminUserPage />} />
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

export default Admin;
