import { Route, Routes } from "react-router-dom";
import { StudentBookingHistoryPage, StudentProfilePage, StudentReportHistoryPage } from "@/pages";
import StudentProfileLayout from "@/layouts/StudentProfileLayout";
import BookingHistory from "@/pages/student/BookingHistory";
import ReportHistory from "@/pages/student/ReportHistory";
const StudentProfile = () => {
  return (
    <StudentProfileLayout>
      <Routes>
        <Route path="/" element={<StudentProfilePage />} />
        <Route path="/booking" element={<StudentBookingHistoryPage />} />
        <Route path="/booking" element={<StudentBookingHistoryPage />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/report-history" element={<ReportHistory />} />

        <Route path="/report" element={<StudentReportHistoryPage />} />
      </Routes>
    </StudentProfileLayout>
  );
};

export default StudentProfile;
