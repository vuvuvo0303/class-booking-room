import TestAllFace from "@/pages/Test/TestAllFace";
import TestBooking from "@/pages/Test/TestBooking";
import { Route, Routes } from "react-router-dom";

const Test = () => {
  return (
    <div>
      <Routes>
        <Route path="/recognize" element={<TestAllFace />} />
        <Route path="/recognize-booking" element={<TestBooking />} />
      </Routes>
    </div>
  );
};

export default Test;
