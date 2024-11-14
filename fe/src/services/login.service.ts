export function login() {
    fetch('http://localhost:3001/users/login/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: Telegram.WebApp.initDataUnsafe.user?.id
        }),
    }).then(() => {
        // show tooltip
    })
}