import {
  BookUser,
  Box,
  CalendarClock,
  Contact,
  DoorOpen,
  Group,
  LayoutGrid,
  MenuIcon,
  ReceiptText,
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
    icon: <LayoutGrid  />,
  },
  {
    type: "divider",
  },
  {
    title: "Tài khoản",
    to: "user",
    icon: <UserSearch />,
  },
  {
    title: "Sinh viên",
    to: "student",
    icon: <BookUser />,
    isAdminOnly: true,
  },
  {
    title: "Nhân viên quản lí",
    to: "staff",
    icon: <Contact />,
    isAdminOnly: true,
  },
  {
    type: "divider",
  },
  {
    title: "Phòng",
    to: "room",
    icon: <Box />,
  },
  {
    title: "Đặt phòng",
    to: "booking",
    icon: <ReceiptText />,
  },
  {
    type: "divider",
  },
  {
    title: "Group",
    to: "group",
    icon: <Group />,
  },
  {
    title: "Team",
    to: "team",
    icon: <Users />,
  },
  {
    title: "Slot",
    to: "slot",
    icon: <CalendarClock />,
  },
];
const Sidebar = () => {
  const loggedUser = useAuthStore((state) => state.user);

  const location = useLocation();
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className={cn("transition-all duration-300 overflow-auto flex flex-col p-3 shadow-lg")}>
      <div className="flex justify-center text-[#604CC3]">
        <div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-orange-200  active:bg-orange-100 py-2 px-3 rounded-md transition-all"
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
              return <div key={index} className="border h-px border-[#604CC3] my-2" />;
            }
            return (
              <Link to={item.to!} key={item.to}>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div
                      className={cn(
                        "flex hover:bg-orange-200  active:bg-orange-100 transition-colors duration-300 justify-center text-[#604CC3]",
                        isCollapsed ? "rounded-md p-2" : "px-3 py-2",
                        {
                          "bg-[#FF6600] hover:bg-orange-400 text-[#F5F5F5]": location.pathname.includes(item.to!),
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
                    className={cn("text-[#604CC3] border-none drop-shadow-lg font-semibold", !isCollapsed && "hidden")}
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
          "flex hover:bg-orange-200 active:bg-orange-100 transition-all duration-300 justify-center mt-5 text-[#604CC3]",
          isCollapsed ? "rounded-md p-2" : "px-3 py-2"
        )}
        onClick={() => {
          localStorage.removeItem("loggedUser");
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
          Đăng xuất
        </p>
      </button>
    </div>
  );
};

export default Sidebar;
