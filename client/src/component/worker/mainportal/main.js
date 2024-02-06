import React from 'react'
import Navbar from "./navbar";
import StaticPage from "./frontpage";
import { useAuthContext } from '../../../context/authContext';


const MainHomePortal = () => {
  const {isLoggedIn}=useAuthContext();

    // Check if user is not logged in, then redirect to login page
    if (!isLoggedIn) {
      window.location.href = '/login';
      return null; // Prevent rendering anything else
    }
  
  return (
    <div>
      <Navbar/>
      <StaticPage />
    </div>
  );
};

export default MainHomePortal;
