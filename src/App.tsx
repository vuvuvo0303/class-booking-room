import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages";
import { Admin, Home } from "./containers";

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
