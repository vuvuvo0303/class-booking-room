import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { mockLogin } from "@/lib/api/mock-auth-api";
import useAuthStore from "@/store/AuthStore";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const loggedUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const mockLoginAsManager = async () => {
    const { data } = await mockLogin("manager");
    localStorage.setItem("loggedUser", JSON.stringify(data));
    setUser(data);
    navigate("/manager");
  };
  const mockLoginAsAdmin = async () => {
    const { data } = await mockLogin("admin");
    localStorage.setItem("loggedUser", JSON.stringify(data));
    setUser(data);
    navigate("/admin");
  };
  const logout = () => {
    localStorage.removeItem("loggedUser");
    window.location.reload();
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
          <Button onClick={logout}>Logout</Button>
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default Login;
