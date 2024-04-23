import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Security({ user }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (user) { navigate("/"); }
    }, [user, navigate]);
    console.log('user', user);
    if (user) return null;
    return <Outlet />;
}
