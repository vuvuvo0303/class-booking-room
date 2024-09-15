import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <MaxWidthWrapper>
      <Link to={"/"}>
        <Button>Home</Button>
      </Link>
    </MaxWidthWrapper>
  );
};

export default Login;
