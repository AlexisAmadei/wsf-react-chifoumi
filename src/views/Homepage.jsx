import React, { useEffect, useState } from "react";
import { getMatches, newMatch } from "../services/MatchesBackend";
import { LuSwords } from "react-icons/lu";
import './styles/HomePage.css';
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [userConnected, setUserConnected] = useState({ token: '', username: '' });
  const [matchList, setMatchList] = useState([]);
  const [allowCreateMatch, setAllowCreateMatch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userConnected'));
    setUserConnected(user);
    handleRefresh();
  }, []);

  function handleRefresh() {
    if (!localStorage.getItem('matchList')) {
      getMatches().then((matches) => {
        setMatchList(matches);
        localStorage.setItem('matchList', JSON.stringify(matches));
      });
    } else {
      setMatchList(JSON.parse(localStorage.getItem('matchList')));
    }
  }

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

  function handlenewMatch() {
    newMatch().then(handleRefresh()).catch((error) => {
      console.error('fetch() =>', error.message);
    });
  };

  function handleMatchSelect(matchId) {
    navigate(`/private/match/${matchId}`);
  }

  return (
    <div className="homepage-wrapper">
      <p>Welcome <span>{userConnected.username}</span> !</p>
      <div className="game-buttons">
        <button onClick={handleRefresh}>Refresh matches</button>
        <button
          disabled={!allowCreateMatch}
          onClick={handlenewMatch}
        >New Game</button>
      </div>
      <div className="match-list">
        {matchList.length === 0 && (
          <p>No matches found</p>
        )}
        {matchList.length > 0 && (
          matchList.map((match) => (
            <div key={match._id} className="match-item" onClick={() => handleMatchSelect(match._id)}>
              <p style={{ textAlign:'center'}}>Match ID: {match._id}</p>
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
    </div>
  )
}