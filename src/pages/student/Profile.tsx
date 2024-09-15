import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <Link to={"/profile/booking"}>
        <Button>Booking History</Button>
      </Link>
    </div>
  );
};

export default Profile;
