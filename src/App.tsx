import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages";
import { Admin, Home, Manager } from "./containers";
import useAuthStore from "./store/AuthStore";
import { useEffect, useState } from "react";
import { checkToken } from "./lib/api/auth-api";
import Loader from "./components/Loader";

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchData = async () => {
      setIsLoading(true);
      const userResult = await checkToken();
      setUser(userResult.data ? userResult.data : null);
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
        <Loader text="Loading"/>
      </div>
    );
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/manager/*" element={<Manager />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
