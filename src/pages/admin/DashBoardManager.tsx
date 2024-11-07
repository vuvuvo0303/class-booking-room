import Header from "@/components/admin/Header";
import DashboardCard from "@/components/admin/dashboard/DashboardCard";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PieChart from "@/components/ui/piechart";
import VerticalBarChart from "@/components/ui/verticalbarchart";
import { getDashBoardStaff } from "@/lib/api/dashboard-api";
import useAuthStore from "@/store/AuthStore";
import { DashboardData } from "@/types/dashboard-staff";
import { useEffect, useState } from "react";

const DashBoardManager = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null> (null);

  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDashBoardStaff();
      console.log(result);
      
      if (result.error) {
        console.log(result.error);
      } else {
        setDashboardData(result.data);
      }
    };
    fetchData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }
  const bookingDataForChart = dashboardData.totalBookinginMonth.map((value, index) => ({
    month: new Date(0, index).toLocaleString("en", { month: "short" }), 
    bookings: value,
  }));
  return (
    <div>
      <div>
        <Header
          currentPage="Dashboard"
          breadcrumbItems={[{ title: "staff", to: basePath }]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
        <DashboardCard
          title="Total Students"
          value={dashboardData.totalStudent}
          icon={
            <img
              src="https://static.thenounproject.com/png/46945-200.png"
              width={40}
              alt="Students Icon"
            />
          }
          headerStyle="bg-blue-600 bg-gradient-to-l from-blue-400"
        />
        <DashboardCard
          title="Total Reports"
          value={dashboardData.totalReport}
          icon={
            <img
              src="https://static.thenounproject.com/png/46945-200.png"
              width={40}
              alt="Reports Icon"
            />
          }
          headerStyle="bg-orange-600 bg-gradient-to-l from-orange-400"
        />
        <DashboardCard
          title="Total Rooms"
          value={dashboardData.totalRoom}
          icon={
            <img
              src="https://cdn.iconscout.com/icon/premium/png-256-thumb/maintenance-room-4340748-3596230.png?f=webp&w=256"
              width={30}
              alt="Rooms Icon"
            />
          }
          headerStyle="bg-yellow-500 bg-gradient-to-l from-yellow-400"
        />
        <DashboardCard
          title="Total Bookings"
          value={dashboardData.totalBooking}
          icon={
            <img
              src="https://static.thenounproject.com/png/46945-200.png"
              width={40}
              alt="Bookings Icon"
            />
          }
          headerStyle="bg-green-600 bg-gradient-to-l from-green-400"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-3 drop-shadow-lg">
          <Card>
            <CardContent>
              <CardTitle className="flex justify-center mt-3 text-lg">
                Number of Rooms Booked by Month
              </CardTitle>
              <VerticalBarChart data={bookingDataForChart} />
            </CardContent>
          </Card>
        </div>
        <div className="p-3 drop-shadow-lg">
          <Card>
            <CardContent className="py-2">
              <CardTitle className="flex justify-center text-lg">
                Percentage of Users by Cohort
              </CardTitle>
              <PieChart data={dashboardData.percentUserInCohort} />
            </CardContent>
          </Card>
        </div>
      </div>

      
    </div>
  );
};

export default DashBoardManager;
