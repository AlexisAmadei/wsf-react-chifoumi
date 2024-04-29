import React, { useEffect, useState } from "react";

export default function Homepage() {
  const [userConnected, setUserConnected] = useState({token: '', username: ''});

  useEffect(() => {
    const user = localStorage.getItem('userConnected');
    if (user) {
      setUserConnected(JSON.parse(user));
    }
  }, []);
  return (
    <div className="homepage-wrapper">
      <p>Welcome {userConnected.username}</p>
    </div>
  )
}