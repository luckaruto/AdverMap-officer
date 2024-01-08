import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PAGE } from '../components/constants';
import { useEffect } from "react";
import MiniDrawer from "../components/appbar/toolBar";

const PrivateRoute = () => {
  const { token } = useSelector((state) => state.token);

  const navigate = useNavigate();
  // Check if the user is authenticated

  useEffect(() => {
    if (!token || token === null) {

      // If not authenticated, redirect to the login page
      navigate(PAGE.LOGIN.path, { replace: true });
    }
  }, []);

  return  (
      <div className="h-screen w-screen bg-white">
        <MiniDrawer />
      </div>
  );
};
export default PrivateRoute;
