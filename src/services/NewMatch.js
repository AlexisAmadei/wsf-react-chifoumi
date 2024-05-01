export const newMatch = async () => {
    const userConnected = JSON.parse(localStorage.getItem('userConnected'));
    const resp = await fetch("http://fauques.freeboxos.fr:3000/matches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userConnected.token}`
        },
    }).catch((error) => {
        throw new Error(error);
    });
    if (resp.status === 400) {
        throw new Error('User already has an active match');
    }
    return resp.json();
}