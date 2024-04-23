import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Private({ user }) {
  return (
    <div>
      <Outlet />
    </div>
  );
}