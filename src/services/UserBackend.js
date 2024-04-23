export const loginUser = async ({ username, password }) => {
    const resp = await fetch("http://fauques.freeboxos.fr:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    if (!resp.ok) throw new Error('Invalid credentials');
    return resp.json();
}

export const registerUser = async ({ username, password }) => {
    const resp = await fetch('http://fauques.freeboxos.fr:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (!resp.ok) throw new Error('User already exists');
    return resp.json();
}

// registerUser({username: 'alexisamadei', password: 'aled'}).then(console.log);
// { error: 'User already exists' }
// {
//   _id: 'd6bb94d2-01c0-4b1e-b739-7f15145160ad',
//   username: 'alexisamadei',
//   password: 'aled',
//   __v: 0
//  }