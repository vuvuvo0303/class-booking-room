import MainLayout from "@/layouts/MainLayout";
import { HomePage, RoomDetailPage, RoomListPage } from "@/pages";
import { Route, Routes } from "react-router-dom";
import { StudentProfile } from ".";
import NotFound from "@/components/NotFound";
import AboutUs from "@/pages/student/AboutUs";
import Policy from "@/pages/student/Policy";
import Rules from "@/pages/student/Rules";
import BookingRoom from "@/pages/student/BookingRoom";
import StepProcess from "@/pages/student/step-process";
import FillUserInfo from "@/pages/student/FillUserInfo";

const Home = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room" element={<RoomListPage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about-us" element={<AboutUs />} />
        {/* <Route path="/about-us" element={<AboutUs />} /> */}
        <Route path="/policy" element={<Policy />} />
        <Route path="/step-process" element={<StepProcess />} />
        <Route path="/booking-room" element={<BookingRoom/>} />
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
        <Route path="/fill-user-info" element={<FillUserInfo />} />
        <Route path="/profile/*" element={<StudentProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default Home;
