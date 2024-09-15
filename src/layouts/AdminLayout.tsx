import { ReactNode, useState } from "react";

import LockImage from "@/assets/lock.png";
import {
  BookUser,
  Box,
  CalendarClock,
  Contact,
  DoorOpen,
  Group,
  LayoutGrid,
  MenuIcon,
  UserSearch,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/AuthStore";
type NavItemType = {
  title?: string;
  to?: string;
  icon?: ReactNode;
  type?: "divider" | "item" | null;
  isAdminOnly?: boolean;
};
const AdminLayout = ({ children }: { children: ReactNode }) => {
  const loggedUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navItems: NavItemType[] = [
    {
      title: "Dashboard",
      to: "",
      icon: <LayoutGrid />,
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
  return (
    <div className="flex h-screen">
      <div
        className={cn(
          "bg-blue-950 text-white p-5 transition-all duration-300 overflow-hidden flex flex-col",
          isCollapsed ? "w-16" : "w-1/4"
        )}
      >
        <div className="flex gap-2">
          <button onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuIcon
              className={cn("transition-transform duration-300", {
                "rotate-180": isCollapsed,
              })}
            />
          </button>
          <div
            className={cn(
              "flex gap-2 items-center transition-opacity duration-300",
              { "opacity-0": isCollapsed }
            )}
          >
            <img src={LockImage} alt="" className="w-10 h-10" />
            <div>
              <p className="font-bold text-xl text-nowrap">FU Booking Room</p>
              <p className="text-sm">Quản lí</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 flex-1">
          {navItems.map((item) => {
            if (
              !item.isAdminOnly ||
              (loggedUser && loggedUser.role == "admin")
            ) {
              if (item.type == "divider") {
                return <div className="border h-px border-white my-2" />;
              }
              return (
                <Link to={item.to!} key={item.to}>
                  <div
                    className={cn(
                      "flex gap-2 hover:bg-blue-900  active:bg-blue-800 transition-all duration-300",
                      {
                        "px-3 py-2": !isCollapsed,
                        "my-2 rounded-md": isCollapsed,
                      }
                    )}
                  >
                    <div>{item.icon}</div>
                    <p
                      className={cn(
                        "transition-opacity duration-300 text-nowrap",
                        {
                          "opacity-0": isCollapsed,
                        }
                      )}
                    >
                      {item.title}
                    </p>
                  </div>
                </Link>
              );
            }
          })}
        </div>
        <div>
          <button
            className={cn(
              "flex gap-2 hover:bg-blue-900 active:bg-blue-800 transition-all duration-300 w-full",
              {
                "px-3 py-2": !isCollapsed,
                "my-2 rounded-md": isCollapsed,
              }
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
              className={cn("transition-opacity duration-300 text-nowrap", {
                "opacity-0": isCollapsed,
              })}
            >
              Đăng xuất
            </p>
          </button>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default AdminLayout;
