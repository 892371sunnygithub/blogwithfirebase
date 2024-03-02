import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
const Logout = () => {
  const { setUserData } = useGlobalContext();
  const logoutHandler = () => {
    setUserData(null);
    localStorage.removeItem("user");
  };
  useEffect(() => {
    logoutHandler();
  }, []);
  return <Navigate to="/" />;
};

export default Logout;
