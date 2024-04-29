import React, { useEffect, useState } from "react";
import { getMatches } from "../services/getMatches";
import './styles/HomePage.css';

export default function Homepage() {
  const [userConnected, setUserConnected] = useState({ token: '', username: '' });
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userConnected'));
    setUserConnected(user);
  }, []);
  function handleRefresh() {
    getMatches().then((matches) => {
      setMatchList(matches);
      console.log(matches);
    });
  }
  return (
    <div className="homepage-wrapper">
      <p>Welcome <span>{userConnected.username}</span> !</p>
      {matchList.length === 0 && (
        <button onClick={handleRefresh}>Find matches</button>
      )}
      {matchList.length > 0 && (
        <button onClick={handleRefresh}>Refresh matches</button>
      )}
      <div className="match-list">
        {matchList.length === 0 && (
          <p>No matches found</p>
        )}
        {matchList.length > 0 && (
          <ul className="match-div">
            {matchList.map((match) => (
              <li key={match._id} className="match-item">
                <p>Match ID: {match._id}</p>
                <p>Player 1: {match.user1.username}</p>
                <p>Player 2: {match.user2 ? match.user2.username : 'Waiting for player 2'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}