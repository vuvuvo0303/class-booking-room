import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <Link to={"/admin/"}>
      <Button>Dashboard</Button>
    </Link>
  );
};

export default User;
