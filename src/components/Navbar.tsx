import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between px-6 py-5 items-center  z-20 w-full fixed bg-white/20 backdrop-blur-md">
        <div>
          <span className="text-2xl">FPT Booking room</span>
        </div>
        <div className="flex gap-10">
          <Link to="">
            <span>About US</span>
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
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Navbar;
