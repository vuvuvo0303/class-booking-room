import MainLayout from "@/layouts/MainLayout";
import { HomePage, RoomDetailPage, RoomListPage } from "@/pages";
import { Route, Routes } from "react-router-dom";
import { StudentProfile } from ".";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutUs from "@/pages/student/AboutUs";
import Policy from "@/pages/student/Policy";
import Rules from "@/pages/student/Rules";
import BookingRoom from "@/pages/student/BookingRoom";

const Home = () => {
  return (
    <MainLayout>
        <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room" element={<RoomListPage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about-us" element={<AboutUs />} />
        {/* <Route path="/about-us" element={<AboutUs />} /> */}
        <Route path="/policy" element={<Policy />} />
        <Route path="/booking-room" element={<BookingRoom/>} />
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
        <Route path="/profile/*" element={<StudentProfile />} />
      </Routes>
      <Footer/>

    </MainLayout>
  );
};

export default Home;
