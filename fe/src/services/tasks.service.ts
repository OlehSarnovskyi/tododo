import {List} from "../models/list";
import {ID} from "../components/TodoList/models/id";
import {AxiosInstance} from "axios";

function getUserId(): number {
    return Telegram.WebApp.initDataUnsafe.user?.id;
}

export function getTasksByUserIdAndDate(api: AxiosInstance): (date: string) => Promise<List.Task[]> {
    return (date) => {
        return api.get('tasks', { params: { userId: getUserId(), date } }).then(res => res.data);
    };
}

export function addNewTask(api: AxiosInstance): (task: Pick<List.Task, 'text' & 'date'>) => Promise<Response> {
    return (task) => {
        return api.post('tasks/add', { ...task, userId: getUserId() }).then(res => res.data);
    };
}

export function deleteTask(api: AxiosInstance): (taskId: ID) => Promise<Response> {
    return (taskId) => {
        return api.delete(`tasks/${taskId}`, { params: { userId: getUserId() } });
    };
}

export function editTask(api: AxiosInstance): (task: Pick<List.Task, '_id' | 'text'>) => Promise<Response> {
    return (task) => {
        return api.patch(`tasks/${task._id}`, { text: task.text, userId: getUserId() });
    };
}

export function markAsTask(api: AxiosInstance): (taskId: ID) => Promise<Response> {
    return (taskId) => {
        return api.patch(`tasks/markAs/${taskId}`, { userId: getUserId() });
    };
}

export function moveTask(api: AxiosInstance): (taskId: ID, date: string) => Promise<void> {
    return (taskId, date) => {
        return api.patch(`tasks/move/${taskId}`, { userId: getUserId(), date });
    };
}

export function reorderTasks(api: AxiosInstance): (tasks: { _id: ID; order: number }[]) => Promise<void> {
    return (tasks) => {
        return api.patch('tasks/reorder', { tasks });
    };
}
