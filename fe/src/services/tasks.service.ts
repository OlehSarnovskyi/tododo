import {List} from "../models/list";
import {ID} from "../components/TodoList/models/id";
import {api} from "./api.service";

export function getTasksByUserIdAndDate(date: string): Promise<List.Task[]> {
    const queryParams = {
        userId: Telegram.WebApp.initDataUnsafe.user?.id,
        date
    }
    return api.get('tasks', {params: queryParams}).then(res => res.data)
}

export function addNewTask(task: Pick<List.Task, 'text' & 'date'>): Promise<Response> {
    return api.post('tasks/add', {
        ...task,
        userId: Telegram.WebApp.initDataUnsafe.user?.id
    }).then(res => res.data)
}

export function deleteTask(taskId: ID): Promise<Response> {
    return api.delete(`tasks/${taskId}`)
}

export function editTask(task: Pick<List.Task, '_id' | 'text'>): Promise<Response> {
    return api.patch(`tasks/${task._id}`, {text: task.text})
}

export function markAsTask(taskId: ID): Promise<Response> {
    return api.patch(`tasks/markAs/${taskId}`)
}