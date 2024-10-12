
const Policy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Privacy Policy - Face ID Booking Room
          </h1>
          <p className="text-gray-600 mb-4">
            Welcome to FPT University’s Booking Room System. We value your
            privacy and are committed to protecting the personal information you
            share with us. This Privacy Policy explains how we use Face ID
            technology to ensure a smooth and secure booking experience.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
            1. Data Collection
          </h2>
          <p className="text-gray-600 mb-4">
            When you use Face ID to book rooms at FPT University, we collect
            facial data to authenticate your identity. This data is securely
            encrypted and stored temporarily during the booking session. No
            facial data is retained after you have successfully booked a room.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
            2. Usage of Data
          </h2>
          <p className="text-gray-600 mb-4">
            Your facial data is used solely for authentication purposes. We do
            not share this data with any third parties. The data helps verify
            your identity to ensure that only authorized users can book rooms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
            3. Security Measures
          </h2>
          <p className="text-gray-600 mb-4">
            We implement robust security measures, including encryption and
            secure servers, to protect your personal and facial data. In
            addition, all facial recognition operations happen locally on your
            device to ensure maximum security.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
            4. User Rights
          </h2>
          <p className="text-gray-600 mb-4">
            As a user, you have the right to opt-out of using Face ID for
            booking rooms. Alternative methods of booking will be made available
            to you. Please reach out to the FPT University IT support for more
            details.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">
            5. Contact Information
          </h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or concerns regarding this policy, please
            contact us at <span className="text-blue-600">support@fpt.edu.vn</span>.
          </p>

          <div className="mt-8 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
              Agree and Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
