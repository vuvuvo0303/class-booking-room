import Header from "@/components/admin/Header";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChart from "@/components/ui/piechart";
import VerticalBarChart from "@/components/ui/verticalbarchart";
import { cn } from "@/lib/utils";
import useAuthStore from "@/store/AuthStore";
import { ReactNode, useEffect, useState } from "react";

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
      <div className="grid grid-cols-4 gap-3 p-3">
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
          title="Total Rooms"
          value={15}
          icon={
            <img
              src="https://static.thenounproject.com/png/46945-200.png"
              width={40}
            />
          }
          headerStyle="bg-green-600"
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
      </div>
      <div className="grid grid-cols-2">
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
      <div className="flex">
        <div className="w-1/2">
          <div className="pl-3">
            <span className="text-xl font-bold">
              Recent Report in the System
            </span>
          </div>

          <div className="p-3">
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 pt-3">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <span>Ngo Gia Huy</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-green-600">
                      Report date :22/8/2024
                    </span>
                  </div>
                </div>
                <div></div>
                <div className="flex py-3 ">
                  <span className="w-100 break-words">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestias molestiae reprehenderit voluptates doloribus
                    laboriosam necessitatibus hic optio rerum voluptatibus
                    perferendis ratione, nam delectus iusto ducimus fugit.
                    Labore saepe sit amet!
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>

                  <span className="mb-1 text-red-500">Reject</span>
                </div>
              </CardContent>
              <hr className="w-full border-stone-300  " />
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 pt-3">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <span>Ngo Gia Huy</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-green-600">
                      Report date :22/8/2024
                    </span>
                  </div>
                </div>
                <div></div>
                <div className="flex py-3 ">
                  <span className="w-100 break-words">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestias molestiae reprehenderit voluptates doloribus
                    laboriosam necessitatibus hic optio rerum voluptatibus
                    perferendis ratione, nam delectus iusto ducimus fugit.
                    Labore saepe sit amet!
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>

                  <span className="mb-1 text-yellow-500">
                    Not processed yet
                  </span>
                </div>
              </CardContent>
              <hr className="w-full border-stone-300  " />
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 pt-3">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <span>Ngo Gia Huy</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-green-600">
                      Report date :22/8/2024
                    </span>
                  </div>
                </div>
                <div></div>
                <div className="flex py-3 ">
                  <span className="w-100 break-words">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestias molestiae reprehenderit voluptates doloribus
                    laboriosam necessitatibus hic optio rerum voluptatibus
                    perferendis ratione, nam delectus iusto ducimus fugit.
                    Labore saepe sit amet!
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                  <span className="mb-1 text-green-500">Processed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="w-1/2">
          <div>
            <span className="text-xl font-bold px-4">
              Recent Bookings in the Sytem
            </span>
          </div>
          <div className="p-3">
            <Card>
              <CardContent>
                <div className="flex items-center gap-3 pt-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <span>Ngo Gia Huy</span>
                </div>

                <div className="flex justify-between pt-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <span>Room:</span>
                      <span className="text-stone-400">611</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Room type:</span>
                      <span className="text-stone-400">Self-Study room</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Department:</span>
                      <span className="text-stone-400">IT</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <span>Activity:</span>
                      <span className="text-stone-400">Self Study</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Slot:</span>
                      <span className="text-stone-400">1(7h-9h15)</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Booking Date:</span>
                      <span className="text-stone-400">22/1/2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                  <span className="mb-1 text-green-500">
                    Booking Sucessfully
                  </span>
                </div>
              </CardContent>
              <hr className="w-full border-stone-300  " />
              <CardContent>
                <div className="flex items-center gap-3 pt-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <span>Ngo Gia Huy</span>
                </div>

                <div className="flex justify-between pt-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <span>Room:</span>
                      <span className="text-stone-400">611</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Room type:</span>
                      <span className="text-stone-400">Self-Study room</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Department:</span>
                      <span className="text-stone-400">IT</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <span>Activity:</span>
                      <span className="text-stone-400">Self Study</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Slot:</span>
                      <span className="text-stone-400">1(7h-9h15)</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Booking Date:</span>
                      <span className="text-stone-400">22/1/2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                  <span className="mb-1 text-green-500">
                    Booking Sucessfully
                  </span>
                </div>
              </CardContent>
              <hr className="w-full border-stone-300  " />
              <CardContent>
                <div className="flex items-center gap-3 pt-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <span>Ngo Gia Huy</span>
                </div>

                <div className="flex justify-between pt-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <span>Room:</span>
                      <span className="text-stone-400">611</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Room type:</span>
                      <span className="text-stone-400">Self-Study room</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Department:</span>
                      <span className="text-stone-400">IT</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <span>Activity:</span>
                      <span className="text-stone-400">Self Study</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Slot:</span>
                      <span className="text-stone-400">1(7h-9h15)</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Booking Date:</span>
                      <span className="text-stone-400">22/1/2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>

                  <span className="mb-1 text-green-500">
                    Booking Sucessfully
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  value,
  icon,
  headerStyle,
}: {
  title: string;
  value: number;
  icon: ReactNode;
  headerStyle?: string;
}) => {
  const [number, setNumber] = useState(0);
  const startNumber = 0;
  const endNumber = value;
  const duration = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
  useEffect(() => {
    const increment = (endNumber - startNumber) / (duration / 100);
    let currentNumber = startNumber;
    const interval = setInterval(() => {
      if (currentNumber >= endNumber) {
        clearInterval(interval);
        setNumber(endNumber);
      } else {
        currentNumber += increment;
        setNumber(Math.round(currentNumber));
      }
    }, 100);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [startNumber, endNumber]);
  return (
    <Card className="drop-shadow-lg relative overflow-hidden">
      <CardHeader className={cn("text-white py-5 rounded-md", headerStyle)}>
        <CardTitle className="flex justify-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="py-7">
        <div className="flex items-center gap-4 justify-center">
          <span className="text-4xl font-light">{number}</span> {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
