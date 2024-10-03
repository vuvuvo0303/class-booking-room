import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
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
