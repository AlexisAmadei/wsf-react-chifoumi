

export const NewMatch = async () => {
    const userConnected = JSON.parse(localStorage.getItem('userConnected'));
    const resp = await fetch("http://fauques.freeboxos.fr:3000/matches", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userConnected.token}`
        },
    });
    // if (!resp.ok) {
    //     throw new Error(`Erreur HTTP: ${resp.status}`);
    // }
    return resp.json();
}