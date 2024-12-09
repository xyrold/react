import React, {createContext} from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./../../components/Navbar";
import Cookies from "js-cookie";
import { Toaster } from 'sonner';

export const MainLayoutContext = createContext(null);

const MainLayout = () => {
  const user = JSON.parse(Cookies.get("auth") || "{}");

  const handleLogout = () => {
    Cookies.remove("auth");
    localStorage.clear();
    window.location.href = "/login"; // Navigate to login after logout
  };

  return (
    <MainLayoutContext.Provider value={{ user, handleLogout }}>
      <NavigationBar />
      <Toaster position="top-right" />
      <Outlet /> {/* Renders the child route components */}
    </MainLayoutContext.Provider>
  );
};

export default MainLayout;
