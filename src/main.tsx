import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// bg-rose-500 bg-pink-500 bg-fuchsia-500 bg-purple-500 bg-violet-500 bg-indigo-500 bg-blue-500 bg-sky-500 bg-cyan-500
// bg-teal-500 bg-emerald-500 bg-green-500 bg-lime-500 bg-yellow-500 bg-amber-500 bg-orange-500 bg-red-500 bg-gray-500
// hover:bg-rose-300 hover:bg-pink-300 hover:bg-fuchsia-300 hover:bg-purple-300 hover:bg-violet-300 hover:bg-indigo-300 hover:bg-blue-300 hover:bg-sky-300 hover:bg-cyan-300
// hover:bg-teal-300 hover:bg-emerald-300 hover:bg-green-300 hover:bg-lime-300 hover:bg-yellow-300 hover:bg-amber-300 hover:bg-orange-300 hover:bg-red-300 hover:bg-gray-300
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}> */}
      <App />
      <ToastContainer />
      {/* </GoogleOAuthProvider> */}
    </BrowserRouter>
  </StrictMode>
);
