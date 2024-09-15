import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Room = () => {
  return (
    <div className="flex gap-2">
      <Link to={"login"}>
        <Button>Login</Button>
      </Link>
      <Link to={"/room/1"}>
        <Button>Room Detail</Button>
      </Link>
      <Link to={"/profile"}>
        <Button>Profile</Button>
      </Link>
      <Link to={"/admin/"}>
        <Button>Admin Dashboard</Button>
      </Link>
    </div>
  );
};

export default Room;
