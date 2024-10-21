import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Route } from "react-router-dom";
const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex-col flex">
      <Route>
        
      </Route>
      <Navbar />
      <div className="flex-1 pt-20">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
