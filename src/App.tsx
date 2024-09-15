import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages";
import { Admin, Home, Manager } from "./containers";

function App() {
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
