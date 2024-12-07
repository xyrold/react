import React, { createContext} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import EmployeesList from "../../components/dashboard/UserList";
import NavigationBar from "../../components/Navbar";
import { useLoading }  from '../../components/loading/LoadingContext';
import { Toaster, toast } from 'sonner';

export const DashContext = createContext(null);

const Dashboard = () => {


  const navigate = useNavigate();
  // const { setIsLoading, isLoading  } = useLoading();
  // Retrieve and parse the cookie
  const user = JSON.parse(Cookies.get("auth") || "{}");

  const handleLogout = () => {
    // Remove the user cookie
    Cookies.remove("auth");
    // localStorage.removeItem('authToken');
    localStorage.clear();
    navigate("/login");
  };

  return (
    <DashContext.Provider value={{ user, handleLogout, useLoading }}>
      <NavigationBar />
      <EmployeesList /> 
      <Toaster position="top-right" />
      <div className="d-flex justify-content-center">
        <button onClick={() => toast.success('My first toast')}>Sample Alert</button>
      </div>
    </DashContext.Provider>

  );
};

export default Dashboard;
