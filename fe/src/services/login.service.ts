export function login(): Promise<string> {
    return fetch('https://tododo-be.vercel.app/users/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: Telegram.WebApp.initDataUnsafe.user?.id
        }),
    }).then(res => res.text())
}