import React from "react";
import { Outlet } from "react-router-dom";

export default function Private() {
  return (
    <div>
      <Outlet />
    </div>
  );
}