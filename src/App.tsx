import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages";
import { Admin, Home, Manager } from "./containers";
import useAuthStore from "./store/AuthStore";
import { useEffect } from "react";

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const loggedUser = localStorage.getItem("loggedUser");
  useEffect(() => {
    setUser(loggedUser ? JSON.parse(loggedUser) : null);
  }, [loggedUser]);
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
