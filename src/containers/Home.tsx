import MainLayout from "@/layouts/MainLayout";
import { RoomDetailPage, RoomListPage } from "@/pages";
import { Route, Routes } from "react-router-dom";
import { StudentProfile } from ".";

const Home = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<RoomListPage />} />
        <Route path="/room" element={<RoomListPage />} />
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
        <Route path="/profile/*" element={<StudentProfile />} />
      </Routes>
    </MainLayout>
  );
};

export default Home;
