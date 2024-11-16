import {List} from "../models/list";

export function getTasksByUserIdAndDate(date: string): Promise<any> {
    const queryParams = new URLSearchParams({
        userId: Telegram.WebApp.initDataUnsafe.user?.id,
        date
    }).toString()
    return fetch(`http://localhost:3001/tasks?${queryParams}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export function addNewTask(task: Pick<List.Task, 'text' & 'date'>): Promise<Response> {
    const body = JSON.stringify({
        ...task,
        userId: Telegram.WebApp.initDataUnsafe.user?.id
    });
    return fetch(`http://localhost:3001/tasks/add`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
}