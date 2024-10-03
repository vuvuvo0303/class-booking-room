import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages";
import { Admin, Home, Manager } from "./containers";
import useAuthStore from "./store/AuthStore";
import { useEffect } from "react";
import { checkToken } from "./lib/api/auth-api";

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  useEffect(() => {
    const fetchData = async () => {
      const userResult = await checkToken();
      setUser(userResult.data ? userResult.data : null);
    };
    fetchData();
  }, [setUser]);
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
