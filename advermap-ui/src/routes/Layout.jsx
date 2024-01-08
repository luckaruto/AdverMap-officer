import {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PAGE } from './../components/constants';

const Layout = () => {
  const { token } = useSelector((state) => state.token);

  const navigate = useNavigate();
  // Check if the user is authenticated

  useEffect(() => {
    if (!token) {
      // If not authenticated, redirect to the login page
      navigate(PAGE.LOGIN.path, { replace: true });
    }
  }, []);

  return <div className="h-screen w-screen bg-white"></div>;
};
export default Layout;
