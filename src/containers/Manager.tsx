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
} from "@/pages";
import useAuthStore from "@/store/AuthStore";
import { Route, Routes } from "react-router-dom";

const Manager = () => {
  const loggedUser = useAuthStore((state) => state.user);
  if (loggedUser == null || loggedUser.role != "Manager") {
    return <NotFound />;
  }
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboardPage />} />
        <Route path="/dashboard" element={<AdminDashboardPage />} />
        <Route path="/group" element={<AdminGroupPage />} />
        <Route path="/room" element={<AdminRoomPage />} />
        <Route path="/slot" element={<AdminSlotPage />} />
        <Route path="/student/:studentId" element={<AdminStudentDetailPage />} />
        <Route path="/student" element={<AdminStudentPage />} />
        <Route path="/booking" element={<AdminBookingPage />} />
        <Route path="/booking/:bookingId" element={<AdminBookingDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AdminLayout>
  );
};

export default Manager;
