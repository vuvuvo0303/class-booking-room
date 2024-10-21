import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages";
import { Admin, Home, Manager } from "./containers";
import useAuthStore from "./store/AuthStore";
import { useEffect, useState } from "react";
import { checkToken } from "./lib/api/auth-api";
import Loader from "./components/Loader";
import { toast } from "react-toastify";
import LoginAdmin from "./pages/admin/LoginAdmin";
import FillUserInfo from "./pages/student/FillUserInfo";

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchData = async () => {
      setIsLoading(true);
      const userResult = await checkToken();
      if (userResult.error) {
        toast.error(userResult.error, {
          toastId: 'tokenError',
      });
        localStorage.removeItem("accessToken");
      } else {
        setUser(userResult.data ? userResult.data : null);
      }
      setIsLoading(false);
    };
    if (accessToken) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [setUser]);
  if (isLoading)
    return (
      <div className="h-screen">
        <Loader text="Loading" />
      </div>
    );
  return (
    <Routes>
      <Route path="/login/admin" element={<LoginAdmin />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/manager/*" element={<Manager />} />
      <Route path="/*" element={<Home />} />
      <Route path="/fill-info" element={<FillUserInfo />} />
    </Routes>
  );
}

export default App;
