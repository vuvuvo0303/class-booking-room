import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Link to={"/admin/user"}>
      <Button>Manage user</Button>
    </Link>
  );
};

export default Dashboard;
