import {List} from "../models/list";
import {ID} from "../components/TodoList/models/id";

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

export function deleteTask(taskId: ID): Promise<Response> {
    return fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'DELETE',
        mode: 'cors'
    })
}

export function editTask(task: Pick<List.Task, '_id' | 'text'>): Promise<Response> {
    const body = JSON.stringify({
        text: task.text
    });
    return fetch(`http://localhost:3001/tasks/${task._id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body
    })
}