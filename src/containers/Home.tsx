import MainLayout from "@/layouts/MainLayout";
import { HomePage, RoomDetailPage, RoomListPage } from "@/pages";
import { Route, Routes } from "react-router-dom";
import { StudentProfile } from ".";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutUs from "@/pages/student/AboutUs";
import BookingHistory from "@/pages/student/BookingHistory";
import Policy from "@/pages/student/Policy";

const Home = () => {
  return (
    <MainLayout>
        <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room" element={<RoomListPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
        <Route path="/profile/*" element={<StudentProfile />} />
      </Routes>
      <Footer/>

    </MainLayout>
  );
};

export default Home;
