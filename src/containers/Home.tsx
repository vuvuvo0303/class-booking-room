import MainLayout from "@/layouts/MainLayout";
import { HomePage, RoomDetailPage, RoomListPage } from "@/pages";
import { Route, Routes, useNavigate } from "react-router-dom";
import { StudentProfile } from ".";
import NotFound from "@/components/NotFound";
import AboutUs from "@/pages/student/AboutUs";
import Policy from "@/pages/student/Policy";
import Rules from "@/pages/student/Rules";
import BookingRoom from "@/pages/student/BookingRoom";
import StepProcess from "@/pages/student/step-process";
import useAuthStore from "@/store/AuthStore";
import VerifyPage from "@/pages/VerifyPage";
import { useEffect } from "react";

const Home = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedUser && loggedUser.isVerify == false) {
      navigate("/verify-email");
    }
    if (
      loggedUser &&
      loggedUser.role == "Student" &&
      (loggedUser.cohortId == null || loggedUser.departmentId == null)
    ) {
      navigate("/fill-info");
    }
  }, [loggedUser]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room" element={<RoomListPage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/verify-account" element={<VerifyPage />} />
        {/* <Route path="/about-us" element={<AboutUs />} /> */}
        <Route path="/policy" element={<Policy />} />
        <Route path="/step-process" element={<StepProcess />} />
        <Route path="/booking-room" element={<BookingRoom />} />
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
        <Route path="/profile/*" element={<StudentProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default Home;
