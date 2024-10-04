import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  return (
    <div className=" px-6 py-4 z-20 w-full h-auto fixed bg-white/20 backdrop-blur-md">
      <MaxWidthWrapper className="flex justify-between items-center">
        <div className="animate-bounce">
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
          <Button>Login</Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
