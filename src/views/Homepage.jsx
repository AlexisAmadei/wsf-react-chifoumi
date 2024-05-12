import React, { useEffect, useState } from "react";
import { NewMatch } from "../services/NewMatch";
import { getMatches } from "../services/getMatches";
import { LuSwords } from "react-icons/lu";
import { CircularProgress } from "@mui/material";
import './styles/HomePage.css';

export default function Homepage() {
  const [userConnected, setUserConnected] = useState({ token: '', username: '' });
  const [matchList, setMatchList] = useState([]);
  const [allowCreateMatch, setAllowCreateMatch] = useState(false);
  const [matchLoad, setMatchLoad] = useState(true);

  function handleRefresh() {
    getMatches().then((matches) => {
      setMatchList(matches);
      setMatchLoad(false);
    });
  }

  useEffect(() => { // Run once won mount
    const user = JSON.parse(localStorage.getItem('userConnected'));
    setUserConnected(user);
    handleRefresh();
  }, []);

  const handleNewMatchClick = () => {
    NewMatch();
  };

  useEffect(() => {
    matchList.forEach(match => {
      if (match.user2 === '') {
        setAllowCreateMatch(false);
      } else {
        setAllowCreateMatch(true);
      }
    });
  }, [matchList])

  return (
    <div className="homepage-wrapper">
      {matchLoad && <CircularProgress style={{ color: '#646cff' }} />}
      {!matchLoad && (
        <>
          <p>Welcome <span>{userConnected.username}</span> !</p>
          <div className="game-buttons">
            <button onClick={handleRefresh}>Refresh matches</button>
            <button
              disabled={allowCreateMatch ? true : false}
              onClick={handleNewMatchClick}
            >New Game</button>
          </div>
          <div className="match-list">
            {matchList.length === 0 && (
              <p>No matches found</p>
            )}
            {matchList.length > 0 && (
              matchList.map((match) => (
                <div key={match._id} className="match-item">
                  {/* <p>Match ID: {match._id}</p> */}
                  <div className="players">
                    <p>Player 1: {match.user1.username}</p>
                    <LuSwords
                      style={{
                        width: '30px',
                        height: '30px',
                        margin: '0 10px',
                      }}
                    />
                    <p>Player 2: {match.user2 ? match.user2.username : 'Waiting player...'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}