const Rules = () => {
  return (
    <div className="min-h-screen  py-32">
      <div className="container mx-auto px-4  ">
        <div className="bg-white shadow-lg shadow-orange-500 rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Booking Room Rules</h1>
          <p className="text-gray-600 mb-6 text-center">
            Welcome to the FPT University Room Booking System. Below are the rules you must follow when using the Face
            ID system to book rooms. Please read them carefully to avoid any inconvenience.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">1. Proper Identification</h2>
              <p className="text-gray-600">
                Ensure that you use Face ID only for your own account. Sharing Face ID access or allowing others to book
                using your credentials is strictly prohibited.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">2. Room Booking Time Limits</h2>
              <p className="text-gray-600">
                Rooms can be booked for a maximum of 2 hours. If you need to extend your booking, please check for room
                availability before your time expires.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">3. No Misuse of Rooms</h2>
              <p className="text-gray-600">
                Any misuse of rooms, such as leaving without cancelling your booking or allowing unauthorized access,
                will lead to penalties, including the suspension of booking privileges.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">4. Cancellation Policy</h2>
              <p className="text-gray-600">
                Cancellations must be made at least 30 minutes before the booking time. Frequent no-shows or late
                cancellations will result in restricted access to the booking system.
              </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">5. Face ID Privacy</h2>
              <p className="text-gray-600">
                Face ID data is securely handled and never shared with any third parties. We respect your privacy and
                ensure that your facial data is used solely for authentication purposes.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300">
              I Agree to the Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
