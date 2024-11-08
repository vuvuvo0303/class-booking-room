import Header from "@/components/admin/Header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PieChart from "@/components/ui/piechart";
import VerticalBarChart from "@/components/ui/verticalbarchart";
import useAuthStore from "@/store/AuthStore";
import { useEffect, useState } from "react";
import { getDashBoardAdmin } from "@/lib/api/dashboard-api";
import { DashboardAdmin } from "@/types/dashboard-admin";
import DashboardCard from "@/components/admin/dashboard/DashboardCard";
import { User, Users, Building, Calendar } from "lucide-react";
import Loader from "@/components/Loader";

const Dashboard = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const basePath = "/" + loggedUser.role;

  const [dashboardData, setDashboardData] = useState<DashboardAdmin | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true); // Start loading
      const result = await getDashBoardAdmin();
      if (result && result.data) {
        setDashboardData(result.data);
      } else {
        console.error("Failed to fetch dashboard data", result.error);
      }
      setLoading(false); // Stop loading
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  }

  if (!dashboardData) {
    return <div>No data available</div>;
  }

  const bookingDataForChart = dashboardData.totalBookinginMonth.map((value, index) => ({
    month: new Date(0, index).toLocaleString("en", { month: "short" }),
    bookings: value,
  }));

  return (
    <div>
      <Header
        currentPage="Dashboard"
        breadcrumbItems={[{ title: "Admin", to: basePath }]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
        <DashboardCard
          title="Total Students"
          value={dashboardData.totalStudent}
          icon={<User />}
          headerStyle="bg-blue-600 bg-gradient-to-l from-blue-400"
        />
        <DashboardCard
          title="Total Managers"
          value={dashboardData.totalManager}
          icon={<Users />}
          headerStyle="bg-purple-600 bg-gradient-to-l from-purple-400"
        />
        <DashboardCard
          title="Total Rooms"
          value={dashboardData.totalRoom}
          icon={<Building />}
          headerStyle="bg-green-600 bg-gradient-to-l from-green-400"
        />
        <DashboardCard
          title="Total Bookings"
          value={dashboardData.totalBooking}
          icon={<Calendar />}
          headerStyle="bg-orange-600 bg-gradient-to-l from-orange-400"
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
                Percentage of Students by Cohort
              </CardTitle>
              <PieChart data={dashboardData.percentStudentInCohort} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
