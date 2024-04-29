import React, { useEffect, useState } from "react";
import { NewMatch } from "../services/NewMatch";

export default function Homepage() {
  const [userConnected, setUserConnected] = useState({token: '', username: ''});

  useEffect(() => {
    const user = localStorage.getItem('userConnected');
    if (user) {
      setUserConnected(JSON.parse(user));
    }
  }, []);

  const handleNewMatchClick = () => {
    NewMatch();
  };

  return (
    <div className="homepage-wrapper">
      <p>Welcome {userConnected.username}</p>
      <button onClick={handleNewMatchClick}>Nouvelle partie</button>
    </div>
  )
}