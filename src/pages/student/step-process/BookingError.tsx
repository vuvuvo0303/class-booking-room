import { useNavigate } from "react-router-dom";

const BookingError = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h1 className="text-2xl font-bold text-red-600">Booking Disrupted</h1>
        <p className="mt-4 text-gray-600">
          We're sorry, but the booking process has been disrupted. Please try
          again.
        </p>
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => navigate("/booking-room")}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default BookingError;
