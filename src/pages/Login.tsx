import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { mockLogin } from "@/lib/api/mock-auth-api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  var loggedUser = localStorage.getItem("loggedUser");
  const mockLoginAsManager = async () => {
    const { data } = await mockLogin("manager");
    localStorage.setItem("loggedUser", JSON.stringify(data));
    navigate("/manager");
  };
  const mockLoginAsAdmin = async () => {
    const { data } = await mockLogin("admin");
    localStorage.setItem("loggedUser", JSON.stringify(data));
    navigate("/admin");
  };

  return (
    <MaxWidthWrapper className="flex gap-2">
      <Link to={"/"}>
        <Button>Home</Button>
      </Link>
      {!loggedUser && (
        <>
          <Button onClick={mockLoginAsManager}>Mock Login as Manager</Button>
          <Button onClick={mockLoginAsAdmin}>Mock Login as Admin</Button>
        </>
      )}
      {loggedUser && (
        <>
          <Button
            onClick={() => {
              localStorage.removeItem("loggedUser");
            }}
          >
            Logout
          </Button>
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default Login;
