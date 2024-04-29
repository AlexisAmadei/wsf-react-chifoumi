import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";

export default function Security() {
  return (
    <Outlet />
  )
}
