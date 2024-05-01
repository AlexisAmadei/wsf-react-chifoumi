import React, { useContext, useEffect, useState } from 'react'
import './styles/MatchView.css';
import { playTurn } from '../services/MatchesBackend';
import { MatchContext } from '../contexts/Match';

export default function MatchView() {
  const userConnected = JSON.parse(localStorage.getItem('userConnected'));
  const { matchId } = useContext(MatchContext);

  const [selected, setSelected] = useState(false)
  const [confirmedChoice, setConfirmedChoice] = useState(false);

  // matches state
  const [matchList, setMatchList] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({});

  const [opponent, setOpponent] = useState('undefined');
  const [turns, setTurns] = useState([]); // [turn1, turn2, ...]

  useEffect(() => {
    function fetchMatchDetails() {
      const matches = JSON.parse(localStorage.getItem('matchList'));
      setMatchList(matches);
      const match = matches.find(match => match._id === matchId);
      if (match) {
        setCurrentMatch(match);
        setTurns(match.turns);
      }
    }
    fetchMatchDetails();
  }, [matchId]);


  // once the match is fetched
  useEffect(() => {
    function checkUserRole() {
      if (currentMatch) {
        if (currentMatch.user1?.username === userConnected?.username) {
          setOpponent(currentMatch.user2?.username);
        } else {
          setOpponent(currentMatch.user1?.username);
        }
      }
    }
    checkUserRole();
  }, [currentMatch]);


  function handleSelectChoice(choice) {
    if (confirmedChoice) {
      return;
    }
    setSelected(choice === selected ? undefined : choice);
  }
  async function handleGameChoice() {
    setConfirmedChoice(true);
    try {
      const resp = await playTurn(matchId, selected, turns.length);
      if (!resp.ok) {
        console.error('playTurn failed: ', JSON.stringify(resp));
        setConfirmedChoice(false);
      }
    } catch (error) {
      console.error(error);
      setConfirmedChoice(false);
    }
  }

  function whoWins(turn) {
    if (turn.winner === 'user1') {
      if (currentMatch.user1.username === userConnected.username) {
        return 'You win !';
      } else {
        return 'You lose !';
      }
    } else if (turn.winner === 'user2') {
      if (currentMatch.user2.username === userConnected.username) {
        return 'You win !';
      } else {
        return 'You lose !';
      }
    }
  }

  return (
    <div className='matchView-wrapper'>
      <h1>Choose your attack !</h1>
      <span style={{ margin: '0', padding: '0' }}>Turn no: {turns.length + 1}</span>
      <div className='game-cards'>
        <div className={`game-card scissors ${selected === 'scissors' ? 'selected' : ''} `} onClick={() => { handleSelectChoice('scissors') }}>
          <p>✂️</p>
        </div>
        <div className={`game-card rock ${selected === 'rock' ? 'selected' : ''} `} onClick={() => { handleSelectChoice('rock') }}>
          <p>🪨</p>
        </div>
        <div className={`game-card paper ${selected === 'paper' ? 'selected' : ''} `} onClick={() => { handleSelectChoice('paper') }}>
          <p>🍁</p>
        </div>
      </div>
      {(selected && !confirmedChoice) && (
        <button id='confirmChoice' onClick={handleGameChoice}>Attack with {selected} ?</button>
      )}
      {(!selected && !confirmedChoice) && (
        <button id='noChoice'>Select your move first</button>
      )}
      {confirmedChoice && (
        <div className='game-result'>
          <h2>Waiting for opponent...</h2>
        </div>
      )}
      <div className='turn-history'>
        <h2>Turns history</h2>
        <ul>
          {turns.map((turn, index) => (
            <li key={index}>
              Tour {index + 1}: {turn.user1} vs {turn.user2}. {whoWins(turn)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
