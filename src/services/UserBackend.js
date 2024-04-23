export const loginUser = async ({username, password}) => {
    const resp = await fetch("http://fauques.freeboxos.fr:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
     body: JSON.stringify({username, password}),
    });
    return resp.json();
}


export const registerUser = async ({username, password}) => {
    const resp = await fetch('http://fauques.freeboxos.fr:3000/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    return resp.json();
}
