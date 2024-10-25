import TestAllFace from "@/pages/Test/TestAllFace";
import TestBooking from "@/pages/Test/TestBooking";
import TestRoom from "@/pages/Test/TestRoom";
import { Route, Routes } from "react-router-dom";

const Test = () => {
  return (
    <div>
      <Routes>
        <Route path="/recognize" element={<TestAllFace />} />
        <Route path="/room" element={<TestBooking />} />
        <Route path="/scan-room/:roomId" element={<TestRoom />} />
      </Routes>
    </div>
  );
};

export default Test;
