import { Route, Routes } from "react-router-dom";
import { StudentBookingHistoryPage, StudentProfilePage } from "@/pages";
import StudentProfileLayout from "@/layouts/StudentProfileLayout";
const StudentProfile = () => {
  return (
    <StudentProfileLayout>
      <Routes>
        <Route path="/" element={<StudentProfilePage />} />
        <Route path="/booking" element={<StudentBookingHistoryPage />} />
      </Routes>
    </StudentProfileLayout>
  );
};

export default StudentProfile;
