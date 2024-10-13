import MainLayout from "@/layouts/MainLayout";
import { HomePage, RoomDetailPage, RoomListPage } from "@/pages";
import { Route, Routes } from "react-router-dom";
import { StudentProfile } from ".";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/components/NotFound";

const Home = () => {
  return (
    <MainLayout>
        <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room" element={<RoomListPage />} />
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
        <Route path="/profile/*" element={<StudentProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </MainLayout>
  );
};

export default Home;
