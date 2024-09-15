import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}> */}
      <App />
      {/* </GoogleOAuthProvider> */}
    </BrowserRouter>
  </StrictMode>
);
