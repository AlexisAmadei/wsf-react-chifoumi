import { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import MatchProvider from "../contexts/Match";

const styles = {
  matchLayout: {
    height: '100%',
    width: '100%',
    marginTop: '90px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}

export default function MatchLayout() {
  let { matchId } = useParams();
  const [opponent, setOpponent] = useState('undefined');
  const userConnected = JSON.parse(localStorage.getItem('userConnected'));
  const matchList = JSON.parse(localStorage.getItem('matchList'));

  useEffect(() => {
    if (!matchId) {
      console.error("No matchId found");
      return;
    }
    if (matchList) {
      matchList.forEach(match => {
        if (match._id === matchId) {
          // set opponent
          if (match.user1.username === userConnected.username)
            setOpponent(match.user2.username);
          else
            setOpponent(match.user1.username);
        }
      });
    }
  }, [matchId]);

  return (
    <MatchProvider matchId={matchId}>
      <div className="matchlayout" style={styles.matchLayout}>
        <h1 style={{
          fontSize: '1.5rem',
          textAlign: 'center',
        }}>Match against: {opponent}</h1>
        <Outlet />
      </div>
    </MatchProvider>
  )
}
