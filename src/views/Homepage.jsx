import React, { useEffect, useState } from "react";
import { getMatches, newMatch } from "../services/MatchesBackend";
import { LuSwords } from "react-icons/lu";
import { CircularProgress } from "@mui/material";
import './styles/HomePage.css';
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [userConnected, setUserConnected] = useState({ token: '', username: '' });
  const [matchList, setMatchList] = useState([]);
  const [allowCreateMatch, setAllowCreateMatch] = useState(false);
  const [matchLoad, setMatchLoad] = useState(true);
  const navigate = useNavigate();

  function handleRefresh() {
    getMatches().then((matches) => {
      setMatchList(matches);
      setMatchLoad(false);
    });
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userConnected'));
    setUserConnected(user);
    handleRefresh();
  }, []);

  const handleNewMatchClick = () => {
    newMatch();
  };

  useEffect(() => {
    if (matchList.length === 0) {
      setAllowCreateMatch(true);
    } else {
      matchList.forEach(match => {
        if (match.user2 === null) {
          setAllowCreateMatch(false);
        }
      });
    }
  }, [matchList])

  function handleMatchSelect(matchId) {
    navigate('/private/match/' + matchId)
  }

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
                <div key={match._id} className="match-item" onClick={() => handleMatchSelect(match._id)}>
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