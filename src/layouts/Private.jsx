import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import { AuthContext } from "../contexts/Auth";

const homepageStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  flexDirection: "column",
  backgroundColor: "white",
};

export default function Private() {
  const { userConnected } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('userConnected');
    if (!user) {
      navigate('/security/login');
    }
  }, [userConnected]);
  return (
    <div className="homepage-wrapper" style={homepageStyles}>
      <AppBar />
      <Outlet />
    </div>
  );
}