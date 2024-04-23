import React from "react";
import { Outlet } from "react-router-dom";

export default function OnBoard() {
  return (
    <div>
      <Outlet />
    </div>
  );
}