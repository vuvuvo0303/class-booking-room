import success from "../../../assets/success.json"; // Thay đường dẫn đến file Lottie animation
import Lottie from "lottie-react";

const Done = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center py-36">
        <Lottie animationData={success} loop={false} className="w-60 h-60 m-0" />

        <span className="text-4xl h-12 font-semibold bg-gradient-to-r from-green-500 to-green-400 bg-clip-text text-transparent">
          Booking Successfully!!!
        </span>
      </div>
    </div>
  );
};

export default Done;
