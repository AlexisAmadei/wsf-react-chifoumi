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

export const newMatch = async () => {
    const userConnected = JSON.parse(localStorage.getItem('userConnected'));
    const token = userConnected.token;
    const resp = await fetch("http://fauques.freeboxos.fr:3000/matches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }).catch((error) => {
        throw new Error(error);
    });
    if (resp.status === 400) {
        throw new Error('User already has an active match');
    }
    return resp.json();
}

export const playTurn = async (matchId, choice, turnId) => {
    const userConnected = JSON.parse(localStorage.getItem('userConnected'));
    const body = {
        'move': choice
    };
    const token = userConnected.token;
    const resp = await fetch(`http://fauques.freeboxos.fr:3000/matches/${matchId}/turns/${turnId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }).catch((error) => {
        throw new Error(error);
    });
    return resp.json();
}

export const refreshMatch = async (matchId) => {
    const userConnected = JSON.parse(localStorage.getItem('userConnected'));
    const token = userConnected.token;
    const resp = await fetch(`http://fauques.freeboxos.fr:3000/matches/${matchId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).catch((error) => {
        throw new Error(error);
    });
    return resp.json();
}
