export const getMatches = async () => {
  const userConnected = JSON.parse(localStorage.getItem('userConnected'));
  const resp = await fetch('http://fauques.freeboxos.fr:3000/matches', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userConnected.token}`
    }
  });
  if (!resp.ok) throw new Error('GET matches failed');
  return resp.json();
}

// const exResp = [
//   {
//     "user1": {
//       "_id": "24aefbbb-8def-4e2c-b19a-929ff55020c0",
//       "username": "alexis",
//     },
//     "user2": null,
//     "turns": [],
//     "_id": "61979ce9ff4a0e83e02df260",
//   }
// ];