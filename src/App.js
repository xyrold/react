import './App.css';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import LoginPage from './pages/public/Login';

import MainLayout from './pages/private/MainLayout';
import ChatAiPage from './pages/private/ChatAi';
import DashboardPage from './pages/private/Dashboard';

//loading ui
import { LoadingProvider } from './components/loading/LoadingContext';
import LoadingOverlay  from './components/loading/LoadingOverlay';

//app variables
window.API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
window.API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  return (
    <LoadingProvider>
      <LoadingOverlay />
    <BrowserRouter>
      <Routes>
        <Route element={ <CheckAuth />}>
          <Route path="/" element={ <LoginPage /> }></Route>
          <Route path="/login" element={ <LoginPage /> }></Route>
        </Route>
        <Route element={ <ProtectedRoute />}>
          <Route element={ <MainLayout />}>
            <Route path="/chatai" element={ <ChatAiPage /> }></Route>
            <Route path="/dashboard" element={ <DashboardPage /> }></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </LoadingProvider>
  );
}

const ProtectedRoute = () => {
  // Check if the "auth" cookie exists
  const isAuthenticated = Cookies.get("auth");

  return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace />;
};
const CheckAuth = () => {
  // Check if the "auth" cookie exists
  const isAuthenticated = Cookies.get("auth");

  return !isAuthenticated ? <Outlet/> : <Navigate to="/dashboard" replace />;
};

export default App;
