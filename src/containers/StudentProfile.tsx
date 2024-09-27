import { Route, Routes } from "react-router-dom";
import { StudentBookingHistoryPage, StudentProfilePage, StudentReportHistoryPage } from "@/pages";
import StudentProfileLayout from "@/layouts/StudentProfileLayout";
const StudentProfile = () => {
  return (
    <StudentProfileLayout>
      <Routes>
        <Route path="/" element={<StudentProfilePage />} />
        <Route path="/booking" element={<StudentBookingHistoryPage />} />
        <Route path="/report" element={<StudentReportHistoryPage />} />
      </Routes>
    </StudentProfileLayout>
  );
};

export default StudentProfile;
