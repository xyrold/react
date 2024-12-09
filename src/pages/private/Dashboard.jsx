import React, { createContext} from "react";
import EmployeesList from "../../components/dashboard/UserList";
import {toast} from 'sonner';

const Dashboard = () => {
  return (
    <div>
      <EmployeesList /> 
      <div className="d-flex justify-content-center">
        <button onClick={() => toast.success('My first toast')}>Sample Alert</button>
      </div>
    </div>
  );
};

export default Dashboard;
