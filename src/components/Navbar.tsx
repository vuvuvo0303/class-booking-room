import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between px-6 py-5 items-center  z-20 w-full fixed bg-white/20 backdrop-blur-md">
        <div>
          <span className="">
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg"
              width={150}
            />
          </span>
        </div>
        <div className="flex gap-10">
          <Link to="">
            <span className="">About US</span>
          </Link>
          <Link to="">
            <span>Policy</span>
          </Link>
          <Link to="">
            <span>Booking Room</span>
          </Link>
          <Link to="">
            <span>Rules</span>
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <HoverCard>
            <HoverCardTrigger>
              <Avatar className="hover:cursor-pointer">
                <AvatarImage  src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-48 p-4 bg-white shadow-lg rounded-md transition-all duration-150 ease-in-out">
              <div className="flex flex-col gap-2 ">
                <Link to="/booking-history"  className="text-sm font-semibold text-gray-700">Booking History</Link>
                <span className="text-sm font-semibold text-red-500 cursor-pointer">Log out</span>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </>
  );
};

export default Navbar;
