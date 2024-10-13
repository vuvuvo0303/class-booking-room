import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useAuthStore from "@/store/AuthStore";
import { Avatar, Dropdown, MenuProps } from "antd";

const Navbar = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: loggedUser && (
        <div className="flex gap-5 items-center">
          <Avatar size={40} src={loggedUser.profileImageURL} />
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold">{loggedUser.fullName}</span>
            <span className="text-xs">{loggedUser.email}</span>
          </div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <Link to="/profile/user-profile" className="py-36 text-lg text-gray-700">
          User Profile
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="/profile/booking-history" className="text-lg text-gray-700">
          Booking History
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link to="/profile/report-history" className="text-lg text-gray-700">
          Report History
        </Link>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "5",
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/");
            setUser(null);
          }}
          className="text-lg text-red-500 cursor-pointer"
        >
          Log out
        </span>
      ),
    },
  ];

  return (
    <div className="flex justify-between px-6 py-2 items-center z-20 w-full fixed bg-white/20 backdrop-blur-md">
      <div>
        <span>
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg"
              width={150}
              alt="FPT University Logo"
            />
          </Link>
        </span>
      </div>
      <div className="flex gap-10">
        <Link to="/about-us">
          <span>About Us</span>
        </Link>
        <Link to="/policy">
          <span>Policy</span>
        </Link>
        <Link to="/booking-room">
          <span>Booking Room</span>
        </Link>
        <Link to="/rules">
          <span>Rules</span>
        </Link>
      </div>
      <div className="flex gap-6 items-center">
        {!loggedUser ? (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        ) : (
          <Dropdown trigger={["click"]} menu={{ items }}>
            <Avatar size={50} src={loggedUser.profileImageURL} className="hover:cursor-pointer" />
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Navbar;
