import React, { useContext, useEffect, useState } from 'react'
import './styles/MatchView.css';
import { playTurn } from '../services/MatchesBackend';
import { MatchContext } from '../contexts/Match';

export default function MatchView() {
  const userConnected = JSON.parse(localStorage.getItem('userConnected'));
  const { matchId, actions } = useContext(MatchContext);
  const [error, setError] = useState('');

  const [selected, setSelected] = useState(false)
  const [confirmedChoice, setConfirmedChoice] = useState(false);
  const [currentMatch, setCurrentMatch] = useState({});

  const [turns, setTurns] = useState([]); // [turn1, turn2, ...]
  const [turnStatus, setTurnStatus] = useState('waiting');

  const [players, setPlayers] = useState({});

  function setPlayer1Player2() {
    if (!currentMatch.user1 || !currentMatch.user2) return;
    if (currentMatch.user1.username === userConnected.username) {
      setPlayers({
        player1: userConnected.username,
        player2: currentMatch.user2.username,
      });
    } else {
      setPlayers({
        player1: currentMatch.user1.username,
        player2: userConnected.username,
      });
    }
  }

  function defineTurnStatus() {
    const user = userConnected.username;
    const currentTurn = turns[turns.length - 1];

    if (!currentMatch) return;
    if (turns.length === 0) {
      setTurnStatus('no turns yet');
    }
    if (!currentMatch.user1 || !currentMatch.user2) {
      setError('Match has no user1 or user2');
      return;
    }
    if (currentMatch.user1.username === user) {
      if (currentTurn.user2 === '?') {
        setTurnStatus('your turn');
      } else if (currentTurn.user1 && !currentTurn.user2) {
        setTurnStatus('waiting for opponent');
      }
    } else if (currentMatch.user2.username === user) {
      if (currentTurn.user1 === '?') {
        setTurnStatus('your turn');
      } else if (currentTurn.user2 && !currentTurn.user1) {
        setTurnStatus('waiting for opponent');
      }
    }
  }

  useEffect(() => {
    async function fetchMatchDetails() {
      const match = await actions.refreshMatch(matchId);
      if (match) {
        setCurrentMatch(match);
        setTurns(match.turns);
      }
    }
    fetchMatchDetails();
  }, [matchId]);

  useEffect(() => {
    setPlayer1Player2();
  }, [currentMatch]);

  useEffect(() => {
    defineTurnStatus();
  }, [currentMatch, players]);

  // Game logic
  function handleSelectChoice(choice) {
    if (turnStatus !== 'your turn') return;
    if (confirmedChoice) return;
    setSelected(choice === selected ? undefined : choice);
  }

  async function handleGameChoice() {
    setConfirmedChoice(true);
    try {
      const resp = await playTurn(matchId, selected, turns.length + 1);
      if (!resp.ok) {
        console.error('playTurn failed: ', JSON.stringify(resp));
        setConfirmedChoice(false);
      } else {
        fetchMatchDetails();
      }
    } catch (error) {
      console.error(error);
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
      <span style={{ margin: '4px', padding: '0' }}>Turn no: {turns.length} / Player1: {players.player1} & Player2: {players.player2}</span>
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
        <button type='button' id='confirmChoice' onClick={handleGameChoice}>Attack with {selected} ?</button>
      )}
      {(!selected && !confirmedChoice && turnStatus === 'your turn') && (
        <button type='button' id='noChoice'>Select your move first</button>
      )}
      {turnStatus !== 'your turn' && (
        <button type='button' id='noChoice'>It's not your turn</button>
      )}
      <div className='turn-history'>
        <h2>Turns history</h2>
        <ul>
          {turns.length > 0 && turns.map((turn, index) => (
            <React.Fragment key={index}>
              <li>
                <p style={{ textAlign: 'center' }}>Turn {index + 1}</p>
                <p>Player 1: {players.player1} played: {turn.user1}</p>
                <p>Player 2: {players.player2} played: {turn.user2}</p>
                <p style={{ textAlign: 'center' }}>{whoWins(turn)}</p>
                {index !== turns.length - 1 && <hr />}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}
