import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <MaxWidthWrapper>
      <Link to={"/"}>
        <Button>Home</Button>
      </Link>
      <Link to={"/manager"}>
        <Button>Mock Login as Manager</Button>
      </Link>
      <Link to={"/admin"}>
        <Button>Mock Login as Admin</Button>
      </Link>
    </MaxWidthWrapper>
  );
};

export default Login;
