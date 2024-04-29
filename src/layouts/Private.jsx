import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";

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
  return (
    <div className="homepage-wrapper" style={homepageStyles}>
      <AppBar />
      <Outlet />
    </div>
  );
}