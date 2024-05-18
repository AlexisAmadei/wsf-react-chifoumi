import './styles/MatchView.css';
import React, { useContext, useEffect, useState } from 'react'
import { playTurn } from '../services/MatchesBackend';
import { MatchContext } from '../contexts/Match';
import { useNavigate } from 'react-router-dom';

import GameCard from '../components/Game/GameCard';
import TurnHistory from '../components/Game/TurnHistory';
import MatchWinner from '../components/Game/MatchWinner';

export default function MatchView() {
  const navigate = useNavigate();
  const userConnected = JSON.parse(localStorage.getItem('userConnected'));
  const { matchId, actions } = useContext(MatchContext);
  const [error, setError] = useState('');

  const [selected, setSelected] = useState(false) // 'rock', 'paper', 'scissors'
  const [isSelectable, setIsSelectable] = useState(true); // false when user has already played his turn
  const [confirmedChoice, setConfirmedChoice] = useState(false); // true when user has confirmed his choice
  const [currentMatch, setCurrentMatch] = useState({});
  const [players, setPlayers] = useState({}); // {player1: 'username', player2: 'username'}
  const [turns, setTurns] = useState([]); // [turn1, turn2, ...]
  const [turnStatus, setTurnStatus] = useState('waiting'); // 'your turn', 'waiting for opponent', 'no turn yet'
  const [matchWinner, setMatchWinner] = useState('');

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

    console.log('turns: ', turns);
    if (!currentMatch) return;
    if (turns.length === 0) {
      setTurnStatus('your turn');
      return;
    }
    if (!currentMatch.user1 || !currentMatch.user2) {
      setError('Match has no user1 or user2');
      return;
    }
    console.log('currentTurn: ', currentTurn);
    if (currentMatch.user1.username === user) {
      if (currentTurn.user2 === '?') {
        setTurnStatus('your turn');
      } else if (currentTurn.user1 && !currentTurn.user2) {
        setTurnStatus('waiting for opponent');
        setIsSelectable(false);
      }
    } else if (currentMatch.user2.username === user) {
      if (currentTurn.user1 === '?') {
        setTurnStatus('your turn');
      } else if (currentTurn.user2 && !currentTurn.user1) {
        setTurnStatus('waiting for opponent');
        setIsSelectable(false);
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
    let turnId = turns.length + 1;
    console.log('turnId: ', turnId)
    try {
      const resp = await playTurn(matchId, selected, turnId);
      if (!resp.ok) {
        console.error('playTurn failed: ', JSON.stringify(resp));
        setConfirmedChoice(false);
      } else {
        fetchMatchDetails();
        setSelected(false);
        setConfirmedChoice(false);
      }
    } catch (error) {
      console.log(error);
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

  // Match end logic
  useEffect(() => {
    function matchEnd() {
      if (turns.length === 3) return true;
      return false;
    }
    function matchWinner() {
      let user1Wins = 0;
      let user2Wins = 0;

      turns.forEach(turn => {
        if (turn.winner === "user1") {
          user1Wins++;
        } else if (turn.winner === "user2") {
          user2Wins++;
        }
      });
      if (user1Wins > user2Wins) {
        return <h1>{players.player1} wins the match !</h1>
      } else if (user1Wins < user2Wins) {
        return <h1>{players.player2} wins the match !</h1>
      }
      return null;
    }
    if (matchEnd()) {
      setMatchWinner(matchWinner());
    }
  }, [turns]);

  function setMatchSSE(matchId) {
    const jwtToken = userConnected.token;
    const url = `http://fauques.freeboxos.fr:3000/matches/${matchId}/subscribe?token=${jwtToken}`;
    const es = new EventSource(url);
    es.onopen = () => console.log('connection established');
    es.onerror = () => console.error('error while connecting');
    es.onmessage = (e) => console.log(">>>>", e.data);
    return () => es.close();
  }

  useEffect(() => {
    setMatchSSE(matchId);
  }, []);

  return (
    <div className={`matchView-wrapper`}>
      {turnStatus === 'your turn' && <h1>Choose your attack !</h1>}
      {turnStatus === 'waiting for opponent' && <h1>Waiting for opponent's turn</h1>}
      {turnStatus === 'no turn yet' && <h1>Waiting opponent to join</h1>}
      <span style={{ margin: '4px', padding: '0' }}>Turn no: {turns.length + 1} / Player1: {players.player1} & Player2: {players.player2}</span>
      <div className={`game-cards`}>
        <GameCard type={'scissors'} selected={selected} isSelectable={isSelectable} onSelect={handleSelectChoice} />
        <GameCard type={'rock'} selected={selected} isSelectable={isSelectable} onSelect={handleSelectChoice} />
        <GameCard type={'paper'} selected={selected} isSelectable={isSelectable} onSelect={handleSelectChoice} />
      </div>
      {(selected && !confirmedChoice) && (
        <button type='button' id='confirmChoice' onClick={handleGameChoice}>Attack with {selected} ?</button>
      )}
      {(!selected && !confirmedChoice && (turnStatus === 'your turn' || turnStatus === 'no turn yet')) && (
        <button type='button' id='noChoice'>Select your move first</button>
      )}
      {turnStatus === 'waiting for opponent' && (
        <button type='button' id='noChoice'>Waiting for opponent's turn</button>
      )}
      {turnStatus !== 'no turn yet' && (
        <TurnHistory turns={turns} players={players} />
      )}
    </div>
  )
}
