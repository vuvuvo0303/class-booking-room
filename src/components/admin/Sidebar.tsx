import {
  BookUser,
  Box,
  Contact,
  DoorOpen,
  Group,
  Layers3,
  LayoutGrid,
  MenuIcon,
  MessageSquareWarning,
  ReceiptText,
  SquareChartGantt,
  UserSearch,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/AuthStore";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

type NavItemType = {
  title?: string;
  to?: string;
  icon?: ReactNode;
  type?: "divider" | "item" | null;
  isAdminOnly?: boolean;
};
import { useLocation } from "react-router-dom";
import { ReactNode, useState } from "react";
const navItems: NavItemType[] = [
  {
    title: "Dashboard",
    to: "dashboard",
    icon: <LayoutGrid />,
  },
  {
    type: "divider",
  },
  {
    title: "Manage Account",
    to: "user",
    icon: <UserSearch />,
  },
  {
    title: "Account Request",
    to: "account-request",
    icon: <UserSearch />,
    isAdminOnly: true,

  },
  {
    title: "Student's Request",
    to: "student",
    icon: <BookUser />,
    isAdminOnly: true,
  },
  {
    title: "Staff's Request",
    to: "staff",
    icon: <Contact />,
    isAdminOnly: true,
  },
  {
    type: "divider",
  },
  {
    title: "Rooms",
    to: "rooms",
    icon: <Box />,
  },
  {
    title: "Room Types",
    to: "room-types",
    icon: <Layers3 />,
  },
  {
    title: "Bookings History",
    to: "booking",
    icon: <ReceiptText />,
  },
  {
    title: "Bookings Request",
    to: "group",
    icon: <Group />,
  },
  {
    type: "divider",
  },

  {
    title: "Report",
    to: "report",
    icon: <MessageSquareWarning />,
  },
  {
    title: "Cohort",
    to: "cohort",
    icon: <Users />,
  },
  {
    title: "Department",
    to: "department",
    icon: <SquareChartGantt />,
  },
];
const Sidebar = () => {
  const loggedUser = useAuthStore((state) => state.user);

  const location = useLocation();
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className={cn(
        "transition-all duration-300 overflow-auto flex flex-col p-3 shadow-lg bg-orange-500 bg-gradient-to-t from-orange-600 text-white"
      )}
    >
      <div className="flex justify-center">
        <div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-orange-500  active:bg-orange-400 py-2 px-3 rounded-md transition-all"
          >
            <MenuIcon
              className={cn("transition-transform duration-300", {
                "rotate-180": isCollapsed,
              })}
            />
          </button>
        </div>
        <div
          className={cn(
            "flex gap-2 items-center transition-all duration-300 overflow-hidden",
            isCollapsed ? "w-0 ms-0" : "w-[200px] ms-2"
          )}
        >
          {/* <img src={LockImage} alt="" className="w-10 h-10" /> */}
          <div>
            <p className="font-bold text-xl text-nowrap">FU Booking Room</p>
            <p className="text-sm">Quản lí</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5 flex-1 gap-1">
        {navItems.map((item, index) => {
          if (!item.isAdminOnly || (loggedUser && loggedUser.role == "admin")) {
            if (item.type == "divider") {
              return <div key={index} className="border h-px my-2" />;
            }
            return (
              <Link to={item.to!} key={item.to}>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div
                      className={cn(
                        "flex hover:bg-orange-400  active:bg-orange-300 justify-center",
                        isCollapsed ? "rounded-md p-2" : "px-3 py-2",
                        {
                          "bg-white/80 bg-gradient-to-r from-white/100 hover:bg-orange-400 text-black":
                            location.pathname.includes(item.to!),
                        }
                      )}
                    >
                      <div>{item.icon}</div>
                      <p
                        className={cn(
                          "text-nowrap overflow-hidden transition-all duration-300",
                          isCollapsed ? "w-0 ms-0" : "w-[200px] ms-2"
                        )}
                      >
                        {item.title}
                      </p>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className={cn("border-none drop-shadow-lg font-semibold", !isCollapsed && "hidden")}
                  >
                    {item.title}
                  </HoverCardContent>
                </HoverCard>
              </Link>
            );
          }
        })}
      </div>
      <button
        className={cn(
          "flex hover:bg-orange-400 active:bg-orange-300 transition-all duration-300 justify-center mt-5 text-white",
          isCollapsed ? "rounded-md p-2" : "px-3 py-2"
        )}
        onClick={() => {
          localStorage.removeItem("accessToken");
          navigate("/login");
          setUser(null);
        }}
      >
        <div>
          <DoorOpen />
        </div>
        <p
          className={cn(
            "transition-all duration-300 text-nowrap overflow-hidden text-start",
            isCollapsed ? "w-0 ms-0" : "w-[200px] ms-2"
          )}
        >
          Log Out
        </p>
      </button>
    </div>
  );
};

export default Sidebar;
