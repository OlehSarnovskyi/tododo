import {List} from "../models/list";
import {ID} from "../components/TodoList/models/id";
import {AxiosInstance} from "axios";

export function getTasksByUserIdAndDate(api: AxiosInstance): (date: string) => Promise<List.Task[]> {
    return (date) => {
        const queryParams = {
            userId: Telegram.WebApp.initDataUnsafe.user?.id,
            date
        }
        return api.get('tasks', {params: queryParams}).then(res => res.data)
    }
}

export function addNewTask(api: AxiosInstance): (task: Pick<List.Task, 'text' & 'date'>) => Promise<Response> {
    return (task) => {
        return api.post('tasks/add', {
            ...task,
            userId: Telegram.WebApp.initDataUnsafe.user?.id
        }).then(res => res.data)
    }
}

export function deleteTask(api: AxiosInstance): (taskId: ID) => Promise<Response> {
    return (taskId) => {
        return api.delete(`tasks/${taskId}`)
    }
}

export function editTask(api: AxiosInstance): (task: Pick<List.Task, '_id' | 'text'>) => Promise<Response> {
    return (task) => {
        return api.patch(`tasks/${task._id}`, {text: task.text})
    }
}

export function markAsTask(api: AxiosInstance): (taskId: ID) => Promise<Response> {
    return (taskId) => {
        return api.patch(`tasks/markAs/${taskId}`)
    }
}