import MainLayout from "@/layouts/MainLayout";
import { HomePage, NewsPage, RoomDetailPage, RoomListPage } from "@/pages";
import { Route, Routes } from "react-router-dom";
import { StudentProfile } from ".";

const Home = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room" element={<RoomListPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/room/:roomId" element={<RoomDetailPage />} />
        <Route path="/profile/*" element={<StudentProfile />} />
      </Routes>
    </MainLayout>
  );
};

export default Home;
