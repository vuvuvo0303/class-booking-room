import Header from "@/components/admin/Header";
import BookingContent from "@/components/admin/dashboard/BookingContent";
import DashboardCard from "@/components/admin/dashboard/DashboardCard";
import ReportContent from "@/components/admin/dashboard/ReportContent";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PieChart from "@/components/ui/piechart";
import VerticalBarChart from "@/components/ui/verticalbarchart";
import useAuthStore from "@/store/AuthStore";

const Dashboard = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;
  const data = [
    { month: "January", bookings: 50 },
    { month: "February", bookings: 30 },
    { month: "March", bookings: 70 },
    { month: "April", bookings: 90 },
    { month: "May", bookings: 110 },
    { month: "June", bookings: 85 },
    { month: "July", bookings: 75 },
    { month: "August", bookings: 95 },
    { month: "September", bookings: 120 },
    { month: "October", bookings: 130 },
    { month: "November", bookings: 100 },
    { month: "December", bookings: 140 },
  ];

  return (
    <div>
      <div>
        <Header
          currentPage="Dashboard"
          breadcrumbItems={[{ title: "Admin", to: basePath }]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
        <DashboardCard
          title="Emtpy Rooms"
          value={15}
          icon={
            <img
              src="https://static.thenounproject.com/png/46945-200.png"
              width={40}
            />
          }
          headerStyle="bg-blue-600"
        />
        <DashboardCard
          title="Booked Rooms"
          value={15}
          icon={
            <img
              src="https://static.thenounproject.com/png/46945-200.png"
              width={40}
            />
          }
          headerStyle="bg-orange-600"
        />
        <DashboardCard
          title="Maintained rooms"
          value={15}
          icon={
            <img
              src="https://cdn.iconscout.com/icon/premium/png-256-thumb/maintenance-room-4340748-3596230.png?f=webp&w=256"
              width={30}
            />
          }
          headerStyle="bg-yellow-500"
        />
        <DashboardCard
          title="Total Rooms"
          value={45}
          icon={
            <img
              src="https://static.thenounproject.com/png/46945-200.png"
              width={40}
            />
          }
          headerStyle="bg-green-600"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-3 drop-shadow-lg">
          <Card className="">
            <CardContent className="">
              <CardTitle className="flex justify-center mt-3 text-lg">
                Number of Rooms booked by Month
              </CardTitle>
              <VerticalBarChart data={data} />
            </CardContent>
          </Card>
        </div>
        <div className="p-3 drop-shadow-lg">
          <Card className="">
            <CardContent className="py-2">
              <CardTitle className="flex justify-center text-lg">
                Number of rooms booked by Cohort
              </CardTitle>
              <div className="">
                <PieChart />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5">
        <div>
          <div className="pl-3">
            <span className="text-2xl font-bold">
              Recent Report in the System
            </span>
          </div>
          <div className="p-3">
            <Card className="overflow-hidden">
              <ReportContent
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias molestiae reprehenderit voluptates doloribus
              laboriosam necessitatibus hic optio rerum voluptatibus
              perferendis ratione, nam delectus iusto ducimus fugit.
              Labore saepe sit amet!"
                fullName="Mai Van Quoc Tinh"
                profileImageURL="https://github.com/shadcn.png"
                reportDate={new Date()}
                status="rejected"
              />
              <hr className="w-full border-stone-300" />
              <ReportContent
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias molestiae reprehenderit voluptates doloribus
              laboriosam necessitatibus hic optio rerum voluptatibus
              perferendis ratione, nam delectus iusto ducimus fugit.
              Labore saepe sit amet!"
                fullName="Mai Van Quoc Tinh"
                profileImageURL="https://github.com/shadcn.png"
                reportDate={new Date()}
                status="not_processed_yet"
              />
              <ReportContent
                content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias molestiae reprehenderit voluptates doloribus
              laboriosam necessitatibus hic optio rerum voluptatibus
              perferendis ratione, nam delectus iusto ducimus fugit.
              Labore saepe sit amet!"
                fullName="Mai Van Quoc Tinh"
                profileImageURL="https://github.com/shadcn.png"
                reportDate={new Date()}
                status="processed"
              />
            </Card>
          </div>
        </div>
        <div>
          <div>
            <span className="text-2xl font-bold px-4">
              Recent Bookings in the Sytem
            </span>
          </div>
          <div className="p-3">
            <Card>
              <BookingContent
                fullName="Mai Van Quoc Tinh"
                profileImageURL="https://github.com/shadcn.png"
                activity="Self Study"
                bookingDate={new Date()}
                department="IT"
                room="611"
                roomType="Self-Study room"
                slot="1 (07:00AM - 09:15AM)"
                status="accepted"
              />
              <hr className="w-full border-stone-300  " />
              <BookingContent
                fullName="Mai Van Quoc Tinh"
                profileImageURL="https://github.com/shadcn.png"
                activity="Self Study"
                bookingDate={new Date()}
                department="IT"
                room="611"
                roomType="Self-Study room"
                slot="1 (07:00AM - 09:15AM)"
                status="pending"
              />
              <hr className="w-full border-stone-300  " />
              <BookingContent
                fullName="Mai Van Quoc Tinh"
                profileImageURL="https://github.com/shadcn.png"
                activity="Self Study"
                bookingDate={new Date()}
                department="IT"
                room="611"
                roomType="Self-Study room"
                slot="1 (07:00AM - 09:15AM)"
                status="rejected"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
